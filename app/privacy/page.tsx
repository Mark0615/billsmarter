export const metadata = {
  title: "Privacy Policy | BillSmart",
  description: "Privacy Policy for BillSmart, including analytics and advertising cookies.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="text-sm opacity-80">Last updated: {new Date().getFullYear()}-02-22</p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p>
          BillSmart is a browser-based tool to help split travel expenses. This page
          explains what data may be collected when you visit the site.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Data you enter</h2>
        <p>
          Names and amounts you enter are used to calculate results in your browser.
          We do not require you to create an account.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Analytics (GA / GTM)</h2>
        <p>
          We may use Google Analytics via Google Tag Manager to understand aggregated
          usage (for example: page views, device type, and general location at the city
          or region level). This helps us improve the site.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Advertising</h2>
        <p>
          We may display ads (for example, Google AdSense). Ad partners may use cookies
          or similar technologies to deliver and measure ads, and to show more relevant
          advertising.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Cookies</h2>
        <p>
          Cookies may be used for analytics and advertising. You can usually control
          cookies through your browser settings.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Third-party links</h2>
        <p>
          This site may link to third-party websites. Their privacy practices are not
          controlled by BillSmart.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p>
          For privacy questions, contact us at{" "}
          {/* TODO: 換成你的信箱 */}
          <a className="underline" href="mailto:hello@yourdomain.com">
            hello@yourdomain.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}