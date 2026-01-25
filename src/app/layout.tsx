import "./globals.css";
import FooterWrapper from "@/components/layout/FooterWrapper";
// import AnimatedBackground from "@/components/ui/AnimatedBg"; // Keeping as is if it exists there
import AnimatedBackground from "@/components/ui/AnimatedBg";
import { AuthProvider } from "@/contexts/AuthContext";
import ModalWrapper from "@/components/shared/ModalWrapper";
import AuthGuard from "@/components/auth/AuthGuard";
import AuthToast from "@/components/auth/AuthToast";
import SmoothScroll from "@/components/ui/SmoothScroll";
import FeedbackButton from "@/components/FeedbackButton";
import { Metadata } from 'next';
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    default: 'CodeGang | Digital Architects',
    template: '%s | CodeGang'
  },
  description: 'CodeGang is a premium digital agency architecting the future. We build high-performance web applications, scalable infrastructure, and stunning digital experiences.',
  keywords: ['web development', 'digital agency', 'software engineering', 'Next.js', 'React', 'cloud infrastructure', 'UI/UX design'],
  authors: [{ name: 'CodeGang Team' }],
  creator: 'CodeGang',
  metadataBase: new URL('https://www.codegang.online'),
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: './',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.codegang.online',
    title: 'CodeGang | Digital Architects',
    description: 'Architecting the digital future with high-performance web applications and stunning designs.',
    siteName: 'CodeGang',
    images: [
      {
        url: '/assets/cg-logo-online.png',
        width: 1200,
        height: 630,
        alt: 'CodeGang Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeGang | Digital Architects',
    description: 'Architecting the digital future with high-performance web applications.',
    images: ['/assets/cg-logo-online.png'],
    creator: '@codegang',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        // Removed bg-[#f0f7f5] here because it is now inside AnimatedBackground
        className="text-slate-900 relative"
      >
        <AuthProvider>
          <AuthGuard />
          <SmoothScroll />
          <AnimatedBackground />
          <SchemaMarkup />
          {children}
          <Analytics />
          <SpeedInsights />

          <ModalWrapper />
          <AuthToast />
          <FeedbackButton />
          <FooterWrapper />
        </AuthProvider>
      </body>
    </html>
  );
}