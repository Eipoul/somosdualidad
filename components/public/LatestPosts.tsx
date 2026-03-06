import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDateShort } from "@/lib/utils";
import type { Post } from "@/lib/utils";

export function LatestPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="py-24 bg-cream">
      <div className="container-page">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-terracotta" />
            <span className="text-terracotta text-sm font-medium uppercase tracking-widest">Del Blog</span>
          </div>
          <Link href="/blog" className="text-sm font-medium text-espresso/60 hover:text-espresso transition-colors">
            Ver todo →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="group bg-white rounded-3xl overflow-hidden shadow-warm-sm hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
                {/* Cover */}
                <div className="relative aspect-[16/9] bg-gradient-to-br from-sage/20 to-cream-200 overflow-hidden">
                  {post.cover_image_url ? (
                    <Image
                      src={post.cover_image_url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-espresso/20">
                      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {post.category && (
                    <Badge variant="terracotta" className="mb-3">{post.category}</Badge>
                  )}
                  <h3 className="font-display text-xl text-espresso mb-2 group-hover:text-terracotta transition-colors leading-snug">
                    {post.title}
                  </h3>
                  {post.published_at && (
                    <p className="text-xs text-espresso/40 mt-3">{formatDateShort(post.published_at)}</p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
