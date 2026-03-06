import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { Badge } from "@/components/ui/Badge";
import { formatDateShort } from "@/lib/utils";
import type { Post } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos, reflexiones y contenido de Somos Dualidad.",
};

async function getPosts() {
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return (data as Post[]) || [];
}

export default async function BlogPage() {
  const posts = await getPosts();
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))] as string[];

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <div className="grain-overlay bg-brand-title py-20">
        <div className="container-page relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-subtitle" />
            <span className="text-brand-subtitle text-sm font-medium uppercase tracking-widest">Palabras</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-brand-subtitle mb-4">Blog</h1>
          <p className="text-brand-subtitle/60 text-lg max-w-xl">
            Reflexiones, historias y perspectivas sobre la dualidad de la vida.
          </p>
        </div>
      </div>

      <div className="container-page py-16">
        {/* Category filter */}
        {categories.length > 0 && (
          <div className="flex gap-3 mb-12 flex-wrap">
            <span className="text-sm font-medium text-brand-text/70 self-center">Categoría:</span>
            {categories.map((cat) => (
              <button key={cat} className="px-4 py-1.5 rounded-full text-sm border border-brand-title/20 text-brand-title hover:bg-brand-title hover:text-brand-subtitle transition-colors">
                {cat}
              </button>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-24 text-brand-text/50">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-lg font-display">Próximamente...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} featured={i === 0} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PostCard({ post, featured }: { post: Post; featured?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className={featured ? "md:col-span-2 lg:col-span-2" : ""}>
      <article className="group bg-brand-subtitle rounded-3xl overflow-hidden shadow-warm-sm hover:shadow-warm transition-all duration-300 hover:-translate-y-1 h-full">
        <div className={`relative bg-brand-title/10 overflow-hidden ${featured ? "aspect-[21/9]" : "aspect-[16/9]"}`}>
          {post.cover_image_url ? (
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-title/15">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <div className={`p-6 ${featured ? "p-8" : "p-6"}`}>
          {post.category && <Badge variant="terracotta" className="mb-3">{post.category}</Badge>}
          <h2 className={`font-display text-brand-title group-hover:text-brand-text transition-colors leading-snug mb-2 ${featured ? "text-2xl" : "text-xl"}`}>
            {post.title}
          </h2>
          {post.published_at && (
            <p className="text-xs text-brand-text/60 mt-3">{formatDateShort(post.published_at)}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
