"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard() {
    const { isAuthenticated, triggerAuth } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    // Strict route protection removed based on user feedback.
    // Users can browse but interactions will be gated.

    /*
    useEffect(() => {
        // If not authenticated and not on the home page, redirect to home and trigger auth
        if (!isAuthenticated && pathname !== "/") {
            // Prevent navigation to protected routes
            router.replace("/");

            // Open the login modal to explain why
            // Small timeout to allow redirect to happen first/ensure context is ready
            setTimeout(() => {
                triggerAuth();
            }, 100);
        }
    }, [isAuthenticated, pathname, router, triggerAuth]);
    */

    return null; // This component renders nothing
}
