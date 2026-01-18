import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    query,
    where,
    orderBy,
    Timestamp,
    writeBatch
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Founder {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
    description: string;
    order: number;
    active: boolean;
    techStack: string[];
    projectUrl?: string;
    socials?: {
        linkedin?: string;
        github?: string;
        instagram?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateFounderData {
    name: string;
    role?: string;
    imageUrl: string;
    description: string;
    order?: number;
    active?: boolean;
    techStack?: string[];
    projectUrl?: string;
    socials?: {
        linkedin?: string;
        github?: string;
        instagram?: string;
    };
}

export interface UpdateFounderData extends Partial<CreateFounderData> {}

const COLLECTION_NAME = 'founders';

class FounderService {
    /**
     * Get all founders ordered by order field
     */
    async getAllFounders(): Promise<Founder[]> {
        try {
            const foundersRef = collection(db, COLLECTION_NAME);
            const q = query(foundersRef, orderBy('order', 'asc'));
            const snapshot = await getDocs(q);
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
                updatedAt: doc.data().updatedAt?.toDate() || new Date(),
            })) as Founder[];
        } catch (error) {
            console.error('Error fetching founders:', error);
            throw error;
        }
    }

    /**
     * Get only active founders (for public display)
     */
    async getActiveFounders(): Promise<Founder[]> {
        try {
            const foundersRef = collection(db, COLLECTION_NAME);
            const q = query(
                foundersRef,
                where('active', '==', true),
                orderBy('order', 'asc')
            );
            const snapshot = await getDocs(q);
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
                updatedAt: doc.data().updatedAt?.toDate() || new Date(),
            })) as Founder[];
        } catch (error) {
            console.error('Error fetching active founders:', error);
            throw error;
        }
    }

    /**
     * Get a single founder by ID
     */
    async getFounderById(id: string): Promise<Founder | null> {
        try {
            const founderRef = doc(db, COLLECTION_NAME, id);
            const snapshot = await getDoc(founderRef);
            
            if (!snapshot.exists()) {
                return null;
            }
            
            return {
                id: snapshot.id,
                ...snapshot.data(),
                createdAt: snapshot.data().createdAt?.toDate() || new Date(),
                updatedAt: snapshot.data().updatedAt?.toDate() || new Date(),
            } as Founder;
        } catch (error) {
            console.error('Error fetching founder:', error);
            throw error;
        }
    }

    /**
     * Create a new founder
     */
    async createFounder(data: CreateFounderData): Promise<string> {
        try {
            const foundersRef = collection(db, COLLECTION_NAME);
            const newFounderRef = doc(foundersRef);
            
            // Get the highest order number
            const allFounders = await this.getAllFounders();
            const maxOrder = allFounders.length > 0 
                ? Math.max(...allFounders.map(f => f.order)) 
                : 0;
            
            const founderData = {
                name: data.name,
                role: data.role || 'Founder',
                imageUrl: data.imageUrl,
                description: data.description,
                order: data.order ?? (maxOrder + 1),
                active: data.active ?? true,
                techStack: data.techStack || [],
                projectUrl: data.projectUrl || '',
                socials: data.socials || {},
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            };
            
            await setDoc(newFounderRef, founderData);
            return newFounderRef.id;
        } catch (error) {
            console.error('Error creating founder:', error);
            throw error;
        }
    }

    /**
     * Update an existing founder
     */
    async updateFounder(id: string, data: UpdateFounderData): Promise<void> {
        try {
            const founderRef = doc(db, COLLECTION_NAME, id);
            const updateData: any = {
                ...data,
                updatedAt: Timestamp.now(),
            };
            
            await updateDoc(founderRef, updateData);
        } catch (error) {
            console.error('Error updating founder:', error);
            throw error;
        }
    }

    /**
     * Delete a founder (soft delete by setting active to false)
     */
    async deleteFounder(id: string): Promise<void> {
        try {
            await this.updateFounder(id, { active: false });
        } catch (error) {
            console.error('Error deleting founder:', error);
            throw error;
        }
    }

    /**
     * Reorder founders with drag and drop
     * @param founderIds Array of founder IDs in the new order
     */
    async reorderFounders(founderIds: string[]): Promise<void> {
        try {
            const batch = writeBatch(db);
            
            founderIds.forEach((id, index) => {
                const founderRef = doc(db, COLLECTION_NAME, id);
                batch.update(founderRef, {
                    order: index + 1,
                    updatedAt: Timestamp.now(),
                });
            });
            
            await batch.commit();
        } catch (error) {
            console.error('Error reordering founders:', error);
            throw error;
        }
    }
}

export const founderService = new FounderService();
