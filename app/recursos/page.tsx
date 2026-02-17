import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: "Recursos",
  description: "Recursos prácticos de Somos Dualidad para sostener procesos personales."
};

export default function ResourcesPage() {
  return (
    <Section title="Recursos" subtitle="TODO: Presenta aquí artículos, audios, descargables o guías de práctica.">
      <div className="grid gap-4 md:grid-cols-3">
        {siteContent.resources.map((resource) => (
          <Card key={resource.title}>
            <p className="text-xs uppercase tracking-[0.2em] text-accentDark/70">{resource.type}</p>
            <h1 className="mt-3 font-serif text-2xl">{resource.title}</h1>
            <p className="mt-2 text-sm text-foreground/75">{resource.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
