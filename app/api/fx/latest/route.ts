import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const from = (searchParams.get("from") || "USD").toUpperCase().trim();
    const to = (searchParams.get("to") || "USD").toUpperCase().trim();

    if (!from || !to) {
      return NextResponse.json({ error: "Missing from/to currency" }, { status: 400 });
    }

    if (from === to) {
      return NextResponse.json({ base: from, to, rate: 1 });
    }

    const url = new URL("https://api.frankfurter.dev/v1/latest");
    url.searchParams.set("base", from);
    url.searchParams.set("symbols", to);

    const resp = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!resp.ok) {
      throw new Error(`Frankfurter API failed (${resp.status})`);
    }

    const data = await resp.json();
    const rate = data?.rates?.[to];

    if (typeof rate !== "number" || !Number.isFinite(rate)) {
      throw new Error("Invalid FX payload");
    }

    return NextResponse.json({ base: from, to, rate, rates: data.rates, date: data.date });
  } catch (error) {
    console.error("FX API Error", error);
    return NextResponse.json({ error: "Failed to fetch FX rate" }, { status: 500 });
  }
}
