import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {SectionRenderer} from '@/components/SectionRenderer'
import {getSanityPage, mapSegmentsToSlug} from '@/lib/pages'
import {SITE_SETTINGS_QUERY} from '@/lib/sanity/queries'
import {sanityFetch} from '@/lib/sanity/client'
import type {SiteSettings} from '@/lib/sanity/types'

export async function generateMetadata({params}: {params: {page?: string[]}}): Promise<Metadata> {
  const slug = mapSegmentsToSlug(params.page)
  const [page, settings] = await Promise.all([getSanityPage(slug), sanityFetch<SiteSettings | null>({query: SITE_SETTINGS_QUERY})])
  if (!page) return {}
  return {title: page.seo?.title || page.title, description: page.seo?.description || settings?.defaultSeo?.description}
}

export default async function DynamicPage({params}: {params: {page?: string[]}}) {
  const page = await getSanityPage(mapSegmentsToSlug(params.page))
  if (!page) notFound()
  return <SectionRenderer sections={page.sections} />
}
