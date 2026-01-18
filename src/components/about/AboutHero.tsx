"use client";

import { ThemeFlipHeading } from "@/components/ui/ThemeFlipHeading";
import { useAuth } from "@/contexts/AuthContext";

export function AboutHero() {
    const { isAuthenticated } = useAuth();
    return (
        <div className="relative flex flex-col items-center justify-center pt-32 pb-16 text-center px-4">
            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className={`text-sm font-medium tracking-[0.3em] uppercase mb-4 ${isAuthenticated ? "text-brand-green" : "text-red-500"}`}>
                    Who We Are
                </h1>

                <ThemeFlipHeading
                    prefix="We Are "
                    words={["Visionaries.", "Innovators.", "CodeGang.", "Future."]}
                />

                <p className="mt-8 text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
                    Transforming abstract ideas into tangible digital realities.
                    We don't just write code; we architect the digital future.
                </p>
            </div>
        </div>
    );
}
