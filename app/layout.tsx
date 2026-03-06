import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://somosdualidad.com"),
  title: {
    default: "Somos Dualidad — El Podcast",
    template: "%s | Somos Dualidad",
  },
  description: "Un podcast sobre las dualidades de la vida: amor y pérdida, fortaleza y vulnerabilidad, tradición y cambio.",
  keywords: ["podcast", "somos dualidad", "español", "bienestar", "cultura"],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Somos Dualidad",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Somos Dualidad Podcast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Somos Dualidad — El Podcast",
    description: "Un podcast sobre las dualidades de la vida.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
