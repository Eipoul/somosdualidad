import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {Section} from '@/components/Section'
import {SectionRenderer} from '@/components/SectionRenderer'
import {HOME_PAGE_QUERY, PAGE_BY_SLUG_QUERY, SITE_SETTINGS_QUERY} from '@/lib/sanity/queries'
import {sanityFetch} from '@/lib/sanity/client'
import type {PageData, SiteSettings} from '@/lib/sanity/types'

const mapSegmentsToSlug = (segments?: string[]) => (segments && segments.length > 0 ? segments.join('/') : 'inicio')

async function getPage(slug: string) {
  if (slug === 'inicio') return sanityFetch<PageData | null>({query: HOME_PAGE_QUERY})
  return sanityFetch<PageData | null>({query: PAGE_BY_SLUG_QUERY, params: {slug}})
}

export async function generateMetadata({params}: {params: {slug?: string[]}}): Promise<Metadata> {
  const slug = mapSegmentsToSlug(params.slug)
  const [page, settings] = await Promise.all([
    getPage(slug),
    sanityFetch<SiteSettings | null>({query: SITE_SETTINGS_QUERY}),
  ])

  if (!page) return {}
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || settings?.defaultSeo?.description,
    alternates: {canonical: slug === 'inicio' ? '/' : `/${slug}`},
  }
}

export default async function SlugPage({params}: {params: {slug?: string[]}}) {
  const slug = mapSegmentsToSlug(params.slug)
  const page = await getPage(slug)

  if (!page) {
    if (slug === 'inicio') {
      return <Section className="py-20 text-center">Crea un documento de tipo <strong>page</strong> con routeType = <strong>home</strong> en Sanity.</Section>
    }
    notFound()
  }

  return <SectionRenderer sections={page.sections} />
}
