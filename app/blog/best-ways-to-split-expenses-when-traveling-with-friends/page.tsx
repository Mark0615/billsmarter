import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "The Best Way to Split Expenses When Traveling with Friends",
  description:
    "Three currencies in ten days, one person fronting the bookings. How to pick a settlement currency, spread the exposure, and charge each expense to the people it was actually for.",
  alternates: {
    canonical: '/blog/best-ways-to-split-expenses-when-traveling-with-friends',
  },
};

export default function Page() {
  return (
    <article className="prosePage blogArticleStandalone">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>The Best Way to Split Expenses When Traveling with Friends</h1>
        <PostMeta slug="best-ways-to-split-expenses-when-traveling-with-friends" />
        <p className="lead">
          A single-country trip is an arithmetic problem. A multi-country trip is a different problem, and most groups do not notice the difference until they are in an airport lounge on the last night trying to reconstruct ten days across three currencies.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <p>Here is the shape of it. Four friends fly to Zurich, spend three days in Switzerland paying in francs, take a train to Milan and spend five days paying in euros, then finish with three days in London paying in pounds. One person books the first hotel because they got up early enough to find it. The same person ends up putting the train tickets on their card because they were standing at the machine. By day six they have fronted more than everyone else combined, in two currencies, and nobody has written anything down.</p>
        <p>Nothing has gone wrong yet. But the group now has a problem an even split cannot solve, because there is no single number to divide.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Why converting as you go does not work</h2>
        <p>The instinct is to convert each expense into your home currency in your head as it happens. It fails for three reasons.</p>
        <p>People use different rates. One person looks it up on their phone, another remembers what it was two days ago, a third uses the number their bank showed them, which includes their card&rsquo;s fee. By the end of the trip there are four versions of the same dinner, and each person believes theirs.</p>
        <p>The rates move. Not by much over ten days, but enough that an expense converted on day two and an expense converted on day nine are not being treated the same way, for no reason connected to what anybody bought.</p>
        <p>And it doubles the work. Every entry now has an original amount and a converted amount, and the converted one is the one that gets typed in, which means the original is lost. When somebody queries a number three weeks later there is nothing to check it against, because the original is gone.</p>
        <p>The alternative is to record what was actually paid, in the currency it was actually paid in, and convert once at the end. Three hundred and forty francs is entered as three hundred and forty francs. Ninety euros is entered as ninety euros. The conversion happens in one place, with one rate convention, applied to everything. <Link href="/blog/which-exchange-rate-to-use-when-splitting-a-trip">Which exchange rate to use when splitting a trip</Link> sets out the options and which one is worth defaulting to.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Pick the settlement currency first, and not the obvious one</h2>
        <p>The settlement currency is the one currency everything converts into. Most groups pick the wrong one. They pick the currency they are spending in.</p>
        <p>Pick the currency you will actually transfer in. Four friends from Taipei settling a European trip should settle in TWD, even though not a single expense on the trip was in TWD. That is what will move between their bank accounts afterwards. Settling in euros means everyone converts a second time when they pay each other back, and that second conversion has its own fees and its own rate.</p>
        <p>The corollary is that the settlement currency has nothing to do with where you went. It is a fact about the group, not about the trip.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The designated payer, and its actual risk</h2>
        <p>Assigning one person to pay for things during the day is a genuinely good idea. One card in one wallet is faster than five people at a counter, it keeps card fees on one card, and if that card earns points, the points are concentrated rather than scattered.</p>
        <p>The risk is not the one people name. It is not that the payer will be forgotten. It is that their exposure grows without anyone tracking the size of it. On the Switzerland leg, one person fronting hotels and trains for four people is carrying several thousand francs. If the group settles at the end of the trip, that person has been lending the group money for two weeks.</p>
        <p>Two things fix it. Rotate the role by leg or by day, so exposure is spread rather than concentrated. And settle the large bookings before the trip rather than folding them into the final tally: flights and accommodation reimbursed within a week of booking, everything else at the end. <Link href="/blog/who-should-pay-the-deposit-group-travel">Who should pay the deposit</Link> goes through what the booker is actually taking on. That way the person who books the expensive thing is not also the person financing it.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Not every expense covers everyone</h2>
        <p>The most common source of quiet resentment on a group trip is not the big bills. It is the small ones that got split evenly when they should not have been.</p>
        <p>Three of five people take the cable car. Two of five go for coffee while they wait. One person buys a round at the bar for whoever happened to be standing there. In an even split all of these end up divided by five, and the two people who did not go up the mountain pay for the cable car.</p>
        <p>The default that causes the fewest arguments is straightforward: transport, accommodation and anything the whole group does together is shared. Everything else is charged to whoever took part. That means each expense needs a payer and a list of people it covers, and those two things are different. The person who paid is frequently not the only person it was for, and sometimes not one of them at all.</p>
        <p>This is also how you handle the opt-in. Before booking something expensive, say clearly that it is not a group cost. If three of five want the hot air balloon, it is a three-way split and the other two owe nothing towards it. Said in advance it costs nothing. Said afterwards it is a negotiation about money, in front of everybody.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Settle before you land</h2>
        <p>The best time to do the arithmetic is the last evening, not the arrivals hall.</p>
        <p>Put every payment in as it was paid, with the currency it was paid in and the people it actually covered. Choose the settlement currency. Read off the <Link href="/">transfer list</Link> and paste it into the group chat. On a three-currency trip with four people, that is usually three or four transfers, not the twelve separate debts it looks like.</p>
        <p>One practical note. Nothing is saved between visits, so this works best as a single sitting rather than something you dip into across ten days. Keep a running note in the group chat as you go, which somebody should be doing anyway, then enter the whole thing in one pass at the end.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>A worked version of the trip above</h2>
        <p>Four people, ten days, three currencies, settling in TWD.</p>
        <p>Ana puts three nights in Zurich on her card, 1,240 CHF, covering all four. Ben pays for the train to Milan, 380 EUR, all four. Ana pays the Milan apartment, 900 EUR, all four. Chen buys the London theatre tickets, 220 GBP, but only three of them are going, so it covers three people rather than four. Dara pays for a farewell dinner, 180 GBP, all four.</p>
        <p>Entered that way, each amount stays in its own currency and converts once. Ana has fronted the most by a wide margin and gets most of it back. Chen&rsquo;s theatre tickets are charged to three people, so Dara owes nothing towards them and the arithmetic reflects that without anybody having to argue for it.</p>
        <p>The point is not that the tool is clever. It is that the group only has to agree on two things in advance: the settlement currency, and that expenses are charged to the people they were actually for.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Related reading</h2>
        <ul>
          <li>
            <Link href="/blog/group-trip-money-checklist">
              The group trip money checklist
            </Link>{" "}: the eight things to agree before anyone books.
          </li>
          <li>
            <Link href="/blog/cash-vs-card-payments-when-traveling">
              Cash vs card when you travel
            </Link>{" "}: which to reach for, and who ends up paying the fees.
          </li>
        </ul>
      </section>

      <section className="articleWorked">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Worked example</h2>
      <p>
      Four friends, three currencies, one settlement currency. Ana put two nights of hotel on her card in yen, Ben covered a group dinner, and Chloe paid the airport transfer in baht. All three bills are split evenly across the four of them.
      </p>
      <figure className="articleFigure">
      <Image
      src="/blog/best-ways-to-split-expenses-when-traveling-with-friends.webp"
      alt="BillSmart result panel: Ana is owed 185 US dollars after paying a hotel in yen, with the other three in deficit."
      width={1350}
      height={1264}
      sizes="(max-width: 900px) 92vw, 820px"
      />
      <figcaption>
      Settled in USD: Dan pays Ana $122.68, Ben pays Ana $45.76, Chloe pays Ana $16.56. Three transfers to clear three currencies. Rates are fetched live, so the exact figures move day to day.
      </figcaption>
      </figure>
      </section>
    </article>
  );
}
