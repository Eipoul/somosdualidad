import type {Metadata} from 'next'
import {SectionRenderer} from '@/components/SectionRenderer'
import {getHomePage} from '@/lib/pages'
import {SITE_SETTINGS_QUERY} from '@/lib/sanity/queries'
import {sanityFetch} from '@/lib/sanity/client'
import type {SiteSettings} from '@/lib/sanity/types'

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([sanityFetch<SiteSettings | null>({query: SITE_SETTINGS_QUERY}), getHomePage()])
  return {
    title: page?.seo?.title || page?.title || settings?.siteName,
    description: page?.seo?.description || settings?.defaultSeo?.description,
    alternates: {canonical: '/'},
  }
}

export default async function HomePage() {
  const page = await getHomePage()
  if (!page) return null
  return <SectionRenderer sections={page.sections} />
}
