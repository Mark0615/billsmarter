import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who builds BillSmart, why a bill-splitting calculator with no account exists, and how editorial and advertising decisions are made on this site.",
  alternates: { canonical: "/about" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  mainEntity: {
    "@type": "Person",
    name: "Mark",
    jobTitle: "Digital marketing consultant",
    description:
      "Taipei-based digital marketing consultant who builds small web tools, including BillSmart.",
    email: "mailto:yang10824m@gmail.com",
    worksFor: {
      "@type": "Organization",
      name: "BillSmart",
      url: "https://billsmarter.app",
    },
  },
};

export default function AboutPage() {
  return (
    <article className="prosePage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header style={{ display: "grid", gap: "12px" }}>
        <h1>About BillSmart</h1>
        <p className="lead">
          A free calculator for splitting group expenses across currencies, plus a small
          library of guides on handling shared money without friction. Built and run by
          one person.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Who builds this</h2>
        <p>
          My name is Mark. I&rsquo;m a digital marketing consultant based in Taipei, and I
          build small web tools in my own time, usually because I hit a problem often
          enough to get annoyed by it.
        </p>
        <p>
          BillSmart is built for groups paying in different currencies: one person
          books the hotel, another covers transport, and everyone needs a clear
          record of who owes whom. The goal is a page people can use without
          installing an app or creating an account.
        </p>
        <p>
          I maintain the site myself and answer the email personally. If something is
          wrong or missing, telling me is genuinely the fastest way to get it fixed, {" "}
          <Link href="/contact">contact page</Link>.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>What BillSmart does</h2>
        <ul>
          <li>
            Converts payments made in different currencies into one base currency using
            published reference rates, and keeps the original and converted amounts together.
          </li>
          <li>
            Handles uneven splits, where a given expense only applies to some of the
            group.
          </li>
          <li>
            Reduces the resulting tangle of debts to a short list of transfers that
            settles everyone.
          </li>
        </ul>
        <p>
          The <Link href="/how-it-works">how it works</Link> page explains the
          calculation in full, including a worked example and where rounding shows up.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>What it deliberately does not do</h2>
        <p>
          Every feature that gets left out is a feature that does not need explaining, so
          the list of omissions is on purpose:
        </p>
        <ul>
          <li>
            <strong>No accounts.</strong> Nothing to sign up for. The calculator keeps entries only while the page is open. Download a PDF before refreshing if you need a record.
          </li>
          <li>
            <strong>No payments.</strong> BillSmart tells you who should pay whom. Moving
            the money is between you and your bank.
          </li>
          <li>
            <strong>No receipt scanning, categories, or budgets.</strong> Those belong in
            an app you commit to, not a page you open once on a trip.
          </li>
        </ul>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>How the guides are written</h2>
        <p>
          The <Link href="/blog">articles</Link> cover the parts of shared spending that a
          calculator cannot solve: what counts as fair when incomes differ, how to raise
          money with friends without souring the evening, when cash beats a card abroad.
        </p>
        <p>
          They are written and edited by me, drawn from ordinary experience rather than
          professional financial training, and updated when something in them stops being
          true. The exchange-rate and card-fee guides link to provider and payment-network information. Worked examples are illustrative; the actual fee depends on your bank, card, booking and agreement with your group.
        </p>
        <div className="proseNote">
          <p>
            <strong>Not financial advice.</strong> Nothing here is personalised advice
            about your money. For decisions with real consequences (taxes, debt, an
            expense claim your employer will audit), talk to someone licensed in your
            country.
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>How the site pays for itself</h2>
        <p>
          BillSmart is free and carries advertising. Ads are kept to standard display
          placements: no pop-ups, no browser push notifications, no interstitials in
          front of the calculator. If an ad on this site ever interrupts you before you
          can use the tool, that is a mistake and I want to hear about it.
        </p>
        <p>
          Advertising has no influence on what the guides say. No article on this site is
          sponsored, and there are no affiliate links in them.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Elsewhere</h2>
        <p>
          Corrections, feature requests and bug reports all go to the same inbox on the{" "}
          <Link href="/contact">contact page</Link>. Details on data handling are in the{" "}
          <Link href="/privacy">privacy policy</Link>, and the usual disclaimers live in
          the <Link href="/terms">terms of service</Link>.
        </p>
      </section>
    </article>
  );
}
