import { NextResponse } from "next/server";

const DEFAULT_BASE = "USD";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // 你前端傳的 symbols 可以是 "TWD,EUR,GBP"
  const symbolsRaw = (searchParams.get("symbols") || "").toUpperCase().trim();

  // 最少也要有 USD，避免算 cross rate 時缺資料
  const symbols = symbolsRaw
    ? Array.from(new Set([DEFAULT_BASE, ...symbolsRaw.split(",").map(s => s.trim()).filter(Boolean)])).join(",")
    : "";

  const url = new URL("https://api.frankfurter.dev/v1/latest");
  url.searchParams.set("base", DEFAULT_BASE);
  if (symbols) url.searchParams.set("symbols", symbols);

  const resp = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // 1 小時快取
  });

  if (!resp.ok) {
    return NextResponse.json(
      { error: "Failed to fetch FX rates" },
      { status: 500 }
    );
  }

  const data = await resp.json();
  return NextResponse.json(data);
}