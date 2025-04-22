
import React from "react";
import ProjectCard from "./ProjectCard";
import Container from "@/components/common/Container";

interface ProjectsGalleryProps {
  projects: {
    id: number;
    title: string;
    location: string;
    category: string;
    description: string;
    image: string;
    slug: string;
  }[];
}

const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ projects }) => (
  <section className="py-16">
    <Container>
      <h2 className="text-3xl font-semibold mb-10 text-center">Nos derniers projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Container>
  </section>
);

export default ProjectsGallery;
