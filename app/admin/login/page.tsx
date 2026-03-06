"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-espresso flex items-center justify-center px-4 grain-overlay">
      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl text-cream">Somos Dualidad</h1>
          <p className="text-cream/50 text-sm mt-2">Panel de administración</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-warm-lg">
          <h2 className="font-display text-xl text-espresso mb-6">Iniciar sesión</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              type="email"
              label="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              type="password"
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              error={error || undefined}
            />
            <Button type="submit" loading={loading} className="w-full mt-2">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
