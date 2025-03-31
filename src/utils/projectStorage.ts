
import { ProjectDetails } from '@/types/project';
import { supabase } from '@/integrations/supabase/client';

// Fonction pour enregistrer un projet dans Supabase ou en local fallback
export const saveProject = async (projectData: ProjectDetails): Promise<string> => {
  try {
    // D'abord essayer de sauvegarder dans Supabase
    const user = supabase.auth.getUser();
    if ((await user).data.user) {
      // Si l'utilisateur est connecté, enregistrer dans Supabase
      const projectId = projectData.id || `project-${Date.now()}`;
      const workAmount = typeof projectData.workAmount === 'string' 
        ? parseFloat(projectData.workAmount || '0') 
        : projectData.workAmount || 0;
        
      const { error } = await supabase
        .from('admin_projects')
        .upsert({
          id: projectId,
          project_title: projectData.projectName,
          project_type: projectData.projectType,
          construction_type: projectData.projectType === 'residential' ? 'new' : 'other',
          description: projectData.description || '',
          location: projectData.location || '',
          estimated_budget: workAmount,
          surface: 0, // Valeur par défaut
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          status: 'active',
          client_id: projectData.clientId || null
        });
      
      if (error) throw error;
      
      return projectId;
    } else {
      // Fallback sur localStorage si l'utilisateur n'est pas connecté
      return saveProjectToLocalStorage(projectData);
    }
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du projet dans Supabase:', error);
    // Fallback sur localStorage en cas d'erreur
    return saveProjectToLocalStorage(projectData);
  }
};

// Fonction de fallback pour sauvegarder en localStorage
const saveProjectToLocalStorage = (projectData: ProjectDetails): string => {
  try {
    // Récupérer les projets existants
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Créer un nouvel ID ou utiliser celui existant
    const projectId = projectData.id || `project-${Date.now()}`;
    
    // Créer l'objet projet avec timestamps
    const newProject: ProjectDetails = {
      ...projectData,
      id: projectId,
      createdAt: projectData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: projectData.status || 'active'
    };
    
    // Mise à jour si le projet existe déjà, sinon ajout
    const projectIndex = existingProjects.findIndex((p: any) => p.id === projectId);
    
    if (projectIndex >= 0) {
      existingProjects[projectIndex] = {
        ...existingProjects[projectIndex],
        ...newProject,
        updatedAt: new Date().toISOString()
      };
    } else {
      existingProjects.push(newProject);
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('projects', JSON.stringify(existingProjects));
    
    return projectId;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du projet en localStorage:', error);
    throw new Error('Erreur lors de la sauvegarde du projet');
  }
};

// Fonction pour charger un projet par ID
export const loadProjectById = async (projectId: string): Promise<ProjectDetails | null> => {
  try {
    // D'abord essayer de charger depuis Supabase
    const { data, error } = await supabase
      .from('admin_projects')
      .select('*')
      .eq('id', projectId)
      .single();
    
    if (error) throw error;
    
    if (data) {
      // Convertir le format Supabase au format ProjectDetails
      return {
        id: data.id,
        projectName: data.project_title,
        projectType: data.project_type,
        workAmount: data.estimated_budget?.toString() || '0',
        description: data.description || '',
        location: data.location || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at || data.created_at,
        status: data.status || 'active',
        // Ajout des champs obligatoires avec des valeurs par défaut
        fileNumber: '',
        projectOwner: '',
        adminAuthorization: '',
        automaticDates: true,
        dates: {
          global: {
            startDate: '',
            endDate: ''
          }
        },
        phases: {
          feasibility: false,
          dce: false,
          act: false,
          exe: false,
          reception: false,
          delivery: false
        },
        team: {},
        execution: {},
        technicalOffices: {},
        trades: {}
      };
    }
  } catch (error) {
    console.error('Erreur lors du chargement du projet depuis Supabase:', error);
    // Fallback sur localStorage
  }
  
  // Fallback sur localStorage
  try {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = projects.find((p: any) => p.id === projectId);
    if (project) {
      // Assurer que le projet contient tous les champs requis
      const completeProject: ProjectDetails = {
        ...project,
        fileNumber: project.fileNumber || '',
        projectOwner: project.projectOwner || '',
        adminAuthorization: project.adminAuthorization || '',
        automaticDates: project.automaticDates !== undefined ? project.automaticDates : true,
        dates: project.dates || {
          global: {
            startDate: '',
            endDate: ''
          }
        },
        phases: project.phases || {
          feasibility: false,
          dce: false,
          act: false,
          exe: false,
          reception: false,
          delivery: false
        },
        team: project.team || {},
        execution: project.execution || {},
        technicalOffices: project.technicalOffices || {},
        trades: project.trades || {},
        updatedAt: project.updatedAt || project.createdAt || new Date().toISOString()
      };
      return completeProject;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors du chargement du projet depuis localStorage:', error);
    return null;
  }
};

// Fonction pour charger tous les projets
export const loadAllProjects = async (): Promise<ProjectDetails[]> => {
  try {
    // D'abord essayer de charger depuis Supabase
    const { data, error } = await supabase
      .from('admin_projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      // Convertir le format Supabase au format ProjectDetails
      return data.map(item => ({
        id: item.id,
        projectName: item.project_title,
        projectType: item.project_type,
        workAmount: item.estimated_budget?.toString() || '0',
        description: item.description || '',
        location: item.location || '',
        createdAt: item.created_at,
        updatedAt: item.updated_at || item.created_at,
        status: item.status || 'active',
        // Ajout des champs obligatoires avec des valeurs par défaut
        fileNumber: '',
        projectOwner: '',
        adminAuthorization: '',
        automaticDates: true,
        dates: {
          global: {
            startDate: '',
            endDate: ''
          }
        },
        phases: {
          feasibility: false,
          dce: false,
          act: false,
          exe: false,
          reception: false,
          delivery: false
        },
        team: {},
        execution: {},
        technicalOffices: {},
        trades: {}
      }));
    }
  } catch (error) {
    console.error('Erreur lors du chargement des projets depuis Supabase:', error);
    // Fallback sur localStorage
  }
  
  // Fallback sur localStorage
  try {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    return projects.map((project: any) => ({
      ...project,
      fileNumber: project.fileNumber || '',
      projectOwner: project.projectOwner || '',
      adminAuthorization: project.adminAuthorization || '',
      automaticDates: project.automaticDates !== undefined ? project.automaticDates : true,
      dates: project.dates || {
        global: {
          startDate: '',
          endDate: ''
        }
      },
      phases: project.phases || {
        feasibility: false,
        dce: false,
        act: false,
        exe: false,
        reception: false,
        delivery: false
      },
      team: project.team || {},
      execution: project.execution || {},
      technicalOffices: project.technicalOffices || {},
      trades: project.trades || {},
      updatedAt: project.updatedAt || project.createdAt || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Erreur lors du chargement des projets depuis localStorage:', error);
    return [];
  }
};

// Fonction pour supprimer un projet
export const deleteProject = async (projectId: string): Promise<boolean> => {
  try {
    // D'abord essayer de supprimer dans Supabase
    const { error } = await supabase
      .from('admin_projects')
      .delete()
      .eq('id', projectId);
    
    if (error) throw error;
    
    // Également supprimer de localStorage pour rester synchronisé
    deleteProjectFromLocalStorage(projectId);
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du projet dans Supabase:', error);
    // Fallback sur localStorage
    return deleteProjectFromLocalStorage(projectId);
  }
};

// Fonction de fallback pour supprimer du localStorage
const deleteProjectFromLocalStorage = (projectId: string): boolean => {
  try {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const updatedProjects = projects.filter((p: any) => p.id !== projectId);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du projet du localStorage:', error);
    return false;
  }
};
