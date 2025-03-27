
import React from 'react';
import ProjectsList from './ProjectsList';
import EmptyProjectsState from './EmptyProjectsState';
import AvailableProjectsList from './AvailableProjectsList';

interface ProjectsTabContentProps {
  client: { 
    projects: any[]; 
    hasProjects: boolean;
  };
  availableProjects: Array<{
    id: string;
    title: string;
    type: string;
    location: string;
    status: string;
  }>;
}

const ProjectsTabContent: React.FC<ProjectsTabContentProps> = ({ client, availableProjects }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Projets associés</h3>
        {client.projects && client.projects.length > 0 ? (
          <ProjectsList projects={client.projects} />
        ) : (
          <EmptyProjectsState />
        )}
      </div>
      
      {!client.hasProjects && (
        <AvailableProjectsList projects={availableProjects} />
      )}
    </div>
  );
};

export default ProjectsTabContent;
