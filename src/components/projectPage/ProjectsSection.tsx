"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectFilter } from "./ProjectFilter";
import ProjectCard from "@/components/projectPage/Cards/ProjectCards";
import { useAuth } from "@/contexts/AuthContext";

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
}

export function ProjectsSection() {
  const { isAuthenticated, triggerAuth } = useAuth();
  const isOnline = isAuthenticated;

  // STATE: Think of these as variables that React "watches". 
  // If they change, the website updates automatically.
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]); // Starts as an empty list
  const [loading, setLoading] = useState(true);            // Is the data still traveling?

  // FUNCTION: This goes to the internet to get your data
  const fetchProjects = async () => {
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

      // Step D: Clean up the data. 
      let projectList = snapshot.docs.map(doc => ({
        id: doc.id,               
        ...doc.data()             
      })) as any[];

      // Client-side Filter & Sort (in case fallback was used)
      projectList = projectList
        .filter(p => p.active === true)
        .sort((a, b) => (a.order || 99) - (b.order || 99));

      setProjects(projectList);
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

  return (
    <div className="w-full">
      {/* 1. The Filter Buttons */}
      <ProjectFilter
        active={activeCategory}
        onChange={setActiveCategory}
        isOnline={isOnline}
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
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  isOnline={isOnline}
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