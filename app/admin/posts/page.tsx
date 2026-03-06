import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { Badge } from "@/components/ui/Badge";
import { formatDateShort } from "@/lib/utils";

export const metadata: Metadata = { title: "Blog — Admin" };

async function getPosts() {
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select("id, title, slug, status, category, published_at, created_at")
    .order("created_at", { ascending: false });
  return data || [];
}

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-espresso">Blog</h1>
          <p className="text-espresso/50 mt-1">{posts.length} artículos en total</p>
        </div>
        <Link href="/admin/posts/new" className="bg-terracotta text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-terracotta-dark transition-colors shadow-warm-sm">
          + Nuevo artículo
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-warm-sm overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-espresso/40">
            <p className="font-display text-xl mb-2">Sin artículos aún</p>
            <p className="text-sm">Escribe tu primer artículo para empezar.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-espresso/8 text-left">
                <th className="px-6 py-4 text-xs font-semibold text-espresso/50 uppercase tracking-wider">Título</th>
                <th className="px-6 py-4 text-xs font-semibold text-espresso/50 uppercase tracking-wider hidden md:table-cell">Categoría</th>
                <th className="px-6 py-4 text-xs font-semibold text-espresso/50 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-semibold text-espresso/50 uppercase tracking-wider hidden lg:table-cell">Fecha</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-espresso/5">
              {posts.map((post: any) => (
                <tr key={post.id} className="hover:bg-cream/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-espresso text-sm">{post.title}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {post.category && <Badge variant="terracotta">{post.category}</Badge>}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={post.status === "published" ? "success" : "warning"}>
                      {post.status === "published" ? "Publicado" : "Borrador"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-xs text-espresso/40">
                      {post.published_at ? formatDateShort(post.published_at) : formatDateShort(post.created_at)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/posts/${post.id}`} className="text-sm text-terracotta hover:underline">
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
