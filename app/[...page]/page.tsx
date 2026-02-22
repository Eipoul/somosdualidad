import type {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'
import {BuilderHtml} from '@/components/builder/BuilderHtml'
import {SectionRenderer} from '@/components/SectionRenderer'
import {getBuilderPage, getBuilderPageHtml} from '@/lib/builder'
import {getSanityPage} from '@/lib/pages'
import {mapSegmentsToSlug} from '@/lib/pages'
import {SITE_SETTINGS_QUERY} from '@/lib/sanity/queries'
import {sanityFetch} from '@/lib/sanity/client'
import type {SiteSettings} from '@/lib/sanity/types'

export async function generateMetadata({params}: {params: {page?: string[]}}): Promise<Metadata> {
  const slug = mapSegmentsToSlug(params.page)
  const [page, settings] = await Promise.all([
    getSanityPage(slug),
    sanityFetch<SiteSettings | null>({query: SITE_SETTINGS_QUERY}),
  ])

  if (!page) return {}

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || settings?.defaultSeo?.description,
    alternates: {canonical: `/${params.page?.join('/') || ''}`},
  }
}

export default async function DynamicPage({params}: {params: {page?: string[]}}) {
  const slugParts = params.page || []
  const pathname = `/${slugParts.join('/')}`
  const {isEnabled} = await draftMode()

  const [builderContent, builderHtml] = await Promise.all([
    getBuilderPage(pathname, isEnabled),
    getBuilderPageHtml(pathname, isEnabled),
  ])

  if (builderContent && builderHtml) return <BuilderHtml html={builderHtml} />

  const page = await getSanityPage(mapSegmentsToSlug(slugParts))
  if (!page) notFound()

  return <SectionRenderer sections={page.sections} />
}
