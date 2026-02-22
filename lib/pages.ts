import {HOME_PAGE_QUERY, PAGE_BY_SLUG_QUERY} from '@/lib/sanity/queries'
import {sanityFetch} from '@/lib/sanity/client'
import type {PageData} from '@/lib/sanity/types'

export const mapSegmentsToSlug = (segments?: string[]) => (segments && segments.length > 0 ? segments.join('/') : '')

export async function getHomePage() {
  return sanityFetch<PageData | null>({query: HOME_PAGE_QUERY})
}

export async function getSanityPage(slug: string) {
  if (!slug) return getHomePage()
  return sanityFetch<PageData | null>({query: PAGE_BY_SLUG_QUERY, params: {slug}})
}
