import Link from 'next/link'
import {Button} from '@/components/Button'
import {Card} from '@/components/Card'
import {FadeIn} from '@/components/FadeIn'
import {Section} from '@/components/Section'

type SectionRendererProps = {sections?: Array<Record<string, any>>}

function AbstractHeroVisual() {
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-accentDark/10 bg-gradient-to-br from-accentLight/20 via-white to-accentDark/10 shadow-soft">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(200,169,126,0.4),transparent_55%)]" />
      <div className="absolute -left-8 bottom-8 h-44 w-44 rounded-full bg-accentDark/15 blur-2xl" />
      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-accentLight/30 blur-2xl" />
    </div>
  )
}

function portableToText(blocks: any[] = []) {
  return blocks
    .filter((b) => b?._type === 'block')
    .map((b) => (b.children || []).map((child: any) => child.text).join(''))
    .join('\n')
}

export function SectionRenderer({sections = []}: SectionRendererProps) {
  return (
    <>
      {sections.map((section, idx) => {
        switch (section._type) {
          case 'sectionHero':
            return (
              <Section key={section._key || idx} className="pb-12 pt-10 md:pt-16">
                <div className="grid items-center gap-8 md:grid-cols-2">
                  <FadeIn>
                    {section.eyebrow ? <p className="text-sm uppercase tracking-[0.2em] text-accentDark/70">{section.eyebrow}</p> : null}
                    <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">{section.title}</h1>
                    {section.subtitle ? <p className="mt-4 max-w-xl text-base text-foreground/75 md:text-lg">{section.subtitle}</p> : null}
                    <div className="mt-8 flex flex-wrap gap-3">
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
              <Section key={section._key || idx} className="bg-white/55">
                <div className={section.align === 'center' ? 'text-center' : ''}>
                  {section.title ? <h2 className="font-serif text-3xl md:text-4xl">{section.title}</h2> : null}
                  <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-foreground/80">{portableToText(section.body)}</p>
                </div>
              </Section>
            )
          case 'sectionImage':
            return (
              <Section key={section._key || idx}>
                {section.image?.asset?.url ? <img src={section.image.asset.url} alt={section.alt || ''} className="w-full rounded-3xl" /> : null}
                {section.caption ? <p className="mt-2 text-sm text-foreground/70">{section.caption}</p> : null}
              </Section>
            )
          case 'sectionCta':
            return (
              <Section key={section._key || idx}>
                <div className="rounded-2xl border border-accentDark/10 bg-white/60 p-8">
                  {section.title ? <h2 className="font-serif text-3xl">{section.title}</h2> : null}
                  {section.subtitle ? <p className="mt-3 text-foreground/75">{section.subtitle}</p> : null}
                  {section.button?.label ? <div className="mt-6"><Button href={section.button.href || '#'}>{section.button.label}</Button></div> : null}
                </div>
              </Section>
            )
          case 'sectionSteps':
            return (
              <Section key={section._key || idx} title={section.title}>
                <div className="grid gap-4 md:grid-cols-3">
                  {(section.items || []).map((item: any, itemIdx: number) => (
                    <Card key={item._key || itemIdx}><p className="mb-3 text-xs uppercase tracking-[0.2em] text-accentDark/70">Paso {itemIdx + 1}</p><h3 className="font-serif text-2xl">{item.title}</h3><p className="mt-2 text-sm text-foreground/75">{item.description}</p></Card>
                  ))}
                </div>
              </Section>
            )
          case 'sectionFaq':
            return (
              <Section key={section._key || idx} title={section.title || 'Preguntas frecuentes'} className="bg-white/50">
                <div className="mt-6 space-y-3">{(section.items || []).map((item: any, i: number) => <details key={item._key || i} className="rounded-lg border p-4"><summary className="cursor-pointer font-medium">{item.q}</summary><p className="mt-2 text-foreground/75">{item.a}</p></details>)}</div>
              </Section>
            )
          case 'sectionTestimonials':
            return <Section key={section._key || idx} title={section.title}><div className="grid gap-4 md:grid-cols-3">{(section.items || []).map((item: any, i: number) => <Card key={item._key || i}><p className="text-sm leading-relaxed text-foreground/80">“{item.quote}”</p><p className="mt-4 text-sm font-medium">{item.name}</p><p className="text-xs text-foreground/65">{item.role}</p></Card>)}</div></Section>
          case 'sectionCardGrid':
            return <Section key={section._key || idx} title={section.title} subtitle={section.subtitle}><div className="grid gap-4 md:grid-cols-3">{(section.cards || []).map((card: any, i: number) => <Card key={card._key || i}><h3 className="font-serif text-2xl">{card.title}</h3><p className="mt-2 text-sm text-foreground/75">{card.description}</p>{card.link?.href ? <Link href={card.link.href} className="mt-4 inline-block text-sm underline">{card.link.label || 'Ver más'}</Link> : null}</Card>)}</div></Section>
          case 'sectionSpacer':
            return <div key={section._key || idx} style={{height: `${section.height || 40}px`}} className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{section.showDivider ? <hr className="border-accentDark/10" /> : null}</div>
          default:
            return null
        }
      })}
    </>
  )
}
