import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'How to Split Restaurant and Bar Bills: A Guide for Big Groups | BillSmarter',
  description: 'Splitting the bill at a restaurant or bar is always awkward, especially when alcohol is involved. Learn the most elegant ways to split the check fairly without ruining the night.',
};

export default function RestaurantBarSplitPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-lg md:prose-xl max-w-none text-gray-800">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
          How to Split Restaurant and Bar Bills: An Elegant Guide for Big Groups
        </h1>
        
        <p className="mb-8 text-gray-600">
          Gathering with friends for a great dinner or a night out at a bar is supposed to be relaxing. But the moment the waiter drops the leather bill folder on the table, the mood often shifts to anxiety. If everyone ordered similar items, an even split is easy. But what if one person ordered an expensive steak and top-shelf whiskey, while another just had a salad and tap water? Here is how to handle the check elegantly.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">The Ultimate Dilemma: The Alcohol Gap</h2>
        <p>
          The biggest source of friction in group dining is alcohol. Imagine your group moves to a cocktail bar. Friend A orders a premium smoky whiskey cocktail, Friend B grabs a craft beer, and Friend C, the designated driver, sticks to soda. Dividing that bill equally is fundamentally unfair to the non-drinker.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">3 Rules for Splitting the Bill Like a Pro</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">Rule 1: Separate the Booze from the Food</h3>
        <p>
          This is the golden rule of group dining. Take the total cost of the shared food (like appetizers and pizzas) and divide it equally among the group. Then, calculate the alcohol separately. If you bought a bottle of wine to share among three people, only those three people split the cost of the bottle.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">Rule 2: Declare "Going Dutch" Before You Order</h3>
        <p>
          If you are dining at an expensive or fine-dining restaurant, set the expectation early. A simple "Hey guys, should we just ask for separate checks or pay for what we order today?" before looking at the menu relieves all pressure. Everyone can then order the lobster or the side salad without feeling guilty or resentful.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">Rule 3: Round Up to Cover Tax and Tip</h3>
        <p>
          Nothing is worse than the person who put their credit card down being left $15 short because people forgot to calculate the service charge, tax, or tip. A great rule of thumb is to calculate your specific total and round up to the nearest $5 or $10. The slight extra goes towards the tip or acts as a thank-you to the person managing the transaction.
        </p>

        <hr className="my-10 border-gray-300" />

        <h2 className="text-3xl font-bold mt-8 mb-4 text-blue-600">
          Let BillSmarter Do the Math While You Enjoy Your Drink
        </h2>
        <p>
          Trying to do complex math after a few cocktails is a recipe for disaster. Stop passing the receipt around the table with your smartphone calculators out.
        </p>
        <p className="mb-8">
          With BillSmarter, you can easily assign specific items (like that expensive whiskey) to specific people, while evenly splitting the shared appetizers. It calculates the exact totals, including tax and tip, in seconds!
        </p>

        <div className="bg-blue-50 p-8 rounded-xl text-center border border-blue-100">
          <Link href="/calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300">
            Open the Bill Splitter Now
          </Link>
        </div>
      </article>
    </div>
  );
}