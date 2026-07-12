"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User as UserIcon, ChevronDown, Camera, LayoutGrid, FileText, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function UserMenu() {
    const { user, logout, displayPhotoURL, role } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    // Get initials for fallback
    const getInitials = (name: string | null) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full p-1 pl-2 pr-1 transition-all hover:bg-white/10 border border-transparent hover:border-white/15"
            >
                {/* Mobile/Compact: Just Avatar. Desktop: Avatar + Chevron */}
                <span className="sr-only">Open user menu</span>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-300 hidden md:block max-w-[100px] truncate">
                        {user.displayName?.split(" ")[0]}
                    </span>

                    <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/20 bg-slate-700 shadow-sm">
                        {displayPhotoURL ? (
                            <img
                                src={displayPhotoURL}
                                alt={user.displayName || "User"}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-blue-600 text-xs font-bold text-white">
                                {getInitials(user.displayName)}
                            </div>
                        )}
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50"
                    >
                        {/* Header */}
                        <div className="px-4 py-3">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                                {user.displayName || "User"}
                            </p>
                            <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                                {user.email}
                            </p>
                            <span className="inline-block mt-2 px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-100 capitalize">
                                {role}
                            </span>
                        </div>

                        <div className="h-px w-full bg-slate-100" />

                        {/* Actions */}
                        <div className="mt-2 space-y-1">
                            <Link
                                href="/profile"
                                onClick={() => setIsOpen(false)}
                                className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                            >
                                <UserIcon size={16} strokeWidth={1.75} />
                                <span>Profile</span>
                            </Link>

                            {role === 'admin' && (
                                <>
                                    <Link
                                        href="/dashboard/projects"
                                        onClick={() => setIsOpen(false)}
                                        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                    >
                                        <LayoutGrid size={16} strokeWidth={1.75} />
                                        <span>Manage Publications</span>
                                    </Link>

                                    <Link
                                        href="/admin/projects/add"
                                        onClick={() => setIsOpen(false)}
                                        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                    >
                                        <Camera size={16} strokeWidth={1.75} />
                                        <span>Add Project</span>
                                    </Link>

                                    <Link
                                        href="/dashboard/founders"
                                        onClick={() => setIsOpen(false)}
                                        className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                    >
                                        <Users size={16} strokeWidth={1.75} />
                                        <span>Manage Founders</span>
                                    </Link>

                                </>
                            )}

                            {role !== 'admin' && (
                                <Link
                                    href="/dashboard/projects"
                                    onClick={() => setIsOpen(false)}
                                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                >
                                    <FileText size={16} strokeWidth={1.75} />
                                    <span>{role === 'developer' ? "Assigned Publications" : "My Publications"}</span>
                                </Link>
                            )}
                        </div>

                        <div className="h-px w-full bg-slate-100 my-2" />

                        {/* Logout */}
                        <div>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    logout();
                                }}
                                className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                            >
                                <LogOut size={16} strokeWidth={1.75} />
                                <span>Log out</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
