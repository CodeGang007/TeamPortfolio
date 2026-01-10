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
import { projectRequestService, TeamMember as ServiceTeamMember } from "@/lib/projectService";
import { developerService } from "@/lib/developerService";
import { emailService } from "../../../../lib/emailService";
import { FeedbackEditor } from "@/components/FeedbackEditor";
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
    imageUrl?: string;
    projectUrl?: string;
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
    attachmentUrls?: Array<{ name: string; url: string; type: string; size: string; }>;
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
    const [isFeedbackEditorOpen, setIsFeedbackEditorOpen] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Admin Edit States
    const [isEditing, setIsEditing] = useState(false);
    const [allDevelopers, setAllDevelopers] = useState<ServiceTeamMember[]>([]);
    const [newlyAssignedDevs, setNewlyAssignedDevs] = useState<ServiceTeamMember[]>([]); // Track new assignments for email

    // Fetch developers if admin
    useEffect(() => {
        if (role === 'admin') {
            projectRequestService.getDevelopers().then(setAllDevelopers);
        }
    }, [role]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isDetailsModalOpen || isFeedbackEditorOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isDetailsModalOpen, isFeedbackEditorOpen]);

    const handleSave = async () => {
        if (!project) return;
        try {
            // Check previous status to avoid duplicate emails
            const currentProgress = await projectRequestService.getProjectProgress(project.id);
            const isActivating = (currentProgress?.status !== 'active') && (project.status === 'active');

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
                    email: m.email || "unknown@example.com",
                    role: m.role
                })),
                teamSize: project.teamMembers.length
            });

            // SYNC ASSIGNMENTS: Ensure all team members are in the project_assignments collection
            try {
                await Promise.all(project.teamMembers.map(member => 
                    projectRequestService.assignProject(project.id, member.id)
                ));
            } catch (assignError) {
                console.error("Failed to sync assignments:", assignError);
            }

            // EMAIL NOTIFICATION: Send email to newly assigned developers (Batched)
            if (newlyAssignedDevs.length > 0) {
                 try {
                    const requestData = await projectRequestService.getProjectById(project.id);
                    await emailService.sendTeamAssignmentEmail({
                        developers: newlyAssignedDevs.map(d => ({ name: d.name, email: d.email || "" })),
                        projectName: project.projectName,
                        projectId: project.id,
                        clientName: requestData?.userName || "Admin"
                    });
                    setNewlyAssignedDevs([]); // Clear buffer
                 } catch (emailError) {
                     console.error("Failed to send assignment emails", emailError);
                 }
            }

            // Send Email if activating
            if (isActivating) {
                const requestData = await projectRequestService.getProjectById(project.id);
                if (requestData && requestData.userEmail) {
                    await emailService.sendProjectActiveEmail({
                        projectName: project.projectName,
                        clientName: requestData.userName || "Valued Client",
                        clientEmail: requestData.userEmail,
                        developers: project.teamMembers.map(m => ({
                            name: m.name,
                            email: m.email || "",
                            role: m.role
                        }))
                    });
                    setSnackbarMessage("Project activated & email sent to client!");
                } else {
                    setSnackbarMessage("Project active, but could not find client email.");
                }
                setShowSnackbar(true);
            } else {
                setSnackbarMessage("Changes saved successfully.");
                setShowSnackbar(true);
            }

            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save:", error);
            alert("Failed to save changes.");
        }
    };

    const handleAddDeveloper = (devId: string) => {
        const dev = allDevelopers.find(d => d.uid === devId);
        if (dev && project && !project.teamMembers.find(m => m.id === dev.uid)) {
            // Track as new
            setNewlyAssignedDevs(prev => [...prev, dev]);
            
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
                        attachmentUrls: projectRequest.attachmentUrls || [],

                        milestones: progressData.milestones || [],
                        stats: {
                            hoursSpent: progressData.hoursSpent,
                            tasksCompleted: progressData.tasksCompleted,
                            tasksTotal: progressData.tasksTotal,
                            estimatedCompletion: projectRequest.deliveryTime,
                            teamSize: progressData.teamSize || (projectRequest.assignedTo?.length || 0)
                        },
                        // Map assigned developers to local TeamMember format
                        teamMembers: await Promise.all((progressData.assignedDevelopers || []).map(async (d) => {
                            const devProfile = await developerService.getDeveloperById(d.uid);
                            return {
                                id: d.uid,
                                name: devProfile?.name || d.name,
                                role: devProfile?.role || d.role,
                                email: d.email,
                                color: "from-violet-500 to-purple-600",
                                imageUrl: devProfile?.imageUrl,
                                projectUrl: devProfile?.projectUrl
                            };
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
                        },
                        attachmentUrls: projectRequest.attachmentUrls || []
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

    // Permissions
    const isAssignedDeveloper = role === 'developer' && project?.teamMembers.some(m => m.id === user?.uid);
    const canEdit = role === 'admin' || isAssignedDeveloper;

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

                            {/* Admin/Developer Controls */}
                            {canEdit ? (
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
                                        {/* Only Admin can approve closure */}
                                        {role === 'admin' && project.status === 'pending-closure' && (
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
                                            className="border-[#3f3f46] bg-[#27272a] text-white hover:bg-[#3f3f46] hover:border-[#52525b] text-xs h-8 font-medium"
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
                            {/* Title with inline badges */}
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <h1 className="text-3xl font-bold text-[#f4f4f5] tracking-[-0.02em]">{project.title}</h1>
                                {/* Status Badge */}
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
                                {/* Category Badge */}
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium border border-[#3f3f46] text-[#a1a1aa]">
                                    {project.category}
                                </span>
                            </div>
                            <p className="text-[#a1a1aa] leading-relaxed text-sm" style={{ maxWidth: '60ch' }}>{project.description}</p>
                        </div>

                        {/* Stats with proper hierarchy */}
                        <div className="flex items-center gap-4 text-center">
                            <div className="flex flex-col items-center">
                                <p className="text-3xl font-bold text-[#f4f4f5]">{project.progress}%</p>
                                <p className="text-[10px] text-[#71717a] uppercase tracking-[0.1em] mt-1 font-medium">Complete</p>
                            </div>
                            <div className="h-10 w-px bg-[#27272a]" />
                            <div className="flex flex-col items-center">
                                <p className="text-3xl font-bold text-[#f4f4f5]">{project.stats.teamSize}</p>
                                <p className="text-[10px] text-[#71717a] uppercase tracking-[0.1em] mt-1 font-medium">Team</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                    {/* Left Column */}
                    <div className="lg:col-span-7 space-y-4">

                        {/* Browser Preview */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="rounded-xl border border-[#27272a] bg-[#18181b] overflow-hidden hover:border-[#3f3f46] transition-colors group/preview">
                            {/* Browser Toolbar */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#27272a] bg-[#27272a]">
                                <div className="flex gap-1.5">
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#eab308]" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="h-6 rounded bg-[#18181b] flex items-center px-3 group-focus-within/preview:ring-1 ring-emerald-500/50 transition-all">
                                        <div className="mr-2 text-zinc-500">
                                            <Globe className="h-3 w-3" />
                                        </div>
                                        {isEditing ? (
                                            <input
                                                value={project.liveUrl || ""}
                                                onChange={(e) => setProject({ ...project, liveUrl: e.target.value })}
                                                placeholder="https://your-app.com"
                                                className="w-full bg-transparent text-[10px] text-white focus:outline-none placeholder:text-zinc-600"
                                            />
                                        ) : (
                                            <a
                                                href={project.liveUrl || "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`text-[10px] block w-full truncate ${project.liveUrl ? 'text-zinc-300 hover:text-white' : 'text-zinc-600'}`}
                                            >
                                                {project.liveUrl || 'No live URL configured'}
                                            </a>
                                        )}
                                    </div>
                                </div>
                                {project.liveUrl && !isEditing && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-zinc-700 rounded transition-colors text-zinc-400 hover:text-white">
                                        <ExternalLink className="h-3.5 w-3.5" />
                                    </a>
                                )}
                            </div>

                            {/* Preview Area */}
                            <div className="aspect-video bg-[#09090b] relative overflow-hidden group/frame">
                                {project.liveUrl ? (
                                    <iframe
                                        src={project.liveUrl}
                                        className="w-full h-full border-none opacity-90 transition-opacity hover:opacity-100"
                                        title="Live Preview"
                                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {/* Diagonal stripe pattern */}
                                        <div
                                            className="absolute inset-0 opacity-[0.03]"
                                            style={{
                                                backgroundImage: `repeating-linear-gradient(
                                                    -45deg,
                                                    transparent,
                                                    transparent 10px,
                                                    #ffffff 10px,
                                                    #ffffff 11px
                                                )`
                                            }}
                                        />
                                        {/* Subtle radial gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-radial from-[#18181b] via-transparent to-transparent opacity-50" />

                                        <div className="text-center p-6 relative z-10">
                                            {/* Large thin-line Globe icon */}
                                            <Globe className="h-20 w-20 mx-auto mb-6 text-zinc-600/50 stroke-[0.5]" />
                                            <p className="text-sm text-[#a1a1aa] font-medium mb-1">No Live Preview Available</p>
                                            <p className="text-xs text-[#52525b] mb-4">Add a Live URL to see the preview here</p>
                                            {role === 'admin' && (
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="px-4 py-2 text-xs font-medium text-white bg-brand-green/10 border border-brand-green/30 rounded-lg hover:bg-brand-green/20 hover:border-brand-green/50 transition-all"
                                                >
                                                    Configure Live URL
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Overlay to prevent blocking interactions when not focused, but allow scrolling */}
                                {project.liveUrl && (
                                    <div className="absolute inset-0 bg-transparent pointer-events-none group-hover/frame:pointer-events-auto" />
                                )}
                            </div>

                            {/* Footer Bar */}
                            <div className="px-4 py-3 border-t border-[#27272a] flex items-center justify-between bg-[#0f0f10]">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-1.5">
                                        {project.teamMembers.map((m) => (
                                            <Link
                                                href={`/team?id=${m.id}`}
                                                key={m.id}
                                                className="block transition-transform hover:scale-110 hover:z-10 relative"
                                                title={`View ${m.name}'s Profile`}
                                            >
                                                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${m.color} border-2 border-[#18181b] flex items-center justify-center text-[8px] font-bold text-white shadow-sm overflow-hidden`}>
                                                    {m.imageUrl ? (
                                                        <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        m.name.charAt(0)
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <span className="text-[11px] text-[#52525b]">{project.stats.teamSize} contributors</span>
                                </div>
                                <span className="flex items-center gap-1.5 text-[10px] text-[#3f3f46]">
                                    <div className={`h-1.5 w-1.5 rounded-full ${project.liveUrl ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`} />
                                    {project.liveUrl ? 'Live Preview Active' : 'Offline'}
                                </span>
                            </div>
                        </motion.div>

                        {/* Timeline - Vertical Stepper */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="rounded-xl border border-[#27272a] bg-[#18181b] p-5 hover:border-[#3f3f46] transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-semibold text-white tracking-tight">Timeline</h3>
                                <div className="flex items-center gap-2">
                                    {isEditing && (
                                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-zinc-800" onClick={() => {
                                            if (!project) return;
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
                                    <span className="text-[10px] text-[#71717a] font-mono">{project.startDate} → {project.dueDate}</span>
                                </div>
                            </div>

                            <div className="relative pl-8">
                                {project.milestones.length > 0 ? (
                                    <>
                                        {/* Dynamic line segments */}
                                        {/* Dynamic line segments */}


                                        <div className="relative pl-4 space-y-0">
                                            {project.milestones.map((m, i) => {
                                                const isLast = i === project.milestones.length - 1;
                                                const done = m.status === "completed";
                                                const active = m.status === "current";

                                                // Determine styles based on status
                                                let dotStyle = "";
                                                let lineStyle = "";

                                                if (done) {
                                                    dotStyle = "bg-emerald-500 ring-4 ring-[#18181b]"; // Green filled
                                                    lineStyle = "border-l-2 border-emerald-500"; // Solid Green
                                                } else if (active) {
                                                    dotStyle = "bg-blue-600 ring-4 ring-[#18181b] shadow-[0_0_0_4px_#3f3f46]"; // Blue with border/ring
                                                    // Check the NEXT status to determine line style.
                                                    // If next is Future, this line is Dotted Grey.
                                                    lineStyle = "border-l-2 border-dashed border-[#3f3f46]";
                                                } else {
                                                    dotStyle = "bg-zinc-700 ring-4 ring-[#18181b]"; // Grey filled
                                                    lineStyle = "border-l-2 border-dashed border-[#3f3f46]";
                                                }

                                                // Connector override:
                                                // If we are DONE, check if next node exists.
                                                // If next is ALSO done or CURRENT, path should be green.
                                                if (done) {
                                                    const nextMilestone = !isLast ? project.milestones[i + 1] : null;
                                                    // If next milestone exists and is either Completed or Current, line is Green.
                                                    if (nextMilestone && (nextMilestone.status === 'completed' || nextMilestone.status === 'current')) {
                                                        lineStyle = "border-l-2 border-emerald-500";
                                                    } else {
                                                        // Else (next is upcoming?), maybe dotted? Or still green if we delivered?
                                                        // Usually if I'm done, path to next is done.
                                                        // Let's stick to Green if I am done.
                                                        lineStyle = "border-l-2 border-emerald-500";
                                                    }
                                                }

                                                // Calculate duration
                                                let durationDisplay = "";
                                                if (i > 0) {
                                                    try {
                                                        const prevDateStr = project.milestones[i - 1]?.date;
                                                        const currDateStr = m.date;

                                                        if (prevDateStr && currDateStr && prevDateStr !== 'TBD' && currDateStr !== 'TBD') {
                                                            const prevDate = new Date(prevDateStr);
                                                            const currDate = new Date(currDateStr);
                                                            const diffTime = Math.abs(currDate.getTime() - prevDate.getTime());
                                                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                            durationDisplay = `${diffDays} Day${diffDays !== 1 ? 's' : ''}`;
                                                        }
                                                    } catch (e) {
                                                        // ignore
                                                    }
                                                }

                                                return (
                                                    <div key={m.id} className="relative flex gap-4">
                                                        {/* Left Column: Timeline Graphic */}
                                                        <div className="flex flex-col items-center">
                                                            {/* The Dot - Syncfusion exact colors + special last item styling */}
                                                            {isLast ? (
                                                                /* Last item: Larger green dot with glow effect */
                                                                <div className="relative shrink-0">
                                                                    {/* Outer glow rings */}
                                                                    <div className="absolute inset-0 w-6 h-6 -translate-x-[5px] -translate-y-[5px] rounded-full bg-emerald-500/10 blur-sm" />
                                                                    <div className="absolute inset-0 w-5 h-5 -translate-x-[3px] -translate-y-[3px] rounded-full bg-emerald-500/20 blur-[2px]" />
                                                                    {/* Main dot */}
                                                                    <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                                                                </div>
                                                            ) : done ? (
                                                                <div className="w-3.5 h-3.5 rounded-full bg-[#4CAF50] shrink-0" />
                                                            ) : active ? (
                                                                <div className="w-5 h-5 rounded-full bg-[#2196F3] border-[3px] border-white shrink-0 shadow-sm" />
                                                            ) : (
                                                                <div className="w-3.5 h-3.5 rounded-full bg-[#D1D5DB] shrink-0" />
                                                            )}

                                                            {/* The Line (only if not last) */}
                                                            {!isLast && (
                                                                <div
                                                                    className={`flex-1 w-0 ${done ? 'border-l-2 border-[#4CAF50]' : 'border-l-2 border-dashed border-[#9CA3AF]'}`}
                                                                    style={{ minHeight: '3.5rem' }}
                                                                />
                                                            )}
                                                        </div>

                                                        {/* Right Column: Content */}
                                                        <div className={`flex-1 pb-8 ${isLast ? 'pb-0' : ''}`}>
                                                            <div className="flex flex-col gap-1 -mt-1">
                                                                {/* Header Row: Title + Date + Duration */}
                                                                <div className="flex items-start justify-between">
                                                                    {isEditing ? (
                                                                        <div className="flex flex-col gap-2 w-full">
                                                                            <input
                                                                                value={m.title}
                                                                                onChange={(e) => {
                                                                                    const newMilestones = [...project.milestones];
                                                                                    newMilestones[i] = { ...m, title: e.target.value };
                                                                                    setProject({ ...project, milestones: newMilestones });
                                                                                }}
                                                                                className="bg-transparent text-sm font-semibold text-white focus:outline-none border-b border-transparent focus:border-emerald-500/50"
                                                                            />
                                                                            <div className="flex gap-2">
                                                                                <input
                                                                                    value={m.date}
                                                                                    onChange={(e) => {
                                                                                        const newMilestones = [...project.milestones];
                                                                                        newMilestones[i] = { ...m, date: e.target.value };
                                                                                        setProject({ ...project, milestones: newMilestones });
                                                                                    }}
                                                                                    placeholder="YYYY-MM-DD"
                                                                                    className="bg-transparent text-xs text-[#71717a] font-mono border border-[#3f3f46] rounded px-1 w-24"
                                                                                />
                                                                                <select
                                                                                    value={m.status}
                                                                                    onChange={(e) => {
                                                                                        const newMilestones = [...project.milestones];
                                                                                        newMilestones[i] = { ...m, status: e.target.value as any };
                                                                                        setProject({ ...project, milestones: newMilestones });
                                                                                    }}
                                                                                    className="bg-[#18181b] text-xs text-[#71717a] border border-[#3f3f46] rounded px-1"
                                                                                >
                                                                                    <option value="upcoming">Upcoming</option>
                                                                                    <option value="current">Current</option>
                                                                                    <option value="completed">Completed</option>
                                                                                </select>
                                                                                <button
                                                                                    onClick={() => {
                                                                                        const newMilestones = project.milestones.filter((_, idx) => idx !== i);
                                                                                        setProject({ ...project, milestones: newMilestones });
                                                                                    }}
                                                                                    className="text-red-400 hover:text-red-300"
                                                                                >
                                                                                    <Trash2 className="h-4 w-4" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="space-y-0.5">
                                                                            <h4 className={`text-sm font-medium ${active ? 'text-white' : 'text-[#e4e4e7]'}`}>
                                                                                {m.title}
                                                                            </h4>
                                                                            <div className="flex items-center gap-3">
                                                                                <span className="text-xs text-[#71717a] font-mono">
                                                                                    {m.date === 'TBD' ? 'TBD' : new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                                                </span>
                                                                                {durationDisplay && (
                                                                                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#27272a] text-[#a1a1aa] border border-[#3f3f46]">
                                                                                        {durationDisplay}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Description */}
                                                                {!isEditing && m.description && (
                                                                    <p className="text-xs text-[#71717a] leading-relaxed mt-1">
                                                                        {m.description}
                                                                    </p>
                                                                )}

                                                                {isEditing && (
                                                                    <textarea
                                                                        value={m.description || ""}
                                                                        onChange={(e) => {
                                                                            const newMilestones = [...project.milestones];
                                                                            newMilestones[i] = { ...m, description: e.target.value };
                                                                            setProject({ ...project, milestones: newMilestones });
                                                                        }}
                                                                        className="w-full bg-transparent text-xs text-[#71717a] mt-1 border border-[#3f3f46] rounded p-1"
                                                                        rows={2}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <Target className="h-8 w-8 mx-auto mb-2 text-zinc-700" />
                                        <p className="text-sm text-zinc-500">No milestones yet</p>
                                        {role === 'admin' && (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="mt-2 text-xs text-brand-green hover:underline"
                                            >
                                                Add milestone
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Bento Grid */}
                    <div className="lg:col-span-5 space-y-4">

                        {/* Progress */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                            className="rounded-xl border border-[#27272a] bg-[#18181b] p-5 hover:border-[#3f3f46] transition-colors">
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


                        {/* Project Specs Card */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            onClick={() => setIsDetailsModalOpen(true)}
                            className="rounded-xl border border-[#27272a] bg-[#18181b] p-5 hover:border-[#3f3f46] transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                        <FileText className="h-4 w-4 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-[#f4f4f5]">Project Details</h3>
                                        <p className="text-[10px] text-[#71717a]">Submitted Information</p>
                                    </div>
                                </div>
                                <ArrowUpRight className="h-4 w-4 text-[#52525b] group-hover:text-white transition-colors" />
                            </div>

                            <div className="divide-y divide-[#27272a]">
                                <div className="flex justify-between items-center py-2.5">
                                    <span className="text-xs text-[#a1a1aa]">Budget</span>
                                    <span className="text-xs text-[#f4f4f5] font-medium font-mono text-right">
                                        {project.currency === 'INR' ? '₹' : project.currency === 'USD' ? '$' : project.currency} {parseFloat(project.budget).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2.5">
                                    <span className="text-xs text-[#a1a1aa]">Deadline</span>
                                    <span className="text-xs text-[#f4f4f5] font-medium text-right">
                                        {project.dueDate && project.dueDate !== 'TBD'
                                            ? new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                            : project.deliveryTime}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2.5">
                                    <span className="text-xs text-[#a1a1aa]">Type</span>
                                    <span className="text-xs text-[#f4f4f5] font-medium text-right capitalize">{project.projectType?.replace(/_/g, ' ') || 'N/A'}</span>
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
                                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                        className="relative w-full max-w-xl bg-[#0f0f12] border border-[#27272a] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                                    >
                                        {/* Header with gradient accent */}
                                        <div className="relative px-6 py-5 border-b border-[#27272a]">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
                                            <div className="relative flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                                        <FileText className="h-5 w-5 text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <h2 className="text-lg font-bold text-[#f4f4f5]">Project Specifications</h2>
                                                        <p className="text-xs text-[#71717a]">Submitted project details</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setIsDetailsModalOpen(false)}
                                                    className="p-2 rounded-lg hover:bg-[#27272a] text-[#71717a] hover:text-white transition-colors"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ overscrollBehavior: 'contain' }}>
                                            {/* Project Name & Category */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-colors">
                                                    <span className="text-[10px] text-[#71717a] uppercase tracking-wider block mb-2">Project Name</span>
                                                    <span className="text-sm text-[#f4f4f5] font-semibold">{project.projectName}</span>
                                                </div>
                                                <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-colors">
                                                    <span className="text-[10px] text-[#71717a] uppercase tracking-wider block mb-2">Category</span>
                                                    <span className="text-sm text-[#f4f4f5] font-semibold">{project.category}</span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-colors">
                                                <span className="text-[10px] text-[#71717a] uppercase tracking-wider block mb-2">Description</span>
                                                <p className="text-sm text-[#a1a1aa] leading-relaxed whitespace-pre-wrap">{project.description}</p>
                                            </div>

                                            {/* Budget & Timeline */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                                                    <span className="text-[10px] text-[#71717a] uppercase tracking-wider block mb-2">Budget</span>
                                                    <span className="text-lg text-emerald-400 font-bold font-mono">
                                                        {project.currency === 'INR' ? '₹' : project.currency === 'USD' ? '$' : project.currency}{project.budget}
                                                    </span>
                                                </div>
                                                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                                                    <span className="text-[10px] text-[#71717a] uppercase tracking-wider block mb-2">Timeline</span>
                                                    <span className="text-lg text-blue-400 font-bold">{project.deliveryTime}</span>
                                                </div>
                                            </div>

                                            {project.additionalNotes && (
                                                <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-colors">
                                                    <span className="text-[10px] text-[#71717a] uppercase tracking-wider block mb-2">Additional Notes</span>
                                                    <p className="text-sm text-[#a1a1aa] leading-relaxed whitespace-pre-wrap">{project.additionalNotes}</p>
                                                </div>
                                            )}

                                            {/* Links Section */}
                                            {(project.projectLinks?.github || project.projectLinks?.figma || project.projectLinks?.website) && (
                                                <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-colors">
                                                    <span className="text-[10px] text-[#71717a] uppercase tracking-wider block mb-3">Project Links</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.projectLinks.github && (
                                                            <a href={project.projectLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-xs text-white transition-colors">
                                                                <Github className="h-3.5 w-3.5" /> GitHub
                                                            </a>
                                                        )}
                                                        {project.projectLinks.figma && (
                                                            <a href={project.projectLinks.figma} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-xs text-white transition-colors">
                                                                <Figma className="h-3.5 w-3.5" /> Figma
                                                            </a>
                                                        )}
                                                        {project.projectLinks.website && (
                                                            <a href={project.projectLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] text-xs text-white transition-colors">
                                                                <Globe className="h-3.5 w-3.5" /> Website
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Attachments Section */}
                                            {project.attachmentUrls && project.attachmentUrls.length > 0 && (
                                                <div className="p-4 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-colors">
                                                    <span className="text-[10px] text-[#71717a] uppercase tracking-wider block mb-3">Attachments & Files</span>
                                                    <div className="flex flex-col gap-2">
                                                        {project.attachmentUrls.map((file, idx) => (
                                                            <a 
                                                                key={idx}
                                                                href={file.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-between p-3 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] transition-colors group/file text-decoration-none"
                                                            >
                                                                <div className="flex items-center gap-3 overflow-hidden">
                                                                    <div className="h-8 w-8 rounded bg-[#18181b] flex items-center justify-center text-zinc-400 group-hover/file:text-brand-green transition-colors">
                                                                        <FileText className="h-4 w-4" />
                                                                    </div>
                                                                    <div className="flex flex-col min-w-0">
                                                                        <span className="text-xs text-white font-medium truncate pr-2">{file.name}</span>
                                                                        <span className="text-[10px] text-[#71717a]">{// @ts-ignore
                                                                        file.size ? file.size : 'Unknown size'}</span>
                                                                    </div>
                                                                </div>
                                                                <ExternalLink className="h-3.5 w-3.5 text-[#52525b] group-hover/file:text-white transition-colors flex-shrink-0" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
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

                        <div className="rounded-xl border border-[#27272a] bg-[#18181b] p-4 hover:border-[#3f3f46] transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {project.teamMembers.map((m) => (
                                            <div key={m.id} className="relative group/avatar">
                                                <Link
                                                    href={`/team?id=${m.id}`}
                                                    title={`${m.name} - ${m.role}`}
                                                    className="block relative transition-transform hover:scale-110 hover:z-10"
                                                >
                                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} border-2 border-[#18181b] flex items-center justify-center text-xs font-bold text-white overflow-hidden`}>
                                                        {m.imageUrl ? (
                                                            <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            m.name.charAt(0)
                                                        )}
                                                    </div>
                                                </Link>
                                                {isEditing && role === 'admin' && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleRemoveDeveloper(m.id);
                                                        }}
                                                        className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover/avatar:opacity-100 transition-opacity z-20"
                                                    >
                                                        <X className="h-2 w-2" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Project Team</p>
                                        <div className="flex flex-col gap-0.5 mt-0.5">
                                            {project.teamMembers.length > 0 ? (
                                                project.teamMembers.map(m => (
                                                    <p key={m.id} className="text-[10px] text-[#71717a]">
                                                        <span className="text-zinc-400">{m.name}</span>
                                                        <span className="mx-1.5 opacity-50">|</span>
                                                        <span className="text-brand-green/70">{m.role}</span>
                                                    </p>
                                                ))
                                            ) : (
                                                <p className="text-[10px] text-[#52525b]">No members assigned</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {isEditing && role === 'admin' && (
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

                        {/* Feedback Link - Subtle Ghost Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            onClick={() => setIsFeedbackEditorOpen(true)}
                            className="w-full flex items-center justify-center gap-2 py-3 text-xs text-[#71717a] hover:text-[#a1a1aa] border border-transparent hover:border-[#27272a] rounded-lg transition-all group"
                        >
                            <MessageSquare className="h-4 w-4 text-violet-400/50 group-hover:text-violet-400 transition-colors" />
                            <span>Need changes? Send feedback</span>
                            <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </motion.button>
                    </div>
                </div >
            </main >

            {/* Feedback Editor Modal */}
            <AnimatePresence>
                {isFeedbackEditorOpen && project && (
                    <FeedbackEditor
                        projectId={project.id}
                        projectName={project.title}
                        onClose={() => setIsFeedbackEditorOpen(false)}
                        onSave={async (content, htmlContent) => {
                            // Save feedback to the project
                            console.log('Saving feedback:', { projectId: project.id, content, htmlContent });

                            // Show success snackbar
                            setSnackbarMessage("Feedback sent successfully!");
                            setShowSnackbar(true);
                            setTimeout(() => setShowSnackbar(false), 3000);
                        }}
                    />
                )}
            </AnimatePresence>
        </div >
    );
}
