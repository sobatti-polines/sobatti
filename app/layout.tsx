import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const interBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const interSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SobatTi — Bimbingan IT & Mentoring Proyek",
  description: "Bimbingan belajar & mentoring proyek IT terstruktur untuk meningkatkan kemampuan teknis Anda secara nyata.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${interBody.variable} ${interSans.variable} ${outfit.variable} antialiased selection:bg-accent-blue selection:text-white`}>
      <body className="min-h-screen bg-background font-body text-foreground">
        {children}
      </body>
    </html>
  );
}
