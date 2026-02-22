import type {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {Inter, Playfair_Display} from 'next/font/google'
import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import {VisualEditing} from '@/components/VisualEditing'
import {SITE_SETTINGS_QUERY} from '@/lib/sanity/queries'
import {sanityFetch} from '@/lib/sanity/client'
import type {SiteSettings} from '@/lib/sanity/types'
import '@/styles/globals.css'

const inter = Inter({subsets: ['latin'], variable: '--font-inter', display: 'swap'})
const playfair = Playfair_Display({subsets: ['latin'], variable: '--font-playfair', display: 'swap'})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings | null>({query: SITE_SETTINGS_QUERY})
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://somosdualidad.com'

  return {
    metadataBase: new URL(siteUrl),
    title: {default: settings?.defaultSeo?.title || settings?.siteName || 'Somos Dualidad', template: `%s | ${settings?.siteName || 'Somos Dualidad'}`},
    description: settings?.defaultSeo?.description,
    openGraph: {
      title: settings?.defaultSeo?.title,
      description: settings?.defaultSeo?.description,
      images: settings?.defaultSeo?.ogImage?.asset?.url ? [settings.defaultSeo.ogImage.asset.url] : undefined,
      locale: 'es_ES',
      type: 'website',
    },
    alternates: {canonical: '/'},
  }
}

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  const {isEnabled: isDraftMode} = await draftMode()
  const settings = await sanityFetch<SiteSettings | null>({query: SITE_SETTINGS_QUERY})

  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} bg-background font-sans text-foreground antialiased`}>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2">Saltar al contenido principal</a>
        <Header settings={settings} />
        <main id="contenido">{children}</main>
        <Footer settings={settings} />
        {isDraftMode ? <VisualEditing /> : null}
      </body>
    </html>
  )
}
