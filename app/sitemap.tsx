import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://YOUR_DOMAIN.com",
      lastModified: new Date(),
    },
    {
      url: "https://YOUR_DOMAIN.com/calculator",
      lastModified: new Date(),
    },
    {
      url: "https://YOUR_DOMAIN.com/how-it-works",
      lastModified: new Date(),
    },
    {
      url: "https://YOUR_DOMAIN.com/faq",
      lastModified: new Date(),
    },
    {
      url: "https://YOUR_DOMAIN.com/blog",
      lastModified: new Date(),
    },
    {
      url: "https://YOUR_DOMAIN.com/privacy",
      lastModified: new Date(),
    },
    {
      url: "https://YOUR_DOMAIN.com/terms",
      lastModified: new Date(),
    },
    {
      url: "https://YOUR_DOMAIN.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://YOUR_DOMAIN.com/contact",
      lastModified: new Date(),
    },
  ];
}