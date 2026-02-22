import { notFound } from 'next/navigation'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { SectionRenderer } from '@/components/site/SectionRenderer'
import { getEpisodes, getPageBySlug } from '@/lib/payload/content'

type DynamicPageProps = {
  params: Promise<{ page?: string[] }>
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const resolvedParams = await params
  const slug = `/${(resolvedParams.page || []).join('/')}`
  const [page, episodes] = await Promise.all([getPageBySlug(slug), getEpisodes(6)])
  if (!page) notFound()

  return (
    <main>
      <Header />
      <SectionRenderer blocks={page.layout} episodes={episodes} />
      <Footer />
    </main>
  )
}
