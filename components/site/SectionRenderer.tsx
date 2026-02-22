import Link from 'next/link'
import { NewsletterForm } from './NewsletterForm'

type Block = {
  blockType: string
  headline?: string
  subhead?: string
  ctaLabel?: string
  ctaHref?: string
  title?: string
  content?: string
  description?: string
}
type EpisodeCard = { id: string; slug: string; title: string; description?: string; publishDate: string }

export function SectionRenderer({ blocks, episodes }: { blocks: Block[]; episodes: EpisodeCard[] }) {
  return (
    <>
      {blocks?.map((block, index) => {
        if (block.blockType === 'hero') {
          return (
            <section key={index} className="mx-auto max-w-6xl px-6 py-24">
              <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">{block.headline}</h1>
              <p className="mt-6 max-w-3xl text-xl text-zinc-300">{block.subhead}</p>
              {block.ctaHref && (
                <Link href={block.ctaHref} className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-medium text-black transition hover:-translate-y-0.5">
                  {block.ctaLabel}
                </Link>
              )}
            </section>
          )
        }

        if (block.blockType === 'episodesSection') {
          return (
            <section id="episodios" key={index} className="mx-auto max-w-6xl px-6 py-16">
              <h2 className="text-3xl font-semibold">{block.title || 'Episodios'}</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {episodes.map((episode) => (
                  <Link href={`/episodes/${episode.slug}`} key={episode.id} className="glass rounded-2xl p-5 transition hover:-translate-y-1">
                    <p className="text-sm text-zinc-400">{new Date(episode.publishDate).toLocaleDateString('es-ES')}</p>
                    <h3 className="mt-2 text-xl font-medium">{episode.title}</h3>
                    <p className="mt-3 line-clamp-3 text-zinc-300">{episode.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )
        }

        if (block.blockType === 'aboutSection') {
          return (
            <section id="nosotros" key={index} className="mx-auto max-w-5xl px-6 py-16 text-center">
              <h2 className="text-3xl font-semibold">Nosotros</h2>
              <p className="mt-5 text-lg text-zinc-300">{block.content}</p>
            </section>
          )
        }

        if (block.blockType === 'subscribeSection') {
          return (
            <section id="suscribete" key={index} className="mx-auto max-w-5xl px-6 py-16 text-center">
              <h2 className="text-3xl font-semibold">{block.title}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-zinc-300">{block.description}</p>
              <div className="mt-8"><NewsletterForm /></div>
            </section>
          )
        }

        return null
      })}
    </>
  )
}
