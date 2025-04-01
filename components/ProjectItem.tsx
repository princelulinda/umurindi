"use client";

import { projectProposals } from "@/lib/projects"
import { ProjectCard } from "./dashboard/project-card"
import useFeaturesStore from "@/stores/features"
import { useEffect } from "react"


interface Props {
    display: number
}
const ProjectItem = ({
    display
}: Props) => {
    const { projects, isLoading, loadProjects } = useFeaturesStore()

    useEffect(() => {
        loadProjects();
        console.log("PROJECTS", projects);
        
    }, []);

    return (
        <>

            {isLoading ? (
                <p>Chargement des projets...</p>
            ) : projects && projects.length > 0 ? (
                <div className={`grid gap-6 sm:grid-cols-${display} md:grid-cols-3`}>
                    {projects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>

            ) : (
                <p>Aucun projet trouvé.</p>
            )}
        </>

    )
}
export default ProjectItem