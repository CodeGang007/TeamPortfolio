import ProjectRow from "@/components/projectPage/ProjectRow";
import { PORTFOLIO_PROJECTS } from "@/data/portfolioProjects";

export default function CreativeProjects() {
    const projects = [...PORTFOLIO_PROJECTS].sort((a, b) => a.order - b.order);

    return (
        <div className="flex flex-col gap-20 md:gap-28">
            {projects.map((project, index) => (
                <ProjectRow
                    key={project.id}
                    project={project}
                    index={index}
                    priority={index === 0}
                />
            ))}
        </div>
    );
}
