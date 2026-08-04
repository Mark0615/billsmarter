import Link from "next/link";
import { formatPostDate, posts } from "./posts";

/**
 * Byline + Article structured data for a blog post.
 * Reads from the shared post list so dates never drift between the
 * article, the index and the sitemap.
 */
export default function PostMeta({ slug }: { slug: string }) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  const url = `https://billsmarter.app/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: "Mark",
      url: "https://billsmarter.app/about",
    },
    publisher: {
      "@type": "Organization",
      name: "BillSmart",
      url: "https://billsmarter.app",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="postByline">
        By{" "}
        <Link href="/about" className="postBylineAuthor">
          Mark
        </Link>
        <span aria-hidden="true"> · </span>
        <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
        {post.updatedAt !== post.publishedAt ? (
          <>
            <span aria-hidden="true"> · </span>
            Updated <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
          </>
        ) : null}
        <span aria-hidden="true"> · </span>
        {post.readingTime}
      </p>
    </>
  );
}
