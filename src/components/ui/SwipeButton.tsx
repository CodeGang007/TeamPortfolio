"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface SwipeButtonProps {
    onComplete?: () => void;
    href?: string;
    text?: string;
    disabled?: boolean;
    isOnline?: boolean;
}

export function SwipeButton({
    onComplete,
    href = "/project-request/custom",
    text = "Start a Project",
    disabled = false,
    isOnline = true,
}: SwipeButtonProps) {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const handleWidth = 56; // Width of the handle in pixels

    // Theme colors based on online status
    const colors = isOnline
        ? {
            primary: "0, 255, 100", // Green RGB
            primaryHex: "#00ff64",
            primaryDark: "#00cc50",
        }
        : {
            primary: "239, 68, 68", // Red RGB
            primaryHex: "#ef4444",
            primaryDark: "#dc2626",
        };

    // Calculate container width on mount and resize
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const maxDrag = containerWidth - handleWidth - 8; // 8px for padding

    // Handle drag start
    const handleDragStart = useCallback(
        (clientX: number) => {
            if (disabled || isComplete) return;
            setIsDragging(true);

            // Haptic feedback on mobile
            if (typeof navigator !== "undefined" && navigator.vibrate) {
                navigator.vibrate(5);
            }
        },
        [disabled, isComplete]
    );

    // Handle drag move
    const handleDragMove = useCallback(
        (clientX: number) => {
            if (!isDragging || !containerRef.current || isComplete) return;

            const rect = containerRef.current.getBoundingClientRect();
            const offsetX = clientX - rect.left - handleWidth / 2;
            const clampedX = Math.max(0, Math.min(offsetX, maxDrag));
            const newProgress = (clampedX / maxDrag) * 100;

            // Magnetic pull at 80%
            if (newProgress > 80) {
                setProgress(100);
                completeAction();
            } else {
                setProgress(newProgress);
            }
        },
        [isDragging, maxDrag, isComplete]
    );

    // Handle drag end
    const handleDragEnd = useCallback(() => {
        if (!isDragging) return;
        setIsDragging(false);

        if (progress < 80) {
            // Snap back to start
            setProgress(0);
        }
    }, [isDragging, progress]);

    // Complete action
    const completeAction = useCallback(() => {
        setIsComplete(true);
        setProgress(100);
        setIsDragging(false);

        // Stronger haptic feedback
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([20, 50, 20]);
        }

        // Trigger callback or navigate
        setTimeout(() => {
            if (onComplete) {
                onComplete();
            } else if (href) {
                router.push(href);
            }
        }, 600);
    }, [onComplete, href, router]);

    // Mouse events
    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        handleDragStart(e.clientX);
    };

    // Touch events
    const onTouchStart = (e: React.TouchEvent) => {
        handleDragStart(e.touches[0].clientX);
    };

    // Global move/end listeners
    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
        const onTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientX);
        const onEnd = () => handleDragEnd();

        if (isDragging) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onEnd);
            window.addEventListener("touchmove", onTouchMove);
            window.addEventListener("touchend", onEnd);
        }

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onEnd);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onEnd);
        };
    }, [isDragging, handleDragMove, handleDragEnd]);

    // Calculate visual values
    const handlePosition = (progress / 100) * maxDrag;
    const fillWidth = handlePosition + handleWidth / 2;
    const textOpacity = Math.max(0, 1 - progress / 60);
    const arrowRotation = progress * 0.3; // Slight rotation as dragging
    const glowIntensity = 10 + progress * 0.4; // Glow increases with progress

    return (
        <div
            ref={containerRef}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label={text}
            className={`
        relative w-[280px] h-[64px] rounded-full overflow-hidden
        select-none touch-none
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-grab"}
        ${isDragging ? "cursor-grabbing" : ""}
      `}
            style={{
                background: isOnline
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(239, 68, 68, 0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: isOnline
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(239, 68, 68, 0.3)",
            }}
        >
            {/* Track Text */}
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                style={{ opacity: textOpacity }}
            >
                <span
                    className="text-base font-bold tracking-wide"
                    style={{
                        background: isOnline
                            ? `linear-gradient(90deg, 
                  rgba(255,255,255,0.9) ${progress}%, 
                  rgba(255,255,255,0.6) ${progress + 20}%
                )`
                            : `linear-gradient(90deg, 
                  rgba(255,200,200,0.9) ${progress}%, 
                  rgba(255,150,150,0.6) ${progress + 20}%
                )`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    {text}
                </span>
            </div>

            {/* Fill Track */}
            <motion.div
                className="absolute top-1 left-1 bottom-1 rounded-full"
                style={{
                    width: fillWidth,
                    background: `linear-gradient(90deg, 
            rgba(${colors.primary}, 0.3) 0%, 
            rgba(${colors.primary}, 0.5) 100%
          )`,
                    boxShadow: `inset 0 0 20px rgba(${colors.primary}, 0.3)`,
                }}
                animate={{
                    width: fillWidth,
                }}
                transition={
                    isDragging
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 30 }
                }
            />

            {/* Draggable Handle */}
            <motion.div
                ref={handleRef}
                className="absolute top-1 left-1 w-14 h-14 rounded-full flex items-center justify-center z-20"
                style={{
                    background: isComplete
                        ? `linear-gradient(135deg, ${colors.primaryHex} 0%, ${colors.primaryDark} 100%)`
                        : `linear-gradient(135deg, ${colors.primaryHex} 0%, ${colors.primaryHex} 50%, ${colors.primaryDark} 100%)`,
                    boxShadow: `
            0 0 ${glowIntensity}px rgba(${colors.primary}, ${0.4 + progress * 0.006}),
            0 0 ${glowIntensity * 2}px rgba(${colors.primary}, ${0.2 + progress * 0.003}),
            0 4px 15px rgba(0, 0, 0, 0.3)
          `,
                    cursor: disabled ? "not-allowed" : isDragging ? "grabbing" : "grab",
                }}
                animate={{
                    x: handlePosition,
                    scale: isDragging ? 1.1 : 1,
                }}
                transition={
                    isDragging
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 30 }
                }
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
            >
                <AnimatePresence mode="wait">
                    {isComplete ? (
                        <motion.div
                            key="check"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        >
                            <Check size={24} strokeWidth={3} className={isOnline ? "text-black" : "text-white"} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="arrow"
                            animate={{
                                rotate: arrowRotation,
                            }}
                            transition={{ duration: 0 }}
                        >
                            <ArrowRight size={24} strokeWidth={2.5} className={isOnline ? "text-black" : "text-white"} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Shimmer Effect */}
            <div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
                style={{ opacity: 0.3 }}
            >
                <motion.div
                    className="absolute h-full w-1/3"
                    style={{
                        background: isOnline
                            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)"
                            : "linear-gradient(90deg, transparent, rgba(255,100,100,0.15), transparent)",
                    }}
                    animate={{
                        x: ["-100%", "400%"],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>

            {/* Completion Flash */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            background: `radial-gradient(circle at center, rgba(${colors.primary}, 0.4), transparent)`,
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default SwipeButton;
