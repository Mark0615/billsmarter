import { CURRENCIES } from "./bills";

// Frankfurter is ECB-backed and does not quote TWD. Skip that provider when
// either currency is unsupported instead of making a guaranteed-failed call.
const FRANKFURTER_CURRENCIES = new Set([
  "AUD", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD",
  "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK",
  "NZD", "PHP", "PLN", "RON", "SEK", "SGD", "THB", "TRY", "USD", "ZAR",
]);

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

type ProviderRate = { rate: number; date?: string };
async function tryFrankfurter(from: string, to: string): Promise<ProviderRate | null> {
  const url = new URL("https://api.frankfurter.app/latest");
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);
  const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(6000) });
  if (!response.ok) return null;
  const data = await response.json();
  const rate = data?.rates?.[to];
  return typeof rate === "number" && Number.isFinite(rate) && rate > 0
    ? { rate, date: typeof data?.date === "string" ? data.date : undefined } : null;
}

async function tryOpenErApi(from: string, to: string): Promise<ProviderRate | null> {
  const response = await fetch(`https://open.er-api.com/v6/latest/${from}`, {
    cache: "no-store", signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) return null;
  const data = await response.json();
  const rate = data?.rates?.[to];
  const updated = typeof data?.time_last_update_utc === "string" ? Date.parse(data.time_last_update_utc) : NaN;
  return typeof rate === "number" && Number.isFinite(rate) && rate > 0
    ? { rate, date: Number.isFinite(updated) ? new Date(updated).toISOString().slice(0, 10) : undefined } : null;
}

export async function fxResponse(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const from = (searchParams.get("from") || "USD").toUpperCase().trim();
    const to = (searchParams.get("to") || "USD").toUpperCase().trim();

    if (!CURRENCIES.includes(from) || !CURRENCIES.includes(to)) {
      return json({ error: "Unsupported currency" }, 400);
    }
    if (from === to) return json({ base: from, to, rate: 1, source: "identity", fetchedAt: new Date().toISOString() });

    if (FRANKFURTER_CURRENCIES.has(from) && FRANKFURTER_CURRENCIES.has(to)) {
      const rate = await tryFrankfurter(from, to).catch(() => null);
      if (rate) return json({ base: from, to, ...rate, source: "frankfurter", fetchedAt: new Date().toISOString() });
    }

    const rate = await tryOpenErApi(from, to).catch(() => null);
    if (rate) return json({ base: from, to, ...rate, source: "open-er-api", fetchedAt: new Date().toISOString() });

    return json({ error: "Exchange rates are unavailable. Please try again; your existing payments have not changed." }, 422);
  } catch (error) {
    console.error("FX API Error", error);
    return json({ error: "Failed to fetch FX rate" }, 500);
  }
}
