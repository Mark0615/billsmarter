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
    desc: "Pick the currency the group will actually transfer money in, not the one you are spending in. Four friends from Taipei settling a trip to Japan should choose TWD, because that is what moves between their bank accounts afterwards. Everything else converts into it.",
  },
  {
    title: "2. Log the Expenses",
    desc: "Each payment needs three things: who paid, how much and in which currency, and who it was actually for. That last one is a multi-select, because a payment rarely covers the whole group. The hotel covers everyone, the round at the bar covers three people.",
  },
  {
    title: "3. Get the Split",
    desc: "The settlement updates as you type. Each person's net balance is what they paid minus what they owe, and the transfer list turns those balances into a short set of payments. A week of tangled spending usually collapses into two or three transfers.",
  },
];

const featureItems = [
  {
    Icon: Calculator,
    title: "No More Math",
    text: "Enter who paid and who each payment was for. Balances and transfers follow automatically, including the cases people get wrong by hand: somebody who paid for a group they were not part of, or two people who both fronted money on the same day.",
  },
  {
    Icon: Scales,
    title: "Fair Splitting",
    text: "Thirteen currencies, each payment entered in the one it was actually paid in. Conversion happens once, using a published reference rate, into the currency you chose to settle in. Nobody argues from a half-remembered number, and anybody can check the rate themselves.",
  },
  {
    Icon: LockKey,
    title: "Data Control",
    text: "No account or installation. Enter payments, check the settlement, then download a PDF with the amounts, payers and final transfers. The calculator does not save your entries after a refresh. Exchange-rate requests contain currency pairs, not names or amounts.",
  },
];

const useCaseItems = [
  {
    title: "Living with Roommates",
    desc: "Rent is never the argument. The friction is in the small overlapping spending: the household supplies one person keeps replacing, bills that arrive every two months against rent that arrives monthly, groceries only half the flat eats.",
    link: "/blog/roommate-shared-expenses-split-guide",
  },
  {
    title: "Group Travel & Vacations",
    desc: "Three currencies in ten days, and whoever books first ends up fronting the most. Enter each payment in the currency it was actually paid in, then settle once in the currency you will really transfer.",
    link: "/blog/best-ways-to-split-expenses-when-traveling-with-friends",
  },
  {
    title: "Dining Out & Bar Tabs",
    desc: "One person had a salad, four shared two bottles of wine, and the driver drank water. Entering the food and the drinks as separate payments takes ten seconds and stops the person who did not drink paying for it.",
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
    a: "No. Each payment can use a different currency and is converted to the base currency automatically using reference rates.",
  },
  {
    q: "How does the split algorithm work?",
    a: "Each person's net balance is paid minus owed. BillSmart then pairs debtors with creditors, which keeps the transfer count low: at most one fewer transfer than there are people.",
  },
  {
    q: "What happens if exchange rates are temporarily unavailable?",
    a: "BillSmart tries a second rate provider. If neither can supply a rate, it keeps your existing payments unchanged and asks you to retry. It never substitutes a fixed estimate for a new payment.",
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
        "A free calculator that splits group expenses across 13 currencies, converts each payment into one settlement currency using reference rates, and returns a short list of who pays whom. No account required.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Split one payment between any subset of the group",
        "Mixed-currency entry converted to one settlement currency",
        "Reference exchange rates with a second provider",
        "Net balances reduced to a short transfer list",
        "No account and one-click PDF settlement records",
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
              The{" "}
              <br />
              Smartest Split{" "}
              <br />
              For Any{" "}
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
        <p className="sectionLead">
          Three steps, and only the first one needs a decision. Everything after it is
          entering what already happened.
        </p>
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
        <p className="sectionLead">
          The arithmetic is the easy part. What groups actually get wrong is who a
          payment was for, and which exchange rate everybody agreed to use.
        </p>

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
        <p className="sectionLead">
          Eleven guides on the parts a calculator cannot settle for you: what counts as
          shared, who fronts the big bookings, and how to raise any of it without
          souring the evening.
        </p>
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
