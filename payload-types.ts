/* eslint-disable */

export type Episode = {
  id: string
  title: string
  slug: string
  publishDate: string
  season?: string | null
  coverImage?: string | null
  description?: string | null
  showNotes?: unknown
  platformLinks?: {
    spotify?: string | null
    apple?: string | null
    youtube?: string | null
  } | null
  transcript?: string | null
  featured?: boolean | null
  updatedAt?: string
  createdAt?: string
}

export type PageBlock = {
  blockType: string
  [key: string]: unknown
}

export type Page = {
  id: string
  slug: string
  title: string
  layout: PageBlock[]
  updatedAt?: string
  createdAt?: string
}

export interface Config {
  collections: {
    episodes: Episode
    pages: Page
  }
}
