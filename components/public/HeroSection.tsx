import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="grain-overlay relative min-h-[90vh] flex items-center bg-brand-bg overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-title/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brand-text/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-title/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-page relative z-10 py-24">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-brand-title/15 text-brand-title px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-brand-title rounded-full animate-pulse" />
            Podcast en Español
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-brand-title leading-tight mb-6 animate-fade-up">
            Somos
            <br />
            <span className="text-brand-text italic">Dualidad</span>
          </h1>

          {/* Tagline */}
          <div className="text-brand-text text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl animate-fade-up space-y-4">
            <p>
              Conversaciones entre Psicólogos, migrantes rompiéndola con proyectos brutales y mi propia experiencia que muestra la magia que existe de exponerte a nuevos contextos, cambiar de país y retos.
            </p>
            <p>
              Somos Dualidad es un proyecto acerca de lo incómodo que es vivir en el extranjero, hablamos de tolerancia al cambio, a la frustración, resiliencia y adaptación real a través de decisiones incómodas.
            </p>
            <p>
              Aquí odiamos la frase &ldquo;no eres ni de aquí ni de allá&rdquo;, somos de ambos. <span className="font-semibold text-brand-title">#SomosDualidad</span>
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-up">
            <a
              href="https://open.spotify.com/show/0AonWgzQ3YxWRrY6xQ4plt?si=b9000984e54f44e9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-brand-title text-brand-subtitle hover:bg-brand-title/80">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Escuchar ahora
              </Button>
            </a>
            <Link href="/subscribe">
              <Button size="lg" variant="outline" className="border-brand-title/30 text-brand-title hover:bg-brand-title/10 hover:border-brand-title/50">
                Suscribirse
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-14 pt-8 border-t border-brand-title/20">
            {[
              { value: "50+", label: "Episodios" },
              { value: "10K+", label: "Escuchas" },
              { value: "2+", label: "Temporadas" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl text-brand-title font-bold">{stat.value}</div>
                <div className="text-xs text-brand-text/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0 80L1440 80L1440 20C1200 70 900 0 600 40C300 80 100 10 0 40V80Z" fill="#F0AFA6" />
        </svg>
      </div>
    </section>
  );
}
