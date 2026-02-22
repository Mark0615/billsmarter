import { NextResponse } from "next/server";

// ⚠️ 這是關鍵！必須宣告為 edge 才能在 Cloudflare Pages 執行
export const runtime = 'edge';

const DEFAULT_BASE = "USD";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // 處理前端傳過來的幣別，例如 ?symbols=TWD,EUR
    const symbolsRaw = (searchParams.get("symbols") || "").toUpperCase().trim();

    // 確保包含基礎幣別
    const symbols = symbolsRaw
      ? Array.from(new Set([DEFAULT_BASE, ...symbolsRaw.split(",").map(s => s.trim()).filter(Boolean)])).join(",")
      : DEFAULT_BASE;

    const url = new URL("https://api.frankfurter.dev/v1/latest");
    url.searchParams.set("base", DEFAULT_BASE);
    if (symbols) url.searchParams.set("symbols", symbols);

    // 使用 Edge Runtime 的 fetch，並設定 1 小時快取
    const resp = await fetch(url.toString(), {
      next: { revalidate: 3600 }, 
    });

    if (!resp.ok) {
      throw new Error("Frankfurter API responded with error");
    }

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("FX Rate API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch FX rates" },
      { status: 500 }
    );
  }
}