import Image from "next/image";
import Link from "next/link";
import {
  Calculator,
  LockKey,
  Scales,
} from "@phosphor-icons/react/dist/ssr";
import CalculatorClient from "@/components/CalculatorClient";

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
    desc: "The settlement updates as you type. Read off the short list of who pays whom and share it.",
  },
];

const featureItems = [
  {
    Icon: Calculator,
    title: "No More Math",
    text: "Enter who paid and who each payment was for. The net balances and the transfer list follow automatically.",
  },
  {
    Icon: Scales,
    title: "Fair Splitting",
    text: "Supports mixed currencies and converts them into one base unit so everyone settles with confidence.",
  },
  {
    Icon: LockKey,
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
    link: "/blog/how-to-split-restaurant-and-bar-bills",
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
    a: "Each person's net balance is paid minus owed. BillSmart then repeatedly matches the largest debtor with the largest creditor, which keeps the transfer count low: at most one fewer transfer than there are people.",
  },
  {
    q: "What happens if exchange rates are temporarily unavailable?",
    a: "BillSmart shows the error rather than guessing. Rates come from European Central Bank data where the ECB publishes the currency, and a second public source for the rest, with a fixed backup table only if both are unreachable. Anything settled on the backup table is labelled as such.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://billsmarter.app/#app",
      name: "BillSmart",
      url: "https://billsmarter.app",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any browser",
      browserRequirements: "Requires JavaScript",
      description:
        "A free calculator that splits group expenses across 13 currencies, convertseach payment into one settlement currency at live mid-market rates, and returns a short list of who pays whom. No account required.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Split one payment between any subset of the group",
        "Mixed-currency entry converted to one settlement currency",
        "Live mid-market exchange rates with a documented fallback",
        "Net balances reduced to a short transfer list",
        "No account, no installation, nothing stored between visits",
      ],
      isAccessibleForFree: true,
      publisher: { "@id": "https://billsmarter.app/#org" },
    },
    {
      "@type": "Organization",
      "@id": "https://billsmarter.app/#org",
      name: "BillSmart",
      url: "https://billsmarter.app",
      logo: "https://billsmarter.app/icon.png",
    },
  ],
};

export default function HomePage() {
  return (
    <div className="homeStack">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="heroWorkspace" aria-label="BillSmart calculator">
        <article className="heroPanel glassPanel">
          <div>
            <p className="heroEyebrow">Free · Mixed-currency group expense splitting</p>
            <h1>
              <span className="heroBrandLine">BillSmart</span>
              The
              <br />
              Smartest Split
              <br />
              For Any
              <br />
              Expense
            </h1>
            <p className="heroCopy">
              Choose a base currency, add mixed-currency payments, and settle fairly
              with one final result.
            </p>
            <p className="heroFlow" aria-label="Calculate, split, settle">
              Calculate <span aria-hidden="true">→</span> Split{" "}
              <span aria-hidden="true">→</span> Settle
              <small>Fair. Clear. Automatic.</small>
            </p>
          </div>

          <Image
            className="heroDoodle"
            src="/assets/split-doodle-transparent.png"
            alt="Hand-drawn receipt showing a Tokyo lunch split fairly between three people"
            width={700}
            height={525}
            sizes="(max-width: 760px) 80vw, 300px"
            priority
          />

          <p className="heroFootnote">© 2026 BillSmart</p>
        </article>

        <CalculatorClient />
      </section>

      <hr className="sectionDivider homeToContent" />

      <section className="contentSection" aria-labelledby="how-it-works">
        <p className="contentEyebrow">01 / Process</p>
        <h2 id="how-it-works" className="sectionTitle">
          How BillSmart Works
        </h2>
        <p className="sectionLead">Three simple steps to settle up.</p>
        <div className="processGrid">
          {howItWorksItems.map((step) => (
            <article key={step.title} className="processItem">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <hr className="sectionDivider" />

      <section className="contentSection featureSectionPlain" aria-labelledby="why-billsmart">
        <p className="contentEyebrow">02 / Advantages</p>
        <h2 id="why-billsmart" className="sectionTitle">
          Why Choose BillSmart
        </h2>
        <p className="sectionLead">Simple and fair splitting, made easy.</p>

        <div className="featureGridPlain">
          {featureItems.map(({ Icon, title, text }) => (
            <article key={title} className="featureItem">
              <span className="featureIconImagePlain">
                <Icon size={34} weight="light" aria-hidden="true" />
              </span>
              <h3 className="featureTitle">{title}</h3>
              <p className="featureText">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <hr className="sectionDivider" />

      <section className="contentSection" aria-labelledby="use-cases">
        <p className="contentEyebrow">03 / Guides</p>
        <h2 id="use-cases" className="sectionTitle">
          Perfect for Every Situation
        </h2>
        <p className="sectionLead">Read our guides on how to split expenses fairly.</p>
        <div className="guideGrid">
          {useCaseItems.map((useCase) => (
            <Link 
              key={useCase.title} 
              href={useCase.link} 
              className="guideItem"
            >
              <span className="guideIndex">0{useCaseItems.indexOf(useCase) + 1}</span>
              <h3>{useCase.title}</h3>
              <p>{useCase.desc}</p>
              <span className="guideLink">Read the Guide &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <hr className="sectionDivider" />

      <section className="contentSection faqWrap" id="faq" aria-labelledby="faq-title">
        <p className="contentEyebrow">04 / Questions</p>
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
        <p className="sectionLead faqFollowup">
          More detail on rounding, exchange rates and saving a trip is in the{" "}
          <Link href="/faq">
            full FAQ
          </Link>
          , and the calculation itself is explained step by step in{" "}
          <Link
            href="/how-it-works"
          >
            how it works
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
