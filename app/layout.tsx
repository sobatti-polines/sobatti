import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://sobatti.com";
const SITE_NAME = "SobatTi";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SobatTi — Bimbingan IT & Mentoring Proyek",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Bimbingan belajar & mentoring proyek IT terstruktur untuk meningkatkan kemampuan teknis Anda secara nyata. Web, Mobile, UI/UX, IoT, dan Video Editing.",
  keywords: [
    "bimbingan IT",
    "mentoring proyek",
    "belajar web development",
    "belajar mobile development",
    "mentoring IT Indonesia",
    "jasa pembuatan proyek",
    "bimbingan skripsi IT",
    "IoT",
    "UI/UX design",
    "video editing",
  ],
  authors: [{ name: "SobatTi" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "SobatTi — Bimbingan IT & Mentoring Proyek",
    description:
      "Bimbingan belajar & mentoring proyek IT terstruktur untuk meningkatkan kemampuan teknis Anda secara nyata.",
    countryName: "Indonesia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SobatTi — Bimbingan IT & Mentoring Proyek",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SobatTi — Bimbingan IT & Mentoring Proyek",
    description:
      "Bimbingan belajar & mentoring proyek IT terstruktur untuk meningkatkan kemampuan teknis Anda secara nyata.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  verification: {
    google: "F7XKh9u6tN2sMNOqGJXA9BjeR9ACfc8TcrQDwbqOePQ",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#024885",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Platform bimbingan IT dan mentoring proyek terlengkap dan terpercaya.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-895-3658-96938",
      contactType: "customer service",
      availableLanguage: "Indonesian",
    },
    sameAs: ["https://instagram.com/sobat.ti", "https://tiktok.com/@sobat.ti"],
  };

  return (
    <html
      lang="id"
      className={`${inter.variable} ${outfit.variable} antialiased selection:bg-accent-blue selection:text-white`}
    >
      <body className="min-h-screen bg-background font-body text-foreground">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
