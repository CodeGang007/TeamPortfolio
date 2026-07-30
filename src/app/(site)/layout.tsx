import SiteHeader from "@/components/console/SiteHeader";
import SiteFooter from "@/components/console/SiteFooter";
import WhatsAppCTA from "@/components/console/WhatsAppCTA";

// Light enterprise chrome for the public marketing surface. Dashboard,
// auth, and legal routes live outside this group and keep the legacy chrome.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-light min-h-screen bg-bone text-ink antialiased">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppCTA />
    </div>
  );
}
