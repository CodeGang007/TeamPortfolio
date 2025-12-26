"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
    const pathname = usePathname();
    const isFocusMode = pathname?.startsWith("/project-request");

    if (isFocusMode) return null;

    return <Footer />;
}
