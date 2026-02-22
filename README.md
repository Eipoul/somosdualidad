# Somos Dualidad · Rebuild con Next.js + Payload CMS

Arquitectura única recomendada (opción 1): **un solo proyecto Next.js** que sirve sitio público y admin Payload.

- `https://somosdualidad.com` → web pública
- `https://admin.somosdualidad.com` → panel admin (ruta `/admin` del mismo deploy)

## Variables de entorno

Reutilizamos el nombre actual:

```env
NEXT_PUBLIC_SITE_URL=https://somosdualidad.com
```

Nuevas variables requeridas:

```env
DATABASE_URI=postgres://...
PAYLOAD_SECRET=...
PREVIEW_SECRET=... # opcional
```

Compatibilidad con configuración previa:

- Si `PREVIEW_SECRET` no está definido, el sistema usa `SANITY_PREVIEW_SECRET` automáticamente.
- Las variables de Sanity existentes pueden permanecer en Vercel, pero ya no se usan.

## Modelos de contenido (Payload)

- Global: **Ajustes del sitio** (`site-settings`)
- Collections:
  - **Páginas** (`pages`) con bloques reordenables
  - **Episodios** (`episodes`)
  - **Temporadas** (`seasons`)
  - **Suscriptores** (`subscribers`)
  - **Usuarios admin** (`users`)

### Bloques de página

- Hero
- RichText
- SplitSection
- EpisodesSection
- AboutSection
- SubscribeSection
- FAQ
- CTA
- Spacer

## Preview de borradores

- Payload habilita drafts en `pages` y `episodes`.
- Endpoint estable para activar preview: `GET /api/preview?slug=/ruta&secret=...`
- Secret resuelto en este orden:
  1. `PREVIEW_SECRET`
  2. `SANITY_PREVIEW_SECRET`

Esto permite mantener la configuración actual de Vercel sin romper preview.

## Newsletter

Endpoint público:

- `POST /api/subscribe`

Incluye:

- honeypot (`website`)
- rate limit básico en memoria por IP
- guardado en colección `subscribers` (email único)

## Flujo editorial (no técnico)

1. Entrar a `admin.somosdualidad.com`.
2. Ir a **Páginas** y abrir la página con slug `/` para editar homepage por bloques.
3. Reordenar bloques, editar copys y guardar draft/publicar.
4. Ir a **Episodios** para crear y publicar episodios.
5. Ir a **Suscriptores** para revisar/exportar la base de newsletter.

## Deploy en Vercel

1. Usar un solo proyecto Vercel apuntando a este repo.
2. Configurar dominios:
   - `somosdualidad.com`
   - `admin.somosdualidad.com`
3. En Vercel, agregar rewrite para que `admin.somosdualidad.com/*` resuelva a `/admin/*`.
4. Definir env vars (arriba) en Production y Preview.

## Futuras migraciones

La estructura en Payload deja listas las colecciones para migración posterior desde Sanity (scripts ETL separados).
