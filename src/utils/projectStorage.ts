
import { ProjectDetails, ProjectPhases } from '@/types/project';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

// Helper function to safely parse JSON timeline data
const parseTimelineData = (timeline: Json | null): { 
  dates?: any, 
  phases?: any 
} => {
  if (!timeline) return {};

  // If it's a string, try to parse it
  if (typeof timeline === 'string') {
    try {
      return JSON.parse(timeline);
    } catch (e) {
      console.error("Error parsing timeline JSON:", e);
      return {};
    }
  }
  
  // If it's already an object, return it
  return timeline as Record<string, any>;
};

// Charger tous les projets
export const loadAllProjects = async (): Promise<ProjectDetails[]> => {
  try {
    const { data, error } = await supabase
      .from('admin_projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Erreur lors du chargement des projets depuis Supabase:", error);
      throw error;
    }
    
    // Convertir les données de la base en ProjectDetails
    const projects: ProjectDetails[] = data.map(project => {
      // Parse the timeline data safely
      const timelineData = parseTimelineData(project.timeline);
      
      return {
        id: project.id,
        projectName: project.project_title,
        projectType: project.project_type,
        workAmount: project.estimated_budget || 0,
        description: project.description || '',
        location: project.location || '',
        createdAt: project.created_at,
        updatedAt: project.updated_at,
        status: project.status || 'new',
        fileNumber: `${new Date(project.created_at).getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        projectOwner: project.client_id || '',
        adminAuthorization: 'granted',
        automaticDates: true,
        clientId: project.client_id || '',
        dates: timelineData.dates || {
          global: {
            startDate: new Date(project.created_at).toISOString(),
            endDate: new Date(new Date(project.created_at).setMonth(new Date(project.created_at).getMonth() + 6)).toISOString()
          }
        },
        phases: timelineData.phases || {
          feasibility: true,
          dce: false,
          act: false,
          exe: false,
          reception: false,
          delivery: false
        },
        team: {},
        companies: [], // Initialize as empty array
        execution: {},
        permits: {},
        technicalOffices: {},
        trades: {}
      };
    });
    
    return projects;
  } catch (error) {
    console.error("Erreur lors du chargement des projets:", error);
    return [];
  }
};

// Charger un projet par son ID
export const loadProjectById = async (projectId: string): Promise<ProjectDetails | null> => {
  try {
    const { data, error } = await supabase
      .from('admin_projects')
      .select('*')
      .eq('id', projectId)
      .single();
    
    if (error) {
      console.error("Erreur lors du chargement du projet:", error);
      throw error;
    }
    
    if (!data) {
      return null;
    }
    
    // Parse the timeline data safely
    const timelineData = parseTimelineData(data.timeline);
    
    // Convertir les données de la base en ProjectDetails
    const project: ProjectDetails = {
      id: data.id,
      projectName: data.project_title,
      projectType: data.project_type,
      workAmount: data.estimated_budget || 0,
      description: data.description || '',
      location: data.location || '',
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      status: data.status || 'new',
      fileNumber: `${new Date(data.created_at).getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      projectOwner: data.client_id || '',
      adminAuthorization: 'granted',
      automaticDates: true,
      clientId: data.client_id || '',
      dates: timelineData.dates || {
        global: {
          startDate: new Date(data.created_at).toISOString(),
          endDate: new Date(new Date(data.created_at).setMonth(new Date(data.created_at).getMonth() + 6)).toISOString()
        }
      },
      phases: timelineData.phases || {
        feasibility: true,
        dce: false,
        act: false,
        exe: false,
        reception: false,
        delivery: false
      },
      team: {},
      companies: [], // Initialize as empty array
      execution: {},
      permits: {},
      technicalOffices: {},
      trades: {}
    };
    
    return project;
  } catch (error) {
    console.error("Erreur lors du chargement du projet:", error);
    return null;
  }
};

// Sauvegarder un projet
export const saveProject = async (project: ProjectDetails): Promise<string> => {
  try {
    // Ensure workAmount is a number
    let estimatedBudget: number;
    if (typeof project.workAmount === 'string') {
      estimatedBudget = parseFloat(project.workAmount) || 0;
    } else {
      estimatedBudget = project.workAmount || 0;
    }
    
    // Stringify the timeline object to make it compatible with the Json type
    const timelineJson = JSON.stringify({
      dates: project.dates,
      phases: project.phases
    });
    
    // Convertir le projet en format compatible avec la base de données
    const dbProject = {
      id: project.id,
      project_title: project.projectName,
      project_type: project.projectType,
      estimated_budget: estimatedBudget,
      description: project.description || '',
      location: project.location || '',
      status: project.status || 'new',
      client_id: project.clientId || null,
      // Add required field for the database schema
      construction_type: 'standard', // Default value
      timeline: timelineJson // Use stringified version for storage
    };
    
    let result;
    
    if (project.id) {
      // Mise à jour d'un projet existant
      const { data, error } = await supabase
        .from('admin_projects')
        .update(dbProject)
        .eq('id', project.id)
        .select();
      
      if (error) {
        console.error("Erreur lors de la mise à jour du projet:", error);
        throw error;
      }
      
      result = data?.[0]?.id;
    } else {
      // Création d'un nouveau projet
      const { data, error } = await supabase
        .from('admin_projects')
        .insert(dbProject)
        .select();
      
      if (error) {
        console.error("Erreur lors de la création du projet:", error);
        throw error;
      }
      
      result = data?.[0]?.id;
    }
    
    return result || '';
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du projet:", error);
    throw error;
  }
};

// Supprimer un projet
export const deleteProject = async (projectId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('admin_projects')
      .delete()
      .eq('id', projectId);
    
    if (error) {
      console.error("Erreur lors de la suppression du projet:", error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression du projet:", error);
    return false;
  }
};

// Fonction de fallback pour les démos et tests
export const getDemoProjects = (): ProjectDetails[] => {
  const projects: ProjectDetails[] = [
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
          startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
          endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
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
      updatedAt: new Date().toISOString(),
      description: "Rénovation complète d'un appartement de 75m² à Paris",
      adminAuthorization: "granted",
      automaticDates: true,
      team: {},
      companies: [],  // Initialize as empty array instead of empty object
      execution: {},
      permits: {},
      technicalOffices: {},
      trades: {}
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
          startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(),
          endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 120).toISOString(),
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
      updatedAt: new Date().toISOString(),
      description: "Construction d'un immeuble de bureaux de 500m² à Lyon",
      adminAuthorization: "granted",
      automaticDates: true,
      team: {},
      companies: [],  // Initialize as empty array instead of empty object
      execution: {},
      permits: {},
      technicalOffices: {},
      trades: {}
    }
  ];
  
  return projects;
};
