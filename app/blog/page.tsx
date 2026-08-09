import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { formatPostDate, posts } from "./posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides on splitting shared expenses: what counts as fair, how to handle mixed currencies on a trip, and how to raise money with friends without souring the evening.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="prosePage blogIndex">
      <header className="blogIndexHeader">
        <p className="contentEyebrow">Field notes / shared money</p>
        <h1>Guides</h1>
        <p className="lead">
          The parts of shared spending a calculator can&rsquo;t solve — fairness when
          incomes differ, currency fees nobody budgets for, and how to bring up money
          with people you like. Written and edited by{" "}
          <Link href="/about">Mark</Link>.
        </p>
      </header>

      <section className="blogGrid" aria-label="BillSmart guides">
        {posts.map((post, index) => (
          <article key={post.slug} className="blogCard">
            <div className="blogCardTopline">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p className="proseMeta">
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                <span aria-hidden="true"> · </span>
                {post.readingTime}
              </p>
            </div>
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="blogCardSummary">{post.summary}</p>
            <Link href={`/blog/${post.slug}`} className="blogCardLink">
              Read article
              <ArrowUpRight size={17} weight="light" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
