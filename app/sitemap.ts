import type { MetadataRoute } from "next";
import { siteContent } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteContent.seo.siteUrl.replace("TODO: ", "https://example.com");

  return ["", "/sobre", "/contacto", "/recursos"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7
  }));
}
