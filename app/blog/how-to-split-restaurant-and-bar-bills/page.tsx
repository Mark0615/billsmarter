import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "How to Split Restaurant and Bar Bills for Big Groups",
  description: "The drinks bill worked through in numbers, how service charges differ between Taiwan, Japan and the US, and why saying how you will split it before ordering changes what people order.",
  alternates: { canonical: '/blog/how-to-split-restaurant-and-bar-bills' },
};

export default function Page() {
  return (
    <article className="prosePage blogArticleStandalone">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>How to Split Restaurant and Bar Bills for Big Groups</h1>
        <PostMeta slug="how-to-split-restaurant-and-bar-bills" />
        <p className="lead">
          The bill for eight people arrives as one number, and that number contains at least three different groups of buyers. There are the people who shared the food. There are the four who drank the wine. And there is the one person who ordered a soda because they are driving everybody home.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <p>An even split treats all eight identically. That is fine when everybody ate and drank roughly the same. It stops being fine the moment the drinks bill is a third of the total and two people did not touch it.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Separate the drinks from the food</h2>
        <p>This is the only rule that changes the arithmetic much, and it is worth doing before you try anything more sophisticated.</p>
        <p>Take the shared food, the plates that arrived in the middle and got passed around, and split that across everybody who ate. Take the alcohol and split it across whoever drank it. Two lines instead of one.</p>
        <p>An illustrative eight-person dinner: shared food costs TWD 5,600 including service, and two bottles of wine cost TWD 2,400. Four people drank the wine. Splitting the TWD 8,000 total evenly would charge everyone TWD 1,000. Entering the food and wine separately makes food TWD 700 per person, plus TWD 600 for each wine drinker. The designated driver pays TWD 700 rather than TWD 1,000.</p>
        <p>That 300 difference is small. What matters is that the driver did not have to ask for it. The reason people resent even splits at a bar is rarely the money. It is having to choose between paying for something they did not have and being the person who raises it.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The service charge belongs in the number you enter</h2>
        <p>Service is handled differently in every country your group is likely to eat in, and getting it wrong is the most common way one person quietly loses money.</p>
        <p>In Taiwan, check the menu and receipt for any service charge. If a restaurant adds a charge such as 10%, include it once in the amount you split; do not assume every restaurant uses the same policy.</p>
        <p>In Japan, tipping is generally not customary. JNTO also notes that some venues charge for an otoshi, a small appetizer that acts as a cover charge. Check the receipt instead of assuming the food price is the whole bill.</p>
        <p>In the United States, a voluntary tip may be added by the payer, but some restaurants already include an automatic gratuity or service charge, especially for large groups. Read the receipt before adding more, and agree which final amount the group is sharing.</p>
        <p>The rule that survives all three is the same: log the number that actually left the payer&rsquo;s account, not the number printed next to the food. If the receipt says 5,600 and the payer added 800 on top, the entry is 6,400. Everything else follows from that. There is no separate field for tax or service, and that is deliberate: putting the real total in means the extras are shared in the same proportion as the meal, rather than landing on whoever held the card.</p>
        <p>A separate, fully checkable service-charge example: eight people share a final TWD 6,400 receipt equally. The person whose card paid owes TWD 800 themselves and should receive TWD 800 from each of the other seven, TWD 5,600 in total. If they ask for only TWD 700 each after recalling an earlier subtotal, they collect TWD 4,900 and absorb an extra TWD 700. Enter the final paid amount from the receipt so the calculation includes service once.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Say how you are splitting before you order</h2>
        <p>Most of the awkwardness at the end of a meal was created at the beginning of it, when nobody said anything.</p>
        <p>One sentence before the menus are open covers it. &ldquo;Shall we just split it evenly?&rdquo; or &ldquo;pay for what you order?&rdquo; or &ldquo;let&rsquo;s split the food and do drinks separately&rdquo;. Any of the three works. What does not work is discovering at the end that half the table assumed one and half assumed another.</p>
        <p>The reason this matters is not fairness, it is ordering behaviour. If the split is even and unstated, the person who wanted the expensive fish orders the cheap chicken so as not to be the reason everybody pays more, and the person who wanted a salad orders a main course so as not to be subsidising. Both of them have a worse evening because nobody spent five seconds on the question.</p>
        <p>Set menus make this easier and people forget to use them. If the restaurant offers one, a table where six people take the set menu and two order separately is trivially splittable: six identical amounts and two individual ones.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The cases that actually come up</h2>
        <p>Somebody arrived late and had a starter while the rest of the table ate three courses. Charge them for what they had and split the rest across the others. This needs saying out loud once, by somebody other than them, because they will not raise it themselves.</p>
        <p>A round bought at the bar is not a group expense. It covers whoever was standing there at the time, usually three or four people, and the person who bought it is one of them.</p>
        <p>If the table is covering somebody&rsquo;s birthday meal, that is a payment split across everybody except them. The arithmetic stops being awkward as soon as you give up on making the evening one number.</p>
        <p>Parking, or the taxi home for the three people going the same direction, gets the same treatment: a payer and a list of the people it was actually for, which is frequently not everybody.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Entering it</h2>
        <p>Each of the situations above is one payment in the <Link href="/">calculator</Link>, with two facts attached: who paid, and who it covers. The eight-person dinner is two entries. The birthday meal is one entry covering seven of the eight. The round at the bar is one entry covering four.</p>
        <p>Enter each amount as it was actually paid, in the currency it was paid in, tax and service included. What comes back is a short list of who pays whom, netted off rather than settled bill by bill. On a table of eight with four separate payers, that is usually three or four transfers rather than the twenty-something individual debts it looks like on paper.</p>
        <p>When the group is ready to settle, check the amounts and click Download PDF in the settlement panel. It records the payments and final transfers. The calculator does not keep an editable history after you close or refresh the page.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The threshold worth agreeing</h2>
        <p>Below some amount, precision costs more than it saves. Different countries also treat the bill itself differently, which <Link href="/blog/bill-splitting-etiquette-around-the-world">bill splitting etiquette around the world</Link> covers. If splitting exactly saves somebody 40 dollars, do it properly. If it saves 15 NT, do not spend ten minutes on it at a table where everybody wants to go home.</p>
        <p>Pick a number, say it once, and stop reopening it. The price of a coffee each is where most groups land, and having a stated threshold is what stops the same conversation happening at every meal.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Sources and related reading</h2>
        <p>JNTO explains <a href="https://www.japan.travel/en/plan/tipping-in-japan/">tipping in Japan</a> and <a href="https://www.japan.travel/en/ca/etiquette/">otoshi charges</a>. The IRS distinguishes <a href="https://www.irs.gov/businesses/small-businesses-self-employed/tip-recordkeeping-and-reporting">voluntary tips from mandatory service charges</a>. These sources explain the distinction; the restaurant’s menu and your final receipt determine your actual expense.</p>
        <ul>
          <li>
            <Link href="/blog/how-to-split-group-expense-fairly">
              How to split group expenses fairly
            </Link>{" "}: why an expense needs a payer and a set of people it covers.
          </li>
          <li>
            <Link href="/blog/bill-splitting-etiquette-around-the-world">
              Bill splitting etiquette around the world
            </Link>{" "}: what the table expects, by country.
          </li>
        </ul>
      </section>

      <section className="articleWorked">
      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">Worked example</h2>
      <p>
      Rule 1 in practice. The shared food is one payment covering all four; the bottle of wine is a second payment covering only the three who drank it. Both amounts are the receipt totals, tax and service included.
      </p>
      <figure className="articleFigure">
      <Image
      src="/blog/how-to-split-restaurant-and-bar-bills.webp"
      alt="BillSmart result panel showing shared food split four ways and a bottle of wine split between three of the four."
      width={1350}
      height={1116}
      sizes="(max-width: 900px) 92vw, 820px"
      />
      <figcaption>
      Settled in USD: Chloe pays Ana $70.00; Dan pays Ana $28.00 and Ben $14.00. Dan, who did not drink, pays $42.00 in total, his share of the food and nothing else.
      </figcaption>
      </figure>
      </section>
    </article>
  );
}
