import { getPayloadClient } from './client'

export async function getPageBySlug(slug: string, draft = false) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft,
    limit: 1,
  })

  return result.docs[0] || null
}

export async function getEpisodes(limit = 6) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'episodes',
    sort: '-publishDate',
    limit,
  })

  return result.docs
}

export async function getEpisode(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'episodes',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  return result.docs[0] || null
}
