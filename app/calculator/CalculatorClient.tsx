"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import PayToDropdown from "./PayToDropdown";

type Payment = {
  id: string;
  payer: string;
  beneficiaries: string[]; // pay to
  currency: string;        // original currency
  amount: number;          // original amount
  baseCurrency: string;    // snapshot at add time
  baseAmount: number;      // converted to baseCurrency
  note?: string;
};

const CURRENCIES = [
  "USD","EUR","JPY","KRW","TWD","THB","SGD","HKD","CNY","GBP","AUD","CAD","CHF",
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

const nf2 = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
function fmt2(n: number) {
  if (!Number.isFinite(n)) return "0.00";
  return nf2.format(n);
}

export default function CalculatorClient() {
  // ===== Currency (Base only) =====
  const [baseCurrency, setBaseCurrency] = useState<string>("USD");

  // ===== People =====
  const [count, setCount] = useState<number>(3);
  const [names, setNames] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    setNames((prev) => {
      const next = [...prev];
      if (count > next.length) {
        while (next.length < count) next.push("");
      } else if (count < next.length) {
        next.length = count;
      }
      return next;
    });
  }, [count]);

  const filled = useMemo(
    () => names.map((n) => n.trim()).filter(Boolean),
    [names]
  );

  // ===== Add payment temp =====
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

  // keep temp currency synced to base only as default (not forced)
  useEffect(() => {
    setTemp((t) => ({
      ...t,
      // 如果你希望「新增付款的預設幣別」永遠跟 base 一致，就保留這行：
      currency: baseCurrency,
      // payer/beneficiaries/amount/note 不動
    }));
  }, [baseCurrency]);

  // ===== Payments =====
  const [payments, setPayments] = useState<Payment[]>([]);

  // ===== FX cache =====
  const fxCacheRef = useRef<Record<string, number>>({});

  async function getFxRate(from: string, to: string) {
    if (from === to) return 1;

    const key = `${from}->${to}`;
    const cached = fxCacheRef.current[key];
    if (cached && Number.isFinite(cached)) return cached;

    const res = await fetch(
      `/api/fx/latest?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`FX API failed: ${res.status}`);

    const data = await res.json();

    // 支援兩種格式：
    // 1) { rate: 0.0067 }
    // 2) { rates: { USD: 0.0067 } }
    const rate = data?.rates?.[to] ?? data?.rate;

    if (typeof rate !== "number" || !Number.isFinite(rate)) {
      throw new Error("Invalid FX rate payload");
    }

    fxCacheRef.current[key] = rate;
    return rate;
  }

  const canAdd = useMemo(() => {
    if (!filled.length) return false;
    if (!temp.payer) return false;
    if (!filled.includes(temp.payer)) return false;
    if (!temp.beneficiaries.length) return false;
    // beneficiaries 必須都在 filled 名單內
    if (temp.beneficiaries.some((b) => !filled.includes(b))) return false;
    const amt = Number(temp.amount);
    if (!Number.isFinite(amt) || amt <= 0) return false;
    if (!temp.currency) return false;
    return true;
  }, [filled, temp]);

  async function handleAdd() {
    if (!canAdd) return;

    const amountNum = Number(temp.amount);
    const from = temp.currency;
    const to = baseCurrency;

    let rate = 1;
    try {
      rate = await getFxRate(from, to);
    } catch (e) {
      // FX 掛了也別整個壞掉：至少可以加進去，但 baseAmount 會等於原幣
      // 你也可以改成 alert + return
      console.error(e);
      rate = from === to ? 1 : NaN;
    }

    const baseAmount =
      Number.isFinite(rate) ? amountNum * rate : amountNum;

    const p: Payment = {
      id: uid(),
      payer: temp.payer,
      beneficiaries: temp.beneficiaries,
      currency: from,
      amount: amountNum,
      baseCurrency: to,
      baseAmount,
      note: temp.note?.trim() || "",
    };

    setPayments((prev) => [p, ...prev]);

    // reset (保留 payer/beneficiaries 比較好操作，你也可以全清)
    setTemp((t) => ({
      ...t,
      amount: "",
      note: "",
    }));
  }

  function removePayment(id: string) {
    setPayments((prev) => prev.filter((p) => p.id !== id));
  }

  // ===== Settlement =====
  // 以 baseAmount 去算每人應付/應收
  const settlement = useMemo(() => {
    const people = filled;
    if (!people.length) return { balances: new Map<string, number>(), transfers: [] as any[] };

    const balances = new Map<string, number>();
    people.forEach((p) => balances.set(p, 0));

    for (const pay of payments) {
      const n = pay.beneficiaries.length || 1;
      const share = pay.baseAmount / n;

      // payer pays full
      balances.set(pay.payer, (balances.get(pay.payer) ?? 0) + pay.baseAmount);

      // beneficiaries owe share each
      for (const b of pay.beneficiaries) {
        balances.set(b, (balances.get(b) ?? 0) - share);
      }
    }

    // Greedy matching: debtors -> creditors
    const creditors: { name: string; amt: number }[] = [];
    const debtors: { name: string; amt: number }[] = [];

    for (const [name, amt] of balances.entries()) {
      const rounded = Math.round(amt * 100) / 100; // cents
      if (rounded > 0) creditors.push({ name, amt: rounded });
      else if (rounded < 0) debtors.push({ name, amt: -rounded });
    }

    const transfers: { from: string; to: string; amount: number }[] = [];
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const d = debtors[i];
      const c = creditors[j];
      const x = Math.min(d.amt, c.amt);
      if (x > 0.00001) {
        transfers.push({ from: d.name, to: c.name, amount: Math.round(x * 100) / 100 });
        d.amt -= x;
        c.amt -= x;
      }
      if (d.amt <= 0.00001) i++;
      if (c.amt <= 0.00001) j++;
    }

    return { balances, transfers };
  }, [filled, payments]);

  // ===== UI =====
  return (
    <div className="wrap">
      <div className="card">
        <div className="cardHead">
          <h2>Currency</h2>
          <div className="pill">Base: {baseCurrency}</div>
        </div>

        <div className="row">
          <div className="field">
            <div className="label">Base (calculation & default)</div>
            <select
              className="control"
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="fxBox">
            <div className="fxText">No FX needed</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="cardHead">
          <h2>1 People</h2>
        </div>

        <div className="row">
          <div className="field" style={{ maxWidth: 180 }}>
            <div className="label">Count</div>
            <input
              className="control"
              type="number"
              min={2}
              max={20}
              value={count}
              onChange={(e) => setCount(Math.max(2, Math.min(20, Number(e.target.value) || 2)))}
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
          <div className="hint danger">Please fill all names.</div>
        )}
      </div>

      <div className="card">
        <div className="cardHead">
          <h2>2 Add a payment</h2>
          <div className="muted">Default currency: {baseCurrency}</div>
        </div>

        <div className="payRow">
          {/* Payer */}
          <div className="field">
            <select
              className="control"
              value={temp.payer}
              onChange={(e) => setTemp({ ...temp, payer: e.target.value })}
              disabled={filled.length === 0}
            >
              <option value="">Payer</option>
              {filled.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Pay to */}
          <div className="field">
            <PayToDropdown
              options={filled.map((n) => ({ value: n, label: n }))}
              value={temp.beneficiaries}
              onChange={(next) => setTemp({ ...temp, beneficiaries: next })}
              placeholder="Pay to"
            />
          </div>

          {/* Currency */}
          <div className="field" style={{ maxWidth: 130 }}>
            <select
              className="control"
              value={temp.currency}
              onChange={(e) => setTemp({ ...temp, currency: e.target.value })}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div className="field">
            <input
              className="control"
              inputMode="decimal"
              placeholder="Amount"
              value={temp.amount}
              onChange={(e) => setTemp({ ...temp, amount: e.target.value })}
            />
          </div>

          <button
            type="button"
            className="btn primary"
            onClick={handleAdd}
            disabled={!canAdd}
          >
            Add
          </button>
        </div>

        <div className="field" style={{ marginTop: 12 }}>
          <input
            className="control"
            placeholder="Note (optional) e.g., taxi / dinner"
            value={temp.note}
            onChange={(e) => setTemp({ ...temp, note: e.target.value })}
          />
        </div>

        <div className="list">
          {payments.map((p) => (
            <div key={p.id} className="item">
              <div className="itemLeft">
                <div className="itemTitle">
                  <b>{p.payer}</b> paid for <b>{p.beneficiaries.join(", ")}</b>
                </div>

                {/* ✅ 這行就是你紅框那段：加千分位 + 保留兩位小數 */}
                <div className="itemSub">
                  {p.currency} {fmt2(p.amount)} ・ Base {p.baseCurrency} {fmt2(p.baseAmount)}
                  {p.note ? <span className="dot"> · </span> : null}
                  {p.note ? <span>{p.note}</span> : null}
                </div>
              </div>

              <div className="itemRight">
                <div className="big">{p.baseCurrency} {fmt2(p.baseAmount)}</div>
                <button className="btn ghost" onClick={() => removePayment(p.id)} aria-label="Remove">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {payments.length === 0 && (
          <div className="hint">Add payments to calculate settlement.</div>
        )}
      </div>

      <div className="card">
        <div className="cardHead">
          <h2>3 Result</h2>
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
            <div className="hint">No transfers needed (or not enough data yet).</div>
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
    </div>
  );
}