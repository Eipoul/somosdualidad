# Somos Dualidad · Next.js + Sanity + Builder.io

Arquitectura híbrida:
- **Sanity**: fuente de verdad para episodios y estructura editorial.
- **Builder.io**: constructor visual para páginas marketing/layout.
- **Next.js 14 App Router**: runtime y capa de integración.

## Variables de entorno

### Web (`.env.local`)

```env
NEXT_PUBLIC_SITE_URL=https://somosdualidad.com

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=qi7d9rsb
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=token_read_preview
SANITY_API_WRITE_TOKEN=token_write_newsletter
SANITY_PREVIEW_SECRET=shared_preview_secret

# Builder
NEXT_PUBLIC_BUILDER_API_KEY=builder_public_key
BUILDER_PRIVATE_API_KEY=builder_private_key
BUILDER_PREVIEW_SECRET=builder_preview_secret
NEXT_PUBLIC_BUILDER_EDITOR_URL=https://builder.io/content

# Admin links
NEXT_PUBLIC_SANITY_STUDIO_URL=https://admin.somosdualidad.com/studio
```

### Studio (`sanity/.env`)

```env
SANITY_STUDIO_PROJECT_ID=qi7d9rsb
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=https://somosdualidad.com
SANITY_STUDIO_PREVIEW_SECRET=shared_preview_secret
```

## Rutas clave

- `/` → intenta Builder primero, fallback a Sanity, fallback final a homepage dummy.
- `/[...page]` → intenta Builder primero, fallback a páginas Sanity.
- `/admin` → Admin Hub con accesos rápidos a Sanity y Builder.
- `/api/builder/preview?url=/ruta&secret=...` → activa draft mode para previsualizar borradores Builder.
- `/api/newsletter` → suscripción newsletter con honeypot + rate limit.

## Modelos y schemas

### Builder
- `page` (urlPath)
- bloques sugeridos para el editor: Hero, TextBlock, CTA, Newsletter, Episode grid, Featured episode.
- plantilla inicial del home: `scripts/seed-builder-homepage.mjs`

### Sanity
- `episode`
- `season`
- `globalSettings`
- `newsletterSubscriber`

Consultas tipadas para episodios:
- `lib/sanity/podcast.ts`

## Newsletter

`POST /api/newsletter` guarda en Sanity documento `newsletterSubscriber`:
- name
- email
- consent
- sourcePage
- createdAt

Protecciones incluidas:
- honeypot (`website`)
- validación temporal mínima (`startedAt`)
- rate limit básico en memoria por IP

## Seeder de homepage inicial en Builder

```bash
node scripts/seed-builder-homepage.mjs
```

Esto crea/actualiza una página `page` en `/` con estructura:
1. Hero
2. Qué es Somos Dualidad
3. Latest Episodes
4. Featured Episode
5. Newsletter

## Editor workflow (no técnico)

1. Entra a `/admin`.
2. Usa **Edit Website Pages** para maquetar visualmente en Builder.
3. Usa **Edit Podcast Content** para gestionar episodios/temporadas en Sanity.
4. Previsualiza cambios con borradores antes de publicar.

## Deploy en Vercel

1. Configura todas las variables de entorno.
2. Añade `https://somosdualidad.com` y `https://admin.somosdualidad.com` como URLs de preview confiables en Builder.
3. Configura en Builder preview URL:
   - `https://somosdualidad.com/api/builder/preview?url={{url}}&secret=BUILDER_PREVIEW_SECRET`
4. Ejecuta checks:

```bash
npm run typecheck
npm run build
cd sanity && npm run build
```
