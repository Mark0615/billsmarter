import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "Roommate Shared Expenses: The Costs That Actually Cause Arguments",
  description: "How to record shared supplies and bills that cover different periods, including an example of a flatmate moving out mid-cycle.",
  alternates: { canonical: '/blog/roommate-shared-expenses-split-guide' },
};

export default function Page() {
  return (
    <article className="prosePage blogArticleStandalone">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>Roommate Shared Expenses: The Costs That Actually Cause Arguments</h1>
        <PostMeta slug="roommate-shared-expenses-split-guide" />
        <p className="lead">
          Rent has a due date everyone can see. Supplies, utilities and guests are harder
          to track because different people pay at different times and a bill may cover
          more than one settlement period.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <p>The arguments come from the other spending, which is small, constant, paid by whoever happened to be in the shop, and almost never written down. A flat of three people generates perhaps thirty of these a month. Any one of them is too small to mention. Together they are not.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The billing cycles do not line up, and that is the real problem</h2>
        <p>A household might pay rent monthly while an electricity or water bill covers a different period. Check the dates on each actual bill rather than assuming every Taiwan supplier or property uses the same schedule.</p>
        <p>Two approaches can work. You can settle every payment received since the last agreed settlement date, or wait and settle each bill when it arrives. Keep a record of which bill was included so it is not charged again. If someone moves in or out, check the service period and agree how to divide it rather than assuming that paying on one date makes the whole bill that month&rsquo;s expense.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Consumables and the person who always buys them</h2>
        <p>Toilet paper, dish soap, bin bags, cleaning spray, light bulbs. Individually trivial. The problem is that the person who buys them is not random.</p>
        <p>The default rule in most flats is that whoever notices it has run out buys more. This sounds fair and is not, because noticing is a trait. One person in every flat notices, and that person buys the loo roll every time. They are also usually the person least likely to bring it up.</p>
        <p>Two fixes. Either everyone puts a fixed amount into a shared pot at the start of the month and household supplies come out of it, or every purchase gets logged like anything else and settled at the end. The pot is less admin and works well when the flat&rsquo;s spending is stable. Logging is better when it is not, and it has the advantage of making the imbalance visible before it becomes resentment.</p>
        <p>Either way, the thing to avoid is a flat where these purchases are never recorded because each one is too small to bother with.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Groceries need a line between shared and personal</h2>
        <p>Cooking together is the most common source of an unbalanced grocery bill, because two people who split a shopping trip evenly may not eat at home the same number of times.</p>
        <p>The workable split is by category rather than by receipt. Staples that everybody uses without thinking about it, which is oil, salt, sugar, rice, condiments, go in as a shared cost. Anything you bought because you specifically wanted it is yours. The expensive olive oil, the protein powder, the particular brand of yoghurt.</p>
        <p>This does mean a supermarket trip sometimes produces two entries rather than one: a shared portion and a personal one. That is a five second decision at the till, and it is far easier than reconstructing a receipt later.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Subscriptions, repairs, guests and pets</h2>
        <p>Subscriptions sit on one person&rsquo;s account and may be small enough that monthly transfers feel cumbersome. If everyone agrees, collect several months at once and keep a note of which months have been covered. That prevents the same subscription from appearing again in a later settlement.</p>
        <p>Do not enter a repair as a roommate debt until you know who is responsible. In Taiwan, the <a href="https://pip.moi.gov.tw/Publicize/Info/G1020">Ministry of the Interior&rsquo;s residential lease terms</a> address repair responsibility and exceptions for agreed tenant responsibilities or damage attributable to a tenant. Check your signed lease and discuss the specific damage with the landlord. If the flatmates independently agree to buy a shared kettle or hire a cleaner, record the actual payer and the people who agreed to share that cost.</p>
        <p>Guests can change how the household uses hot water, electricity and shared supplies. If someone is staying regularly, agree whether and how they contribute before the arrangement becomes routine. Occasional visits and an additional resident need not follow the same rule. <Link href="/blog/how-to-split-bills-when-incomes-are-different">Splitting bills when incomes are different</Link> covers another reason flatmates may choose unequal shares.</p>
        <p>Pet food and veterinary bills generally belong to the pet owner unless the household explicitly agrees otherwise. Do not turn enjoying someone&rsquo;s cat into an assumed shared expense.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Moving in and moving out</h2>
        <p>This is where unrecorded spending becomes an actual dispute rather than a mild annoyance.</p>
        <p>Here is an illustrative calculation, not a claim about actual monthly electricity use. A TWD 3,000 bill covers August and September. Three flatmates lived there in August; one left before September, leaving two. If everyone agrees to allocate half the bill to each month, the person who left owes TWD 500 for August. The other two owe TWD 1,250 each: TWD 500 for August and TWD 750 for September. Those shares add back to TWD 3,000. BillSmart cannot infer dates or occupancy or divide one payment into unequal shares. Settle these agreed shares from the original bill separately; entering the full TWD 3,000 as one shared payment would divide it equally.</p>
        <p>Keep the rental deposit separate from ordinary shared expenses. Use the lease and deposit receipt to record who paid it and how any returned amount should be distributed.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>How to settle a month in one sitting</h2>
        <p>Keep a running note as the month goes, in whatever the flat already uses. The group chat is enough. One line per payment: who paid, what it was, how much.</p>
        <p>Then enter the lot into the <Link href="/">calculator</Link> in one pass at settlement. Most entries cover everybody, so they are quick. The ones that do not are the ones that matter: the shared groceries that only two of you ate, the taxi two of you took, the replacement kettle that one person insisted on.</p>
        <p>The result is a short list of transfers rather than a month of individual debts. Three flatmates with nine payments between them usually settle in two transfers.</p>
        <p>When the group is ready to settle, check the amounts and click Download PDF in the settlement panel. It records the payments and final transfers. The calculator does not keep an editable history after you close or refresh the page.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Related reading</h2>
        <ul>
          <li>
            <Link href="/blog/how-to-split-bills-when-incomes-are-different">
              How to split bills when incomes are different
            </Link>{" "}: proportional splitting for people who share a household.
          </li>
          <li>
            <Link href="/blog/how-to-split-group-expense-fairly">
              How to split group expenses fairly
            </Link>{" "}: the general rule the household case is built on.
          </li>
        </ul>
      </section>

      <section className="articleWorked">
      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">Worked example</h2>
      <p>
      A month of ordinary flat costs, entered in one sitting: Ana paid the electricity, Ben the household supplies, Chloe the internet. All three split evenly.
      </p>
      <p>Ana paid USD 145, Ben USD 62, and Chloe USD 88: USD 295 in total. With cents allocated in roster order, Ana owes USD 98.34 and Ben and Chloe owe USD 98.33 each. Ben pays Ana USD 36.33 and Chloe pays Ana USD 10.33, matching Ana&rsquo;s USD 46.66 credit exactly.</p>
      </section>
    </article>
  );
}
