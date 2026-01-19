import { db } from "@/lib/firebase";
import { collection, getDocs, query, limit, orderBy, addDoc, deleteDoc, doc } from "firebase/firestore";

// Structured service for efficient data fetching
export const ProjectService = {
    // Example: optimized query with limit
    getRecentProjects: async (count: number = 6) => {
        try {
            const q = query(
                collection(db, "projects"),
                orderBy("createdAt", "desc"),
                limit(count)
            );
            return await getDocs(q);
        } catch (error) {
            console.error("Error fetching projects:", error);
            throw error;
        }
    },

    // Create a new project
    createProject: async (projectData: any) => {
        try {
            const docRef = await addDoc(collection(db, "projects"), {
                ...projectData,
                active: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            return docRef.id;
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
        }
    },

    // Delete a project
    deleteProject: async (projectId: string) => {
        try {
            await deleteDoc(doc(db, "projects", projectId));
        } catch (error) {
            console.error("Error deleting project:", error);
            throw error;
        }
    },

    // Get a single project by ID
    getProjectById: async (projectId: string) => {
        try {
            const docRef = doc(db, "projects", projectId);
            return await import("firebase/firestore").then(({ getDoc }) => getDoc(docRef));
        } catch (error) {
            console.error("Error fetching project:", error);
            throw error;
        }
    }

};
