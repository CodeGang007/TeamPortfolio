export interface SocialLinks {
  linkedin?: string;
  github?: string;
  instagram?: string;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  imageUrl: string;
  rating: number; // 0–5
  description: string;
  techStack: string[];
  socials: SocialLinks;
  projectUrl: string;
  active: boolean;
  // New Fields for Modal
  experienceLevel?: string;
  hourlyRate?: string;
  languages?: string[];
  availability?: string;
  email?: string;
  phone?: string;
  projects?: {
    title: string;
    description: string;
    githubUrl: string;
  }[];
  order?: number;
}
