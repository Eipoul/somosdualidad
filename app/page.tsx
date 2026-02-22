import type {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {BuilderHtml} from '@/components/builder/BuilderHtml'
import {DummyHomePage} from '@/components/DummyHomePage'
import {SectionRenderer} from '@/components/SectionRenderer'
import {getBuilderPage, getBuilderPageHtml} from '@/lib/builder'
import {getSanityPage} from '@/lib/pages'
import {SITE_SETTINGS_QUERY} from '@/lib/sanity/queries'
import {sanityFetch} from '@/lib/sanity/client'
import type {SiteSettings} from '@/lib/sanity/types'

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([
    sanityFetch<SiteSettings | null>({query: SITE_SETTINGS_QUERY}),
    getSanityPage('inicio'),
  ])

  return {
    title: page?.seo?.title || page?.title || settings?.siteName,
    description: page?.seo?.description || settings?.defaultSeo?.description,
    alternates: {canonical: '/'},
  }
}

export default async function HomePage() {
  const {isEnabled} = await draftMode()
  const [builderContent, builderHtml] = await Promise.all([getBuilderPage('/', isEnabled), getBuilderPageHtml('/', isEnabled)])

  if (builderContent && builderHtml) return <BuilderHtml html={builderHtml} />

  const page = await getSanityPage('inicio')
  if (!page) return <DummyHomePage />

  return <SectionRenderer sections={page.sections} />
}
