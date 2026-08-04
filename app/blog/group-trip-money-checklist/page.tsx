import type { Metadata } from "next";
import Link from "next/link";
import PostMeta from "../PostMeta";

export const metadata: Metadata = {
  title: "The Group Trip Money Checklist: What to Agree Before You Book",
  description:
    "Eight decisions that take five minutes in the group chat and prevent every common money argument on a group trip — with a message you can copy and send.",
  alternates: { canonical: "/blog/group-trip-money-checklist" },
};

const checklist = [
  {
    title: "1. A nightly budget band, not a number",
    body: "Agree a range for accommodation and dinners — 'somewhere between NT$1,500 and NT$2,500 a night each'. A band lets people opt into the top or bottom without announcing why, which a single number does not.",
  },
  {
    title: "2. Who books what",
    body: "Split the big bookings across different people rather than making one person the group's bank. Everyone then carries a similar balance and everyone has the same interest in being paid back quickly.",
  },
  {
    title: "3. Reimbursement deadline for upfront costs",
    body: "'Within a week of booking' is the standard worth adopting. Large bookings should be settled before the trip starts, never folded into the final tally.",
  },
  {
    title: "4. The cancellation rule",
    body: "If someone drops out, do they lose their share, does the group absorb it, or do they find a replacement? Any answer works. Not having one does not. Remember that on a whole-house rental, one person leaving raises everyone else's share rather than lowering the bill.",
  },
  {
    title: "5. Settlement currency and rate convention",
    body: "Pick the currency the group will actually transfer in — usually where you all live, not where you are going — and agree to use mid-market rates on the day of each expense. Card fees stay with whoever's card charged them.",
  },
  {
    title: "6. What counts as shared",
    body: "The default that causes fewest arguments: transport, accommodation and anything the whole group does together is shared. Food, drinks, souvenirs and optional activities are charged to whoever took part.",
  },
  {
    title: "7. Who is tracking, and where",
    body: "One person, one place, visible to everyone. A shared note, a chat thread, or entries added to a calculator as you go. Two people tracking separately is worse than nobody tracking.",
  },
  {
    title: "8. The rounding threshold",
    body: "Below what amount do you not bother? Pick something like the price of a coffee. It kills the entire category of arguments about small change and costs nobody anything real.",
  },
];

export default function Page() {
  return (
    <article className="prosePage">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>The Group Trip Money Checklist</h1>
        <PostMeta slug="group-trip-money-checklist" />
        <p className="lead">
          Almost every money argument on a group trip traces back to a decision nobody
          made. These eight take five minutes before anyone books anything, and they are
          worth more than any amount of careful tracking afterwards.
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
          Adapt and paste into the group chat as soon as a trip becomes real — while
          agreeing is free, and before anyone has money at stake:
        </p>
        <div className="proseNote">
          <p>
            &ldquo;Money admin so we never have to talk about it again: aiming for roughly
            NT$2,000 a night each. I&rsquo;ll book flights, Ana books the house — whoever
            books, everyone sends their share within a week. Everything settles in TWD at
            whatever the rate was on the day. Shared = transport, house, anything we all
            do. Food and extras are on whoever had them. I&rsquo;ll keep the running list.
            Anything under NT$100 we don&rsquo;t bother chasing. If someone drops out
            after we&rsquo;ve booked, that person covers their own share.&rdquo;
          </p>
        </div>
        <p>
          It reads as slightly over-organised, and that is the point. Nobody objects to it
          in advance. Everybody objects to the equivalent conversation in an airport
          lounge at the end of the trip.
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
            cable car and two went for coffee — that is two entries, not one bill divided
            five ways.
          </li>
        </ul>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>At the end</h2>
        <p>
          Put the payments into the <Link href="/">calculator</Link>, choose your
          settlement currency, and share the resulting transfer list in the chat. Because
          it settles on net balances rather than transaction by transaction, a week of
          tangled spending between five people usually collapses into three or four
          transfers.
        </p>
        <p>
          Send the list, let people pay, and do not reopen it for small refunds that arrive
          afterwards — handle those separately. The value of a settlement is that it is
          final.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Related reading</h2>
        <ul>
          <li>
            <Link href="/blog/who-should-pay-the-deposit-group-travel">
              Who should pay the deposit?
            </Link>{" "}
            — the risks of one person fronting a whole trip.
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
    </article>
  );
}
