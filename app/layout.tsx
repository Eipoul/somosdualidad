import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteContent } from "@/content/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.seo.siteUrl.replace("TODO: ", "https://example.com")),
  title: {
    default: siteContent.seo.defaultTitle,
    template: `%s | ${siteContent.brand.name}`
  },
  description: siteContent.seo.defaultDescription,
  openGraph: {
    title: siteContent.seo.defaultTitle,
    description: siteContent.seo.defaultDescription,
    images: [siteContent.seo.ogImage],
    locale: "es_ES",
    type: "website"
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} bg-background font-sans text-foreground antialiased`}>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2">
          Saltar al contenido principal
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
