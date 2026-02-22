import Link from "next/link";
export const runtime = 'edge';

export default function Home() {
  return (
    <div className="container"> {/* 使用 globals.css 裡的 .container */}
      <section className="hero"> {/* 使用 globals.css 裡的 .hero */}
        <h1 className="title">BillSmart — Split Travel Expenses Fairly</h1>
        <p className="subtitle">
          簡單、強大的旅遊分帳計算器，幫你快速結算團體開銷。
        </p>
        <Link
          href="/calculator"
          className="btn primary mt-6 inline-block" 
        >
          開始分帳
        </Link>
      </section>

      <section className="card"> {/* 使用 globals.css 裡的 .card */}
        <h2 className="cardTitle">使用說明</h2>
        <ol className="list-decimal ml-6 mt-4 space-y-2">
          <li>新增所有參與者</li>
          <li>輸入每一筆支出與受益人</li>
          <li>一鍵計算最終結餘</li>
        </ol>
      </section>
    </div>
  );
}