
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BaseProjectsListProps } from './types';

const ProjectsList: React.FC<BaseProjectsListProps> = ({ projects }) => {
  return (
    <div className="space-y-4">
      {projects.map(project => (
        <div key={project.id} className="border border-gray-200 rounded-md p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{project.title}</h4>
              <p className="text-sm text-gray-500">{project.type} - {project.location}</p>
              <Badge className="mt-2" variant="outline">{project.status}</Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              asChild
            >
              <Link to={`/workspace/client-area/admin/projects/${project.id}`}>
                Voir le projet
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
