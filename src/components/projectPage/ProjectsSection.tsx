"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectFilter } from "./ProjectFilter";
import ProjectCard from "@/components/projectPage/Cards/ProjectCards";
import { useAuth } from "@/contexts/AuthContext";
import { Plus } from "lucide-react";
import { AddProjectModal } from "./AddProjectModal";
import { ProjectService } from "@/services/projects";

// 1. Import the database we configured in src/lib/firebase.ts
import { db } from "@/lib/firebase";

// 2. Import the "tools" we need from the Firebase library
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

// 3. Define what a "Project" looks like so TypeScript doesn't get confused
interface Project {
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
  const { isAuthenticated, triggerAuth, role } = useAuth();
  const isOnline = isAuthenticated;
  const isAdmin = role === 'admin';

  // STATE: Think of these as variables that React "watches". 
  // If they change, the website updates automatically.
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]); // Starts as an empty list
  const [loading, setLoading] = useState(true);            // Is the data still traveling?
  const [showAddModal, setShowAddModal] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  // FUNCTION: This goes to the internet to get your data
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const projectsCol = collection(db, "projects");
      let snapshot;

      // Try OPTIMIZED query (Requires Firestore Index)
      try {
        const q = query(
          projectsCol,
          where("active", "==", true),
          orderBy("order", "asc")
        );
        snapshot = await getDocs(q);
      } catch (indexError: any) {
        console.warn("Index query failed (likely missing index), falling back to basic fetch.", indexError);
        // Fallback: Fetch ALL and filter client-side
        snapshot = await getDocs(projectsCol);
      }

      // Step D: Clean up the data and normalize field names
      let projectList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          description: data.description || "",
          category: data.category || "Uncategorized",
          image: data.image || null,
          link: data.link || null,
          active: data.active !== false,
          order: data.order || 999
        };
      }) as Project[];

      // Client-side Filter & Sort (in case fallback was used)
      projectList = projectList
        .filter(p => p.active === true)
        .sort((a, b) => (a.order || 99) - (b.order || 99));

      setProjects(projectList);

      // Extract unique categories for dynamic filters
      const categories = Array.from(new Set(projectList.map(p => p.category))).filter(Boolean);
      setAvailableCategories(categories);
    } catch (error) {
      console.error("Firebase Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // EFFECT: This tells React "Run the fetchProjects function as soon as the page loads"
  useEffect(() => {
    fetchProjects();
  }, []); // The empty [] means "only run once"

  // FILTER LOGIC: Same as before, but using our new 'projects' state
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleInteraction = (action: () => void) => {
    if (!isOnline) {
      triggerAuth();
    } else {
      action();
    }
  };

  const handleProjectAdded = () => {
    fetchProjects(); // Refresh the list
  };

  const handleDelete = async (projectId: string) => {
    try {
      await ProjectService.deleteProject(projectId);
      // Remove from local state immediately for instant UI feedback
      setProjects(prev => prev.filter(p => p.id !== projectId));
      
      // Also update categories if needed
      const remainingProjects = projects.filter(p => p.id !== projectId);
      const categories = Array.from(new Set(remainingProjects.map(p => p.category))).filter(Boolean);
      setAvailableCategories(categories);
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

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleProjectAdded}
        isOnline={isOnline}
      />

      {/* 1. The Filter Buttons - Now Dynamic */}
      <ProjectFilter
        active={activeCategory}
        onChange={setActiveCategory}
        isOnline={isOnline}
        categories={availableCategories}
      />

      {/* 2. Loading State: Show this while waiting for Firebase */}
      {loading && (
        <div className="py-20 text-center">
          <div className={`animate-spin rounded-full h-10 w-10 border-b-2 mx-auto ${isOnline ? 'border-brand-green' : 'border-red-500'}`}></div>
          <p className={`mt-4 ${isOnline ? 'text-white/50' : 'text-red-400/50'}`}>
            {isOnline ? 'Connecting to Neural Network...' : 'System Offline. Connecting...'}
          </p>
        </div>
      )}

      {/* 3. The Grid: Only show if NOT loading */}
      {!loading && (
        <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id} // Use the unique ID from Firebase
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
      )}

      {/* 4. Empty State */}
      {!loading && filteredProjects.length === 0 && (
        <div className={`py-20 text-center ${isOnline ? 'text-white/50' : 'text-red-400/50'}`}>
          <p>No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}