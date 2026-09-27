import { MetadataRoute } from "next";
import { posts } from "./blog/posts";

export const dynamic = "force-static";

const SITE = "https://billsmarter.app";

/**
 * Each static page carries the date it actually last changed, not `new Date()`
 * and not one shared constant. `new Date()` would tell Google every page
 * changed on every redeploy; a shared constant is what happened here instead,
 * and it went stale, so the sitemap claimed the homepage had not moved since
 * August while it was being rewritten. Update the date on the line you touch.
 *
 * Blog posts do not appear here: their dates come from `updatedAt` in
 * posts.ts, which is already maintained per article.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: SITE, priority: 1, changeFrequency: "weekly", updated: "2026-09-27" },
      { url: `${SITE}/how-it-works`, priority: 0.8, changeFrequency: "monthly", updated: "2026-09-27" },
      { url: `${SITE}/faq`, priority: 0.8, changeFrequency: "monthly", updated: "2026-09-27" },
      { url: `${SITE}/blog`, priority: 0.7, changeFrequency: "weekly", updated: "2026-09-27" },
      { url: `${SITE}/about`, priority: 0.5, changeFrequency: "yearly", updated: "2026-09-27" },
      { url: `${SITE}/contact`, priority: 0.4, changeFrequency: "yearly", updated: "2026-09-10" },
      { url: `${SITE}/privacy`, priority: 0.3, changeFrequency: "yearly", updated: "2026-09-27" },
      { url: `${SITE}/terms`, priority: 0.3, changeFrequency: "yearly", updated: "2026-09-27" },
    ] as const
  ).map(({ updated, ...page }) => ({
    ...page,
    lastModified: new Date(`${updated}T00:00:00Z`),
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...postPages];
}
