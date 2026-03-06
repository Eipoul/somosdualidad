"use client";

import type { PageBlock } from "@/lib/utils";
import { Input, Textarea } from "@/components/ui/Input";

interface BlockEditorProps {
  block: PageBlock;
  onChange: (updated: PageBlock) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function BlockEditor({ block, onChange, onDelete, onMoveUp, onMoveDown }: BlockEditorProps) {
  const p = block.props as Record<string, string>;

  const update = (key: string, value: string) => {
    onChange({ ...block, props: { ...block.props, [key]: value } });
  };

  const fields = getFieldsForBlock(block.type);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-warm-sm border border-espresso/8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-espresso capitalize">
          {blockLabels[block.type] || block.type}
        </span>
        <div className="flex gap-1">
          <button onClick={onMoveUp} className="p-1 text-espresso/30 hover:text-espresso transition-colors text-xs" title="Subir">▲</button>
          <button onClick={onMoveDown} className="p-1 text-espresso/30 hover:text-espresso transition-colors text-xs" title="Bajar">▼</button>
          <button onClick={onDelete} className="p-1 text-red-300 hover:text-red-500 transition-colors text-xs ml-2" title="Eliminar">✕</button>
        </div>
      </div>
      <div className="space-y-3">
        {fields.map((field) =>
          field.type === "textarea" ? (
            <Textarea
              key={field.key}
              label={field.label}
              value={p[field.key] || ""}
              onChange={(e) => update(field.key, e.target.value)}
              placeholder={field.placeholder}
              rows={3}
            />
          ) : (
            <Input
              key={field.key}
              label={field.label}
              value={p[field.key] || ""}
              onChange={(e) => update(field.key, e.target.value)}
              placeholder={field.placeholder}
            />
          )
        )}
      </div>
    </div>
  );
}

const blockLabels: Record<string, string> = {
  hero: "Héroe / Banner Principal",
  about: "Sobre Nosotros",
  "episode-feature": "Episodio Destacado",
  "blog-preview": "Vista Previa del Blog",
  "newsletter-cta": "CTA Newsletter",
  "custom-text": "Texto Personalizado",
  "image-text": "Imagen + Texto",
};

function getFieldsForBlock(type: PageBlock["type"]) {
  switch (type) {
    case "hero":
      return [
        { key: "title", label: "Título", type: "input", placeholder: "Somos Dualidad" },
        { key: "subtitle", label: "Subtítulo", type: "input", placeholder: "Un podcast sobre..." },
        { key: "ctaPrimary", label: "Botón principal", type: "input", placeholder: "Escuchar ahora" },
        { key: "ctaSecondary", label: "Botón secundario", type: "input", placeholder: "Suscribirse" },
      ];
    case "about":
      return [
        { key: "title", label: "Título", type: "input", placeholder: "Sobre Nosotros" },
        { key: "description", label: "Descripción", type: "textarea", placeholder: "Historia de la marca..." },
        { key: "imageUrl", label: "URL de foto del host", type: "input", placeholder: "https://..." },
        { key: "ctaLabel", label: "Texto del botón", type: "input", placeholder: "Conocer más" },
      ];
    case "newsletter-cta":
      return [
        { key: "title", label: "Título", type: "input", placeholder: "No te pierdas ningún episodio" },
        { key: "description", label: "Descripción", type: "input", placeholder: "Suscríbete y recibe..." },
        { key: "buttonLabel", label: "Texto del botón", type: "input", placeholder: "Suscribirme" },
      ];
    case "custom-text":
      return [
        { key: "content", label: "Contenido", type: "textarea", placeholder: "Escribe tu texto aquí..." },
      ];
    case "image-text":
      return [
        { key: "title", label: "Título", type: "input", placeholder: "Título de la sección" },
        { key: "description", label: "Descripción", type: "textarea", placeholder: "Descripción..." },
        { key: "imageUrl", label: "URL de imagen", type: "input", placeholder: "https://..." },
        { key: "imagePosition", label: "Posición imagen (left/right)", type: "input", placeholder: "left" },
      ];
    default:
      return [];
  }
}
