"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const perks = [
  { icon: "🎙️", title: "Nuevos episodios", desc: "Sé el primero en escuchar cada nuevo episodio." },
  { icon: "✍️", title: "Contenido exclusivo", desc: "Artículos y reflexiones detrás de cámaras." },
  { icon: "🌿", title: "Comunidad", desc: "Forma parte de una comunidad de oyentes conscientes." },
  { icon: "💌", title: "Sin spam", desc: "Solo te escribimos cuando tenemos algo valioso que compartir." },
];

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "¡Bienvenida!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Algo salió mal.");
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Inténtalo de nuevo.");
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="grain-overlay bg-gradient-to-br from-espresso via-espresso-light to-espresso-medium py-24">
        <div className="container-page relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-terracotta/20 text-terracotta px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-terracotta rounded-full" />
            Newsletter gratuito
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-cream leading-tight mb-6">
            Únete a la conversación
          </h1>
          <p className="text-cream/70 text-lg">
            Suscríbete para recibir nuevos episodios y contenido exclusivo directamente en tu correo.
          </p>
        </div>
      </div>

      {/* Form + perks */}
      <div className="container-page py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Form */}
          <div className="bg-white rounded-4xl p-10 shadow-warm-lg">
            {status === "success" ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-6">🌿</div>
                <h2 className="font-display text-3xl text-espresso mb-3">¡Bienvenida!</h2>
                <p className="text-espresso/60 leading-relaxed">{message}</p>
                <p className="text-espresso/40 text-sm mt-4">Revisa tu bandeja de entrada para confirmar.</p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-3xl text-espresso mb-2">Suscríbete gratis</h2>
                <p className="text-espresso/60 mb-8">Sin costo, sin spam. Cancela cuando quieras.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <Input
                    type="email"
                    label="Tu correo electrónico"
                    placeholder="hola@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    error={status === "error" ? message : undefined}
                  />
                  <Button type="submit" size="lg" loading={status === "loading"} className="w-full">
                    Suscribirme ahora
                  </Button>
                </form>
                <p className="text-xs text-espresso/40 mt-6 text-center">
                  Al suscribirte aceptas recibir correos de Somos Dualidad. Puedes cancelar en cualquier momento.
                </p>
              </>
            )}
          </div>

          {/* Perks */}
          <div className="flex flex-col justify-center gap-8">
            <h2 className="font-display text-2xl text-espresso">¿Qué recibirás?</h2>
            <div className="grid grid-cols-1 gap-6">
              {perks.map((perk) => (
                <div key={perk.title} className="flex items-start gap-4">
                  <span className="text-2xl">{perk.icon}</span>
                  <div>
                    <h3 className="font-semibold text-espresso mb-1">{perk.title}</h3>
                    <p className="text-sm text-espresso/60">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
