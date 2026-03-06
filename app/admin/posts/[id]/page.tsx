"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { generateSlug } from "@/lib/utils";
import type { Post } from "@/lib/utils";

const emptyPost: Partial<Post> = {
  title: "",
  slug: "",
  content: "",
  cover_image_url: "",
  category: "",
  status: "draft",
};

export default function PostEditorPage() {
  const { id } = useParams();
  const isNew = id === "new";
  const router = useRouter();
  const supabase = createClient();

  const [post, setPost] = useState<Partial<Post>>(emptyPost);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isNew) {
      supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single()
        .then(({ data }) => {
          if (data) setPost(data);
          setLoading(false);
        });
    }
  }, [id, isNew]);

  const updateField = useCallback((field: keyof Post, value: unknown) => {
    setPost((prev) => ({ ...prev, [field]: value }));
  }, []);

  async function handleSave(publish = false) {
    if (!post.title) return setError("El título es obligatorio.");
    if (!post.slug) return setError("El slug es obligatorio.");
    setError("");
    setSaving(true);

    const payload = {
      ...post,
      status: publish ? "published" : post.status,
      published_at: publish ? new Date().toISOString() : post.published_at,
    };

    const { data, error: dbError } = isNew
      ? await supabase.from("posts").insert(payload).select().single()
      : await supabase.from("posts").update(payload).eq("id", id as string).select().single();

    setSaving(false);
    if (dbError) return setError(dbError.message);

    setSuccess("Guardado correctamente.");
    if (isNew && data) router.replace(`/admin/posts/${data.id}`);
    setTimeout(() => setSuccess(""), 3000);
  }

  async function handleDelete() {
    if (!confirm("¿Eliminar este artículo? Esta acción no se puede deshacer.")) return;
    await supabase.from("posts").delete().eq("id", id as string);
    router.push("/admin/posts");
  }

  if (loading) return <div className="animate-pulse p-8 text-espresso/40">Cargando...</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <button onClick={() => router.back()} className="text-sm text-espresso/50 hover:text-espresso mb-2 flex items-center gap-1">
            ← Volver
          </button>
          <h1 className="font-display text-3xl text-espresso">{isNew ? "Nuevo artículo" : "Editar artículo"}</h1>
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
          <Button onClick={() => handleSave(true)} loading={saving}>
            {post.status === "published" ? "Actualizar" : "Publicar"}
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
              value={post.title || ""}
              onChange={(e) => {
                updateField("title", e.target.value);
                if (isNew) updateField("slug", generateSlug(e.target.value));
              }}
            />
            <Input
              label="Slug *"
              value={post.slug || ""}
              onChange={(e) => updateField("slug", e.target.value)}
              hint="URL-friendly, ej: amor-y-perdida"
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-warm-sm">
            <label className="text-sm font-medium text-espresso block mb-3">Contenido</label>
            <RichTextEditor
              content={post.content || ""}
              onChange={(html) => updateField("content", html)}
              placeholder="Escribe tu artículo aquí..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-5 shadow-warm-sm space-y-4">
            <h3 className="font-medium text-espresso text-sm uppercase tracking-wide">Detalles</h3>
            <Select
              label="Estado"
              value={post.status || "draft"}
              onChange={(e) => updateField("status", e.target.value)}
              options={[
                { value: "draft", label: "Borrador" },
                { value: "published", label: "Publicado" },
              ]}
            />
            <Input
              label="Categoría"
              value={post.category || ""}
              onChange={(e) => updateField("category", e.target.value)}
              placeholder="ej: Reflexiones"
            />
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-warm-sm space-y-4">
            <h3 className="font-medium text-espresso text-sm uppercase tracking-wide">Imagen</h3>
            <Input
              label="URL de imagen de portada"
              value={post.cover_image_url || ""}
              onChange={(e) => updateField("cover_image_url", e.target.value)}
              placeholder="https://..."
            />
            {post.cover_image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.cover_image_url} alt="Preview" className="w-full aspect-video object-cover rounded-xl" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
