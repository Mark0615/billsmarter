import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: '室友共同生活開銷清單：除了房租，這 5 樣最容易吵架，該如何公平分帳？ | BillSmarter',
  description: '與室友合租最怕遇到錢算不清楚！本文整理 5 大最容易引起糾紛的共同開銷，並教你如何透過正確的觀念與 BillSmarter 分帳工具，建立公平和諧的合租生活。',
};

export default function RoommateExpensesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-lg md:prose-xl max-w-none text-gray-800">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
          室友共同生活開銷清單：除了房租，這 5 樣最容易吵架，該如何公平分帳？
        </h1>
        
        <p className="mb-8 text-gray-600">
          離開家裡與朋友或室友合租，是許多人獨立生活的第一步。然而，合租生活除了要磨合生活習慣，「金錢觀」與「開銷分攤」往往是破壞感情的最大殺手。許多人以為只要講好房租跟水電費怎麼平分就好，但實際上，日常生活中充滿了各種隱形的「共同開銷」。這篇文章將為你盤點合租最容易產生糾紛的 5 大開銷，並提供實用的公平分帳策略！
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">1. 日常消耗品（衛生紙、洗碗精、垃圾袋）</h2>
        <p>
          這絕對是室友間最常見的導火線。衛生紙誰買的？洗碗精用完了誰要去補充？這種單價不高，但必須持續購買的物品，如果每次都由同一個人墊付，久了心裡一定會不平衡。
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li><strong>NG 做法：</strong> 誰看到沒了誰就去買，也不去要錢，想說幾十塊就算了。</li>
          <li><strong>推薦解法：</strong> 建立「公積金」制度，每個月初每人固定上繳 200-500 元作為消耗品基金；或者由一人統一採買後，月底使用 <strong>分帳工具</strong> 一次結算。</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">2. 共用食材與調味料</h2>
        <p>
          如果你們偶爾會一起開伙，買油、鹽、醬、醋甚至是一大包白米，費用該怎麼算？有時候 A 室友天天煮，B 室友一週只煮一次，平分顯然不公平。
        </p>
        <p>
          <strong>推薦解法：</strong> 基礎調味料（油鹽醬醋）可以納入公積金平分。但如果是生鮮食材或高價調味料（如橄欖油、進口香料），建議「誰買誰所有，要共用請先講好比例」。如果是一起去超市大採購，建議結帳時立刻把發票拿出來，按照各自買的品項輸入分帳 App 記錄下來。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">3. 網路費與串流平台訂閱（Netflix, Spotify 等）</h2>
        <p>
          網路費通常跟著帳單來，比較好平分。但現在大家幾乎都會綁定各類影音串流平台。如果你是「戶長」（綁定信用卡扣款的人），每個月要跟室友收 50、100 元，常常會覺得開不了口，但不收又覺得自己一直在倒貼。
        </p>
        <p>
          <strong>推薦解法：</strong> 建議改成「半年收一次」或「一年收一次」。一次把半年的訂閱費用算清楚，減少每個月催款的尷尬。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">4. 公共區域清潔費 / 修繕費</h2>
        <p>
          冷氣壞了要請人來修？馬桶不通要找水電？或者是大家決定每個月請一次打掃阿姨來清掃公共區域（客廳、衛浴）？這些非預期性或大筆的支出，一定要在發生前就先達成共識。
        </p>
        <p>
          <strong>推薦解法：</strong> 如果是自然損壞，應與房東協調修繕；如果是人為損壞，由弄壞的人負責。若是請打掃阿姨，費用當然是依照人頭均分。
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">5. 寵物相關開銷</h2>
        <p>
          如果室友有養寵物，雖然寵物很可愛，大家也會一起玩，但貓砂、飼料、甚至是破壞家具的賠償費用，底線在哪裡必須劃清楚。
        </p>
        <p>
          <strong>推薦解法：</strong> 寵物的所有日常開銷（包含造成公共區域的額外清潔成本）都應由飼主全額負擔。這不屬於共同開銷的範疇，必須在合租前就先約定好。
        </p>

        <hr className="my-10 border-gray-300" />

        <h2 className="text-3xl font-bold mt-8 mb-4 text-blue-600">
          別讓算錢破壞友誼！善用 BillSmarter 輕鬆搞定月底結算
        </h2>
        <p>
          看完了以上 5 大容易吵架的開銷，你會發現合租生活充滿了各種零碎的代墊款。A 昨天買了垃圾袋，B 今天付了水電費，C 週末去好市多買了大家要分的衛生紙......到了月底，到底誰該給誰多少錢？光用腦袋算絕對會一頭霧水。
        </p>
        <p className="mb-8">
          這時候，你需要一個清晰、好用的分帳工具！
        </p>

        <div className="bg-blue-50 p-8 rounded-xl text-center border border-blue-100">
          <h3 className="text-xl font-bold mb-4 text-blue-800">試試 BillSmarter 智慧分帳計算機</h3>
          <p className="mb-6 text-gray-700">
            不用下載 App，打開網頁就能用！支援多人多筆複雜代墊款，一鍵計算出「誰該轉帳給誰最少次」，讓你們的合租生活只留歡笑，不留算計。
          </p>
          <Link href="/calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300">
            立即開始免費分帳
          </Link>
        </div>
      </article>
    </div>
  );
}