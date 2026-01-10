"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function CheckeredBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const gridSize = 40;
        let mouseX = -1000;
        let mouseY = -1000;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cols = Math.ceil(canvas.width / gridSize);
            const rows = Math.ceil(canvas.height / gridSize);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * gridSize;
                    const y = j * gridSize;

                    // Calculate distance from mouse
                    const dx = mouseX - (x + gridSize / 2);
                    const dy = mouseY - (y + gridSize / 2);
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 200;

                    // Interactive effect based on distance
                    const interactionStrength = Math.max(0, 1 - distance / maxDistance);
                    const offset = interactionStrength * 10;

                    // Checkerboard pattern
                    const isDark = (i + j) % 2 === 0;
                    
                    if (isDark) {
                        // Base opacity for dark squares
                        const baseOpacity = 0.02;
                        const hoverOpacity = 0.18;
                        const opacity = baseOpacity + (hoverOpacity - baseOpacity) * interactionStrength;

                        ctx.fillStyle = isOnline 
                            ? `rgba(34, 197, 94, ${opacity})` 
                            : `rgba(239, 68, 68, ${opacity})`;

                        ctx.fillRect(
                            x - offset / 2,
                            y - offset / 2,
                            gridSize + offset,
                            gridSize + offset
                        );
                    }

                    // Draw subtle grid lines with interaction
                    const lineOpacity = 0.05 + interactionStrength * 0.18;
                    ctx.strokeStyle = isOnline
                        ? `rgba(34, 197, 94, ${lineOpacity})`
                        : `rgba(239, 68, 68, ${lineOpacity})`;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x, y, gridSize, gridSize);
                }
            }

            requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isOnline]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: "#000000" }}
        />
    );
}
