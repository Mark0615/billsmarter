export const CURRENCIES = ['USD', 'EUR', 'JPY', 'KRW', 'TWD', 'THB', 'SGD', 'HKD', 'CNY', 'GBP', 'AUD', 'CAD', 'CHF'];
export type Person = {
    id: string;
    name: string;
};
export type Payment = {
    id: string;
    payerId: string;
    beneficiaryIds: string[];
    currency: string;
    amount: number;
    baseCurrency: string;
    baseAmount: number;
    rateUsed: number;
    rateSource: string;
    rateDate?: string;
    rateFetchedAt?: string;
    note?: string;
};
export const MAX_AMOUNT = 1000000000;
export function decimalsFor(currency: string) { return ['JPY', 'KRW', 'TWD'].includes(currency) ? 0 : 2; }
export function formatMoney(value: number, currency: string) { return new Intl.NumberFormat('en-US', { minimumFractionDigits: decimalsFor(currency), maximumFractionDigits: decimalsFor(currency) }).format(value); }
export function describeRate(payment: Payment) {
    if (payment.currency === payment.baseCurrency) return null;
    const rate = String(payment.rateUsed);
    const source = payment.rateSource === 'frankfurter' ? 'Frankfurter (ECB)' : payment.rateSource === 'open-er-api' ? 'ExchangeRate-API' : payment.rateSource;
    const date = payment.rateDate ? `Rate date ${payment.rateDate}` : 'Rate date unavailable';
    const fetched = payment.rateFetchedAt ? `fetched ${payment.rateFetchedAt.replace('T', ' ').slice(0, 19)} UTC` : 'fetch time unavailable';
    return `1 ${payment.currency} = ${rate} ${payment.baseCurrency} · ${source} · ${date} · ${fetched}`;
}
export function validAmount(raw: string, currency = "USD") {
    const pattern = decimalsFor(currency) === 0 ? /^\d+$/ : /^\d+(\.\d{1,2})?$/;
    return pattern.test(raw.trim()) && Number(raw) > 0 && Number(raw) <= MAX_AMOUNT;
}
// Allocate each converted expense in whole settlement units. Earlier roster IDs
// receive the remainder deterministically; every displayed transfer balances.
export function calculate(people: Person[], payments: Payment[], currency: string) {
    const factor = 10 ** decimalsFor(currency);
    const paid: Record<string, number> = Object.create(null), owed: Record<string, number> = Object.create(null);
    for (const p of people) {
        paid[p.id] = 0;
        owed[p.id] = 0;
    }
    for (const p of payments) {
        const units = Math.round((p.baseAmount + Number.EPSILON * p.baseAmount) * factor);
        if (!Number.isSafeInteger(units) || units < 0 || !(p.payerId in paid) || !p.beneficiaryIds.length)
            throw new Error('Invalid payment');
        paid[p.payerId] += units;
        const beneficiaries = people.filter(person => p.beneficiaryIds.includes(person.id));
        if (beneficiaries.length !== p.beneficiaryIds.length)
            throw new Error('Invalid participants');
        const each = Math.floor(units / beneficiaries.length), remainder = units % beneficiaries.length;
        beneficiaries.forEach((person, i) => { owed[person.id] += each + (i < remainder ? 1 : 0); });
    }
    const net: Record<string, number> = Object.create(null);
    for (const p of people) {
        if (!Number.isSafeInteger(paid[p.id]) || !Number.isSafeInteger(owed[p.id]))
            throw new Error('Total too large');
        net[p.id] = paid[p.id] - owed[p.id];
    }
    const creditors = people.map(p => ({ id: p.id, amt: net[p.id] })).filter(p => p.amt > 0).sort((a, b) => b.amt - a.amt);
    const debtors = people.map(p => ({ id: p.id, amt: -net[p.id] })).filter(p => p.amt > 0).sort((a, b) => b.amt - a.amt);
    const transfers: {
        fromId: string;
        toId: string;
        amt: number;
    }[] = [];
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
        const amt = Math.min(debtors[i].amt, creditors[j].amt);
        transfers.push({ fromId: debtors[i].id, toId: creditors[j].id, amt: amt / factor });
        debtors[i].amt -= amt;
        creditors[j].amt -= amt;
        if (!debtors[i].amt)
            i++;
        if (!creditors[j].amt)
            j++;
    }
    for (const p of people) {
        paid[p.id] /= factor;
        owed[p.id] /= factor;
        net[p.id] /= factor;
    }
    return { paid, owed, net, transfers };
}
