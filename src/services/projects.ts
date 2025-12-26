import { db } from "@/lib/firebase";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";

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
    }
};
