import "./globals.css";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#f0f7f5] text-slate-900">
        {children}
        <Footer />
      </body>
    </html>
  );
}
