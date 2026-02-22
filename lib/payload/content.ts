import type { Episode, Page } from '@/payload-types'
import { toEpisodeCards, type EpisodeCard } from '@/lib/adapters/episodeCard'
import { getPayloadClient } from './client'

export async function getPageBySlug(slug: string, draft = false): Promise<Page | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft,
    limit: 1,
  })

  return (result.docs[0] as Page | undefined) || null
}

export async function getEpisodes(limit = 6): Promise<EpisodeCard[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'episodes',
    sort: '-publishDate',
    limit,
    select: {
      id: true,
      slug: true,
      title: true,
      publishDate: true,
      description: true,
      coverImage: true,
    },
  })

  return toEpisodeCards(result.docs as Episode[])
}

export async function getEpisode(slug: string): Promise<Episode | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'episodes',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  return (result.docs[0] as Episode | undefined) || null
}
