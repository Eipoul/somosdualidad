import Link from 'next/link'
import { getEpisodes } from '@/lib/payload/content'

export default async function EpisodesPage() {
  const episodes = await getEpisodes(50)

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Episodios</h1>
      <div className="mt-8 space-y-4">
        {episodes.map((episode: { id: string; slug: string; title: string; description?: string }) => (
          <Link key={episode.id} href={`/episodes/${episode.slug}`} className="glass block rounded-2xl p-6">
            <h2 className="text-2xl">{episode.title}</h2>
            <p className="mt-2 text-zinc-300">{episode.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
