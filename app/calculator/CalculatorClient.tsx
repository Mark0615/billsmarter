"use client";

import React, { useMemo, useRef, useState } from "react";
import PayToDropdown from "./PayToDropdown";

type Payment = {
  id: string;
  payer: string;
  beneficiaries: string[];
  currency: string;
  amount: number;
  baseCurrency: string;
  baseAmount: number;
  rateUsed: number;
  note?: string;
};

const CURRENCIES = ["USD", "EUR", "JPY", "KRW", "TWD", "THB", "SGD", "HKD", "CNY", "GBP", "AUD", "CAD", "CHF"];

const nf2 = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const uid = () => Math.random().toString(36).slice(2, 10);
const fmt2 = (n: number) => (Number.isFinite(n) ? nf2.format(n) : "0.00");

function resizeNames(prev: string[], count: number) {
  const next = [...prev];
  if (count > next.length) while (next.length < count) next.push("");
  if (count < next.length) next.length = count;
  return next;
}

export default function CalculatorClient() {
  const [baseCurrency, setBaseCurrency] = useState<string>("USD");
  const [count, setCount] = useState<number>(3);
  const [names, setNames] = useState<string[]>(["Alice", "Bob", "Charlie"]);
  const [fxError, setFxError] = useState<string>("");

  const filled = useMemo(() => names.map((n) => n.trim()).filter(Boolean), [names]);

  const [temp, setTemp] = useState({
    payer: "",
    beneficiaries: [] as string[],
    currency: "USD",
    amount: "",
    note: "",
  });

  const [payments, setPayments] = useState<Payment[]>([]);
  const fxCacheRef = useRef<Record<string, number>>({});

  async function getFxRate(from: string, to: string) {
    if (from === to) return 1;

    const key = `${from}->${to}`;
    const cached = fxCacheRef.current[key];
    if (cached && Number.isFinite(cached)) return cached;

    const res = await fetch(`/api/fx/latest?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`, { cache: "no-store" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.error || `FX API failed (${res.status})`);
    }

    const data = await res.json();
    const rate = data?.rate;
    if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) throw new Error("Invalid FX rate payload");

    fxCacheRef.current[key] = rate;
    return rate;
  }

  async function handleBaseCurrencyChange(nextBase: string) {
    setFxError("");
    setBaseCurrency(nextBase);
    setTemp((prev) => ({ ...prev, currency: nextBase }));

    if (payments.length === 0) return;

    const converted = await Promise.all(
      payments.map(async (payment) => {
        if (payment.currency === nextBase) {
          return { ...payment, baseCurrency: nextBase, baseAmount: payment.amount, rateUsed: 1 };
        }

        const rate = await getFxRate(payment.currency, nextBase);
        return { ...payment, baseCurrency: nextBase, baseAmount: payment.amount * rate, rateUsed: rate };
      }),
    ).catch((error: Error) => {
      setFxError(error.message || "Cannot refresh exchange rates right now.");
      return null;
    });

    if (converted) setPayments(converted);
  }

  const canAdd = useMemo(() => {
    if (!filled.length || !temp.payer) return false;
    if (!filled.includes(temp.payer)) return false;
    if (!temp.beneficiaries.length || temp.beneficiaries.some((b) => !filled.includes(b))) return false;
    const amt = Number(temp.amount);
    return Number.isFinite(amt) && amt > 0 && !!temp.currency;
  }, [filled, temp]);

  async function handleAdd() {
    if (!canAdd) return;
    setFxError("");

    const amountNum = Number(temp.amount);
    const from = temp.currency;
    const to = baseCurrency;

    let rate = 1;
    try {
      rate = await getFxRate(from, to);
    } catch (error) {
      setFxError(error instanceof Error ? error.message : "FX conversion failed.");
      return;
    }

    const p: Payment = {
      id: uid(),
      payer: temp.payer,
      beneficiaries: temp.beneficiaries,
      currency: from,
      amount: amountNum,
      baseCurrency: to,
      baseAmount: amountNum * rate,
      rateUsed: rate,
      note: temp.note?.trim() || "",
    };

    setPayments((prev) => [p, ...prev]);
    setTemp((prev) => ({ ...prev, amount: "", note: "" }));
  }

  function removePayment(id: string) {
    setPayments((prev) => prev.filter((p) => p.id !== id));
  }

  const settlement = useMemo(() => {
    if (!filled.length) return { balances: new Map<string, number>(), transfers: [] as { from: string; to: string; amount: number }[] };

    const balances = new Map<string, number>();
    filled.forEach((p) => balances.set(p, 0));

    for (const pay of payments) {
      if (!pay.beneficiaries.length) continue;
      const share = pay.baseAmount / pay.beneficiaries.length;
      balances.set(pay.payer, (balances.get(pay.payer) ?? 0) + pay.baseAmount);
      for (const b of pay.beneficiaries) balances.set(b, (balances.get(b) ?? 0) - share);
    }

    const creditors: { name: string; amt: number }[] = [];
    const debtors: { name: string; amt: number }[] = [];
    for (const [name, amt] of balances.entries()) {
      const rounded = Math.round(amt * 100) / 100;
      if (rounded > 0) creditors.push({ name, amt: rounded });
      if (rounded < 0) debtors.push({ name, amt: -rounded });
    }

    const transfers: { from: string; to: string; amount: number }[] = [];
    let i = 0;
    let j = 0;
    while (i < debtors.length && j < creditors.length) {
      const d = debtors[i];
      const c = creditors[j];
      const x = Math.min(d.amt, c.amt);
      if (x > 0.00001) {
        transfers.push({ from: d.name, to: c.name, amount: Math.round(x * 100) / 100 });
        d.amt -= x;
        c.amt -= x;
      }
      if (d.amt <= 0.00001) i += 1;
      if (c.amt <= 0.00001) j += 1;
    }

    return { balances, transfers };
  }, [filled, payments]);

  return (
    <div className="calculatorPage">
      <section className="gridSection">
        <div className="card currencyCard">
          <div className="cardHead">
            <h2>1 Choose your base currency</h2>
            <div className="pill">Base: {baseCurrency}</div>
          </div>
          <div className="row">
            <div className="field grow">
              <div className="label">Base currency (calculation & default)</div>
              <select className="control" value={baseCurrency} onChange={(e) => void handleBaseCurrencyChange(e.target.value)}>
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="fxBox">
              <div className="fxText">Auto-convert payment entries to {baseCurrency}</div>
            </div>
          </div>
          {fxError ? <p className="hint danger">FX error: {fxError}</p> : null}
        </div>

        <div className="doubleCol">
          <div className="card">
            <div className="cardHead">
              <h2>2 People</h2>
            </div>
            <div className="row">
              <div className="field countField">
                <div className="label">Count</div>
                <input
                  className="control"
                  type="number"
                  min={2}
                  max={20}
                  value={count}
                  onChange={(e) => {
                    const nextCount = Math.max(2, Math.min(20, Number(e.target.value) || 2));
                    setCount(nextCount);
                    setNames((prev) => resizeNames(prev, nextCount));
                  }}
                />
              </div>
            </div>

            <div className="peopleGrid">
              {names.map((n, idx) => (
                <input
                  key={idx}
                  className="control"
                  placeholder={`Person ${idx + 1}`}
                  value={n}
                  onChange={(e) => {
                    const v = e.target.value;
                    setNames((prev) => {
                      const next = [...prev];
                      next[idx] = v;
                      return next;
                    });
                  }}
                />
              ))}
            </div>
            {filled.length !== count && <div className="hint danger">Please fill all names before adding payments.</div>}
          </div>

          <div className="card">
            <div className="cardHead">
              <h2>3 Add payment</h2>
              <div className="muted">Default: {baseCurrency}</div>
            </div>

            <div className="payGrid">
              <div className="field">
                <label className="label">Payer</label>
                <select className="control" value={temp.payer} onChange={(e) => setTemp({ ...temp, payer: e.target.value })} disabled={filled.length === 0}>
                  <option value="">Select payer</option>
                  {filled.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">Pay for</label>
                <PayToDropdown options={filled.map((n) => ({ value: n, label: n }))} value={temp.beneficiaries} onChange={(next) => setTemp({ ...temp, beneficiaries: next })} placeholder="Select one or more" />
              </div>

              <div className="field currencyField">
                <label className="label">Currency</label>
                <select className="control" value={temp.currency} onChange={(e) => setTemp({ ...temp, currency: e.target.value })}>
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">Amount</label>
                <input className="control" inputMode="decimal" placeholder="0.00" value={temp.amount} onChange={(e) => setTemp({ ...temp, amount: e.target.value })} />
              </div>
            </div>

            <div className="addRow">
              <button type="button" className="btn primary" onClick={handleAdd} disabled={!canAdd}>
                Add payment →
              </button>
              <input className="control" placeholder="Note (optional) e.g., taxi / dinner" value={temp.note} onChange={(e) => setTemp({ ...temp, note: e.target.value })} />
            </div>

            <div className="list">
              {payments.map((p) => (
                <div key={p.id} className="item">
                  <div className="itemLeft">
                    <div className="itemTitle">
                      <b>{p.payer}</b> paid for <b>{p.beneficiaries.join(", ")}</b>
                    </div>
                    <div className="itemSub">
                      {p.currency} {fmt2(p.amount)} ・ Rate {fmt2(p.rateUsed)} ・ Base {p.baseCurrency} {fmt2(p.baseAmount)}
                      {p.note ? <span className="dot"> · {p.note}</span> : null}
                    </div>
                  </div>

                  <div className="itemRight">
                    <div className="big">
                      {p.baseCurrency} {fmt2(p.baseAmount)}
                    </div>
                    <button className="btn ghost" onClick={() => removePayment(p.id)} aria-label="Remove">
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {payments.length === 0 && <div className="hint">Add payments to generate settlement results.</div>}
          </div>
        </div>

        <div className="card">
          <div className="cardHead">
            <h2>4 Result</h2>
            <div className="muted">Settled in {baseCurrency}</div>
          </div>

          <div className="balances">
            {Array.from(settlement.balances.entries()).map(([name, amt]) => (
              <div key={name} className="balanceRow">
                <div className="name">{name}</div>
                <div className={`amt ${amt >= 0 ? "pos" : "neg"}`}>
                  {amt >= 0 ? "+" : "-"} {baseCurrency} {fmt2(Math.abs(amt))}
                </div>
              </div>
            ))}
          </div>

          <div className="transfers">
            {settlement.transfers.length === 0 ? (
              <div className="hint">No transfers needed yet.</div>
            ) : (
              settlement.transfers.map((t, idx) => (
                <div key={idx} className="transferRow">
                  <b>{t.from}</b> → <b>{t.to}</b>
                  <span className="spacer" />
                  {baseCurrency} {fmt2(t.amount)}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
