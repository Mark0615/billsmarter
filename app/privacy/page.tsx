import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What BillSmart collects, what it does not, and how Google Analytics, Google Tag Manager and advertising cookies are used on this site.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "27 September 2026";

export default function PrivacyPage() {
  return (
    <article className="prosePage">
      <header style={{ display: "grid", gap: "10px" }}>
        <h1>Privacy Policy</h1>
        <p className="proseMeta">Last updated: {LAST_UPDATED}</p>
        <p className="lead">
          This policy covers billsmarter.app. Calculator entries stay in your browser.
          The site also loads Google services for analytics and advertising, which
          may process technical information and use cookies.
        </p>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Who runs this site</h2>
        <p>
          BillSmart is operated by an individual, Mark, based in Taipei, Taiwan. For any
          privacy question or request, email{" "}
          <a href="mailto:yang10824m@gmail.com">yang10824m@gmail.com</a>.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>What you type into the calculator</h2>
        <p>
          Names, amounts and notes remain in the current page while it is open. The current calculator does not save new splits in browser storage or send these fields to our server. Earlier versions saved local history; if you used one, that older data may remain in this browser until you clear this site’s data in browser settings. Downloaded PDFs are separate files that you manage yourself.
        </p>
        <p>
          When a payment needs converting, your browser requests an exchange rate through
          this site. That request contains a currency pair only, for example{" "}
          <code>JPY</code> to <code>TWD</code>. The request parameters contain no amounts or names. Like other web requests,
          the connection also exposes technical information, such as an IP address,
          to our hosting provider. Rates are sourced from{" "}
          <a href="https://www.frankfurter.app/" rel="nofollow noopener" target="_blank">
            Frankfurter
          </a>{" "}
          and{" "}
          <a
            href="https://www.exchangerate-api.com/"
            rel="nofollow noopener"
            target="_blank"
          >
            open.er-api.com
          </a>
          .
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Analytics</h2>
        <p>
          This site uses Google Analytics 4, loaded through Google Tag Manager, to
          understand aggregate usage: which pages are visited, roughly where visitors
          come from at country or city level, device type, and how people move between
          pages. This is used to decide what to build and what to write next.
        </p>
        <p>
          Google Analytics sets cookies and processes IP addresses. It does not receive
          anything you type into the calculator. Google&rsquo;s handling of this data is
          described in{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            rel="nofollow noopener"
            target="_blank"
          >
            How Google uses information from sites that use our services
          </a>
          . You can opt out across all sites with the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            rel="nofollow noopener"
            target="_blank"
          >
            Google Analytics opt-out browser add-on
          </a>
          .
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Advertising</h2>
        <p>
          This site is configured to use Google AdSense. Ad availability depends on
          Google’s approval and serving settings. When Google serves ads:
        </p>
        <ul>
          <li>
            Third-party vendors, including Google, use cookies to serve ads based on your
            prior visits to this or other websites.
          </li>
          <li>
            Google&rsquo;s use of advertising cookies enables it and its partners to serve
            ads to you based on your visit to this site and other sites on the internet.
          </li>
          <li>
            You can opt out of personalised advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              rel="nofollow noopener"
              target="_blank"
            >
              Google Ads Settings
            </a>
            , or opt out of a third-party vendor&rsquo;s use of cookies for personalised
            advertising at{" "}
            <a
              href="https://www.aboutads.info/choices/"
              rel="nofollow noopener"
              target="_blank"
            >
              aboutads.info/choices
            </a>
            .
          </li>
        </ul>
        <p>
          Ads on this site are limited to standard display placements. This site does not
          use pop-ups, pop-unders, browser push notifications, or interstitials that
          block access to the calculator.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Cookies</h2>
        <p>
          The cookies set on this site come from Google Analytics and Google advertising,
          as described above. The calculator itself does not set cookies or save new splits between visits. You can block or delete cookies in your browser
          settings; the calculator will continue to work normally if you do.
        </p>
        <p>
          If a Google privacy message is shown, use its controls to manage the
          choices it offers. The Google settings and browser controls linked above
          provide additional ways to manage cookies and personalised advertising.
          For questions about a privacy message or your choices, contact{" "}
          <a href="mailto:yang10824m@gmail.com">yang10824m@gmail.com</a>.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Email you send us</h2>
        <p>
          If you email the address on the <Link href="/contact">contact page</Link>, that
          message and your email address sit in a Gmail inbox and are used only to reply
          to you. They are not added to a mailing list and not shared. Please do not send
          bank details, card numbers or statements. They are never needed.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Children</h2>
        <p>
          This site is not directed at children under 13 and does not knowingly collect
          personal information from them.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Your rights</h2>
        <p>
          The calculator does not maintain an account or server copy of your entries. Download a PDF before leaving if you need the record; remove any downloaded file through your device. Older browser-local history can be removed by clearing this site’s data in browser settings. Where analytics or advertising data about you
          is held by Google, those controls sit with Google and are linked in the
          sections above. If you believe we hold something about you and want it removed,
          email{" "}
          <a href="mailto:yang10824m@gmail.com">yang10824m@gmail.com</a> and it will be
          handled.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Third-party links</h2>
        <p>
          Articles on this site link to external websites. Their privacy practices are
          their own and are not covered by this policy.
        </p>
      </section>

      <section style={{ display: "grid", gap: "12px" }}>
        <h2>Changes</h2>
        <p>
          Material changes to this policy will be reflected in the &ldquo;last
          updated&rdquo; date above.
        </p>
      </section>
    </article>
  );
}
