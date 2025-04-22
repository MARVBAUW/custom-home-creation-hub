
import React from "react";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";
import { InternalLinkText } from "@/utils/internalLinking";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    location: string;
    category: string;
    description: string;
    image: string;
    slug: string;
  };
}

const ProjectCard: React.FC<{ project: ProjectCardProps["project"] }> = ({ project }) => {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-transform duration-300 hover:shadow-md hover:-translate-y-1"
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={project.image}
          alt={`Projet ${project.title} à ${project.location}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">{project.location}</span>
          <span className="px-3 py-1 bg-khaki-100 text-khaki-800 text-xs rounded-full">
            {project.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4">
          <InternalLinkText text={project.description} maxOccurrences={1} />
        </p>
        <Link to={`/realisations-architecte-maison/${project.slug}`}>
          <Button variant="outline" className="w-full justify-center">
            Voir le projet
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
