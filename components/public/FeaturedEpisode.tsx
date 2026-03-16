import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Episode } from "@/lib/utils";

export function FeaturedEpisode({ episode }: { episode: Episode }) {
  return (
    <section className="py-24 bg-brand-blush">
      <div className="container-page">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-px bg-brand-title" />
          <span className="text-brand-title text-sm font-medium uppercase tracking-widest">Episodio Destacado</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Cover */}
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-warm-lg">
            {episode.cover_image_url ? (
              <Image
                src={episode.cover_image_url}
                alt={episode.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-brand-title/10 flex items-center justify-center">
                <svg className="w-20 h-20 text-brand-title/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              <Badge variant="terracotta">Nuevo episodio</Badge>
              {episode.season && <Badge variant="sage">Temporada {episode.season}</Badge>}
              {episode.duration && <Badge variant="default">{episode.duration}</Badge>}
            </div>

            <h2 className="font-display text-4xl text-brand-title leading-tight">{episode.title}</h2>

            {episode.published_at && (
              <p className="text-sm text-brand-text/70">{formatDate(episode.published_at)}</p>
            )}

            {episode.description && (
              <p className="text-brand-text leading-relaxed">{episode.description}</p>
            )}

            {/* Embed player or audio */}
            {episode.embed_url ? (
              <div className="rounded-2xl overflow-hidden">
                <iframe
                  src={episode.embed_url}
                  className="w-full h-20"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                />
              </div>
            ) : episode.audio_url ? (
              <audio controls className="w-full rounded-xl">
                <source src={episode.audio_url} type="audio/mpeg" />
              </audio>
            ) : null}

            <div className="flex gap-3">
              <Link href={`/podcast/${episode.slug}`}>
                <Button className="bg-brand-title text-brand-subtitle hover:bg-brand-title/80">Ver episodio completo</Button>
              </Link>
              <Link href="/podcast">
                <Button variant="ghost" className="text-brand-title hover:bg-brand-title/10">Todos los episodios</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
