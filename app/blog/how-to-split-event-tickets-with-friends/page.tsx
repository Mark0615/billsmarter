import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'How to Split Concert and Sports Event Tickets with Friends | BillSmarter',
  description: 'Buying group tickets for concerts or Formula 1 races often involves massive upfront costs and foreign transaction fees. Learn how to track and split these major event expenses easily.',
};

export default function EventTicketsSplitPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-lg md:prose-xl max-w-none text-gray-800">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
          How to Split Concert and Sports Event Tickets with Friends
        </h1>
        
        <p className="mb-8 text-gray-600">
          Traveling with friends to see your favorite artist live or attending a major international sports event is an unforgettable experience. However, these mega-events come with massive financial logistics: expensive grandstand tickets, aggressive ticketing queues, and hidden foreign transaction fees. If you don&apos;t track these costs properly from day one, settling the debts later will be a massive headache.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">The 3 Major Hurdles of Event Expenses</h2>
        
        <ul className="list-disc pl-6 mb-6">
          <li><strong>The Ticket Booking Rush:</strong> When securing prime seats for a Formula 1 race or a sold-out stadium tour, one person usually has to bite the bullet and put the entire $2,000+ transaction on their credit card in seconds. Getting paid back accurately and promptly is crucial.</li>
          <li><strong>Foreign Transaction Fees:</strong> If you are buying tickets on an international platform, your credit card will likely charge a foreign transaction fee (FX fee), and the exchange rate might fluctuate by the time the charge officially posts to your account.</li>
          <li><strong>Merchandise and On-Site Purchases:</strong> At the venue, Friend A buys the official tour t-shirts, Friend B covers the overpriced stadium beers. These high-priced impulse buys are easily forgotten after the adrenaline wears off.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">How to Manage Massive Shared Expenses</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">1. Wait for the Final Credit Card Statement</h3>
        <p>
          If you bought tickets in a foreign currency, never use Google&apos;s exchange rate on the day of purchase to calculate what your friends owe you. Wait a few days for the transaction to fully clear on your banking app. Use the final billed amount in your local currency (which includes all hidden bank fees) and divide that by the number of tickets. 
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">2. Use Clear Transfer Notes</h3>
        <p>
          When your friends transfer you hundreds of dollars for their share of the tickets, make sure they write a clear memo (e.g., &quot;F1 Grandstand Ticket&quot; or &quot;Taylor Swift VIP&quot;). If the event is canceled or postponed months later and you need to issue refunds, you will have a clear paper trail of who paid what.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">3. Create a Dedicated Expense Ledger</h3>
        <p>
          Do not rely on memory or scattered text messages. Set up a dedicated group chat and log every single expense—from the flight bookings to the stadium hot dogs—in a centralized tool as soon as they happen.
        </p>

        <hr className="my-10 border-gray-300" />

        <h2 className="text-3xl font-bold mt-8 mb-4 text-blue-600">
          Make BillSmarter Your Event Financial Manager
        </h2>
        <p>
          Whether it&apos;s the massive upfront cost of the tickets or the smaller on-site expenses for drinks and merch, you can throw it all into BillSmarter. 
        </p>
        <p className="mb-8">
          Once the concert is over and the race is won, hit calculate. Our algorithm will sort through the chaos and provide a clean, optimized list of who needs to pay whom. Focus on the event, and let us handle the accounting!
        </p>

        <div className="bg-blue-50 p-8 rounded-xl text-center border border-blue-100">
          <Link href="/calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300">
            Create a Tab for Your Next Event
          </Link>
        </div>
      </article>
    </div>
  );
}