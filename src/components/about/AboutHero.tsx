"use client";

import { ThemeFlipHeading } from "@/components/ui/ThemeFlipHeading";

export function AboutHero() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black z-0 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[120px] z-0" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-sm font-medium tracking-[0.3em] text-brand-green uppercase mb-4">
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
