import Link from 'next/link'
import type {SiteSettings} from '@/lib/sanity/types'

export function Footer({settings}: {settings: SiteSettings | null}) {
  return (
    <footer className="border-t border-accentDark/10 bg-warmGray-100/70 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-serif text-xl">{settings?.siteName || 'Somos Dualidad'}</p>
          <p className="mt-3 text-sm text-foreground/70">{settings?.footerCopy || settings?.brandCopy}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Redes</p>
          <ul className="mt-3 space-y-2">{(settings?.socialLinks || []).map((item, idx) => <li key={`${item.href}-${idx}`}><Link href={item.href || '#'} className="text-sm text-foreground/75 hover:text-foreground">{item.label}</Link></li>)}</ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Legal</p>
          <ul className="mt-3 space-y-2">{(settings?.legalLinks || []).map((item, idx) => <li key={`${item.href}-${idx}`}><Link href={item.href || '#'} className="text-sm text-foreground/75 hover:text-foreground">{item.label}</Link></li>)}</ul>
          <p className="mt-4 text-xs text-foreground/60">© {new Date().getFullYear()} {settings?.siteName || 'Somos Dualidad'}</p>
        </div>
      </div>
    </footer>
  )
}
