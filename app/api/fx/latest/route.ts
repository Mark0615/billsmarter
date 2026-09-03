import { NextResponse } from "next/server";

export const runtime = "edge";

// Frankfurter is ECB-backed and only quotes the reference rates the ECB
// publishes. Confirmed against https://api.frankfurter.app/currencies
// (2026-09-04). Of the currencies this app offers, TWD is the one it does
// not cover, so every TWD pair used to pay for a guaranteed-miss round-trip
// before falling through to open.er-api.
const FRANKFURTER_CURRENCIES = new Set([
  "AUD",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR",
]);

function frankfurterCovers(from: string, to: string) {
  return FRANKFURTER_CURRENCIES.has(from) && FRANKFURTER_CURRENCIES.has(to);
}

const USD_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  JPY: 150,
  KRW: 1320,
  TWD: 31.5,
  THB: 35.6,
  SGD: 1.35,
  HKD: 7.82,
  CNY: 7.2,
  GBP: 0.79,
  AUD: 1.55,
  CAD: 1.35,
  CHF: 0.88,
};

function crossRate(from: string, to: string) {
  const fromRate = USD_RATES[from];
  const toRate = USD_RATES[to];
  if (!fromRate || !toRate) return null;
  return toRate / fromRate;
}

async function tryFrankfurter(from: string, to: string) {
  const url = new URL("https://api.frankfurter.app/latest");
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);

  const resp = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!resp.ok) return null;

  const data = await resp.json();
  const rate = data?.rates?.[to];
  if (typeof rate === "number" && Number.isFinite(rate) && rate > 0) return rate;
  return null;
}

async function tryOpenErApi(from: string, to: string) {
  const url = new URL(`https://open.er-api.com/v6/latest/${from}`);
  const resp = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!resp.ok) return null;

  const data = await resp.json();
  const rate = data?.rates?.[to];
  if (typeof rate === "number" && Number.isFinite(rate) && rate > 0) return rate;
  return null;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const from = (searchParams.get("from") || "USD").toUpperCase().trim();
    const to = (searchParams.get("to") || "USD").toUpperCase().trim();

    if (!from || !to) {
      return NextResponse.json({ error: "Missing from/to currency" }, { status: 400 });
    }

    if (from === to) {
      return NextResponse.json({ base: from, to, rate: 1, source: "identity" });
    }

    if (frankfurterCovers(from, to)) {
      const frankfurterRate = await tryFrankfurter(from, to);
      if (frankfurterRate) {
        return NextResponse.json({ base: from, to, rate: frankfurterRate, source: "frankfurter" });
      }
    }

    const openRate = await tryOpenErApi(from, to);
    if (openRate) {
      return NextResponse.json({ base: from, to, rate: openRate, source: "open-er-api" });
    }

    const backupRate = crossRate(from, to);
    if (backupRate) {
      return NextResponse.json({ base: from, to, rate: backupRate, source: "backup-table" });
    }

    return NextResponse.json({ error: "No FX rate available for this pair" }, { status: 422 });
  } catch (error) {
    console.error("FX API Error", error);
    return NextResponse.json({ error: "Failed to fetch FX rate" }, { status: 500 });
  }
}
