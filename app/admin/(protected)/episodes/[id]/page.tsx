"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { generateSlug } from "@/lib/utils";
import type { Episode } from "@/lib/utils";

const emptyEpisode: Partial<Episode> = {
  title: "",
  slug: "",
  description: "",
  show_notes: "",
  cover_image_url: "",
  audio_url: "",
  embed_url: "",
  duration: "",
  season: undefined,
  tags: [],
  status: "draft",
  published_at: undefined,
};

export default function EpisodeEditorPage() {
  const { id } = useParams();
  const isNew = id === "new";
  const router = useRouter();
  const supabase = createClient();

  const [episode, setEpisode] = useState<Partial<Episode>>(emptyEpisode);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isNew) {
      supabase
        .from("episodes")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data }) => {
          if (data) setEpisode(data);
          setLoading(false);
        });
    }
  }, [id, isNew]);

  const updateField = useCallback((field: keyof Episode, value: unknown) => {
    setEpisode((prev) => ({ ...prev, [field]: value }));
  }, []);

  async function handleSave(publish = false) {
    if (!episode.title) return setError("El título es obligatorio.");
    if (!episode.slug) return setError("El slug es obligatorio.");
    setError("");
    setSaving(true);

    const payload: Partial<Episode> = {
      ...episode,
      status: publish ? "published" : episode.status,
      published_at: publish ? new Date().toISOString() : episode.published_at,
    };

    const { data, error: dbError } = isNew
      ? await supabase.from("episodes").insert(payload).select().single()
      : await supabase.from("episodes").update(payload).eq("id", id as string).select().single();

    setSaving(false);
    if (dbError) return setError(dbError.message);

    if (publish && data) {
      setPublishing(true);
      await fetch(`/api/episodes/${data.id}/publish`, { method: "POST" });
      setPublishing(false);
    }

    setSuccess("Guardado correctamente.");
    if (isNew && data) router.replace(`/admin/episodes/${data.id}`);
    setTimeout(() => setSuccess(""), 3000);
  }

  async function handleDelete() {
    if (!confirm("¿Eliminar este episodio? Esta acción no se puede deshacer.")) return;
    await supabase.from("episodes").delete().eq("id", id as string);
    router.push("/admin/episodes");
  }

  if (loading) return <div className="animate-pulse p-8 text-espresso/40">Cargando...</div>;

  const tagsString = episode.tags?.join(", ") || "";

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <button onClick={() => router.back()} className="text-sm text-espresso/50 hover:text-espresso mb-2 flex items-center gap-1">
            ← Volver
          </button>
          <h1 className="font-display text-3xl text-espresso">{isNew ? "Nuevo episodio" : "Editar episodio"}</h1>
        </div>
        <div className="flex gap-3">
          {!isNew && (
            <Button variant="ghost" onClick={handleDelete} className="text-red-500 hover:bg-red-50">
              Eliminar
            </Button>
          )}
          <Button variant="outline" onClick={() => handleSave(false)} loading={saving}>
            Guardar borrador
          </Button>
          <Button onClick={() => handleSave(true)} loading={publishing || saving}>
            {episode.status === "published" ? "Actualizar" : "Publicar"}
          </Button>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">{success}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-warm-sm space-y-5">
            <Input
              label="Título *"
              value={episode.title || ""}
              onChange={(e) => {
                updateField("title", e.target.value);
                if (isNew) updateField("slug", generateSlug(e.target.value));
              }}
            />
            <Input
              label="Slug *"
              value={episode.slug || ""}
              onChange={(e) => updateField("slug", e.target.value)}
              hint="URL-friendly, ej: episodio-01-dualidad"
            />
            <Textarea
              label="Descripción"
              value={episode.description || ""}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-warm-sm">
            <label className="text-sm font-medium text-espresso block mb-3">Notas del episodio</label>
            <RichTextEditor
              content={episode.show_notes || ""}
              onChange={(html) => updateField("show_notes", html)}
              placeholder="Escribe las notas del episodio aquí..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-5 shadow-warm-sm space-y-4">
            <h3 className="font-medium text-espresso text-sm uppercase tracking-wide">Detalles</h3>
            <Select
              label="Estado"
              value={episode.status || "draft"}
              onChange={(e) => updateField("status", e.target.value)}
              options={[
                { value: "draft", label: "Borrador" },
                { value: "published", label: "Publicado" },
              ]}
            />
            <Input
              label="Duración"
              value={episode.duration || ""}
              onChange={(e) => updateField("duration", e.target.value)}
              placeholder="ej: 45 min"
            />
            <Input
              label="Temporada"
              type="number"
              value={episode.season?.toString() || ""}
              onChange={(e) => updateField("season", e.target.value ? parseInt(e.target.value) : null)}
              placeholder="ej: 1"
            />
            <Input
              label="Etiquetas"
              value={tagsString}
              onChange={(e) => updateField("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
              placeholder="ej: amor, crecimiento, duelo"
              hint="Separadas por comas"
            />
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-warm-sm space-y-4">
            <h3 className="font-medium text-espresso text-sm uppercase tracking-wide">Media</h3>
            <Input
              label="URL de imagen de portada"
              value={episode.cover_image_url || ""}
              onChange={(e) => updateField("cover_image_url", e.target.value)}
              placeholder="https://..."
            />
            <Input
              label="URL de audio"
              value={episode.audio_url || ""}
              onChange={(e) => updateField("audio_url", e.target.value)}
              placeholder="https://...mp3"
            />
            <Input
              label="URL de embed (Spotify/Apple)"
              value={episode.embed_url || ""}
              onChange={(e) => updateField("embed_url", e.target.value)}
              placeholder="https://open.spotify.com/embed/..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
