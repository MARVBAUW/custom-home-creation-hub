
import React, { useEffect, useState } from 'react';
import GanttChart from './gantt/GanttChart';
import { loadAllProjects } from '@/utils/projectStorage';
import { ProjectDetails } from '@/types/project';

const ProjectsGanttView = () => {
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const allProjects = await loadAllProjects();
        console.log("Fetched projects for Gantt view:", allProjects);
        setProjects(allProjects);
        setError(null);
      } catch (error) {
        console.error("Error loading projects:", error);
        setError("Erreur lors du chargement des projets. Veuillez réessayer plus tard.");
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
  
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
        <p className="text-red-500 dark:text-red-400">{error}</p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Essayez de rafraîchir la page ou contactez le support technique.</p>
      </div>
    );
  }
  
  // If there are no projects or projects don't have dates defined
  if (projects.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">Aucun projet n'a été trouvé avec des dates définies.</p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Ajoutez des projets pour qu'ils apparaissent dans le planning.</p>
      </div>
    );
  }
  
  // Generate demo data if needed
  const projectsWithDates = projects.filter(p => p.dates && p.dates.global);
  
  if (projectsWithDates.length === 0) {
    // Use demo data
    const demoProjects: ProjectDetails[] = [
      {
        id: "demo-1",
        projectName: "Rénovation Appartement",
        projectType: "residential",
        fileNumber: "2023-001",
        projectOwner: "Client Démo",
        location: "Paris",
        workAmount: "85000",
        status: "in_progress",
        dates: {
          global: {
            startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
            endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(), // 60 days in future
          }
        },
        phases: {
          feasibility: true,
          dce: true,
          act: true,
          exe: false,
          reception: false,
          delivery: false
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: "demo-2",
        projectName: "Construction Bureau",
        projectType: "commercial",
        fileNumber: "2023-002",
        projectOwner: "Entreprise Démo",
        location: "Lyon",
        workAmount: "250000",
        status: "planning",
        dates: {
          global: {
            startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days in future
            endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 120).toISOString(), // 120 days in future
          }
        },
        phases: {
          feasibility: true,
          dce: false,
          act: false,
          exe: false,
          reception: false,
          delivery: false
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    return <GanttChart projects={demoProjects} />;
  }
  
  return <GanttChart projects={projectsWithDates} />;
};

export default ProjectsGanttView;
