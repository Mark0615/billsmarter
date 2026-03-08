import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: '聚餐喝酒誰付錢？從高級餐廳到酒吧，3 招教你優雅分帳不尷尬 | BillSmarter',
  description: '朋友聚餐最怕結帳算不清！有人喝酒、有人吃素，到底該平分還是各付各的？本文教你 3 個實用的餐廳酒吧分帳原則，搭配 BillSmarter 輕鬆算出每人該付多少錢。',
};

export default function RestaurantBarSplitPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-lg md:prose-xl max-w-none text-gray-800">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
          聚餐喝酒誰付錢？從高級餐廳到酒吧，3 招教你優雅分帳不尷尬
        </h1>
        
        <p className="mb-8 text-gray-600">
          週末夜晚與三五好友相約人氣餐廳或酒吧，本該是件放鬆開心的事，但每當服務生遞上帳單的那一刻，氣氛總會瞬間凝結。如果大家都點了差不多的餐點，直接「總金額除以人數」當然最快；但現實往往複雜得多：有人點了昂貴的主餐、有人整晚只喝白開水、有人則開了幾瓶好酒。到底怎麼分帳才不會傷感情？
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">常見的聚餐分帳痛點</h2>
        <p>
          想像一下這個情境：大家續攤到了酒吧，朋友 A 點了一杯酒精濃度偏高、帶有木質與煙燻風味的經典威士忌調酒；朋友 B 點了精釀啤酒；而朋友 C 因為要開車，只點了一杯可樂。結帳時如果直接均分，對只喝可樂的 C 來說顯然非常吃虧。
        </p>
        <p>
          此外，還有「服務費該怎麼算？」、「誰有 VIP 會員可以打折？」等變數，讓心算變成一場災難。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">3 招實用的聚餐分帳原則</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">原則一：酒水與餐點分開計算</h3>
        <p>
          這是最公平也最常見的做法。將帳單分為「共同分享的食物（如拼盤、披薩）」與「個人專屬飲品」。食物的部分由所有人均分，而酒水則由有點的人各自負擔。如果是買整瓶酒來分享，就由有喝該瓶酒的人去平分酒錢。
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">原則二：提早說好「各付各的 (Go Dutch)」</h3>
        <p>
          如果這是一家單價較高的餐廳，最好的方式是在點餐前就先建立共識：「我們今天各付各的喔！」這樣大家在點餐時就能毫無壓力地選擇自己想吃的東西，不用擔心點了和牛會讓朋友破費。
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">原則三：尾數處理與服務費平攤</h3>
        <p>
          帳單加上 10% 服務費後，金額通常會出現難以整除的尾數。建議可以設定一個「無條件進位到十位數」的規則，多出來的零錢可以直接當作給代墊者的回饋，或是留在公積金裡作為下次聚餐的基金。
        </p>

        <hr className="my-10 border-gray-300" />

        <h2 className="text-3xl font-bold mt-8 mb-4 text-blue-600">
          讓 BillSmarter 幫你們處理複雜的酒精與餐費
        </h2>
        <p>
          與其在微醺的狀態下拿著帳單和計算機發愁，不如把數學交給專業的工具。
        </p>
        <p className="mb-8">
          無論是誰先刷了卡、誰只參與了上半場的飯局而沒去酒吧，只要把各項代墊與消費金額輸入 BillSmarter，系統就會自動幫你算出最簡單的轉帳路徑！
        </p>

        <div className="bg-blue-50 p-8 rounded-xl text-center border border-blue-100">
          <h3 className="text-xl font-bold mb-4 text-blue-800">馬上計算今晚的帳單</h3>
          <p className="mb-6 text-gray-700">
            支援單筆指定對象與多筆代墊計算，讓聚餐結帳不再是壓力。
          </p>
          <Link href="/calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300">
            開啟分帳計算機
          </Link>
        </div>
      </article>
    </div>
  );
}