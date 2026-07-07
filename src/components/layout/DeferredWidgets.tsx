"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Global overlay widgets that render nothing at first paint.
// Loaded after hydration (on idle) so they stay out of first-load JS.
const ModalWrapper = dynamic(() => import("@/components/shared/ModalWrapper"), { ssr: false });
const AuthToast = dynamic(() => import("@/components/auth/AuthToast"), { ssr: false });
const FeedbackButton = dynamic(() => import("@/components/FeedbackButton"), { ssr: false });

export default function DeferredWidgets() {
  const [ready, setReady] = useState(false);

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
      <AuthToast />
      <FeedbackButton />
    </>
  );
}
