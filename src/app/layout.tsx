import "./globals.css";
import Footer from "@/components/footer";
import AnimatedBackground from "@/components/ui/AnimatedBg"; // Import the component

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
        <AnimatedBackground />
        {children}
        <Footer />
      </body>
    </html>
  );
}