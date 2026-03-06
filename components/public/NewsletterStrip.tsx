"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function NewsletterStrip() {
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
        setMessage(data.message || "¡Gracias por suscribirte!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Algo salió mal. Inténtalo de nuevo.");
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Inténtalo de nuevo.");
    }
  }

  return (
    <section className="py-20 bg-brand-title grain-overlay overflow-hidden">
      <div className="container-page relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl text-brand-subtitle mb-4">
            No te pierdas ningún episodio
          </h2>
          <p className="text-brand-subtitle/70 mb-10 text-lg">
            Suscríbete y recibe cada nuevo episodio directo en tu bandeja de entrada, junto con contenido exclusivo.
          </p>

          {status === "success" ? (
            <div className="bg-brand-subtitle/15 rounded-2xl px-8 py-6 text-brand-subtitle">
              <div className="text-4xl mb-3">🌿</div>
              <p className="font-medium text-lg">{message}</p>
              <p className="text-brand-subtitle/70 text-sm mt-2">Revisa tu correo para confirmar tu suscripción.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="flex-1 rounded-full px-6 py-3 bg-brand-subtitle text-brand-title placeholder-brand-title/40 text-sm outline-none focus:ring-2 focus:ring-brand-subtitle/50 transition-all"
              />
              <Button
                type="submit"
                loading={status === "loading"}
                className="bg-brand-bg text-brand-title hover:bg-brand-bg/80 rounded-full whitespace-nowrap"
              >
                Suscribirme
              </Button>
            </form>
          )}

          {status === "error" && (
            <p className="text-brand-subtitle/80 text-sm mt-3">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
