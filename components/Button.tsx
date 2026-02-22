import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type LinkButtonProps = SharedProps & {
  href: string;
};

type ActionButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

const baseStyles =
  "inline-flex items-center justify-center rounded-lg px-7 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentLight focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:shadow-subtle active:scale-95";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accentDark text-background hover:bg-[#3A3939] shadow-subtle",
  secondary: "border border-accentDark/20 bg-white/40 text-foreground hover:bg-white/60 hover:border-accentDark/30",
  ghost: "bg-transparent text-foreground hover:bg-warmGray-50"
};

export function Button(props: LinkButtonProps | ActionButtonProps) {
  const { children, className, variant = "primary" } = props;

  const styles = cn(baseStyles, variants[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={styles}>
      {children}
    </button>
  );
}
