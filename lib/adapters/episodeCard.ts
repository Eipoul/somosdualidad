import type { Episode } from '@/payload-types'

export type EpisodeCard = {
  id: string
  slug: string
  title: string
  description?: string
  publishDate: string
  imageUrl?: string
}

const normalizeString = (value: unknown): string | null => {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
  }

  if (value && typeof value === 'object') {
    const candidate = (value as { current?: unknown; value?: unknown }).current ?? (value as { value?: unknown }).value
    if (typeof candidate === 'string') {
      const trimmed = candidate.trim()
      return trimmed.length > 0 ? trimmed : null
    }
  }

  return null
}

const normalizePublishDate = (value: unknown): string | null => {
  if (typeof value === 'string' || value instanceof Date) {
    const parsed = new Date(value)
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString()
  }

  return null
}

export const toEpisodeCard = (episode: Episode): EpisodeCard | null => {
  const slug = normalizeString(episode.slug)
  const title = normalizeString(episode.title)
  const publishDate = normalizePublishDate(episode.publishDate)

  if (!slug || !title || !publishDate) {
    return null
  }

  return {
    id: episode.id,
    slug,
    title,
    publishDate,
    description: normalizeString(episode.description) ?? undefined,
    imageUrl: normalizeString(episode.coverImage) ?? undefined,
  }
}

export const toEpisodeCards = (episodes: Episode[]): EpisodeCard[] => {
  return episodes.flatMap((episode) => {
    const card = toEpisodeCard(episode)
    return card ? [card] : []
  })
}
