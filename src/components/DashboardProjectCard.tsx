"use client";

import { motion } from "framer-motion";
import { User, Folder, Clock } from "lucide-react";
import Image from "next/image";

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
    progress?: number; // 0-100 completion percentage
    startDate?: string; // ISO date string
    dueDate?: string; // ISO date string
    currentMilestone?: string; // Current phase name like "initiated"
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onViewStats?: (id: string) => void;
}

// Format date to short format like "Dec 30"
function formatShortDate(dateStr?: string): string {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        // Check if date is valid
        if (isNaN(date.getTime())) return '';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
        return '';
    }
}

// Color palette for pattern generation (similar to GitHub)
const patternColors = [
    { bg: "#1a1a2e", fg: "#4a4a6e" },
    { bg: "#16213e", fg: "#3a5a7c" },
    { bg: "#1b2838", fg: "#3d5a6a" },
    { bg: "#2d132c", fg: "#5a3d5c" },
    { bg: "#1a1a1a", fg: "#3a3a3a" },
    { bg: "#0d1b2a", fg: "#2d4a5a" },
    { bg: "#1c1c1c", fg: "#4c4c4c" },
    { bg: "#2c1810", fg: "#5c4030" },
];

// Generate a simple hash from string
function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

// Generate a 5x5 identicon-style pattern based on project name
function generatePattern(name: string): boolean[][] {
    const hash = hashString(name);
    const pattern: boolean[][] = [];

    for (let row = 0; row < 5; row++) {
        pattern[row] = [];
        for (let col = 0; col < 3; col++) {
            const bit = (hash >> (row * 3 + col)) & 1;
            pattern[row][col] = bit === 1;
            // Mirror for symmetry
            pattern[row][4 - col] = bit === 1;
        }
    }

    return pattern;
}

const statusConfig: Record<ProjectStatus, { label: string; dotClass: string; bgClass: string; textClass: string }> = {
    active: {
        label: "ACTIVE",
        dotClass: "bg-emerald-400",
        bgClass: "bg-emerald-950/70 backdrop-blur-md border border-emerald-800/50",
        textClass: "text-emerald-400",
    },
    completed: {
        label: "COMPLETED",
        dotClass: "bg-purple-400",
        bgClass: "bg-purple-950/70 backdrop-blur-md border border-purple-800/50",
        textClass: "text-purple-400",
    },
    "on-hold": {
        label: "ON HOLD",
        dotClass: "bg-amber-400",
        bgClass: "bg-amber-950/70 backdrop-blur-md border border-amber-800/50",
        textClass: "text-amber-400",
    },
    pending: {
        label: "PENDING",
        dotClass: "bg-zinc-400",
        bgClass: "bg-zinc-800/70 backdrop-blur-md border border-zinc-700/50",
        textClass: "text-zinc-400",
    },
    "pending-closure": {
        label: "CLOSING...",
        dotClass: "bg-red-400",
        bgClass: "bg-red-950/70 backdrop-blur-md border border-red-800/50",
        textClass: "text-red-400 animate-pulse",
    },
    closed: {
        label: "CLOSED",
        dotClass: "bg-zinc-600",
        bgClass: "bg-zinc-900/70 backdrop-blur-md border border-zinc-800/50",
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
    progress,
    startDate,
    dueDate,
    currentMilestone,
}: DashboardProjectCardProps) {
    const statusStyle = statusConfig[status];
    const isActive = status === "active";

    // Generate pattern and colors based on project title
    const hash = hashString(title);
    const colorScheme = patternColors[hash % patternColors.length];
    const pattern = generatePattern(title);

    return (
        <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <div
                className={`group relative overflow-hidden rounded-xl border border-[#333] bg-[#1E1E1E] transition-all duration-200 cursor-pointer hover:border-brand-green hover:shadow-lg hover:shadow-brand-green/10`}
            >
                {/* Thumbnail Area - Strict 16:9 aspect ratio */}
                <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: colorScheme.bg }}>
                    {thumbnail ? (
                        // User uploaded image
                        <Image
                            src={thumbnail}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        // Generated pattern (GitHub-style identicon)
                        <>
                            {/* Pattern Grid */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                    className="grid gap-1 opacity-40"
                                    style={{
                                        gridTemplateColumns: 'repeat(5, 1fr)',
                                        width: '60%',
                                        aspectRatio: '1'
                                    }}
                                >
                                    {pattern.flat().map((filled, index) => (
                                        <div
                                            key={index}
                                            className="rounded-sm transition-all duration-300"
                                            style={{
                                                backgroundColor: filled ? colorScheme.fg : 'transparent',
                                                aspectRatio: '1'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Centered Folder Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Folder
                                    className="h-12 w-12 opacity-30 transition-opacity duration-300 group-hover:opacity-50"
                                    style={{ color: colorScheme.fg }}
                                />
                            </div>

                            {/* Subtle radial glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />
                        </>
                    )}
                </div>



                {/* Content Area - Fixed height for consistency */}
                <div className="p-4 flex flex-col h-[180px]">
                    {/* Status Badge + Category Row */}
                    <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                        {/* Status Badge - Glassmorphism style */}
                        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${statusStyle.bgClass}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dotClass} ${isActive ? "animate-pulse" : ""}`} />
                            <span className={`text-[9px] font-semibold tracking-wider uppercase ${statusStyle.textClass}`}>
                                {statusStyle.label}
                            </span>
                        </div>

                        {/* Category Tag - Subtle pill */}
                        {category && (
                            <span className="px-2 py-0.5 rounded-full text-[8px] font-medium bg-white/5 text-[#71717a] tracking-wide truncate max-w-[120px]">
                                {category}
                            </span>
                        )}
                    </div>

                    {/* Title - Dominant element */}
                    <h3 className="text-base font-bold text-[#fafafa] line-clamp-1 group-hover:text-white transition-colors mb-1 flex-shrink-0">
                        {title}
                    </h3>

                    {/* Description - Fixed height area with ellipsis */}
                    <div className="h-[18px] mb-2 flex-shrink-0">
                        {description ? (
                            <p className="text-[12px] text-[#71717a] line-clamp-1 leading-relaxed">
                                {description}
                            </p>
                        ) : (
                            <p className="text-[12px] text-[#52525b] italic">No description</p>
                        )}
                    </div>

                    {/* Progress Bar - Always show for non-pending status, default to 0% */}
                    <div className="mb-2 flex-shrink-0">
                        {status !== 'pending' ? (
                            <>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] text-[#71717a] font-medium">Progress</span>
                                    <span className="text-[10px] font-semibold text-brand-green">{progress ?? 0}%</span>
                                </div>
                                <div className="h-1.5 bg-[#27272a] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-brand-green to-emerald-400 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min(Math.max(progress ?? 0, 0), 100)}%` }}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="h-[26px]" /> // Placeholder height for pending cards
                        )}
                    </div>

                    {/* Spacer to push footer to bottom */}
                    <div className="flex-grow" />

                    {/* Meta Footer with Timeline - Two rows for better alignment */}
                    <div className="flex-shrink-0 space-y-1.5">
                        {/* Row 1: Client Name + Milestone Badge */}
                        <div className="flex items-center gap-2 text-[10px] text-[#71717a] min-h-[18px]">
                            {clientName && (
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    <User className="h-3 w-3 flex-shrink-0" />
                                    <span className="truncate max-w-[100px]">{clientName}</span>
                                </div>
                            )}
                            {/* Current Milestone Badge */}
                            {currentMilestone && (
                                <span className="px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green text-[9px] font-medium capitalize flex-shrink-0 whitespace-nowrap">
                                    {currentMilestone}
                                </span>
                            )}
                        </div>

                        {/* Row 2: Timeline - only show if we have valid formatted dates */}
                        {(() => {
                            const formattedStart = formatShortDate(startDate);
                            const formattedDue = formatShortDate(dueDate);
                            if (!formattedStart && !formattedDue) return <div className="h-[16px]" />;
                            return (
                                <div className="flex items-center gap-1 text-[10px] text-[#52525b]">
                                    <Clock className="h-3 w-3 flex-shrink-0" />
                                    <span>
                                        {formattedStart}
                                        {formattedStart && formattedDue && ' → '}
                                        {formattedDue}
                                    </span>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

