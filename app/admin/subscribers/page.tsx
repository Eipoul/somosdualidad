"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDateShort } from "@/lib/utils";
import type { Subscriber } from "@/lib/utils";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [broadcasting, setBroadcasting] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setSubscribers((data as Subscriber[]) || []);
        setLoading(false);
      });
  }, []);

  function exportCSV() {
    const rows = [["Email", "Estado", "Fecha registro"]];
    subscribers.forEach((s) => rows.push([s.email, s.status, formatDateShort(s.created_at)]));
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "suscriptores.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function sendBroadcast() {
    if (!subject || !body) return alert("Completa el asunto y el mensaje.");
    setBroadcasting(true);
    const res = await fetch("/api/broadcast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, body }),
    });
    setBroadcasting(false);
    if (res.ok) {
      setBroadcastOpen(false);
      setSubject("");
      setBody("");
      alert("Correo enviado correctamente.");
    } else {
      alert("Error al enviar el correo.");
    }
  }

  const active = subscribers.filter((s) => s.status === "active").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-espresso">Suscriptores</h1>
          <p className="text-espresso/50 mt-1">
            {active} activos · {subscribers.length} total
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setBroadcastOpen(true)}>
            Enviar correo masivo
          </Button>
          <Button variant="secondary" onClick={exportCSV}>
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Broadcast modal */}
      {broadcastOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/50 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-warm-lg">
            <h2 className="font-display text-2xl text-espresso mb-6">Correo masivo</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-espresso block mb-1.5">Asunto</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-espresso/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-terracotta/30"
                  placeholder="Asunto del correo"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-espresso block mb-1.5">Mensaje</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full rounded-xl border border-espresso/15 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-terracotta/30 min-h-[120px] resize-y"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={sendBroadcast} loading={broadcasting}>
                Enviar a {active} suscriptores
              </Button>
              <Button variant="ghost" onClick={() => setBroadcastOpen(false)}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-warm-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-espresso/40 animate-pulse">Cargando suscriptores...</div>
        ) : subscribers.length === 0 ? (
          <div className="text-center py-20 text-espresso/40">
            <p className="font-display text-xl mb-2">Sin suscriptores aún</p>
            <p className="text-sm">Los suscriptores aparecerán aquí cuando alguien se registre.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-espresso/8 text-left">
                <th className="px-6 py-4 text-xs font-semibold text-espresso/50 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-espresso/50 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-semibold text-espresso/50 uppercase tracking-wider hidden md:table-cell">Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-espresso/5">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-cream/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm text-espresso">{sub.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={sub.status === "active" ? "success" : "default"}>
                      {sub.status === "active" ? "Activo" : "Cancelado"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-xs text-espresso/40">{formatDateShort(sub.created_at)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
