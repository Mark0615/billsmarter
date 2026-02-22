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

const CURRENCIES = [
  "USD",
  "EUR",
  "JPY",
  "KRW",
  "TWD",
  "THB",
  "SGD",
  "HKD",
  "CNY",
  "GBP",
  "AUD",
  "CAD",
  "CHF",
];

const nf2 = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function sanitizeName(s: string) {
  return (s || "").trim();
}

function resizeNames(prev: string[], nextCount: number) {
  const next = prev.slice(0, nextCount);
  while (next.length < nextCount) next.push("");
  return next;
}

function getErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Unknown error";
  }
}

type FxResult = { rate: number; source: string; base: string; to: string };

async function fetchFxRate(from: string, to: string): Promise<FxResult> {
  const url = new URL("/api/fx/latest", window.location.origin);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);

  const resp = await fetch(url.toString(), { cache: "no-store" });
  const data: unknown = await resp.json();

  if (!resp.ok) {
    const msg =
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error?: unknown }).error === "string"
        ? (data as { error: string }).error
        : `FX request failed (${resp.status})`;

    throw new Error(msg);
  }

  const maybe = data as Partial<FxResult>;
  if (!maybe || typeof maybe.rate !== "number") throw new Error("FX rate missing");

  return maybe as FxResult;
}

export default function CalculatorClient() {
  const [baseCurrency, setBaseCurrency] = useState<string>("USD");
  const [count, setCount] = useState<number>(3);
  const [names, setNames] = useState<string[]>(["Alice", "Bob", "Charlie"]);

  const [fxError, setFxError] = useState<string>("");

  const [payments, setPayments] = useState<Payment[]>([]);
  const [temp, setTemp] = useState<{
    payer: string;
    beneficiaries: string[];
    currency: string;
    amount: string;
    note: string;
  }>({
    payer: "",
    beneficiaries: [],
    currency: "USD",
    amount: "",
    note: "",
  });

  const latestFxRef = useRef<Record<string, number>>({});

  const filled = useMemo(() => names.map(sanitizeName).filter(Boolean), [names]);

  const canAdd = useMemo(() => {
    if (filled.length !== count) return false;
    if (!temp.payer) return false;
    if (!temp.beneficiaries.length) return false;
    const amt = Number(temp.amount);
    if (!Number.isFinite(amt) || amt <= 0) return false;
    return true;
  }, [count, filled.length, temp.amount, temp.beneficiaries.length, temp.payer]);

  async function handleBaseCurrencyChange(nextBase: string) {
    setBaseCurrency(nextBase);
    setFxError("");

    if (payments.length === 0) return;

    try {
      const updated: Payment[] = [];
      for (const p of payments) {
        if (p.currency === nextBase) {
          updated.push({
            ...p,
            baseCurrency: nextBase,
            baseAmount: p.amount,
            rateUsed: 1,
          });
          continue;
        }

        const key = `${p.currency}->${nextBase}`;
        const cached = latestFxRef.current[key];
        const fx = cached
          ? { rate: cached, source: "cache", base: p.currency, to: nextBase }
          : await fetchFxRate(p.currency, nextBase);

        latestFxRef.current[key] = fx.rate;

        updated.push({
          ...p,
          baseCurrency: nextBase,
          baseAmount: p.amount * fx.rate,
          rateUsed: fx.rate,
        });
      }
      setPayments(updated);
    } catch (e: unknown) {
      setFxError(getErrorMessage(e) || "FX conversion failed");
    }
  }

  async function addPayment() {
    setFxError("");
    if (!canAdd) return;

    const amt = Number(temp.amount);
    const from = temp.currency;
    const to = baseCurrency;

    try {
      let rateUsed = 1;
      let baseAmount = amt;

      if (from !== to) {
        const key = `${from}->${to}`;
        const cached = latestFxRef.current[key];
        const fx = cached
          ? { rate: cached, source: "cache", base: from, to }
          : await fetchFxRate(from, to);
        latestFxRef.current[key] = fx.rate;

        rateUsed = fx.rate;
        baseAmount = amt * fx.rate;
      }

      const p: Payment = {
        id: uid(),
        payer: temp.payer,
        beneficiaries: temp.beneficiaries,
        currency: from,
        amount: amt,
        baseCurrency: to,
        baseAmount,
        rateUsed,
        note: temp.note?.trim() || undefined,
      };

      setPayments((prev) => [p, ...prev]);
      setTemp((prev) => ({ ...prev, amount: "", note: "" }));
    } catch (e: unknown) {
      setFxError(getErrorMessage(e) || "Failed to add payment");
    }
  }

  function removePayment(id: string) {
    setPayments((prev) => prev.filter((p) => p.id !== id));
  }

  const totals = useMemo(() => {
    const paid: Record<string, number> = {};
    const owed: Record<string, number> = {};

    for (const n of filled) {
      paid[n] = 0;
      owed[n] = 0;
    }

    for (const p of payments) {
      if (!paid[p.payer]) paid[p.payer] = 0;
      paid[p.payer] += p.baseAmount;

      const each = p.baseAmount / p.beneficiaries.length;
      for (const b of p.beneficiaries) {
        if (!owed[b]) owed[b] = 0;
        owed[b] += each;
      }
    }

    const net: Record<string, number> = {};
    for (const n of filled) net[n] = (paid[n] || 0) - (owed[n] || 0);

    return { paid, owed, net };
  }, [filled, payments]);

  const transfers = useMemo(() => {
    const creditors: { name: string; amt: number }[] = [];
    const debtors: { name: string; amt: number }[] = [];

    for (const [name, amt] of Object.entries(totals.net)) {
      if (amt > 0.00001) creditors.push({ name, amt });
      else if (amt < -0.00001) debtors.push({ name, amt: -amt });
    }

    creditors.sort((a, b) => b.amt - a.amt);
    debtors.sort((a, b) => b.amt - a.amt);

    const out: { from: string; to: string; amt: number }[] = [];
    let i = 0,
      j = 0;

    while (i < debtors.length && j < creditors.length) {
      const d = debtors[i];
      const c = creditors[j];
      const pay = Math.min(d.amt, c.amt);

      out.push({ from: d.name, to: c.name, amt: pay });

      d.amt -= pay;
      c.amt -= pay;

      if (d.amt <= 0.00001) i++;
      if (c.amt <= 0.00001) j++;
    }
    return out;
  }, [totals.net]);

  return (
    <section className="gridSection">
      <div className="card currencyCard">
        <div className="cardHead">
          <h2>
            <span aria-hidden="true">1️⃣</span> Choose your base currency
          </h2>
          <div className="pill">Base: {baseCurrency}</div>
        </div>

        <div className="row">
          <div className="field grow">
            <div className="label">Base currency (calculation & default)</div>
            <select
              className="control"
              value={baseCurrency}
              onChange={(e) => void handleBaseCurrencyChange(e.target.value)}
            >
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
            <h2>
              <span aria-hidden="true">2️⃣</span> People
            </h2>
          </div>

          <div className="row" style={{ marginBottom: 12 }}>
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

          {filled.length !== count && (
            <div className="hint danger">Please fill all names before adding payments.</div>
          )}
        </div>

        <div className="card">
          <div className="cardHead">
            <h2>
              <span aria-hidden="true">3️⃣</span> Add payment
            </h2>
            <div className="muted">Default: {baseCurrency}</div>
          </div>

          <div className="payGrid">
            <div className="field">
              <label className="label">Payer</label>
              <select
                className="control"
                value={temp.payer}
                onChange={(e) => setTemp({ ...temp, payer: e.target.value })}
                disabled={filled.length === 0}
              >
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
              <PayToDropdown
                options={filled}
                selected={temp.beneficiaries}
                onChange={(beneficiaries) => setTemp((prev) => ({ ...prev, beneficiaries }))}
                disabled={filled.length === 0}
              />
            </div>

            <div className="field currencyField">
              <label className="label">Currency</label>
              <select
                className="control"
                value={temp.currency}
                onChange={(e) => setTemp({ ...temp, currency: e.target.value })}
                disabled={filled.length === 0}
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label className="label">Amount</label>
              <input
                className="control"
                inputMode="decimal"
                placeholder="0.00"
                value={temp.amount}
                onChange={(e) => setTemp({ ...temp, amount: e.target.value })}
                disabled={filled.length === 0}
              />
            </div>
          </div>

          <div className="addRow">
            <button className="btn primary" onClick={() => void addPayment()} disabled={!canAdd}>
              Add payment →
            </button>
            <input
              className="control"
              placeholder="Note (optional) e.g., taxi / dinner"
              value={temp.note}
              onChange={(e) => setTemp({ ...temp, note: e.target.value })}
              disabled={filled.length === 0}
            />
          </div>

          <div className="muted" style={{ marginTop: 10 }}>
            Add payments to generate settlement results.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="cardHead">
          <h2>
            <span aria-hidden="true">4️⃣</span> Result
          </h2>
          <div className="muted">Settled in {baseCurrency}</div>
        </div>

        <div className="balances">
          {filled.map((n) => {
            const net = totals.net[n] || 0;
            const cls = net >= 0 ? "amt pos" : "amt neg";
            const sign = net >= 0 ? "+" : "-";
            return (
              <div key={n} className="balanceRow">
                <div className="big">{n}</div>
                <div className={cls}>
                  {sign} {baseCurrency} {nf2.format(Math.abs(net))}
                </div>
              </div>
            );
          })}
        </div>

        {payments.length > 0 ? (
          <>
            <div className="muted" style={{ marginTop: 10 }}>
              Suggested transfers
            </div>

            <div className="transfers">
              {transfers.length === 0 ? (
                <div className="transferRow">
                  <div className="muted">All settled.</div>
                </div>
              ) : (
                transfers.map((t, idx) => (
                  <div key={idx} className="transferRow">
                    <b>{t.from}</b> → <b>{t.to}</b>
                    <span className="spacer" />
                    <span className="amt">
                      {baseCurrency} {nf2.format(t.amt)}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="muted" style={{ marginTop: 14 }}>
              Payment list
            </div>

            <div className="list">
              {payments.map((p) => (
                <div key={p.id} className="item">
                  <div>
                    <div className="big">
                      {p.payer} paid {p.currency} {nf2.format(p.amount)}
                    </div>
                    <div className="itemSub">
                      for {p.beneficiaries.join(", ")} • {baseCurrency}{" "}
                      {nf2.format(p.baseAmount)} (rate {nf2.format(p.rateUsed)})
                      {p.note ? ` • ${p.note}` : ""}
                    </div>
                  </div>
                  <div className="itemRight">
                    <button className="btn ghost" onClick={() => removePayment(p.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="muted">Add a payment to see results.</div>
        )}
      </div>
    </section>
  );
}