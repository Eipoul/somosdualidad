import { notFound } from 'next/navigation'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { SectionRenderer } from '@/components/site/SectionRenderer'
import { getEpisodes, getPageBySlug } from '@/lib/payload/content'

export default async function DynamicPage({ params }: { params: { page?: string[] } }) {
  const slug = `/${(params.page || []).join('/')}`
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
