import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "How to Split Concert and Sports Event Tickets with Friends",
  description: "One account, one card, ninety seconds, and one person carrying the cost for months. Getting reimbursed before the show, and what to agree in case it is postponed.",
  alternates: { canonical: '/blog/how-to-split-event-tickets-with-friends' },
};

export default function Page() {
  return (
    <article className="prosePage blogArticleStandalone">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>How to Split Concert and Sports Event Tickets with Friends</h1>
        <PostMeta slug="how-to-split-event-tickets-with-friends" />
        <p className="lead">
          Ticket sales for anything popular are decided in the first ninety seconds. That has one consequence everybody in the group understands and one that most of them do not.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <p>The one they understand: somebody has to be sitting at a laptop with a card saved and a fast connection, and that person buys for everybody. On tixCraft or KKTIX for a Taiwanese show, or on an international platform for a stadium tour, there is no version of this where five people each buy their own seat and end up together.</p>
        <p>The one they do not: that person is now carrying the whole cost, the whole refund risk, and the entire relationship with the ticketing platform, potentially for months. Tickets for a show in eight months are paid for today.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Get paid back before the show, not after</h2>
        <p>The default in most groups is to settle on the night. For ordinary spending that is fine. For tickets bought months in advance it is the wrong way round.</p>
        <p>Reimburse within a week of the purchase. The reason is not that anybody will forget, it is that the buyer is otherwise lending the group a meaningful sum for a long time, and the size of that loan is invisible to everybody except them. Four grandstand seats at 6,000 TWD each is 24,000 TWD sitting on one person&rsquo;s credit card statement, and it will appear on that statement whether or not the group has got round to it.</p>
        <p>This also protects the group. If somebody drops out four months before the show, the question of who absorbs that seat is much easier to discuss when everybody has already paid than when the buyer is still owed for all of it.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Agree the exchange rate before you ask for money</h2>
        <p>If the tickets were priced in another currency, say which rate you are dividing by before anyone transfers anything.</p>
        <p>The default worth using is the mid-market rate on the day of purchase, the number a search engine gives you, which everybody in the group can check for themselves.</p>
        <p>Dividing your card statement instead looks more accurate and is not. It charges the group for your card&rsquo;s foreign transaction fee, so whoever brought the worst card quietly gets subsidised by everybody else. Fees belong to the card that charged them. There is a fuller comparison in <Link href="/blog/which-exchange-rate-to-use-when-splitting-a-trip">which exchange rate to use when splitting a trip</Link>.</p>
        <p>State the number in the group chat when you ask for the money. &ldquo;Tickets were 180 GBP each, I&rsquo;m using 40.2 TWD to the pound, so 7,236 each.&rdquo; Nobody has ever argued with a number that was stated in advance and could be checked.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Postponement is the case you should plan for</h2>
        <p>Groups plan for cancellation, which is rare and simple. The event is called off, the platform refunds the buyer, the buyer sends everybody their share back.</p>
        <p>Postponement is more common and much messier. The show moves to a date four months later. Two of the five can no longer make it. The tickets are still valid, the platform will not refund them, and the group now has to find two people or absorb two seats.</p>
        <p>Two things make this survivable, and both cost nothing at the time of purchase.</p>
        <p>Write down who paid what, with the amount and the date, somewhere that is not one person&rsquo;s memory. When a refund or a resale happens later, the money has to be distributed in the same proportions it was collected, and reconstructing those proportions eight months on is genuinely difficult.</p>
        <p>Ask people to put a note on the transfer. &ldquo;F1 grandstand&rdquo; or &ldquo;Coldplay 4/12&rdquo; on a bank transfer costs nothing to type and turns the buyer&rsquo;s transaction history into the record of who paid for what. This matters most in exactly the situation where you need it: months later, under time pressure, when a seat needs reselling.</p>
        <p>Decide the drop-out rule when you buy, not when somebody drops out. Either the person who cannot come is responsible for finding a replacement or selling their seat, or the group absorbs it. Both are reasonable. Neither is a conversation you want to have for the first time when it is already happening.</p>
        <p>Check whether the tickets can be transferred at all before you assume a seat can be resold. Large venues and platforms increasingly tie tickets to the buyer&rsquo;s identity, which is aimed at scalping but catches ordinary groups too. If the tickets are in one person&rsquo;s name and cannot be reassigned, &ldquo;sell your seat&rdquo; is not an option that exists, and the group is choosing between absorbing the cost and having somebody attend who was not originally coming. Knowing which situation you are in changes what the fair answer looks like.</p>
        <p>There is a related trap with the money. If a seat is resold at a different price from the one it was bought at, the difference belongs to whoever bore the risk, and that is worth stating in advance too. A seat bought at 4,800 and resold at 3,000 has lost 1,800, and if nobody agreed who carries that, the answer defaults to whoever happened to hold the account.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The spending on the night is a different problem</h2>
        <p>Ticket money is large, planned, and paid by one person. Everything at the venue is small, unplanned, and paid by whoever was nearest the counter.</p>
        <p>One person buys four beers. Somebody else buys a tour shirt for themselves and one for a friend who is stuck in the queue. Two people share a taxi home and the other three take the MRT. None of these cover the whole group, and by the following morning nobody remembers any of them.</p>
        <p>The treatment is the same as the tickets: each payment has a payer and a list of people it was actually for. Four beers bought for four of the six is one entry covering four people. The two shirts are one entry covering two. The taxi is one entry covering two.</p>
        <p>Logged that way, the small stuff nets off against the big stuff. The person who fronted the tickets is owed a lot; the person who bought the round is owed a little; the <Link href="/">calculator</Link> subtracts one from the other rather than moving both.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>What that looks like when you settle</h2>
        <p>Say five friends go to a show. Ana bought five tickets at 4,800 TWD each. Ben bought a round for himself and two others. Chen paid for a shared taxi home for three people.</p>
        <p>Entered as three payments with three different sets of people, the result is a short list of transfers rather than a web of individual debts. Ben and Chen do not send Ana the full ticket price and then wait to be paid back for the drinks and the taxi; the amounts cancel and only the difference moves.</p>
        <p>Enter it in one sitting, since nothing is saved between visits, and paste the transfer list into the group chat while everybody is still in it. The night of the show is a good moment. Three weeks later is not.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Related reading</h2>
        <ul>
          <li>
            <Link href="/blog/who-should-pay-the-deposit-group-travel">
              Who should pay the deposit
            </Link>{" "}: the same exposure, on a booking months ahead.
          </li>
          <li>
            <Link href="/blog/which-exchange-rate-to-use-when-splitting-a-trip">
              Which exchange rate to use when splitting a trip
            </Link>{" "}: picking the number you divide by.
          </li>
        </ul>
      </section>

      <section className="articleWorked">
      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">Worked example</h2>
      <p>
      One person fronts the tickets, someone else buys a round. Ana bought four concert tickets for the group; Ben&rsquo;s round at the bar covered only himself and Chloe.
      </p>
      <figure className="articleFigure">
      <Image
      src="/blog/how-to-split-event-tickets-with-friends.webp"
      alt="BillSmart result panel showing four event tickets bought by one person and a bar round covering two people."
      width={1350}
      height={1116}
      sizes="(max-width: 900px) 92vw, 820px"
      />
      <figcaption>
      Settled in USD: Chloe pays Ana $152.00, Dan pays Ana $120.00, Ben pays Ana $88.00. Ben&rsquo;s round is netted off what he owes for his ticket rather than moving as a separate payment.
      </figcaption>
      </figure>
      </section>
    </article>
  );
}
