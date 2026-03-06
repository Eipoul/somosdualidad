"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { BlockPreview } from "@/components/builder/BlockPreview";
import { BlockEditor } from "@/components/builder/BlockEditor";
import type { PageBlock } from "@/lib/utils";

const blockTypes: { type: PageBlock["type"]; label: string; icon: string }[] = [
  { type: "hero", label: "Héroe", icon: "🦸" },
  { type: "about", label: "Sobre Nosotros", icon: "👤" },
  { type: "episode-feature", label: "Episodio Destacado", icon: "🎙️" },
  { type: "blog-preview", label: "Blog Preview", icon: "📝" },
  { type: "newsletter-cta", label: "Newsletter CTA", icon: "💌" },
  { type: "custom-text", label: "Texto Libre", icon: "✍️" },
  { type: "image-text", label: "Imagen + Texto", icon: "🖼️" },
];

function createBlock(type: PageBlock["type"], order: number): PageBlock {
  return {
    id: `block-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type,
    props: {},
    order,
  };
}

export default function BuilderPage() {
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    fetch("/api/page-config?page=home")
      .then((r) => r.json())
      .then((data) => {
        if (data?.config) setBlocks(data.config);
      })
      .catch(() => {});
  }, []);

  const selectedBlock = blocks.find((b) => b.id === selectedId) || null;

  function addBlock(type: PageBlock["type"]) {
    const block = createBlock(type, blocks.length);
    setBlocks((prev) => [...prev, block]);
    setSelectedId(block.id);
  }

  function updateBlock(updated: PageBlock) {
    setBlocks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }

  function deleteBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function moveBlock(id: string, dir: "up" | "down") {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if ((dir === "up" && idx === 0) || (dir === "down" && idx === prev.length - 1)) return prev;
      const newBlocks = [...prev];
      const swapIdx = dir === "up" ? idx - 1 : idx + 1;
      [newBlocks[idx], newBlocks[swapIdx]] = [newBlocks[swapIdx], newBlocks[idx]];
      return newBlocks.map((b, i) => ({ ...b, order: i }));
    });
  }

  async function handlePublish() {
    setSaving(true);
    const res = await fetch("/api/page-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "home", config: blocks }),
    });
    setSaving(false);
    if (res.ok) {
      setSuccess("Cambios publicados.");
      setTimeout(() => setSuccess(""), 3000);
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-8 overflow-hidden">
      {/* Left: Block palette + editor */}
      <div className="w-72 flex-shrink-0 bg-white border-r border-espresso/8 flex flex-col overflow-hidden">
        {/* Palette */}
        <div className="p-4 border-b border-espresso/8">
          <h2 className="font-medium text-espresso text-sm mb-3">Agregar bloque</h2>
          <div className="grid grid-cols-2 gap-2">
            {blockTypes.map((bt) => (
              <button
                key={bt.type}
                onClick={() => addBlock(bt.type)}
                className="flex flex-col items-center gap-1 p-2 rounded-xl border border-espresso/10 text-espresso/60 hover:bg-terracotta/5 hover:border-terracotta/30 hover:text-espresso transition-all text-xs"
              >
                <span className="text-lg">{bt.icon}</span>
                <span className="text-center leading-tight">{bt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Block editor */}
        <div className="flex-1 p-4 overflow-y-auto">
          {selectedBlock ? (
            <BlockEditor
              block={selectedBlock}
              onChange={updateBlock}
              onDelete={() => deleteBlock(selectedBlock.id)}
              onMoveUp={() => moveBlock(selectedBlock.id, "up")}
              onMoveDown={() => moveBlock(selectedBlock.id, "down")}
            />
          ) : (
            <div className="text-center py-8 text-espresso/30 text-sm">
              Selecciona un bloque para editarlo
            </div>
          )}
        </div>
      </div>

      {/* Center: Canvas */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 bg-cream border-b border-espresso/8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreview("desktop")}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${preview === "desktop" ? "bg-espresso text-cream" : "text-espresso/50 hover:text-espresso"}`}
            >
              🖥 Desktop
            </button>
            <button
              onClick={() => setPreview("mobile")}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${preview === "mobile" ? "bg-espresso text-cream" : "text-espresso/50 hover:text-espresso"}`}
            >
              📱 Mobile
            </button>
          </div>
          <div className="flex items-center gap-3">
            {success && <span className="text-sm text-green-600">{success}</span>}
            <Button onClick={handlePublish} loading={saving}>
              Publicar cambios
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto bg-espresso/5 p-6">
          <div className={`mx-auto transition-all duration-300 bg-cream rounded-2xl shadow-warm-lg overflow-hidden ${preview === "mobile" ? "max-w-sm" : "max-w-full"}`}>
            {blocks.length === 0 ? (
              <div className="text-center py-20 text-espresso/30">
                <div className="text-4xl mb-4">🎨</div>
                <p>Agrega bloques desde el panel izquierdo para construir tu página.</p>
              </div>
            ) : (
              <div>
                {blocks.map((block) => (
                  <BlockPreview
                    key={block.id}
                    block={block}
                    isSelected={selectedId === block.id}
                    onSelect={() => setSelectedId(block.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
