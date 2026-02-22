import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'

export type Episode = {
  _id: string
  title: string
  slug: string
  episodeNumber: number
  description?: string
  image?: {
    asset?: {
      url: string
    }
  }
  duration?: number
  audioUrl?: string
  publishedAt: string
  podcast?: {
    _id: string
    title: string
    slug: string
  }
}

type EpisodeListProps = {
  episodes: Episode[]
  layout?: 'grid' | 'list'
}

export function EpisodeList({ episodes, layout = 'grid' }: EpisodeListProps) {
  if (!episodes || episodes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/60">No episodes found yet.</p>
      </div>
    )
  }

  if (layout === 'list') {
    return (
      <div className="space-y-4">
        {episodes.map((episode) => (
          <Card key={episode._id} className="flex gap-6">
            {episode.image?.asset?.url ? (
              <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={episode.image.asset.url}
                  alt={episode.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] font-medium text-accentDark/60">
                      Episode {episode.episodeNumber}
                    </p>
                    <h3 className="font-serif text-xl mt-1">{episode.title}</h3>
                  </div>
                  {episode.duration ? (
                    <p className="text-sm text-foreground/60">{episode.duration} min</p>
                  ) : null}
                </div>
                {episode.description ? (
                  <p className="text-sm text-foreground/70 line-clamp-2">
                    {episode.description}
                  </p>
                ) : null}
              </div>
              {episode.audioUrl ? (
                <Link href={episode.audioUrl} target="_blank" className="mt-4">
                  <Button variant="secondary" className="w-full">
                    Listen Now
                  </Button>
                </Link>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {episodes.map((episode) => (
        <Card key={episode._id}>
          {episode.image?.asset?.url ? (
            <div className="relative mb-4 -mx-8 -mt-8 h-40 w-[calc(100%+64px)] overflow-hidden rounded-t-2xl">
              <Image
                src={episode.image.asset.url}
                alt={episode.title}
                fill
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.25em] font-medium text-accentDark/60">
              Episode {episode.episodeNumber}
            </p>
            <h3 className="font-serif text-xl">{episode.title}</h3>
            {episode.duration ? (
              <p className="text-sm text-foreground/60">{episode.duration} min</p>
            ) : null}
            {episode.description ? (
              <p className="mt-2 text-sm text-foreground/70 line-clamp-2">
                {episode.description}
              </p>
            ) : null}
            {episode.audioUrl ? (
              <Link href={episode.audioUrl} target="_blank" className="mt-4">
                <Button variant="secondary" className="w-full text-center">
                  Listen Now
                </Button>
              </Link>
            ) : null}
          </div>
        </Card>
      ))}
    </div>
  )
}
