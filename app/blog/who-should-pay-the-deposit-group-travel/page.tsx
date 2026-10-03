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
          A large booking often lands on one person&rsquo;s card before the trip begins.
          Agree when and how the others will reimburse them, and what happens if the
          booking changes. Those decisions matter more than the final division.
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
            <strong>Cash flow.</strong> The buyer must pay the card statement even if
            friends have not reimbursed them yet. Delayed repayment can strain their
            budget or create card interest if they cannot pay the statement in full.
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
            <strong>Currency.</strong> A foreign-currency price, the card&rsquo;s final
            statement amount and a published reference rate may differ. The group needs
            to agree which amount it is reimbursing.
          </li>
        </ul>
        <p>
          These are foreseeable questions. Agreeing on them before anyone books is easier
          than reconstructing the agreement after a cancellation.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Rule one: reimburse immediately, not at the end</h2>
        <p>
          The single highest-value habit in group travel. When someone books a
          NT$60,000 flight for four people, the other three transfer their NT$15,000
          within a couple of days, not after the trip, not when the final spreadsheet is
          ready.
        </p>
        <p>
          A practical option is to settle large bookings separately and early. If a
          booking has already been reimbursed, leave it out of the final trip calculation
          so nobody pays twice. If it is still unpaid, include it once with the other
          expenses when the group settles.
        </p>
        <div className="proseNote">
          <p>
            <strong>Illustrative four-person example:</strong> one traveller pays TWD
            24,000 for three hotel nights before a Japan trip. Each person&rsquo;s agreed
            share is TWD 6,000, so the other three each transfer TWD 6,000 before
            departure. During the trip, a friend pays for a convenience-store purchase
            in JPY on someone else&rsquo;s behalf. Record that later JPY payment in the
            final calculation, but not the hotel that was already reimbursed. This
            resembles the mixed-currency situation behind BillSmart; the amounts here
            are invented examples, not my friends&rsquo; receipts.
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
          When it genuinely has to be one person (one card has the right travel insurance,
          or one person has the loyalty account), the group should acknowledge that as a
          favour and reimburse fastest of all.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Rule three: decide the cancellation rule before you book</h2>
        <p>
          Put the rule in the group chat before paying. Three possible agreements are:
        </p>
        <ul>
          <li>
            <strong>Personal risk.</strong> A person who drops out covers their
            non-refundable share, if everyone accepted that rule before booking.
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
          may not reduce the bill at all. The remaining travellers then need to decide
          who covers the missing share under their agreed rule.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Rule four: agree on the reimbursement amount</h2>
        <p>
          If the booking was charged in a foreign currency, decide whether to share the
          final card-statement amount or convert the original price using a documented
          reference rate on an agreed date. A card transaction may settle after the
          purchase, and fees can change the final cost. Neither method is automatically
          fairer; the group should know which amount it is accepting.
        </p>
        <p>
          BillSmart fetches the latest available reference rate when a currency pair is
          first needed. It does not retrieve the rate on a past booking date or offer a
          manual-rate field. For a historical reference rate or the final card statement,
          calculate and settle that large booking separately, keeping the original
          foreign-currency receipt and transfer records. Entering only the converted
          amount as a new payment would make the PDF show a different payment currency
          from the actual receipt. For the other rate choices, see{" "}
          <Link href="/blog/which-exchange-rate-to-use-when-splitting-a-trip">
            which exchange rate to use when splitting a trip
          </Link>
          .
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
          same proportion the original was split, and it is done, no recalculation of
          anything else. In the <Link href="/">calculator</Link>, negative refund entries are not supported. Arrange separate transfers using the original shares, and retain the refund record alongside the original settlement.
        </p>
        <p>
          Refunds below a threshold the group agrees on (the price of a coffee each) are not worth moving. Say so once and let the booker keep them.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The four-line message that prevents all of this</h2>
        <p>Send it when the trip is first proposed, before anyone books anything:</p>
        <div className="proseNote">
          <p>
            &ldquo;Flights: I&rsquo;ll book, everyone sends their share within a week.
            House: Ana books, same deal. For foreign-currency bookings we share the
            final card-statement amount, including its fee. If someone drops out, they
            cover their non-refundable share. Does that work for everyone?&rdquo;
          </p>
        </div>
        <p>
          This is a template, not a report of what every group accepts. Change the rate
          and cancellation rules to fit your booking, then get agreement before paying.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Related reading</h2>
        <ul>
          <li>
            <Link href="/blog/how-to-split-event-tickets-with-friends">
              How to split concert and sports event tickets
            </Link>{" "}: the same problem, compressed into a sixty-second ticket queue.
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
            An alternative illustrative case where the large booking has not yet been
            reimbursed: Ana put the villa deposit on her card; Ben picked up groceries.
            Both still need to be settled, so both appear in this calculation.
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
