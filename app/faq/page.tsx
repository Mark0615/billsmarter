export const metadata = {
  title: "FAQ | BillSmart",
  description: "Frequently asked questions about BillSmart and bill splitting.",
};

export default function FaqPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">FAQ</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Is BillSmart free?</h2>
        <p>Yes. You can use the calculator for free.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Do I need an account?</h2>
        <p>No account required.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Where is my data stored?</h2>
        <p>
          The calculator runs in your browser. We don’t ask you to upload receipts or
          personal data to a server.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Does it support decimals?</h2>
        <p>Yes. Amounts and results can display up to 2 decimal places.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Why do balances sometimes differ by 0.01?</h2>
        <p>
          Splitting can create rounding. BillSmart rounds to 2 decimals for display and
          settlement suggestions.
        </p>
      </section>
    </main>
  );
}