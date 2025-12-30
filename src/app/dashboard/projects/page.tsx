"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DashboardProjectCard, {
  ProjectStatus,
} from "@/components/DashboardProjectCard";
import {
  projectRequestService,
  ProjectRequest as BaseProjectRequest,
} from "@/lib/projectService";

interface ProjectRequest extends BaseProjectRequest {
  dynamicStatus?: string;
}

type TabType = "all" | "drafts";

export default function ProjectDashboard() {
  const { user, isAuthenticated, loading, role } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<ProjectRequest[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [userMap, setUserMap] = useState<
    Record<string, { name: string; email: string }>
  >({});
  const [selectedUserFilter, setSelectedUserFilter] = useState<string>("all");

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      try {
        let fetchedProjects: ProjectRequest[] = [];

        if (role === "admin") {
          // Admin sees all projects
          fetchedProjects = await projectRequestService.getAllProjects();
        } else {
          // Clients see only their own projects (both published and drafts)
          fetchedProjects = await projectRequestService.getProjectsByUserId(
            user.uid
          );
        }

        // Fetch progress data for all non-draft projects to get real status
        const projectsWithStatus = await Promise.all(
          fetchedProjects.map(async (p) => {
            if (p.isDraft || !p.id) return p;
            try {
              const progress = await projectRequestService.getProjectProgress(
                p.id
              );
              if (progress) {
                // Attach dynamic status to the project object (casting/extending needed or just pass separately)
                // Ideally, ProjectRequest should have an optional dynamicStatus field, or we map it here.
                return { ...p, dynamicStatus: progress.status };
              }
            } catch (e) {
              console.error(`Failed to fetch progress for ${p.id}`, e);
            }
            return p;
          })
        );

        // Sort by date descending (newest first)
        const sorted = projectsWithStatus.sort((a, b) => {
          const dateA = new Date(
            a.draftSavedAt || a.initiatedAt || 0
          ).getTime();
          const dateB = new Date(
            b.draftSavedAt || b.initiatedAt || 0
          ).getTime();
          return dateB - dateA;
        });
        setProjects(sorted);
        console.log('Fetched projects:', sorted);

        // If Admin, fetch user details for these projects
        if (role === "admin" && fetchedProjects.length > 0) {
          const uniqueUserIds = Array.from(
            new Set(fetchedProjects.map((p) => p.userId).filter(Boolean))
          );
          if (uniqueUserIds.length > 0) {
            try {
              const profiles = await projectRequestService.getUserProfiles(
                uniqueUserIds
              );
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

  if (!loading && !isAuthenticated) {
    router.push("/");
    return null;
  }

  if (loading || isLoadingData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />
          <p className="text-zinc-500 text-sm">Loading your projects...</p>
        </div>
      </div>
    );
  }

  // Filter Logic
  const draftProjects = projects.filter((p) => p.isDraft);
  const publishedProjects = projects.filter((p) => !p.isDraft);

  const displayProjects =
    activeTab === "all" ? publishedProjects : draftProjects;

  const filteredProjects = displayProjects.filter((project) => {
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUser =
      selectedUserFilter === "all" || project.userId === selectedUserFilter;

    return matchesSearch && matchesUser;
  });

  // Get unique authors for filter dropdown
  const authors = Array.from(new Set(displayProjects.map((p) => p.userId))).map(
    (uid) => ({
      id: uid,
      name: userMap[uid]?.name || "Unknown User",
    })
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272a] text-[#71717a] hover:text-white hover:border-[#3f3f46] transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-white flex items-center gap-2">
                  {role === "admin" ? (
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
                  {role === "admin"
                    ? "Overview of all platform activity and projects"
                    : "Track your published projects and drafts"}
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
                className={`relative pb-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === "all"
                    ? "text-white"
                    : "text-[#71717a] hover:text-white"
                }`}
              >
                Published
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    activeTab === "all"
                      ? "bg-[#27272a] text-[#a1a1aa]"
                      : "bg-[#1a1a1a] text-[#52525b]"
                  }`}
                >
                  {publishedProjects.length}
                </span>
                {activeTab === "all" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab("drafts")}
                className={`relative pb-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === "drafts"
                    ? "text-white"
                    : "text-[#71717a] hover:text-white"
                }`}
              >
                Drafts
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    activeTab === "drafts"
                      ? "bg-[#27272a] text-[#a1a1aa]"
                      : "bg-[#1a1a1a] text-[#52525b]"
                  }`}
                >
                  {draftProjects.length}
                </span>
                {activeTab === "drafts" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                  />
                )}
              </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 pb-2 md:pb-0">
              {role === "admin" && (
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#52525b]" />
                  <select
                    value={selectedUserFilter}
                    onChange={(e) => setSelectedUserFilter(e.target.value)}
                    className="appearance-none w-full md:w-48 rounded-lg bg-[#18181b] border border-[#27272a] pl-9 pr-8 py-2 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#3f3f46] transition-colors"
                  >
                    <option value="all">All Users</option>
                    {authors.map((author) => (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#52525b]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full md:w-56 rounded-lg bg-[#18181b] border border-[#27272a] pl-9 pr-4 py-2 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#3f3f46] transition-colors"
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
              {searchQuery
                ? "No matching projects found"
                : activeTab === "all"
                ? "No published projects yet"
                : "No drafts saved"}
            </h2>
            <p className="text-[#71717a] text-center max-w-sm mb-6 text-sm">
              {activeTab === "all"
                ? "Start your journey by launching your first project."
                : "You haven't saved any drafts yet."}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project, index) => {
              // Map generic status to dashboard status
              let status: ProjectStatus = project.isDraft
                ? "pending"
                : "active";
              if (project.dynamicStatus) {
                status = project.dynamicStatus as ProjectStatus;
              }

              return (
                <div key={project.id || index} className="group relative">
                  <Link
                    href={
                      project.isDraft
                        ? `/project-request/custom-vision-card?draftId=${project.id}`
                        : `/dashboard/projects/${project.id}`
                    }
                  >
                    <div className="relative z-10">
                      <DashboardProjectCard
                        id={project.id || ""}
                        title={project.projectName}
                        description={project.description}
                        lastUpdated={project.isDraft ? "Draft" : "Published"}
                        status={status}
                        category={project.category}
                        gradientIndex={index}
                        clientName={
                          role === "admin"
                            ? userMap[project.userId]?.name ||
                              project.userName ||
                              project.userEmail ||
                              "User"
                            : project.isDraft
                            ? "Draft"
                            : "You"
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
                          if (
                            confirm(
                              "Are you sure you want to delete this draft?"
                            )
                          ) {
                            const handleDelete = async () => {
                              try {
                                await projectRequestService.deleteProject(
                                  project.id || ""
                                );
                                setProjects((prev) =>
                                  prev.filter((p) => p.id !== project.id)
                                );
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
