import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
function load(file, deps = {}) {
    const source = ts.transpileModule(fs.readFileSync(new URL(file, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    const exports = {};
    new Function('require', 'exports', source)((key) => { if (key in deps)
        return deps[key]; throw new Error(`Unknown test dependency: ${key}`); }, exports);
    return exports;
}
const bills = load('../lib/bills.ts');
const people = [{ id: 'a', name: '同名' }, { id: 'b', name: '同名' }, { id: 'c', name: '陳' }];
const payment = (amount, currency = 'USD', beneficiaryIds = ['a', 'b', 'c']) => ({ id: 'expense', payerId: 'a', beneficiaryIds, currency, amount, baseCurrency: currency, baseAmount: amount, rateUsed: 1, rateSource: 'identity' });
test('USD 10 / 3: payable balances match actual cent transfers', () => {
    const r = bills.calculate(people, [payment(10)], 'USD');
    assert.equal(r.net.a, 6.66);
    assert.equal(r.owed.a, 3.34);
    assert.deepEqual(r.transfers, [{ fromId: 'b', toId: 'a', amt: 3.33 }, { fromId: 'c', toId: 'a', amt: 3.33 }]);
});
test('TWD 100 / 3 uses whole dollars; renaming never changes identity', () => {
    const r = bills.calculate(people, [payment(100, 'TWD')], 'TWD');
    assert.equal(r.net.a, 66);
    assert.equal(r.owed.a, 34);
    assert.deepEqual(r, bills.calculate(people.map(p => ({ ...p, name: 'Renamed' })), [payment(100, 'TWD')], 'TWD'));
});
test('payer may pay for a subset that excludes themselves', () => {
    const r = bills.calculate(people, [payment(10, 'USD', ['b', 'c'])], 'USD');
    assert.equal(r.net.a, 10);
    assert.equal(r.net.b, -5);
    assert.equal(r.net.c, -5);
});
test('currency units conserve totals and clear every balance for groups of 2–20', () => {
    for (const currency of bills.CURRENCIES)
        for (let n = 2; n <= 20; n++) {
            const group = Array.from({ length: n }, (_, i) => ({ id: `p${i}`, name: `Person ${i}` }));
            const entries = Array.from({ length: 35 }, (_, i) => ({ ...payment((i + 1) * 7.13, currency, group.filter((_, j) => (j + i) % 3 !== 0).map(p => p.id)), id: `e${i}`, payerId: group[i % n].id }));
            const r = bills.calculate(group, entries, currency), factor = 10 ** bills.decimalsFor(currency);
            const net = Object.fromEntries(Object.entries(r.net).map(([id, x]) => [id, Math.round(x * factor)]));
            for (const t of r.transfers) {
                assert.ok(t.amt > 0);
                const units = Math.round(t.amt * factor);
                net[t.fromId] += units;
                net[t.toId] -= units;
            }
            assert.ok(Object.values(net).every(x => x === 0));
            assert.ok(r.transfers.length <= n - 1);
        }
});
test('amount grammar rejects ambiguous, negative and excessive inputs', () => {
    for (const raw of ['-1', '1e5', '0x10', 'Infinity', '1,000', '0', '1.001', '1000000001'])
        assert.equal(bills.validAmount(raw), false, raw);
    for (const raw of ['10', '10.25', '0.01'])
        assert.equal(bills.validAmount(raw), true, raw);
    assert.equal(bills.validAmount('100.50', 'TWD'), false);
    assert.equal(bills.validAmount('100', 'TWD'), true);
});
const fx = load('../lib/fx.ts', { './bills': bills });
test('FX network exceptions fall through to the secondary provider', async () => {
    const original = globalThis.fetch;
    const calls = [];
    globalThis.fetch = async (url) => { calls.push(String(url)); if (calls.length === 1)
        throw new Error('offline'); return { ok: true, json: async () => ({ rates: { EUR: 0.9 } }) }; };
    try {
        const r = await fx.fxResponse(new Request('https://example.test/api/fx/latest?from=USD&to=EUR'));
        assert.equal(r.status, 200);
        assert.equal((await r.json()).source, 'open-er-api');
        assert.equal(calls.length, 2);
    }
    finally {
        globalThis.fetch = original;
    }
});
test('no fabricated FX when all sources fail; unsupported codes rejected', async () => {
    const original = globalThis.fetch;
    globalThis.fetch = async () => { throw new Error('offline'); };
    try {
        assert.equal((await fx.fxResponse(new Request('https://example.test/api/fx/latest?from=USD&to=EUR'))).status, 422);
        assert.equal((await fx.fxResponse(new Request('https://example.test/api/fx/latest?from=INVALID&to=INVALID'))).status, 400);
    }
    finally {
        globalThis.fetch = original;
    }
});

test('converted half-cent rounds to the nearest settlement cent', () => {
    const entry = { ...payment(1), currency: 'EUR', rateUsed: 1.005, baseAmount: 1.005 };
    const result = bills.calculate(people, [entry], 'USD');
    assert.equal(result.paid.a, 1.01);
    assert.equal(result.owed.a, 0.34);
});

test('each converted payment can show the rate, source, provider date and fetch time used', async () => {
    const original = globalThis.fetch;
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ date: '2026-10-03', rates: { EUR: 0.9 } }) });
    try {
        const response = await fx.fxResponse(new Request('https://example.test/api/fx/latest?from=USD&to=EUR'));
        const data = await response.json();
        assert.equal(data.date, '2026-10-03');
        assert.equal(data.source, 'frankfurter');
        assert.match(data.fetchedAt, /^\d{4}-\d{2}-\d{2}T/);
        assert.match(bills.describeRate({ ...payment(10), currency: 'USD', baseCurrency: 'EUR', rateUsed: data.rate, rateSource: data.source, rateDate: data.date, rateFetchedAt: data.fetchedAt }), /1 USD = 0.9 EUR · Frankfurter \(ECB\) · Rate date 2026-10-03 · fetched/);
        assert.equal(bills.describeRate(payment(10)), null);
    } finally {
        globalThis.fetch = original;
    }
});
