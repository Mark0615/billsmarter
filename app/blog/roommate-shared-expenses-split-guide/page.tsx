import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "Roommate Shared Expenses: The Costs That Actually Cause Arguments",
  description: "Rent is never the problem. Bi-monthly utility bills that do not line up with monthly rent, the person who always buys the loo roll, guests, and moving out mid-cycle.",
  alternates: { canonical: '/blog/roommate-shared-expenses-split-guide' },
};

export default function Page() {
  return (
    <article className="prosePage blogArticleStandalone">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>Roommate Shared Expenses: The Costs That Actually Cause Arguments</h1>
        <PostMeta slug="roommate-shared-expenses-split-guide" />
        <p className="lead">
          Nobody falls out over rent. Rent is one number, everybody knows it, and it arrives on the same day every month.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <p>The arguments come from the other spending, which is small, constant, paid by whoever happened to be in the shop, and almost never written down. A flat of three people generates perhaps thirty of these a month. Any one of them is too small to mention. Together they are not.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The billing cycles do not line up, and that is the real problem</h2>
        <p>In Taiwan, rent is monthly. Electricity from Taipower arrives every two months. Water is usually every two months as well, on a different schedule. Gas is often monthly. Internet is monthly, on whatever date the contract started.</p>
        <p>So in a given month one flatmate pays rent, another pays an electricity bill covering two months of which one is already settled, and a third pays for water covering a period that overlaps neither. Trying to make these balance inside a single month is what produces the recurring argument about whether somebody already paid for something.</p>
        <p>Two approaches work, and mixing them does not.</p>
        <p>Settle on a fixed date regardless of what has arrived. Pick the last weekend of the month. Everything paid since the last settlement goes in, whatever period it covers. Over a year this evens out completely, and it stops anybody having to reason about billing periods at all.</p>
        <p>Or settle per bill as it arrives. This is more work but it is exact, and it suits flats where somebody is likely to move out mid-cycle.</p>
        <p>What does not work is settling sometimes, which is what most flats actually do. The bill that was paid but never settled is the one that surfaces four months later when somebody is moving out.</p>
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
        <p>Subscriptions sit on one person&rsquo;s account and cost a small amount every month, which makes collecting them monthly disproportionately annoying. Collect several months at once. Nobody minds paying six months of a streaming service in one transfer; everybody minds being asked for 150 NT twelve times a year.</p>
        <p>Repairs divide three ways. Normal wear and tear is the landlord&rsquo;s, and it is worth checking the lease rather than assuming. Damage caused by one person is theirs. Things the flat chooses to buy or hire, such as a monthly cleaner for the shared areas, are split by person rather than by room, because the shared areas are shared.</p>
        <p>Guests are the one nobody agrees in advance. Somebody&rsquo;s partner stays four nights a week and uses the hot water, the electricity and the kitchen. There is no correct answer, but there is a correct time to discuss it, which is before it has been happening for three months. The same logic applies to money generally, and <Link href="/blog/how-to-split-bills-when-incomes-are-different">how to split bills when incomes are different</Link> covers the harder version of it. A common landing point is that occasional guests are free and anybody effectively living there contributes.</p>
        <p>Pets belong entirely to their owner. Food, litter, vet bills, and any damage to shared furniture. Everybody enjoying the cat does not make the cat a shared expense.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Moving in and moving out</h2>
        <p>This is where unrecorded spending becomes an actual dispute rather than a mild annoyance.</p>
        <p>When somebody leaves mid-cycle, the flat has to work out which bills covered which period and what proportion of them belongs to the person leaving. If the flat has been settling on a fixed date, this is a short conversation. If it has been settling occasionally, it is an argument, because the outgoing flatmate is being asked to pay a share of a two-month electricity bill for a period they were only present for half of.</p>
        <p>The deposit is separate from all of this and should stay separate. It is the landlord&rsquo;s to return and the tenant&rsquo;s to receive. Folding it into the flat&rsquo;s internal accounting is how it disappears.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>How to settle a month in one sitting</h2>
        <p>Keep a running note as the month goes, in whatever the flat already uses. The group chat is enough. One line per payment: who paid, what it was, how much.</p>
        <p>Then enter the lot into the <Link href="/">calculator</Link> in one pass at settlement. Most entries cover everybody, so they are quick. The ones that do not are the ones that matter: the shared groceries that only two of you ate, the taxi two of you took, the replacement kettle that one person insisted on.</p>
        <p>The result is a short list of transfers rather than a month of individual debts. Three flatmates with nine payments between them usually settle in two transfers.</p>
        <p>Nothing is stored between visits, so do it in a single sitting and post the result in the chat. The chat message is the record, and it is the thing you will want if anybody queries it in three months.</p>
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
      <figure className="articleFigure">
      <Image
      src="/blog/roommate-shared-expenses-split-guide.webp"
      alt="BillSmart result panel showing three household bills paid by three different flatmates."
      width={1350}
      height={1128}
      sizes="(max-width: 900px) 92vw, 820px"
      />
      <figcaption>
      Settled in USD: Ben pays Ana $36.33, Chloe pays Ana $10.33. Three bills across three people collapse into two transfers.
      </figcaption>
      </figure>
      </section>
    </article>
  );
}
