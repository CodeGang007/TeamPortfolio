import "./globals.css";
import FooterWrapper from "@/components/FooterWrapper";
import AnimatedBackground from "@/components/ui/AnimatedBg";
import { AuthProvider } from "@/contexts/AuthContext";
import ModalWrapper from "@/components/ModalWrapper";
import AuthGuard from "@/components/AuthGuard";
import AuthToast from "@/components/AuthToast";

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