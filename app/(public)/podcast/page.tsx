import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { Badge } from "@/components/ui/Badge";
import { formatDateShort } from "@/lib/utils";
import type { Episode } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Episodios",
  description: "Explora todos los episodios de Somos Dualidad.",
};

async function getEpisodes() {
  const supabase = createClient();
  const { data } = await supabase
    .from("episodes")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return (data as Episode[]) || [];
}

export default async function PodcastPage() {
  const episodes = await getEpisodes();

  // Get unique seasons and tags for filters
  const seasons = [...new Set(episodes.map((e) => e.season).filter(Boolean))].sort() as number[];

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <div className="grain-overlay bg-brand-title py-20">
        <div className="container-page relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-subtitle" />
            <span className="text-brand-subtitle text-sm font-medium uppercase tracking-widest">El Podcast</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-brand-subtitle mb-4">Episodios</h1>
          <p className="text-brand-subtitle/60 text-lg max-w-xl">
            Cada episodio es una conversación honesta sobre lo que nos hace humanos.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-page py-16">
        {/* Season filters */}
        {seasons.length > 0 && (
          <div className="flex gap-3 mb-12 flex-wrap">
            <span className="text-sm font-medium text-brand-text/70 self-center">Temporada:</span>
            {seasons.map((s) => (
              <button key={s} className="px-4 py-1.5 rounded-full text-sm border border-brand-title/20 text-brand-title hover:bg-brand-title hover:text-brand-subtitle transition-colors">
                T{s}
              </button>
            ))}
          </div>
        )}

        {episodes.length === 0 ? (
          <div className="text-center py-24 text-brand-text/50">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <p className="text-lg font-display">Próximamente...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <Link href={`/podcast/${episode.slug}`}>
      <article className="group bg-brand-subtitle rounded-3xl overflow-hidden shadow-warm-sm hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
        {/* Cover art */}
        <div className="relative aspect-square bg-brand-title/10 overflow-hidden">
          {episode.cover_image_url ? (
            <Image
              src={episode.cover_image_url}
              alt={episode.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-brand-title/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          )}
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-brand-title/20">
            <div className="w-14 h-14 bg-brand-title rounded-full flex items-center justify-center shadow-warm-lg">
              <svg className="w-6 h-6 text-brand-subtitle ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex gap-2 flex-wrap mb-3">
            {episode.season && <Badge variant="sage">T{episode.season}</Badge>}
            {episode.duration && <Badge variant="default">{episode.duration}</Badge>}
            {episode.tags?.slice(0, 1).map((tag) => (
              <Badge key={tag} variant="terracotta">{tag}</Badge>
            ))}
          </div>
          <h2 className="font-display text-lg text-brand-title group-hover:text-brand-text transition-colors leading-snug mb-2">
            {episode.title}
          </h2>
          {episode.published_at && (
            <p className="text-xs text-brand-text/60">{formatDateShort(episode.published_at)}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
