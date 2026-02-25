export const metadata = {
  title: "Blog | BillSmart",
  description: "Tips, guides, and updates about splitting travel expenses fairly.",
};

const posts = [
  {
    slug: "how-to-split-group-expense-fairly",
    title: "How to Split Group Expenses Fairly?",
    summary:
      "A practical guide to even, proportional, and itemized splits without awkwardness.",
  },
  {
    slug: "best-ways-to-split-expenses-when-traveling-with-friends",
    title: "Best Ways to Split Expenses When Traveling with Friends",
    summary:
      "Travel-focused strategies for multi-currency trips and uneven budgets.",
  },
  {
    slug: "cash-vs-card-payments-when-traveling",
    title: "Cash vs. Card Payments When Traveling",
    summary:
      "When to use cash, when to swipe, and how to avoid hidden FX fees.",
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-slate-600">
          Short guides on splitting bills, travel expenses, and best practices.
        </p>
      </header>

      <section className="grid gap-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-2 text-slate-600">{post.summary}</p>
            <a
              className="mt-4 inline-flex text-slate-900 font-semibold underline"
              href={`/blog/${post.slug}`}
            >
              Read article
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
