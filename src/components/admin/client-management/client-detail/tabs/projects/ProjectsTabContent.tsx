
import React from 'react';
import { ProjectsList } from './';
import { EmptyProjectsState } from './';
import { AvailableProjectsList } from './';
import { Project } from './types';

interface ProjectsTabContentProps {
  client: { 
    projects: Project[]; 
    hasProjects: boolean;
  };
  availableProjects: Project[];
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
