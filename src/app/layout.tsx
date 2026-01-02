import "./globals.css";
import FooterWrapper from "@/components/layout/FooterWrapper";
// import AnimatedBackground from "@/components/ui/AnimatedBg"; // Keeping as is if it exists there
import AnimatedBackground from "@/components/ui/AnimatedBg";
import { AuthProvider } from "@/contexts/AuthContext";
import ModalWrapper from "@/components/shared/ModalWrapper";
import AuthGuard from "@/components/auth/AuthGuard";
import AuthToast from "@/components/auth/AuthToast";
import SmoothScroll from "@/components/ui/SmoothScroll";

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
          {children}

          <ModalWrapper />
          <AuthToast />
          <FooterWrapper />
        </AuthProvider>
      </body>
    </html>
  );
}