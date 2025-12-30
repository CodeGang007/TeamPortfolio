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
    Circle,
    Edit,
    Save,
    X,
    Plus,
    Trash2,
    FileText, ArrowUpRight, Globe, Github, Figma
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { projectRequestService, TeamMember as ServiceTeamMember } from "@/lib/projectService"; // Import TeamMember

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
    email?: string;
}

interface ProjectDetail {
    id: string;
    title: string;
    projectName: string; // Added
    description: string;
    status: "active" | "completed" | "on-hold" | "pending" | "pending-closure" | "closed";
    progress: number;
    liveUrl?: string;
    milestones: Milestone[];
    stats: ProjectStats;
    category: string;
    teamMembers: TeamMember[];
    startDate: string;
    dueDate: string;
    
    // New fields from ProjectRequest
    currency: string;
    budget: string;
    deliveryTime: string;
    projectType: string;
    additionalNotes: string;
    projectLinks: {
        github: string;
        figma: string;
        website: string;
        documentation: string;
        other: string;
    };
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
        projectName: "SaaS Analytics Platform",
        description: "A comprehensive analytics dashboard for tracking user engagement and business metrics with real-time visualization.",
        status: "pending",
        progress: 0,
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
        ],
        currency: "USD",
        budget: "5000",
        deliveryTime: "3 months",
        projectType: "Full Stack",
        additionalNotes: "N/A",
        projectLinks: {
            github: "",
            figma: "",
            website: "",
            documentation: "",
            other: ""
        }
    };
};

import { use } from "react";

// ... existing imports ...

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user, isAuthenticated, loading, role } = useAuth(); // Add role
    const router = useRouter();
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    
    // Admin Edit States
    const [isEditing, setIsEditing] = useState(false);
    const [allDevelopers, setAllDevelopers] = useState<ServiceTeamMember[]>([]);
    
    // Fetch developers if admin
    useEffect(() => {
        if (role === 'admin') {
            projectRequestService.getDevelopers().then(setAllDevelopers);
        }
    }, [role]);

    const handleSave = async () => {
        if (!project) return;
        try {
            await projectRequestService.updateProjectProgress(project.id, {
                status: project.status,
                progress: project.progress,
                hoursSpent: project.stats.hoursSpent,
                tasksCompleted: project.stats.tasksCompleted,
                tasksTotal: project.stats.tasksTotal,
                startDate: project.startDate,
                dueDate: project.dueDate,
                liveUrl: project.liveUrl,
                milestones: project.milestones,
                assignedDevelopers: project.teamMembers.map(m => ({
                    uid: m.id,
                    name: m.name,
                    email: m.email || "unknown@example.com", // Upsert email
                    role: m.role
                    // photoURL missing in local TeamMember, ideally sync better
                })),
                teamSize: project.teamMembers.length
            });
            setIsEditing(false);
            alert("Changes saved!");
        } catch (error) {
            console.error("Failed to save:", error);
            alert("Failed to save changes.");
        }
    };

    const handleAddDeveloper = (devId: string) => {
        const dev = allDevelopers.find(d => d.uid === devId);
        if (dev && project && !project.teamMembers.find(m => m.id === dev.uid)) {
            setProject({
                ...project,
                teamMembers: [
                    ...project.teamMembers,
                    {
                        id: dev.uid,
                        name: dev.name,
                        email: dev.email,
                        role: "Developer",
                        color: "from-blue-500 to-cyan-600" // Default color
                    }
                ],
                stats: {
                    ...project.stats,
                    teamSize: project.stats.teamSize + 1
                }
            });
        }
    };

    const handleRemoveDeveloper = (devId: string) => {
        if (!project) return;
        setProject({
            ...project,
            teamMembers: project.teamMembers.filter(m => m.id !== devId),
            stats: {
                ...project.stats,
                teamSize: Math.max(0, project.stats.teamSize - 1)
            }
        });
    };

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                // Fetch basic project request data
                const projectRequest = await projectRequestService.getProjectById(id);
                
                if (!projectRequest) {
                    setProject(null);
                    return;
                }

                // Fetch dynamic progress data
                let progressData = await projectRequestService.getProjectProgress(id);

                // If no progress data exists yet (newly published), initialize it
                if (!progressData && !projectRequest.isDraft) {
                    await projectRequestService.initializeProjectProgress(id);
                    progressData = await projectRequestService.getProjectProgress(id);
                }

                // Combine data
                if (progressData) {
                    setProject({
                        id: projectRequest.id || id,
                        title: projectRequest.projectName,
                        projectName: projectRequest.projectName, // Added
                        description: projectRequest.description,
                        status: progressData.status,
                        progress: progressData.progress,
                        liveUrl: progressData.liveUrl,
                        category: projectRequest.category,
                        startDate: progressData.startDate,
                        dueDate: progressData.dueDate || "TBD",
                        
                        // New fields
                        currency: projectRequest.currency,
                        budget: projectRequest.budget,
                        deliveryTime: projectRequest.deliveryTime,
                        projectType: projectRequest.projectType,
                        additionalNotes: projectRequest.additionalNotes || "",
                        projectLinks: projectRequest.projectLinks || {
                            github: "",
                            figma: "",
                            website: "",
                            documentation: "",
                            other: ""
                        },

                        milestones: progressData.milestones || [],
                        stats: {
                            hoursSpent: progressData.hoursSpent,
                            tasksCompleted: progressData.tasksCompleted,
                            tasksTotal: progressData.tasksTotal,
                            estimatedCompletion: projectRequest.deliveryTime,
                            teamSize: progressData.teamSize || (projectRequest.assignedTo?.length || 0)
                        },
                        // Map assigned developers to local TeamMember format
                        teamMembers: (progressData.assignedDevelopers || []).map(d => ({
                            id: d.uid,
                            name: d.name,
                            role: d.role,
                            email: d.email,
                            color: "from-violet-500 to-purple-600"
                        }))
                    });
                } else {
                     // Fallback if progress init failed or draft
                     setProject({
                        id: projectRequest.id || id,
                        title: projectRequest.projectName,
                        projectName: projectRequest.projectName,
                        description: projectRequest.description,
                        status: 'pending',
                        progress: 0,
                        category: projectRequest.category,
                        startDate: projectRequest.initiatedAt ? new Date(projectRequest.initiatedAt).toLocaleDateString() : "Pending",
                        dueDate: projectRequest.deliveryTime,
                        stats: {
                            hoursSpent: 0,
                            tasksCompleted: 0,
                            tasksTotal: 0,
                            estimatedCompletion: projectRequest.deliveryTime,
                            teamSize: 0
                        },
                        teamMembers: [],
                        milestones: [],
                        currency: projectRequest.currency,
                        budget: projectRequest.budget,
                        deliveryTime: projectRequest.deliveryTime,
                        projectType: projectRequest.projectType,
                        additionalNotes: projectRequest.additionalNotes || "",
                        projectLinks: projectRequest.projectLinks || {
                            github: "",
                            figma: "",
                            website: "",
                            documentation: "",
                            other: ""
                        }
                     });
                }

            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id && user) {
            fetchProjectData();
        }
    }, [id, user]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) router.push("/");
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 rounded-full border-2 border-brand-green border-t-transparent animate-spin" />
                    <p className="text-zinc-500 text-sm">Loading project...</p>
                </div>
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

    const taskPercent = project.stats.tasksTotal > 0 ? Math.round((project.stats.tasksCompleted / project.stats.tasksTotal) * 100) : 0;
    const completedCount = project.milestones.filter(m => m.status === 'completed').length;

    return (
        <div className="min-h-screen bg-[#09090b] text-white">
             {/* ... Header ... */}
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
                             {/* Only show Discuss/Live if active */}
                            {/* Only show Discuss/Live if active */}
                            {project.status === 'active' && !isEditing && (
                                <>
                                    <Button variant="ghost" size="sm" className="text-[#a1a1aa] hover:text-white text-xs h-8">
                                        <MessageSquare className="h-3.5 w-3.5 mr-1.5" />Discuss
                                    </Button>
                                    <Button size="sm" className="bg-emerald-500 text-black hover:bg-emerald-400 font-medium text-xs h-8">
                                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />View Live
                                    </Button>
                                </>
                            )}
                            
                            {/* Admin Controls */}
                            {role === 'admin' ? (
                                isEditing ? (
                                    <div className="flex items-center gap-2">
                                        <Button 
                                            size="sm" 
                                            variant="ghost" 
                                            onClick={() => setIsEditing(false)}
                                            className="text-white hover:bg-zinc-800 text-xs h-8"
                                        >
                                            <X className="h-3.5 w-3.5 mr-1.5" /> Cancel
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            onClick={handleSave}
                                            className="bg-brand-green text-black hover:bg-brand-green/90 font-medium text-xs h-8"
                                        >
                                            <Save className="h-3.5 w-3.5 mr-1.5" /> Save Changes
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        {project.status === 'pending-closure' && (
                                            <Button
                                                size="sm"
                                                onClick={async () => {
                                                    if (confirm("Approve closure? This will schedule deletion in 3 days.")) {
                                                        const deletionDate = new Date();
                                                        deletionDate.setDate(deletionDate.getDate() + 3);
                                                        
                                                        try {
                                                            await projectRequestService.updateProjectProgress(project.id, {
                                                                status: 'closed',
                                                                deletionScheduledAt: deletionDate.toISOString()
                                                            });
                                                            setProject({ ...project, status: 'closed' });
                                                            setSnackbarMessage("Project closed and scheduled for deletion.");
                                                            setShowSnackbar(true);
                                                        } catch (e) {
                                                            alert("Failed to close project");
                                                        }
                                                    }
                                                }}
                                                className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 text-xs h-8"
                                            >
                                                Approve Closure
                                            </Button>
                                        )}
                                        <Button 
                                            size="sm" 
                                            variant="outline"
                                            onClick={() => setIsEditing(true)}
                                            className="border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] text-xs h-8"
                                        >
                                            <Edit className="h-3.5 w-3.5 mr-1.5" /> Edit Project
                                        </Button>
                                    </div>
                                )
                            ) : (
                                /* Client Controls */
                                <>
                                    {/* Allow closure request if not already closed/completed/pending-closure */}
                                    {!['completed', 'closed', 'pending-closure'].includes(project.status) && (
                                         <Button 
                                            size="sm"
                                            variant="outline"
                                            onClick={async () => {
                                                if (confirm("Request to close this project? Admins will review your request.")) {
                                                    try {
                                                        await projectRequestService.updateProjectProgress(project.id, {
                                                            status: 'pending-closure'
                                                        });
                                                        setProject({ ...project, status: 'pending-closure' });
                                                        setSnackbarMessage("Closure request sent to admins.");
                                                        setShowSnackbar(true);
                                                    } catch (e) {
                                                        alert("Failed to submit request");
                                                    }
                                                }
                                            }}
                                            className="border-red-900/30 text-red-400 hover:bg-red-900/20 hover:border-red-900/50 text-xs h-8"
                                        >
                                            Request Closure
                                        </Button>
                                    )}
                                    {project.status === 'pending-closure' && (
                                        <span className="text-xs text-amber-500 animate-pulse px-2 py-1 bg-amber-500/10 rounded border border-amber-500/20">
                                            Closure Pending Approval
                                        </span>
                                    )}
                                </>
                            )}
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
                                {isEditing ? (
                                    <select
                                        value={project.status}
                                        onChange={(e) => setProject({ ...project, status: e.target.value as any })}
                                        className="px-2 py-0.5 rounded text-[10px] font-medium border border-emerald-500/40 bg-zinc-900 text-emerald-400 focus:outline-none focus:border-emerald-500"
                                    >
                                        <option value="active">Active</option>
                                        <option value="completed">Completed</option>
                                        <option value="on-hold">On Hold</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                ) : (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-medium border border-emerald-500/40 text-emerald-400 flex items-center gap-1">
                                        <span className={`h-1.5 w-1.5 rounded-full ${project.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`} />
                                        {project.status.toUpperCase()}
                                    </span>
                                )}
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

                        {/* Browser Preview (Optional based on data) */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="rounded-lg border border-[#27272a] bg-[#18181b] overflow-hidden hover:border-[#3f3f46] transition-colors">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#27272a] bg-[#0f0f10]">
                                <div className="flex gap-1.5">
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#eab308]" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="h-6 rounded bg-[#27272a] flex items-center px-3">
                                        {isEditing ? (
                                             <input 
                                                value={project.liveUrl || ""}
                                                onChange={(e) => setProject({ ...project, liveUrl: e.target.value })}
                                                placeholder="https://your-app.com"
                                                className="w-full bg-transparent text-[10px] text-white focus:outline-none"
                                            />
                                        ) : (
                                            <span className="text-[10px] text-[#52525b]">{project.liveUrl?.replace('https://', '') || 'Waiting for deploy...'}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="aspect-video bg-gradient-to-br from-[#1a1a2e] via-[#16162a] to-[#0f0f1a] relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-violet-500/20 to-emerald-500/10 border border-white/5 flex items-center justify-center">
                                            <TrendingUp className="h-7 w-7 text-white/30" />
                                        </div>
                                        <p className="text-sm text-[#52525b]">
                                            {project.liveUrl ? "Preview available" : "Preview loading..."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                             {/* ... Footer Bar ... */}
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
                                {isEditing && (
                                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-zinc-800" onClick={() => {
                                        if(!project) return;
                                        setProject({
                                            ...project,
                                            milestones: [
                                                ...project.milestones,
                                                { 
                                                    id: Date.now().toString(), 
                                                    title: "New Milestone", 
                                                    date: "TBD", 
                                                    status: "upcoming",
                                                    icon: "circle",
                                                    description: "Description"
                                                }
                                            ]
                                        })
                                    }}>
                                        <Plus className="h-3.5 w-3.5" />
                                    </Button>
                                )}
                                <span className="text-[10px] text-[#52525b]">{project.startDate} → {project.dueDate}</span>
                            </div>

                            <div className="relative pl-6">
                                {project.milestones.length > 0 ? (
                                    <>
                                        <div className="absolute left-[7px] top-1 bottom-1 w-px">
                                             <div className="absolute top-0 w-full bg-emerald-500/60" style={{ height: `${(completedCount / project.milestones.length) * 100}%` }} />
                                             <div className="absolute w-full border-l border-dashed border-[#3f3f46]" style={{ top: `${(completedCount / project.milestones.length) * 100}%`, bottom: 0 }} />
                                        </div>
                                        <div className="space-y-5">
                                            {project.milestones.map((m, i) => {
                                                const done = m.status === "completed";
                                                const active = m.status === "current";
                                                return (
                                                    <div key={m.id} className="relative flex gap-4 group/milestone">
                                                        <div className={`relative z-10 -ml-6 flex h-[14px] w-[14px] items-center justify-center rounded-full transition-all ${done ? "bg-emerald-500 text-black" :
                                                                active ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(34,197,94,0.5)]" :
                                                                    "bg-[#27272a] text-[#52525b]"
                                                            }`}>
                                                            {done ? <CheckCircle2 className="h-2.5 w-2.5" /> : <Circle className="h-2 w-2" />}
                                                        </div>
                                                        <div className="flex-1 -mt-0.5">
                                                            <div className="flex items-center justify-between">
                                                                {isEditing ? (
                                                                    <div className="flex flex-col gap-1 w-full mr-2">
                                                                        <input 
                                                                            value={m.title} 
                                                                            onChange={(e) => {
                                                                                const newMilestones = [...project.milestones];
                                                                                newMilestones[i] = { ...m, title: e.target.value };
                                                                                setProject({...project, milestones: newMilestones});
                                                                            }}
                                                                            className="bg-transparent text-sm font-medium text-white focus:outline-none border-b border-transparent focus:border-emerald-500/50"
                                                                        />
                                                                        <div className="flex gap-2">
                                                                            <input 
                                                                                value={m.date}
                                                                                onChange={(e) => {
                                                                                    const newMilestones = [...project.milestones];
                                                                                    newMilestones[i] = { ...m, date: e.target.value };
                                                                                    setProject({...project, milestones: newMilestones});
                                                                                }}
                                                                                className="bg-transparent text-[10px] text-[#52525b] focus:outline-none w-20"
                                                                            />
                                                                            <select 
                                                                                value={m.status}
                                                                                onChange={(e) => {
                                                                                    const newMilestones = [...project.milestones];
                                                                                    newMilestones[i] = { ...m, status: e.target.value as any };
                                                                                    setProject({...project, milestones: newMilestones});
                                                                                }}
                                                                                className="bg-transparent text-[10px] text-[#52525b] focus:outline-none"
                                                                            >
                                                                                <option value="upcoming">Upcoming</option>
                                                                                <option value="current">Current</option>
                                                                                <option value="completed">Completed</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                    <span className={`text-sm font-medium ${active ? "text-white" : done ? "text-[#a1a1aa]" : "text-[#52525b]"}`}>
                                                                        {m.title}
                                                                    </span>
                                                                    <span className="text-[10px] text-[#3f3f46]">{m.date}</span>
                                                                    </>
                                                                )}
                                                                
                                                                {isEditing && (
                                                                    <button 
                                                                        onClick={() => {
                                                                            setProject({
                                                                                ...project,
                                                                                milestones: project.milestones.filter(x => x.id !== m.id)
                                                                            })
                                                                        }}
                                                                        className="text-zinc-600 hover:text-red-400 opacity-0 group-hover/milestone:opacity-100 transition-opacity"
                                                                    >
                                                                        <Trash2 className="h-3.5 w-3.5" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                            {m.description && !isEditing && <p className="text-[11px] text-[#52525b] mt-0.5">{m.description}</p>}
                                                            {isEditing && (
                                                                <input 
                                                                    value={m.description || ""}
                                                                    onChange={(e) => {
                                                                        const newMilestones = [...project.milestones];
                                                                        newMilestones[i] = { ...m, description: e.target.value };
                                                                        setProject({...project, milestones: newMilestones});
                                                                    }}
                                                                    placeholder="Description"
                                                                    className="w-full bg-transparent text-[11px] text-[#52525b] mt-0.5 focus:outline-none"
                                                                />
                                                            )}
                                                            {active && !isEditing && (
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
                                    </>
                                ) : (
                                    <p className="text-sm text-zinc-500">No milestones yet.</p>
                                )}
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
                                {isEditing ? (
                                    <input 
                                        type="number" 
                                        min="0" 
                                        max="100" 
                                        value={project.progress} 
                                        onChange={(e) => setProject({ ...project, progress: parseInt(e.target.value) })}
                                        className="w-12 bg-zinc-900 border border-[#27272a] rounded text-right text-sm font-bold text-white p-0.5 focus:outline-none"
                                    />
                                ) : (
                                    <span className="text-xl font-bold text-white">{project.progress}%</span>
                                )}
                            </div>
                            {isEditing ? (
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={project.progress}
                                    onChange={(e) => setProject({ ...project, progress: parseInt(e.target.value) })}
                                    className="w-full h-1.5 bg-[#27272a] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                            ) : (
                                <div className="h-1.5 w-full bg-[#27272a] rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
                                </div>
                            )}
                            <p className="text-[10px] text-[#52525b] mt-2">Est. {project.stats.estimatedCompletion} remaining</p>
                        </motion.div>


                        {/* Project Specs (Replaces Stats Bento) */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            onClick={() => setIsDetailsModalOpen(true)}
                            className="rounded-lg border border-[#27272a] bg-[#18181b] p-5 hover:border-[#3f3f46] transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                        <FileText className="h-4 w-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white">Project Details</h3>
                                        <p className="text-[10px] text-[#71717a]">Submitted Information</p>
                                    </div>
                                </div>
                                <ArrowUpRight className="h-4 w-4 text-[#52525b] group-hover:text-white transition-colors" />
                            </div>
                            
                            <div className="space-y-2 mt-4">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-[#a1a1aa]">Budget</span>
                                    <span className="text-white font-medium">{project.currency} {project.budget}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-[#a1a1aa]">Deadline</span>
                                    <span className="text-white font-medium">{project.deliveryTime}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-[#a1a1aa]">Type</span>
                                    <span className="text-white font-medium">{project.projectType}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Details Modal */}
                        <AnimatePresence>
                            {isDetailsModalOpen && (
                                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
                                    <motion.div 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        exit={{ opacity: 0 }}
                                        onClick={() => setIsDetailsModalOpen(false)}
                                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                                    />
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                        className="relative w-full max-w-2xl bg-[#18181b] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                                    >
                                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272a] bg-[#18181b]">
                                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                                <FileText className="h-5 w-5 text-blue-400" />
                                                Project Specifications
                                            </h2>
                                            <button 
                                                onClick={() => setIsDetailsModalOpen(false)}
                                                className="p-2 rounded-full hover:bg-[#27272a] text-[#a1a1aa] hover:text-white transition-colors"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                        
                                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                                                        <span className="text-xs text-[#71717a] block mb-1">Project Name</span>
                                                        <span className="text-sm text-white font-medium">{project.projectName}</span>
                                                    </div>
                                                    <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                                                        <span className="text-xs text-[#71717a] block mb-1">Category</span>
                                                        <span className="text-sm text-white font-medium">{project.category}</span>
                                                    </div>
                                                </div>

                                                <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                                                    <span className="text-xs text-[#71717a] block mb-1">Description</span>
                                                    <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{project.description}</p>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                                                        <span className="text-xs text-[#71717a] block mb-1">Budget</span>
                                                        <span className="text-sm text-brand-green font-medium">{project.currency} {project.budget}</span>
                                                    </div>
                                                    <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                                                        <span className="text-xs text-[#71717a] block mb-1">Timeline</span>
                                                        <span className="text-sm text-white font-medium">{project.deliveryTime}</span>
                                                    </div>
                                                </div>

                                                {project.additionalNotes && (
                                                    <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                                                        <span className="text-xs text-[#71717a] block mb-1">Additional Notes</span>
                                                        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{project.additionalNotes}</p>
                                                    </div>
                                                )}
                                                
                                                {/* Links Section */}
                                                {(project.projectLinks?.github || project.projectLinks?.figma || project.projectLinks?.website) && (
                                                    <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                                                        <span className="text-xs text-[#71717a] block mb-3">Project Links</span>
                                                        <div className="flex flex-wrap gap-3">
                                                            {project.projectLinks.github && (
                                                                <a href={project.projectLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-xs text-white transition-colors">
                                                                    <Github className="h-3.5 w-3.5" /> GitHub
                                                                </a>
                                                            )}
                                                            {project.projectLinks.figma && (
                                                                <a href={project.projectLinks.figma} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-xs text-white transition-colors">
                                                                    <Figma className="h-3.5 w-3.5" /> Figma
                                                                </a>
                                                            )}
                                                            {project.projectLinks.website && (
                                                                <a href={project.projectLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-xs text-white transition-colors">
                                                                    <Globe className="h-3.5 w-3.5" /> Website
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Snackbar Notification */}
                        <AnimatePresence>
                            {showSnackbar && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                    className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl text-white"
                                >
                                    <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Success</p>
                                        <p className="text-xs text-zinc-400">{snackbarMessage}</p>
                                    </div>
                                    <button onClick={() => setShowSnackbar(false)} className="ml-2 text-zinc-500 hover:text-white">
                                        <X className="h-4 w-4" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                            <div className="rounded-lg border border-[#27272a] bg-[#18181b] p-4 hover:border-[#3f3f46] transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            {project.teamMembers.map((m) => (
                                                <div key={m.id} className="relative group/avatar">
                                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} border-2 border-[#18181b] flex items-center justify-center text-xs font-bold text-white`} title={m.name}>
                                                        {m.name.charAt(0)}
                                                    </div>
                                                    {isEditing && (
                                                        <button 
                                                            onClick={() => handleRemoveDeveloper(m.id)}
                                                            className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover/avatar:opacity-100 transition-opacity"
                                                        >
                                                            <X className="h-2 w-2" />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">Project Team</p>
                                            <p className="text-[10px] text-[#52525b]">
                                                {project.teamMembers.length > 0 ? project.teamMembers.map(m => m.name.split(' ')[0]).join(', ') : "No members yet"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                {isEditing && (
                                    <div className="mt-3 pt-3 border-t border-[#27272a]">
                                        <p className="text-[10px] text-[#71717a] mb-2 uppercase font-medium">Add Developer</p>
                                        <select 
                                            className="w-full bg-zinc-900 border border-[#27272a] rounded text-xs text-white p-2 focus:outline-none focus:border-brand-green"
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    handleAddDeveloper(e.target.value);
                                                    e.target.value = ""; // Reset
                                                }
                                            }}
                                        >
                                            <option value="">Select a developer...</option>
                                            {allDevelopers
                                                .filter(d => !project.teamMembers.find(m => m.id === d.uid))
                                                .map(d => (
                                                <option key={d.uid} value={d.uid}>{d.name} ({d.email})</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                        {/* CTA with Gradient Border */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                            className="relative rounded-lg p-[1px] bg-gradient-to-r from-violet-500/50 via-purple-500/30 to-violet-500/50 hover:from-violet-500 hover:via-purple-500/50 hover:to-violet-500 transition-all cursor-pointer group">
                             {/* ... CTA Content ... */}
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
