import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "A step-by-step walkthrough of how BillSmart converts mixed-currency payments into net balances, and how it reduces the number of transfers needed to settle up.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <article className="prosePage">
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
        <h2>Step 1 — Pick a base currency</h2>
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
        <h2>Step 2 — Add everyone in the group</h2>
        <p>
          Enter the number of people and fill in their names. Names are only labels used
          to attach payments to a person and to print the final transfer list. Everyone
          who either paid for something or benefited from something needs to be in the
          list, even if they never pulled out a wallet.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Step 3 — Log each payment</h2>
        <p>Every payment needs three things:</p>
        <ul>
          <li>
            <strong>Who paid</strong> — the one person whose card or cash covered the
            bill.
          </li>
          <li>
            <strong>How much, and in which currency</strong> — the amount exactly as it
            appeared on the receipt, in the currency it was charged in.
          </li>
          <li>
            <strong>Who it was for</strong> — the &ldquo;Pay for&rdquo; multi-select. Pick
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
            Split it into two entries instead — one for the shared food, one for the
            items only some people had. Two entries take ten seconds and remove the
            argument entirely.
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Step 4 — What happens to the exchange rate</h2>
        <p>
          When a payment&rsquo;s currency differs from the base currency, BillSmart
          requests a rate for that specific currency pair and multiplies the amount by
          it. The rate that was used is shown next to each payment, so you can check the
          maths later rather than trusting a black box.
        </p>
        <p>Rates come from three sources, in order:</p>
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
          <li>
            A small built-in fallback table, used only if both live sources are
            unreachable.
          </li>
        </ol>
        <p>
          Each pair is fetched once and reused for the rest of your session, so every
          payment in the same currency converts at the same rate. If no rate can be found
          at all, BillSmart shows an error instead of quietly saving a wrong converted
          amount.
        </p>
        <div className="proseNote">
          <p>
            <strong>Reference rates are not your bank&rsquo;s rate.</strong> A card
            issuer typically adds a spread, and a foreign-transaction fee on top of that.
            Expect your statement to land somewhere around 0.5&ndash;3% away from what
            you see here. For settling up between friends that is close enough; for
            reconciling a company expense report, use the figure on the statement.
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Step 5 — How the settlement is calculated</h2>
        <p>
          This is where most people expect something complicated, and it is genuinely
          simple. BillSmart never tracks &ldquo;A owes B&rdquo; per transaction. It only
          tracks one number per person.
        </p>
        <p>For each person it computes:</p>
        <ul>
          <li>
            <strong>Paid</strong> — the total of every payment where they were the payer,
            converted to the base currency.
          </li>
          <li>
            <strong>Owed</strong> — their share of every payment they benefited from. A
            payment is divided evenly among the people it was for.
          </li>
          <li>
            <strong>Net balance</strong> — paid minus owed. Positive means the group owes
            them; negative means they owe the group.
          </li>
        </ul>
        <p>
          The net balances always sum to zero. BillSmart then repeatedly matches the
          largest debtor with the largest creditor and moves the smaller of the two
          amounts, until every balance is cleared. That pairing is what keeps the
          transfer count low — you end up with at most one fewer transfer than there are
          people, and usually fewer than that.
        </p>

        <h3>A worked example</h3>
        <p>Four friends — Ana, Ben, Chen, Dara — on a trip settling in USD:</p>
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
        <h2>Rounding, and why a cent sometimes goes missing</h2>
        <p>
          Amounts are displayed to two decimal places. When a bill does not divide
          evenly — $10 split three ways — the underlying maths keeps the full precision
          and only the display is rounded, so the transfer list still balances to zero.
          What you may notice is a share showing as $3.33 three times against a $10
          total. That is a display artefact, not an error in the settlement.
        </p>
        <p>
          If your group cares about the last cent, round each transfer up for whoever is
          paying and let the difference sit with the person who is owed the most. Nobody
          has ever ended a friendship over three cents.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>What BillSmart does with your data</h2>
        <p>
          There is no account and no database. The names and amounts you type live in the
          page while you have it open, and are gone when you close or reload the tab.
        </p>
        <p>
          The one request that does leave your browser is the exchange-rate lookup, which
          contains only a currency pair such as <code>JPY</code> to <code>TWD</code> — no
          amounts, no names. Full detail is in the{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
        <p>
          The flip side of having no database: you cannot come back to a half-finished
          trip tomorrow. For a long trip, enter payments as you go and screenshot the
          settlement at the end, or keep the tab open.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>When BillSmart is the wrong tool</h2>
        <p>Being honest about the limits saves you time:</p>
        <ul>
          <li>
            <strong>Ongoing shared finances.</strong> For rent and bills every month with
            the same people, a dedicated app with an account and history serves you
            better.
          </li>
          <li>
            <strong>Percentage or share-weighted splits.</strong> A payment is divided
            evenly among the people selected. To give someone a double share, enter the
            payment twice with different groups.
          </li>
          <li>
            <strong>Bookkeeping and tax.</strong> Reference exchange rates are not the
            rates an accountant or a tax authority will accept.
          </li>
        </ul>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Next steps</h2>
        <p>
          Open the <Link href="/">calculator</Link> and log your first three payments —
          it takes about a minute. If something behaves unexpectedly, the{" "}
          <Link href="/faq">FAQ</Link> covers the questions we get most, and the{" "}
          <Link href="/blog">guides</Link> go deeper into the etiquette side of splitting
          money with people you like.
        </p>
      </section>
    </article>
  );
}
