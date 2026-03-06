"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/podcast", label: "Podcast" },
  { href: "/blog", label: "Blog" },
  { href: "/subscribe", label: "Suscríbete" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-cream/80 backdrop-blur-md border-b border-espresso/8">
      <nav className="container-page flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="font-display text-xl font-bold text-espresso tracking-tight hover:text-terracotta transition-colors">
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
                  ? "text-terracotta"
                  : "text-espresso/70 hover:text-espresso"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/subscribe"
            className="bg-terracotta text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-terracotta-dark transition-colors shadow-warm-sm"
          >
            Escuchar ahora
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-espresso"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-espresso mb-1" />
          <span className="block w-5 h-0.5 bg-espresso mb-1" />
          <span className="block w-5 h-0.5 bg-espresso" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream border-b border-espresso/8 px-4 py-4 flex flex-col gap-4 animate-fade-in">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-sm font-medium",
                pathname === link.href ? "text-terracotta" : "text-espresso/70"
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
