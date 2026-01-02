
import { db } from "./firebase";
import { collection, getDocs, query, orderBy, where, doc, getDoc } from "firebase/firestore";

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    customPhotoURL?: string;
    role?: 'client' | 'developer' | 'admin';
    createdAt?: any;
}

export const userService = {
    // Get all users (for admin)
    getAllUsers: async (): Promise<User[]> => {
        try {
            const usersRef = collection(db, "users");
            // Basic query, might want to order by createdAt if available, or just fetch all
            const q = query(usersRef);
            const snapshot = await getDocs(q);

            return snapshot.docs.map(doc => ({
                uid: doc.id,
                ...doc.data()
            } as User));
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
        }
    },

    getUserById: async (uid: string): Promise<User | null> => {
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { uid: docSnap.id, ...docSnap.data() } as User;
            }
            return null;
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    }
};
