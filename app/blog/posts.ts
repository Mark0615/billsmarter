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
    slug: "group-trip-money-checklist",
    title: "The Group Trip Money Checklist: What to Agree Before You Book",
    summary:
      "Eight decisions that take five minutes in the group chat and prevent every common money argument on a trip — plus a message you can copy and send.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    readingTime: "4 min read",
  },
  {
    slug: "which-exchange-rate-to-use-when-splitting-a-trip",
    title: "Which Exchange Rate Should You Use When Splitting a Trip?",
    summary:
      "Three people paid in three currencies on three different days. How to pick one rate for the whole group without anyone quietly losing money.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    readingTime: "5 min read",
  },
  {
    slug: "who-should-pay-the-deposit-group-travel",
    title: "Who Should Pay the Deposit? Handling Big Upfront Bookings",
    summary:
      "One person putting a whole trip on their card carries real risk: cancellations, partial refunds, currency moves and months of exposure.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    readingTime: "5 min read",
  },
  {
    slug: "how-to-split-bills-when-incomes-are-different",
    title: "How to Split Bills When Everyone Earns Different Amounts",
    summary:
      "Proportional splitting with the arithmetic worked through, where an even split starts to hurt, and how to raise it without it being awkward.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    readingTime: "5 min read",
  },
  {
    slug: "bill-splitting-etiquette-around-the-world",
    title: "Bill-Splitting Etiquette Around the World",
    summary:
      "Separate checks are routine in some countries and awkward in others. What to expect in Taiwan, Japan, Korea, the US, the UK and Europe.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    readingTime: "5 min read",
  },
  {
    slug: "how-to-split-group-expense-fairly",
    title: "How to Split Group Expenses Fairly?",
    summary:
      "A practical guide to even, proportional, and itemized splits without awkwardness.",
    publishedAt: "2026-02-26",
    updatedAt: "2026-02-26",
    readingTime: "4 min read",
  },
  {
    slug: "best-ways-to-split-expenses-when-traveling-with-friends",
    title: "Best Ways to Split Expenses When Traveling with Friends",
    summary:
      "Travel-focused strategies for multi-currency trips and uneven budgets.",
    publishedAt: "2026-02-26",
    updatedAt: "2026-02-26",
    readingTime: "3 min read",
  },
  {
    slug: "cash-vs-card-payments-when-traveling",
    title: "Cash vs. Card Payments When Traveling",
    summary: "When to use cash, when to swipe, and how to avoid hidden FX fees.",
    publishedAt: "2026-02-26",
    updatedAt: "2026-02-26",
    readingTime: "3 min read",
  },
  {
    slug: "roommate-shared-expenses-split-guide",
    title: "Roommate Shared Expenses: 5 Hidden Costs",
    summary:
      "Learn how to fairly split shared living expenses and avoid roommate drama.",
    publishedAt: "2026-03-08",
    updatedAt: "2026-03-08",
    readingTime: "3 min read",
  },
  {
    slug: "how-to-split-restaurant-and-bar-bills",
    title: "How to Split Restaurant and Bar Bills",
    summary:
      "Learn the most elegant ways to split the check fairly without ruining the night.",
    publishedAt: "2026-03-08",
    updatedAt: "2026-03-08",
    readingTime: "3 min read",
  },
  {
    slug: "how-to-split-event-tickets-with-friends",
    title: "How to Split Concert and Sports Event Tickets",
    summary: "Learn how to track and split these major event expenses easily.",
    publishedAt: "2026-03-08",
    updatedAt: "2026-03-08",
    readingTime: "3 min read",
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
