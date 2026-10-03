import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "Bill-Splitting Etiquette Around the World",
  description:
    "Questions to ask before paying a group bill abroad, with practical examples from Taiwan and Japan and source-backed notes on service charges and tipping.",
  alternates: { canonical: "/blog/bill-splitting-etiquette-around-the-world" },
};

export default function Page() {
  return (
    <article className="prosePage blogArticleStandalone">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>Bill-Splitting Etiquette Around the World</h1>
        <PostMeta slug="bill-splitting-etiquette-around-the-world" />
        <p className="lead">
          Do not assume the restaurant can divide one group bill across several cards.
          Ask early how the venue handles payment, then agree with your group whether
          you are splitting evenly, by item, or settling privately afterwards.
        </p>
      </header>

      <div className="proseNote">
        <p>
          <strong>A caveat worth stating first.</strong> These are tendencies, not rules.
          The venue and the people at your table matter more than nationality. My
          Taiwan–Japan example comes from a real trip; the other country notes are
          questions to check locally, not a report of my own experience in every place.
        </p>
      </div>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Taiwan</h2>
        <p>
          In my own friend group, one person often pays at the register and the others
          transfer their shares afterwards. It is worth asking before ordering whether
          people expect an even split or only want to pay for what they ordered.
        </p>
        <p>
          Treating is a different agreement from splitting. If someone offers to cover a
          celebration meal, ask whether it is a treat before entering it as a group debt.
          A calculator should not turn a gift into an amount the recipient never agreed to
          repay.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Japan</h2>
        <p>
          Groups may agree to split evenly (割り勘, <em>warikan</em>), but that is a
          decision for the people eating together, not a rule imposed by the country.
          If some people ordered much more, agree whether to separate those items first.
        </p>
        <p>
          Payment procedures vary by venue. Japan National Tourism Organization advises
          travellers to check accepted payment methods; some smaller businesses still
          require cash. Decide who will pay before reaching the counter, then settle
          privately if the restaurant issues one bill.
        </p>
        <p>
          At a work dinner, ask who is hosting or whether the company covers the meal.
          Do not assume a personal split when the bill is being treated as hospitality.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>South Korea</h2>
        <p>
          Do not infer who should pay from age alone. Ask whether one person is hosting,
          whether the group is taking turns across venues, or whether everyone expects
          a transfer after the meal.
        </p>
        <p>
          Those choices lead to different records. A hosted dinner is not a debt; a
          rotating round may be a gift or an informal exchange; a shared bill needs a
          clear payer and participants.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>United States</h2>
        <p>
          Ask for separate checks before ordering if you need them. Whether a restaurant
          can divide one bill across several cards is a venue policy, so do not wait until
          the end to find out.
        </p>
        <p>
          The complication is the final total: sales tax, a voluntary tip, or an automatic
          service charge may make it different from the menu price. Check for an
          included charge before adding a tip. If
          your group splits evenly but tips separately, the total will not reconcile, and
          the person whose card ran the bill will absorb the gap. Decide up front whether
          the tip is shared proportionally or per person.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>United Kingdom and Ireland</h2>
        <p>
          Check the bill before calculating shares. VisitBritain notes that an optional
          service charge is sometimes added by restaurants; the amount on the final bill,
          rather than the menu subtotal, is the figure to divide.
        </p>
        <p>
          If friends suggest buying rounds, agree whether the rounds are informal treats
          or costs to settle later. Someone drinking less can opt out before the first
          round instead of discovering an assumed obligation afterwards.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Continental Europe</h2>
        <p>
          There is no useful single rule for all of continental Europe. Service charges,
          tipping and card splitting differ by country and establishment. Read the menu
          and receipt, then ask how the restaurant can take payment.
        </p>
        <p>
          If one card must cover the table, keep the receipt and settle within the group.
          The same method works anywhere: record the actual payer, receipt total and the
          people the expense covered.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The pattern underneath all of this</h2>
        <p>
          Two questions are more useful than memorising national stereotypes:
        </p>
        <ul>
          <li>
            <strong>Can this venue split the bill?</strong> Ask before ordering if separate
            checks or multiple cards matter to your group.
          </li>
          <li>
            <strong>Is this a treat or a shared expense?</strong> Confirm what the payer
            intends before entering the bill as money owed.
          </li>
        </ul>
        <p>
          When one person ends up covering the table, that is not a problem to solve at
          the restaurant. Log it and settle later, which is what the{" "}
          <Link href="/">calculator</Link> is for, particularly when the meals are in one
          currency and your group settles in another.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>If you get it wrong</h2>
        <p>
          You will, occasionally, and it matters far less than it feels like in the
          moment. Offer once, read the response, and move on. Getting the next round or
          the next meal may be a considerate response; ask what the people involved
          prefer rather than assuming one gesture works for everyone.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Sources and related reading</h2>
        <p>The <a href="https://www.irs.gov/businesses/small-businesses-self-employed/tip-recordkeeping-and-reporting">IRS guide</a> distinguishes US tips and mandatory service charges. <a href="https://www.visitbritain.com/en/plan-your-trip/useful-information">VisitBritain</a> discusses optional service charges, and <a href="https://www.japan.travel/en/plan/cashless-payments-in-japan/">Japan National Tourism Organization</a> advises checking payment methods and carrying cash for smaller establishments. These sources support specific payment facts; the group-splitting suggestions are editorial advice, not national rules.</p>
        <ul>
          <li>
            <Link href="/blog/how-to-split-restaurant-and-bar-bills">
              How to split restaurant and bar bills
            </Link>{" "}: the mechanics once you have decided to split.
          </li>
          <li>
            <Link href="/blog/cash-vs-card-payments-when-traveling">
              Cash vs. card payments when traveling
            </Link>{" "}: which to carry where.
          </li>
        </ul>
      </section>
            <section className="articleWorked">
          <h2>Worked example</h2>
          <p>
            The pattern underneath the whole article, run through the calculator. Ana&rsquo;s card covered the table in Tokyo; Ben picked up lunch in Seoul the next day. One card pays, the group settles privately afterwards.
          </p>
          <p>For a fixed illustration, Ana&rsquo;s yen payment converts to USD 115.38 and Ben&rsquo;s won payment to USD 45.88. Both cover all four people. The USD 161.26 total divides into USD 40.32 each for Ana and Ben, then USD 40.31 each for Chloe and Dan.</p>
          <p>Chloe pays Ana USD 40.31. Dan pays Ana USD 34.75 and Ben USD 5.56. These three transfers settle Ana&rsquo;s USD 75.06 credit and Ben&rsquo;s USD 5.56 credit exactly. Current reference rates will change the converted amounts.</p>
        </section>
      </article>
  );
}
