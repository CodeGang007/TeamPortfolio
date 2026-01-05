"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TeamFilter } from "./TeamFilter";
import { TeamMemberCard } from "./TeamMemberCard";
import { DeveloperDetailsModal } from "./DeveloperDetailsModal";
import { TeamMember } from "./types";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { developerService } from "@/lib/developerService";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  QuerySnapshot,
  DocumentData
} from "firebase/firestore";

import { useSearchParams } from "next/navigation";


export function TeamSection() {
  const { isAuthenticated, triggerAuth, role } = useAuth();
  const isOnline = isAuthenticated;

  const [activeCategory, setActiveCategory] = useState("All");
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugLog, setDebugLog] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Admin functions
  const toggleMemberStatus = async (memberId: string, currentStatus: boolean) => {
    try {
      await developerService.updateDeveloper(memberId, { active: !currentStatus });
      setMembers(prev => prev.map(member =>
        member.id === memberId ? { ...member, active: !currentStatus } : member
      ));
    } catch (error) {
      console.error('Failed to update member status:', error);
      alert('Failed to update member status');
    }
  };

  const deleteMember = async (memberId: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      try {
        await developerService.deleteDeveloper(memberId);
        setMembers(prev => prev.filter(member => member.id !== memberId));
      } catch (error) {
        console.error('Failed to delete member:', error);
        alert('Failed to delete member');
      }
    }
  };

  // --- 1. FETCH DATA (Runs once on load) ---
  const fetchTeam = async () => {
    setLoading(true);
    try {
      const teamCollection = collection(db, "team");

      // Try with Index first
      // Query without orderBy to avoid index requirement
      const q = query(teamCollection, where("active", "==", true));
      const snapshot = await getDocs(q);
      handleSnapshot(snapshot);

    } catch (error: unknown) {
      console.error("Fetch error:", error);
      setDebugLog("Error fetching: " + (error instanceof Error ? error.message : 'Unknown error'));
      setLoading(false);
    }
  };

  const handleSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
    if (snapshot.empty) {
      setDebugLog("Connected, but database is empty. Click 'Repair Database' below.");
      setMembers([]);
    } else {
      const fetchedMembers = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "Unknown",
          role: data.role || "Developer",
          imageUrl: data.imageUrl || "/team/default.jpg",
          rating: data.rating || 5,
          description: data.description || "No description.",
          techStack: data.techStack || [],
          projectUrl: data.projectUrl || "#",
          socials: data.socials || {},
          active: data.active !== false,
          // New Fields
          experienceLevel: data.experienceLevel,
          hourlyRate: data.hourlyRate,
          languages: data.languages,
          availability: data.availability,
          email: data.email,
          phone: data.phone,
          projects: data.projects || [], // Map projects
          order: data.order // Ensure order is captured
        } as TeamMember;
      }).sort((a, b) => (a.order || 0) - (b.order || 0)); // Sort client-side

      // Filter out inactive members for non-admin users
      const visibleMembers = isOnline && role === 'admin'
        ? fetchedMembers
        : fetchedMembers.filter((member: TeamMember) => member.active);

      setMembers(visibleMembers);
      setDebugLog(""); // Clear errors if successful
    }
    setLoading(false);
  };

  const searchParams = useSearchParams();
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTeam = async () => {
      if (!isMounted) return;

      setLoading(true);
      try {
        const teamCollection = collection(db, "team");

        // Try with Index first
        // Query without orderBy to avoid index requirement
        try {
          const q = query(teamCollection, where("active", "==", true));
          const snapshot = await getDocs(q);
          if (isMounted) handleSnapshot(snapshot);
        } catch (idxError) {
          console.warn("Query failed:", idxError);
        }

      } catch (error: unknown) {
        if (isMounted) {
          console.error("Fetch error:", error);
          setDebugLog("Error fetching: " + (error instanceof Error ? error.message : 'Unknown error'));
          setLoading(false);
        }
      }
    };

    loadTeam();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Scroll to Member from URL
  useEffect(() => {
    const memberId = searchParams.get("id");
    if (memberId && !loading && members.length > 0) {
      // Find member by ID
      const targetElement = document.getElementById(`member-${memberId}`);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedId(memberId);
          // Remove highlight after animation
          setTimeout(() => setHighlightedId(null), 3000);
        }, 500); // Slight delay for render/animation
      }
    }
  }, [searchParams, loading, members]);


  const filteredMembers = activeCategory === "All"
    ? members
    : members.filter((member) =>
      member.role.toLowerCase().includes(activeCategory.toLowerCase())
    );

  const handleInteraction = (action: () => void) => {
    if (!isOnline) {
      triggerAuth();
    } else {
      action();
    }
  };

  return (
    <div className="w-full">
      {/* DEBUG / REPAIR SECTION */}
      {members.length === 0 && !loading && (
        <div className={`mb-8 p-6 border rounded-xl text-center ${isOnline ? 'bg-slate-50 border-slate-200' : 'bg-red-500/10 border-red-500/30'}`}>
          <h3 className={`text-lg font-bold mb-2 ${isOnline ? 'text-slate-700' : 'text-red-300'}`}>Database Setup Needed</h3>
          <p className={`mb-4 ${isOnline ? 'text-slate-500' : 'text-red-400/70'}`}>{debugLog || "No team members found in the database."}</p>
        </div>
      )}

      {/* FILTER & GRID */}
      {members.length > 0 && (
        <>
          <TeamFilter
            active={activeCategory}
            onChange={setActiveCategory}
            isOnline={isOnline}
          />

          <motion.div layout className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 mt-8">
            <AnimatePresence mode="popLayout">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id || index}
                  id={`member-${member.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`relative group rounded-xl transition-all duration-500 ${highlightedId === member.id ? 'ring-2 ring-brand-green ring-offset-4 ring-offset-black scale-105 z-10' : ''}`}
                >
                  <TeamMemberCard
                    member={member}
                    isOnline={isOnline}
                    onClick={() => setSelectedMember(member)}
                  />

                  {/* Admin Controls */}
                  {isOnline && role === 'admin' && (
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={() => toggleMemberStatus(member.id!, member.active)}
                        className={`p-2 rounded-lg backdrop-blur-md transition-all shadow-lg ${member.active
                          ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500 hover:text-white'
                          : 'bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500 hover:text-white'
                          }`}
                        title={member.active ? 'Deactivate' : 'Activate'}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 transition-colors ${member.active ? 'bg-yellow-400 border-yellow-400' : 'border-current'
                          }`} />
                      </button>

                      <button
                        onClick={() => deleteMember(member.id!)}
                        className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white backdrop-blur-md transition-all shadow-lg"
                        title="Delete Member"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Inactive Overlay for Admin */}
                  {!member.active && isOnline && role === 'admin' && (
                    <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-semibold bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">
                        Inactive
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {/* LOADING SPINNER */}
      {loading && (
        <div className="py-20 text-center">
          <div className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-transparent ${isOnline ? 'border-teal-500' : 'border-red-500'}`}></div>
          <p className={`mt-4 ${isOnline ? 'text-slate-400' : 'text-red-400/50'}`}>
            {isOnline ? 'Loading team...' : 'System Offline. Connecting...'}
          </p>
        </div>
      )}

      <DeveloperDetailsModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}