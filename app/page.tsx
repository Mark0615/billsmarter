import Link from "next/link";
import CalculatorClient from "@/components/CalculatorClient";

/**
 * Inline so the homepage carries no third-party image requests and no
 * icon-library attribution obligation.
 */
const iconProps = {
  width: 44,
  height: 44,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const CalculatorIcon = () => (
  <svg {...iconProps}>
    <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
    <path d="M8 7h8M8 12h2m3 0h3M8 16.5h2m3 0h3" />
  </svg>
);

const ScalesIcon = () => (
  <svg {...iconProps}>
    <path d="M12 3.5v17M6 20.5h12M4 8.5l8-2.5 8 2.5" />
    <path d="M4 8.5 1.8 14a3.2 3.2 0 0 0 4.4 0L4 8.5Z" />
    <path d="M20 8.5 17.8 14a3.2 3.2 0 0 0 4.4 0L20 8.5Z" />
  </svg>
);

const LockIcon = () => (
  <svg {...iconProps}>
    <rect x="4" y="10" width="16" height="11" rx="2.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14.5v2.5" />
  </svg>
);

const howItWorksItems = [
  {
    title: "1. Set Base Currency",
    desc: "Select the currency you want your final balances to be calculated in.",
  },
  {
    title: "2. Log the Expenses",
    desc: "Enter who paid, how much, and who the expense was for. Mixed currencies are fully supported.",
  },
  {
    title: "3. Get the Split",
    desc: "Hit calculate and instantly see the optimized list of who needs to pay whom to settle up.",
  },
];

const featureItems = [
  {
    Icon: CalculatorIcon,
    title: "No More Math",
    text: "Enter payments and we handle the complex split logic automatically, including who paid and who owes.",
  },
  {
    Icon: ScalesIcon,
    title: "Fair Splitting",
    text: "Supports mixed currencies and converts them into one base unit so everyone settles with confidence.",
  },
  {
    Icon: LockIcon,
    title: "Data Control",
    text: "No login or registration required, making quick split sessions entirely private and easy.",
  },
];

const useCaseItems = [
  {
    title: "Living with Roommates",
    desc: "Rent is easy, but shared groceries and cleaning supplies are tricky. Learn how to track household expenses fairly.",
    link: "/blog/roommate-shared-expenses-split-guide",
  },
  {
    title: "Group Travel & Vacations",
    desc: "From shared Airbnb bookings to foreign currency restaurant bills, keep your trip finances organized.",
    link: "/blog/best-ways-to-split-expenses-when-traveling-with-friends",
  },
  {
    title: "Dining Out & Bar Tabs",
    desc: "Someone ordered steak, another just had water? Easily split complex restaurant bills elegantly.",
    link: "/blog/how-to-split-restaurant-and-bar-bills", // 確保這個 slug 跟你的資料夾名稱相符
  },
];

const faqItems = [
  {
    q: "Can I split one payment for multiple people?",
    a: "Yes. Use the ‘Pay for’ multi-select dropdown and choose exactly who was involved in the expense. You can select one, many, or all.",
  },
  {
    q: "Do I need to use the same currency for every expense?",
    a: "No. Each payment can use a different currency and is converted to the base currency automatically using live rates.",
  },
  {
    q: "How does the split algorithm work?",
    a: "Our algorithm calculates the net balance for each person and then optimizes the transactions, minimizing the total number of bank transfers needed.",
  },
  {
    q: "What happens if exchange rates are temporarily unavailable?",
    a: "BillSmart shows a clear FX error and prevents saving wrong converted amounts.",
  },
];

export default function HomePage() {
  return (
    <div className="homeStack">
      {/* 英雄區塊 (Hero Banner) */}
      <section className="heroBanner">
        <h1>
          <b>BillSmart</b> | The Smartest Split For Any Expense
        </h1>
        <p>
          Choose a base currency, add mixed-currency payments, and settle fairly
          with one final result.
        </p>
      </section>

      {/* 計算機本體 */}
      <section className="calculatorShell">
        <CalculatorClient />
      </section>

      <hr className="sectionDivider" />

      {/* 新增：How It Works (使用原本的 faqGrid 與 card 樣式) */}
      <section aria-labelledby="how-it-works" style={{ display: "grid", gap: "14px" }}>
        <h2 id="how-it-works" className="sectionTitle">
          How BillSmart Works
        </h2>
        <p className="sectionLead">Three simple steps to settle up.</p>
        <div className="faqGrid">
          {howItWorksItems.map((step) => (
            <article key={step.title} className="card">
              <h3 style={{ fontWeight: 800, color: "var(--text)", margin: "0 0 8px" }}>
                {step.title}
              </h3>
              <p style={{ color: "var(--muted)", margin: 0, lineHeight: 1.7 }}>
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <hr className="sectionDivider" />

      {/* WHY 區塊 (保持原本樣式) */}
      <section className="featureSectionPlain" aria-labelledby="why-billsmart">
        <h2 id="why-billsmart" className="sectionTitle">
          Why Choose BillSmart
        </h2>
        <p className="sectionLead">Simple and fair splitting, made easy.</p>

        <div className="featureGridPlain">
          {featureItems.map(({ Icon, title, text }) => (
            <article key={title} className="featureItem">
              <span className="featureIconImagePlain">
                <Icon />
              </span>
              <h3 className="featureTitle">{title}</h3>
              <p className="featureText">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <hr className="sectionDivider" />

      {/* 新增：應用場景 (Use Cases)，引導至長篇部落格 */}
      <section aria-labelledby="use-cases" style={{ display: "grid", gap: "14px" }}>
        <h2 id="use-cases" className="sectionTitle">
          Perfect for Every Situation
        </h2>
        <p className="sectionLead">Read our guides on how to split expenses fairly.</p>
        <div className="faqGrid">
          {useCaseItems.map((useCase) => (
            <Link 
              key={useCase.title} 
              href={useCase.link} 
              className="card flex flex-col transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 style={{ fontWeight: 800, color: "var(--text)", margin: "0 0 8px" }}>
                {useCase.title}
              </h3>
              <p style={{ color: "var(--muted)", margin: "0 0 16px", lineHeight: 1.7, flex: 1 }}>
                {useCase.desc}
              </p>
              <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.95rem" }}>
                Read the Guide &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <hr className="sectionDivider" />

      {/* FAQ 區塊 (擴充版) */}
      <section className="faqWrap" id="faq" aria-labelledby="faq-title">
        <h2 id="faq-title" className="sectionTitle">
          FAQ
        </h2>
        <div className="faqGrid">
          {faqItems.map((item) => (
            <article key={item.q} className="faqCard">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
        <p className="sectionLead" style={{ marginTop: "6px" }}>
          More detail on rounding, exchange rates and saving a trip is in the{" "}
          <Link href="/faq" style={{ color: "var(--accent)", fontWeight: 700 }}>
            full FAQ
          </Link>
          , and the calculation itself is explained step by step in{" "}
          <Link
            href="/how-it-works"
            style={{ color: "var(--accent)", fontWeight: 700 }}
          >
            how it works
          </Link>
          .
        </p>
      </section>
    </div>
  );
}