import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Report a bug, request a currency, correct an article, or ask about advertising on BillSmart. Email goes directly to the person who runs the site.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <article className="prosePage">
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>Contact</h1>
        <p className="lead">
          BillSmart is run by one person. Email reaches me directly, and I reply to
          everything that is not spam — usually within a few days.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Email</h2>
        <p>
          <a href="mailto:yang10824m@gmail.com">yang10824m@gmail.com</a>
        </p>
        <p className="proseMeta">
          Based in Taipei (UTC+8), so replies to messages sent overnight in the Americas
          or Europe will arrive the following day.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>What to include</h2>
        <p>A few details turn a report into something I can actually act on:</p>
        <ul>
          <li>
            <strong>A wrong conversion</strong> — the two currencies, the rate shown, and
            the rate you expected.
          </li>
          <li>
            <strong>A missing currency</strong> — just the three-letter code. Adding one
            is a small change.
          </li>
          <li>
            <strong>A bug in the calculator</strong> — what you entered and what you
            expected to see. A screenshot is ideal, and browser and phone model help if
            it is a layout problem.
          </li>
          <li>
            <strong>A correction to an article</strong> — the page and the sentence.
            Corrections get made and the update date on the article changes.
          </li>
        </ul>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Advertising and partnerships</h2>
        <p>
          Enquiries about advertising on the site are welcome at the same address.
          Sponsored articles and paid links in the <Link href="/blog">guides</Link> are
          not available — the reasoning is on the <Link href="/about">about page</Link>.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Please don&rsquo;t send</h2>
        <p>
          Anything sensitive. BillSmart never needs your bank details, card numbers,
          passwords, or a copy of a statement, and there is no situation in which I would
          ask for them. To report a conversion problem, the currency pair alone is
          enough — no amounts required.
        </p>
        <p className="proseMeta">
          How your message is handled is covered in the{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
      </section>
    </article>
  );
}
