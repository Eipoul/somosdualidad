import {sanityFetch} from '@/lib/sanity/client'

export type Episode = {
  _id: string
  title: string
  slug: string
  description?: string
  publishDate?: string
  coverImage?: {asset?: {url?: string}}
  streamingLinks?: {platform?: string; url?: string}[]
  season?: {title?: string}
}

export const EPISODE_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  description,
  publishDate,
  coverImage{asset-> {url}},
  streamingLinks,
  season->{title}
}`

export const LATEST_EPISODES_QUERY = `*[_type == "episode"] | order(publishDate desc)[0...$limit]${EPISODE_PROJECTION}`
export const FEATURED_EPISODE_QUERY = `coalesce(*[_type == "episode" && isFeatured == true] | order(publishDate desc)[0], *[_type == "episode"] | order(publishDate desc)[0])${EPISODE_PROJECTION}`

export async function getLatestEpisodes(limit = 6) {
  return sanityFetch<Episode[]>({query: LATEST_EPISODES_QUERY, params: {limit}})
}

export async function getFeaturedEpisode() {
  return sanityFetch<Episode | null>({query: FEATURED_EPISODE_QUERY})
}
