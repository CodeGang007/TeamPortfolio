"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectFilter } from "./ProjectFilter";
import ProjectRow from "@/components/projectPage/ProjectRow";
import ProjectCard from "@/components/projectPage/Cards/ProjectCards";
import { useAuth } from "@/contexts/AuthContext";
import { Plus } from "lucide-react";
import { AddProjectModal } from "./AddProjectModal";
import { ProjectService } from "@/services/projects";
import { PORTFOLIO_PROJECTS } from "@/data/portfolioProjects";

import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

// Community / admin-added projects fetched from Firestore (lighter shape).
interface CommunityProject {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  link?: string;
  active?: boolean;
  order?: number;
}

export function ProjectsSection() {
  const { isAuthenticated, role } = useAuth();
  const isOnline = isAuthenticated;
  const isAdmin = role === 'admin';

  const [activeCategory, setActiveCategory] = useState("All");
  const [community, setCommunity] = useState<CommunityProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const portfolioProjects = [...PORTFOLIO_PROJECTS].sort((a, b) => a.order - b.order);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      let firestoreList: CommunityProject[] = [];
      try {
        const projectsCol = collection(db, "projects");
        let snapshot;
        try {
          const q = query(
            projectsCol,
            where("active", "==", true),
            orderBy("order", "asc")
          );
          snapshot = await getDocs(q);
        } catch {
          snapshot = await getDocs(projectsCol);
        }
        firestoreList = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "",
            description: data.description || "",
            category: data.category || "Uncategorized",
            image: data.image || undefined,
            link: data.link || undefined,
            active: data.active !== false,
            order: (data.order || 999) + 100,
          };
        }).filter(p => p.active === true && p.title !== "");
      } catch (firestoreError) {
        console.warn("Firestore fetch failed, showing portfolio projects only.", firestoreError);
      }

      setCommunity(firestoreList);

      const categories = Array.from(
        new Set([
          ...portfolioProjects.map(p => p.category),
          ...firestoreList.map(p => p.category),
        ])
      ).filter(Boolean);
      setAvailableCategories(categories);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredPortfolio =
    activeCategory === "All"
      ? portfolioProjects
      : portfolioProjects.filter(p => p.category === activeCategory);

  const filteredCommunity =
    activeCategory === "All"
      ? community
      : community.filter(p => p.category === activeCategory);

  const handleDelete = async (projectId: string) => {
    try {
      await ProjectService.deleteProject(projectId);
      setCommunity(prev => prev.filter(p => p.id !== projectId));
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project. Please try again.");
    }
  };

  return (
    <div className="w-full relative">
      {/* Admin Add Project Button */}
      {isAdmin && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className={`fixed bottom-8 right-8 z-40 p-4 rounded-full shadow-2xl transition-all ${
            isOnline
              ? 'bg-brand-green hover:bg-brand-green/90 text-black'
              : 'bg-red-500 hover:bg-red-500/90 text-white'
          }`}
          style={{
            boxShadow: isOnline
              ? '0 0 30px rgba(0, 255, 100, 0.5)'
              : '0 0 30px rgba(239, 68, 68, 0.5)'
          }}
        >
          <Plus className="h-6 w-6" />
        </motion.button>
      )}

      <AddProjectModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={fetchProjects}
        isOnline={isOnline}
      />

      {/* Filters */}
      <ProjectFilter
        active={activeCategory}
        onChange={setActiveCategory}
        isOnline={isOnline}
        categories={availableCategories}
      />

      {/* Portfolio case studies — full-width stacked rows */}
      {filteredPortfolio.length > 0 && (
        <div className="flex flex-col gap-20 md:gap-28 mt-12">
          {filteredPortfolio.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isOnline={isOnline}
              priority={index === 0}
            />
          ))}
        </div>
      )}

      {/* Community / admin-added projects */}
      {loading && (
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-green mx-auto"></div>
          <p className="mt-4 text-white/50">Loading projects...</p>
        </div>
      )}

      {!loading && filteredCommunity.length > 0 && (
        <div className="mt-28">
          <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500 mb-8">
            More from the community
          </h3>
          <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredCommunity.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    category={project.category}
                    image={project.image}
                    link={project.link}
                    isOnline={isOnline}
                    isAdmin={isAdmin}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredPortfolio.length === 0 && filteredCommunity.length === 0 && (
        <div className={`py-20 text-center ${isOnline ? 'text-white/50' : 'text-red-400/50'}`}>
          <p>No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
