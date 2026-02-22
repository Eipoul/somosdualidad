import {HOME_PAGE_QUERY, PAGE_BY_SLUG_QUERY} from '@/lib/sanity/queries'
import {sanityFetch} from '@/lib/sanity/client'
import type {PageData} from '@/lib/sanity/types'

export const mapSegmentsToSlug = (segments?: string[]) => (segments && segments.length > 0 ? segments.join('/') : 'inicio')

export async function getSanityPage(slug: string) {
  if (slug === 'inicio') return sanityFetch<PageData | null>({query: HOME_PAGE_QUERY})
  return sanityFetch<PageData | null>({query: PAGE_BY_SLUG_QUERY, params: {slug}})
}
