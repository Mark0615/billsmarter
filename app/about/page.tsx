export const metadata = {
  title: "About | BillSmart",
  description: "Learn what BillSmart is and how to use it.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">About BillSmart</h1>
      <p>
        BillSmart is a simple travel expense split calculator. Add people, add payments,
        and get clear settlement suggestions.
      </p>

      <h2 className="text-xl font-semibold">Why BillSmart?</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Fast, clean, and mobile-friendly</li>
        <li>No signup required</li>
        <li>Supports decimals (2 digits)</li>
      </ul>
    </main>
  );
}