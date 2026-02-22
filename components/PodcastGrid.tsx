import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/Card'

export type Podcast = {
  _id: string
  title: string
  slug: string
  description?: string
  image?: {
    asset?: {
      url: string
    }
  }
  author?: {
    name: string
  }
  _updatedAt: string
}

type PodcastGridProps = {
  podcasts: Podcast[]
}

export function PodcastGrid({ podcasts }: PodcastGridProps) {
  if (!podcasts || podcasts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/60">No podcasts found yet.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {podcasts.map((podcast) => (
        <Link
          key={podcast._id}
          href={`/podcasts/${podcast.slug}`}
          className="group"
        >
          <Card className="h-full transition-all duration-300">
            {podcast.image?.asset?.url ? (
              <div className="relative mb-4 -mx-8 -mt-8 h-48 w-[calc(100%+64px)] overflow-hidden rounded-t-2xl">
                <Image
                  src={podcast.image.asset.url}
                  alt={podcast.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : null}
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-2xl group-hover:text-accentLight transition-colors">
                {podcast.title}
              </h3>
              {podcast.author ? (
                <p className="text-sm text-foreground/60">{podcast.author.name}</p>
              ) : null}
              {podcast.description ? (
                <p className="mt-2 text-base text-foreground/70 line-clamp-2">
                  {podcast.description}
                </p>
              ) : null}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
