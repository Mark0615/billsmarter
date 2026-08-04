import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply to using BillSmart: what the calculator is, what it is not, and the limits of what you can rely on it for.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "4 August 2026";

export default function TermsPage() {
  return (
    <article className="prosePage">
      <header style={{ display: "grid", gap: "10px" }}>
        <h1>Terms of Service</h1>
        <p className="proseMeta">Last updated: {LAST_UPDATED}</p>
        <p className="lead">
          These terms apply to billsmarter.app. Using the site means you accept them.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>What the service is</h2>
        <p>
          BillSmart is a free calculator that divides shared expenses and suggests a set
          of transfers to settle them, plus a set of articles on the same subject. It is
          provided for general informational purposes.
        </p>
        <p>
          BillSmart does not hold, move, or process money. It produces a suggestion; you
          decide whether to act on it and you make the transfers yourself.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Check the numbers before you pay</h2>
        <p>
          You are responsible for verifying results before transferring money. Exchange
          rates shown are published reference rates from third-party sources and will
          differ from the rate your bank or card issuer applies. Rates may be delayed,
          incomplete, or unavailable.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Not financial advice</h2>
        <p>
          Nothing on this site is financial, tax, accounting, or legal advice, and nothing
          on it is tailored to your circumstances. For decisions with real consequences,
          consult someone qualified in your jurisdiction.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Acceptable use</h2>
        <p>
          Use the site for its intended purpose. Do not attempt to disrupt or overload it,
          scrape it at a volume that degrades it for others, or republish its articles as
          your own. Normal quoting with attribution and a link is fine.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Availability</h2>
        <p>
          The site is offered as-is and as-available. It may be changed, interrupted, or
          discontinued at any time without notice. Because nothing you enter is stored,
          there is nothing to recover if it goes offline.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>No warranties</h2>
        <p>
          To the fullest extent permitted by law, BillSmart is provided without warranties
          of any kind, express or implied, including accuracy, availability, and fitness
          for a particular purpose.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, the operator of BillSmart is not liable
          for any loss or damage arising from use of, or inability to use, this site —
          including any amount transferred on the basis of a calculation shown here.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Advertising</h2>
        <p>
          The site carries third-party advertising. Advertisers&rsquo; products are not
          endorsed or vetted by BillSmart, and any dealings you have with them are between
          you and them. Data handling for advertising is described in the{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Content ownership</h2>
        <p>
          The articles, wording, and design of this site belong to its operator. The
          settlement figures the calculator produces from your own input are yours to use
          however you like.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Changes to these terms</h2>
        <p>
          These terms may be updated. Material changes will be reflected in the
          &ldquo;last updated&rdquo; date above, and continued use after that constitutes
          acceptance.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Contact</h2>
        <p>
          Questions about these terms go to{" "}
          <a href="mailto:yang10824m@gmail.com">yang10824m@gmail.com</a>, or via the{" "}
          <Link href="/contact">contact page</Link>.
        </p>
      </section>
    </article>
  );
}
