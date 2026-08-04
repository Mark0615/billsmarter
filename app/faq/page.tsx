import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to the questions we get most about BillSmart: privacy, exchange rates, uneven splits, rounding, saving a trip, and reporting problems.",
  alternates: { canonical: "/faq" },
};

type Faq = { q: string; a: React.ReactNode; plain: string };

const faqs: Faq[] = [
  {
    q: "Is BillSmart free, and what is the catch?",
    plain:
      "Yes, it is free with no account, no usage limit and no paid tier. The site is supported by advertising, and the calculator itself never asks for money.",
    a: (
      <>
        <p>
          Yes. There is no account, no usage limit and no paid tier. The running costs
          are small because the calculator does its work in your browser rather than on a
          server, and the site is supported by advertising. Nothing about the calculation
          changes whether or not you block ads.
        </p>
      </>
    ),
  },
  {
    q: "Do I need to create an account?",
    plain:
      "No. There is no sign-up, no email required and no login. Open the page and start entering payments.",
    a: (
      <p>
        No. There is no sign-up, no email and no login. Open the page and start typing.
        The trade-off is that nothing is saved between visits — see the question about
        saving a trip below.
      </p>
    ),
  },
  {
    q: "Where is my data stored? Can you see what I enter?",
    plain:
      "Names and amounts stay in your browser tab and are never sent to a server. The only outbound request is an exchange rate lookup containing a currency pair, with no names or amounts.",
    a: (
      <>
        <p>
          Names and amounts stay inside the browser tab. They are not uploaded, not
          written to a database, and not visible to us.
        </p>
        <p>
          The only request that leaves your browser is the exchange-rate lookup, and it
          contains just a currency pair such as <code>JPY</code> to <code>TWD</code>. No
          names, no amounts, nothing that identifies the trip. The{" "}
          <Link href="/privacy">privacy policy</Link> covers analytics and advertising
          cookies separately.
        </p>
      </>
    ),
  },
  {
    q: "Can I split one bill between only some of the group?",
    plain:
      "Yes. Each payment has a 'Pay for' multi-select, so you choose exactly who that expense applies to. This is how uneven splits work.",
    a: (
      <p>
        Yes — this is the main reason the tool exists. Each payment has a &ldquo;Pay
        for&rdquo; multi-select, so a taxi shared by three of five people is charged only
        to those three. Everyone else&rsquo;s balance is untouched.
      </p>
    ),
  },
  {
    q: "Can I mix currencies within one trip?",
    plain:
      "Yes. Enter each payment in the currency it was charged in and BillSmart converts everything into the base currency you chose.",
    a: (
      <p>
        Yes. Enter each payment in the currency it was actually charged in — that is the
        number on the receipt, and the one you can check later. BillSmart converts
        everything into your base currency and shows the rate it used for each entry.
      </p>
    ),
  },
  {
    q: "Which exchange rate do you use, and why doesn't it match my bank?",
    plain:
      "BillSmart uses European Central Bank reference rates via Frankfurter, with open.er-api.com as a fallback. Banks and card issuers add a spread and often a foreign transaction fee, so a statement typically lands 0.5-3% away.",
    a: (
      <>
        <p>
          BillSmart uses European Central Bank reference rates, with a second public
          source as a fallback. Those are mid-market rates: the midpoint between what
          banks buy and sell at.
        </p>
        <p>
          Your card issuer does not give you the mid-market rate. It applies its own
          spread, and many cards add a foreign-transaction fee of 1&ndash;3% on top. A
          statement landing a couple of percent away from the number here is normal, not
          a bug. If you need the exact figure — for a company expense claim, say — use
          the amount printed on your statement.
        </p>
        <p>
          The mechanics are explained in more detail on{" "}
          <Link href="/how-it-works">how it works</Link>.
        </p>
      </>
    ),
  },
  {
    q: "Can I give one person a larger share of a payment?",
    plain:
      "Not directly. Payments are divided evenly among the people selected. To weight a share, split the payment into two entries with different groups.",
    a: (
      <>
        <p>
          Not with a percentage field, no. A payment is divided evenly among the people
          you select for it.
        </p>
        <p>
          The workaround is to split the bill into entries. If a $300 hotel room is
          shared by three people but one took the private room, enter $150 for that
          person alone and $150 shared by all three. Two entries express any weighting
          you like, and they are easier for the group to audit than a percentage.
        </p>
      </>
    ),
  },
  {
    q: "Why does the result show fewer transfers than I expected?",
    plain:
      "BillSmart settles on net balances rather than transaction by transaction, then pairs the largest debtor with the largest creditor to minimise the number of transfers.",
    a: (
      <p>
        Because it settles on net balances, not transaction by transaction. If you paid
        for my lunch and I paid for your taxi, there is no reason for two transfers —
        only the difference needs to move. BillSmart then pairs the largest debtor with
        the largest creditor repeatedly, which is what collapses a tangle of debts into a
        short list.
      </p>
    ),
  },
  {
    q: "Why do balances sometimes differ by a cent?",
    plain:
      "Splitting an amount that does not divide evenly creates rounding. Full precision is kept in the calculation and only the display is rounded to two decimals, so the transfer list still balances.",
    a: (
      <p>
        Because $10 does not divide evenly by three. Full precision is kept in the
        calculation and only the display is rounded to two decimals, so the transfers
        still balance to zero even when three shares of $3.33 do not visibly add up to
        $10.
      </p>
    ),
  },
  {
    q: "Can I save a trip and come back to it tomorrow?",
    plain:
      "No. Data lives in the open tab and is cleared on reload. Keep the tab open during a trip, or screenshot the settlement at the end.",
    a: (
      <p>
        No, and this is the real cost of having no account. Everything is cleared when
        you reload or close the tab. For a multi-day trip, either keep the tab open and
        add payments as they happen, or enter everything in one sitting at the end and
        screenshot the settlement.
      </p>
    ),
  },
  {
    q: "Does it handle tax and tips?",
    plain:
      "Enter the final total from the receipt including tax and tip. There is no separate field, so the extras are shared in the same proportion as the bill.",
    a: (
      <p>
        Enter the final total from the receipt, including tax and tip. There is no
        separate field for them, which means the extras are shared in the same proportion
        as the bill itself. That is the fair default in most situations, and it avoids
        the classic mistake of one person quietly absorbing a 20% tip on a large table.
      </p>
    ),
  },
  {
    q: "Two of us paid for the same bill. How do I enter that?",
    plain:
      "Enter it as two payments, one per payer, each with the amount that person actually paid and the same list of beneficiaries.",
    a: (
      <p>
        As two payments. If a $200 bill was covered $120 by one person and $80 by
        another, enter one payment of $120 and one of $80, both with the same list of
        people it was for. The net balances come out identically to a single combined
        entry.
      </p>
    ),
  },
  {
    q: "Does it work on a phone?",
    plain:
      "Yes. The calculator is responsive and designed to be used at the table on a phone.",
    a: (
      <p>
        Yes. The layout is responsive and the calculator is meant to be used standing at
        a restaurant table, not only at a desk.
      </p>
    ),
  },
  {
    q: "My currency is missing, or something looks wrong. How do I report it?",
    plain:
      "Email the site owner through the contact page with the currencies involved and what you expected to see.",
    a: (
      <p>
        Email me through the <Link href="/contact">contact page</Link>. For a wrong
        conversion, include the two currencies and the rate you expected — that is enough
        to trace it. For a missing currency, just name it; adding one is a small change.
      </p>
    ),
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.plain },
    })),
  };

  return (
    <article className="prosePage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header style={{ display: "grid", gap: "12px" }}>
        <h1>Frequently Asked Questions</h1>
        <p className="lead">
          Everything people actually ask about BillSmart — how the money maths works,
          what happens to your data, and where the tool falls short.
        </p>
      </header>

      {faqs.map((f) => (
        <section key={f.q} style={{ display: "grid", gap: "10px" }}>
          <h2>{f.q}</h2>
          {f.a}
        </section>
      ))}

      <section style={{ display: "grid", gap: "10px" }}>
        <h2>Still stuck?</h2>
        <p>
          The <Link href="/how-it-works">how it works</Link> page walks through the
          calculation step by step with a worked example. If your question is not
          answered there either, <Link href="/contact">get in touch</Link>.
        </p>
      </section>
    </article>
  );
}
