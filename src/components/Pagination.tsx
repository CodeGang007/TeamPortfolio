"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

import { useAuth } from "@/contexts/AuthContext";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    if (totalPages <= 1) return null;

    // Generate page numbers dynamically
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first, last, and current window
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2 py-8">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:hover:bg-transparent ${isOnline ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-brand-green disabled:text-zinc-600' : 'border-red-900/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 disabled:text-red-900/50'}`}
            >
                <ChevronLeft className="h-4 w-4" />
                Previous
            </button>

            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                        return <span key={`ellipsis-${index}`} className={`px-2 ${isOnline ? 'text-zinc-600' : 'text-red-900/40'}`}>...</span>;
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                                currentPage === page
                                    ? (isOnline ? "bg-brand-green text-black shadow-sm" : "bg-red-500 text-white shadow-sm shadow-red-500/20")
                                    : (isOnline ? "text-zinc-400 hover:bg-zinc-800 hover:text-brand-green" : "text-red-400 hover:bg-red-500/10 hover:text-red-300")
                            )}
                        >
                            {page}
                        </button>
                    )
                })}
            </div>

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:hover:bg-transparent ${isOnline ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-brand-green disabled:text-zinc-600' : 'border-red-900/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 disabled:text-red-900/50'}`}
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}
