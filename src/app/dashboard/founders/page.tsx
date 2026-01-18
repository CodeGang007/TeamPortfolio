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
            <div className="flex min-h-screen items-center justify-center bg-[#121212]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />
                    <p className="text-zinc-500 text-sm">Loading founders...</p>
                </div>
            </div>
        );
    }

    const filteredFounders = founders.filter(founder =>
        founder.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#121212]/80 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard/projects" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272a] text-[#71717a] hover:text-white hover:border-[#3f3f46] transition-all">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            <div>
                                <h1 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Users className="h-4 w-4 text-brand-green" />
                                    Manage Founders
                                </h1>
                                <p className="text-[11px] text-[#71717a]">
                                    Add, edit, and organize your team founders
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => router.push("/dashboard/founders/new")}
                            className="bg-gradient-to-b from-brand-green to-brand-green-dim hover:from-brand-green/90 hover:to-brand-green-dim/90 text-black font-bold text-sm px-4 shadow-lg shadow-brand-green/25 border border-brand-green/20"
                        >
                            <Plus className="h-4 w-4 md:mr-1.5" />
                            <span className="hidden md:inline">Add Founder</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Search */}
            <div className="border-b border-[#1a1a1a]">
                <div className="mx-auto max-w-7xl px-6 py-3">
                    <div className="relative w-full md:w-56">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#52525b]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search founders..."
                            className="w-full rounded-lg bg-[#18181b] border border-[#27272a] pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-brand-green hover:border-[#3f3f46] transition-colors"
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
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-green/10 to-brand-green/5 flex items-center justify-center mb-8">
                            <Users className="h-16 w-16 text-brand-green/50" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">
                            {searchQuery ? "No founders found" : "No founders yet"}
                        </h2>
                        <p className="text-[#71717a] text-center max-w-sm mb-6 text-sm">
                            {searchQuery 
                                ? "Try adjusting your search query"
                                : "Get started by adding your first founder"}
                        </p>
                        {!searchQuery && (
                            <Button
                                onClick={() => router.push("/dashboard/founders/new")}
                                className="bg-brand-green hover:bg-brand-green/90 text-black font-bold"
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
                                        ? 'border-[#27272a] bg-[#18181b]'
                                        : 'border-[#27272a]/50 bg-[#18181b]/50 opacity-60'
                                } p-6 hover:border-brand-green/30 transition-all group`}
                            >
                                <div className="flex items-start gap-6">
                                    {/* Drag Handle */}
                                    <button className="mt-1 cursor-move text-[#52525b] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
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
                                                <h3 className="text-lg font-semibold text-white mb-1">
                                                    {founder.name}
                                                </h3>
                                                <p className="text-sm text-brand-green">
                                                    {founder.role}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                {/* Active Toggle */}
                                                <button
                                                    onClick={() => toggleActive(founder.id, founder.active)}
                                                    className={`p-2 rounded-lg transition-all ${
                                                        founder.active
                                                            ? 'bg-brand-green/10 text-brand-green hover:bg-brand-green/20'
                                                            : 'bg-[#27272a] text-[#71717a] hover:bg-[#3f3f46]'
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
                                                    className="p-2 rounded-lg bg-[#27272a] text-white hover:bg-[#3f3f46] transition-all"
                                                    title="Edit founder"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => handleDelete(founder.id, founder.name)}
                                                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                                                    title="Delete founder"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <p className="text-sm text-[#a1a1aa] mb-3 line-clamp-2">
                                            {founder.description}
                                        </p>

                                        {/* Tech Stack */}
                                        {founder.techStack && founder.techStack.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {founder.techStack.slice(0, 5).map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 text-xs rounded-md bg-[#27272a] text-[#a1a1aa]"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {founder.techStack.length > 5 && (
                                                    <span className="px-2 py-1 text-xs rounded-md bg-[#27272a] text-[#71717a]">
                                                        +{founder.techStack.length - 5} more
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Order Badge */}
                                <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-[#27272a]/50 text-[#71717a] text-xs font-mono">
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
