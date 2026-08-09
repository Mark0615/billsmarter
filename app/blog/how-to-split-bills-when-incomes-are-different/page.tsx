import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "How to Split Bills When Everyone Earns Different Amounts",
  description:
    "Proportional splitting with the actual arithmetic worked through — including the disposable-income method, where an even split starts to hurt, and how to raise it without it being awkward.",
  alternates: {
    canonical: "/blog/how-to-split-bills-when-incomes-are-different",
  },
};

export default function Page() {
  return (
    <article className="prosePage blogArticleStandalone">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>How to Split Bills When Everyone Earns Different Amounts</h1>
        <PostMeta slug="how-to-split-bills-when-incomes-are-different" />
        <p className="lead">
          An even split is fair when everyone is roughly in the same financial position.
          When they are not, it quietly forces the lowest earner to either overspend or
          opt out — and opting out is the part that damages the friendship.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Why an even split stops working</h2>
        <p>
          A NT$3,000 dinner split four ways is NT$750 each. For someone earning NT$120,000
          a month that is a rounding error. For someone earning NT$38,000 it is a
          meaningful share of what they have left after rent.
        </p>
        <p>
          The visible symptom is not complaint. It is the friend who is suddenly busy
          every time the group picks a restaurant, or who orders a starter and says they
          ate earlier. Uneven incomes do not usually produce arguments about money; they
          produce people quietly dropping out of the group.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Method 1: Split by income</h2>
        <p>
          Each person pays in proportion to what they earn. The arithmetic is one division
          and one multiplication.
        </p>
        <p>
          Three flatmates share NT$36,000 of rent and bills. They earn NT$45,000,
          NT$60,000 and NT$75,000 — NT$180,000 combined. Their shares are 25%, 33.3% and
          41.7%, so they pay NT$9,000, NT$12,000 and NT$15,000.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Earns</th>
                <th>Share of income</th>
                <th>Pays</th>
                <th>Even split would be</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NT$45,000</td>
                <td>25.0%</td>
                <td>NT$9,000</td>
                <td>NT$12,000</td>
              </tr>
              <tr>
                <td>NT$60,000</td>
                <td>33.3%</td>
                <td>NT$12,000</td>
                <td>NT$12,000</td>
              </tr>
              <tr>
                <td>NT$75,000</td>
                <td>41.7%</td>
                <td>NT$15,000</td>
                <td>NT$12,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Straightforward, and it has an obvious flaw: it ignores everything else about
          someone&rsquo;s situation. The highest earner here might be repaying a student
          loan the others do not have.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Method 2: Split by disposable income</h2>
        <p>
          Same maths, but each person first subtracts their genuinely fixed obligations —
          loan repayments, family support, medical costs. What remains is what they can
          actually choose how to spend, and the split runs on that.
        </p>
        <p>
          Two friends both earn NT$70,000. One sends NT$20,000 a month to their parents.
          On income they look identical; on disposable income it is NT$50,000 against
          NT$70,000, a 42/58 split rather than 50/50.
        </p>
        <div className="proseNote">
          <p>
            <strong>The catch:</strong> this requires people to disclose more than a
            salary figure, and it invites arguments about what counts as fixed. A car loan
            is fixed. Is a car loan on a car nobody needed? Use this method only with
            people you would tell that anyway.
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Method 3: Split the base, not the extras</h2>
        <p>
          The one that works best for friend groups, because it never requires anyone to
          say a number out loud.
        </p>
        <p>
          Shared costs everyone benefits from equally get split evenly: the taxi, the
          Airbnb, the rental car. Anything discretionary is charged to whoever chose it —
          the wine, the upgraded room, the tasting menu, the tour nobody else wanted.
        </p>
        <p>
          This sidesteps income entirely and lands in roughly the right place anyway,
          because people self-select into the spending they can afford. It also removes
          the specific resentment that does the most damage: a light drinker subsidising
          a heavy one.
        </p>
        <p>
          Practically, it means logging one dinner as two or three entries rather than
          one. The <Link href="/">calculator</Link> is built for exactly this — each
          payment has a &ldquo;pay for&rdquo; selector, so the NT$1,200 of wine is charged
          to the three people who drank it while the food stays shared.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Method 4: The quiet subsidy</h2>
        <p>
          Sometimes the honest answer is that one person covers more and nobody
          announces it. The higher earner books the accommodation and calls it their
          contribution; the group splits food evenly.
        </p>
        <p>
          This works between close friends and fails between acquaintances, where it
          creates a debt the recipient never agreed to. If you are going to do it, do it
          without keeping a mental ledger, because a subsidy you are counting is not a
          gift, it is an invoice you have not sent yet.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>How to raise it without making it strange</h2>
        <p>
          The conversation goes badly when it happens at the table with the bill already
          there. It goes fine when it happens in the group chat a week before, framed as
          logistics rather than anyone&rsquo;s finances:
        </p>
        <ul>
          <li>
            &ldquo;Shall we split the house evenly and everyone covers their own
            activities? Easier than tracking.&rdquo;
          </li>
          <li>
            &ldquo;Let&rsquo;s set a rough per-day budget so we&rsquo;re all picking
            places in the same range.&rdquo;
          </li>
          <li>
            &ldquo;I&rsquo;m watching money this trip, so count me out of the fancy dinner
            — I&rsquo;ll find something nearby and meet you after.&rdquo;
          </li>
        </ul>
        <p>
          Each of these is a statement about structure, not about anyone&rsquo;s salary.
          That is the whole trick. Setting the expectation early is worth more than any
          formula, and it is why the norm-setting matters more than the arithmetic.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>A note on couples and households</h2>
        <p>
          Everything above is about groups. Two people sharing a life have a different
          problem, because the money is not just being divided, it is being pooled over
          years. Proportional splitting is common there and works well, but the harder
          question is usually not the ratio — it is whether one person&rsquo;s unpaid
          work, like childcare, is being counted at all. That is outside what a
          calculator can help with.
        </p>
        <div className="proseNote">
          <p>
            Nothing here is personalised financial advice. If money is causing real strain
            in a household, a licensed financial counsellor in your country will be more
            use than a splitting formula.
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Related reading</h2>
        <ul>
          <li>
            <Link href="/blog/how-to-split-group-expense-fairly">
              How to split group expenses fairly
            </Link>{" "}
            — even, proportional and itemized splits compared.
          </li>
          <li>
            <Link href="/blog/roommate-shared-expenses-split-guide">
              Roommate shared expenses: 5 hidden costs
            </Link>{" "}
            — the household costs that cause the most friction.
          </li>
        </ul>
      </section>
    </article>
  );
}
