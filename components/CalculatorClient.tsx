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

type Person = { id: string; name: string };

type Payment = {
  id: string;
  /**
   * People are referenced by id, never by name. Names are labels the user can
   * edit at any time; using them as identity meant a rename dropped the
   * person's paid/owed totals out of the settlement and the books stopped
   * balancing, and two people sharing a name collapsed into one.
   */
  payerId: string;
  beneficiaryIds: string[];
  currency: string;
  amount: number;
  baseCurrency: string;
  baseAmount: number;
  rateUsed: number;
  /** Which tier of the FX chain produced rateUsed, so backup rates stay flagged. */
  rateSource: string;
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

// Currencies this app offers that are not subdivided in practice. JPY and KRW
// have no minor unit at all; TWD formally has one (ISO 4217 lists two digits)
// but Taiwan does not transact in it, and "NT$3,333.33" is not a transfer
// anybody can actually make.
const ZERO_DECIMAL_CURRENCIES = new Set(["JPY", "KRW", "TWD"]);

const formatterCache = new Map<number, Intl.NumberFormat>();

function decimalsFor(currency: string) {
  return ZERO_DECIMAL_CURRENCIES.has(currency) ? 0 : 2;
}

function formatMoney(value: number, currency: string) {
  const digits = decimalsFor(currency);
  let nf = formatterCache.get(digits);
  if (!nf) {
    nf = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    formatterCache.set(digits, nf);
  }
  return nf.format(value);
}

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function sanitizeName(s: string) {
  return (s || "").trim();
}

/**
 * Fixed ids, not uid(). This page is prerendered, so a useState initializer
 * runs once on the server and again on the client; random ids would differ
 * between the two, and React does not repair attribute mismatches during
 * hydration — the <option value> in the served HTML would keep pointing at
 * ids that client state no longer had, so every payment referenced a person
 * who did not exist. Ids minted by resizePeople are safe: it only runs from
 * event handlers, which are client-only.
 */
const INITIAL_PEOPLE: Person[] = [
  { id: "person-1", name: "Alice" },
  { id: "person-2", name: "Bob" },
  { id: "person-3", name: "Charlie" },
];

function resizePeople(prev: Person[], nextCount: number) {
  if (prev.length === nextCount) return prev;
  const next = prev.slice(0, nextCount);
  while (next.length < nextCount) next.push({ id: uid(), name: "" });
  return next;
}

/**
 * Drop people who no longer exist from a payment. The payer going away voids
 * the whole entry; a beneficiary going away re-splits the same amount across
 * whoever is left. Returns null when the payment can no longer mean anything.
 */
function reconcilePayment(p: Payment, liveIds: Set<string>): Payment | null {
  if (!liveIds.has(p.payerId)) return null;
  const beneficiaryIds = p.beneficiaryIds.filter((id) => liveIds.has(id));
  if (beneficiaryIds.length === 0) return null;
  if (beneficiaryIds.length === p.beneficiaryIds.length) return p;
  return { ...p, beneficiaryIds };
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
  const [people, setPeople] = useState<Person[]>(INITIAL_PEOPLE);
  const [rosterNotice, setRosterNotice] = useState<string>("");

  const [fxError, setFxError] = useState<string>("");
  const [fxNotice, setFxNotice] = useState<string>("");
  // Number of FX lookups in flight. Adding a payment while one is running used
  // to lose the entry, so the Add button waits for the rate instead.
  const [fxPending, setFxPending] = useState<number>(0);

  const [payments, setPayments] = useState<Payment[]>([]);
  const [temp, setTemp] = useState<{
    payerId: string;
    beneficiaryIds: string[];
    currency: string;
    amount: string;
    note: string;
  }>({
    payerId: "",
    beneficiaryIds: [],
    currency: "USD",
    amount: "",
    note: "",
  });

  const latestFxRef = useRef<Record<string, { rate: number; source: string }>>({});

  /** Everyone who has been given a name — the roster payments can refer to. */
  const roster = useMemo(
    () => people.filter((p) => sanitizeName(p.name)),
    [people]
  );
  const nameById = useMemo(() => {
    const m = new Map<string, string>();
    for (const p of people) m.set(p.id, sanitizeName(p.name));
    return m;
  }, [people]);

  const canAdd = useMemo(() => {
    if (fxPending > 0) return false;
    if (roster.length !== count) return false;
    if (!temp.payerId) return false;
    if (!temp.beneficiaryIds.length) return false;
    const amt = Number(temp.amount);
    if (!Number.isFinite(amt) || amt <= 0) return false;
    return true;
  }, [count, roster.length, fxPending, temp.amount, temp.beneficiaryIds.length, temp.payerId]);

  /**
   * Shrinking the roster used to leave payments pointing at people who no
   * longer existed, which silently unbalanced the settlement. Reconcile them
   * and say out loud what was changed instead.
   *
   * Computed from the current `people` value rather than inside a setState
   * updater: updaters must be pure, and `resizePeople` calls `uid()`, so
   * letting React re-run it minted fresh ids and orphaned every payment.
   */
  function applyPeopleCount(nextCount: number) {
    const nextPeople = resizePeople(people, nextCount);
    // Nothing changed — leave any existing notice alone. The count input fires
    // this on blur as well as on change, which used to wipe the message the
    // moment focus moved.
    if (nextPeople === people) return;

    setRosterNotice("");
    setPeople(nextPeople);

    const liveIds = new Set(nextPeople.map((q) => q.id));

    let dropped = 0;
    let adjusted = 0;
    const kept: Payment[] = [];
    for (const p of payments) {
      const r = reconcilePayment(p, liveIds);
      if (!r) dropped++;
      else {
        if (r !== p) adjusted++;
        kept.push(r);
      }
    }
    if (dropped || adjusted) {
      setPayments(kept);
      const parts: string[] = [];
      if (dropped) parts.push(`${dropped} payment${dropped > 1 ? "s" : ""} removed`);
      if (adjusted) parts.push(`${adjusted} re-split across the remaining people`);
      setRosterNotice(`Someone was removed from the group: ${parts.join(", ")}.`);
    }

    setTemp((t) => ({
      ...t,
      payerId: liveIds.has(t.payerId) ? t.payerId : "",
      beneficiaryIds: t.beneficiaryIds.filter((id) => liveIds.has(id)),
    }));
  }

  function applyCount(nextValue: number) {
    const nextCount = Math.max(2, Math.min(20, nextValue || 2));
    setCount(nextCount);
    setCountInput(String(nextCount));
    applyPeopleCount(nextCount);
  }

  async function handleBaseCurrencyChange(nextBase: string) {
    const previousBase = baseCurrency;
    setBaseCurrency(nextBase);
    setFxError("");
    setFxNotice("");

    if (payments.length === 0) return;

    setFxPending((n) => n + 1);
    try {
      const converted = new Map<string, Payment>();
      let usedBackup = false;
      for (const p of payments) {
        if (p.currency === nextBase) {
          converted.set(p.id, {
            ...p,
            baseCurrency: nextBase,
            baseAmount: p.amount,
            rateUsed: 1,
            rateSource: "identity",
          });
          continue;
        }

        const key = `${p.currency}->${nextBase}`;
        const cached = latestFxRef.current[key];
        // Reuse the cached rate *and* the tier it came from, so a backup rate
        // stays labelled as one on every later payment instead of only the first.
        const fx = cached
          ? { rate: cached.rate, source: cached.source, base: p.currency, to: nextBase }
          : await fetchFxRate(p.currency, nextBase);

        latestFxRef.current[key] = { rate: fx.rate, source: fx.source };
        if (fx.source === "backup-table") usedBackup = true;

        converted.set(p.id, {
          ...p,
          baseCurrency: nextBase,
          baseAmount: p.amount * fx.rate,
          rateUsed: fx.rate,
          rateSource: fx.source,
        });
      }
      // `payments` is the snapshot taken before the awaits above. Merge by id
      // so anything added meanwhile survives instead of being overwritten.
      setPayments((prev) => prev.map((p) => converted.get(p.id) ?? p));
      setFxNotice(
        usedBackup
          ? "FX data was temporarily unavailable. Using backup USD rates."
          : ""
      );
    } catch (e: unknown) {
      // Every stored baseAmount is still expressed in the old currency, so
      // leaving the label on the new one would show a settlement that is wrong
      // by an entire exchange rate. Put the base back where it was.
      setBaseCurrency(previousBase);
      setFxError(
        `${getErrorMessage(e) || "FX conversion failed"} — still settling in ${previousBase}.`
      );
    } finally {
      setFxPending((n) => n - 1);
    }
  }

  async function addPayment() {
    setFxError("");
    setFxNotice("");
    if (!canAdd) return;

    const amt = Number(temp.amount);
    const from = temp.currency;
    const to = baseCurrency;

    setFxPending((n) => n + 1);
    try {
      let rateUsed = 1;
      let baseAmount = amt;
      let rateSource = "identity";

      if (from !== to) {
        const key = `${from}->${to}`;
        const cached = latestFxRef.current[key];
        const fx = cached
          ? { rate: cached.rate, source: cached.source, base: from, to }
          : await fetchFxRate(from, to);
        latestFxRef.current[key] = { rate: fx.rate, source: fx.source };

        rateUsed = fx.rate;
        baseAmount = amt * fx.rate;
        rateSource = fx.source;
      }

      const p: Payment = {
        id: uid(),
        payerId: temp.payerId,
        beneficiaryIds: temp.beneficiaryIds,
        currency: from,
        amount: amt,
        baseCurrency: to,
        baseAmount,
        rateUsed,
        rateSource,
        note: temp.note?.trim() || undefined,
      };

      setPayments((prev) => [p, ...prev]);
      setTemp((prev) => ({ ...prev, amount: "", note: "" }));
    } catch (e: unknown) {
      setFxError(getErrorMessage(e) || "Failed to add payment");
    } finally {
      setFxPending((n) => n - 1);
    }
  }

  function removePayment(id: string) {
    setPayments((prev) => prev.filter((p) => p.id !== id));
  }

  const totals = useMemo(() => {
    const paid: Record<string, number> = {};
    const owed: Record<string, number> = {};

    for (const person of roster) {
      paid[person.id] = 0;
      owed[person.id] = 0;
    }

    for (const p of payments) {
      paid[p.payerId] = (paid[p.payerId] ?? 0) + p.baseAmount;

      const each = p.baseAmount / p.beneficiaryIds.length;
      for (const b of p.beneficiaryIds) owed[b] = (owed[b] ?? 0) + each;
    }

    // Net over every id that appears anywhere, not just the current roster, so
    // a stale reference can never quietly remove money from the settlement.
    const ids = new Set<string>([...Object.keys(paid), ...Object.keys(owed)]);
    const net: Record<string, number> = {};
    for (const id of ids) net[id] = (paid[id] || 0) - (owed[id] || 0);

    return { paid, owed, net };
  }, [roster, payments]);

  const usesBackupRate = useMemo(
    () => payments.some((p) => p.rateSource === "backup-table"),
    [payments]
  );

  const transfers = useMemo(() => {
    const creditors: { id: string; amt: number }[] = [];
    const debtors: { id: string; amt: number }[] = [];

    for (const [id, amt] of Object.entries(totals.net)) {
      if (amt > 0.00001) creditors.push({ id, amt });
      else if (amt < -0.00001) debtors.push({ id, amt: -amt });
    }

    creditors.sort((a, b) => b.amt - a.amt);
    debtors.sort((a, b) => b.amt - a.amt);

    const out: { fromId: string; toId: string; amt: number }[] = [];
    let i = 0,
      j = 0;

    while (i < debtors.length && j < creditors.length) {
      const d = debtors[i];
      const c = creditors[j];
      const pay = Math.min(d.amt, c.amt);

      out.push({ fromId: d.id, toId: c.id, amt: pay });

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
          {usesBackupRate ? (
            <p className="hint warn">
              Some entries use backup rates, not live ones. Treat those amounts as
              approximate.
            </p>
          ) : null}
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
                    applyPeopleCount(nextValue);
                  }
                }}
                onBlur={() => {
                  // An empty box on blur means "unchanged", not "two people".
                  if (countInput.trim() === "") {
                    setCountInput(String(count));
                    return;
                  }
                  applyCount(Number(countInput));
                }}
              />
            </div>

            <div className="peopleGrid">
              {people.map((person, idx) => (
                <label className="personField" key={person.id}>
                  <UserCircle size={18} weight="light" aria-hidden="true" />
                  <span className="srOnly">Person {idx + 1}</span>
                  <input
                    className="personInput"
                    placeholder={`Person ${idx + 1}`}
                    value={person.name}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPeople((prev) =>
                        prev.map((q) => (q.id === person.id ? { ...q, name: v } : q))
                      );
                    }}
                  />
                  <DotsSixVertical className="dragDots" size={16} weight="bold" aria-hidden="true" />
                </label>
              ))}
            </div>

            {roster.length !== count ? (
              <div className="hint danger">Please fill all names before adding payments.</div>
            ) : null}
            {rosterNotice ? <div className="hint warn">{rosterNotice}</div> : null}
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
                  value={temp.payerId}
                  onChange={(e) => setTemp({ ...temp, payerId: e.target.value })}
                  disabled={roster.length === 0}
                >
                  <option value="">Select payer</option>
                  {roster.map((person) => (
                    <option key={person.id} value={person.id}>{person.name}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">Pay for</label>
                <PayToDropdown
                  options={roster.map((person) => ({
                    value: person.id,
                    label: person.name,
                  }))}
                  selected={temp.beneficiaryIds}
                  onChange={(beneficiaryIds) =>
                    setTemp((prev) => ({ ...prev, beneficiaryIds }))
                  }
                  disabled={roster.length === 0}
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="payment-currency">Currency</label>
                <select
                  id="payment-currency"
                  className="control"
                  value={temp.currency}
                  onChange={(e) => setTemp({ ...temp, currency: e.target.value })}
                  disabled={roster.length === 0}
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
                  disabled={roster.length === 0}
                />
              </div>
            </div>

            <button
              className="btn primary addPaymentButton"
              onClick={() => void addPayment()}
              disabled={!canAdd}
              aria-busy={fxPending > 0}
            >
              <span>{fxPending > 0 ? "Getting exchange rate…" : "Add payment"}</span>
              <Plus size={20} weight="light" aria-hidden="true" />
            </button>

            <input
              className="control noteInput"
              placeholder="Note (optional) e.g., taxi / dinner"
              value={temp.note}
              onChange={(e) => setTemp({ ...temp, note: e.target.value })}
              disabled={roster.length === 0}
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
            {roster.map((person) => {
              const net = totals.net[person.id] || 0;
              const cls = net >= 0 ? "amt pos" : "amt neg";
              const sign = net >= 0 ? "+" : "−";
              return (
                <div key={person.id} className="balanceRow">
                  <div className="balancePerson">
                    <UserCircle size={18} weight="light" aria-hidden="true" />
                    <div>
                      <div className="big">{person.name}</div>
                      <div className={cls}>
                        {sign} {baseCurrency} {formatMoney(Math.abs(net), baseCurrency)}
                      </div>
                    </div>
                  </div>
                  <div className="pixelAmount">{formatMoney(Math.abs(net), baseCurrency)}</div>
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
                      <div className="big">
                        {nameById.get(p.payerId) ?? "—"} paid {p.currency}{" "}
                        {formatMoney(p.amount, p.currency)}
                      </div>
                      <div className="itemSub">
                        for{" "}
                        {p.beneficiaryIds
                          .map((id) => nameById.get(id))
                          .filter(Boolean)
                          .join(", ")}{" "}
                        · {baseCurrency} {formatMoney(p.baseAmount, baseCurrency)}
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
              <article className="ledgerEntry" key={`${t.fromId}-${t.toId}-${idx}`}>
                <Plus className="ledgerEntryMark" size={28} weight="thin" aria-hidden="true" />
                <div className="ledgerPerson">
                  <UserCircle size={21} weight="light" aria-hidden="true" />
                  <div>
                    <strong>{nameById.get(t.fromId) ?? "—"}</strong>
                    <span>Pay to {nameById.get(t.toId) ?? "—"}</span>
                    <small>{baseCurrency}</small>
                  </div>
                </div>
                <div className="ledgerAmount">{formatMoney(t.amt, baseCurrency)}</div>
              </article>
            ))
          ) : (
            roster.map((person) => {
              const net = totals.net[person.id] || 0;
              return (
                <article className="ledgerEntry" key={person.id}>
                  <Plus className="ledgerEntryMark" size={28} weight="thin" aria-hidden="true" />
                  <div className="ledgerPerson">
                    <UserCircle size={21} weight="light" aria-hidden="true" />
                    <div>
                      <strong>{person.name}</strong>
                      <span>{net < 0 ? "Owes" : "Balance"}</span>
                      <small>{baseCurrency}</small>
                    </div>
                  </div>
                  <div className="ledgerAmount">{formatMoney(Math.abs(net), baseCurrency)}</div>
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
          <span>
            Precision<br />
            <b>
              {decimalsFor(baseCurrency) === 0
                ? "whole units"
                : "2 decimal places"}
            </b>
          </span>
        </div>
        <ArrowRight className="ledgerArrow" size={22} weight="thin" aria-hidden="true" />
      </aside>
    </>
  );
}
