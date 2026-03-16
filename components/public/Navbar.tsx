"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/podcast", label: "Episodios" },
  { href: "/psicologos", label: "Psicólogos" },
  { href: "/blog", label: "Blog" },
  { href: "/subscribe", label: "Suscríbete" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-title/10">
      <nav className="container-page flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="font-display text-xl font-bold text-brand-title tracking-tight hover:text-brand-text transition-colors">
          Somos Dualidad
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                pathname === link.href
                  ? "text-brand-title"
                  : "text-brand-text hover:text-brand-title"
              )}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://open.spotify.com/show/0AonWgzQ3YxWRrY6xQ4plt?si=b9000984e54f44e9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-title text-brand-subtitle text-sm font-medium px-5 py-2 rounded-full hover:bg-brand-title/80 transition-colors shadow-warm-sm"
          >
            Escuchar ahora
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-brand-title"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-brand-title mb-1" />
          <span className="block w-5 h-0.5 bg-brand-title mb-1" />
          <span className="block w-5 h-0.5 bg-brand-title" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-bg border-b border-brand-title/10 px-4 py-4 flex flex-col gap-4 animate-fade-in">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-sm font-medium",
                pathname === link.href ? "text-brand-title" : "text-brand-text"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
