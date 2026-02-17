import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";

import { sanityClient } from "@/lib/sanity/client";

type Cta = {
  label?: string;
  href?: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type BaseSection = {
  _type: string;
  title?: string;
  subtitle?: string;
};

type HeroSection = BaseSection & {
  _type: "blocksHero";
  eyebrow?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

type TextSection = BaseSection & {
  _type: "blocksText";
  align?: "left" | "center";
  // Nota: body es Portable Text (array de blocks). Aquí no lo renderizamos todavía.
  body?: unknown;
};

type FaqSection = BaseSection & {
  _type: "blocksFaq";
  items?: FaqItem[];
};

type CtaSection = BaseSection & {
  _type: "blocksCta";
  button?: Cta;
};

type PageHome = {
  seo?: {
    title?: string;
    description?: string;
  };
  sections?: Array<HeroSection | TextSection | FaqSection | CtaSection | BaseSection>;
};

const query = `*[_type=="pageHome"][0]{
  seo,
  sections[]{
    _type,
    eyebrow,
    title,
    subtitle,
    primaryCta,
    secondaryCta,
    align,
    body,
    items,
    button
  }
}`;

function AbstractHeroVisual() {
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-accentDark/10 bg-gradient-to-br from-accentLight/20 via-white to-accentDark/10 shadow-soft">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(200,169,126,0.4),transparent_55%)]" />
      <div className="absolute -left-8 bottom-8 h-44 w-44 rounded-full bg-accentDark/15 blur-2xl" />
      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-accentLight/30 blur-2xl" />
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 600 320" aria-hidden="true">
        <path
          d="M40 240 C180 140, 290 280, 560 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-accentDark/45"
        />
        <path
          d="M20 110 C150 210, 300 70, 590 180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-accentLight"
        />
      </svg>
    </div>
  );
}

export default async function HomePage() {
  const page = (await sanityClient.fetch(query, {}, { next: { revalidate: 60 } })) as PageHome | null;

  if (!page) {
    return (
      <Section className="py-20 text-center">
        Crea y publica el documento Home Page en el admin (Sanity).
      </Section>
    );
  }

  return (
    <>
      {page.sections?.map((s, idx) => {
        switch (s._type) {
          case "blocksHero": {
            const hero = s as HeroSection;
            return (
              <Section key={idx} className="pb-12 pt-10 md:pt-16">
                <div className="grid items-center gap-8 md:grid-cols-2">
                  <FadeIn>
                    {hero.eyebrow ? (
                      <p className="text-sm uppercase tracking-[0.2em] text-accentDark/70">{hero.eyebrow}</p>
                    ) : null}

                    <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">{hero.title}</h1>

                    {hero.subtitle ? (
                      <p className="mt-4 max-w-xl text-base text-foreground/75 md:text-lg">{hero.subtitle}</p>
                    ) : null}

                    <div className="mt-8 flex flex-wrap gap-3">
                      {hero.primaryCta?.label ? (
                        <Button href={hero.primaryCta.href || "#"}>{hero.primaryCta.label}</Button>
                      ) : null}

                      {hero.secondaryCta?.label ? (
                        <Button href={hero.secondaryCta.href || "#"} variant="secondary">
                          {hero.secondaryCta.label}
                        </Button>
                      ) : null}
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                    <AbstractHeroVisual />
                  </FadeIn>
                </div>
              </Section>
            );
          }

          case "blocksText": {
            const text = s as TextSection;
            const centered = text.align === "center";

            return (
              <Section key={idx} className="bg-white/55">
                <div className={centered ? "text-center" : ""}>
                  {text.title ? <h2 className="font-serif text-3xl md:text-4xl">{text.title}</h2> : null}

                  {/* Placeholder: en el siguiente paso renderizamos PortableText real */}
                  <p className="mt-6 text-lg leading-relaxed text-foreground/80">
                    Contenido editable desde Sanity (Portable Text).
                  </p>
                </div>
              </Section>
            );
          }

          case "blocksFaq": {
            const faq = s as FaqSection;

            return (
              <Section key={idx} title={faq.title || "Preguntas frecuentes"} className="bg-white/50">
                <div className="mt-6 space-y-3">
                  {(faq.items || []).map((item, i) => (
                    <details key={i} className="rounded-lg border p-4">
                      <summary className="cursor-pointer font-medium">{item.q}</summary>
                      <p className="mt-2 text-foreground/75">{item.a}</p>
                    </details>
                  ))}
                </div>
              </Section>
            );
          }

case "blocksCta": {
  const cta = s as CtaSection;

  return (
    <Section key={idx}>
      <div className="rounded-2xl border border-accentDark/10 bg-white/60 p-8">
        {cta.title ? <h2 className="font-serif text-3xl">{cta.title}</h2> : null}
        {cta.subtitle ? <p className="mt-3 text-foreground/75">{cta.subtitle}</p> : null}

        {cta.button?.label ? (
          <div className="mt-6">
            <Button href={cta.button.href || "#"}>{cta.button.label}</Button>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
          default:
            return null;
        }
      })}
    </>
  );
}