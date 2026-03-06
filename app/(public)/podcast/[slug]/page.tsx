import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import type { Episode } from "@/lib/utils";

export const revalidate = 60;

async function getEpisode(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("episodes")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data as Episode | null;
}

async function getRelatedEpisodes(currentId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("episodes")
    .select("id, title, slug, cover_image_url, duration, published_at")
    .eq("status", "published")
    .neq("id", currentId)
    .order("published_at", { ascending: false })
    .limit(3);
  return (data as Episode[]) || [];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const episode = await getEpisode(params.slug);
  if (!episode) return { title: "Episodio no encontrado" };
  return {
    title: episode.title,
    description: episode.description || undefined,
    openGraph: {
      images: episode.cover_image_url ? [episode.cover_image_url] : [],
    },
  };
}

export default async function EpisodePage({ params }: { params: { slug: string } }) {
  const episode = await getEpisode(params.slug);
  if (!episode) notFound();

  const related = await getRelatedEpisodes(episode.id);

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="container-page py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-brand-text/60 mb-10">
          <Link href="/" className="hover:text-brand-title transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/podcast" className="hover:text-brand-title transition-colors">Podcast</Link>
          <span>/</span>
          <span className="text-brand-text truncate max-w-[200px]">{episode.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex flex-wrap gap-2 mb-6">
              {episode.season && <Badge variant="sage">Temporada {episode.season}</Badge>}
              {episode.duration && <Badge variant="default">{episode.duration}</Badge>}
              {episode.tags?.map((tag) => <Badge key={tag} variant="terracotta">{tag}</Badge>)}
            </div>

            <h1 className="font-display text-4xl md:text-5xl text-brand-title leading-tight mb-4">
              {episode.title}
            </h1>

            {episode.published_at && (
              <p className="text-brand-text/70 text-sm mb-8">{formatDate(episode.published_at)}</p>
            )}

            {/* Player */}
            {episode.embed_url ? (
              <div className="rounded-2xl overflow-hidden mb-8 shadow-warm-sm">
                <iframe
                  src={episode.embed_url}
                  className="w-full h-20"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                />
              </div>
            ) : episode.audio_url ? (
              <audio controls className="w-full rounded-xl mb-8">
                <source src={episode.audio_url} type="audio/mpeg" />
              </audio>
            ) : null}

            {/* Description */}
            {episode.description && (
              <div className="bg-brand-subtitle rounded-2xl p-6 mb-8 shadow-warm-sm">
                <p className="text-brand-text leading-relaxed">{episode.description}</p>
              </div>
            )}

            {/* Show notes */}
            {episode.show_notes && (
              <div className="bg-brand-subtitle rounded-2xl p-8 shadow-warm-sm">
                <h2 className="font-display text-2xl text-brand-title mb-6">Notas del episodio</h2>
                <div
                  className="prose prose-stone max-w-none prose-headings:font-display prose-a:text-brand-text"
                  dangerouslySetInnerHTML={{ __html: episode.show_notes }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Cover */}
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-warm-lg mb-8 sticky top-24">
              {episode.cover_image_url ? (
                <Image src={episode.cover_image_url} alt={episode.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-brand-title/10 flex items-center justify-center">
                  <svg className="w-16 h-16 text-brand-title/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
              )}
            </div>

            {/* Subscribe CTA */}
            <div className="bg-brand-title/10 rounded-2xl p-6 mb-8">
              <h3 className="font-display text-xl text-brand-title mb-2">No te pierdas nada</h3>
              <p className="text-sm text-brand-text mb-4">Recibe cada episodio nuevo en tu correo.</p>
              <Link href="/subscribe">
                <Button className="w-full bg-brand-title text-brand-subtitle hover:bg-brand-title/80">Suscribirse</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related episodes */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-brand-title/10">
            <h2 className="font-display text-2xl text-brand-title mb-8">Otros episodios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((ep) => (
                <Link key={ep.id} href={`/podcast/${ep.slug}`}>
                  <div className="group bg-brand-subtitle rounded-2xl overflow-hidden shadow-warm-sm hover:shadow-warm transition-all duration-200 hover:-translate-y-0.5 flex gap-4 p-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-brand-title/10">
                      {ep.cover_image_url && (
                        <Image src={ep.cover_image_url} alt={ep.title} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-brand-title group-hover:text-brand-text transition-colors line-clamp-2 leading-snug">
                        {ep.title}
                      </h3>
                      {ep.duration && <p className="text-xs text-brand-text/60 mt-1">{ep.duration}</p>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
