export const metadata = {
  title: "Best Way to Split Group Dinner Bills",
  description:
    "Stop arguing over restaurant bills. Learn smarter ways to split group meals.",
};

export default function Blog2() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Best Way to Split Group Dinner Bills
      </h1>

      <p>
        Splitting dinner bills can be awkward, especially when not everyone
        orders the same items.
      </p>

      <h2 className="text-xl font-semibold">Three Common Methods</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Equal split</li>
        <li>Itemized split</li>
        <li>One person pays, settle later</li>
      </ul>

      <p>
        The most flexible solution is recording who benefited and calculating
        afterward.
      </p>
    </main>
  );
}