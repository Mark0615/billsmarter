import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://billsmarter.app",
      lastModified: new Date(),
    },
    {
      url: "https://billsmarter.app/calculator",
      lastModified: new Date(),
    },
    {
      url: "https://billsmarter.app/how-it-works",
      lastModified: new Date(),
    },
    {
      url: "https://billsmarter.app/faq",
      lastModified: new Date(),
    },
    {
      url: "https://billsmarter.app/blog",
      lastModified: new Date(),
    },
    {
      url: "https://billsmarter.app/privacy",
      lastModified: new Date(),
    },
    {
      url: "https://billsmarter.app/terms",
      lastModified: new Date(),
    },
    {
      url: "https://billsmarter.app/about",
      lastModified: new Date(),
    },
    {
      url: "https://billsmarter.app/contact",
      lastModified: new Date(),
    },
  ];
}