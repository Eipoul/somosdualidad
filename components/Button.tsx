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
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentLight focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accentDark text-background hover:bg-[#3A3939]",
  secondary: "border border-accentDark/40 bg-transparent text-foreground hover:bg-warmGray-100",
  ghost: "bg-transparent text-foreground hover:bg-warmGray-100"
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
