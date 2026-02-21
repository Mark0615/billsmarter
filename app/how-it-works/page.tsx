export const metadata = {
  title: "How It Works | BillSmart",
  description: "Learn how to use BillSmart to split expenses and calculate settlements.",
};

export default function HowItWorksPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">How It Works</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1) Add people</h2>
        <p>Enter the number of travelers and fill in everyone’s name.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">2) Add payments</h2>
        <p>
          Choose who paid, who benefited, and the amount. Repeat for each expense.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">3) Get results</h2>
        <p>
          BillSmart calculates each person’s balance and suggests who should pay whom
          to settle up.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Notes</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>All calculations support 2 decimal places.</li>
          <li>No account required. Your data stays in your browser.</li>
        </ul>
      </section>
    </main>
  );
}