import React from "react";
import { cn } from "@/lib/utils";

export const CodeGangLogo = ({
    className
}: {
    className?: string;
}) => {
    return (
        <div className={cn("relative w-full h-full", className)}>
            <img
                src="/assets/cg-logo-nav.png"
                alt="CodeGang"
                width={128}
                height={128}
                className="absolute inset-0 w-full h-full object-contain"
            />
        </div>
    );
};
