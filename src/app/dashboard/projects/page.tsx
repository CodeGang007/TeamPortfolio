"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    FolderKanban,
    Search,
    Filter,
    ArrowLeft,
    Sparkles,
    Rocket,
    Loader2,
    FileEdit,
    Trash2,
    LayoutGrid,
    ChevronDown,
    X,
    Users,
    Check,
    Calendar,
    ArrowUpDown,
    SlidersHorizontal,
    ArrowUp,
    ArrowDown
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DashboardProjectCard, { ProjectStatus } from "@/components/DashboardProjectCard";
import { projectRequestService, ProjectRequest as BaseProjectRequest } from "@/lib/projectService";

interface ProjectRequest extends BaseProjectRequest {
    dynamicStatus?: string;
    progressPercent?: number;
    startDate?: string;
    dueDate?: string;
    currentMilestone?: string;
}

type TabType = "all" | "drafts";

export default function ProjectDashboard() {
    const { user, isAuthenticated, loading, role } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [projects, setProjects] = useState<ProjectRequest[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [userMap, setUserMap] = useState<Record<string, { name: string; email: string }>>({});
    const [selectedUserFilter, setSelectedUserFilter] = useState<string>("all");
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [userSearchQuery, setUserSearchQuery] = useState("");
    const userDropdownRef = useRef<HTMLDivElement>(null);

    // Advanced filter states
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | null>(null);
    const [dateRangeStart, setDateRangeStart] = useState<string>("");
    const [dateRangeEnd, setDateRangeEnd] = useState<string>("");
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const filterDropdownRef = useRef<HTMLDivElement>(null);

    // Fetch projects
    useEffect(() => {
        const fetchProjects = async () => {
            if (!user) return;
            try {
                let fetchedProjects: ProjectRequest[] = [];

                if (role === 'admin') {
                    // Admin sees all projects
                    fetchedProjects = await projectRequestService.getAllProjects();
                } else {
                    // Clients see only their own
                    fetchedProjects = await projectRequestService.getProjectsByUserId(user.uid);
                }

                // Fetch progress data for all non-draft projects to get real status
                const projectsWithStatus = await Promise.all(fetchedProjects.map(async (p) => {
                    if (p.isDraft || !p.id) return p;
                    try {
                        const progress = await projectRequestService.getProjectProgress(p.id);
                        if (progress) {
                            // Get the current/latest milestone - last one in array is most recent
                            let currentMilestone: string | undefined;
                            if (progress.milestones && progress.milestones.length > 0) {
                                // Show the last milestone (most recently added)
                                currentMilestone = progress.milestones[progress.milestones.length - 1]?.title;
                            }
                            return {
                                ...p,
                                dynamicStatus: progress.status,
                                progressPercent: progress.progress,
                                startDate: progress.startDate,
                                dueDate: progress.dueDate,
                                currentMilestone: currentMilestone
                            };
                        }
                    } catch (e) {
                        console.error(`Failed to fetch progress for ${p.id}`, e);
                    }
                    return p;
                }));

                // Sort by date descending (newest first)
                const sorted = projectsWithStatus.sort((a, b) => {
                    const dateA = new Date(a.draftSavedAt || a.initiatedAt || 0).getTime();
                    const dateB = new Date(b.draftSavedAt || b.initiatedAt || 0).getTime();
                    return dateB - dateA;
                });
                setProjects(sorted);

                // If Admin, fetch user details for these projects
                if (role === 'admin' && fetchedProjects.length > 0) {
                    const uniqueUserIds = Array.from(new Set(fetchedProjects.map(p => p.userId).filter(Boolean)));
                    if (uniqueUserIds.length > 0) {
                        try {
                            const profiles = await projectRequestService.getUserProfiles(uniqueUserIds);
                            setUserMap(profiles);
                        } catch (err) {
                            console.error("Failed to fetch user profiles", err);
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setIsLoadingData(false);
            }
        };

        if (isAuthenticated) {
            fetchProjects();
        }
    }, [user, isAuthenticated, role]);

    // Handle click outside to close dropdowns
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setUserDropdownOpen(false);
            }
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
                setFilterDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter authors based on search query
    const getFilteredAuthors = () => {
        const allAuthors = Array.from(new Set(displayProjects.map(p => p.userId))).map(uid => ({
            id: uid,
            name: userMap[uid]?.name || "Unknown User",
            email: userMap[uid]?.email || ""
        }));

        if (!userSearchQuery.trim()) return allAuthors;

        const query = userSearchQuery.toLowerCase();
        return allAuthors.filter(author =>
            author.name.toLowerCase().includes(query) ||
            author.email.toLowerCase().includes(query)
        );
    };

    // Get selected user name for display
    const getSelectedUserName = () => {
        if (selectedUserFilter === "all") return "All Users";
        return userMap[selectedUserFilter]?.name || "Unknown User";
    };

    if (!loading && !isAuthenticated) {
        router.push("/");
        return null;
    }

    if (loading || isLoadingData) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#121212]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />
                    <p className="text-zinc-500 text-sm">Loading your projects...</p>
                </div>
            </div>
        );
    }

    // Filter Logic
    const draftProjects = projects.filter(p => p.isDraft);
    const publishedProjects = projects.filter(p => !p.isDraft);

    const displayProjects = activeTab === "all" ? publishedProjects : draftProjects;

    // Helper to get project date for filtering/sorting
    const getProjectDate = (p: ProjectRequest): Date => {
        return new Date(p.startDate || p.draftSavedAt || p.initiatedAt || 0);
    };

    // Apply all filters
    const filteredProjects = displayProjects
        .filter((project) => {
            // Text search filter
            const matchesSearch = project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.category.toLowerCase().includes(searchQuery.toLowerCase());

            // User filter
            const matchesUser = selectedUserFilter === "all" || project.userId === selectedUserFilter;

            // Date range filter
            let matchesDateRange = true;
            if (dateRangeStart || dateRangeEnd) {
                const projectDate = getProjectDate(project);
                if (dateRangeStart) {
                    const startDate = new Date(dateRangeStart);
                    startDate.setHours(0, 0, 0, 0);
                    if (projectDate < startDate) matchesDateRange = false;
                }
                if (dateRangeEnd) {
                    const endDate = new Date(dateRangeEnd);
                    endDate.setHours(23, 59, 59, 999);
                    if (projectDate > endDate) matchesDateRange = false;
                }
            }

            return matchesSearch && matchesUser && matchesDateRange;
        })
        .sort((a, b) => {
            // If no sort order selected, keep original order (or sort by date range if selected)
            if (sortOrder === null) {
                // When no sort order, show in database order (by initiatedAt)
                const dateA = getProjectDate(a).getTime();
                const dateB = getProjectDate(b).getTime();
                return dateB - dateA; // Default to newest when no explicit sort
            }
            const dateA = getProjectDate(a).getTime();
            const dateB = getProjectDate(b).getTime();
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });

    // Get unique authors for filter dropdown
    const authors = Array.from(new Set(displayProjects.map(p => p.userId))).map(uid => ({
        id: uid,
        name: userMap[uid]?.name || "Unknown User"
    }));

    // Get count of active filters (only count non-default values)
    const getActiveFilterCount = () => {
        let count = 0;
        if (sortOrder === "oldest") count++; // Only count if explicitly set to oldest
        // Count date range as ONE filter (not separate start/end)
        if (dateRangeStart || dateRangeEnd) count++;
        return count;
    };

    // Clear all filters
    const clearAllFilters = () => {
        setSortOrder(null);
        setDateRangeStart("");
        setDateRangeEnd("");
        setSelectedUserFilter("all");
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#121212]/80 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272a] text-[#71717a] hover:text-white hover:border-[#3f3f46] transition-all">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            <div>
                                <h1 className="text-lg font-semibold text-white flex items-center gap-2">
                                    {role === 'admin' ? (
                                        <>
                                            <LayoutGrid className="h-4 w-4 text-brand-green" />
                                            Manage Publications
                                        </>
                                    ) : (
                                        <>
                                            <FolderKanban className="h-4 w-4 text-brand-green" />
                                            My Publications
                                        </>
                                    )}
                                </h1>
                                <p className="text-[11px] text-[#71717a]">
                                    {role === 'admin'
                                        ? "Overview of all platform activity and projects"
                                        : "Track your published projects and drafts"
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Mobile hide create button text if needed */}
                            <Button
                                onClick={() => router.push("/project-request/new")} // Default to generic new
                                className="bg-gradient-to-b from-brand-green to-brand-green-dim hover:from-brand-green/90 hover:to-brand-green-dim/90 text-black font-bold text-sm px-4 shadow-lg shadow-brand-green/25 border border-brand-green/20"
                            >
                                <Plus className="h-4 w-4 md:mr-1.5" />
                                <span className="hidden md:inline">New Project</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sub-header: Underline Tabs + Search */}
            <div className="border-b border-[#1a1a1a]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-3">
                        {/* Underline Tabs */}
                        <div className="flex gap-6 border-b md:border-none border-[#27272a] md:pb-0">
                            <button
                                onClick={() => setActiveTab("all")}
                                className={`relative pb-3 text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === "all" ? "text-white" : "text-[#a1a1aa] hover:text-white"}`}
                            >
                                Published
                                <span className={`text-xs px-1.5 py-0.5 rounded ${activeTab === "all" ? "bg-[#27272a] text-white" : "bg-[#27272a]/50 text-[#71717a]"}`}>
                                    {publishedProjects.length}
                                </span>
                                {activeTab === "all" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />}
                            </button>

                            <button
                                onClick={() => setActiveTab("drafts")}
                                className={`relative pb-3 text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === "drafts" ? "text-white" : "text-[#a1a1aa] hover:text-white"}`}
                            >
                                Drafts
                                <span className={`text-xs px-1.5 py-0.5 rounded ${activeTab === "drafts" ? "bg-[#27272a] text-white" : "bg-[#27272a]/50 text-[#71717a]"}`}>
                                    {draftProjects.length}
                                </span>
                                {activeTab === "drafts" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />}
                            </button>
                        </div>

                        {/* Search - Aligned to right */}
                        <div className="flex items-center gap-3 pb-2 md:pb-0 ml-auto">
                            {role === 'admin' && (
                                <div className="relative" ref={userDropdownRef}>
                                    {/* Dropdown Trigger Button */}
                                    <button
                                        onClick={() => {
                                            setUserDropdownOpen(!userDropdownOpen);
                                            if (!userDropdownOpen) setUserSearchQuery("");
                                        }}
                                        className={`flex items-center gap-2 w-full md:w-56 rounded-lg bg-[#18181b] border ${userDropdownOpen ? 'border-brand-green' : 'border-[#27272a]'} px-3 py-2 text-sm text-white hover:border-[#3f3f46] transition-colors cursor-pointer`}
                                    >
                                        <Users className="h-4 w-4 text-[#52525b] flex-shrink-0" />
                                        <span className="truncate flex-1 text-left">
                                            {getSelectedUserName()}
                                        </span>
                                        {selectedUserFilter !== "all" && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedUserFilter("all");
                                                }}
                                                className="p-0.5 rounded hover:bg-white/10 text-[#71717a] hover:text-white transition-colors"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        )}
                                        <ChevronDown className={`h-4 w-4 text-[#52525b] transition-transform flex-shrink-0 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {userDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-72 rounded-xl bg-[#1c1c1e] border border-[#333] shadow-2xl shadow-black/50 overflow-hidden z-50">
                                            {/* Search Input */}
                                            <div className="p-2 border-b border-[#333]">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#52525b]" />
                                                    <input
                                                        type="text"
                                                        value={userSearchQuery}
                                                        onChange={(e) => setUserSearchQuery(e.target.value)}
                                                        placeholder="Search users..."
                                                        className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-brand-green transition-colors"
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>

                                            {/* Options List */}
                                            <div className="max-h-64 overflow-y-auto py-1">
                                                {/* All Users Option */}
                                                <button
                                                    onClick={() => {
                                                        setSelectedUserFilter("all");
                                                        setUserDropdownOpen(false);
                                                    }}
                                                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${selectedUserFilter === "all" ? 'bg-brand-green/10 text-brand-green' : 'text-[#e5e5e5] hover:bg-white/5'}`}
                                                >
                                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${selectedUserFilter === "all" ? 'bg-brand-green/20' : 'bg-[#27272a]'}`}>
                                                        <Users className="h-3.5 w-3.5" />
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <div className="font-medium">All Users</div>
                                                        <div className="text-[10px] text-[#71717a]">
                                                            {authors.length} users with projects
                                                        </div>
                                                    </div>
                                                    {selectedUserFilter === "all" && (
                                                        <Check className="h-4 w-4 text-brand-green flex-shrink-0" />
                                                    )}
                                                </button>

                                                {/* Divider */}
                                                <div className="border-t border-[#333] my-1" />

                                                {/* User List */}
                                                {getFilteredAuthors().length > 0 ? (
                                                    getFilteredAuthors().map(author => (
                                                        <button
                                                            key={author.id}
                                                            onClick={() => {
                                                                setSelectedUserFilter(author.id);
                                                                setUserDropdownOpen(false);
                                                            }}
                                                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${selectedUserFilter === author.id ? 'bg-brand-green/10 text-brand-green' : 'text-[#e5e5e5] hover:bg-white/5'}`}
                                                        >
                                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${selectedUserFilter === author.id ? 'bg-brand-green text-black' : 'bg-gradient-to-br from-[#3f3f46] to-[#27272a] text-white'}`}>
                                                                {author.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="flex-1 text-left min-w-0">
                                                                <div className="font-medium truncate">{author.name}</div>
                                                                {author.email && (
                                                                    <div className="text-[10px] text-[#71717a] truncate">
                                                                        {author.email}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {selectedUserFilter === author.id && (
                                                                <Check className="h-4 w-4 text-brand-green flex-shrink-0" />
                                                            )}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="px-3 py-4 text-center text-sm text-[#71717a]">
                                                        No users found matching "{userSearchQuery}"
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Advanced Filters Dropdown - Only for Admin */}
                            {role === 'admin' && (
                                <div className="relative" ref={filterDropdownRef}>
                                    <button
                                        onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                                        className={`flex items-center gap-2 rounded-lg bg-[#18181b] border ${filterDropdownOpen ? 'border-brand-green' : 'border-[#27272a]'} px-3 py-2 text-sm text-white hover:border-[#3f3f46] transition-colors cursor-pointer`}
                                    >
                                        <SlidersHorizontal className="h-4 w-4 text-[#52525b]" />
                                        <span className="hidden md:inline">Filters</span>
                                        {getActiveFilterCount() > 0 && (
                                            <span className="flex items-center justify-center h-4 min-w-[16px] px-1 rounded-full bg-brand-green text-black text-[10px] font-bold">
                                                {getActiveFilterCount()}
                                            </span>
                                        )}
                                        <ChevronDown className={`h-4 w-4 text-[#52525b] transition-transform ${filterDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Filter Dropdown Panel */}
                                    {filterDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-[#1c1c1e] border border-[#333] shadow-2xl shadow-black/50 overflow-hidden z-50">
                                            {/* Header */}
                                            <div className="flex items-center justify-between px-4 py-3 border-b border-[#333]">
                                                <h4 className="text-sm font-semibold text-white">Filter & Sort</h4>
                                                {(getActiveFilterCount() > 0 || selectedUserFilter !== "all") && (
                                                    <button
                                                        onClick={clearAllFilters}
                                                        className="text-[10px] text-brand-green hover:text-brand-green/80 transition-colors"
                                                    >
                                                        Clear all
                                                    </button>
                                                )}
                                            </div>

                                            <div className="p-4 space-y-4">
                                                {/* Sort Order */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <label className="text-[11px] font-medium text-[#71717a] uppercase tracking-wider">
                                                            Sort by Date
                                                        </label>
                                                        {sortOrder && (
                                                            <button
                                                                onClick={() => setSortOrder(null)}
                                                                className="text-[10px] text-[#71717a] hover:text-white transition-colors"
                                                            >
                                                                Clear
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setSortOrder(sortOrder === "newest" ? null : "newest")}
                                                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${sortOrder === "newest"
                                                                ? 'bg-brand-green/10 text-brand-green border border-brand-green/30'
                                                                : 'bg-[#27272a] text-[#a1a1aa] border border-transparent hover:bg-[#3f3f46] hover:text-white'
                                                                }`}
                                                        >
                                                            <ArrowDown className="h-3.5 w-3.5" />
                                                            Newest First
                                                        </button>
                                                        <button
                                                            onClick={() => setSortOrder(sortOrder === "oldest" ? null : "oldest")}
                                                            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${sortOrder === "oldest"
                                                                ? 'bg-brand-green/10 text-brand-green border border-brand-green/30'
                                                                : 'bg-[#27272a] text-[#a1a1aa] border border-transparent hover:bg-[#3f3f46] hover:text-white'
                                                                }`}
                                                        >
                                                            <ArrowUp className="h-3.5 w-3.5" />
                                                            Oldest First
                                                        </button>
                                                    </div>
                                                    <p className="mt-1.5 text-[9px] text-[#52525b]">
                                                        Click again to deselect. No selection uses default order.
                                                    </p>
                                                </div>

                                                {/* Date Range */}
                                                <div>
                                                    <label className="text-[11px] font-medium text-[#71717a] uppercase tracking-wider mb-2 block">
                                                        Date Range
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="relative">
                                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#52525b]" />
                                                            <input
                                                                type="date"
                                                                value={dateRangeStart}
                                                                onChange={(e) => setDateRangeStart(e.target.value)}
                                                                className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-brand-green transition-colors [color-scheme:dark]"
                                                                placeholder="Start date"
                                                            />
                                                        </div>
                                                        <div className="relative">
                                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#52525b]" />
                                                            <input
                                                                type="date"
                                                                value={dateRangeEnd}
                                                                onChange={(e) => setDateRangeEnd(e.target.value)}
                                                                className="w-full rounded-lg bg-[#27272a] border border-[#3f3f46] pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-brand-green transition-colors [color-scheme:dark]"
                                                                placeholder="End date"
                                                            />
                                                        </div>
                                                    </div>
                                                    {(dateRangeStart || dateRangeEnd) && (
                                                        <button
                                                            onClick={() => {
                                                                setDateRangeStart("");
                                                                setDateRangeEnd("");
                                                            }}
                                                            className="mt-2 text-[10px] text-[#71717a] hover:text-white transition-colors flex items-center gap-1"
                                                        >
                                                            <X className="h-3 w-3" />
                                                            Clear date filter
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Quick Presets */}
                                                <div>
                                                    <label className="text-[11px] font-medium text-[#71717a] uppercase tracking-wider mb-2 block">
                                                        Quick Select
                                                    </label>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {[
                                                            { label: "Last 7 days", days: 7 },
                                                            { label: "Last 30 days", days: 30 },
                                                            { label: "Last 90 days", days: 90 },
                                                            { label: "This year", days: 365 }
                                                        ].map((preset) => (
                                                            <button
                                                                key={preset.label}
                                                                onClick={() => {
                                                                    const end = new Date();
                                                                    const start = new Date();
                                                                    start.setDate(start.getDate() - preset.days);
                                                                    setDateRangeStart(start.toISOString().split('T')[0]);
                                                                    setDateRangeEnd(end.toISOString().split('T')[0]);
                                                                }}
                                                                className="px-2.5 py-1.5 rounded-md text-[10px] font-medium bg-[#27272a] text-[#a1a1aa] hover:bg-[#3f3f46] hover:text-white transition-colors"
                                                            >
                                                                {preset.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer with result count */}
                                            <div className="px-4 py-3 border-t border-[#333] bg-[#18181b]">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] text-[#71717a]">
                                                        Showing <span className="text-white font-medium">{filteredProjects.length}</span> of {displayProjects.length} projects
                                                    </span>
                                                    <button
                                                        onClick={() => setFilterDropdownOpen(false)}
                                                        className="text-xs text-brand-green hover:text-brand-green/80 font-medium transition-colors"
                                                    >
                                                        Done
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="relative w-full md:w-auto">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#52525b]" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search projects..."
                                    className="w-full md:w-56 rounded-lg bg-[#18181b] border border-[#27272a] pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-brand-green hover:border-[#3f3f46] transition-colors"
                                />
                            </div>
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
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
                                    <FolderKanban className="h-10 w-10 text-emerald-400/50" />
                                </div>
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">
                            {searchQuery ? "No matching projects found" : activeTab === 'all' ? "No published projects yet" : "No drafts saved"}
                        </h2>
                        <p className="text-[#71717a] text-center max-w-sm mb-6 text-sm">
                            {activeTab === 'all' ? "Start your journey by launching your first project." : "You haven't saved any drafts yet."}
                        </p>
                    </motion.div>
                ) : (
                    <div
                        className="grid gap-6"
                        style={{
                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))'
                        }}
                    >
                        {filteredProjects.map((project, index) => {
                            // Map generic status to dashboard status
                            let status: ProjectStatus = project.isDraft ? 'pending' : 'active';
                            if (project.dynamicStatus) {
                                status = project.dynamicStatus as ProjectStatus;
                            }

                            return (
                                <div key={project.id || index} className="group relative">
                                    <Link href={project.isDraft
                                        ? `/project-request/custom-vision-card?draftId=${project.id}`
                                        : `/dashboard/projects/${project.id}`
                                    }>
                                        <div className="relative z-10">
                                            <DashboardProjectCard
                                                id={project.id || ""}
                                                title={project.projectName}
                                                description={project.description}
                                                lastUpdated={project.isDraft ? "Draft" : "Published"}
                                                status={status}
                                                category={project.category}
                                                gradientIndex={index}
                                                progress={project.progressPercent}
                                                startDate={project.startDate || project.initiatedAt || project.draftSavedAt}
                                                dueDate={project.dueDate}
                                                currentMilestone={project.currentMilestone}
                                                clientName={
                                                    role === 'admin'
                                                        ? (userMap[project.userId]?.name || project.userName || project.userEmail || "User")
                                                        : undefined
                                                }
                                            />
                                        </div>
                                    </Link>

                                    {/* Quick Actions for Drafts */}
                                    {project.isDraft && (
                                        <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    if (confirm("Are you sure you want to delete this draft?")) {
                                                        const handleDelete = async () => {
                                                            try {
                                                                await projectRequestService.deleteProject(project.id || "");
                                                                setProjects(prev => prev.filter(p => p.id !== project.id));
                                                            } catch (error) {
                                                                console.error("Failed to delete draft", error);
                                                                alert("Failed to delete draft");
                                                            }
                                                        };
                                                        handleDelete();
                                                    }
                                                }}
                                                className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white backdrop-blur-md transition-all shadow-lg shadow-black/50"
                                                title="Delete Draft"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
