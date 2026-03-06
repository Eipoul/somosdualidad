import { Metadata } from "next";
import { createClient } from "@/lib/supabase-server";
import { HeroSection } from "@/components/public/HeroSection";
import { FeaturedEpisode } from "@/components/public/FeaturedEpisode";
import { AboutSection } from "@/components/public/AboutSection";
import { LatestPosts } from "@/components/public/LatestPosts";
import { NewsletterStrip } from "@/components/public/NewsletterStrip";
import type { Episode, Post } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Somos Dualidad — El Podcast",
  description:
    "Un podcast que explora las dualidades de la vida: amor y pérdida, fortaleza y vulnerabilidad, tradición y cambio.",
};

async function getHomeData() {
  const supabase = createClient();
  const [episodeRes, postsRes] = await Promise.all([
    supabase
      .from("episodes")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from("posts")
      .select("id, title, slug, cover_image_url, category, published_at, created_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3),
  ]);
  return {
    featuredEpisode: episodeRes.data as Episode | null,
    latestPosts: (postsRes.data as Post[]) || [],
  };
}

export default async function HomePage() {
  const { featuredEpisode, latestPosts } = await getHomeData();

  return (
    <>
      <HeroSection />
      {featuredEpisode && <FeaturedEpisode episode={featuredEpisode} />}
      <AboutSection />
      {latestPosts.length > 0 && <LatestPosts posts={latestPosts} />}
      <NewsletterStrip />
    </>
  );
}
