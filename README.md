# Somos Dualidad · Next.js 14 + Sanity

Sanity is the only CMS/page builder for the website.

## Required environment variables

### Web app (Vercel project: `somosdualidad.com`)

```env
NEXT_PUBLIC_SITE_URL=https://somosdualidad.com
NEXT_PUBLIC_SANITY_PROJECT_ID=qi7d9rsb
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01

SANITY_API_READ_TOKEN=***
SANITY_API_WRITE_TOKEN=***
SANITY_PREVIEW_SECRET=***

NEXT_PUBLIC_SANITY_STUDIO_URL=https://admin.somosdualidad.com/studio
```

### Studio deployment (Vercel project: `admin.somosdualidad.com`)

```env
SANITY_STUDIO_PROJECT_ID=qi7d9rsb
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=https://somosdualidad.com
SANITY_PREVIEW_SECRET=***
```

> Use the same value for `SANITY_PREVIEW_SECRET` in both deployments.

## Content model

- Singleton documents
  - `siteSettings`
  - `homePage`
- Collections
  - `page`
  - `episode`
  - `season`
  - `newsletterSubscriber`
- Home/page builder section blocks
  - Hero
  - Quiénes Somos
  - Episodios
  - Suscríbete
  - FAQ
  - CTA

Editors can add/remove/reorder sections in Sanity.

## Preview and Draft Mode

Draft endpoints:

- `GET /api/draft/enable?secret=...&redirect=/ruta`
- `GET /api/draft/disable?redirect=/ruta`

Rules:

- Secret is validated only against `SANITY_PREVIEW_SECRET`.
- Valid request enables draft mode and responds with `307` redirect.
- Missing/invalid secret returns `401 Invalid secret`.

### Presentation Tool setup

- Presentation iframe must point to a real page URL (`SANITY_STUDIO_PREVIEW_URL`), not API routes.
- Presentation preview mode calls `/api/draft/enable` and `/api/draft/disable`.
- If iframe cookies are blocked by browser privacy (cross-domain Studio/Site), use **Open in new window**.

### Troubleshooting: “Invalid secret” in Presentation

If you see `Invalid secret`, verify all of these:

1. `SANITY_PREVIEW_SECRET` is set in **both** Vercel projects (web + studio) with the same exact value.
2. `SANITY_STUDIO_PREVIEW_URL` is a real site URL (e.g. `https://somosdualidad.com`), **not** `/api/draft/enable`.
3. Open this directly and confirm it redirects with 307:
   - `https://somosdualidad.com/api/draft/enable?secret=YOUR_SECRET&redirect=/`
4. In Studio Presentation, use refresh/reload after env changes (a new deployment may be required).

Note: the draft enable route accepts `SANITY_PREVIEW_SECRET` (canonical) and also `SANITY_STUDIO_PREVIEW_SECRET` as a temporary compatibility fallback.

## Newsletter storage

Endpoint:

- `POST /api/newsletter/subscribe`

Behavior:

- Validates email format.
- Honeypot + lightweight rate-limiting.
- Idempotent storage in Sanity (`newsletterSubscriber.<email-safe-id>` via `createOrReplace`).

## Editor workflow

1. Open Sanity Studio.
2. Edit **Site Settings** for nav/footer/global copy.
3. Edit **Homepage** sections (add/reorder/remove).
4. Open **Presentation** and preview drafts before publishing.
5. Review new records in **Newsletter Subscribers** after form submissions.
