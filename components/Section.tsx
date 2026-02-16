import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, title, subtitle, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <header className="mb-10 max-w-2xl space-y-4">
            {title ? <h2 className="font-serif text-3xl leading-tight md:text-4xl">{title}</h2> : null}
            {subtitle ? <p className="text-base text-foreground/75 md:text-lg">{subtitle}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
