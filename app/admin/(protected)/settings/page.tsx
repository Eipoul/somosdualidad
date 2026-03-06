"use client";

import { useEffect, useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/lib/utils";

const defaultSettings: SiteSettings = {
  siteTitle: "Somos Dualidad",
  tagline: "Un podcast sobre las dualidades de la vida",
  logoUrl: null,
  socialLinks: {
    instagram: "",
    spotify: "",
    apple: "",
    youtube: "",
    twitter: "",
  },
  seoDescription: "Un podcast sobre las dualidades de la vida: amor y pérdida, fortaleza y vulnerabilidad.",
  ogImageUrl: null,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data) setSettings({ ...defaultSettings, ...data });
      })
      .catch(() => {});
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    if (res.ok) {
      setSuccess("Configuración guardada.");
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError("Error al guardar.");
    }
  }

  const updateSocial = (key: keyof SiteSettings["socialLinks"], value: string) => {
    setSettings((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }));
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-espresso">Configuración</h1>
        <p className="text-espresso/50 mt-1">Ajustes del sitio y SEO.</p>
      </div>

      {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">{success}</div>}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General */}
        <div className="bg-white rounded-2xl p-6 shadow-warm-sm space-y-4">
          <h2 className="font-display text-xl text-espresso">General</h2>
          <Input
            label="Título del sitio"
            value={settings.siteTitle}
            onChange={(e) => setSettings((s) => ({ ...s, siteTitle: e.target.value }))}
          />
          <Input
            label="Tagline"
            value={settings.tagline}
            onChange={(e) => setSettings((s) => ({ ...s, tagline: e.target.value }))}
          />
          <Input
            label="URL del logo"
            value={settings.logoUrl || ""}
            onChange={(e) => setSettings((s) => ({ ...s, logoUrl: e.target.value || null }))}
            placeholder="https://..."
          />
        </div>

        {/* SEO */}
        <div className="bg-white rounded-2xl p-6 shadow-warm-sm space-y-4">
          <h2 className="font-display text-xl text-espresso">SEO</h2>
          <Textarea
            label="Meta descripción"
            value={settings.seoDescription}
            onChange={(e) => setSettings((s) => ({ ...s, seoDescription: e.target.value }))}
            rows={3}
          />
          <Input
            label="URL de OG Image"
            value={settings.ogImageUrl || ""}
            onChange={(e) => setSettings((s) => ({ ...s, ogImageUrl: e.target.value || null }))}
            placeholder="https://..."
          />
        </div>

        {/* Social */}
        <div className="bg-white rounded-2xl p-6 shadow-warm-sm space-y-4">
          <h2 className="font-display text-xl text-espresso">Redes sociales</h2>
          {(["instagram", "spotify", "apple", "youtube", "twitter"] as const).map((platform) => (
            <Input
              key={platform}
              label={platform.charAt(0).toUpperCase() + platform.slice(1)}
              value={settings.socialLinks[platform] || ""}
              onChange={(e) => updateSocial(platform, e.target.value)}
              placeholder={`https://${platform}.com/somosdualidad`}
            />
          ))}
        </div>

        <Button type="submit" size="lg" loading={saving}>
          Guardar configuración
        </Button>
      </form>
    </div>
  );
}
