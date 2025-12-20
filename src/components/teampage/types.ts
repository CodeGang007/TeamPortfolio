export interface SocialLink {
  platform: "github" | "linkedin" | "twitter" | "portfolio" | "instagram";
  url: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;

  rating: number; // 0–5 (supports half-stars if your StarRating allows)

  description: string;

  techStack: string[]; // e.g. ["React", "Next.js", "Tailwind", "FastAPI"]

  socials: SocialLink[];

  projectUrl: string;
}
