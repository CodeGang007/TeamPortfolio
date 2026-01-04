import { db, auth } from './firebase'; // Ensure db and auth are exported from firebase.ts
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { telegramService } from './telegramService';

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
  workflowStatus?: {
    initiatedAt: string;
    collectedAt: string;
    inProgressAt: string;
    inTransactionAt: string;
    completedAt: string;
  };
  // Legacy fields for backward compatibility
  initiatedAt?: string;
  collectedAt?: string | null;
  inProgressAt?: string | null;
  inTransactionAt?: string | null;
  completedAt?: string | null;
  assignedTo: string[] | null;
  userId: string;
  userName?: string;
  userEmail?: string;
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
    status: "active" | "completed" | "on-hold" | "pending" | "pending-closure" | "closed";
    progress: number;
    hoursSpent: number;
    tasksCompleted: number;
    tasksTotal: number;
    startDate: string;
    dueDate: string;
    endDate?: string; // Added to fix lint
    deletionScheduledAt?: string; // For closed projects
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



// ... inside projectRequestService ...

  // Publish project (convert draft to published)
  async publishProject(projectData: Omit<ProjectRequest, 'id'>): Promise<string> {
    const projectId = await this.createProject({
      ...projectData,
      isDraft: false,
      workflowStatus: {
        initiatedAt: new Date().toISOString(),
        collectedAt: "",
        inProgressAt: "",
        inTransactionAt: "",
        completedAt: ""
      },
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

    // Send Telegram Notification
    try {
        const message = telegramService.formatProjectNotification({
            projectName: projectData.projectName,
            description: projectData.description,
            budget: projectData.budget,
            currency: projectData.currency,
            userName: projectData.userName,
            userEmail: projectData.userEmail,
            projectType: projectData.projectType,
            deliveryTime: projectData.deliveryTime
        });
        await telegramService.sendMessage(message);
    } catch (error) {
        console.error("Failed to send Telegram notification:", error);
        // Don't partially fail the publish operation if notification fails
    }

    return projectId;
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
        console.error('Response not OK:', response.status, response.statusText);
        throw new Error('Failed to fetch project requests');
      }

      const data = await response.json();
      console.log('Raw Firebase data:', data);
      
      if (!data) {
        console.log('No data found in Firebase');
        return [];
      }

      const projects = Object.entries(data).map(([id, project]) => ({
        id,
        ...(project as Omit<ProjectRequest, 'id'>)
      }));
      console.log('Processed projects:', projects);
      return projects;
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
        console.log('Filtering projects for userId:', userId);
        console.log('All projects userIds:', allProjects.map(p => ({ id: p.id, userId: p.userId })));
        const filtered = allProjects.filter(p => p.userId === userId);
        console.log('Filtered projects:', filtered);
        return filtered;
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

  // Get basic user profiles for a list of UIDs
  async getUserProfiles(userIds: string[]): Promise<Record<string, { name: string; email: string }>> {
      if (!userIds.length) return {};
      
      try {
          const userMap: Record<string, { name: string; email: string }> = {};
          
          await Promise.all(userIds.map(async (uid) => {
              try {
                  const docRef = doc(db, "users", uid);
                  const docSnap = await getDoc(docRef);
                  if (docSnap.exists()) {
                      const data = docSnap.data();
                      const name = data.display_name || 
                                   data.displayName || 
                                   data.name || 
                                   data.fullName ||
                                   data.profile?.displayName || 
                                   data.profile?.name || 
                                   "";
                      const email = data.email || data.profile?.email || "";
                      
                      userMap[uid] = {
                          name: name || email || "Unknown User",
                          email: email
                      };
                  }
              } catch (e) {
                  // Ignore errors for individual users to prevent failing the whole batch
                  console.warn(`Failed to fetch profile for ${uid}`, e);
              }
          }));
          
          return userMap;
      } catch (error) {
          console.error("Error fetching user profiles:", error);
          return {};
      }
  },

  // Assign a project to a developer
  async assignProject(projectId: string, developerId: string): Promise<void> {
      try {
          const token = await getAuthToken();
          // Use deterministic key for idempotency
          const assignmentId = `${projectId}_${developerId}`;
          const url = `${FIREBASE_DB_URL}/project_assignments/${assignmentId}.json` + (token ? `?auth=${token}` : '');
        
          const assignmentData = {
              projectId,
              developerId,
              assignedAt: new Date().toISOString()
          };

          const response = await fetch(url, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(assignmentData),
          });

          if (!response.ok) {
              const errorText = await response.text();
              console.error(`Failed to assign project. Status: ${response.status} ${response.statusText}. Response: ${errorText}`);
              throw new Error(`Failed to assign project: ${response.status} ${errorText}`);
          }
      } catch (error) {
          console.error('Error assigning project:', error);
          throw error;
      }
  },

  // Get assigned projects for a developer
  async getAssignedProjects(developerId: string): Promise<ProjectRequest[]> {
      try {
          const token = await getAuthToken();
          // Fetch all assignments first (filtering client-side for simplicity as per existing patterns)
          const url = `${FIREBASE_DB_URL}/project_assignments.json` + (token ? `?auth=${token}` : '');
          const response = await fetch(url);
          
          if (!response.ok) return [];
          const data = await response.json();
          if (!data) return [];

          // Filter for this developer
          const assignmentIds = Object.values(data)
              .filter((a: any) => a.developerId === developerId)
              .map((a: any) => a.projectId);

          if (assignmentIds.length === 0) return [];

          // Fetch the actual projects
          // Ideally we would trigger getProjectById in parallel
          const projectPromises = assignmentIds.map(id => this.getProjectById(id));
          const projects = await Promise.all(projectPromises);

          return projects.filter((p): p is ProjectRequest => p !== null);
      } catch (error) {
          console.error('Error fetching assigned projects:', error);
          return [];
      }
  }
};