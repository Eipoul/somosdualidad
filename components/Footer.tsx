import Link from "next/link";
import { siteContent } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-accentDark/10 bg-warmGray-100/60 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-serif text-xl">{siteContent.brand.name}</p>
          <p className="mt-3 text-sm text-foreground/70">{siteContent.brand.valueProposition}</p>
        </div>

        <div>
          <p className="text-sm font-semibold">Redes</p>
          <ul className="mt-3 space-y-2">
            {siteContent.social.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-foreground/75 hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Legal</p>
          <ul className="mt-3 space-y-2">
            {siteContent.legal.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-foreground/75 hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-foreground/60">© {new Date().getFullYear()} {siteContent.brand.name}</p>
        </div>
      </div>
    </footer>
  );
}
