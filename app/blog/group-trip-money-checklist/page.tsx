import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "The Group Trip Money Checklist: What to Agree Before You Book",
  description:
    "Eight decisions that take five minutes in the group chat and prevent every common money argument on a group trip, with a message you can copy and send.",
  alternates: { canonical: "/blog/group-trip-money-checklist" },
};

const checklist = [
  {
    title: "1. A nightly budget band, not a number",
    body: "Agree a range for accommodation and dinners, 'somewhere between NT$1,500 and NT$2,500 a night each'. A band lets people opt into the top or bottom without announcing why, which a single number does not.",
  },
  {
    title: "2. Who books what",
    body: "Split the big bookings across different people rather than making one person the group's bank. Everyone then carries a similar balance and everyone has the same interest in being paid back quickly.",
  },
  {
    title: "3. Reimbursement deadline for upfront costs",
    body: "Agree a deadline that works for your group. If a large booking is reimbursed before departure, mark it as settled in your shared note and do not add the same cost to the final BillSmart calculation again.",
  },
  {
    title: "4. The cancellation rule",
    body: "If someone drops out, do they lose their share, does the group absorb it, or do they find a replacement? Any answer works. Not having one does not. Remember that on a whole-house rental, one person leaving raises everyone else's share rather than lowering the bill.",
  },
  {
    title: "5. Settlement currency and rate convention",
    body: "Pick the currency the group will actually transfer in, usually where you all live. Agree whether to use a rate you record on each expense date or the latest reference rate when you settle. BillSmart uses the latter; it does not retrieve historical rates. Decide separately how to handle card fees.",
  },
  {
    title: "6. What counts as shared",
    body: "Name the people who benefited from each payment. Accommodation may cover all four travellers, while a Lawson snack or coffee bought for one friend covers only that person. Decide whether any cost is a treat before recording it as a debt.",
  },
  {
    title: "7. Who is tracking, and where",
    body: "Choose one shared note or chat thread for receipts while travelling. BillSmart does not retain an editable trip history after a refresh, so enter the recorded payments together when you settle and download the PDF before leaving.",
  },
  {
    title: "8. The rounding threshold",
    body: "If you want to ignore small costs, choose a threshold together before the trip. Make clear whether a small purchase is a gift or will be included in the final split; a coffee can still matter when one friend repeatedly pays for the group.",
  },
];

export default function Page() {
  return (
    <article className="prosePage blogArticleStandalone">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>The Group Trip Money Checklist</h1>
        <PostMeta slug="group-trip-money-checklist" />
        <p className="lead">
          These eight decisions help a group agree what to record and how to settle it.
          The checklist is based on the problem behind BillSmart: on a March 2025 trip to
          Japan with three friends, I paid for our hotel in TWD before departure while
          friends later covered small purchases for me in JPY.
        </p>
      </header>

      <section style={{ display: "grid", gap: "18px" }}>
        {checklist.map((item) => (
          <div key={item.title} style={{ display: "grid", gap: "8px" }}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </div>
        ))}
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>The message to send</h2>
        <p>
          Adapt and paste into the group chat as soon as a trip becomes real, while
          agreeing is free, and before anyone has money at stake:
        </p>
        <div className="proseNote">
          <p>
            &ldquo;Money plan for the trip: aiming for roughly
            NT$2,000 a night each. I&rsquo;ll book flights, Ana books the house, whoever
            books, everyone sends their share within a week. Everything settles in TWD at
            the latest reference rate when we settle. Shared = transport, house, anything we all
            do. Food and extras are on whoever had them. I&rsquo;ll keep the running list.
            Anything under NT$100 can be a treat if we agree. If someone drops out
            after we&rsquo;ve booked, that person covers their own share.&rdquo;
          </p>
        </div>
        <p>
          This is a template, not a transcript of my group chat. Replace the numbers and
          choices with what your own group actually agrees to.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>During the trip: three habits</h2>
        <ul>
          <li>
            <strong>Log it the same day.</strong> Not the same week. The taxi you forget is
            the one that makes the final number feel wrong to somebody.
          </li>
          <li>
            <strong>Log the receipt total, not your mental version of it.</strong> Tax and
            service are part of what was paid, and they get shared in the same proportion
            as the meal.
          </li>
          <li>
            <strong>Split the entry when the group splits.</strong> Three people took the
            cable car and two went for coffee. That is two entries, not one bill divided
            five ways.
          </li>
        </ul>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>At the end</h2>
        <p>
          Put the unpaid shared payments into the <Link href="/">calculator</Link>, choose your
          settlement currency, download the PDF, and share the resulting transfer list in the chat. Because
          it settles on net balances rather than transaction by transaction, a week of
          tangled spending between five people usually collapses into three or four
          transfers.
        </p>
        <p>
          If a booking was already reimbursed, leave it out rather than charging the group
          twice. If a refund arrives later, agree how to return it to the original payers;
          the calculator does not support negative refund entries.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Related reading</h2>
        <ul>
          <li>
            <Link href="/blog/who-should-pay-the-deposit-group-travel">
              Who should pay the deposit?
            </Link>{" "}: the risks of one person fronting a whole trip.
          </li>
          <li>
            <Link href="/blog/which-exchange-rate-to-use-when-splitting-a-trip">
              Which exchange rate should you use?
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-split-bills-when-incomes-are-different">
              Splitting when everyone earns different amounts
            </Link>
          </li>
        </ul>
      </section>
            <section className="articleWorked">
          <h2>Worked example</h2>
          <p>
            Point 6 in practice: shared costs shared, optional activities charged to whoever took part. Five people, one ryokan for everybody, a cable car three of them rode, and a coffee the other two had.
          </p>
          <p>For an illustrative fixed conversion, Ana paid USD 192.30 for the five-person stay, Ben paid USD 46.15 for a cable car covering Ana, Ben and Chloe, and Chloe paid USD 11.54 for coffee covering Dan and Eve. The five people therefore owe USD 53.85, 53.84, 53.84, 44.23 and 44.23 respectively after cents are allocated in roster order.</p>
          <p>The final transfers are Ben → Ana USD 7.69, Chloe → Ana USD 42.30, and Dan and Eve → Ana USD 44.23 each. Together those four transfers equal Ana&rsquo;s USD 138.45 credit. Live exchange rates will produce different converted amounts; the fixed numbers here only demonstrate the split.</p>
        </section>
      </article>
  );
}
