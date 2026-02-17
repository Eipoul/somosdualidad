import { siteContent } from "@/content/site";
import { Card } from "@/components/Card";

export function Steps() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {siteContent.methodSteps.map((step, index) => (
        <Card key={step.title} className="relative border-accentDark/15 bg-gradient-to-b from-white/80 to-warmGray-100/80">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-accentDark/70">Paso {index + 1}</p>
          <h3 className="font-serif text-2xl">{step.title}</h3>
          <p className="mt-2 text-sm text-foreground/75">{step.description}</p>
        </Card>
      ))}
    </div>
  );
}
