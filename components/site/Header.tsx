import Link from 'next/link'

const links = [
  { label: 'Episodios', href: '/#episodios' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Suscríbete', href: '/#suscribete' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">Somos Dualidad</Link>
        <ul className="flex gap-6 text-sm text-zinc-300">
          {links.map((link) => (
            <li key={link.href}>
              <Link className="transition hover:text-white" href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
