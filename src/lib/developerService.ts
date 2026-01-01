import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';

export interface Developer {
    id?: string;
    name: string;
    role: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
    rating: number;
    order: number;
    active: boolean;
    techStack: string[];
    email: string;
    phone: string;
    socials: {
        github: string;
        linkedin: string;
        instagram: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

class DeveloperService {
    private collectionName = 'team';

    async addDeveloper(developerData: Omit<Developer, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        try {
            const timestamp = new Date().toISOString();
            
            const developer: Developer = {
                ...developerData,
                createdAt: timestamp,
                updatedAt: timestamp
            };

            const docRef = await addDoc(collection(db, this.collectionName), developer);
            return docRef.id;
        } catch (error) {
            console.error('Error adding developer:', error);
            throw error;
        }
    }

    async getAllDevelopers(): Promise<Developer[]> {
        try {
            const q = query(collection(db, this.collectionName), orderBy('order', 'asc'));
            const snapshot = await getDocs(q);
            
            const developers: Developer[] = [];
            snapshot.forEach((doc) => {
                developers.push({
                    id: doc.id,
                    ...doc.data()
                } as Developer);
            });
            return developers;
        } catch (error) {
            console.error('Error fetching developers:', error);
            throw error;
        }
    }

    async getActiveDevelopers(): Promise<Developer[]> {
        try {
            const q = query(
                collection(db, this.collectionName), 
                where('active', '==', true), 
                orderBy('order', 'asc')
            );
            const snapshot = await getDocs(q);
            
            const developers: Developer[] = [];
            snapshot.forEach((doc) => {
                developers.push({
                    id: doc.id,
                    ...doc.data()
                } as Developer);
            });
            return developers;
        } catch (error) {
            console.error('Error fetching active developers:', error);
            throw error;
        }
    }

    async updateDeveloper(id: string, updates: Partial<Developer>): Promise<void> {
        try {
            const timestamp = new Date().toISOString();
            await updateDoc(doc(db, this.collectionName, id), {
                ...updates,
                updatedAt: timestamp
            });
        } catch (error) {
            console.error('Error updating developer:', error);
            throw error;
        }
    }

    async deleteDeveloper(id: string): Promise<void> {
        try {
            await deleteDoc(doc(db, this.collectionName, id));
        } catch (error) {
            console.error('Error deleting developer:', error);
            throw error;
        }
    }
}

export const developerService = new DeveloperService();