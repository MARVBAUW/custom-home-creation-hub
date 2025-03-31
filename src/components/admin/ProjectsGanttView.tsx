
import React, { useEffect, useState } from 'react';
import GanttChart from './gantt/GanttChart';
import { loadAllProjects } from '@/utils/projectStorage';
import { ProjectDetails } from '@/types/project';

const ProjectsGanttView = () => {
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await loadAllProjects();
        setProjects(allProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
      </div>
    );
  }
  
  if (projects.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">Aucun projet n'a été trouvé avec des dates définies.</p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Ajoutez des projets pour qu'ils apparaissent dans le planning.</p>
      </div>
    );
  }
  
  return <GanttChart projects={projects} />;
};

export default ProjectsGanttView;
