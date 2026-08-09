"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  Asterisk,
  ArrowRight,
  DotsSixVertical,
  Plus,
  UserCircle,
} from "@phosphor-icons/react";
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
  const [countInput, setCountInput] = useState<string>("3");
  const [names, setNames] = useState<string[]>(["Alice", "Bob", "Charlie"]);

  const [fxError, setFxError] = useState<string>("");
  const [fxNotice, setFxNotice] = useState<string>("");

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

  function applyCount(nextValue: number) {
    const nextCount = Math.max(2, Math.min(20, nextValue || 2));
    setCount(nextCount);
    setCountInput(String(nextCount));
    setNames((prev) => resizeNames(prev, nextCount));
  }

  async function handleBaseCurrencyChange(nextBase: string) {
    setBaseCurrency(nextBase);
    setFxError("");
    setFxNotice("");

    if (payments.length === 0) return;

    try {
      const updated: Payment[] = [];
      let usedBackup = false;
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
        if (fx.source === "backup-table") usedBackup = true;

        updated.push({
          ...p,
          baseCurrency: nextBase,
          baseAmount: p.amount * fx.rate,
          rateUsed: fx.rate,
        });
      }
      setPayments(updated);
      setFxNotice(
        usedBackup
          ? "FX data was temporarily unavailable. Using backup USD rates."
          : ""
      );
    } catch (e: unknown) {
      setFxError(getErrorMessage(e) || "FX conversion failed");
    }
  }

  async function addPayment() {
    setFxError("");
    setFxNotice("");
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
        if (fx.source === "backup-table") {
          setFxNotice("FX data was temporarily unavailable. Using backup USD rates.");
        }
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
    <>
      <section className="calculatorWorkbench glassPanel" aria-label="Expense inputs">
        <div className="stepSection currencyCard">
          <div className="cardHead">
            <h2>
              <span className="stepNumber" aria-hidden="true">1</span>
              Choose your base currency
            </h2>
            <div className="metaLabel">Base: {baseCurrency}</div>
          </div>

          <div className="currencyRow">
            <div className="field grow">
              <label className="label" htmlFor="base-currency">
                Base currency (calculation &amp; default)
              </label>
              <select
                id="base-currency"
                className="control"
                value={baseCurrency}
                onChange={(e) => void handleBaseCurrencyChange(e.target.value)}
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="fxBox">
              Auto-convert payment entries to {baseCurrency}
            </div>
          </div>

          {fxError ? <p className="hint danger">FX error: {fxError}</p> : null}
          {!fxError && fxNotice ? <p className="hint warn">{fxNotice}</p> : null}
        </div>

        <div className="inputSplit">
          <div className="stepSection peopleSection">
            <div className="cardHead">
              <h2>
                <span className="stepNumber" aria-hidden="true">2</span>
                People
              </h2>
            </div>

            <div className="field countField">
              <label className="label" htmlFor="people-count">Count</label>
              <input
                id="people-count"
                className="control"
                type="number"
                min={2}
                max={20}
                inputMode="numeric"
                value={countInput}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") {
                    setCountInput("");
                    return;
                  }
                  if (!/^\d+$/.test(raw)) return;
                  setCountInput(raw);
                  const nextValue = Number(raw);
                  if (nextValue >= 2 && nextValue <= 20) {
                    setCount(nextValue);
                    setNames((prev) => resizeNames(prev, nextValue));
                  }
                }}
                onBlur={() => applyCount(Number(countInput))}
              />
            </div>

            <div className="peopleGrid">
              {names.map((n, idx) => (
                <label className="personField" key={idx}>
                  <UserCircle size={18} weight="light" aria-hidden="true" />
                  <span className="srOnly">Person {idx + 1}</span>
                  <input
                    className="personInput"
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
                  <DotsSixVertical className="dragDots" size={16} weight="bold" aria-hidden="true" />
                </label>
              ))}
            </div>

            {filled.length !== count ? (
              <div className="hint danger">Please fill all names before adding payments.</div>
            ) : null}
          </div>

          <div className="stepSection paymentSection">
            <div className="cardHead">
              <h2>
                <span className="stepNumber" aria-hidden="true">3</span>
                Add payment
              </h2>
              <div className="metaLabel">Default: {baseCurrency}</div>
            </div>

            <div className="payGrid">
              <div className="field">
                <label className="label" htmlFor="payer">Payer</label>
                <select
                  id="payer"
                  className="control"
                  value={temp.payer}
                  onChange={(e) => setTemp({ ...temp, payer: e.target.value })}
                  disabled={filled.length === 0}
                >
                  <option value="">Select payer</option>
                  {filled.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div className="field">
                <label className="label">Pay for</label>
                <PayToDropdown
                  options={filled}
                  selected={temp.beneficiaries}
                  onChange={(beneficiaries) =>
                    setTemp((prev) => ({ ...prev, beneficiaries }))
                  }
                  disabled={filled.length === 0}
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="payment-currency">Currency</label>
                <select
                  id="payment-currency"
                  className="control"
                  value={temp.currency}
                  onChange={(e) => setTemp({ ...temp, currency: e.target.value })}
                  disabled={filled.length === 0}
                >
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="field">
                <label className="label" htmlFor="payment-amount">Amount</label>
                <input
                  id="payment-amount"
                  className="control"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={temp.amount}
                  onChange={(e) => setTemp({ ...temp, amount: e.target.value })}
                  disabled={filled.length === 0}
                />
              </div>
            </div>

            <button
              className="btn primary addPaymentButton"
              onClick={() => void addPayment()}
              disabled={!canAdd}
            >
              <span>Add payment</span>
              <Plus size={20} weight="light" aria-hidden="true" />
            </button>

            <input
              className="control noteInput"
              placeholder="Note (optional) e.g., taxi / dinner"
              value={temp.note}
              onChange={(e) => setTemp({ ...temp, note: e.target.value })}
              disabled={filled.length === 0}
              aria-label="Payment note"
            />

            <div className="muted formHint">
              Add payments to generate settlement results.
            </div>
          </div>
        </div>

        <div className="stepSection resultSection">
          <div className="cardHead">
            <h2>
              <span className="stepNumber" aria-hidden="true">4</span>
              Result
            </h2>
            <div className="metaLabel">Settled in {baseCurrency}</div>
          </div>

          <div className="balances">
            {filled.map((n) => {
              const net = totals.net[n] || 0;
              const cls = net >= 0 ? "amt pos" : "amt neg";
              const sign = net >= 0 ? "+" : "−";
              return (
                <div key={n} className="balanceRow">
                  <div className="balancePerson">
                    <UserCircle size={18} weight="light" aria-hidden="true" />
                    <div>
                      <div className="big">{n}</div>
                      <div className={cls}>{sign} {baseCurrency} {nf2.format(Math.abs(net))}</div>
                    </div>
                  </div>
                  <div className="pixelAmount">{nf2.format(Math.abs(net))}</div>
                </div>
              );
            })}
          </div>

          {payments.length > 0 ? (
            <div className="paymentHistory">
              <p className="metaLabel">Payment list</p>
              <div className="list">
                {payments.map((p) => (
                  <div key={p.id} className="item">
                    <div>
                      <div className="big">{p.payer} paid {p.currency} {nf2.format(p.amount)}</div>
                      <div className="itemSub">
                        for {p.beneficiaries.join(", ")} · {baseCurrency} {nf2.format(p.baseAmount)}
                        {p.note ? ` · ${p.note}` : ""}
                      </div>
                    </div>
                    <button className="btn ghost" onClick={() => removePayment(p.id)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="muted emptyResult">Add a payment to see results.</div>
          )}
        </div>
      </section>

      <aside className="settlementLedger glassPanel" aria-label="Settlement ledger">
        <div className="ledgerHeader">
          <Asterisk size={16} weight="light" aria-hidden="true" />
          <div>
            <p>Settlement ledger</p>
            <span>Live calculation</span>
          </div>
          <span className="statusDot" aria-label="Calculation ready" />
          <Plus className="ledgerMark" size={28} weight="thin" aria-hidden="true" />
        </div>

        <div className="ledgerEntries">
          {payments.length > 0 && transfers.length > 0 ? (
            transfers.map((t, idx) => (
              <article className="ledgerEntry" key={`${t.from}-${t.to}-${idx}`}>
                <Plus className="ledgerEntryMark" size={28} weight="thin" aria-hidden="true" />
                <div className="ledgerPerson">
                  <UserCircle size={21} weight="light" aria-hidden="true" />
                  <div>
                    <strong>{t.from}</strong>
                    <span>Pay to {t.to}</span>
                    <small>{baseCurrency}</small>
                  </div>
                </div>
                <div className="ledgerAmount">{nf2.format(t.amt)}</div>
              </article>
            ))
          ) : (
            filled.map((n) => {
              const net = totals.net[n] || 0;
              return (
                <article className="ledgerEntry" key={n}>
                  <Plus className="ledgerEntryMark" size={28} weight="thin" aria-hidden="true" />
                  <div className="ledgerPerson">
                    <UserCircle size={21} weight="light" aria-hidden="true" />
                    <div>
                      <strong>{n}</strong>
                      <span>{net < 0 ? "Owes" : "Balance"}</span>
                      <small>{baseCurrency}</small>
                    </div>
                  </div>
                  <div className="ledgerAmount">{nf2.format(Math.abs(net))}</div>
                </article>
              );
            })
          )}

          {payments.length > 0 && transfers.length === 0 ? (
            <p className="ledgerSettled">All settled.</p>
          ) : null}
        </div>

        <div className="ledgerFooter">
          <span>Algorithm<br /><b>Fair split engine</b></span>
          <span>Precision<br /><b>2 decimal places</b></span>
        </div>
        <ArrowRight className="ledgerArrow" size={22} weight="thin" aria-hidden="true" />
      </aside>
    </>
  );
}
