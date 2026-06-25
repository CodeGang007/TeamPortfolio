"use client";

import ProjectRow from "@/components/projectPage/ProjectRow";
import { PORTFOLIO_PROJECTS } from "@/data/portfolioProjects";
import { useAuth } from "@/contexts/AuthContext";

export default function CreativeProjects() {
    const { isAuthenticated } = useAuth();
    const isOnline = isAuthenticated;

    const projects = [...PORTFOLIO_PROJECTS].sort((a, b) => a.order - b.order);

    return (
        <div className="flex flex-col gap-20 md:gap-28">
            {projects.map((project, index) => (
                <ProjectRow
                    key={project.id}
                    project={project}
                    index={index}
                    isOnline={isOnline}
                    priority={index === 0}
                />
            ))}
        </div>
    );
}
