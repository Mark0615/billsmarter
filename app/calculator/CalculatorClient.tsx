"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MultiSelect from "@/components/MultiSelect";

type Payment = {
  payer: string;
  beneficiaries: string[];
  amount: number;      // 原幣金額（使用者輸入）
  currency: string;    // 原幣別（使用者選）
  amountBase: number;  // 換算成主幣別後金額（用於計算）
  note?: string;
};

type FxState = {
  base: string;
  date?: string;
  rates: Record<string, number>;
};

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function calculate(people: string[], payments: Payment[]) {
  const balance: Record<string, number> = Object.fromEntries(
    people.map((p) => [p, 0])
  );

  for (const { payer, beneficiaries, amountBase } of payments) {
    const share = amountBase / beneficiaries.length;
    for (const b of beneficiaries) balance[b] -= share;
    balance[payer] += amountBase;
  }

  // 收斂到 2 位避免浮點殘差
  for (const k of Object.keys(balance)) balance[k] = round2(balance[k]);

  const creditors = Object.entries(balance)
    .filter(([, v]) => v > 1e-6)
    .map(([p, v]) => [p, v] as [string, number])
    .sort((a, b) => b[1] - a[1]);

  const debtors = Object.entries(balance)
    .filter(([, v]) => v < -1e-6)
    .map(([p, v]) => [p, -v] as [string, number])
    .sort((a, b) => b[1] - a[1]);

  const settlements: [string, string, number][] = [];
  let i = 0,
    j = 0;

  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i][1], creditors[j][1]);
    const pay2 = round2(pay);

    settlements.push([debtors[i][0], creditors[j][0], pay2]);

    debtors[i][1] = round2(debtors[i][1] - pay2);
    creditors[j][1] = round2(creditors[j][1] - pay2);

    if (debtors[i][1] < 1e-6) i++;
    if (creditors[j][1] < 1e-6) j++;
  }

  return { balance, settlements };
}

function moneyFormatter(currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const CURRENCIES = [
  "TWD","USD","EUR","GBP","JPY","KRW","CNY","HKD","SGD","THB","AUD","CAD","CHF",
] as const;

export default function CalculatorClient() {
  // People
  const [count, setCount] = useState("5");
  const [names, setNames] = useState<string[]>(Array(5).fill(""));
  const filled = useMemo(
    () => names.map((n) => n.trim()).filter(Boolean),
    [names]
  );
  const ready = filled.length === Number(count);

  // Currency
  const [baseCurrency, setBaseCurrency] = useState<string>("TWD");     // ✅ 主幣別/預設幣別/結算幣別
  const [displayCurrency, setDisplayCurrency] = useState<string>("TWD"); // ✅ 只影響畫面顯示
  const [fx, setFx] = useState<FxState | null>(null);
  const [fxLoading, setFxLoading] = useState(false);

  // ✅ 簡單匯率 cache：key = "FROM->TO"
  const fxCacheRef = useRef<Record<string, number>>({});

  const fmtDisplay = useMemo(
    () => moneyFormatter(displayCurrency),
    [displayCurrency]
  );

  // Payments
  const [payments, setPayments] = useState<Payment[]>([]);
  const [temp, setTemp] = useState({
    payer: "",
    beneficiaries: [] as string[],
    currency: "TWD",
    amount: "",
    note: "",
  });

  const [result, setResult] = useState<null | {
    balance: Record<string, number>;
    settlements: [string, string, number][];
  }>(null);

  // ✅ ready 後預設 payer + beneficiaries
  useEffect(() => {
    if (!ready) return;
    setTemp((t) => ({
      ...t,
      payer: filled.includes(t.payer) ? t.payer : filled[0] || "",
      beneficiaries:
        t.beneficiaries.length === 0
          ? [...filled] // 預設全體
          : t.beneficiaries.filter((x) => filled.includes(x)),
    }));
  }, [ready, filled]);

  // ✅ baseCurrency 改變：同步 temp.currency（讓新增下一筆預設就是 base）
  useEffect(() => {
    setTemp((t) => ({ ...t, currency: baseCurrency }));
    // 避免顯示幣別跟主幣別不一致造成理解成本（你想保留也可以拿掉這行）
    setDisplayCurrency(baseCurrency);
  }, [baseCurrency]);

  // ✅ 抓顯示用匯率：baseCurrency -> displayCurrency
  useEffect(() => {
    const from = baseCurrency.toUpperCase();
    const to = displayCurrency.toUpperCase();

    if (from === to) {
      setFx({ base: from, rates: { [to]: 1 } });
      return;
    }

    const controller = new AbortController();
    (async () => {
      try {
        setFxLoading(true);
        const res = await fetch(
          `/api/fx/latest?base=${encodeURIComponent(from)}&symbols=${encodeURIComponent(to)}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setFx({
          base: data.base,
          date: data.date,
          rates: data.rates || {},
        });
      } catch {
        // ignore
      } finally {
        setFxLoading(false);
      }
    })();

    return () => controller.abort();
  }, [baseCurrency, displayCurrency]);

  const rateToDisplay = useMemo(() => {
    if (displayCurrency === baseCurrency) return 1;
    const r = fx?.rates?.[displayCurrency];
    return typeof r === "number" && r > 0 ? r : null;
  }, [fx, baseCurrency, displayCurrency]);

  const toDisplay = (amountInBase: number) => {
    if (displayCurrency === baseCurrency) return amountInBase;
    if (!rateToDisplay) return amountInBase;
    return amountInBase * rateToDisplay;
  };

  // ✅ 取得匯率：FROM -> TO （用你的 /api/fx/latest）
  const getRate = async (from: string, to: string) => {
    const f = from.toUpperCase();
    const t = to.toUpperCase();
    if (f === t) return 1;

    const key = `${f}->${t}`;
    const cached = fxCacheRef.current[key];
    if (typeof cached === "number" && cached > 0) return cached;

    // ✅ 永遠跟後端拿 USD base 的 rates，包含 from/to
    const res = await fetch(
        `/api/fx/latest?symbols=${encodeURIComponent(`${f},${t}`)}`
    );
    if (!res.ok) return 1;

    const data = await res.json();
    const rates = data?.rates || {};

    // frankfurter 回傳在 base=USD 下：rates[TWD] = 多少 TWD / 1 USD
    const usdToF = f === "USD" ? 1 : rates[f];
    const usdToT = t === "USD" ? 1 : rates[t];

    if (!Number.isFinite(usdToF) || usdToF <= 0) return 1;
    if (!Number.isFinite(usdToT) || usdToT <= 0) return 1;

    // ✅ cross rate: f -> t = (USD->t) / (USD->f)
    const rate = usdToT / usdToF;

    fxCacheRef.current[key] = rate;
    return rate;
  };

  const addPayment = async () => {
    const amt = Number(temp.amount);
    if (!Number.isFinite(amt) || amt <= 0) return;
    if (!temp.payer) return;

    const ben = temp.beneficiaries.length ? temp.beneficiaries : [...filled];
    const cur = (temp.currency || baseCurrency).toUpperCase();

    // ✅ 原幣 -> 主幣
    const rate = await getRate(cur, baseCurrency);
    const amountBase = round2(amt * rate);

    setPayments((p) => [
      ...p,
      {
        payer: temp.payer,
        beneficiaries: ben,
        amount: round2(amt),
        currency: cur,
        amountBase,
        note: temp.note?.trim() || undefined,
      },
    ]);

    setTemp((t) => ({ ...t, amount: "", note: "" }));
    setResult(null);
  };

  const currencyOptions = CURRENCIES.map((c) => ({ value: c, label: c }));

  return (
    <div className="page">
      <div className="container">
        <header className="hero">
          <h1 className="title">BillSmart</h1>
          <p className="subtitle">Clean, simple split-bill calculator (multi-currency)</p>
        </header>

        {/* Currency Bar */}
        <section className="card">
          <div className="cardHead">
            <h2 className="cardTitle">Currency</h2>
            <span className="badge">Base: {baseCurrency}</span>
          </div>

          <div className="grid3">
            <div>
              <div className="label">Base (calculation & default)</div>
              <select
                className="control"
                value={baseCurrency}
                onChange={(e) => {
                  setBaseCurrency(e.target.value);
                  setFx(null);
                }}
              >
                {currencyOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="label">Display (UI only)</div>
              <select
                className="control"
                value={displayCurrency}
                onChange={(e) => setDisplayCurrency(e.target.value)}
              >
                {currencyOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="fxBox">
              {displayCurrency === baseCurrency ? (
                <div className="fxText">No FX needed</div>
              ) : fxLoading ? (
                <div className="fxText">Fetching FX…</div>
              ) : rateToDisplay ? (
                <div className="fxText">
                  1 {baseCurrency} ≈ {rateToDisplay.toFixed(4)} {displayCurrency}
                  {fx?.date ? <span className="fxSub"> · {fx.date}</span> : null}
                </div>
              ) : (
                <div className="fxText">FX not available (showing base)</div>
              )}
            </div>
          </div>
        </section>

        {/* 1 People */}
        <section className="card">
          <div className="cardHead">
            <h2 className="cardTitle">1️⃣ People</h2>
          </div>

          <div className="row">
            <label className="labelInline">Count</label>
            <input
              className="control small"
              type="number"
              min={1}
              max={26}
              step={1}
              value={count}
              onChange={(e) => {
                const raw = e.target.value;
                const n = Number(raw || 0);
                setCount(raw);
                setNames((prev) =>
                  n > prev.length
                    ? [...prev, ...Array(n - prev.length).fill("")]
                    : prev.slice(0, n)
                );
                setPayments([]);
                setResult(null);
              }}
            />
          </div>

          <div className="grid2" style={{ marginTop: 12 }}>
            {names.map((n, i) => (
              <input
                key={i}
                className="control"
                placeholder={`Person ${i + 1}`}
                value={n}
                onChange={(e) => {
                  const next = [...names];
                  next[i] = e.target.value;
                  setNames(next);
                }}
              />
            ))}
          </div>

          {!ready && <p className="hint error">Please fill all names.</p>}
        </section>

        {/* 2 Add Payment */}
        {ready && (
          <section className="card">
            <div className="cardHead">
              <h2 className="cardTitle">2️⃣ Add a payment</h2>
              <span className="hint">Default currency: {baseCurrency}</span>
            </div>

            <div className="grid4">
              {/* payer */}
              <select
                className="control"
                value={temp.payer}
                onChange={(e) => setTemp({ ...temp, payer: e.target.value })}
              >
                <option value="">Payer</option>
                {filled.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              {/* beneficiaries multi-select */}
              <div className="multiWrap">
                <MultiSelect
                  options={filled.map((n) => ({ value: n, label: n }))}
                  value={temp.beneficiaries}
                  onChange={(next) => setTemp({ ...temp, beneficiaries: next })}
                  placeholder="Beneficiaries (multi-select)"
                />
                <div className="miniActions">
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => setTemp((t) => ({ ...t, beneficiaries: [...filled] }))}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => setTemp((t) => ({ ...t, beneficiaries: [] }))}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* currency */}
              <select
                className="control"
                value={temp.currency}
                onChange={(e) => setTemp({ ...temp, currency: e.target.value })}
              >
                {currencyOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>

              {/* amount + add */}
              <div className="amountRow">
                <input
                  className="control"
                  type="number"
                  step="0.01"
                  placeholder={`Amount (${temp.currency})`}
                  value={temp.amount}
                  onChange={(e) => setTemp({ ...temp, amount: e.target.value })}
                />
                <button type="button" className="btn" onClick={addPayment} title="Add">
                  Add
                </button>
              </div>
            </div>

            <div style={{ marginTop: 10 }}>
              <input
                className="control"
                type="text"
                placeholder="Note (optional) e.g., taxi / dinner"
                value={temp.note}
                onChange={(e) => setTemp({ ...temp, note: e.target.value })}
              />
            </div>

            {payments.length > 0 && (
              <ul className="list">
                {payments.map((p, idx) => (
                  <li key={idx} className="item">
                    <div className="itemMain">
                      <div className="itemLine">
                        <strong>{p.payer}</strong> paid for{" "}
                        <strong>{p.beneficiaries.join(", ")}</strong>
                      </div>
                      <div className="itemSub">
                        {p.currency} {p.amount.toFixed(2)}{" "}
                        <span className="dot">·</span>{" "}
                        Base {baseCurrency} {p.amountBase.toFixed(2)}
                        {p.note ? (
                          <>
                            {" "}
                            <span className="dot">·</span> {p.note}
                          </>
                        ) : null}
                      </div>
                    </div>

                    <div className="itemRight">
                      <div className="itemValue">
                        {fmtDisplay.format(toDisplay(p.amountBase))}
                      </div>
                      <button
                        type="button"
                        className="btn ghost"
                        onClick={() => setPayments((arr) => arr.filter((_, i) => i !== idx))}
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* 3 Calculate */}
        {ready && (
          <div className="center" style={{ marginTop: 14 }}>
            <button
              type="button"
              className="btn primary"
              disabled={!payments.length}
              onClick={() => setResult(calculate(filled, payments))}
            >
              Calculate
            </button>
          </div>
        )}

        {/* 4 Result */}
        {result && (
          <div style={{ marginTop: 14 }}>
            <section className="card">
              <div className="cardHead">
                <h2 className="cardTitle">Balances</h2>
                <span className="hint">Shown in {displayCurrency}</span>
              </div>

              <ul className="balanceGrid">
                {filled.map((n) => (
                  <li key={n} className="balanceRow">
                    <span className="muted">{n}</span>
                    <span className="mono">
                      {result.balance[n] > 0 ? "+" : ""}
                      {fmtDisplay.format(toDisplay(result.balance[n]))}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card" style={{ marginTop: 12 }}>
              <div className="cardHead">
                <h2 className="cardTitle">Suggested settlements</h2>
                <span className="hint">Based on {baseCurrency}</span>
              </div>

              {result.settlements.length ? (
                <ul className="settleList">
                  {result.settlements.map(([d, c, a], i) => (
                    <li key={i} className="settleRow">
                      <span className="muted">
                        {d} → {c}
                      </span>
                      <span className="mono">{fmtDisplay.format(toDisplay(a))}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="hint">🎉 Settled!</p>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}