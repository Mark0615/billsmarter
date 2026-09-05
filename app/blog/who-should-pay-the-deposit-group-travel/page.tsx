import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "Who Should Pay the Deposit? Handling Big Upfront Bookings",
  description:
    "One person putting a whole trip on their card carries real risk: cancellations, partial refunds, currency moves and months of exposure. How to share the booking without sharing the headache.",
  alternates: { canonical: "/blog/who-should-pay-the-deposit-group-travel" },
};

export default function Page() {
  return (
    <article className="prosePage blogArticleStandalone">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>Who Should Pay the Deposit? Handling Big Upfront Bookings</h1>
        <PostMeta slug="who-should-pay-the-deposit-group-travel" />
        <p className="lead">
          Flights and accommodation are usually booked months early, by one person, on one
          card, for an amount that dwarfs everything else on the trip. It is the single
          largest source of group-money problems, and almost nobody plans for it.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>What the booker is actually taking on</h2>
        <p>
          &ldquo;I&rsquo;ll book it and you can pay me back&rdquo; sounds like a favour
          about logistics. It is really four separate risks landing on one person:
        </p>
        <ul>
          <li>
            <strong>Cash flow.</strong> Six months of a large balance on a card, possibly
            interest-bearing, possibly crowding out their own spending.
          </li>
          <li>
            <strong>Collection.</strong> Chasing four adults for money is a social cost
            they did not agree to. It is also the thing that most often turns into
            resentment.
          </li>
          <li>
            <strong>Cancellation.</strong> If someone drops out, whose money is stuck? If
            the whole trip dies, who eats the non-refundable portion?
          </li>
          <li>
            <strong>Currency.</strong> On a foreign booking, the rate is fixed the day
            they paid. If the group reimburses six months later at a different rate,
            someone gains and someone loses.
          </li>
        </ul>
        <p>
          None of these are hypothetical, and all of them are cheap to solve in advance
          and expensive to solve afterwards.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Rule one: reimburse immediately, not at the end</h2>
        <p>
          The single highest-value habit in group travel. When someone books a
          NT$60,000 flight for four people, the other three transfer their NT$15,000
          within a couple of days — not after the trip, not when the final spreadsheet is
          ready.
        </p>
        <p>
          Large upfront bookings should never be inside the running trip tally. Settle
          them separately and early, then let the day-to-day expenses be their own
          exercise. It keeps the eventual settlement small enough that nobody is stressed
          by it.
        </p>
        <div className="proseNote">
          <p>
            <strong>Why this matters more than it sounds:</strong> if the big items are
            already square, a mistake in the trip tally is worth a few hundred dollars,
            not a few thousand. Errors stop being frightening, and people stop
            double-checking each other.
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Rule two: spread the bookings across people</h2>
        <p>
          If there are four bookings and four people, take one each rather than making one
          person the group&rsquo;s bank. Everyone carries a similar balance, everyone
          feels the same urgency about being paid back, and no single person is exposed if
          the trip collapses.
        </p>
        <p>
          When it genuinely has to be one person — one card has the right travel insurance,
          one person has the loyalty account — the group should acknowledge that as a
          favour and reimburse fastest of all.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Rule three: decide the cancellation rule before you book</h2>
        <p>
          Ten seconds in the group chat, months before it matters. There are only three
          reasonable answers, and any of them works as long as it was agreed:
        </p>
        <ul>
          <li>
            <strong>Personal risk.</strong> If you drop out, you lose your share. The
            default, and the fairest for the people still going.
          </li>
          <li>
            <strong>Shared risk.</strong> The group absorbs a cancellation together.
            Generous, appropriate for close friends and family, and worth saying out loud
            so nobody assumes it.
          </li>
          <li>
            <strong>Replacement rule.</strong> If you drop out, you find someone to take
            your place, or you cover it. Practical for houses and villas where the cost
            does not shrink when a person leaves.
          </li>
        </ul>
        <p>
          Note the asymmetry that makes this urgent: on a rented house, one person leaving
          does not reduce the bill at all. Everyone else&rsquo;s share goes up. Nobody
          expects that until it happens.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Rule four: fix the exchange rate at the moment of booking</h2>
        <p>
          If the booking was in a foreign currency, fix the rate on the day it was paid
          rather than the day people reimburse. Reimbursing at a later rate means the
          group is unintentionally speculating on currency, with the booker taking the
          whole position &mdash; and on a deposit paid six months out, that position is
          large and lasts a long time.
        </p>
        <p>
          This is a deliberate exception to the convention we recommend everywhere else.
          For ordinary trip spending the answer is the mid-market rate applied uniformly,
          with card fees staying on the card that charged them; see{" "}
          <Link href="/blog/which-exchange-rate-to-use-when-splitting-a-trip">
            which exchange rate to use when splitting a trip
          </Link>
          . A single large upfront booking is the case where pinning the rate to the
          booking date is worth the inconsistency, because the exposure is concentrated on
          one person for months rather than spread across everyone for a week.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Handling partial refunds without a headache</h2>
        <p>
          A hotel refunds one night. An airline gives back the taxes on a cancelled seat.
          The instinct is to reopen the whole calculation, which is how a settled group
          becomes an unsettled one.
        </p>
        <p>
          Treat the refund as its own event. Whoever received it distributes it in the
          same proportion the original was split, and it is done — no recalculation of
          anything else. In the <Link href="/">calculator</Link>, that is one negative
          entry against the same set of people, or simply a separate transfer if the
          rest is already settled.
        </p>
        <p>
          Refunds below a threshold the group agrees on — the price of a coffee each —
          are not worth moving. Say so once and let the booker keep them.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The four-line message that prevents all of this</h2>
        <p>Send it when the trip is first proposed, before anyone books anything:</p>
        <div className="proseNote">
          <p>
            &ldquo;Flights: I&rsquo;ll book, everyone sends their share within a week.
            House: Ana books, same deal. Big bookings settle at the rate on the booking date. If
            someone drops out after we&rsquo;ve booked, that person covers their own
            share.&rdquo;
          </p>
        </div>
        <p>
          Nobody has ever objected to this message. Its entire value is that it exists
          before there is money at stake, when agreeing costs nothing.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Related reading</h2>
        <ul>
          <li>
            <Link href="/blog/how-to-split-event-tickets-with-friends">
              How to split concert and sports event tickets
            </Link>{" "}
            — the same problem, compressed into a sixty-second ticket queue.
          </li>
          <li>
            <Link href="/blog/best-ways-to-split-expenses-when-traveling-with-friends">
              Best ways to split expenses when traveling with friends
            </Link>
          </li>
        </ul>
      </section>
            <section className="articleWorked">
          <h2>Worked example</h2>
          <p>
            One person fronting a large booking &mdash; exactly the exposure this article is about. Ana put the villa deposit on her card; Ben picked up groceries. Both split evenly across the four.
          </p>
          <figure className="articleFigure">
            <Image
              src="/blog/who-should-pay-the-deposit-group-travel.webp"
              alt="BillSmart result panel showing a large villa deposit paid by one person and a small grocery bill paid by another."
              width={1350}
              height={1116}
              sizes="(max-width: 900px) 92vw, 820px"
            />
            <figcaption>
              Settled in USD: Chloe and Dan pay Ana $324.00 each, Ben pays Ana $228.00. Ana is carrying $1,200 until those three transfers land, which is the case for settling big bookings before the trip rather than after.
            </figcaption>
          </figure>
        </section>
      </article>
  );
}
