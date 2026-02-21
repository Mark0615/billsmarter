import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-4xl font-bold">
          BillSmart — Split Travel Expenses Fairly
        </h1>
        <p className="mt-4 text-lg">
          BillSmart is a simple and powerful travel expense calculator that
          helps groups settle shared costs quickly and fairly. Add participants,
          record payments, and instantly see who owes whom.
        </p>
        <Link
          href="/calculator"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded"
        >
          Open Calculator
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <ol className="list-decimal ml-6 mt-4 space-y-2">
          <li>Add all travelers.</li>
          <li>Enter each payment and beneficiaries.</li>
          <li>Click calculate to see final balances.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Common Use Cases</h2>
        <ul className="list-disc ml-6 mt-4 space-y-2">
          <li>Road trips</li>
          <li>Group tours</li>
          <li>Business trips</li>
          <li>Shared apartment expenses</li>
        </ul>
      </section>
    </div>
  );
}