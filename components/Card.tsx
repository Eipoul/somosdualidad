import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardProps = {
  className?: string;
  children: ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <article className={cn("group rounded-2xl border border-accentDark/8 bg-white/50 p-8 shadow-subtle transition-all duration-300 hover:bg-white/60 hover:shadow-refined hover:border-accentDark/15", className)}>
      {children}
    </article>
  );
}
