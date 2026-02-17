import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conoce la historia, manifiesto y experiencias de Somos Dualidad."
};

export default function AboutPage() {
  return (
    <>
      <Section className="pb-8 pt-12 md:pt-16">
        <p className="text-sm uppercase tracking-[0.2em] text-accentDark/70">Sobre Somos Dualidad</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">TODO: Historia y propósito de marca</h1>
        <p className="mt-5 max-w-3xl text-foreground/75">{siteContent.manifestoLong}</p>
      </Section>

      <Section title="Valores" className="bg-white/55">
        <div className="grid gap-4 md:grid-cols-3">
          {siteContent.values.map((value) => (
            <Card key={value.title}>
              <h2 className="font-serif text-2xl">{value.title}</h2>
              <p className="mt-2 text-sm text-foreground/75">{value.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="experiencias" title="Experiencias en detalle">
        <div className="space-y-4">
          {siteContent.experiences.map((experience) => (
            <Card key={experience.title} className="md:p-8">
              <h3 className="font-serif text-2xl">{experience.title}</h3>
              <p className="mt-3 max-w-3xl text-foreground/75">{experience.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-accentDark/10 bg-gradient-to-r from-white to-warmGray-100 p-8">
          <h2 className="font-serif text-3xl">{siteContent.finalCta.title}</h2>
          <p className="mt-2 max-w-2xl text-foreground/75">{siteContent.finalCta.description}</p>
          <div className="mt-5">
            <Button href="/contacto">{siteContent.finalCta.buttonLabel}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
