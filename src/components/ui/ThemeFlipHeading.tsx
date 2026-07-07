import React from "react";

// Static page heading — replaced the interval-driven word-flip animation.
// Keeps the old (prefix, words) API; renders the first word as the accent.
export const ThemeFlipHeading = ({
    prefix,
    words,
}: {
    prefix: string;
    words: string[];
    duration?: number;
}) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 py-24 text-center">
            <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight text-white">
                {prefix}{" "}
                <span className="text-brand-green">{words[0]}</span>
            </h1>
        </div>
    );
};
