import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to the questions we get most about BillSmart: privacy, exchange rates, uneven splits, rounding, saving a trip, and reporting problems.",
  alternates: { canonical: "/faq" },
};

const entries = [
  ["Is BillSmart free? Do I need an account?", "Yes. It is free and no account is required."],
  ["Can I keep a copy of this split?", "Yes. After checking the result, click Download PDF in the settlement panel. The file lists each payment, its payer and participants, and the final transfers. The calculator does not save entries for your next visit, so download before refreshing or closing the page."],
  ["Where is my data stored?", "Your current entries remain in this page while it is open. The calculator does not send names, amounts or notes to our server. Exchange-rate requests contain currency pairs only. A PDF you download is saved wherever your browser puts downloads. The privacy policy separately explains analytics and advertising."],
  ["How do the currency selectors work?", "Changing the base currency converts the existing payments and sets the default currency for the next payment. You can still choose another currency for any individual payment."],
  ["Which exchange rate is used?", "BillSmart requests reference rates when a currency pair is first needed, then reuses that pair within the open split. Payments keep their converted amounts during the current calculation. Changing the base currency recalculates conversions. This is not a historical-rate or bank-statement lookup."],
  ["Where can I check the rate for a payment?", "For a payment in a different currency from the settlement currency, a small line below it shows an approximate rate rounded to two decimal places. The downloaded PDF includes the same line. BillSmart calculates the converted amount using the full rate, so it may differ slightly from multiplying by the displayed approximation. These are reference rates, not real-time card rates."],
  ["What if an exchange-rate provider is unavailable?", "We try another provider. If no rate is available, the payment or currency change is not applied, and your existing payments stay intact. Try again later, or enter an agreed bank-statement amount directly in the settlement currency."],
  ["Can a payment cover only some people?", "Yes. Select the people who benefited under Pay for. Each payment is split equally among those selected; the payer does not have to be one of them."],
  ["Can I use percentages or different shares?", "There is no percentage field. Divide the receipt into separate entries covering the appropriate people. For a $300 room with a $150 private-room supplement, enter $150 for that person and $150 for all three: the shares are $200, $50 and $50."],
  ["How is rounding handled?", "Each converted payment is rounded to the settlement unit: whole JPY, KRW and TWD, or cents for the other supported currencies. Whole units are shared equally; any leftover units go to the first selected people in roster order. Balances and transfers use the same allocation, so they reconcile."],
  ["How do I handle tips, refunds and reimbursements?", "Include tax and tip in the receipt total. Negative refund entries and payment-status tracking are not supported. Handle a refund separately and distribute it using the original shares. Do not include a booking again if everyone has already reimbursed it."],
  ["Two people paid for the same bill. What do I enter?", "Enter two payments with the amount each actually paid and the same beneficiaries. The calculator nets their contributions before suggesting transfers."],
];
const faqs = entries.map(([q, plain]) => ({q, plain, a: <p>{plain}</p>}));

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
          Everything people actually ask about BillSmart, how the money maths works,
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
