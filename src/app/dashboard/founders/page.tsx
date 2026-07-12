"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Users,
    ArrowLeft,
    Search,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Loader2,
    GripVertical
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { founderService, Founder } from "@/services/founderService";

export default function FoundersManagement() {
    const { user, isAuthenticated, loading, role } = useAuth();
    const router = useRouter();
    const [founders, setFounders] = useState<Founder[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Redirect if not admin
    useEffect(() => {
        if (!loading && (!isAuthenticated || role !== 'admin')) {
            router.push("/");
        }
    }, [loading, isAuthenticated, role, router]);

    // Fetch founders
    useEffect(() => {
        const fetchFounders = async () => {
            try {
                const data = await founderService.getAllFounders();
                setFounders(data);
            } catch (error) {
                console.error("Failed to fetch founders", error);
            } finally {
                setIsLoadingData(false);
            }
        };

        if (isAuthenticated && role === 'admin') {
            fetchFounders();
        }
    }, [isAuthenticated, role]);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to remove ${name} from the founders list?`)) {
            return;
        }

        try {
            await founderService.deleteFounder(id);
            setFounders(prev => prev.filter(f => f.id !== id));
        } catch (error) {
            console.error("Failed to delete founder", error);
            alert("Failed to delete founder. Please try again.");
        }
    };

    const toggleActive = async (id: string, currentActive: boolean) => {
        try {
            await founderService.updateFounder(id, { active: !currentActive });
            setFounders(prev =>
                prev.map(f => (f.id === id ? { ...f, active: !currentActive } : f))
            );
        } catch (error) {
            console.error("Failed to toggle active status", error);
            alert("Failed to update status. Please try again.");
        }
    };

    if (loading || isLoadingData) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                    <p className="text-slate-500 text-sm">Loading founders...</p>
                </div>
            </div>
        );
    }

    const filteredFounders = founders.filter(founder =>
        founder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#ffffff]/90 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard/projects" className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            <div>
                                <h1 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <Users className="h-4 w-4 text-blue-600" />
                                    Manage Founders
                                </h1>
                                <p className="text-[11px] text-slate-500">
                                    Add, edit, and organize your team founders
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => router.push("/dashboard/founders/new")}
                            className="bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-600/90 hover:to-blue-700/90 text-slate-900 font-bold text-sm px-4 shadow-lg shadow-blue-600/25 border border-blue-600/20"
                        >
                            <Plus className="h-4 w-4 md:mr-1.5" />
                            <span className="hidden md:inline">Add Founder</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Search */}
            <div className="border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 py-3">
                    <div className="relative w-full md:w-56">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search founders..."
                            className="w-full rounded-lg bg-white border border-slate-200 pl-9 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 hover:border-slate-300 transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-6 py-8">
                {filteredFounders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600/10 to-blue-600/5 flex items-center justify-center mb-8">
                            <Users className="h-16 w-16 text-blue-600/50" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900 mb-2">
                            {searchQuery ? "No founders found" : "No founders yet"}
                        </h2>
                        <p className="text-slate-500 text-center max-w-sm mb-6 text-sm">
                            {searchQuery 
                                ? "Try adjusting your search query"
                                : "Get started by adding your first founder"}
                        </p>
                        {!searchQuery && (
                            <Button
                                onClick={() => router.push("/dashboard/founders/new")}
                                className="bg-blue-600 hover:bg-blue-600/90 text-slate-900 font-bold"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add First Founder
                            </Button>
                        )}
                    </motion.div>
                ) : (
                    <div className="grid gap-4">
                        {filteredFounders.map((founder, index) => (
                            <motion.div
                                key={founder.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`relative rounded-xl border ${
                                    founder.active
                                        ? 'border-slate-200 bg-white'
                                        : 'border-slate-200/50 bg-slate-1000 opacity-60'
                                } p-6 hover:border-blue-600/30 transition-all group`}
                            >
                                <div className="flex items-start gap-6">
                                    {/* Drag Handle */}
                                    <button className="mt-1 cursor-move text-slate-400 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <GripVertical className="h-5 w-5" />
                                    </button>

                                    {/* Image */}
                                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={founder.imageUrl}
                                            alt={founder.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                                                    {founder.name}
                                                </h3>
                                                <p className="text-sm text-blue-600">
                                                    {founder.role}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                {/* Active Toggle */}
                                                <button
                                                    onClick={() => toggleActive(founder.id, founder.active)}
                                                    className={`p-2 rounded-lg transition-all ${
                                                        founder.active
                                                            ? 'bg-blue-600/10 text-blue-600 hover:bg-blue-600/20'
                                                            : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                                                    }`}
                                                    title={founder.active ? "Hide from public" : "Show on public"}
                                                >
                                                    {founder.active ? (
                                                        <Eye className="h-4 w-4" />
                                                    ) : (
                                                        <EyeOff className="h-4 w-4" />
                                                    )}
                                                </button>

                                                {/* Edit */}
                                                <button
                                                    onClick={() => router.push(`/dashboard/founders/${founder.id}`)}
                                                    className="p-2 rounded-lg bg-slate-200 text-slate-900 hover:bg-slate-300 transition-all"
                                                    title="Edit founder"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => handleDelete(founder.id, founder.name)}
                                                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-slate-900 transition-all"
                                                    title="Delete founder"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                                            {founder.description}
                                        </p>

                                        {/* Tech Stack */}
                                        {founder.techStack && founder.techStack.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {founder.techStack.slice(0, 5).map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 text-xs rounded-md bg-slate-200 text-slate-500"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {founder.techStack.length > 5 && (
                                                    <span className="px-2 py-1 text-xs rounded-md bg-slate-200 text-slate-500">
                                                        +{founder.techStack.length - 5} more
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Order Badge */}
                                <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-xs font-mono">
                                    #{founder.order}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
