"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    FolderKanban,
    Search,
    Filter,
    ArrowLeft,
    Sparkles,
    Rocket
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DashboardProjectCard, { ProjectStatus } from "@/components/DashboardProjectCard";

type TabType = "all" | "drafts";

const mockProjects = [
    { id: "1", title: "SaaS Analytics Platform", description: "A comprehensive analytics dashboard for tracking user engagement and business metrics.", clientName: "TechCorp Inc.", lastUpdated: "2 days ago", status: "active" as ProjectStatus, category: "Web App" },
    { id: "2", title: "E-Commerce Mobile App", description: "Native mobile application for iOS and Android with payment integration.", clientName: "ShopEasy", lastUpdated: "1 week ago", status: "active" as ProjectStatus, category: "Mobile" },
    { id: "3", title: "Brand Identity Redesign", description: "Complete brand overhaul including logo, color palette, and typography.", clientName: "StartupXYZ", lastUpdated: "3 weeks ago", status: "completed" as ProjectStatus, category: "Branding" },
    { id: "4", title: "AI Chatbot Integration", description: "Intelligent customer support chatbot with natural language processing.", clientName: "SupportHub", lastUpdated: "5 days ago", status: "on-hold" as ProjectStatus, category: "AI/ML" },
    { id: "5", title: "Corporate Website Redesign", description: "Modern, responsive website with CMS integration and SEO optimization.", clientName: "GlobalFirm", lastUpdated: "1 day ago", status: "pending" as ProjectStatus, category: "Website" },
];

export default function ProjectDashboard() {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const projects = mockProjects;
    const filteredProjects = projects.filter(
        (project) =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!loading && !isAuthenticated) {
        router.push("/");
        return null;
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#09090b]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            </div>
        );
    }

    const tabs = [
        { id: "all" as TabType, label: "All Projects", count: filteredProjects.length },
        { id: "drafts" as TabType, label: "Drafts", count: 0, disabled: true },
    ];

    return (
        <div className="min-h-screen bg-[#09090b] text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272a] text-[#71717a] hover:text-white hover:border-[#3f3f46] transition-all">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            <div>
                                <h1 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <FolderKanban className="h-4 w-4 text-emerald-500" />
                                    My Projects
                                </h1>
                                <p className="text-[11px] text-[#71717a]">Track and manage your project requests</p>
                            </div>
                        </div>

                        <Button
                            onClick={() => router.push("/project-request/new")}
                            className="bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold text-sm px-4 shadow-lg shadow-purple-500/25 border border-purple-400/20"
                        >
                            <Plus className="h-4 w-4 mr-1.5" />
                            New Project
                        </Button>
                    </div>
                </div>
            </header>

            {/* Sub-header: Underline Tabs + Search */}
            <div className="border-b border-[#1a1a1a]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-3">
                        {/* Underline Tabs */}
                        <div className="flex gap-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => !tab.disabled && setActiveTab(tab.id)}
                                    disabled={tab.disabled}
                                    className={`relative pb-3 text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === tab.id
                                        ? "text-white"
                                        : tab.disabled
                                            ? "text-[#52525b] cursor-not-allowed"
                                            : "text-[#71717a] hover:text-white"
                                        }`}
                                >
                                    {tab.label}
                                    <span className={`text-xs px-1.5 py-0.5 rounded ${activeTab === tab.id ? "bg-[#27272a] text-[#a1a1aa]" : "bg-[#1a1a1a] text-[#52525b]"
                                        }`}>
                                        {tab.count}
                                    </span>
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Search + Filter */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#52525b]" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search projects..."
                                    className="w-56 rounded-lg bg-[#18181b] border border-[#27272a] pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#3f3f46] transition-colors"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#18181b] border border-[#27272a] text-sm text-[#71717a] hover:text-white hover:border-[#3f3f46] transition-colors">
                                <Filter className="h-4 w-4" />
                                Filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-6 py-8">
                {filteredProjects.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <div className="relative mb-8">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/10 to-purple-600/5 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
                                    <FolderKanban className="h-10 w-10 text-purple-400/50" />
                                </div>
                            </div>
                            <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-1 -right-1">
                                <Sparkles className="h-5 w-5 text-purple-400" />
                            </motion.div>
                            <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute bottom-0 -left-2">
                                <Rocket className="h-4 w-4 text-emerald-400" />
                            </motion.div>
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">No projects yet</h2>
                        <p className="text-[#71717a] text-center max-w-sm mb-6 text-sm">
                            Start your journey by creating your first project request.
                        </p>
                        <Button
                            onClick={() => router.push("/project-request/new")}
                            className="bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold px-6 shadow-lg shadow-purple-500/25"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Your First Project
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {filteredProjects.map((project, index) => (
                            <DashboardProjectCard
                                key={project.id}
                                {...project}
                                gradientIndex={index}
                            />
                        ))}
                    </motion.div>
                )}
            </main>
        </div>
    );
}

