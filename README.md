# Somos Dualidad · Next.js + Sanity Page Builder

Portal web + CMS para editar contenido completo de `somosdualidad.com` desde Sanity Studio.

## Requisitos

- Node.js 18.18+ (recomendado Node 20)
- npm 9+

## Variables de entorno

Crea `.env.local` en la raíz de Next.js:

```env
NEXT_PUBLIC_SITE_URL=https://somosdualidad.com
NEXT_PUBLIC_SANITY_PROJECT_ID=qi7d9rsb
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=tu_token_read_para_preview_drafts
SANITY_PREVIEW_SECRET=tu_secret_compartido_preview
```

Y en el Studio (`sanity/.env` o variables del deploy de Studio):

```env
SANITY_STUDIO_PROJECT_ID=qi7d9rsb
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=https://somosdualidad.com
SANITY_STUDIO_PREVIEW_SECRET=el_mismo_valor_que_SANITY_PREVIEW_SECRET
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

## Modelo de contenido implementado

- `siteSettings` (singleton)
  - identidad de marca
  - navegación
  - footer
  - SEO global
- `page` (documento por página)
  - `slug`
  - `routeType` (`home`, `about`, `resources`, `contact`, `custom`)
  - `seo`
  - `sections[]`

### Tipos de sección disponibles

- Hero
- RichText
- Image
- CTA
- Steps
- FAQ
- Testimonials
- CardGrid / Features
- Divider / Spacer

El editor puede agregar, eliminar, reordenar y editar secciones sin tocar código.

## Cómo editar páginas (equipo editorial - modo fácil)

1. Entra al Studio (`admin.*`).
2. En **Site settings** edita navegación, CTA del header y footer.
3. En **Pages**:
   - Home: crea/edita una página con `routeType = home`.
   - Otras páginas: usa slug (`sobre`, `contacto`, etc.).
4. Dentro de cada página, edita el array `Sections`:
   - Agrega bloques
   - Arrastra para reordenar
   - Elimina los que no uses
5. Abre **Presentation** (preview en vivo) para revisar cambios sin publicar.
6. Cuando todo esté correcto, publica con **Publish**.

## Preview y draft mode

El Studio Presentation tool está configurado para usar:

- enable preview: `/api/draft-mode/enable` (si defines secreto en Studio, se envía automáticamente como query param)
- disable preview: `/api/draft-mode/disable`

En preview se consulta `perspective: drafts` con token read-only (`SANITY_API_READ_TOKEN`).

## Build y checks

```bash
npm run typecheck
npm run build
cd sanity && npm run build
```

## Formulario de contacto

Se mantiene `app/api/contact/route.ts` con validación y rate limit simple para formularios.
