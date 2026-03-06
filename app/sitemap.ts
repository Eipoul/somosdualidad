import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://somosdualidad.com";
  const supabase = createClient();

  const [episodesRes, postsRes] = await Promise.all([
    supabase.from("episodes").select("slug, published_at").eq("status", "published"),
    supabase.from("posts").select("slug, published_at").eq("status", "published"),
  ]);

  const episodes = (episodesRes.data || []).map((ep) => ({
    url: `${baseUrl}/podcast/${ep.slug}`,
    lastModified: ep.published_at ? new Date(ep.published_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const posts = (postsRes.data || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/podcast`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/subscribe`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...episodes,
    ...posts,
  ];
}
