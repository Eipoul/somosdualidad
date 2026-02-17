# Somos Dualidad · Landing Site

Sitio web completo para **Somos Dualidad** construido con Next.js 14 (App Router), TypeScript, TailwindCSS, Framer Motion y React Hook Form + Zod.

## Requisitos

- Node.js 18.18+ (recomendado Node 20)
- npm 9+

## Correr en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev       # desarrollo
npm run build     # build de producción
npm run start     # correr build
npm run lint      # lint
npm run typecheck # verificación TypeScript
```

## Dónde editar contenido (fuente única)

Todo el contenido editable está en:

- `content/site.ts`

Ahí puedes cambiar:

- navegación
- hero / manifiesto
- experiencias
- testimonios
- FAQ
- CTA principal/final
- contacto, redes y links legales
- SEO base (URL, título, descripción)

> Nota: se usan placeholders `TODO:` para evitar inventar datos reales.

## Formulario de contacto y newsletter

- Formulario en `/contacto` usa validación con Zod.
- CTA final en home envía email de newsletter al mismo endpoint simple.
- Endpoint: `app/api/contact/route.ts`.

Actualmente el endpoint:

- valida y sanitiza datos
- aplica rate limit básico en memoria
- registra el payload en consola del servidor (placeholder seguro)

### Opcional: envío real de email con Nodemailer

1. Instala dependencia:

```bash
npm install nodemailer
```

2. Agrega variables en `.env.local`:

```env
SMTP_HOST=smtp.tu-proveedor.com
SMTP_PORT=587
SMTP_USER=tu_usuario
SMTP_PASS=tu_password
CONTACT_TO=correo@tudominio.com
```

3. Reemplaza en `app/api/contact/route.ts` el bloque `console.info` por el envío SMTP.

Si no deseas backend de correo, mantén el fallback `mailto:` ya incluido en UI.

## SEO implementado

- Metadata global y por página
- OpenGraph dinámico en `app/opengraph-image.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- icono placeholder en `app/icon.tsx`

## Accesibilidad y rendimiento

- navegación por teclado + skip link
- foco visible en elementos interactivos
- acordeón FAQ con `aria-expanded` y regiones enlazadas
- `next/font` para tipografías optimizadas
- layout mobile-first + Tailwind utility classes
