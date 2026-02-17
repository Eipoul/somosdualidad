"use client";

import Link from "next/link";
import { useState } from "react";
import { siteContent } from "@/content/site";
import { Button } from "@/components/Button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-accentDark/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-xl tracking-wide">
          {siteContent.brand.logoText}
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          {siteContent.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-foreground/80 transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={siteContent.brand.primaryCta.href}>{siteContent.brand.primaryCta.label}</Button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentLight md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Abrir menú"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-6 bg-foreground" />
          <span className="mt-1 block h-0.5 w-6 bg-foreground" />
          <span className="mt-1 block h-0.5 w-6 bg-foreground" />
        </button>
      </div>

      {isOpen ? (
        <nav id="mobile-menu" className="border-t border-accentDark/10 bg-background px-4 py-4 md:hidden" aria-label="Móvil">
          <div className="flex flex-col gap-3">
            {siteContent.navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm" onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Button href={siteContent.brand.primaryCta.href}>{siteContent.brand.primaryCta.label}</Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
