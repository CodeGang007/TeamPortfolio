"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
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
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-600"
            >
                <ChevronLeft className="h-4 w-4" />
                Previous
            </button>

            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                        return <span key={`ellipsis-${index}`} className="px-2 text-slate-400">...</span>;
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page as number)}
                            className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                                currentPage === page
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
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
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-600"
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}
