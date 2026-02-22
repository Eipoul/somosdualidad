import Link from 'next/link'
import {FadeIn} from '@/components/FadeIn'
import {NewsletterForm} from '@/components/NewsletterForm'
import {getFeaturedEpisode, getLatestEpisodes} from '@/lib/sanity/podcast'

export async function DummyHomePage() {
  const [latest, featured] = await Promise.all([
    getLatestEpisodes(6).catch(() => []),
    getFeaturedEpisode().catch(() => null),
  ])

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <FadeIn>
        <section className="py-16 text-center md:py-24">
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">Podcast</p>
          <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">Pensar en dualidad para vivir con más claridad.</h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-neutral-600">Conversaciones íntimas sobre identidad, creatividad y equilibrio emocional.</p>
          <Link href="/episodios" className="mt-10 inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-85">Escuchar episodios</Link>
        </section>
      </FadeIn>

      <section className="mx-auto max-w-3xl border-y border-neutral-200 py-16 text-center">
        <h2 className="text-3xl font-medium">¿Qué es Somos Dualidad?</h2>
        <p className="mt-6 text-balance text-lg leading-relaxed text-neutral-600">Somos Dualidad es una plataforma editorial y sonora para explorar los contrastes que atraviesan la experiencia humana: pausa y ambición, vulnerabilidad y fuerza, silencio y expresión.</p>
      </section>

      <section className="py-16">
        <h3 className="text-3xl font-medium">Últimos episodios</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {latest.map((episode) => (
            <article key={episode._id} className="rounded-2xl border border-neutral-200 p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{episode.season?.title || 'Podcast'}</p>
              <h4 className="mt-3 text-xl font-medium">{episode.title}</h4>
              <p className="mt-3 text-sm text-neutral-600">{episode.description}</p>
            </article>
          ))}
        </div>
      </section>

      {featured ? (
        <section className="rounded-3xl bg-neutral-950 px-8 py-12 text-white md:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">Episodio destacado</p>
          <h3 className="mt-4 text-3xl font-medium">{featured.title}</h3>
          <p className="mt-4 max-w-3xl text-neutral-300">{featured.description}</p>
        </section>
      ) : null}

      <section className="py-16">
        <NewsletterForm title="Recibe nuevos episodios" subtitle="Una nota semanal con ideas, reflexiones y novedades de la comunidad." buttonLabel="Suscribirme" consentLabel="Acepto recibir correos de Somos Dualidad" successMessage="Gracias por suscribirte." />
      </section>
    </div>
  )
}
