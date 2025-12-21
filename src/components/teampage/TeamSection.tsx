"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TeamFilter } from "./TeamFilter";
import { TeamMemberCard } from "./TeamMemberCard";
import { TeamMember } from "./types";
import { db } from "@/lib/firebase"; 
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  addDoc 
} from "firebase/firestore";


export function TeamSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugLog, setDebugLog] = useState<string>("");

  // --- 1. FETCH DATA (Runs once on load) ---
  const fetchTeam = async () => {
    setLoading(true);
    try {
      const teamCollection = collection(db, "team");
      
      // Try with Index first
      try {
        const q = query(teamCollection, where("active", "==", true), orderBy("order", "asc"));
        const snapshot = await getDocs(q);
        handleSnapshot(snapshot);
      } catch (idxError) {
        // If Index fails, fallback to basic fetch
        console.warn("Index query failed, falling back to basic fetch:", idxError);
        const snapshot = await getDocs(teamCollection);
        handleSnapshot(snapshot);
      }

    } catch (error: any) {
      console.error("Fetch error:", error);
      setDebugLog("Error fetching: " + error.message);
      setLoading(false);
    }
  };

  const handleSnapshot = (snapshot: any) => {
    if (snapshot.empty) {
      setDebugLog("Connected, but database is empty. Click 'Repair Database' below.");
      setMembers([]);
    } else {
      const fetchedMembers = snapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          name: data.name || "Unknown",
          role: data.role || "Developer",
          imageUrl: data.imageUrl || "/team/default.jpg",
          rating: data.rating || 5,
          description: data.description || "No description.",
          techStack: data.techStack || [],
          projectUrl: data.projectUrl || "#",
          socials: data.socials || {}
        } as TeamMember;
      });
      setMembers(fetchedMembers);
      setDebugLog(""); // Clear errors if successful
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeam();
  }, []);


  const filteredMembers =
    activeCategory === "All"
      ? members
      : members.filter((member) =>
          member.role.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <div className="w-full">
      {/* DEBUG / REPAIR SECTION */}
      {members.length === 0 && !loading && (
        <div className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <h3 className="text-lg font-bold text-slate-700 mb-2">Database Setup Needed</h3>
          <p className="text-slate-500 mb-4">{debugLog || "No team members found in the database."}</p>
          
        </div>
      )}

      {/* FILTER & GRID */}
      {members.length > 0 && (
        <>
          <TeamFilter active={activeCategory} onChange={setActiveCategory} />
          
          <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <AnimatePresence mode="popLayout">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <TeamMemberCard member={member} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {/* LOADING SPINNER */}
      {loading && (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
          <p className="mt-4 text-slate-400">Loading team...</p>
        </div>
      )}
    </div>
  );
}