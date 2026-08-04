import { MetadataRoute } from "next";
import { posts } from "./blog/posts";

const SITE = "https://billsmarter.app";

/**
 * Static pages carry a fixed date instead of `new Date()` so a redeploy
 * doesn't tell Google every page changed.
 */
const PAGES_UPDATED = new Date("2026-08-04");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: SITE, priority: 1, changeFrequency: "weekly" },
      { url: `${SITE}/how-it-works`, priority: 0.8, changeFrequency: "monthly" },
      { url: `${SITE}/faq`, priority: 0.8, changeFrequency: "monthly" },
      { url: `${SITE}/blog`, priority: 0.7, changeFrequency: "weekly" },
      { url: `${SITE}/about`, priority: 0.5, changeFrequency: "yearly" },
      { url: `${SITE}/contact`, priority: 0.4, changeFrequency: "yearly" },
      { url: `${SITE}/privacy`, priority: 0.3, changeFrequency: "yearly" },
      { url: `${SITE}/terms`, priority: 0.3, changeFrequency: "yearly" },
    ] as const satisfies MetadataRoute.Sitemap
  ).map((page) => ({ ...page, lastModified: PAGES_UPDATED }));

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...postPages];
}
