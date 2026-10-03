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
    updatedAt: "2026-10-04",
    readingTime: "4 min read",
  },
  {
    slug: "which-exchange-rate-to-use-when-splitting-a-trip",
    title: "Which Exchange Rate Should You Use When Splitting a Trip?",
    summary:
      "A Taiwan–Japan trip with TWD hotel costs and JPY cash purchases shows why a group needs to agree on one exchange-rate method.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-10-04",
    readingTime: "5 min read",
  },
  {
    slug: "who-should-pay-the-deposit-group-travel",
    title: "Who Should Pay the Deposit? Handling Big Upfront Bookings",
    summary:
      "An upfront hotel booking needs a reimbursement plan, a cancellation rule and an agreed amount before the trip begins.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-10-04",
    readingTime: "5 min read",
  },
  {
    slug: "how-to-split-bills-when-incomes-are-different",
    title: "How to Split Bills When Everyone Earns Different Amounts",
    summary:
      "Income-based shares and opt-in expenses solve different problems. See the arithmetic and what BillSmart can record directly.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-10-04",
    readingTime: "5 min read",
  },
  {
    slug: "bill-splitting-etiquette-around-the-world",
    title: "Bill-Splitting Etiquette Around the World",
    summary:
      "Questions to ask before paying a group bill abroad, with firsthand Taiwan context and sourced notes on payment methods and service charges.",
    publishedAt: "2026-08-05",
    updatedAt: "2026-10-04",
    readingTime: "5 min read",
  },
  {
    slug: "how-to-split-group-expense-fairly",
    title:
      "How to Split Group Expenses Fairly",
    summary:
      "A group expense is rarely an expense for the whole group. Why every payment needs a payer and a set of people it covers, and what to agree before the money moves.",
    publishedAt: "2026-02-26",
    updatedAt: "2026-09-10",
    readingTime: "6 min read",
  },
  {
    slug: "best-ways-to-split-expenses-when-traveling-with-friends",
    title:
      "The Best Way to Split Expenses When Traveling with Friends",
    summary:
      "Three currencies in ten days and one person fronting the bookings. Picking a settlement currency, spreading the exposure, and charging each expense to the people it was actually for.",
    publishedAt: "2026-02-26",
    updatedAt: "2026-10-04",
    readingTime: "6 min read",
  },
  {
    slug: "cash-vs-card-payments-when-traveling",
    title:
      "Cash vs Card When You Travel: How to Choose",
    summary:
      "The four places a payment abroad quietly costs more, why whoever withdraws the cash pays fees nobody else sees, and how to log both so the split stays fair.",
    publishedAt: "2026-02-26",
    updatedAt: "2026-10-04",
    readingTime: "6 min read",
  },
  {
    slug: "roommate-shared-expenses-split-guide",
    title:
      "Roommate Shared Expenses: The Costs That Actually Cause Arguments",
    summary:
      "Record shared supplies and bills with different service periods, including a worked example for a flatmate leaving mid-cycle.",
    publishedAt: "2026-03-08",
    updatedAt: "2026-10-04",
    readingTime: "6 min read",
  },
  {
    slug: "how-to-split-restaurant-and-bar-bills",
    title:
      "How to Split Restaurant and Bar Bills for Big Groups",
    summary:
      "The drinks bill worked through in numbers, how service charges differ between Taiwan, Japan and the US, and why saying how you will split it before ordering changes what people order.",
    publishedAt: "2026-03-08",
    updatedAt: "2026-10-04",
    readingTime: "6 min read",
  },
  {
    slug: "how-to-split-event-tickets-with-friends",
    title:
      "How to Split Concert and Sports Event Tickets with Friends",
    summary:
      "Agree on ticket reimbursement, exchange-rate method and resale risk before one person pays for the group.",
    publishedAt: "2026-03-08",
    updatedAt: "2026-10-04",
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
