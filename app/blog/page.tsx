import type { Metadata } from "next";
import Link from "next/link";
import { formatPostDate, posts } from "./posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides on splitting shared expenses: what counts as fair, how to handle mixed currencies on a trip, and how to raise money with friends without souring the evening.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="prosePage">
      <header style={{ display: "grid", gap: "10px" }}>
        <h1>Guides</h1>
        <p className="lead">
          The parts of shared spending a calculator can&rsquo;t solve — fairness when
          incomes differ, currency fees nobody budgets for, and how to bring up money
          with people you like. Written and edited by{" "}
          <Link href="/about">Mark</Link>.
        </p>
      </header>

      <section style={{ display: "grid", gap: "16px" }}>
        {posts.map((post) => (
          <article key={post.slug} className="card">
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 6px" }}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="proseMeta" style={{ margin: "0 0 10px" }}>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              <span aria-hidden="true"> · </span>
              {post.readingTime}
            </p>
            <p style={{ margin: "0 0 12px", lineHeight: 1.7, color: "#35435a" }}>
              {post.summary}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              style={{ fontWeight: 700, color: "var(--accent)" }}
            >
              Read the guide &rarr;
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
