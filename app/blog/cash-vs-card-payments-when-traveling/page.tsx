import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "Cash vs Card When You Travel: How to Choose",
  description:
    "The four places a payment abroad quietly costs more, why the person who withdraws the cash pays fees nobody sees, and how to log both so the split is fair.",
  alternates: { canonical: '/blog/cash-vs-card-payments-when-traveling' },
};

export default function Page() {
  return (
    <article className="prosePage blogArticleStandalone">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>Cash vs Card When You Travel: How to Choose</h1>
        <PostMeta slug="cash-vs-card-payments-when-traveling" />
        <p className="lead">
          Nobody argues about this at the ATM. The argument happens three weeks later, when one person works out that the cash they pulled out for the group cost them 6% and nobody else paid a share of it.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <p>The question is not really cash or card. Both work. It is which one you reach for in which situation, and what happens to the person who ends up carrying the group&rsquo;s money.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Where the money actually leaks</h2>
        <p>There are four places a payment abroad quietly costs more than the price on the label, and only one of them is the exchange rate.</p>
        <p>The first is your card&rsquo;s foreign transaction fee. Most cards charge somewhere between 1.5% and 3% on anything billed in another currency. Some travel cards charge nothing. This is the single biggest difference between two people at the same table paying for identical meals.</p>
        <p>The second is dynamic currency conversion, which is the terminal asking whether you want to be charged in TWD or in the local currency. Choosing your home currency hands the exchange rate to the merchant&rsquo;s payment processor rather than to Visa or Mastercard, and the rate they pick is worse. The prompt is designed to sound helpful. It is not. Always choose the local currency. The same question appears at ATMs, phrased as &ldquo;with conversion&rdquo; or &ldquo;without conversion&rdquo;, and the answer is the same: without.</p>
        <p>The third is ATM fees, which arrive in two layers. Your own bank charges for a foreign withdrawal, and the machine&rsquo;s operator often charges its own fee on top. A machine can give a perfectly reasonable exchange rate and still cost you 300 TWD in flat fees. Because most of that charge is fixed rather than proportional, withdrawing 20,000 TWD worth once costs a fraction of what four separate withdrawals of 5,000 do.</p>
        <p>The fourth is the airport exchange counter, which is the worst rate you will see on the entire trip. Take enough local cash to get from the airport to where you are sleeping, and get the rest from a bank ATM in town.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>What cards are good for</h2>
        <p>Big, planned, indoor spending. Hotels, restaurants with table service, train tickets, museum entry, car hire. Anything where the amount is fixed, the vendor is established, and you want a record.</p>
        <p>The record matters more than people expect when you are splitting. A card transaction shows up in your banking app with a date and an amount, which means you can reconstruct the trip afterwards even if nobody wrote anything down. Cash cannot be reconstructed. If the person who paid 4,000 JPY for lunch on the third day did not write it down that day, that lunch is gone.</p>
        <p>Cards also fail safely. A stolen card is a phone call. Stolen cash is stolen cash.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>What cash is still for</h2>
        <p>The list is shorter than it used to be but it has not disappeared.</p>
        <p>Night markets and street food, in Taiwan and across most of Southeast Asia, are still cash first. The stalls with the queues are frequently the ones that have never taken a card, and never will.</p>
        <p>Small vendors in Europe are less predictable than travellers expect. Germany and Austria still have plenty of restaurants and bakeries that are cash only or set a card minimum. Sweden is close to the opposite, where some places no longer accept cash at all. There is no single European answer, so the safe assumption is the same everywhere: some notes in each country, and not many.</p>
        <p>Tips for housekeeping, guides and drivers usually need small notes.</p>
        <p>And cash is the fallback when the network drops, the card reader is broken, or the shop&rsquo;s terminal only takes domestic cards. That last one catches people in Japan more often than they expect.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The part that actually causes arguments</h2>
        <p>Both of the above are individual decisions. The group problem is different. Whoever withdraws the cash becomes the group&rsquo;s bank, and the cost of being the group&rsquo;s bank is invisible.</p>
        <p>Say five of you are in Osaka. One person pulls 50,000 JPY out of an ATM because the group needs cash for markets and taxis. Their bank charges a 1.5% foreign withdrawal fee, the machine charges 220 JPY, and their card&rsquo;s FX rate is slightly worse than the mid-market rate everybody will use to settle. They have now paid roughly 1,000 JPY that nobody else is going to see, because when they hand 10,000 JPY to a friend for a taxi, the friend logs 10,000 JPY.</p>
        <p>There are two honest ways to handle it. Either the group agrees up front that withdrawal fees are a shared cost and the person logs them as their own line, or the group agrees that fees stay with whoever paid them and everyone accepts that the designated cash machine is doing the group a small favour. Both work. What does not work is never discussing it. The person carrying the fees notices, and the rest of the group does not.</p>
        <p>The same logic applies to card fees. If one of you has a card with no foreign transaction fee and volunteers to put the hotel on it, that person is saving the group money, not spending it. That is worth saying out loud once.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>How to log it so the settlement is right</h2>
        <p>Whichever way you paid, the entry is the same: the amount as it was actually paid, in the currency it was paid in. A 3,000 JPY dinner paid in cash and a 3,000 JPY dinner paid by card are the same entry. The <Link href="/">calculator</Link> converts both at the same rate, so the person who paid cash is not treated differently from the person who tapped a card.</p>
        <p>Two habits make this work.</p>
        <p>Log cash the same day. There is no statement to check later. The taxi you forget is the one that makes the final number feel wrong to somebody, and it is almost always a cash taxi.</p>
        <p>Log the amount on the receipt, not your memory of it. They are not the same number. Tax and service are part of what was paid, and they get shared in the same proportion as the meal. There is no separate field for them, which is deliberate: entering the receipt total means the extras are split the same way the bill is, rather than landing quietly on whoever held the card.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>A practical split</h2>
        <p>For most trips the mix that causes the least friction is roughly four fifths card, one fifth cash, adjusted for where you are going. More cash for Japan and Taiwan, less for Sweden or the Netherlands, and a fixed rule that the big shared bookings go on one person&rsquo;s fee-free card if the group has one.</p>
        <p>Then settle in the currency you will actually transfer in, and use one rate convention for the whole group. <Link href="/blog/which-exchange-rate-to-use-when-splitting-a-trip">Which exchange rate to use when splitting a trip</Link> compares the four options. If five friends from Taipei spend a week in Japan, the settlement currency is TWD, because that is what the transfers between you will be made in. Settling in yen just means everyone converts a second time.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Related reading</h2>
        <ul>
          <li>
            <Link href="/blog/which-exchange-rate-to-use-when-splitting-a-trip">
              Which exchange rate to use when splitting a trip
            </Link>{" "}: the four conventions, and which one everybody can check.
          </li>
          <li>
            <Link href="/blog/bill-splitting-etiquette-around-the-world">
              Bill splitting etiquette around the world
            </Link>{" "}: who is expected to pay, and where the bill gets divided at all.
          </li>
        </ul>
      </section>

      <section className="articleWorked">
      <h2>Worked example</h2>
      <p>
      The hybrid strategy, entered as it actually happened: Ana&rsquo;s card at a restaurant in Japan, Ben&rsquo;s cash at a night market in Taiwan. The calculator does not need to know which was cash and which was card, only the currency and the amount.
      </p>
      <figure className="articleFigure">
      <Image
      src="/blog/cash-vs-card-payments-when-traveling.webp"
      alt="BillSmart result panel showing a card payment in yen and a cash payment in New Taiwan dollars settled together."
      width={1350}
      height={980}
      sizes="(max-width: 900px) 92vw, 820px"
      />
      <figcaption>
      Settled in USD: Chloe pays Ben $22.76 and Ana $17.47. The cash payment carries exactly the same weight as the card one.
      </figcaption>
      </figure>
      </section>
    </article>
  );
}
