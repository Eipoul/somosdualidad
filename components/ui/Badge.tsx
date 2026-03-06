import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "terracotta" | "sage" | "rose" | "espresso" | "success" | "warning" | "error";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-espresso/8 text-espresso",
  terracotta: "bg-terracotta/10 text-terracotta-dark",
  sage: "bg-sage/15 text-sage-dark",
  rose: "bg-rose-dusty/20 text-rose-dark",
  espresso: "bg-espresso text-cream",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  error: "bg-red-100 text-red-800",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
