import Image from "next/image";
import CalculatorClient from "./calculator/CalculatorClient";

const featureItems = [
  {
    icon: "https://cdn-icons-png.flaticon.com/128/14875/14875254.png",
    title: "No more math",
    text: "Enter payments and we handle the split logic automatically, including who paid and who owes.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/2164/2164712.png",
    title: "Fair splitting",
    text: "Supports mixed currencies and converts into one base unit so everyone settles with confidence.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/456/456112.png",
    title: "Data control",
    text: "No required login flow for this calculator, making quick split sessions private and easy.",
  },
];

const faqItems = [
  {
    q: "Can I split one payment for multiple people?",
    a: "Yes. Use the ‘Pay for’ multi-select dropdown and choose one, many, or select all.",
  },
  {
    q: "Do I need to use the same currency for every expense?",
    a: "No. Each payment can use a different currency and is converted to the base currency automatically.",
  },
  {
    q: "What happens if exchange rates are temporarily unavailable?",
    a: "BillSmart now shows a clear FX error and prevents saving wrong converted amounts.",
  },
];

export default function HomePage() {
  return (
    <div className="homeStack">
      <section className="heroBanner">
        <h1>
          <b>BillSmart</b> | The smartest split for any expense
        </h1>
        <p>Choose a base currency, add mixed-currency payments, and settle fairly with one final result.</p>
      </section>

      <section className="calculatorShell">
        <CalculatorClient />
      </section>

      <hr className="sectionDivider" />

      <section className="containerCard featureSection" aria-labelledby="why-billsmart">
        <h2 id="why-billsmart">Why choose BillSmart?</h2>
        <p className="sectionLead">Simple and fair splitting, made easy.</p>
        <div className="featureGrid">
          {featureItems.map((item) => (
            <article key={item.title} className="featureCard">
              <Image src={item.icon} alt={item.title} width={52} height={52} className="featureIconImage" unoptimized />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="faqWrap" id="faq" aria-labelledby="faq-title">
        <h2 id="faq-title">FAQ</h2>
        <div className="faqGrid">
          {faqItems.map((item) => (
            <article key={item.q} className="faqCard">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
