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
}
