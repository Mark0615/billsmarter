import Link from "next/link";
import CalculatorClient from "./calculator/CalculatorClient"; 
// ↑ 這行依你的實際路徑調整：
// 如果你的 CalculatorClient 在 app/calculator/CalculatorClient.tsx，這樣寫通常 OK

export default function HomePage() {
  return (
    <main>
      {/* HERO：直接放計算器 */}
      <section style={{ padding: "24px 0" }}>
        <CalculatorClient />
      </section>

      {/* 往下滑：SEO 內容（Server Rendered） */}
      <section id="faq" style={{ maxWidth: 960, margin: "0 auto", padding: "48px 16px" }}>
        <h2>FAQ</h2>
        <details>
          <summary>BillSmart 是什麼？</summary>
          <p>BillSmart 是一個支援多幣別、可快速分帳的工具，適合旅行、聚餐、合購。</p>
        </details>
        <details>
          <summary>匯率怎麼計算？</summary>
          <p>系統會在你輸入幣別與金額時自動換算成 Base currency（預設 USD）。</p>
        </details>
      </section>

      <section id="privacy" style={{ maxWidth: 960, margin: "0 auto", padding: "48px 16px" }}>
        <h2>Privacy</h2>
        <p>我們不需要你登入，不販售你的個資。你輸入的分帳內容預設只存在你的瀏覽器端。</p>
        <p>
          想看完整條款：<Link href="/privacy">Privacy Policy</Link>
        </p>
      </section>

      <section id="blog" style={{ maxWidth: 960, margin: "0 auto", padding: "48px 16px" }}>
        <h2>Blog</h2>
        <p>分帳技巧、旅行理財、匯率與費用管理的小筆記。</p>
        <p>
          看文章：<Link href="/blog">Blog</Link>
        </p>
      </section>

      <footer style={{ maxWidth: 960, margin: "0 auto", padding: "48px 16px" }}>
        <Link href="/about">About</Link> ・ <Link href="/contact">Contact</Link> ・{" "}
        <Link href="/privacy">Privacy</Link>
      </footer>
    </main>
  );
}