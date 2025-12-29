"use client";

import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import Link from "next/link";

export type ProjectStatus = "active" | "completed" | "on-hold" | "pending" | "pending-closure" | "closed";

interface DashboardProjectCardProps {
    id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    clientName?: string;
    lastUpdated: string;
    status: ProjectStatus;
    category?: string;
    gradientIndex?: number;
}

// Unique gradients for each card
const cardGradients = [
    "from-violet-900/60 via-purple-900/40 to-black",
    "from-emerald-900/50 via-teal-900/30 to-black",
    "from-rose-900/50 via-pink-900/30 to-black",
    "from-amber-900/50 via-orange-900/30 to-black",
    "from-sky-900/50 via-blue-900/30 to-black",
    "from-fuchsia-900/50 via-purple-900/30 to-black",
];

const statusConfig: Record<ProjectStatus, { label: string; dotClass: string; bgClass: string; textClass: string }> = {
    active: {
        label: "ACTIVE",
        dotClass: "bg-emerald-400",
        bgClass: "bg-emerald-950/80",
        textClass: "text-emerald-400",
    },
    completed: {
        label: "COMPLETED",
        dotClass: "bg-purple-400",
        bgClass: "bg-purple-950/80",
        textClass: "text-purple-400",
    },
    "on-hold": {
        label: "ON HOLD",
        dotClass: "bg-amber-400",
        bgClass: "bg-amber-950/80",
        textClass: "text-amber-400",
    },
    pending: {
        label: "PENDING",
        dotClass: "bg-zinc-400",
        bgClass: "bg-zinc-800/80",
        textClass: "text-zinc-400",
    },
    "pending-closure": {
        label: "CLOSING...",
        dotClass: "bg-red-400",
        bgClass: "bg-red-950/80",
        textClass: "text-red-400 animate-pulse",
    },
    closed: {
        label: "CLOSED",
        dotClass: "bg-zinc-600",
        bgClass: "bg-zinc-900/80",
        textClass: "text-zinc-600",
    }
};

export default function DashboardProjectCard({
    id,
    title,
    description,
    thumbnail,
    clientName,
    lastUpdated,
    status,
    category,
    gradientIndex = 0,
}: DashboardProjectCardProps) {
    const statusStyle = statusConfig[status];
    const isActive = status === "active";
    const gradient = cardGradients[gradientIndex % cardGradients.length];

    return (
        <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
                <div
                    className={`group relative overflow-hidden rounded-xl border bg-[#18181b] transition-all duration-200 cursor-pointer ${isActive
                            ? "border-brand-green"
                            : "border-[#27272a] hover:border-[#52525b]"
                        }`}
                >
                    {/* Gradient Header Area - The "Album Art" */}
                    <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${gradient}`}>
                        {/* Subtle noise texture overlay */}
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                        }} />

                        {/* Radial glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_60%)]" />

                        {/* Status Badge - Top Right */}
                        <div className="absolute top-3 right-3">
                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded backdrop-blur-md ${statusStyle.bgClass}`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dotClass} ${isActive ? "animate-pulse" : ""}`} />
                                <span className={`text-[10px] font-semibold tracking-wider ${statusStyle.textClass}`}>
                                    {statusStyle.label}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content Area - Tight Metadata */}
                    <div className="p-4">
                        {/* Title + Category Tag */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-sm font-semibold text-[#fafafa] line-clamp-1 group-hover:text-white transition-colors">
                                {title}
                            </h3>
                            {category && (
                                <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-medium border border-[#333] text-[#999]">
                                    {category}
                                </span>
                            )}
                        </div>

                        {/* Description - 2 lines max */}
                        {description && (
                            <p className="text-xs text-[#a1a1aa] line-clamp-2 mb-3 leading-relaxed">
                                {description}
                            </p>
                        )}

                        {/* Meta Footer - No View Link */}
                        <div className="flex items-center gap-4 text-[11px] text-[#71717a]">
                            {clientName && (
                                <div className="flex items-center gap-1.5">
                                    <User className="h-3 w-3" />
                                    <span>{clientName}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-3 w-3" />
                                <span>{lastUpdated}</span>
                            </div>
                        </div>
                    </div>
                </div>
        </motion.div>
    );
}
