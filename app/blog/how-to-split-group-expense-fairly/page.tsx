import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "How to Split Group Expenses Fairly",
  description:
    "A group expense is rarely an expense for the whole group. Why every payment needs a payer and a set of people it covers, and what to agree before the money moves.",
  alternates: { canonical: '/blog/how-to-split-group-expense-fairly' },
};

export default function Page() {
  return (
    <article className="prosePage blogArticleStandalone">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>How to Split Group Expenses Fairly</h1>
        <PostMeta slug="how-to-split-group-expense-fairly" />
        <p className="lead">
          Most advice about splitting bills assumes the hard part is the arithmetic. It is not. The arithmetic is trivial. The hard part is that a group expense is rarely an expense for the whole group, and pretending otherwise is what makes people quietly annoyed.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <p>Here is an ordinary weekend in Taiwan. Six friends rent a place in Yilan. One person books the accommodation and pays the whole thing. Another buys drinks and snacks for everyone on the way. One of the women stops at a 7-Eleven and buys sanitary products for herself and two of the others. Somebody covers parking. Somebody else pays for the boat tickets, but only four people go on the boat because two of them get seasick.</p>
        <p>Divide the total by six and almost every one of those is wrong.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Even splitting is a special case, not the default</h2>
        <p>Splitting the total by the number of people is fast and it requires no thought, which is why it is the default. It is also only fair in one specific case: when everybody consumed roughly the same thing.</p>
        <p>It works for genuinely shared fixed costs. The house is the house whether you slept in the big room or the small one. Parking is parking. A boat rental where everybody goes on the boat is a single cost with a single group behind it.</p>
        <p>It stops working the moment the group behind a cost is smaller than the group at the table. Four people on the boat and six people paying for it is not a rounding error. It is two people paying for something they did not do.</p>
        <p>And there is a threshold below which it stops mattering. If working out the exact share saves someone forty dollars, do the work. If it saves eleven, split it evenly and move on. Pick a number, say it out loud once, and stop relitigating it. The price of a coffee each is the usual place people land.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Every expense needs two answers, not one</h2>
        <p>This is the part most tools and most groups get wrong. An expense has a payer, and it has a set of people it covers. Those are different questions.</p>
        <p>The person who books the house paid for six people including themselves. The person who bought drinks paid for six people including themselves. The person who bought sanitary products at 7-Eleven paid for three people, one of whom is her, and the other three people in the group have nothing to do with it. The boat is four people out of six, and the person who paid may or may not be one of the four.</p>
        <p>If your record of an expense only captures who paid, you have lost the information you need to split it properly, and the only way to recover it is to remember. A week later nobody remembers who was on the boat, including the person who paid.</p>
        <p>So record both, in the <Link href="/">calculator</Link> or anywhere else. Who paid, and who it was for. Once those two fields exist, the awkward cases stop being awkward, because the sanitary products entry is simply a payment covering three named people, in the same list as everything else. It does not need a conversation, and it does not need anybody to raise it at settlement time.</p>
        <p>That last point is worth sitting with. A lot of small purchases inside a group are mildly personal: medication, a hangover cure, period products, a phone charger someone forgot. The reason these end up unclaimed is not that they are trivial. It is that raising them at the end feels petty in a way that raising the boat tickets does not, so they go unclaimed. Logging them the same way as everything else removes the moment where somebody has to decide whether it is worth mentioning.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>When even a correct split is not fair</h2>
        <p>There is a second kind of unfairness that has nothing to do with who consumed what.</p>
        <p>Friend groups contain people at different stages of their lives. One is three years into a job with a bonus, one is in the second year of a PhD. An even split of a weekend everybody genuinely joined in equally can still be a meaningful amount for one person and nothing for another.</p>
        <p>Two things help, and neither of them involves anybody disclosing their salary.</p>
        <p>Set the range before the plans are made. Agreeing on a rough per-night budget in the group chat, before anybody looks at listings, lets people opt into the top or the bottom of it without announcing why. A number set after somebody has already found a place is not a budget. It is a negotiation about that place.</p>
        <p>Make the expensive things opt-in explicitly. If three of six want the tasting menu, that is a three-way split and the other three eat somewhere else and meet afterwards. Framed in advance as logistics, this is unremarkable. Framed at the table when the bill arrives, it is about money.</p>
        <p>For households rather than trips, proportional splitting is a reasonable answer. Two people sharing a flat with substantially different incomes might split rent 65/35 rather than evenly, so that both end up with a comparable share of their income left over. This works between people who have chosen to pool their finances to some degree. It does not translate well to a group of friends on a weekend away, where the accounting is meant to end when the trip does.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Tax, service and the person holding the card</h2>
        <p>The most common way a technically correct split still loses somebody money is the forgotten extras.</p>
        <p>One person pays a 4,800 TWD dinner bill and tells the group to send 800 each. The bill was 4,800 including a 10% service charge. Everyone sends 800, the payer is square, and the arithmetic worked. Now run the same evening where they say &ldquo;it was about 4,300 plus service&rdquo; and people round down. Over a long weekend with several meals, the person holding the card absorbs a few hundred dollars that nobody intended them to absorb.</p>
        <p>The fix is to log the number on the receipt rather than the number you remember. Tax and service are part of what was paid, so they are shared in the same proportion as the meal itself. There is no separate field for them, and that is the point: the extras get split the same way the food does, instead of landing on one person.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>What to agree before the money moves</h2>
        <p>Fair is whatever the group decided in advance. Almost every argument about splitting is really an argument about a rule that was never set.</p>
        <p>Four things cover most of it. What counts as shared, and what is charged to whoever took part. The rough budget band. The threshold below which nobody bothers. And who is tracking it, in one place, visible to everybody. <Link href="/blog/group-trip-money-checklist">The group trip money checklist</Link> has the full list and a message you can copy.</p>
        <p>None of these take more than five minutes to agree in a group chat before anyone books anything. All of them are painful to agree afterwards, because by then there is money on the table and somebody has already paid it.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Related reading</h2>
        <ul>
          <li>
            <Link href="/blog/how-to-split-bills-when-incomes-are-different">
              How to split bills when incomes are different
            </Link>{" "}: the harder version, with the arithmetic worked through.
          </li>
          <li>
            <Link href="/blog/how-to-split-restaurant-and-bar-bills">
              How to split restaurant and bar bills
            </Link>{" "}: the same problem at a single table.
          </li>
        </ul>
      </section>

      <section className="articleWorked">
      <h2 className="text-3xl font-bold text-indigo-800 mb-4">Worked example</h2>
      <p>
      Both rules from above in one calculation: the boat rental everyone used, split evenly; the excursion only two people joined, charged to those two.
      </p>
      <figure className="articleFigure">
      <Image
      src="/blog/how-to-split-group-expense-fairly.webp"
      alt="BillSmart result panel showing an evenly split boat rental and a two-person excursion."
      width={1350}
      height={1116}
      sizes="(max-width: 900px) 92vw, 820px"
      />
      <figcaption>
      Settled in USD: Chloe and Dan pay Ana $60.00 each, Ben pays Ana $12.00. Ben owes $60 for the boat and is owed $48 for the excursion, so only the $12 difference actually moves.
      </figcaption>
      </figure>
      </section>
    </article>
  );
}
