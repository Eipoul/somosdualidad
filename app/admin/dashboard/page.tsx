import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { formatDateShort } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats() {
  const supabase = createClient();
  const [episodes, posts, subscribers, drafts] = await Promise.all([
    supabase.from("episodes").select("id", { count: "exact" }).eq("status", "published"),
    supabase.from("posts").select("id", { count: "exact" }).eq("status", "published"),
    supabase.from("subscribers").select("id", { count: "exact" }).eq("status", "active"),
    supabase.from("episodes").select("id", { count: "exact" }).eq("status", "draft"),
  ]);
  return {
    episodes: episodes.count || 0,
    posts: posts.count || 0,
    subscribers: subscribers.count || 0,
    drafts: drafts.count || 0,
  };
}

async function getRecentContent() {
  const supabase = createClient();
  const [episodesRes, postsRes] = await Promise.all([
    supabase.from("episodes").select("id, title, status, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("posts").select("id, title, status, created_at").order("created_at", { ascending: false }).limit(5),
  ]);
  return {
    episodes: episodesRes.data || [],
    posts: postsRes.data || [],
  };
}

export default async function DashboardPage() {
  const [stats, recent] = await Promise.all([getStats(), getRecentContent()]);

  const statCards = [
    { label: "Episodios publicados", value: stats.episodes, href: "/admin/episodes", color: "bg-terracotta/10 text-terracotta" },
    { label: "Posts publicados", value: stats.posts, href: "/admin/posts", color: "bg-sage/15 text-sage-dark" },
    { label: "Suscriptores activos", value: stats.subscribers, href: "/admin/subscribers", color: "bg-rose-dusty/20 text-rose-dark" },
    { label: "Borradores", value: stats.drafts, href: "/admin/episodes", color: "bg-espresso/8 text-espresso" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-espresso">Dashboard</h1>
        <p className="text-espresso/50 mt-1">Bienvenida de vuelta.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className={`rounded-2xl p-5 ${card.color} bg-opacity-10 hover:scale-[1.02] transition-transform cursor-pointer`}>
              <div className="text-3xl font-display font-bold mb-1">{card.value}</div>
              <div className="text-sm opacity-80">{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Nuevo episodio", href: "/admin/episodes/new", icon: "🎙️" },
          { label: "Nuevo post", href: "/admin/posts/new", icon: "✍️" },
          { label: "Editar página principal", href: "/admin/builder", icon: "🎨" },
        ].map((action) => (
          <Link key={action.label} href={action.href}>
            <div className="bg-white rounded-2xl p-5 shadow-warm-sm hover:shadow-warm transition-all duration-200 flex items-center gap-4 group">
              <span className="text-2xl">{action.icon}</span>
              <span className="font-medium text-espresso group-hover:text-terracotta transition-colors">{action.label}</span>
              <svg className="w-4 h-4 text-espresso/30 ml-auto group-hover:text-terracotta transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-warm-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg text-espresso">Episodios recientes</h2>
            <Link href="/admin/episodes" className="text-xs text-terracotta hover:underline">Ver todos</Link>
          </div>
          <div className="space-y-3">
            {recent.episodes.map((ep: any) => (
              <Link key={ep.id} href={`/admin/episodes/${ep.id}`}>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition-colors group">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ep.status === "published" ? "bg-green-400" : "bg-amber-400"}`} />
                  <span className="text-sm text-espresso group-hover:text-terracotta transition-colors truncate">{ep.title}</span>
                  <span className="text-xs text-espresso/30 ml-auto flex-shrink-0">{formatDateShort(ep.created_at)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-warm-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg text-espresso">Posts recientes</h2>
            <Link href="/admin/posts" className="text-xs text-terracotta hover:underline">Ver todos</Link>
          </div>
          <div className="space-y-3">
            {recent.posts.map((post: any) => (
              <Link key={post.id} href={`/admin/posts/${post.id}`}>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition-colors group">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${post.status === "published" ? "bg-green-400" : "bg-amber-400"}`} />
                  <span className="text-sm text-espresso group-hover:text-terracotta transition-colors truncate">{post.title}</span>
                  <span className="text-xs text-espresso/30 ml-auto flex-shrink-0">{formatDateShort(post.created_at)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
