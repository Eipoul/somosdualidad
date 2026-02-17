import type { MetadataRoute } from "next";
import { siteContent } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = siteContent.seo.siteUrl.replace("TODO: ", "https://example.com");

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
