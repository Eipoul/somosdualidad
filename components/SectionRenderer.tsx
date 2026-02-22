import Link from 'next/link'
import {Button} from '@/components/Button'
import {Card} from '@/components/Card'
import {FadeIn} from '@/components/FadeIn'
import {NewsletterForm} from '@/components/NewsletterForm'
import {Section} from '@/components/Section'
import {getFeaturedEpisode, getLatestEpisodes} from '@/lib/sanity/podcast'
import type {PageSection, PortableTextBlock, PortableTextSpan} from '@/lib/sanity/types'

type SectionRendererProps = {sections?: PageSection[]}

function portableToText(blocks: PortableTextBlock[] = []) {
  return blocks
    .filter((b) => b?._type === 'block')
    .map((b) => (b.children || []).map((child: PortableTextSpan) => child.text || '').join(''))
    .join('\n')
}

export async function SectionRenderer({sections = []}: SectionRendererProps) {
  const episodesSection = sections.find((section) => section._type === 'sectionEpisodes')
  const limit = episodesSection && 'maxItems' in episodesSection ? episodesSection.maxItems || 6 : 6
  const [episodes, featured] = episodesSection ? await Promise.all([getLatestEpisodes(limit), getFeaturedEpisode()]) : [[], null]

  return (
    <>
      {sections.map((section, idx) => {
        switch (section._type) {
          case 'sectionHero':
            return <Section key={section._key || idx} className="pb-20 pt-16"><FadeIn><p className="text-xs uppercase tracking-[0.2em] text-accentDark/60">{section.eyebrow}</p><h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight md:text-7xl">{section.title}</h1><p className="mt-6 max-w-2xl text-lg text-foreground/70">{section.subtitle}</p><div className="mt-8 flex gap-3">{section.primaryCta?.label ? <Button href={section.primaryCta.href || '#'}>{section.primaryCta.label}</Button> : null}{section.secondaryCta?.label ? <Button href={section.secondaryCta.href || '#'} variant="secondary">{section.secondaryCta.label}</Button> : null}</div></FadeIn></Section>
          case 'sectionWhoWeAre':
            return <Section key={section._key || idx} className="bg-white/70"><h2 className="font-serif text-4xl">{section.title}</h2><p className="mt-6 max-w-3xl whitespace-pre-line text-lg text-foreground/75">{portableToText(section.body)}</p></Section>
          case 'sectionEpisodes':
            return <Section key={section._key || idx}><h2 className="font-serif text-4xl">{section.title}</h2><p className="mt-3 text-foreground/70">{section.subtitle}</p>{section.showFeatured && featured ? <Card className="mt-8"><p className="text-xs uppercase tracking-[0.2em] text-accentDark/60">Episodio destacado</p><h3 className="mt-2 font-serif text-3xl">{featured.title}</h3><p className="mt-2 text-sm text-foreground/75">{featured.description}</p></Card> : null}<div className="mt-6 grid gap-4 md:grid-cols-2">{episodes.map((episode) => <Card key={episode._id} className="transition duration-300 hover:-translate-y-1 hover:shadow-soft"><p className="text-xs text-foreground/60">{episode.publishDate ? new Date(episode.publishDate).toLocaleDateString('es-ES') : ''}</p><h3 className="mt-2 font-serif text-2xl">{episode.title}</h3><p className="mt-2 text-sm text-foreground/70">{episode.description}</p><div className="mt-4 flex gap-3 text-sm">{episode.streamingLinks?.map((link, i) => link.url ? <Link key={i} href={link.url} className="underline">{link.platform}</Link> : null)}</div></Card>)}</div></Section>
          case 'sectionNewsletterSignup':
            return <Section key={section._key || idx} id="suscribete"><NewsletterForm {...section} /></Section>
          case 'sectionFaq':
            return <Section key={section._key || idx} className="bg-white/60"><h2 className="font-serif text-4xl">{section.title}</h2><div className="mt-6 space-y-3">{section.items?.map((item, i) => <details key={item._key || i} className="rounded-2xl border border-accentDark/10 bg-white p-5"><summary className="cursor-pointer font-medium">{item.q}</summary><p className="mt-3 text-foreground/75">{item.a}</p></details>)}</div></Section>
          case 'sectionCta':
            return <Section key={section._key || idx}><div className="rounded-3xl border border-accentDark/10 bg-white p-10 text-center shadow-soft"><h2 className="font-serif text-4xl">{section.title}</h2><p className="mx-auto mt-4 max-w-2xl text-foreground/70">{section.subtitle}</p>{section.button?.label ? <div className="mt-7"><Button href={section.button.href || '#'}>{section.button.label}</Button></div> : null}</div></Section>
          default:
            return null
        }
      })}
    </>
  )
}
