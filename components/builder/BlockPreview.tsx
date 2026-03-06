import type { PageBlock } from "@/lib/utils";

interface BlockPreviewProps {
  block: PageBlock;
  isSelected: boolean;
  onSelect: () => void;
}

export function BlockPreview({ block, isSelected, onSelect }: BlockPreviewProps) {
  const p = block.props as Record<string, string>;

  return (
    <div
      onClick={onSelect}
      className={`relative border-2 rounded-xl transition-all cursor-pointer mb-3 overflow-hidden ${
        isSelected ? "border-terracotta ring-2 ring-terracotta/20" : "border-transparent hover:border-espresso/20"
      }`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-terracotta text-white text-xs px-2 py-0.5 rounded-full z-10">
          Editando
        </div>
      )}
      <BlockContent block={block} props={p} />
    </div>
  );
}

function BlockContent({ block, props: p }: { block: PageBlock; props: Record<string, string> }) {
  switch (block.type) {
    case "hero":
      return (
        <div className="bg-espresso text-cream p-8 text-center min-h-[120px] flex flex-col items-center justify-center gap-2">
          <div className="text-xl font-display">{p.title || "Título Principal"}</div>
          <div className="text-sm opacity-60">{p.subtitle || "Subtítulo del podcast"}</div>
          <div className="flex gap-2 mt-2">
            <span className="bg-terracotta text-white text-xs px-3 py-1 rounded-full">{p.ctaPrimary || "Escuchar"}</span>
            <span className="border border-cream/30 text-xs px-3 py-1 rounded-full">{p.ctaSecondary || "Suscribirse"}</span>
          </div>
        </div>
      );
    case "about":
      return (
        <div className="bg-cream-200 p-6 flex gap-4 items-center min-h-[80px]">
          <div className="w-12 h-12 rounded-full bg-sage/30 flex-shrink-0 flex items-center justify-center text-espresso/30">👤</div>
          <div>
            <div className="text-sm font-medium text-espresso">{p.title || "Sobre Nosotros"}</div>
            <div className="text-xs text-espresso/50 mt-0.5">{p.description || "Historia de la marca..."}</div>
          </div>
        </div>
      );
    case "newsletter-cta":
      return (
        <div className="bg-terracotta/20 p-6 text-center min-h-[80px] flex flex-col items-center justify-center gap-2">
          <div className="text-sm font-medium text-espresso">{p.title || "Suscríbete al newsletter"}</div>
          <div className="flex gap-2">
            <span className="bg-white border border-espresso/20 text-xs px-3 py-1 rounded-full text-espresso/40">tu@correo.com</span>
            <span className="bg-terracotta text-white text-xs px-3 py-1 rounded-full">Suscribirse</span>
          </div>
        </div>
      );
    case "custom-text":
      return (
        <div className="bg-white p-6 min-h-[60px]">
          <div className="text-sm text-espresso">{p.content || "Texto personalizado..."}</div>
        </div>
      );
    case "image-text":
      return (
        <div className="bg-cream-200 p-4 flex gap-4 items-center min-h-[80px]">
          <div className="w-24 h-16 bg-espresso/10 rounded-xl flex-shrink-0 flex items-center justify-center text-espresso/20 text-2xl">🖼️</div>
          <div>
            <div className="text-sm font-medium text-espresso">{p.title || "Imagen + Texto"}</div>
            <div className="text-xs text-espresso/50 mt-0.5">{p.description || "Descripción..."}</div>
          </div>
        </div>
      );
    default:
      return (
        <div className="bg-sage/10 p-4 text-center text-sm text-espresso/40">
          Bloque: {block.type}
        </div>
      );
  }
}
