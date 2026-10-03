"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  Asterisk,
  ArrowRight,
  Plus,
  UserCircle,
} from "@phosphor-icons/react";
import PayToDropdown from "./PayToDropdown";

import { CURRENCIES, MAX_AMOUNT, calculate, decimalsFor, describeRate, formatMoney, validAmount, type Person, type Payment } from "@/lib/bills";

function checkedConversion(amount: number, rate: number) {
  const value = amount * rate;
  if (!Number.isFinite(value) || value <= 0 || value > MAX_AMOUNT) throw new Error("Converted amount is too large. Split this into smaller entries.");
  return value;
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

type FxResult = { rate: number; source: string; base: string; to: string; date?: string; fetchedAt?: string };

async function fetchFxRate(from: string, to: string): Promise<FxResult> {
  const url = new URL("/api/fx/latest", window.location.origin);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);

  const resp = await fetch(url.toString(), { cache: "no-store", signal: AbortSignal.timeout(15000) });
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
  if (!maybe || typeof maybe.rate !== "number" || !Number.isFinite(maybe.rate) || maybe.rate <= 0) throw new Error("FX rate missing");

  return maybe as FxResult;
}

export default function CalculatorClient() {
  const [baseCurrency, setBaseCurrency] = useState<string>("USD");
  const [count, setCount] = useState<number>(3);
  const [countInput, setCountInput] = useState<string>("3");
  const [people, setPeople] = useState<Person[]>(INITIAL_PEOPLE);
  const [rosterNotice, setRosterNotice] = useState<string>("");

  const [fxError, setFxError] = useState<string>("");
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

  const [pdfPending, setPdfPending] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const busyRef = useRef(false);

  async function downloadPdf() {
    if (!payments.length || roster.length !== count || pdfPending || busyRef.current) return;
    setPdfPending(true);
    setPdfError("");
    try {
      const { createSettlementPdf } = await import("@/lib/settlementPdf");
      const blob = await createSettlementPdf({
        people: people.map(person => ({ ...person })),
        payments: payments.map(payment => ({ ...payment, beneficiaryIds: [...payment.beneficiaryIds] })),
        currency: baseCurrency,
        transfers: totals.transfers.map(transfer => ({ ...transfer })),
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `billsmarter-settlement-${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30_000);
    } catch (error) {
      setPdfError(`PDF download failed: ${getErrorMessage(error)}`);
    } finally {
      setPdfPending(false);
    }
  }

  const latestFxRef = useRef<Record<string, FxResult>>({});

  /** Everyone who has been given a name — the roster payments can refer to. */
  const roster = useMemo(
    () => people.filter((p) => sanitizeName(p.name)),
    [people]
  );
  const nameById = useMemo(() => {
    const m = new Map<string, string>();
    const counts = new Map<string, number>();
    for (const p of people) {
      const name = sanitizeName(p.name);
      if (name) counts.set(name.toLocaleLowerCase(), (counts.get(name.toLocaleLowerCase()) ?? 0) + 1);
    }
    for (const [index, p] of people.entries()) {
      const name = sanitizeName(p.name);
      m.set(p.id, !name ? `Person ${index + 1} (name required)` : counts.get(name.toLocaleLowerCase())! > 1 ? `${name} (#${index + 1})` : name);
    }
    return m;
  }, [people]);

  const canAdd = useMemo(() => {
    if (fxPending > 0 || payments.length >= 5000) return false;
    if (roster.length !== count) return false;
    if (!temp.payerId) return false;
    if (!temp.beneficiaryIds.length) return false;
    if (!validAmount(temp.amount, temp.currency)) return false;
    return true;
  }, [count, roster.length, fxPending, payments.length, temp.amount, temp.currency, temp.beneficiaryIds.length, temp.payerId]);

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
    if (busyRef.current) return;
    const nextPeople = resizePeople(people, nextCount);
    if (nextCount < people.length && payments.length && !window.confirm("Removing people may delete their payments or change how costs are shared. Continue?")) {setCount(people.length);setCountInput(String(people.length));return;}
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
    if (busyRef.current) return;
    const previousBase = baseCurrency;
    setFxError("");

    if (payments.length === 0) {setBaseCurrency(nextBase); setTemp(t => ({...t,currency:nextBase})); return;}
    busyRef.current = true;

    setFxPending((n) => n + 1);
    try {
      const converted = new Map<string, Payment>();
      for (const p of payments) {
        if (p.currency === nextBase) {
          converted.set(p.id, {
            ...p,
            baseCurrency: nextBase,
            baseAmount: p.amount,
            rateUsed: 1,
            rateSource: "identity",
            rateDate: undefined,
            rateFetchedAt: undefined,
          });
          continue;
        }

        const key = `${p.currency}->${nextBase}`;
        const cached = latestFxRef.current[key];
        // Reuse the cached rate and its source for this currency pair.
        const fx = cached ?? await fetchFxRate(p.currency, nextBase);

        latestFxRef.current[key] = fx;

        converted.set(p.id, {
          ...p,
          baseCurrency: nextBase,
          baseAmount: checkedConversion(p.amount, fx.rate),
          rateUsed: fx.rate,
          rateSource: fx.source,
          rateDate: fx.date,
          rateFetchedAt: fx.fetchedAt,
        });
      }
      // `payments` is the snapshot taken before the awaits above. Merge by id
      // so anything added meanwhile survives instead of being overwritten.
      setPayments((prev) => prev.map((p) => converted.get(p.id) ?? p));
      setBaseCurrency(nextBase);
      setTemp(t => ({...t,currency:nextBase}));
    } catch (e: unknown) {
      // Every stored baseAmount is still expressed in the old currency, so
      // leaving the label on the new one would show a settlement that is wrong
      // by an entire exchange rate. Put the base back where it was.
      setBaseCurrency(previousBase);
      setFxError(
        `${getErrorMessage(e) || "FX conversion failed"} — still settling in ${previousBase}.`
      );
    } finally {
      busyRef.current = false;
      setFxPending((n) => n - 1);
    }
  }

  async function addPayment() {
    setFxError("");
    if (!canAdd || busyRef.current || payments.length >= 5000) return;
    busyRef.current = true;

    const amt = Number(temp.amount);
    const from = temp.currency;
    const to = baseCurrency;

    setFxPending((n) => n + 1);
    try {
      let rateUsed = 1;
      let baseAmount = amt;
      let rateSource = "identity";
      let rateDate: string | undefined;
      let rateFetchedAt: string | undefined;

      if (from !== to) {
        const key = `${from}->${to}`;
        const cached = latestFxRef.current[key];
        const fx = cached ?? await fetchFxRate(from, to);
        latestFxRef.current[key] = fx;

        rateUsed = fx.rate;
        baseAmount = checkedConversion(amt, fx.rate);
        rateSource = fx.source;
        rateDate = fx.date;
        rateFetchedAt = fx.fetchedAt;
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
        rateDate,
        rateFetchedAt,
        note: temp.note?.trim() || undefined,
      };

      setPayments((prev) => [p, ...prev]);
      setTemp((prev) => ({ ...prev, amount: "", note: "" }));
    } catch (e: unknown) {
      setFxError(getErrorMessage(e) || "Failed to add payment");
    } finally {
      busyRef.current = false;
      setFxPending((n) => n - 1);
    }
  }

  function removePayment(id: string) {
    if (busyRef.current || !window.confirm("Remove this payment?")) return;
    setPayments((prev) => prev.filter((p) => p.id !== id));
  }

  const totals = useMemo(() => calculate(people, payments, baseCurrency), [people, payments, baseCurrency]);
  const transfers = totals.transfers;

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
                disabled={fxPending > 0}
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

          {fxPending > 0 ? <p role="status" className="hint">Updating amounts… Please wait before using the settlement.</p> : null}
          {fxError ? <p className="hint danger">FX error: {fxError}</p> : null}
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
                disabled={fxPending > 0}
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
                    disabled={fxPending > 0}
                    maxLength={200}
                    placeholder={`Person ${idx + 1}`}
                    value={person.name}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPeople((prev) =>
                        prev.map((q) => (q.id === person.id ? { ...q, name: v } : q))
                      );
                    }}
                  />
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
                  disabled={roster.length === 0 || fxPending > 0}
                >
                  <option value="">Select payer</option>
                  {roster.map((person) => (
                    <option key={person.id} value={person.id}>{nameById.get(person.id)}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label">Pay for</label>
                <PayToDropdown
                  options={roster.map((person) => ({
                    value: person.id,
                    label: nameById.get(person.id) ?? person.name,
                  }))}
                  selected={temp.beneficiaryIds}
                  onChange={(beneficiaryIds) =>
                    setTemp((prev) => ({ ...prev, beneficiaryIds }))
                  }
                  disabled={roster.length === 0 || fxPending > 0}
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="payment-currency">Currency</label>
                <select
                  id="payment-currency"
                  className="control"
                  value={temp.currency}
                  onChange={(e) => setTemp({ ...temp, currency: e.target.value })}
                  disabled={roster.length === 0 || fxPending > 0}
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
                  maxLength={100}
                  value={temp.amount}
                  onChange={(e) => setTemp({ ...temp, amount: e.target.value })}
                  disabled={roster.length === 0 || fxPending > 0}
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
              maxLength={2000}
              value={temp.note}
              onChange={(e) => setTemp({ ...temp, note: e.target.value })}
              disabled={roster.length === 0 || fxPending > 0}
              aria-label="Payment note"
            />

            <div className="muted formHint">
              Add the receipt total. Selected people split it equally; rounding remainders follow the people list.
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
            {people.map((person) => {
              const net = totals.net[person.id] || 0;
              const cls = net >= 0 ? "amt pos" : "amt neg";
              const sign = net >= 0 ? "+" : "−";
              return (
                <div key={person.id} className="balanceRow">
                  <div className="balancePerson">
                    <UserCircle size={18} weight="light" aria-hidden="true" />
                    <div>
                      <div className="big">{nameById.get(person.id)}</div>
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
                      {describeRate(p) ? <div className="itemRate">{describeRate(p)}</div> : null}
                    </div>
                    <button className="btn ghost" disabled={fxPending>0} onClick={() => removePayment(p.id)}>
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
            people.map((person) => {
              const net = totals.net[person.id] || 0;
              return (
                <article className="ledgerEntry" key={person.id}>
                  <Plus className="ledgerEntryMark" size={28} weight="thin" aria-hidden="true" />
                  <div className="ledgerPerson">
                    <UserCircle size={21} weight="light" aria-hidden="true" />
                    <div>
                      <strong>{nameById.get(person.id)}</strong>
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

        <div className="settlementExport">
          <button className="btn primary" type="button" onClick={() => void downloadPdf()} disabled={!payments.length || roster.length !== count || fxPending > 0 || pdfPending}>
            {pdfPending ? "Preparing PDF…" : "Download PDF"}
          </button>
          {payments.length > 0 && roster.length !== count ? <p role="status">Fill every name before downloading the settlement record.</p> : null}
          <p>Keep a copy of the payments and final transfers. This page does not save your calculation after a refresh.</p>
          {pdfError ? <p role="alert" className="hint danger">{pdfError}</p> : null}
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
