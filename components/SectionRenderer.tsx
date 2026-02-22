import Image from 'next/image'
import Link from 'next/link'
import {Button} from '@/components/Button'
import {Card} from '@/components/Card'
import {EpisodeList} from '@/components/EpisodeList'
import {FadeIn} from '@/components/FadeIn'
import {PodcastGrid} from '@/components/PodcastGrid'
import {Section} from '@/components/Section'
import {SubscribeForm} from '@/components/SubscribeForm'
import type {PageSection, PortableTextBlock, PortableTextSpan} from '@/lib/sanity/types'

type SectionRendererProps = {sections?: PageSection[]}

function AbstractHeroVisual() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-accentDark/8 bg-gradient-to-br from-accentLight/15 via-white to-accentDark/8 shadow-refined">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(200,169,126,0.3),transparent_60%)]" />
      <div className="absolute -left-12 bottom-12 h-56 w-56 rounded-full bg-accentDark/10 blur-3xl" />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accentLight/25 blur-3xl" />
    </div>
  )
}

function portableToText(blocks: PortableTextBlock[] = []) {
  return blocks
    .filter((b) => b?._type === 'block')
    .map((b) => (b.children || []).map((child: PortableTextSpan) => child.text || '').join(''))
    .join('\n')
}

export function SectionRenderer({sections = []}: SectionRendererProps) {
  return (
    <>
      {sections.map((section, idx) => {
        switch (section._type) {
          case 'sectionHero':
            return (
              <Section key={section._key || idx} className="pb-16 pt-12 md:pb-24 md:pt-20">
                <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                  <FadeIn>
                    {section.eyebrow ? <p className="text-xs uppercase tracking-[0.25em] font-medium text-accentDark/60">{section.eyebrow}</p> : null}
                    <h1 className="mt-6 font-serif text-5xl leading-tight md:text-6xl lg:text-7xl">{section.title}</h1>
                    {section.subtitle ? <p className="mt-6 max-w-xl text-lg text-foreground/70 md:text-xl leading-relaxed">{section.subtitle}</p> : null}
                    <div className="mt-10 flex flex-wrap gap-4">
                      {section.primaryCta?.label ? <Button href={section.primaryCta.href || '#'}>{section.primaryCta.label}</Button> : null}
                      {section.secondaryCta?.label ? <Button href={section.secondaryCta.href || '#'} variant="secondary">{section.secondaryCta.label}</Button> : null}
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.1}><AbstractHeroVisual /></FadeIn>
                </div>
              </Section>
            )
          case 'sectionRichText':
            return (
              <Section key={section._key || idx} className="bg-white/40">
                <div className={section.align === 'center' ? 'text-center' : ''}>
                  {section.title ? <h2 className="font-serif text-4xl md:text-5xl">{section.title}</h2> : null}
                  <p className="mt-8 whitespace-pre-line text-lg md:text-xl leading-relaxed text-foreground/75">{portableToText(section.body)}</p>
                </div>
              </Section>
            )
          case 'sectionImage':
            return (
              <Section key={section._key || idx}>
                {section.image?.asset?.url ? <Image src={section.image.asset.url} alt={section.alt || ''} width={1600} height={900} className="h-auto w-full rounded-3xl" /> : null}
                {section.caption ? <p className="mt-2 text-sm text-foreground/70">{section.caption}</p> : null}
              </Section>
            )
          case 'sectionCta':
            return (
              <Section key={section._key || idx}>
                <div className="rounded-3xl border border-accentDark/8 bg-white/50 p-12 shadow-subtle">
                  {section.title ? <h2 className="font-serif text-4xl">{section.title}</h2> : null}
                  {section.subtitle ? <p className="mt-4 text-lg text-foreground/70">{section.subtitle}</p> : null}
                  {section.button?.label ? <div className="mt-8"><Button href={section.button.href || '#'}>{section.button.label}</Button></div> : null}
                </div>
              </Section>
            )
          case 'sectionSteps':
            return (
              <Section key={section._key || idx} title={section.title}>
                <div className="grid gap-6 md:grid-cols-3">
                  {(section.items || []).map((item, itemIdx: number) => (
                    <Card key={item._key || itemIdx}><p className="mb-4 text-xs uppercase tracking-[0.25em] font-medium text-accentDark/60">Paso {itemIdx + 1}</p><h3 className="font-serif text-2xl">{item.title}</h3><p className="mt-3 text-base text-foreground/70">{item.description}</p></Card>
                  ))}
                </div>
              </Section>
            )
          case 'sectionFaq':
            return (
              <Section key={section._key || idx} title={section.title || 'Preguntas frecuentes'} className="bg-white/40">
                <div className="mt-8 space-y-4">{(section.items || []).map((item, i: number) => <details key={item._key || i} className="rounded-xl border border-accentDark/8 p-6 cursor-pointer transition-all duration-300 hover:border-accentDark/15 hover:bg-white/30"><summary className="font-medium text-base cursor-pointer">{item.q}</summary><p className="mt-3 text-foreground/70">{item.a}</p></details>)}</div>
              </Section>
            )
          case 'sectionTestimonials':
            return <Section key={section._key || idx} title={section.title}><div className="grid gap-6 md:grid-cols-3">{(section.items || []).map((item, i: number) => <Card key={item._key || i}><p className="text-base leading-relaxed text-foreground/75">“{item.quote}”</p><p className="mt-5 text-sm font-medium">{item.name}</p><p className="text-xs text-foreground/60">{item.role}</p></Card>)}</div></Section>
          case 'sectionCardGrid':
            return <Section key={section._key || idx} title={section.title} subtitle={section.subtitle}><div className="grid gap-6 md:grid-cols-3">{(section.cards || []).map((card, i: number) => <Card key={card._key || i}><h3 className="font-serif text-2xl">{card.title}</h3><p className="mt-3 text-base text-foreground/70">{card.description}</p>{card.link?.href ? <Link href={card.link.href} className="mt-6 inline-block text-sm font-medium text-accentDark hover:text-accentLight transition-colors">{card.link.label || 'Ver más'}</Link> : null}</Card>)}</div></Section>
          case 'sectionPodcasts':
            return (
              <Section key={section._key || idx} title={section.title} subtitle={section.subtitle}>
                <PodcastGrid podcasts={section.podcasts || []} />
              </Section>
            )
          case 'sectionEpisodes':
            return (
              <Section key={section._key || idx} title={section.title} subtitle={section.subtitle}>
                {section.podcast ? (
                  <EpisodeList episodes={section.podcast.episodes || []} layout={section.layout || 'grid'} />
                ) : (
                  <p className="text-center text-foreground/60">Please select a podcast to display episodes.</p>
                )}
              </Section>
            )
          case 'sectionSubscribe':
            return (
              <Section key={section._key || idx}>
                <div className="mx-auto max-w-2xl rounded-3xl border border-accentDark/8 bg-white/50 p-12 shadow-subtle text-center">
                  {section.title ? <h2 className="font-serif text-4xl">{section.title}</h2> : null}
                  {section.subtitle ? <p className="mt-4 text-lg text-foreground/70">{section.subtitle}</p> : null}
                  {section.description ? <p className="mt-6 text-base text-foreground/70 max-w-md mx-auto">{section.description}</p> : null}
                  <div className="mt-8">
                    <SubscribeForm />
                  </div>
                </div>
              </Section>
            )
          case 'sectionSpacer':
            return <div key={section._key || idx} style={{height: `${section.height || 40}px`}} className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{section.showDivider ? <hr className="border-accentDark/10" /> : null}</div>
          default:
            return null
        }
      })}
    </>
  )
}
