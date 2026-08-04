import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://billsmarter.app/sitemap.xml",
    host: "https://billsmarter.app",
  };
}
