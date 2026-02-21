export const metadata = {
  title: "Blog | BillSmart",
  description: "Tips, guides, and updates about splitting travel expenses fairly.",
};

export default function BlogPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p>
        Coming soon. We’ll share short guides on splitting bills, common travel
        expense scenarios, and best practices.
      </p>

      <h2 className="text-xl font-semibold">Popular topics (planned)</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>How to split group meals fairly</li>
        <li>Handling shared taxis and partial participants</li>
        <li>Cash vs card payments when traveling</li>
      </ul>
    </main>
  );
}