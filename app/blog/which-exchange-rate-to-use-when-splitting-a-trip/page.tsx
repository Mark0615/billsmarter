import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "Which Exchange Rate Should You Use When Splitting a Trip?",
  description:
    "Three people paid in three currencies on three different days. Here is how to pick one exchange rate for the whole group without anyone quietly losing money.",
  alternates: {
    canonical: "/blog/which-exchange-rate-to-use-when-splitting-a-trip",
  },
};

export default function Page() {
  return (
    <article className="prosePage">
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
        <h2>The problem, stated plainly</h2>
        <p>
          On a week in Japan, three friends from Taiwan spend across two currencies. One
          paid for the hotel in yen on a card. One withdrew yen in cash at an ATM and paid
          for meals. One booked the flights months earlier in Taiwan dollars.
        </p>
        <p>
          Every one of those transactions has a different exchange rate attached to it,
          and none of them is &ldquo;the&rdquo; rate. To settle up you have to choose one
          convention and apply it to everyone. The choice matters less than you think —
          but only if you make it deliberately and tell the group.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Four rates that all have a claim to being correct</h2>

        <h3>1. The mid-market rate on the day of the expense</h3>
        <p>
          The midpoint between what banks buy and sell a currency at. It is the number
          you get from a search engine or a currency site, and it is the rate BillSmart
          uses, sourced from European Central Bank reference data.
        </p>
        <p>
          It is neutral — nobody in the group can accuse it of favouring the person who
          happened to use a particular card. It is also the only one of the four that is
          easy for everyone to verify independently.
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
          Using statement rates means the group is quietly subsidising whoever brought the
          worst card.
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
          memorable — 1 TWD to 4.7 JPY, say. Everyone uses that number for everything.
        </p>
        <p>
          It is not the most accurate method, and it does not need to be. Currency moves
          of one or two percent are noise next to the size of the errors people actually
          make, like forgetting a taxi. The advantage is that anyone at the table can do
          the maths on a napkin.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>What to actually do</h2>
        <div className="proseNote">
          <p>
            <strong>For most trips:</strong> use the mid-market rate, applied uniformly to
            everyone. Whoever pays foreign transaction fees absorbs their own fees, the
            same way they would if they had travelled alone. It is neutral, verifiable,
            and it takes no negotiation.
          </p>
        </div>
        <p>
          Two exceptions worth making consciously:
        </p>
        <ul>
          <li>
            <strong>One person fronted a very large booking.</strong> If someone put
            NT$120,000 of flights on a card and ate a 1.5% fee doing it, that fee is
            NT$1,800 — no longer noise. Add it as its own line item shared by the group.
            Enter it as a separate expense rather than fudging the rate.
          </li>
          <li>
            <strong>The currency moved sharply mid-trip.</strong> A move of five percent
            or more over a week is unusual, and it is worth agreeing on a single date for
            everything rather than letting the timing of each purchase decide who pays
            more.
          </li>
        </ul>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Traps that cost more than the rate you picked</h2>

        <h3>Dynamic currency conversion</h3>
        <p>
          The card terminal asks whether you would like to be charged in your home
          currency instead of the local one. Say no. Every time. That option lets the
          merchant&rsquo;s payment processor set the exchange rate, and it is reliably
          worse than the one your card network would have used — often by several
          percent, which dwarfs any of the choices above.
        </p>
        <p>
          The same prompt appears at ATMs abroad: &ldquo;with conversion&rdquo; or
          &ldquo;without conversion&rdquo;. Choose without.
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
          the withdrawal fee is charged separately — sometimes by both your bank and the
          machine&rsquo;s operator. If one person is the group&rsquo;s designated cash
          machine, those fees should be a shared expense, not a private tax on being
          helpful.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Agree on it in the group chat, before you fly</h2>
        <p>
          Two sentences is enough: &ldquo;Everything settles in TWD at the mid-market rate
          on the day of each expense. Card fees are your own.&rdquo; Nobody has to think
          about it again, and the person who eventually does the maths is not also
          negotiating the rules.
        </p>
        <p>
          The <Link href="/">BillSmart calculator</Link> applies this convention
          automatically — enter each payment in the currency it was charged in, and it
          converts to your chosen base currency and shows the rate it used for every
          entry, so the group can check the working rather than trust it.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Related reading</h2>
        <ul>
          <li>
            <Link href="/blog/cash-vs-card-payments-when-traveling">
              Cash vs. card payments when traveling
            </Link>{" "}
            — when each one wins, and what the fees really are.
          </li>
          <li>
            <Link href="/blog/best-ways-to-split-expenses-when-traveling-with-friends">
              Best ways to split expenses when traveling with friends
            </Link>{" "}
            — settling as you go rather than at the airport.
          </li>
          <li>
            <Link href="/how-it-works">How BillSmart works</Link> — the conversion and
            settlement logic, step by step.
          </li>
        </ul>
      </section>
    </article>
  );
}
