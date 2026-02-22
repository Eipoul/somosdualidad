# Somos Dualidad · Next.js + Sanity Visual Builder

Portal web + CMS con edición visual en vivo para `somosdualidad.com`.

## Requisitos

- Node.js 18.18+ (recomendado Node 20)
- npm 9+

## Variables de entorno

### Next.js (`.env.local`)

```env
NEXT_PUBLIC_SITE_URL=https://somosdualidad.com
NEXT_PUBLIC_SANITY_PROJECT_ID=qi7d9rsb
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=tu_token_read_para_preview_drafts
SANITY_API_WRITE_TOKEN=tu_token_write_para_newsletter
SANITY_PREVIEW_SECRET=secret_compartido_preview
```

### Studio (`sanity/.env`)

```env
SANITY_STUDIO_PROJECT_ID=qi7d9rsb
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=https://somosdualidad.com
SANITY_STUDIO_PREVIEW_SECRET=el_mismo_secret_de_SANITY_PREVIEW_SECRET
```

## Ejecutar en local

### Web (Next.js)

```bash
npm install
npm run dev
```

### Studio (Sanity)

```bash
cd sanity
npm install
npm run dev
```

## Cómo funciona el preview visual en vivo

- Sanity usa **Presentation Tool** y abre el sitio real en un iframe.
- El botón de preview habilita draft mode vía `/api/draft/enable`.
- El botón para salir lo desactiva vía `/api/draft/disable`.
- En draft mode, la web consulta Sanity con:
  - `perspective: "drafts"`
  - `stega: true`
  - token de solo lectura
- Esto permite **click-to-edit overlays**: al hacer click en un bloque del preview se abre el campo correcto en Studio.

## Draft mode (publicado vs borrador)

- **Producción normal**: solo contenido publicado (`perspective: "published"`, `useCdn: true`).
- **Preview/draft mode**: incluye borradores (`perspective: "drafts"`, `useCdn: false`).
- Endpoints:
  - `GET /api/draft/enable?secret=...&slug=/ruta`
  - `GET /api/draft/disable`
- Compatibilidad legacy mantenida:
  - `/api/draft-mode/enable`
  - `/api/draft-mode/disable`

## Dashboard editorial en Sanity

La barra lateral del Studio se simplificó para usuarios no técnicos:

1. ⭐ Site Settings
2. 🏠 Homepage
3. 🎙️ Podcast Page
4. 📄 Pages
5. ⚙️ Global Settings
6. 📬 Newsletter Subscribers

Además:

- Se ocultaron tipos técnicos del sidebar principal.
- Se añadieron descripciones, labels amigables y placeholders en schemas.
- El constructor de secciones mantiene reorder visual drag-and-drop.
- Cada tipo de sección tiene icono y preview más descriptivo.

## Newsletter (almacenamiento en Sanity)

### Flujo

1. Editor agrega bloque `Newsletter Signup Section` en una página.
2. Usuario envía formulario desde frontend.
3. Next.js recibe `POST /api/newsletter`.
4. El endpoint guarda/actualiza documento `newsletterSignup` en Sanity dataset.

### Anti-spam incluido

- Honeypot (`website` hidden field).
- Tiempo mínimo de llenado (`startedAt`).
- Validación server-side de nombre/email.

### Documento guardado

Tipo: `newsletterSignup`

- `name`
- `email`
- `consent` (opcional)
- `sourcePage`
- `submittedAt`

## Cómo editar páginas visualmente

1. Entra a Studio.
2. Abre **Presentation**.
3. Navega y edita desde el preview visual.
4. Haz click sobre una sección para saltar al campo correspondiente.
5. Revisa cambios en tiempo real sin publicar.
6. Publica cuando esté aprobado.

## Instrucciones para probar live preview

1. Asegura que `SANITY_PREVIEW_SECRET` y `SANITY_STUDIO_PREVIEW_SECRET` coincidan.
2. Levanta web + Studio en local (o usa deploys en Vercel/Sanity).
3. En Studio abre Presentation.
4. Edita texto de una sección sin publicar.
5. Verifica que el iframe se actualiza al instante.
6. Haz click en un bloque del preview y valida que te lleve al campo exacto.

## Instrucciones para probar newsletter

1. Inserta bloque `Newsletter Signup Section` en una página y publica la página.
2. Abre la página en el frontend.
3. Envía formulario con nombre/email válidos.
4. Verifica mensaje de éxito.
5. En Studio abre **Newsletter Subscribers** y confirma el nuevo registro.

## Build y checks

```bash
npm run typecheck
npm run build
cd sanity && npm run build
```
