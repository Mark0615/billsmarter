export type Post = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date the article first went live. */
  publishedAt: string;
  /** ISO date of the last substantive edit. */
  updatedAt: string;
  readingTime: string;
};

export const posts: Post[] = [
  {
    slug: "how-to-split-group-expense-fairly",
    title: "How to Split Group Expenses Fairly?",
    summary:
      "A practical guide to even, proportional, and itemized splits without awkwardness.",
    publishedAt: "2026-02-26",
    updatedAt: "2026-02-26",
    readingTime: "9 min read",
  },
  {
    slug: "best-ways-to-split-expenses-when-traveling-with-friends",
    title: "Best Ways to Split Expenses When Traveling with Friends",
    summary:
      "Travel-focused strategies for multi-currency trips and uneven budgets.",
    publishedAt: "2026-02-26",
    updatedAt: "2026-02-26",
    readingTime: "8 min read",
  },
  {
    slug: "cash-vs-card-payments-when-traveling",
    title: "Cash vs. Card Payments When Traveling",
    summary: "When to use cash, when to swipe, and how to avoid hidden FX fees.",
    publishedAt: "2026-02-26",
    updatedAt: "2026-02-26",
    readingTime: "8 min read",
  },
  {
    slug: "roommate-shared-expenses-split-guide",
    title: "Roommate Shared Expenses: 5 Hidden Costs",
    summary:
      "Learn how to fairly split shared living expenses and avoid roommate drama.",
    publishedAt: "2026-03-08",
    updatedAt: "2026-03-08",
    readingTime: "7 min read",
  },
  {
    slug: "how-to-split-restaurant-and-bar-bills",
    title: "How to Split Restaurant and Bar Bills",
    summary:
      "Learn the most elegant ways to split the check fairly without ruining the night.",
    publishedAt: "2026-03-08",
    updatedAt: "2026-03-08",
    readingTime: "6 min read",
  },
  {
    slug: "how-to-split-event-tickets-with-friends",
    title: "How to Split Concert and Sports Event Tickets",
    summary: "Learn how to track and split these major event expenses easily.",
    publishedAt: "2026-03-08",
    updatedAt: "2026-03-08",
    readingTime: "6 min read",
  },
];

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
