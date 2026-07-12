"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Global overlay widgets that render nothing at first paint.
// Loaded after hydration (on idle) so they stay out of first-load JS.
const ModalWrapper = dynamic(() => import("@/components/shared/ModalWrapper"), { ssr: false });
const AuthToast = dynamic(() => import("@/components/auth/AuthToast"), { ssr: false });
const FeedbackButton = dynamic(() => import("@/components/FeedbackButton"), { ssr: false });

// The marketing surface stays free of app nags — visitors get the sign-in
// modal (via the header button) but never the toast or feedback bubble.
const MARKETING_ROUTES = ["/work", "/studio", "/contact", "/privacy", "/terms", "/cookies", "/license", "/project-request", "/project-templates"];

export default function DeferredWidgets() {
  const [ready, setReady] = useState(false);
  const pathname = usePathname() ?? "/";
  const isMarketing =
    pathname === "/" ||
    MARKETING_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));

  useEffect(() => {
    const start = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(start, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(start, 1500);
    return () => clearTimeout(id);
  }, []);

  if (!ready) return null;

  return (
    <>
      <ModalWrapper />
      {!isMarketing && <AuthToast />}
      {!isMarketing && <FeedbackButton />}
    </>
  );
}
