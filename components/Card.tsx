import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardProps = {
  className?: string;
  children: ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <article className={cn("rounded-3xl border border-accentDark/10 bg-white/70 p-6 shadow-soft", className)}>
      {children}
    </article>
  );
}
