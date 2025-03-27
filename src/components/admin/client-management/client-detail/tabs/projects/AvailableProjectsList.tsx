
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AvailableProjectsListProps {
  projects: Array<{
    id: string;
    title: string;
    type: string;
    location: string;
    status: string;
  }>;
}

const AvailableProjectsList: React.FC<AvailableProjectsListProps> = ({ projects }) => {
  return (
    <div className="pt-6">
      <h3 className="text-lg font-medium mb-3">Projets disponibles</h3>
      <div className="space-y-3">
        {projects.map(project => (
          <div 
            key={project.id}
            className="p-4 border border-gray-200 rounded-md flex justify-between items-center hover:bg-gray-50"
          >
            <div>
              <h4 className="font-medium">{project.title}</h4>
              <p className="text-sm text-gray-500">{project.type} - {project.location}</p>
              <Badge className="mt-1" variant="outline">{project.status}</Badge>
            </div>
            <Button size="sm" className="bg-khaki-600 hover:bg-khaki-700">
              Assigner
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableProjectsList;
