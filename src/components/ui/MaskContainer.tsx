"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MaskContainer = ({
    children,
    revealText,
    size = 10,
    revealSize = 600,
    className,
}: {
    children?: string | React.ReactNode;
    revealText?: string | React.ReactNode;
    size?: number;
    revealSize?: number;
    className?: string;
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({
        x: null,
        y: null,
    });
    const containerRef = useRef<HTMLDivElement>(null);

    const updateMousePosition = (e: MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener("mousemove", updateMousePosition);
            return () => {
                container.removeEventListener("mousemove", updateMousePosition);
            };
        }
    }, []);

    const maskSize = isHovered ? revealSize : size;

    return (
        <motion.div
            ref={containerRef}
            className={cn("relative h-full", className)}
        // Removed the background color animation as it might clash with the transparent section design, 
        // but keeping the logic structure in case we want to re-enable it.
        // animate={{ backgroundColor: isHovered ? "rgba(15, 23, 42, 1)" : "rgba(0,0,0,0)" }} 
        >
            <motion.div
                className="absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-black text-white antialiased [mask-repeat:no-repeat]"
                animate={{
                    maskPosition: `${(mousePosition.x ?? 0) - maskSize / 2}px ${(mousePosition.y ?? 0) - maskSize / 2}px`,
                    maskSize: `${maskSize}px`,
                }}
                transition={{
                    maskSize: { duration: 0.3, ease: "easeInOut" },
                    maskPosition: { duration: 0.15, ease: "linear" },
                }}
                style={{
                    maskImage: "url(/mask.svg)",
                    maskRepeat: "no-repeat",
                    WebkitMaskImage: "url(/mask.svg)",
                    WebkitMaskRepeat: "no-repeat"
                }}
            >
                {/* Transparent overlay for the 'black' bg effect if needed, but here we just show children */}
                <div className="absolute inset-0 z-0 h-full w-full opacity-50" />

                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative z-20 w-full h-full flex items-center justify-center"
                >
                    {children}
                </div>
            </motion.div>

            <div className="flex h-full w-full items-center justify-center pointer-events-none">
                {revealText}
            </div>
        </motion.div>
    );
};
