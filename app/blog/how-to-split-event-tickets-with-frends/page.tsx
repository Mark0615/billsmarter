import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: '揪團看比賽、聽演唱會！海外搶票與周邊費用的聰明拆帳法 | BillSmarter',
  description: '跟朋友揪團出國看比賽或聽演唱會，門票代墊、海外刷卡手續費總是讓人頭痛。本文分享如何清楚記錄大筆代墊款項，讓看展與賽事行程更完美。',
};

export default function EventTicketsSplitPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-lg md:prose-xl max-w-none text-gray-800">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
          揪團看比賽、聽演唱會！海外搶票與周邊費用的聰明拆帳法
        </h1>
        
        <p className="mb-8 text-gray-600">
          和志同道合的朋友一起去現場支持喜歡的歌手或車隊，絕對是人生最棒的體驗之一！但這類大型活動通常伴隨著「高額門票」、「搶票代墊」以及「海外手續費」等複雜的金錢往來。如果沒有從一開始就記好帳，事後追討數千甚至上萬元的代墊款，絕對會讓人心力交瘁。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">大型活動分帳的 3 大難題</h2>
        
        <ul className="list-disc pl-6 mb-6">
          <li><strong>搶票瞬間的集中代墊：</strong> 想像一下，為了搶到 F1 一級方程式賽車的絕佳看台區門票，或是當紅偶像的演唱會神席，通常只能由網速最快的那個人一次刷卡付清所有人的票錢。這筆龐大的金額該如何快速又準確地回收？</li>
          <li><strong>海外刷卡手續費與匯差：</strong> 如果是在海外售票網購票，信用卡帳單上會多出一筆海外交易手續費，且請款日的匯率可能與刷卡當天不同。這筆隱藏成本該由誰來吸收？</li>
          <li><strong>現場周邊商品的代買：</strong> 到了現場，朋友 A 幫大家排隊買了官方 T-shirt、朋友 B 買了帽子，這些零碎的代買費用很容易在狂歡後被遺忘。</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">如何完美處理這些龐大開銷？</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">1. 確認最終刷卡帳單再平分</h3>
        <p>
          針對海外購票，切記不要用當天的 Google 匯率去算錢。請刷卡的那位朋友等到「信用卡帳單（或未出帳明細）正式結算」後，直接以包含手續費的「台幣總請款金額」去除以票數，這樣對代墊者才最公平。
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">2. 善用「匯款備註」防忘記</h3>
        <p>
          當你把幾萬塊的票錢轉給代墊的朋友時，務必在網銀的轉帳備註欄寫下「XXX 賽車門票」或「XXX 演唱會」。這不僅能讓代墊者清楚知道這筆錢的來源，未來如果不幸遇到主辦單位退票，也有轉帳憑證可以對帳。
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">3. 建立專屬的分帳群組</h3>
        <p>
          在出發前，先開一個 LINE 或 WhatsApp 群組，並規定所有「與本次活動相關」的開銷（包含門票、周邊代購、交通車資）都要丟到群組的記事本或使用專門的工具記錄，絕對不要依賴大腦記憶。
        </p>

        <hr className="my-10 border-gray-300" />

        <h2 className="text-3xl font-bold mt-8 mb-4 text-blue-600">
          讓 BillSmarter 成為你們的財務總管
        </h2>
        <p>
          不論是出發前的高額門票代墊，還是活動當天互相幫忙買周邊、買飲料的零碎支出，你都可以通通丟進 BillSmarter。
        </p>
        <p className="mb-8">
          等活動圓滿落幕後，只要按下計算，系統就會幫你們整理出最少筆數的轉帳明細。你只需要享受比賽與演唱會的熱血，算錢的事就交給我們！
        </p>

        <div className="bg-blue-50 p-8 rounded-xl text-center border border-blue-100">
          <Link href="/calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300">
            建立這趟旅程的專屬分帳表
          </Link>
        </div>
      </article>
    </div>
  );
}