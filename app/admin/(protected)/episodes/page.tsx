import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { Badge } from "@/components/ui/Badge";
import { formatDateShort } from "@/lib/utils";

export const metadata: Metadata = { title: "Episodios — Admin" };

async function getEpisodes() {
  const supabase = createClient();
  const { data } = await supabase
    .from("episodes")
    .select("id, title, slug, status, published_at, created_at, duration, season")
    .order("created_at", { ascending: false });
  return data || [];
}

export default async function AdminEpisodesPage() {
  const episodes = await getEpisodes();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-espresso">Episodios</h1>
          <p className="text-espresso/50 mt-1">{episodes.length} episodios en total</p>
        </div>
        <Link href="/admin/episodes/new" className="bg-terracotta text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-terracotta-dark transition-colors shadow-warm-sm">
          + Nuevo episodio
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-warm-sm overflow-hidden">
        {episodes.length === 0 ? (
          <div className="text-center py-20 text-espresso/40">
            <p className="font-display text-xl mb-2">Sin episodios aún</p>
            <p className="text-sm">Crea tu primer episodio para empezar.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-espresso/8 text-left">
                <th className="px-6 py-4 text-xs font-semibold text-espresso/50 uppercase tracking-wider">Título</th>
                <th className="px-6 py-4 text-xs font-semibold text-espresso/50 uppercase tracking-wider hidden md:table-cell">Temporada</th>
                <th className="px-6 py-4 text-xs font-semibold text-espresso/50 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-semibold text-espresso/50 uppercase tracking-wider hidden lg:table-cell">Fecha</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-espresso/5">
              {episodes.map((ep: any) => (
                <tr key={ep.id} className="hover:bg-cream/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-espresso text-sm">{ep.title}</span>
                    {ep.duration && <span className="text-xs text-espresso/40 ml-2">{ep.duration}</span>}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {ep.season && <Badge variant="sage">T{ep.season}</Badge>}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={ep.status === "published" ? "success" : "warning"}>
                      {ep.status === "published" ? "Publicado" : "Borrador"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-xs text-espresso/40">
                      {ep.published_at ? formatDateShort(ep.published_at) : formatDateShort(ep.created_at)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/episodes/${ep.id}`} className="text-sm text-terracotta hover:underline">
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
