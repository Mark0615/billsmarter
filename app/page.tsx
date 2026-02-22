import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import CalculatorClient from "./calculator/CalculatorClient";

export default function HomePage() {
  return (
    <div className="homeStack">
      <CalculatorClient />

      <AdSlot slot="1234567890" className="containerCard" label="Advertisement" />

      <section className="containerCard" id="how-it-works">
        <h2>How it works</h2>
        <ol className="contentList">
          <li>
            Set your base currency (default USD), then add traveler names.
          </li>
          <li>
            Add payments with original currency. BillSmart converts each item to base currency with live FX.
          </li>
          <li>
            Read final balances and transfer instructions instantly.
          </li>
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
          <summary>Is data stored on your server?</summary>
          <p>Currently this tool works client-side for quick calculations. For policy details, check our privacy page.</p>
        </details>
      </section>

      <section className="containerCard">
        <h2>Resources</h2>
        <p>
          Read our guides in <Link href="/blog">Blog</Link> or contact us via <Link href="/contact">Contact</Link>.
        </p>
      </section>
    </div>
  );
}
