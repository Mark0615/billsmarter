import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Roommate Shared Expenses: 5 Hidden Costs That Cause Conflicts and How to Split Them | BillSmarter',
  description: 'Living with roommates? Rent is easy to split, but what about toilet paper, groceries, and cleaning supplies? Learn how to fairly split shared living expenses and avoid roommate drama.',
};

export default function RoommateExpensesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-lg md:prose-xl max-w-none text-gray-800">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
          Roommate Shared Expenses: 5 Hidden Costs That Cause Conflicts and How to Split Them
        </h1>
        
        <p className="mb-8 text-gray-600">
          Moving in with friends or new roommates is an exciting milestone. However, financial disagreements are the number one killer of a peaceful household. Most people agree on how to split rent and utilities on day one, but what about the hidden everyday costs? In this guide, we break down the top 5 expenses that usually cause roommate drama and provide practical strategies to split them fairly.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">1. Household Consumables (Toilet Paper, Dish Soap, Trash Bags)</h2>
        <p>
          These are the silent budget drainers. Who bought the last pack of toilet paper? Who is replacing the dish soap? If the same person always ends up paying for these essentials, resentment will build quickly.
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li><strong>The Mistake:</strong> The &quot;whoever notices it&apos;s empty buys it&quot; method. This is a trap that punishes the most responsible roommate.</li>
          <li><strong>The Solution:</strong> Create a &quot;House Kitty.&quot; Everyone contributes $20 at the start of the month to a shared envelope or digital fund exclusively for household supplies. Alternatively, track every purchase and settle up at the end of the month using a split bill calculator.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">2. Shared Groceries and Spices</h2>
        <p>
          Cooking together can be fun, but splitting the grocery bill gets complicated when Roommate A cooks every night and Roommate B only eats at home twice a week. 
        </p>
        <p>
          <strong>The Solution:</strong> Basic pantry items (cooking oil, salt, pepper) should be split equally using the house fund. For fresh produce or expensive items (like olive oil or specialty sauces), the rule should be &quot;buy your own.&quot; If you do a massive shared grocery run, keep the receipt and itemize who bought what immediately.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">3. Internet and Streaming Subscriptions (Netflix, Spotify)</h2>
        <p>
          While the Wi-Fi bill is usually straightforward, streaming services are tricky. If you are the account holder paying $15 a month, constantly asking your roommate to Venmo you $7.50 feels awkward.
        </p>
        <p>
          <strong>The Solution:</strong> Instead of collecting micro-payments every month, collect streaming shares semi-annually or annually. Have your roommates pay for 6 months upfront.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">4. Cleaning and Maintenance Fees</h2>
        <p>
          What happens when the AC needs fixing, or the apartment needs a deep clean? Or perhaps you all agreed to hire a cleaner once a month for the common areas (living room, kitchen, bathroom)?
        </p>
        <p>
          <strong>The Solution:</strong> Natural wear-and-tear repairs should be handled by the landlord. If a roommate damages something, they pay for it entirely. For shared cleaning services, divide the cost equally per person, not per room.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">5. Pet-Related Expenses</h2>
        <p>
          If a roommate brings a pet into the apartment, everyone might love playing with the dog or cat, but the financial boundaries must be strictly drawn.
        </p>
        <p>
          <strong>The Solution:</strong> The pet owner is 100% responsible for pet food, litter, and any damage caused to shared furniture. Pet costs are never shared expenses.
        </p>

        <hr className="my-10 border-gray-300" />

        <h2 className="text-3xl font-bold mt-8 mb-4 text-blue-600">
          Stop Arguing Over Receipts. Use BillSmarter.
        </h2>
        <p>
          Roommate life is full of small, overlapping debts. You bought the trash bags yesterday, your roommate paid the electric bill today. Trying to figure out who owes who at the end of the month can take hours of math.
        </p>
        <p className="mb-8">
          That&apos;s where BillSmarter comes in. Just log your expenses as they happen. At the end of the month, our smart calculator will tell you exactly how to settle up with the fewest possible transactions. Keep your friendships strong and your math simple!
        </p>

        <div className="bg-blue-50 p-8 rounded-xl text-center border border-blue-100">
          <Link href="/calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300">
            Start Splitting Rent & Expenses Now
          </Link>
        </div>
      </article>
    </div>
  );
}