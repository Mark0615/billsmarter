import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "A step-by-step walkthrough of how BillSmart converts mixed-currency payments into net balances, and how it reduces the number of transfers needed to settle up.",
  alternates: { canonical: "/how-it-works" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      headline: "How BillSmart Works",
      description:
        "What happens between the numbers you type and the settlement you get, including how exchange rates are handled and where rounding can bite.",
      url: "https://billsmarter.app/how-it-works",
      author: { "@type": "Person", name: "Mark", url: "https://billsmarter.app/about" },
      publisher: { "@type": "Organization", name: "BillSmart", url: "https://billsmarter.app" },
      about: { "@type": "WebApplication", name: "BillSmart", url: "https://billsmarter.app" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://billsmarter.app" },
        {
          "@type": "ListItem",
          position: 2,
          name: "How it works",
          item: "https://billsmarter.app/how-it-works",
        },
      ],
    },
  ],
};

export default function HowItWorksPage() {
  return (
    <article className="prosePage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header style={{ display: "grid", gap: "12px" }}>
        <h1>How BillSmart Works</h1>
        <p className="lead">
          BillSmart turns a messy pile of &ldquo;who paid for what&rdquo; into a short
          list of transfers. This page explains exactly what happens
          between the numbers you type and the settlement you get, including how
          exchange rates are handled and where rounding can bite.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Step 1: Pick a base currency</h2>
        <p>
          Everything is settled in one currency. Pick the one your group will actually
          transfer money in, not the one you spent the most in. If four friends live in
          Taiwan and travel to Japan, the base currency should be TWD, because that is
          how they will pay each other back afterwards.
        </p>
        <p>
          If you change the base currency after entering payments, BillSmart re-converts
          every existing payment rather than making you start over.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Step 2: Add everyone in the group</h2>
        <p>
          Enter the number of people and fill in their names. Names are only labels used
          to attach payments to a person and to download the final settlement PDF. Everyone
          who either paid for something or benefited from something needs to be in the
          list, even if they never pulled out a wallet.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Step 3: Log each payment</h2>
        <p>Every payment needs three things:</p>
        <ul>
          <li>
            <strong>Who paid</strong>, the one person whose card or cash covered the
            bill.
          </li>
          <li>
            <strong>How much, and in which currency</strong>: the amount exactly as it
            appeared on the receipt, in the currency it was charged in.
          </li>
          <li>
            <strong>Who it was for</strong>: the &ldquo;Pay for&rdquo; multi-select. Pick
            one person, several, or everyone. This is what makes an uneven split
            possible.
          </li>
        </ul>
        <p>
          There are no categories, no receipt uploads and no photos. The tool is
          deliberately narrow.
        </p>
        <div className="proseNote">
          <p>
            <strong>The most common mistake:</strong> logging a €120 dinner as
            &ldquo;paid for everyone&rdquo; when one person skipped dessert and drinks.
            Split it into two entries instead, one for the shared food, one for the
            items only some people had. Two entries take ten seconds and remove the
            argument entirely.
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Step 4: What happens to the exchange rate</h2>
        <p>
          When a payment&rsquo;s currency differs from the base currency, BillSmart
          requests a rate for that specific currency pair and multiplies the amount by
          it. The original and converted amounts stay together for checking against receipts.
        </p>
        <p>Rates come from two providers, in order:</p>
        <ol>
          <li>
            <a href="https://www.frankfurter.app/" rel="nofollow noopener" target="_blank">
              Frankfurter
            </a>
            , which publishes European Central Bank reference rates.
          </li>
          <li>
            <a
              href="https://www.exchangerate-api.com/"
              rel="nofollow noopener"
              target="_blank"
            >
              open.er-api.com
            </a>
            , used when the first source has no data for that pair.
          </li>

        </ol>
        <p>
          Each pair is fetched once and reused for the rest of your session, so every
          payment in the same currency converts at the same rate. If no rate can be found
          at all, BillSmart shows an error instead of quietly saving a wrong converted
          amount.
        </p>
        <p>
          A cross-currency payment displays the exact rate used, provider, provider rate
          date and the UTC time BillSmart fetched it. The PDF carries the same details.
          The rate date may be earlier than the fetch time because these are published
          reference rates, not live card quotes. Changing the base currency recalculates
          existing payments and updates their rate details.
        </p>
        <div className="proseNote">
          <p>
            <strong>Reference rates are not your bank&rsquo;s rate.</strong> A card
            issuer typically adds a spread, and a foreign-transaction fee on top of that.
            Fees vary by card and bank. If the group agrees to reimburse the actual bank charge, enter the statement amount directly in the settlement currency.
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Step 5: How the settlement is calculated</h2>
        <p>
          This is where most people expect something complicated, and it is genuinely
          simple. BillSmart never tracks &ldquo;A owes B&rdquo; per transaction. It only
          tracks one number per person.
        </p>
        <p>For each person it computes:</p>
        <ul>
          <li>
            <strong>Paid</strong>: the total of every payment where they were the payer,
            converted to the base currency.
          </li>
          <li>
            <strong>Owed</strong>: their share of every payment they benefited from. A
            payment is divided evenly among the people it was for.
          </li>
          <li>
            <strong>Net balance</strong>: paid minus owed. Positive means the group owes
            them; negative means they owe the group.
          </li>
        </ul>
        <p>
          The net balances always sum to zero. BillSmart sorts the debtors and creditors, then pairs them and moves the smaller of the two
          amounts, until every balance is cleared. That pairing is what keeps the
          transfer count low. You end up with at most one fewer transfer than there are
          people, and usually fewer than that.
        </p>

        <h3>A worked example</h3>
        <p>Four friends (Ana, Ben, Chen, Dara) on a trip settling in USD:</p>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Payment</th>
                <th>Paid by</th>
                <th>For</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hotel, 2 nights</td>
                <td>Ana</td>
                <td>All four</td>
                <td>$480</td>
              </tr>
              <tr>
                <td>Rental car</td>
                <td>Ben</td>
                <td>All four</td>
                <td>$200</td>
              </tr>
              <tr>
                <td>Dinner</td>
                <td>Chen</td>
                <td>Chen, Dara</td>
                <td>$80</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Ana paid $480 and owes $170 (a quarter of the hotel and the car), so her net is
          +$310. Ben paid $200 and owes $170, so +$30. Chen paid $80 and owes $210, so
          &minus;$130. Dara paid nothing and owes $210, so &minus;$210.
        </p>
        <p>
          Naively that looks like six possible debts between four people. BillSmart
          returns three transfers: Dara pays Ana $210, Chen pays Ana $100, Chen pays Ben
          $30. Everyone is square.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Rounding that reconciles</h2>
        <p>Each converted payment is rounded to whole JPY, KRW and TWD, or cents for other supported currencies. It is then divided in those units. Leftover units are assigned to the first selected people in roster order.</p>
        <p>For $10 split between Alice, Bob and Charlie, the shares are $3.34, $3.33 and $3.33. If Alice paid, Bob and Charlie each transfer $3.33 to Alice. Her balance is $6.66, exactly matching those transfers.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Keep a settlement record</h2>
        <p>After entering payments, check the result and click Download PDF in the settlement panel. The file shows every payment, who paid, who it covered, the settlement currency, and who transfers money to whom.</p>
        <p>The calculator does not save entries after a refresh or across devices. Download the PDF before closing the page if you need a record. PDF files are stored on your device, wherever your browser puts downloads.</p>
        <p>Exchange-rate requests contain currency pairs, not names, amounts or notes. See the <Link href="/privacy">privacy policy</Link> for analytics and advertising details.</p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>When BillSmart is the wrong tool</h2>
        <p>Being honest about the limits saves you time:</p>
        <ul>
          <li>
            <strong>Ongoing shared finances.</strong> This page does not retain an editable ledger or offer simultaneous editing. Use a shared service if you need ongoing records.
          </li>
          <li>
            <strong>Percentage or share-weighted splits.</strong> A payment is divided
            evenly among the people selected. To give someone a double share, divide the amount into separate entries with different groups; do not duplicate the full payment.
          </li>
          <li>
            <strong>Bookkeeping and tax.</strong> Use the exchange-rate rules required by your employer or relevant authority rather than assuming this calculator meets them.
          </li>
        </ul>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Next steps</h2>
        <p>
          Open the <Link href="/">calculator</Link> and log your first three payments. It takes about a minute. If something behaves unexpectedly, the{" "}
          <Link href="/faq">FAQ</Link> covers the questions we get most, and the{" "}
          <Link href="/blog">guides</Link> go deeper into the etiquette side of splitting
          money with people you like.
        </p>
      </section>
    </article>
  );
}
