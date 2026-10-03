import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "Which Exchange Rate Should You Use When Splitting a Trip?",
  description:
    "How to agree on a rate method for mixed-currency group expenses, and how BillSmart records the rate, source and date used for each payment.",
  alternates: {
    canonical: "/blog/which-exchange-rate-to-use-when-splitting-a-trip",
  },
};

export default function Page() {
  return (
    <article className="prosePage blogArticleStandalone">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>Which Exchange Rate Should You Use When Splitting a Trip?</h1>
        <PostMeta slug="which-exchange-rate-to-use-when-splitting-a-trip" />
        <p className="lead">
          Nobody argues about this until the trip is over. Then one person points out
          that the yen moved 4% while you were away, and suddenly a settled bill is not
          settled.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Why I needed this comparison</h2>
        <p>
          On a March 2025 Japan trip with three friends, I paid for three hotel nights in
          TWD before departure. Friends covered Lawson and coffee purchases for me in JPY
          cash during the trip. Those are two different kinds of receipts in one group
          settlement. I do not have a verified rate or amount to publish from that trip,
          so the arithmetic below uses clearly marked examples.
        </p>
        <p>
          For an old trip like that, today&rsquo;s reference rate is not the historical rate
          we actually faced. If the group agrees to use statement amounts or an
          expense-date rate, calculate that amount first and enter it in the settlement
          currency. BillSmart&rsquo;s automatic conversion uses the latest available
          provider rate when the pair is first needed, and now shows its source and date
          alongside the payment.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The problem, stated plainly</h2>
        <p>
          On a week in Japan, three friends from Taiwan spend across two currencies. One
          paid for the hotel in yen on a card. One withdrew yen in cash at an ATM and paid
          for meals. One booked the flights months earlier in Taiwan dollars.
        </p>
        <p>
          Every one of those transactions has a different exchange rate attached to it,
          and none of them is &ldquo;the&rdquo; rate. To settle up you have to choose one
          convention and apply it to everyone. The choice matters less than you think, but only if you make it deliberately and tell the group.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Four rates that all have a claim to being correct</h2>

        <h3>1. A reference rate on the day of the expense</h3>
        <p>
          A published reference rate gives the group one number that does not depend on
          any traveller&rsquo;s card. BillSmart instead fetches the latest available rate
          when a pair is first needed; it does not look up the expense date. Its sources are European Central Bank reference data where the ECB publishes it,
          and a second public source for the currencies it does not. New Taiwan dollars
          are in the second group, so the trip above settles on the fallback rather than
          on ECB data.
        </p>
        <p>
          It avoids favouring the person who happened to use a particular card. Keep the
          exact rate, source and date used so everybody can check the calculation later.
        </p>

        <h3>2. The rate your card actually charged</h3>
        <p>
          The one on your statement. It is the true cost to the person who paid, which is
          exactly why it feels fairest to them and unfairest to everyone else. Two people
          buying identical dinners on the same night with different cards will produce
          different &ldquo;true&rdquo; numbers, because one card carries a foreign
          transaction fee of a few percent and the other does not.
        </p>
        <p>
          If the group shares statement costs, agree whether card fees are shared too.
          Otherwise different cards can make identical purchases cost different amounts.
        </p>

        <h3>3. The rate on the day you settle up</h3>
        <p>
          Simple, and defensible if the group settles quickly. Its flaw shows up on long
          trips: if the currency moves significantly between the expense and the
          settlement, people who spent early and people who spent late are treated
          differently for no reason connected to what they bought.
        </p>

        <h3>4. One fixed rate for the whole trip, agreed in advance</h3>
        <p>
          Underrated. Before you leave, look up the rate and round it to something
          memorable, 1 TWD to 4.7 JPY, say. Everyone uses that number for everything.
        </p>
        <p>
          It is not the most accurate method. The advantage is that anyone at the table
          can do the maths on a napkin. BillSmart has no manual rate field, so using this
          method means calculating each agreed amount yourself and entering it directly
          in the settlement currency.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>What to actually do</h2>
        <div className="proseNote">
          <p>
            <strong>A simple default:</strong> agree to use the same published reference
            rate method for everyone. Decide separately whether card and cash withdrawal
            fees stay with the payer or become shared expenses.
          </p>
        </div>
        <p>
          Two exceptions worth making consciously:
        </p>
        <ul>
          <li>
            <strong>One person fronted a very large booking.</strong> If someone put
            NT$120,000 of flights on a card and ate a 1.5% fee doing it, that fee is
            NT$1,800, no longer noise. Add it as its own line item shared by the group.
            Enter it as a separate expense rather than fudging the rate.
          </li>
          <li>
            <strong>The currency moved sharply mid-trip.</strong> If the difference would
            materially change what a friend owes, agree on a rate date before settling.
          </li>
        </ul>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Traps that cost more than the rate you picked</h2>

        <h3>Dynamic currency conversion</h3>
        <p>
          The card terminal asks whether you would like to be charged in your home
          currency instead of the local one. That option lets the merchant&rsquo;s payment
          processor set the exchange rate and may add a markup or fee. Compare the
          disclosed terms with your card&rsquo;s terms; choosing the local currency avoids
          the offered DCC conversion.
        </p>
        <p>
          The same prompt appears at ATMs abroad: &ldquo;with conversion&rdquo; or
          &ldquo;without conversion&rdquo;. Check the displayed rate and fees before choosing.
        </p>

        <h3>Assuming the rate is fixed the moment you tap</h3>
        <p>
          It usually is not. Card networks convert when the transaction settles, which can
          be a day or several later. That is why the amount on your statement rarely
          matches the rate you looked up at dinner, even before fees.
        </p>

        <h3>Cash withdrawal fees hiding inside a good rate</h3>
        <p>
          An ATM can give a perfectly reasonable exchange rate and still cost you, because
          the withdrawal fee is charged separately, sometimes by both your bank and the
          machine&rsquo;s operator. If one person is the group&rsquo;s designated cash
          machine, those fees should be a shared expense, not a private tax on being
          helpful.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Agree on it in the group chat, before you fly</h2>
        <p>
          Two sentences can settle the rule: &ldquo;Everything settles in TWD using the
          latest available reference rate when we calculate. Card fees stay with whoever
          paid them.&rdquo; This matches BillSmart&rsquo;s automatic conversion. If you agree
          on expense-date rates instead, calculate those amounts separately first.
        </p>
        <p>
          The <Link href="/">BillSmart calculator</Link> does not retrieve historical expense-date rates. Enter each payment in the currency it was charged in, and it
          converts to your chosen base currency and keeps the original and converted amount for every entry. For a historical or agreed rate, calculate the agreed amount and enter it directly in the settlement currency.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Related reading</h2>
        <ul>
          <li>
            <Link href="/blog/cash-vs-card-payments-when-traveling">
              Cash vs. card payments when traveling
            </Link>{" "}: when each one wins, and what the fees really are.
          </li>
          <li>
            <Link href="/blog/best-ways-to-split-expenses-when-traveling-with-friends">
              Best ways to split expenses when traveling with friends
            </Link>{" "}: settling as you go rather than at the airport.
          </li>
          <li>
            <Link href="/how-it-works">How BillSmart works</Link>, the conversion and
            settlement logic, step by step.
          </li>
        </ul>
      </section>
            <section className="articleWorked">
          <h2>Worked example</h2>
          <p>
            The convention above, applied: one settlement currency for the whole group, every entry converted into it. This illustration uses fixed converted amounts so the rounding is easy to check; it is not a quote of today&rsquo;s exchange rates.
          </p>
          <p>Ana&rsquo;s payment converts to TWD 4,785, Ben&rsquo;s to TWD 4,128, and Chloe pays TWD 2,600. All three payments cover all three people. The total is TWD 11,513, split as TWD 3,838 for Ana, TWD 3,838 for Ben, and TWD 3,837 for Chloe. The one-dollar remainder follows the people list.</p>
          <p>After subtracting each person&rsquo;s share from what they paid, Chloe owes TWD 1,237. She sends TWD 947 to Ana and TWD 290 to Ben. Enter the original payment currencies in <Link href="/">BillSmart</Link>; the exact converted values will depend on the latest available rate when you make the calculation.</p>
        </section>
        <section>
        <h2>Sources and scope</h2>
        <p>Reference rates are informational and may differ from the rate on a bank statement. See the <a href="https://data.ecb.europa.eu/methodology/exchange-rates">ECB exchange-rate methodology</a> and <a href="https://www.exchangerate-api.com/docs/free">ExchangeRate-API update schedule</a>. BillSmart keeps conversions during the current calculation and does not retrieve a historical expense date.</p>
        <p>For card conversions, <a href="https://www.visa.com/en-us/personal/travel/dynamic-currency-conversion">Visa explains the exchange rate and additional fees disclosed with dynamic currency conversion</a>. Compare those terms with your own card agreement. The splitting rules in this guide are suggestions for your group, not universal bank or merchant rules.</p>
      </section>
    </article>
  );
}
