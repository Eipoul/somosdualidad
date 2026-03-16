import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function AboutSection() {
  return (
    <section className="py-24 bg-brand-bg">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Host photo placeholder */}
          <div className="order-last lg:order-first">
            <div className="relative aspect-[4/5] max-w-sm mx-auto rounded-4xl overflow-hidden shadow-warm-lg">
              <div className="w-full h-full bg-brand-title/10 flex items-center justify-center">
                <div className="text-center text-brand-title/40">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-sm font-medium">Foto del Host</p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-text/20 rounded-full -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-brand-title/15 rounded-full -z-10" />
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-brand-title" />
              <span className="text-brand-title text-sm font-medium uppercase tracking-widest">La creadora</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl text-brand-title leading-tight mb-6">
              Soy Manett
            </h2>

            <div className="space-y-4 text-brand-text leading-relaxed">
              <p>
                Y me fui de mi país porque la vida que tenía dejó de ser suficiente para lo que quería construir.
              </p>
              <p>
                Migré primero a Nueva York, después a España y hoy vivo en Alemania. En ese proceso descubrí algo curioso. Gran parte del contenido en redes sobre migración repite dos discursos: o todo es siempre extrañar... o todo son viajes y fotos bonitas para Instagram.
              </p>
              <p>
                Pero migrar también mueve tu identidad, tu sentido de pertenencia y la forma en la que entiendes tu vida. Durante años he explorado ese proceso desde la experiencia y la conversación con especialistas en salud mental: de ahí nace este espacio.
              </p>
              <p>
                Si lo que buscas es contenido que romantice la vida en el extranjero o que se quede en el dolor de extrañar, este no es tu lugar. Pero si quieres entender qué pasa en tu mente y aprender a atravesar el duelo, la ansiedad y miedo al migrar para construir una vida en otro país, entonces sí: <strong>quédate.</strong>
              </p>
            </div>

            <div className="mt-10">
              <Link href="/subscribe">
                <Button className="bg-brand-title text-brand-subtitle hover:bg-brand-title/80">
                  Quiero ser parte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
