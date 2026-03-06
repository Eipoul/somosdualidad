import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "d 'de' MMMM, yyyy", { locale: es });
}

export function formatDateShort(date: string | Date) {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "MMM d, yyyy", { locale: es });
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}

export function absoluteUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SITE_URL || "https://somosdualidad.com"}${path}`;
}

// Types for the database models
export type Episode = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  show_notes: string | null;
  cover_image_url: string | null;
  audio_url: string | null;
  embed_url: string | null;
  duration: string | null;
  season: number | null;
  tags: string[] | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  cover_image_url: string | null;
  category: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
};

export type Subscriber = {
  id: string;
  email: string;
  status: "active" | "unsubscribed";
  created_at: string;
};

export type PageConfig = {
  id: string;
  page: string;
  config: PageBlock[];
  updated_at: string;
};

export type PageBlock = {
  id: string;
  type:
    | "hero"
    | "about"
    | "episode-feature"
    | "blog-preview"
    | "newsletter-cta"
    | "custom-text"
    | "image-text";
  props: Record<string, unknown>;
  order: number;
};

export type SiteSettings = {
  siteTitle: string;
  tagline: string;
  logoUrl: string | null;
  socialLinks: {
    instagram?: string;
    spotify?: string;
    apple?: string;
    youtube?: string;
    twitter?: string;
  };
  seoDescription: string;
  ogImageUrl: string | null;
};
