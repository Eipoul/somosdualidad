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
              <span className="text-brand-title text-sm font-medium uppercase tracking-widest">Nuestra Historia</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl text-brand-title leading-tight mb-6">
              Dos voces,
              <br />
              <span className="text-brand-text italic">una conversación</span>
            </h2>

            <div className="space-y-4 text-brand-text leading-relaxed">
              <p>
                Somos Dualidad nació de la necesidad de hablar con honestidad sobre la complejidad de ser humano. Sobre esos momentos en que dos cosas aparentemente opuestas coexisten: la alegría y el duelo, la certeza y la duda.
              </p>
              <p>
                Cada episodio es una conversación profunda y auténtica que busca resonar con tu propia historia, recordándote que no estás solo en la tuya.
              </p>
            </div>

            <div className="mt-10">
              <Link href="/podcast">
                <Button variant="outline" className="border-brand-title/20 text-brand-title hover:bg-brand-title hover:text-brand-subtitle">
                  Conoce nuestros episodios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
