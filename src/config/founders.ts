import { TeamMember } from "@/components/teampage/types";

export const foundersData: TeamMember[] = [
    {
        id: "founder-1",
        name: "Sushant Choudhary",
        role: "Founder",
        imageUrl: "/team/sushant.jpg", // Placeholder - User to update
        description: "Visionary leader driving the strategic direction and technological innovation of the company.",
        active: true,
        order: 1,
        rating: 5,
        techStack: ["Leadership", "Strategy"],
        projectUrl: "https://portfolio.com",
        socials: {
            linkedin: "https://linkedin.com/in/sushant",
            github: "https://github.com/sushant",
            instagram: "https://instagram.com/sushant",
        },
        experienceLevel: "Lead",
        availability: "Full-time"
    },
    {
        id: "founder-2",
        name: "Gourav Chakraborty",
        role: "Founder",
        imageUrl: "/team/gourav.jpg", // Placeholder
        description: "Technical architect overseeing the development of scalable and robust software solutions.",
        active: true,
        order: 2,
        rating: 5,
        techStack: ["Full Stack", "System Design"],
        projectUrl: "",
        socials: {
            linkedin: "https://linkedin.com/in/gourav",
            github: "https://github.com/gourav",
            instagram: "https://instagram.com/gourav",
        },
        experienceLevel: "Lead",
        availability: "Full-time"
    },
    {
        id: "founder-3",
        name: "Sunny Srivastava",
        role: "Founder",
        imageUrl: "/team/sunny.jpg", // Placeholder
        description: "Orchestrating operational excellence and ensuring seamless project delivery.",
        active: true,
        order: 3,
        rating: 5,
        techStack: ["Operations", "Management"],
        projectUrl: "",
        socials: {
            linkedin: "https://linkedin.com/in/sunny",
            github: "https://github.com/sunny",
            instagram: "https://instagram.com/sunny",
        },
        experienceLevel: "Lead",
        availability: "Full-time"
    },
    {
        id: "founder-4",
        name: "Subhadip Sasmal",
        role: "Founder",
        imageUrl: "/team/subhadip.jpg", // Placeholder
        description: "Crafting intuitive user experiences and defining the visual identity of our products.",
        active: true,
        order: 4,
        rating: 5,
        techStack: ["UI/UX", "Design"],
        projectUrl: "",
        socials: {
            linkedin: "https://linkedin.com/in/subhadip",
            github: "https://github.com/subhadip",
            instagram: "https://instagram.com/subhadip",
        },
        experienceLevel: "Lead",
        availability: "Full-time"
    }
];
