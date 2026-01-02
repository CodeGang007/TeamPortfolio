import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, getDoc, setDoc, doc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';

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
    // New Detailed Fields
    experienceLevel?: 'Junior' | 'Mid' | 'Senior' | 'Lead';
    hourlyRate?: string;
    languages?: string[]; // Spoken languages
    availability?: 'Full-time' | 'Part-time' | 'Freelance' | 'Unavailable';
    email: string;
    phone: string;
    socials: {
        github: string;
        linkedin: string;
        instagram: string;
        twitter?: string; // Added Twitter
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
    async getDeveloperById(id: string): Promise<Developer | null> {
        try {
            const docRef = doc(db, this.collectionName, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    ...docSnap.data()
                } as Developer;
            }
            return null;
        } catch (error) {
            console.error('Error fetching developer:', error);
            return null;
        }
    }
    async createOrUpdateDeveloper(id: string, data: Partial<Developer>): Promise<void> {
        try {
            const timestamp = new Date().toISOString();
            const docRef = doc(db, this.collectionName, id);

            // Check if exists
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                await updateDoc(docRef, {
                    ...data,
                    updatedAt: timestamp
                });
            } else {
                // Set default values for new developer
                await setDoc(docRef, {
                    id: id,
                    name: data.name || 'Unnamed Developer',
                    role: data.role || 'Developer',
                    description: data.description || '',
                    imageUrl: data.imageUrl || '',
                    projectUrl: data.projectUrl || '',
                    rating: data.rating || 5, // Default rating
                    order: data.order || 99,
                    active: data.active !== undefined ? data.active : true, // Active by default if created
                    techStack: data.techStack || [],

                    // New Fields Defaults
                    experienceLevel: data.experienceLevel || 'Junior',
                    hourlyRate: data.hourlyRate || '',
                    languages: data.languages || [],
                    availability: data.availability || 'Freelance',

                    email: data.email || '',
                    phone: data.phone || '',
                    socials: data.socials || {
                        github: '',
                        linkedin: '',
                        instagram: '',
                        twitter: ''
                    },
                    createdAt: timestamp,
                    updatedAt: timestamp
                });
            }
        } catch (error) {
            console.error('Error creating/updating developer:', error);
            throw error;
        }
    }
}

export const developerService = new DeveloperService();