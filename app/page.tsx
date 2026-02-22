import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { SectionRenderer } from '@/components/site/SectionRenderer'
import { getEpisodes, getPageBySlug } from '@/lib/payload/content'
import { draftMode } from 'next/headers'

export default async function HomePage() {
  const { isEnabled } = await draftMode()
  const [page, episodes] = await Promise.all([getPageBySlug('/', isEnabled), getEpisodes(6)])

  const fallbackBlocks = [
    { blockType: 'hero', headline: 'Explora tu dualidad con calma.', subhead: 'Conversaciones profundas sobre bienestar, propósito y crecimiento.', ctaLabel: 'Escuchar ahora', ctaHref: '#episodios' },
    { blockType: 'episodesSection', title: 'Episodios' },
    { blockType: 'aboutSection', content: 'Somos un espacio de conversaciones honestas para integrar cuerpo, mente y propósito.' },
    { blockType: 'subscribeSection', title: 'Suscríbete', description: 'Recibe nuevos episodios y reflexiones exclusivas.' },
  ]

  return (
    <main>
      <Header />
      <SectionRenderer blocks={page?.layout || fallbackBlocks} episodes={episodes} />
      <Footer />
    </main>
  )
}
