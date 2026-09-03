import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import PostMeta from '../PostMeta';

export const metadata: Metadata = {
  title: 'How to Split Restaurant and Bar Bills: A Guide for Big Groups',
  description: 'The alcohol gap, the person who only had a salad, and the tip nobody accounts for. How to split a restaurant or bar check fairly without ruining the night.',
  alternates: { canonical: '/blog/how-to-split-restaurant-and-bar-bills' },
};

export default function RestaurantBarSplitPage() {
  return (
    <div className="prosePage blogArticle">
      <article>
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
          How to Split Restaurant and Bar Bills: An Elegant Guide for Big Groups
        </h1>

        <PostMeta slug="how-to-split-restaurant-and-bar-bills" />

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

        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">Rule 2: Declare &quot;Going Dutch&quot; Before You Order</h3>
        <p>
          If you are dining at an expensive or fine-dining restaurant, set the expectation early. A simple &quot;Hey guys, should we just ask for separate checks or pay for what we order today?&quot; before looking at the menu relieves all pressure. Everyone can then order the lobster or the side salad without feeling guilty or resentful.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">Rule 3: Round Up to Cover Tax and Tip</h3>
        <p>
          Nothing is worse than the person who put their credit card down being left $15 short because people forgot to calculate the service charge, tax, or tip. A great rule of thumb is to calculate your specific total and round up to the nearest $5 or $10. The slight extra goes towards the tip or acts as a thank-you to the person managing the transaction.
        </p>

        <hr className="my-10 border-gray-300" />

        <h2 className="text-3xl font-bold mt-8 mb-4 text-blue-600">
          Let BillSmart Do the Math While You Enjoy Your Drink
        </h2>
        <p>
          Trying to do complex math after a few cocktails is a recipe for disaster. Stop passing the receipt around the table with your smartphone calculators out.
        </p>
        <p className="mb-8">
          That is what the calculator is for. Enter the shared food as one payment covering everyone, then the bottle of wine as a second payment covering only the three people who drank it &mdash; the same bill, two entries. Enter each amount as it was actually paid, tax and service included, so the extras are shared in the same proportion as the meal instead of quietly landing on whoever held the card. What comes back is a list of who pays whom, using the fewest transfers.
        </p>

                <section className="articleWorked">
          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">Worked example</h2>
          <p>
            Rule 1 in practice. The shared food is one payment covering all four; the bottle of wine is a second payment covering only the three who drank it. Both amounts are the receipt totals, tax and service included.
          </p>
          <figure className="articleFigure">
            <Image
              src="/blog/how-to-split-restaurant-and-bar-bills.webp"
              alt="BillSmart result panel showing shared food split four ways and a bottle of wine split between three of the four."
              width={1350}
              height={1116}
              sizes="(max-width: 900px) 92vw, 820px"
            />
            <figcaption>
              Settled in USD: Chloe pays Ana $70.00; Dan pays Ana $28.00 and Ben $14.00. Dan, who did not drink, pays $42.00 in total &mdash; his share of the food and nothing else.
            </figcaption>
          </figure>
        </section>

        <div className="articleCta">
          <Link href="/" className="articleCtaButton">
            Open the Bill Splitter Now
          </Link>
        </div>
      </article>
    </div>
  );
}
