import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="grain-overlay relative min-h-[90vh] flex items-center bg-gradient-to-br from-espresso via-espresso-light to-espresso-medium overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-terracotta/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-rose-dusty/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-page relative z-10 py-24">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-terracotta/20 text-terracotta px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-terracotta rounded-full animate-pulse" />
            Podcast en Español
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-cream leading-tight mb-6 animate-fade-up">
            Somos
            <br />
            <span className="text-terracotta italic">Dualidad</span>
          </h1>

          {/* Tagline */}
          <p className="text-cream/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl animate-fade-up">
            Exploramos las dualidades de la vida: el amor y la pérdida, la fortaleza y la vulnerabilidad, la tradición y el cambio.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-up">
            <Link href="/podcast">
              <Button size="lg" className="bg-terracotta text-white hover:bg-terracotta-dark">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Escuchar ahora
              </Button>
            </Link>
            <Link href="/subscribe">
              <Button size="lg" variant="outline" className="border-cream/30 text-cream hover:bg-cream/10 hover:text-cream hover:border-cream/50">
                Suscribirse
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-14 pt-8 border-t border-cream/10">
            {[
              { value: "50+", label: "Episodios" },
              { value: "10K+", label: "Escuchas" },
              { value: "2+", label: "Temporadas" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl text-terracotta font-bold">{stat.value}</div>
                <div className="text-xs text-cream/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0 80L1440 80L1440 20C1200 70 900 0 600 40C300 80 100 10 0 40V80Z" fill="#FAF7F2" />
        </svg>
      </div>
    </section>
  );
}
