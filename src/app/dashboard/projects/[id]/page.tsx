"use client";

import { useState, useEffect } from "react";
import {
    ArrowLeft,
    ExternalLink,
    Clock,
    CheckCircle2,
    Target,
    Zap,
    TrendingUp,
    MessageSquare,
    Settings,
    ChevronRight,
    Circle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

// Types
interface Milestone {
    id: string;
    title: string;
    date: string;
    status: "completed" | "current" | "upcoming";
    description?: string;
    icon: string;
}

interface ProjectStats {
    hoursSpent: number;
    tasksCompleted: number;
    tasksTotal: number;
    estimatedCompletion: string;
    teamSize: number;
}

interface TeamMember {
    id: string;
    name: string;
    role: string;
    color: string;
}

interface ProjectDetail {
    id: string;
    title: string;
    description: string;
    status: "active" | "completed" | "on-hold" | "pending";
    progress: number;
    liveUrl?: string;
    milestones: Milestone[];
    stats: ProjectStats;
    category: string;
    teamMembers: TeamMember[];
    startDate: string;
    dueDate: string;
}

const milestoneIcons: Record<string, React.ReactNode> = {
    "discovery": <Target className="h-4 w-4" />,
    "design": <Circle className="h-4 w-4" />,
    "development": <Zap className="h-4 w-4" />,
    "integration": <Settings className="h-4 w-4" />,
    "launch": <TrendingUp className="h-4 w-4" />
};

const getProjectData = (id: string): ProjectDetail | null => {
    return {
        id,
        title: "SaaS Analytics Platform",
        description: "A comprehensive analytics dashboard for tracking user engagement and business metrics with real-time visualization.",
        status: "active",
        progress: 65,
        liveUrl: "https://example.com",
        category: "Web Application",
        startDate: "Nov 15, 2024",
        dueDate: "Feb 10, 2025",
        stats: {
            hoursSpent: 124,
            tasksCompleted: 18,
            tasksTotal: 26,
            estimatedCompletion: "2 weeks",
            teamSize: 3
        },
        teamMembers: [
            { id: "1", name: "Alex Chen", role: "Lead Developer", color: "from-violet-500 to-purple-600" },
            { id: "2", name: "Sarah Kim", role: "UI Designer", color: "from-sky-500 to-blue-600" },
            { id: "3", name: "Mike Johnson", role: "Backend Dev", color: "from-amber-500 to-orange-600" }
        ],
        milestones: [
            { id: "m1", title: "Discovery & Planning", date: "Dec 10", status: "completed", description: "Requirements and scope.", icon: "discovery" },
            { id: "m2", title: "UI/UX Design", date: "Dec 20", status: "completed", description: "Mockups and prototype.", icon: "design" },
            { id: "m3", title: "Frontend Development", date: "Jan 05", status: "current", description: "React components.", icon: "development" },
            { id: "m4", title: "Backend Integration", date: "Jan 15", status: "upcoming", description: "API and database.", icon: "integration" },
            { id: "m5", title: "Beta Launch", date: "Jan 25", status: "upcoming", icon: "launch" }
        ]
    };
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProject(getProjectData(params.id));
            setIsLoading(false);
        }, 400);
        return () => clearTimeout(timer);
    }, [params.id]);

    useEffect(() => {
        if (!loading && !isAuthenticated) router.push("/");
    }, [loading, isAuthenticated, router]);

    if (loading || isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#09090b]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-white">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">Project not found</h2>
                    <Button onClick={() => router.push("/dashboard/projects")} variant="outline">Back</Button>
                </div>
            </div>
        );
    }

    const taskPercent = Math.round((project.stats.tasksCompleted / project.stats.tasksTotal) * 100);
    const completedCount = project.milestones.filter(m => m.status === 'completed').length;

    return (
        <div className="min-h-screen bg-[#09090b] text-white">
            {/* Header */}
            <header className="border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard/projects" className="flex h-8 w-8 items-center justify-center rounded-md border border-[#27272a] text-[#71717a] hover:text-white hover:border-[#3f3f46] transition-all">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            <div className="flex items-center gap-1.5 text-xs text-[#71717a]">
                                <Link href="/dashboard/projects" className="hover:text-white transition-colors">Projects</Link>
                                <ChevronRight className="h-3 w-3" />
                                <span className="text-[#a1a1aa]">{project.title}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-[#a1a1aa] hover:text-white text-xs h-8">
                                <MessageSquare className="h-3.5 w-3.5 mr-1.5" />Discuss
                            </Button>
                            <Button size="sm" className="bg-emerald-500 text-black hover:bg-emerald-400 font-medium text-xs h-8">
                                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />View Live
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Title Area */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1 max-w-2xl">
                            <div className="flex items-center gap-2 mb-3">
                                {/* Outlined Chips */}
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium border border-emerald-500/40 text-emerald-400 flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Active
                                </span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium border border-[#3f3f46] text-[#a1a1aa]">
                                    {project.category}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">{project.title}</h1>
                            <p className="text-[#a1a1aa] leading-relaxed" style={{ maxWidth: '60ch' }}>{project.description}</p>
                        </div>

                        {/* Clean Stats - No Container */}
                        <div className="flex items-center gap-6 text-center">
                            <div>
                                <p className="text-2xl font-bold text-white">{project.progress}%</p>
                                <p className="text-[10px] text-[#71717a] uppercase tracking-wider mt-0.5">Complete</p>
                            </div>
                            <div className="h-8 w-px bg-[#27272a]" />
                            <div>
                                <p className="text-2xl font-bold text-white">{project.stats.hoursSpent}h</p>
                                <p className="text-[10px] text-[#71717a] uppercase tracking-wider mt-0.5">Invested</p>
                            </div>
                            <div className="h-8 w-px bg-[#27272a]" />
                            <div>
                                <p className="text-2xl font-bold text-white">{project.stats.teamSize}</p>
                                <p className="text-[10px] text-[#71717a] uppercase tracking-wider mt-0.5">Team</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                    {/* Left Column */}
                    <div className="lg:col-span-7 space-y-4">

                        {/* Browser Preview */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="rounded-lg border border-[#27272a] bg-[#18181b] overflow-hidden hover:border-[#3f3f46] transition-colors">
                            {/* Browser Chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#27272a] bg-[#0f0f10]">
                                <div className="flex gap-1.5">
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#eab308]" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="h-6 rounded bg-[#27272a] flex items-center px-3">
                                        <span className="text-[10px] text-[#52525b]">app.analytics.io/dashboard</span>
                                    </div>
                                </div>
                            </div>

                            {/* Preview Content */}
                            <div className="aspect-video bg-gradient-to-br from-[#1a1a2e] via-[#16162a] to-[#0f0f1a] relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_50%)]" />
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,197,94,0.05),transparent_50%)]" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-violet-500/20 to-emerald-500/10 border border-white/5 flex items-center justify-center">
                                            <TrendingUp className="h-7 w-7 text-white/30" />
                                        </div>
                                        <p className="text-sm text-[#52525b]">Preview loading...</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Bar */}
                            <div className="px-4 py-3 border-t border-[#27272a] flex items-center justify-between bg-[#0f0f10]">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-1.5">
                                        {project.teamMembers.map((m) => (
                                            <div key={m.id} className={`w-6 h-6 rounded-full bg-gradient-to-br ${m.color} border-2 border-[#18181b] flex items-center justify-center text-[8px] font-bold text-white`}>
                                                {m.name.charAt(0)}
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[11px] text-[#52525b]">{project.stats.teamSize} contributors</span>
                                </div>
                                <span className="text-[10px] text-[#3f3f46]">Live preview updates automatically</span>
                            </div>
                        </motion.div>

                        {/* Timeline */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="rounded-lg border border-[#27272a] bg-[#18181b] p-5 hover:border-[#3f3f46] transition-colors">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-sm font-medium text-white">Timeline</h3>
                                <span className="text-[10px] text-[#52525b]">{project.startDate} → {project.dueDate}</span>
                            </div>

                            <div className="relative pl-6">
                                {/* Connector Line */}
                                <div className="absolute left-[7px] top-1 bottom-1 w-px">
                                    {/* Completed portion */}
                                    <div className="absolute top-0 w-full bg-emerald-500/60" style={{ height: `${(completedCount / project.milestones.length) * 100}%` }} />
                                    {/* Future portion - dashed */}
                                    <div className="absolute w-full border-l border-dashed border-[#3f3f46]" style={{ top: `${(completedCount / project.milestones.length) * 100}%`, bottom: 0 }} />
                                </div>

                                <div className="space-y-5">
                                    {project.milestones.map((m, i) => {
                                        const done = m.status === "completed";
                                        const active = m.status === "current";
                                        return (
                                            <div key={m.id} className="relative flex gap-4">
                                                {/* Icon */}
                                                <div className={`relative z-10 -ml-6 flex h-[14px] w-[14px] items-center justify-center rounded-full transition-all ${done ? "bg-emerald-500 text-black" :
                                                        active ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(34,197,94,0.5)]" :
                                                            "bg-[#27272a] text-[#52525b]"
                                                    }`}>
                                                    {done ? <CheckCircle2 className="h-2.5 w-2.5" /> : <Circle className="h-2 w-2" />}
                                                </div>

                                                <div className="flex-1 -mt-0.5">
                                                    <div className="flex items-center justify-between">
                                                        <span className={`text-sm font-medium ${active ? "text-white" : done ? "text-[#a1a1aa]" : "text-[#52525b]"}`}>
                                                            {m.title}
                                                        </span>
                                                        <span className="text-[10px] text-[#3f3f46]">{m.date}</span>
                                                    </div>
                                                    {m.description && <p className="text-[11px] text-[#52525b] mt-0.5">{m.description}</p>}
                                                    {active && (
                                                        <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-semibold text-emerald-400">
                                                            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                                                            IN PROGRESS
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Bento Grid */}
                    <div className="lg:col-span-5 space-y-4">

                        {/* Progress */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                            className="rounded-lg border border-[#27272a] bg-[#18181b] p-5 hover:border-[#3f3f46] transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs text-[#71717a]">Overall Progress</span>
                                <span className="text-xl font-bold text-white">{project.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#27272a] rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
                            </div>
                            <p className="text-[10px] text-[#52525b] mt-2">Est. {project.stats.estimatedCompletion} remaining</p>
                        </motion.div>

                        {/* Stats Bento */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="rounded-lg border border-[#27272a] bg-[#18181b] p-4 hover:border-[#3f3f46] transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-7 w-7 rounded-md bg-violet-500/10 flex items-center justify-center">
                                        <Clock className="h-3.5 w-3.5 text-violet-400" />
                                    </div>
                                    <span className="text-[10px] text-[#71717a]">Time</span>
                                </div>
                                <p className="text-xl font-bold text-white">{project.stats.hoursSpent}h</p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                                className="rounded-lg border border-[#27272a] bg-[#18181b] p-4 hover:border-[#3f3f46] transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-7 w-7 rounded-md bg-emerald-500/10 flex items-center justify-center">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                    </div>
                                    <span className="text-[10px] text-[#71717a]">Tasks</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p className="text-xl font-bold text-white">{project.stats.tasksCompleted}<span className="text-sm text-[#52525b] font-normal">/{project.stats.tasksTotal}</span></p>
                                    {/* Mini donut */}
                                    <svg className="h-8 w-8" viewBox="0 0 36 36">
                                        <circle cx="18" cy="18" r="14" fill="none" stroke="#27272a" strokeWidth="3" />
                                        <circle cx="18" cy="18" r="14" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray={`${taskPercent} ${100 - taskPercent}`} strokeDashoffset="25" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>

                        {/* Team - Avatar Stack */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="rounded-lg border border-[#27272a] bg-[#18181b] p-4 hover:border-[#3f3f46] transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {project.teamMembers.map((m) => (
                                            <div key={m.id} className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} border-2 border-[#18181b] flex items-center justify-center text-xs font-bold text-white`} title={m.name}>
                                                {m.name.charAt(0)}
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Project Team</p>
                                        <p className="text-[10px] text-[#52525b]">{project.teamMembers.map(m => m.name.split(' ')[0]).join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA with Gradient Border */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                            className="relative rounded-lg p-[1px] bg-gradient-to-r from-violet-500/50 via-purple-500/30 to-violet-500/50 hover:from-violet-500 hover:via-purple-500/50 hover:to-violet-500 transition-all cursor-pointer group">
                            <div className="rounded-lg bg-[#18181b] p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                                        <MessageSquare className="h-5 w-5 text-violet-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white">Need changes?</p>
                                        <p className="text-[10px] text-[#52525b]">Send feedback to the team</p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-[#52525b] group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
