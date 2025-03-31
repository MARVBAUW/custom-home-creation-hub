
import React, { useEffect, useState } from 'react';
import GanttChart from './gantt/GanttChart';
import { loadAllProjects } from '@/utils/projectStorage';
import { ProjectDetails } from '@/types/project';

// Exemple de données de projet
const demoProjects: ProjectDetails[] = [
  {
    id: "demo-1",
    projectName: "Rénovation Appartement",
    projectType: "residential",
    fileNumber: "2023-001",
    projectOwner: "Client Démo",
    location: "Paris",
    workAmount: 85000,
    status: "in_progress",
    dates: {
      global: {
        startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 jours avant
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(), // 60 jours après
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
    workAmount: 250000,
    status: "planning",
    dates: {
      global: {
        startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 jours après
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 120).toISOString(), // 120 jours après
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

const ProjectsGanttView = () => {
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useDemo, setUseDemo] = useState(false);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const allProjects = await loadAllProjects();
        console.log("Fetched projects for Gantt view:", allProjects);
        
        if (allProjects && allProjects.length > 0) {
          setProjects(allProjects);
          setUseDemo(false);
        } else {
          console.log("No projects found, using demo data");
          setProjects(demoProjects);
          setUseDemo(true);
        }
        setError(null);
      } catch (error) {
        console.error("Error loading projects:", error);
        setError("Erreur lors du chargement des projets. Utilisation des données de démonstration.");
        setProjects(demoProjects);
        setUseDemo(true);
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
  
  if (error && !useDemo) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
        <p className="text-red-500 dark:text-red-400">{error}</p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Essayez de rafraîchir la page ou contactez le support technique.</p>
      </div>
    );
  }
  
  // Si nous utilisons des données de démo, afficher une notification
  return (
    <div>
      {useDemo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-blue-700">
          <p className="font-medium">Mode démonstration</p>
          <p className="text-sm">Vous visualisez des données de démonstration pour la vue Gantt. Ajoutez de vrais projets pour voir vos données réelles.</p>
        </div>
      )}
      
      <GanttChart projects={projects} />
    </div>
  );
};

export default ProjectsGanttView;
