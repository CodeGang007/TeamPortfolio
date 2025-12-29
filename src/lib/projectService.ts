import { db, auth } from './firebase'; // Ensure db and auth are exported from firebase.ts
import { collection, query, where, getDocs } from 'firebase/firestore';

// Firebase Realtime Database service for project requests
const FIREBASE_DB_URL = 'https://codegang-v2-default-rtdb.firebaseio.com';

// Helper to get auth token
const getAuthToken = async () => {
    return auth.currentUser ? await auth.currentUser.getIdToken() : null;
};

// Note: Make sure your Firebase Realtime Database rules allow writes:
// {
//   "rules": {
//     ".read": "auth != null",
//     ".write": "auth != null"
//   }
// }

export interface ProjectRequest {
  id?: string;
  projectName: string;
  description: string;
  category: string;
  subCategories: string[];
  deliveryTime: string;
  budget: string;
  currency: string;
  additionalNotes: string;
  projectLinks: {
    github: string;
    figma: string;
    website: string;
    documentation: string;
    other: string;
  };
  projectType: string;
  communicationPreference: string;
  priority: string;
  isDraft: boolean;
  draftSavedAt?: string;
  initiatedAt?: string;
  collectedAt?: string | null;
  inProgressAt?: string | null;
  inTransactionAt?: string | null;
  completedAt?: string | null;
  assignedTo: string[] | null;
  userId: string;
  userName?: string; // Added
  userEmail?: string; // Added
  imageUrls: string[];
  attachmentUrls: Array<{
    name: string;
    url: string;
    type: string;
    size: string;
  }>;
}

export interface TeamMember {
    uid: string;
    name: string;
    email: string;
    role: string;
    photoURL?: string;
}

export interface Milestone {
    id: string;
    title: string;
    date: string;
    status: "completed" | "current" | "upcoming";
    description?: string;
    icon: string;
}

export interface ProjectProgress {
    projectId: string;
    status: "active" | "completed" | "on-hold" | "pending";
    progress: number;
    hoursSpent: number;
    tasksCompleted: number;
    tasksTotal: number;
    startDate: string;
    dueDate: string;
    endDate?: string; // Added to fix lint
    liveUrl?: string;
    milestones: Milestone[];
    teamSize?: number;
    assignedDevelopers?: TeamMember[]; // Added
}

export const projectRequestService = {
  // Create a new project request
  async createProject(projectData: Omit<ProjectRequest, 'id'>): Promise<string> {
    try {
      const token = await getAuthToken();
      const url = `${FIREBASE_DB_URL}/project_requests.json` + (token ? `?auth=${token}` : '');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to create project request');
      }

      const result = await response.json();
      return result.name; // Firebase returns the generated key as 'name'
    } catch (error) {
      console.error('Error creating project request:', error);
      throw error;
    }
  },

  // Save draft
  async saveDraft(projectData: Omit<ProjectRequest, 'id'>): Promise<string> {
    return this.createProject({
      ...projectData,
      isDraft: true,
      draftSavedAt: new Date().toISOString(),
    });
  },

  // Publish project (convert draft to published)
  async publishProject(projectData: Omit<ProjectRequest, 'id'>): Promise<string> {
    return this.createProject({
      ...projectData,
      isDraft: false,
      initiatedAt: new Date().toISOString(),
      collectedAt: null,
      inProgressAt: null,
      inTransactionAt: null,
      completedAt: null,
      assignedTo: null,
      priority: "medium",
      // Hardcoded images and attachments for now
      imageUrls: [
        "https://example.com/project-image-1.jpg",
        "https://example.com/project-image-2.jpg"
      ],
      attachmentUrls: [
        {
          name: "requirements.pdf",
          url: "https://example.com/requirements.pdf",
          type: "application/pdf",
          size: "2.5 MB"
        },
        {
          name: "project-brief.docx",
          url: "https://example.com/project-brief.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: "1.2 MB"
        }
      ]
    });
  },

  // Update existing project
  async updateProject(id: string, projectData: Partial<ProjectRequest>): Promise<void> {
    try {
      const token = await getAuthToken();
      const url = `${FIREBASE_DB_URL}/project_requests/${id}.json` + (token ? `?auth=${token}` : '');

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to update project request');
      }
    } catch (error) {
      console.error('Error updating project request:', error);
      throw error;
    }
  },

  // Delete project
  async deleteProject(id: string): Promise<void> {
    try {
      const token = await getAuthToken();
      const url = `${FIREBASE_DB_URL}/project_requests/${id}.json` + (token ? `?auth=${token}` : '');

      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project request');
      }
    } catch (error) {
      console.error('Error deleting project request:', error);
      throw error;
    }
  },

  // Get all project requests (Admin use mostly)
  async getAllProjects(): Promise<ProjectRequest[]> {
    try {
      const token = await getAuthToken();
      const url = `${FIREBASE_DB_URL}/project_requests.json` + (token ? `?auth=${token}` : '');
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch project requests');
      }

      const data = await response.json();
      
      if (!data) return [];

      return Object.entries(data).map(([id, project]) => ({
        id,
        ...(project as Omit<ProjectRequest, 'id'>)
      }));
    } catch (error) {
      console.error('Error fetching project requests:', error);
      throw error;
    }
  },

  // Get projects by User ID
  async getProjectsByUserId(userId: string): Promise<ProjectRequest[]> {
    try {
        // Note: For efficient filtering in real apps, use Firebase queries. 
        // Here we fetch all and filter client-side for simplicity with REST API.
        const allProjects = await this.getAllProjects();
        return allProjects.filter(p => p.userId === userId);
    } catch (error) {
        console.error('Error fetching user projects:', error);
        throw error;
    }
  },

  // Get project by ID
  async getProjectById(id: string): Promise<ProjectRequest | null> {
    try {
      const token = await getAuthToken();
      const url = `${FIREBASE_DB_URL}/project_requests/${id}.json` + (token ? `?auth=${token}` : '');
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`Failed to fetch project request. Status: ${response.status} ${response.statusText}`, { url });
        throw new Error(`Failed to fetch project request: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data) return null;

      return { id, ...data };
    } catch (error) {
      console.error('Error fetching project request:', error);
      throw error;
    }
  },

  // Update project status
  async updateProjectStatus(id: string, statusField: string, timestamp: string): Promise<void> {
    try {
      const token = await getAuthToken();
      const url = `${FIREBASE_DB_URL}/project_requests/${id}.json` + (token ? `?auth=${token}` : '');

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [statusField]: timestamp,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update project status');
      }
    } catch (error) {
      console.error('Error updating project status:', error);
      throw error;
    }
  },

  // Get project progress
  async getProjectProgress(projectId: string): Promise<ProjectProgress | null> {
    try {
      const token = await getAuthToken();
      const url = `${FIREBASE_DB_URL}/project_progress/${projectId}.json` + (token ? `?auth=${token}` : '');
      const response = await fetch(url);
      if (!response.ok) return null;
      const data = await response.json();
      return data ? { projectId, ...data } : null;
    } catch (error) {
      console.error('Error fetching project progress:', error);
      return null;
    }
  },

  // Update project progress
  async updateProjectProgress(projectId: string, data: Partial<ProjectProgress>): Promise<void> {
    try {
      const token = await getAuthToken();
      const url = `${FIREBASE_DB_URL}/project_progress/${projectId}.json` + (token ? `?auth=${token}` : '');

      await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error updating project progress:', error);
      throw error;
    }
  },

  // Initialize progress for a new project
  async initializeProjectProgress(projectId: string): Promise<void> {
      const defaultProgress: Omit<ProjectProgress, 'projectId'> = {
          status: 'pending',
          progress: 0,
          hoursSpent: 0,
          tasksCompleted: 0,
          tasksTotal: 0,
          startDate: new Date().toISOString().split('T')[0],
          dueDate: '',
          endDate: '',
          milestones: [],
          teamSize: 0,
          assignedDevelopers: []
      };
      await this.updateProjectProgress(projectId, defaultProgress);
  },

  // Get all developers (candidates for assignment)
  async getDevelopers(): Promise<TeamMember[]> {
      try {
          const q = query(collection(db, "users"), where("role", "==", "developer"));
          const querySnapshot = await getDocs(q);
          const developers: TeamMember[] = [];
          
          querySnapshot.forEach((doc) => {
              const data = doc.data();
              developers.push({
                  uid: doc.id,
                  name: data.display_name || data.displayName || "Unknown Developer",
                  email: data.email,
                  role: "developer",
                  photoURL: data.photo_url || data.photoURL
              });
          });
          
          return developers;
      } catch (error) {
          console.error("Error fetching developers:", error);
          return [];
      }
  },

  // Get basic user profiles for a list of UIDs (to display names in admin dashboard)
  async getUserProfiles(userIds: string[]): Promise<Record<string, { name: string; email: string }>> {
      if (!userIds.length) return {};
      
      try {
          const q = query(collection(db, "users"));
          const querySnapshot = await getDocs(q);
          
          const userMap: Record<string, { name: string; email: string }> = {};
          querySnapshot.forEach((doc) => {
              if (userIds.includes(doc.id)) {
                  const data = doc.data();
                  // Try various common field names for name
                  const name = data.display_name || 
                               data.displayName || 
                               data.name || 
                               data.fullName ||
                               data.profile?.displayName || 
                               data.profile?.name || 
                               ""; // Leave empty if not found, to allow fallback in UI

                  const email = data.email || data.profile?.email || "";

                  userMap[doc.id] = {
                      name: name || email || "Unknown User", // Fallback to email if name missing
                      email: email
                  };
              }
          });
          
          return userMap;
      } catch (error) {
          console.error("Error fetching user profiles:", error);
          return {};
      }
  }
};