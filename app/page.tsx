import Link from "next/link";
import CalculatorClient from "./calculator/CalculatorClient";

const featureItems = [
  {
    icon: "🧮",
    title: "No more math",
    text: "Enter payments and we handle the split logic automatically, including who paid and who owes.",
  },
  {
    icon: "💱",
    title: "Multi-currency ready",
    text: "Each payment can use a different currency, then auto-convert into one base currency for clean settlement.",
  },
  {
    icon: "🔒",
    title: "Privacy first",
    text: "No account required. Your entries are used for calculation only, so you can split quickly and safely.",
  },
];

const guideItems = [
  {
    title: "How to split travel expenses fairly",
    desc: "A practical checklist for mixed-currency trips with friends.",
    href: "/blog/split-travel-expenses",
    read: "3 min read",
  },
  {
    title: "Group dinner bill splitting guide",
    desc: "Simple rules to avoid awkward moments when sharing food and tips.",
    href: "/blog/group-dinner-bill-splitting",
    read: "2 min read",
  },
  {
    title: "Travel budget checklist",
    desc: "Plan transport, meals and emergency costs before your trip starts.",
    href: "/blog/travel-budget-checklist",
    read: "3 min read",
  },
];

export default function HomePage() {
  return (
    <div className="homeStack">
      <CalculatorClient />

      <section className="containerCard featureSection" aria-labelledby="why-billsmart">
        <h2 id="why-billsmart">Why choose BillSmart?</h2>
        <p className="sectionLead">Simple and fair bill splitting made easy.</p>
        <div className="featureGrid">
          {featureItems.map((item) => (
            <article key={item.title} className="featureCard">
              <div className="featureIcon" aria-hidden>
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="containerCard" id="how-it-works">
        <h2>How it works</h2>
        <ol className="contentList">
          <li>Set your base currency (default USD), then add traveler names.</li>
          <li>Add payments with original currency, and BillSmart converts each item to base currency with live FX.</li>
          <li>Review balances and transfer suggestions to settle the trip quickly.</li>
        </ol>
      </section>

      <section className="containerCard" id="faq">
        <h2>FAQ</h2>
        <details>
          <summary>Can I split one payment for multiple people?</summary>
          <p>Yes. Use the “Pay for” multi-select dropdown and choose one, many, or select all.</p>
        </details>
        <details>
          <summary>Do I need to use the same currency for every expense?</summary>
          <p>No. Each payment can use a different currency and is converted to the base currency automatically.</p>
        </details>
        <details>
          <summary>Why can FX conversion fail sometimes?</summary>
          <p>If the provider is unavailable, BillSmart now shows an FX error instead of adding incorrect amounts.</p>
        </details>
      </section>

      <section className="containerCard guidesSection" aria-labelledby="learn-more">
        <h2 id="learn-more">Learn more about bill splitting</h2>
        <p className="sectionLead">Tips, tricks and practical guides.</p>
        <div className="guideScroller">
          {guideItems.map((item) => (
            <article key={item.title} className="guideCard">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="guideMeta">
                <span>{item.read}</span>
                <Link href={item.href} aria-label={`Read: ${item.title}`}>
                  →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
