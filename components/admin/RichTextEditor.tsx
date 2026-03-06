"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ content = "", onChange, placeholder = "Escribe aquí...", className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    editorProps: {
      attributes: { class: "outline-none min-h-[200px] p-4" },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  const toolbarBtn = (active: boolean) =>
    cn(
      "p-1.5 rounded text-sm transition-colors",
      active ? "bg-terracotta text-white" : "text-espresso/60 hover:bg-espresso/8 hover:text-espresso"
    );

  return (
    <div className={cn("border border-espresso/15 rounded-2xl overflow-hidden bg-white focus-within:border-terracotta/50 focus-within:ring-2 focus-within:ring-terracotta/20 transition-all", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-espresso/8 bg-cream/50">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={toolbarBtn(editor.isActive("bold"))}>
          <strong>B</strong>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={toolbarBtn(editor.isActive("italic"))}>
          <em>I</em>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={toolbarBtn(editor.isActive("strike"))}>
          <s>S</s>
        </button>
        <div className="w-px bg-espresso/10 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={toolbarBtn(editor.isActive("heading", { level: 2 }))}>
          H2
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={toolbarBtn(editor.isActive("heading", { level: 3 }))}>
          H3
        </button>
        <div className="w-px bg-espresso/10 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={toolbarBtn(editor.isActive("bulletList"))}>
          • —
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={toolbarBtn(editor.isActive("orderedList"))}>
          1.
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={toolbarBtn(editor.isActive("blockquote"))}>
          ❝
        </button>
        <div className="w-px bg-espresso/10 mx-1" />
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("URL del enlace:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={toolbarBtn(editor.isActive("link"))}
        >
          🔗
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("URL de la imagen:");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className={toolbarBtn(false)}
        >
          🖼️
        </button>
        <div className="w-px bg-espresso/10 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={toolbarBtn(false)} disabled={!editor.can().undo()}>
          ↩
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={toolbarBtn(false)} disabled={!editor.can().redo()}>
          ↪
        </button>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} className="prose prose-stone max-w-none prose-headings:font-display prose-a:text-terracotta" />
    </div>
  );
}
