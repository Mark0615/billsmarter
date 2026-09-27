import { NextResponse } from "next/server";
import { CURRENCIES } from "@/lib/bills";

export const dynamic = "force-dynamic";

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

async function tryFrankfurter(from: string, to: string) {
  const url = new URL("https://api.frankfurter.app/latest");
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);

  const resp = await fetch(url.toString(), { cache: "no-store", signal: AbortSignal.timeout(6000) });
  if (!resp.ok) return null;

  const data = await resp.json();
  const rate = data?.rates?.[to];
  if (typeof rate === "number" && Number.isFinite(rate) && rate > 0) return rate;
  return null;
}

async function tryOpenErApi(from: string, to: string) {
  const url = new URL(`https://open.er-api.com/v6/latest/${from}`);
  const resp = await fetch(url.toString(), { cache: "no-store", signal: AbortSignal.timeout(6000) });
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

    if (!CURRENCIES.includes(from) || !CURRENCIES.includes(to)) {
      return NextResponse.json({ error: "Unsupported currency" }, { status: 400 });
    }

    if (from === to) {
      return NextResponse.json({ base: from, to, rate: 1, source: "identity" });
    }

    if (frankfurterCovers(from, to)) {
      const frankfurterRate = await tryFrankfurter(from, to).catch(() => null);
      if (frankfurterRate) {
        return NextResponse.json({ base: from, to, rate: frankfurterRate, source: "frankfurter" });
      }
    }

    const openRate = await tryOpenErApi(from, to).catch(() => null);
    if (openRate) {
      return NextResponse.json({ base: from, to, rate: openRate, source: "open-er-api" });
    }

    return NextResponse.json({ error: "Exchange rates are unavailable. Please try again; your existing payments have not changed." }, { status: 422 });
  } catch (error) {
    console.error("FX API Error", error);
    return NextResponse.json({ error: "Failed to fetch FX rate" }, { status: 500 });
  }
}
