import React from "react";
import { cn } from "@/lib/utils";

export const CodeGangLogo = ({ 
    isOnline = true, 
    className 
}: { 
    isOnline?: boolean; 
    className?: string;
}) => {
    return (
        <div className={cn("relative w-full h-full", className)}>
            <img
                src="/assets/cg-logo-online.png"
                alt="CodeGang Online"
                className={cn(
                    "absolute inset-0 w-full h-full object-contain transition-opacity duration-500",
                    isOnline ? "opacity-100" : "opacity-0"
                )}
            />
            <img
                src="/assets/cg-logo-offline.png"
                alt="CodeGang Offline"
                className={cn(
                    "absolute inset-0 w-full h-full object-contain transition-opacity duration-500",
                    isOnline ? "opacity-0" : "opacity-100"
                )}
            />
        </div>
    );
};
