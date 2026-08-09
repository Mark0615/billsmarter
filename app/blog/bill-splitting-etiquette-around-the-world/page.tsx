import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "Bill-Splitting Etiquette Around the World",
  description:
    "Separate checks are routine in some countries and awkward in others. What to expect in Taiwan, Japan, Korea, the US, the UK and continental Europe — and how to handle it when you get it wrong.",
  alternates: { canonical: "/blog/bill-splitting-etiquette-around-the-world" },
};

export default function Page() {
  return (
    <article className="prosePage blogArticleStandalone">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>Bill-Splitting Etiquette Around the World</h1>
        <PostMeta slug="bill-splitting-etiquette-around-the-world" />
        <p className="lead">
          Asking to split a bill by item is completely normal in one country and mildly
          embarrassing in the next. Knowing which one you are in saves a small amount of
          money and a large amount of standing around at the register.
        </p>
      </header>

      <div className="proseNote">
        <p>
          <strong>A caveat worth stating first.</strong> These are tendencies, not rules.
          Age, city, formality of the occasion and the specific people at the table all
          matter more than nationality. Treat the below as a starting expectation you
          adjust within about ten minutes of arriving.
        </p>
      </div>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Taiwan</h2>
        <p>
          Among friends and colleagues of similar age, splitting evenly — AA制 — is
          unremarkable, and mobile transfers make settling up afterwards effortless. Many
          groups will have one person pay the whole bill at the register and everyone
          transfer their share before they have left the restaurant.
        </p>
        <p>
          The thing that surprises visitors is the opposite pattern: treating. If someone
          invited you, is significantly older, or is celebrating something, expect a
          genuine contest to pay. Offering once or twice and then accepting graciously is
          the correct move; insisting past that point is not politeness, it is refusing a
          gesture. Reciprocating next time is how the ledger actually clears.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Japan</h2>
        <p>
          Splitting evenly — 割り勘, <em>warikan</em> — is the default among peers, and it
          really does mean evenly. Itemising who ate what is unusual outside close friends,
          and many group dinners are booked as a fixed per-person course precisely so the
          question never arises.
        </p>
        <p>
          Practically: you generally pay at a register on the way out rather than at the
          table, and many restaurants will not split a bill across multiple cards. One
          person pays the total and the group settles between themselves. Bring some cash
          even if you rarely use it at home, and decide who is paying before you get to the
          counter rather than negotiating in front of a queue.
        </p>
        <p>
          At work-adjacent dinners the hierarchy usually decides: a senior colleague often
          covers more, or the company does. Offering your share is still correct; being
          waved off is a normal outcome.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>South Korea</h2>
        <p>
          A long-standing pattern is that the eldest or the most senior person pays,
          particularly at a first venue. Where a group is more equal, rounds get shared
          across the evening instead — one person covers dinner, another covers the second
          venue, another the third. Over a few outings it balances.
        </p>
        <p>
          Splitting the individual bill is increasingly common among younger groups and
          nobody will find it strange, but the rotating-host pattern is still the one you
          are most likely to walk into.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>United States</h2>
        <p>
          The most split-friendly of the lot. Asking for separate checks is routine, and
          servers will often run multiple cards without being asked twice. &ldquo;Shall we
          just split it evenly?&rdquo; is equally normal.
        </p>
        <p>
          The complication is tipping. Fifteen to twenty percent is added on top by the
          customer, on top of tax, so the number on the menu is not the number you pay. If
          your group splits evenly but tips separately, the total will not reconcile — and
          the person whose card ran the bill will absorb the gap. Decide up front whether
          the tip is shared proportionally or per person.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>United Kingdom and Ireland</h2>
        <p>
          In restaurants, splitting is unremarkable and service is often already added to
          the bill for larger tables — check before adding more.
        </p>
        <p>
          In pubs, the operative custom is rounds: one person buys drinks for the whole
          group, and the next round falls to someone else. Trying to pay for only your own
          drink in a group that is buying rounds reads as opting out socially rather than
          financially. If you are drinking less than the others, saying so early is fine;
          quietly skipping your turn is what gets noticed.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Continental Europe</h2>
        <p>
          Highly variable, but a few things travel well. Service is frequently included in
          the price, so the tipping arithmetic that complicates American bills mostly
          disappears — rounding up is common, a percentage calculation is not.
        </p>
        <p>
          Splitting evenly is usually easy; splitting by item across many cards is more
          often met with reluctance, especially at busy times or in smaller
          establishments. In much of the region the practical approach is the same as
          Japan: one card pays, the group settles privately afterwards.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The pattern underneath all of this</h2>
        <p>
          Two questions cover almost every country you will visit:
        </p>
        <ul>
          <li>
            <strong>Does the restaurant split the bill, or do you?</strong> In much of
            Asia and continental Europe the answer is you. In the US and UK, often the
            restaurant.
          </li>
          <li>
            <strong>Is paying a social act or an accounting one?</strong> Where treating
            carries meaning — Taiwan, Korea, Japan at certain tables — an insistent
            attempt to pay exactly your share can misfire. Where it does not, precision is
            simply efficient.
          </li>
        </ul>
        <p>
          When one person ends up covering the table, that is not a problem to solve at
          the restaurant. Log it and settle later — which is what the{" "}
          <Link href="/">calculator</Link> is for, particularly when the meals are in one
          currency and your group settles in another.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>If you get it wrong</h2>
        <p>
          You will, occasionally, and it matters far less than it feels like in the
          moment. Offer once, read the response, and move on. Getting the next round or
          the next meal is a complete apology in every culture listed here, and it is
          better received than an awkward attempt to hand over exact change.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Related reading</h2>
        <ul>
          <li>
            <Link href="/blog/how-to-split-restaurant-and-bar-bills">
              How to split restaurant and bar bills
            </Link>{" "}
            — the mechanics once you have decided to split.
          </li>
          <li>
            <Link href="/blog/cash-vs-card-payments-when-traveling">
              Cash vs. card payments when traveling
            </Link>{" "}
            — which to carry where.
          </li>
        </ul>
      </section>
    </article>
  );
}
