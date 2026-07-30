import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import DeferredWidgets from "@/components/layout/DeferredWidgets";
import { Metadata } from "next";
import { Archivo, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/content/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Variable Archivo with the width axis exposed — the display face is pushed
// wide (wdth 112–118) via the .display utility. Display sizes only.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["wdth"],
});

// Wordmark + pull-quote face. The serif/geometric-sans contrast is what
// carries the "premium" read — display sizes only, never body copy.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: site.title,
    // Pages pass a BARE title ('Work', not 'Work | CodeGang') — the template
    // appends the brand exactly once.
    template: "%s — CodeGang",
  },
  description: site.description,
  authors: [{ name: "CodeGang" }],
  creator: "CodeGang",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "./",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.domain,
    title: site.title,
    description: site.description,
    siteName: site.name,
    images: [
      {
        url: "/assets/cg-logo-online.png",
        width: 1200,
        height: 630,
        alt: "CodeGang — software engineering studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/assets/cg-logo-online.png"],
    creator: "@CodeGang20",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${archivo.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning className="font-sans relative">
        <AuthProvider>
          <SchemaMarkup />
          {children}
          <Analytics />
          <SpeedInsights />

          <DeferredWidgets />
        </AuthProvider>
      </body>
    </html>
  );
}
