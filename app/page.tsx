import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { FAQ } from "@/components/FAQ";
import { FadeIn } from "@/components/FadeIn";
import { FinalCta } from "@/components/FinalCta";
import { Section } from "@/components/Section";
import { Steps } from "@/components/Steps";
import { Testimonials } from "@/components/Testimonials";
import { siteContent } from "@/content/site";

function AbstractHeroVisual() {
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-accentDark/10 bg-gradient-to-br from-accentLight/20 via-white to-accentDark/10 shadow-soft">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(200,169,126,0.4),transparent_55%)]" />
      <div className="absolute -left-8 bottom-8 h-44 w-44 rounded-full bg-accentDark/15 blur-2xl" />
      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-accentLight/30 blur-2xl" />
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 600 320" aria-hidden="true">
        <path d="M40 240 C180 140, 290 280, 560 120" fill="none" stroke="currentColor" strokeWidth="1" className="text-accentDark/45" />
        <path d="M20 110 C150 210, 300 70, 590 180" fill="none" stroke="currentColor" strokeWidth="1" className="text-accentLight" />
      </svg>
    </div>
  );
}

function MinimalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="text-accentDark">
      <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 2 a8 8 0 0 1 0 16" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <Section className="pb-12 pt-10 md:pt-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <FadeIn>
            <p className="text-sm uppercase tracking-[0.2em] text-accentDark/70">{siteContent.brand.tagline}</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">TODO: Un título principal claro, humano y memorable.</h1>
            <p className="mt-4 max-w-xl text-base text-foreground/75 md:text-lg">{siteContent.brand.valueProposition}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={siteContent.brand.primaryCta.href}>{siteContent.brand.primaryCta.label}</Button>
              <Button href={siteContent.brand.secondaryCta.href} variant="secondary">
                {siteContent.brand.secondaryCta.label}
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {siteContent.trustIndicators.map((item) => (
                <li key={item} className="rounded-full border border-accentDark/15 bg-white/75 px-4 py-2 text-xs">
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.1}>
            <AbstractHeroVisual />
          </FadeIn>
        </div>
      </Section>

      <Section id="que-es" title="¿Qué es Somos Dualidad?" className="bg-white/55">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <p className="text-lg leading-relaxed text-foreground/80">{siteContent.aboutIntro}</p>
          <Card className="bg-gradient-to-br from-warmGray-100 to-white">
            <p className="text-xs uppercase tracking-[0.2em] text-accentDark/70">Manifiesto breve</p>
            <p className="mt-3 text-foreground/80">{siteContent.manifestoShort}</p>
          </Card>
        </div>
      </Section>

      <Section id="experiencias" title="Experiencias / Servicios" subtitle="Diseñadas para integrar práctica, enfoque y bienestar en tu día a día.">
        <div className="grid gap-4 md:grid-cols-3">
          {siteContent.experiences.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.06}>
              <Card>
                <div className="flex items-center gap-3">
                  <MinimalIcon />
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm text-foreground/75">{item.description}</p>
                <Link href="/sobre#experiencias" className="mt-6 inline-flex text-sm font-medium text-accentDark underline-offset-4 hover:underline">
                  {item.cta}
                </Link>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section title="Método / Cómo funciona" className="bg-white/50">
        <Steps />
      </Section>

      <Section title="Testimonios">
        <Testimonials />
      </Section>

      <Section title="Recursos" subtitle="Contenido breve y accionable para sostener tu proceso entre sesiones.">
        <div className="grid gap-4 md:grid-cols-3">
          {siteContent.resources.map((resource) => (
            <Card key={resource.title} className="border-accentDark/10">
              <p className="text-xs uppercase tracking-[0.2em] text-accentDark/70">{resource.type}</p>
              <h3 className="mt-3 font-serif text-2xl">{resource.title}</h3>
              <p className="mt-2 text-sm text-foreground/75">{resource.description}</p>
              <Link href={resource.href} className="mt-5 inline-flex text-sm font-medium text-accentDark underline-offset-4 hover:underline">
                Ver recurso
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Preguntas frecuentes" className="bg-white/50">
        <FAQ />
      </Section>

      <Section>
        <FinalCta />
      </Section>
    </>
  );
}
