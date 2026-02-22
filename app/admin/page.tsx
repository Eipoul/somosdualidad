import Link from 'next/link'

const cards = [
  {
    title: 'Edit Podcast Content',
    description: 'Manage episodes, seasons, and podcast details in Sanity Studio.',
    href: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://admin.somosdualidad.com/studio',
  },
  {
    title: 'Edit Website Pages',
    description: 'Design and update the website visually in Builder.io.',
    href: process.env.NEXT_PUBLIC_BUILDER_EDITOR_URL || 'https://builder.io/content',
  },
]

export default function AdminHubPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-sm uppercase tracking-[0.22em] text-neutral-500">Somos Dualidad</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Admin Hub</h1>
      <p className="mt-6 max-w-2xl text-lg text-neutral-600">Choose what you want to edit. Everything is organized so you can update content confidently without technical steps.</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5">
            <h2 className="text-2xl font-medium">{card.title}</h2>
            <p className="mt-3 text-neutral-600">{card.description}</p>
            <Link href={card.href} className="mt-8 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white" target="_blank" rel="noreferrer">
              Open tool
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
