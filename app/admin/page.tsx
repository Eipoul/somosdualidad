import Link from 'next/link'

const cards = [
  {
    title: 'Open Sanity Studio',
    description: 'Edit homepage sections, global settings, episodes, and newsletter subscribers.',
    href: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://admin.somosdualidad.com/studio',
  },
]

export default function AdminHubPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Admin Hub</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">All website content is managed from Sanity.</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <h2 className="text-2xl font-medium">{card.title}</h2>
            <p className="mt-3 text-neutral-600">{card.description}</p>
            <Link href={card.href} className="mt-8 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white" target="_blank" rel="noreferrer">Open Studio</Link>
          </article>
        ))}
      </div>
    </section>
  )
}
