import { notFound } from 'next/navigation'
import { getEpisode } from '@/lib/payload/content'

type EpisodeDetailPageProps = {
  params: Promise<{ slug: string }>
}

export default async function EpisodeDetailPage({ params }: EpisodeDetailPageProps) {
  const { slug } = await params
  const episode = await getEpisode(slug)
  if (!episode) notFound()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-zinc-400">{new Date(episode.publishDate).toLocaleDateString('es-ES')}</p>
      <h1 className="mt-2 text-4xl font-semibold">{episode.title}</h1>
      <p className="mt-6 text-lg text-zinc-200">{episode.description}</p>
      {episode.transcript && <article className="prose prose-invert mt-10 whitespace-pre-wrap">{episode.transcript}</article>}
    </main>
  )
}
