export const metadata = {
  title: "Travel Budget Checklist for Groups",
  description:
    "Plan your group travel budget and avoid financial surprises.",
};

export default function Blog3() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Travel Budget Checklist for Groups
      </h1>

      <p>
        Planning a group trip? Budgeting is essential.
      </p>

      <h2 className="text-xl font-semibold">Expenses to Consider</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Flights</li>
        <li>Accommodation</li>
        <li>Transportation</li>
        <li>Meals</li>
        <li>Activities</li>
      </ul>

      <p>
        Using BillSmarter.app helps track and settle expenses quickly.
      </p>
    </main>
  );
}