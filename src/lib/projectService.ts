// Firebase Realtime Database service for project requests
const FIREBASE_DB_URL = 'https://codegang-v2-default-rtdb.firebaseio.com';

// Note: Make sure your Firebase Realtime Database rules allow writes:
// {
//   "rules": {
//     ".read": true,
//     ".write": true
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
  userId: string; // Added userId
  imageUrls: string[];
  attachmentUrls: Array<{
    name: string;
    url: string;
    type: string;
    size: string;
  }>;
}

export const projectRequestService = {
  // Create a new project request
  async createProject(projectData: Omit<ProjectRequest, 'id'>): Promise<string> {
    try {
      const response = await fetch(`${FIREBASE_DB_URL}/project_requests.json`, {
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
      const response = await fetch(`${FIREBASE_DB_URL}/project_requests/${id}.json`, {
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
      const response = await fetch(`${FIREBASE_DB_URL}/project_requests/${id}.json`, {
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
      const response = await fetch(`${FIREBASE_DB_URL}/project_requests.json`);
      
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
      const response = await fetch(`${FIREBASE_DB_URL}/project_requests/${id}.json`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch project request');
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
      const response = await fetch(`${FIREBASE_DB_URL}/project_requests/${id}.json`, {
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
  }
};