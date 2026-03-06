import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/utils";

export const revalidate = 60;

async function getPost(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data as Post | null;
}

async function getRelatedPosts(currentId: string, category: string | null) {
  const supabase = createClient();
  let query = supabase
    .from("posts")
    .select("id, title, slug, cover_image_url, category, published_at")
    .eq("status", "published")
    .neq("id", currentId)
    .order("published_at", { ascending: false })
    .limit(3);
  if (category) query = query.eq("category", category);
  const { data } = await query;
  return (data as Post[]) || [];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Artículo no encontrado" };
  return {
    title: post.title,
    openGraph: { images: post.cover_image_url ? [post.cover_image_url] : [] },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.id, post.category);

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero */}
      {post.cover_image_url && (
        <div className="relative h-72 md:h-96 overflow-hidden">
          <Image src={post.cover_image_url} alt={post.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-bg" />
        </div>
      )}

      <div className="container-page py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-brand-text/60 mb-10">
          <Link href="/" className="hover:text-brand-title transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand-title transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-brand-text truncate max-w-[200px]">{post.title}</span>
        </nav>

        <div className="max-w-2xl mx-auto">
          {post.category && <Badge variant="terracotta" className="mb-6">{post.category}</Badge>}
          <h1 className="font-display text-4xl md:text-5xl text-brand-title leading-tight mb-4">{post.title}</h1>
          {post.published_at && (
            <p className="text-brand-text/70 text-sm mb-12">{formatDate(post.published_at)}</p>
          )}

          {post.content ? (
            <div
              className="prose prose-stone max-w-none prose-headings:font-display prose-a:text-brand-text prose-img:rounded-2xl prose-blockquote:border-brand-text prose-blockquote:text-brand-text"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <p className="text-brand-text/60">Contenido no disponible.</p>
          )}
        </div>

        {/* Subscribe CTA */}
        <div className="max-w-2xl mx-auto mt-16 pt-12 border-t border-brand-title/10">
          <div className="bg-brand-title/10 rounded-3xl p-8 text-center">
            <h3 className="font-display text-2xl text-brand-title mb-2">¿Te gustó este artículo?</h3>
            <p className="text-brand-text mb-6">Suscríbete para recibir más contenido como este.</p>
            <Link href="/subscribe" className="inline-flex items-center justify-center px-6 py-3 bg-brand-title text-brand-subtitle rounded-full font-medium text-sm hover:bg-brand-title/80 transition-colors shadow-warm-sm">
              Suscribirme al newsletter
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl text-brand-title mb-8">También te puede interesar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`}>
                  <article className="group bg-brand-subtitle rounded-2xl overflow-hidden shadow-warm-sm hover:shadow-warm transition-all duration-200">
                    {p.cover_image_url && (
                      <div className="relative aspect-video overflow-hidden">
                        <Image src={p.cover_image_url} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="p-5">
                      {p.category && <Badge variant="terracotta" className="mb-2">{p.category}</Badge>}
                      <h3 className="font-display text-base text-brand-title group-hover:text-brand-text transition-colors leading-snug">{p.title}</h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
