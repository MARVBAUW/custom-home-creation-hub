
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
    
    // Si aucun projet trouvé, retourner des projets de démo
    if (!data || data.length === 0) {
      console.log("Aucun projet trouvé, retour des projets de démo");
      return getDemoProjects();
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
    // En cas d'erreur, retourner des projets de démo
    return getDemoProjects();
  }
};

// Charger un projet par son ID
export const loadProjectById = async (projectId: string): Promise<ProjectDetails | null> => {
  try {
    // Log to track execution
    console.log("Loading project by ID:", projectId);
    
    // Format demo IDs to match the expected pattern
    if (projectId.startsWith("demo-")) {
      const demoProjects = getDemoProjects();
      const demoProject = demoProjects.find(p => p.id === projectId);
      console.log("Demo project found:", demoProject ? "yes" : "no");
      return demoProject || null;
    }
    
    // Fetch from Supabase
    const { data, error } = await supabase
      .from('admin_projects')
      .select('*')
      .eq('id', projectId)
      .single();
    
    // Check for errors
    if (error) {
      console.error("Error loading project from Supabase:", error);
      // If project not found, try demo projects
      if (error.code === 'PGRST116') {
        console.log("Project not found in database, checking demo projects");
        const demoProjects = getDemoProjects();
        return demoProjects.find(p => p.id === projectId) || null;
      }
      throw error;
    }
    
    // If no data returned
    if (!data) {
      console.log("No data returned from Supabase");
      return null;
    }
    
    console.log("Project data from Supabase:", data);
    
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
    console.error("Error loading project:", error);
    
    // In case of error, check if we're looking for a demo project
    if (projectId.startsWith("demo-")) {
      const demoProjects = getDemoProjects();
      return demoProjects.find(p => p.id === projectId) || null;
    }
    
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
        },
        design: {
          startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
          endDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
        },
        permits: {
          startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
          endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(),
        },
        construction: {
          startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
          endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 50).toISOString(),
        },
        phases: {
          feasibility: {
            startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
            endDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
          },
          dce: {
            startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
            endDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
          },
          act: {
            startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
            endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
          },
          exe: {
            startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
            endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
          },
          reception: {
            startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
            endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 55).toISOString(),
          },
          delivery: {
            startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 55).toISOString(),
            endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
          }
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
      team: {
        projectManager: "Jean Dupont",
        technicalDirector: "Marie Lambert",
        draftsman: "Pierre Martin",
        workSupervisor: "Sophie Lefevre",
      },
      companies: [
        {
          name: "Dupont Construction",
          contactName: "Jean Dupont",
          email: "contact@dupont-construction.fr",
          phone: "01 23 45 67 89",
          address: "123 Avenue des Champs-Élysées, Paris",
          role: "Gros œuvre"
        },
        {
          name: "Électricité Lambert",
          contactName: "Marie Lambert",
          email: "marie@electricite-lambert.fr",
          phone: "01 98 76 54 32",
          address: "45 Rue de Rivoli, Paris",
          role: "Électricité"
        }
      ],
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
        },
        design: {
          startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(),
          endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
        },
        permits: {
          startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 40).toISOString(),
          endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 70).toISOString(),
        },
        construction: {
          startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 70).toISOString(),
          endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 110).toISOString(),
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
      companies: [],
      execution: {},
      permits: {},
      technicalOffices: {},
      trades: {}
    }
  ];
  
  return projects;
};
