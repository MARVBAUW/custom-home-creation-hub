
import { ProjectPhase, ProjectDetails } from '@/types/project';

// Define phase labels in French
export const phaseLabels: Record<ProjectPhase, string> = {
  'feasibility': 'Faisabilité',
  'dce': 'DCE',
  'act': 'ACT',
  'exe': 'EXE',
  'reception': 'Réception',
  'delivery': 'Livraison'
};

// Define colors for each phase
export const phaseColors: Record<ProjectPhase, string> = {
  'feasibility': 'bg-blue-500',
  'dce': 'bg-indigo-500',
  'act': 'bg-purple-500',
  'exe': 'bg-khaki-600',
  'reception': 'bg-orange-500',
  'delivery': 'bg-green-500'
};

// Define phase icons or descriptions
export const phaseDescriptions: Record<ProjectPhase, string> = {
  'feasibility': 'Études de faisabilité et conception préliminaire',
  'dce': 'Dossier de Consultation des Entreprises',
  'act': 'Analyse des Candidatures et des offres techniques',
  'exe': 'Exécution des travaux',
  'reception': 'Réception des travaux',
  'delivery': 'Livraison finale'
};

// Function to calculate phase duration in days
export const calculatePhaseDuration = (phase: ProjectPhase, workAmount: number): number => {
  // Base durations for each phase based on project size
  const baseDurations: Record<ProjectPhase, number> = {
    'feasibility': 14,
    'dce': 30,
    'act': 21,
    'exe': Math.ceil(workAmount / 10000), // 1 day per 10,000€
    'reception': 7,
    'delivery': 3
  };
  
  // Apply a multiplier based on project size
  let multiplier = 1;
  if (workAmount > 1000000) multiplier = 1.5;
  else if (workAmount > 500000) multiplier = 1.3;
  else if (workAmount > 100000) multiplier = 1.1;
  
  return Math.ceil(baseDurations[phase] * multiplier);
};

// Create mock projects for demo purposes
import { addDays, formatISO } from 'date-fns';

export const mockProjects: ProjectDetails[] = [
  {
    id: 'project-1',
    projectName: 'Résidence Bellevue',
    fileNumber: 'P2023101',
    projectType: 'residential',
    projectOwner: 'SCI Horizon',
    workAmount: 750000,
    location: 'Annecy',
    adminAuthorization: 'building_permit',
    automaticDates: true,
    companies: [], // Add the empty companies array
    phases: {
      feasibility: true,
      dce: true,
      act: true,
      exe: true,
      reception: true,
      delivery: false
    },
    dates: {
      global: {
        startDate: formatISO(new Date(2023, 5, 15)),
        endDate: formatISO(new Date(2024, 6, 30))
      },
      phases: {
        feasibility: {
          startDate: formatISO(new Date(2023, 5, 15)),
          endDate: formatISO(new Date(2023, 6, 30))
        },
        dce: {
          startDate: formatISO(new Date(2023, 7, 1)),
          endDate: formatISO(new Date(2023, 8, 15))
        },
        act: {
          startDate: formatISO(new Date(2023, 8, 16)),
          endDate: formatISO(new Date(2023, 9, 30))
        },
        exe: {
          startDate: formatISO(new Date(2023, 10, 1)),
          endDate: formatISO(new Date(2024, 3, 30))
        },
        reception: {
          startDate: formatISO(new Date(2024, 4, 1)),
          endDate: formatISO(new Date(2024, 4, 15))
        }
      }
    },
    team: {
      projectManager: 'Sophie Martin',
      technicalDirector: 'Thomas Durand'
    },
    execution: {},
    technicalOffices: {},
    trades: {},
    createdAt: '2023-05-01T10:00:00Z',
    updatedAt: '2023-11-15T14:30:00Z'
  },
  {
    id: 'project-2',
    projectName: 'Centre Commercial Étoile',
    fileNumber: 'P2023102',
    projectType: 'commercial',
    projectOwner: 'Groupe Étoile',
    workAmount: 2500000,
    location: 'Lyon',
    adminAuthorization: 'building_permit',
    automaticDates: true,
    companies: [], // Add the empty companies array
    phases: {
      feasibility: true,
      dce: true,
      act: true,
      exe: true,
      reception: false,
      delivery: false
    },
    dates: {
      global: {
        startDate: formatISO(new Date(2023, 2, 1)),
        endDate: formatISO(new Date(2024, 9, 30))
      },
      phases: {
        feasibility: {
          startDate: formatISO(new Date(2023, 2, 1)),
          endDate: formatISO(new Date(2023, 3, 30))
        },
        dce: {
          startDate: formatISO(new Date(2023, 4, 1)),
          endDate: formatISO(new Date(2023, 6, 15))
        },
        act: {
          startDate: formatISO(new Date(2023, 6, 16)),
          endDate: formatISO(new Date(2023, 8, 15))
        },
        exe: {
          startDate: formatISO(new Date(2023, 8, 16)),
          endDate: formatISO(new Date(2024, 8, 30))
        }
      }
    },
    team: {
      projectManager: 'Philippe Dubois',
      technicalDirector: 'Laura Blanc'
    },
    execution: {},
    technicalOffices: {},
    trades: {},
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-10-20T16:45:00Z'
  },
  {
    id: 'project-3',
    projectName: 'Immeuble de Bureaux Panorama',
    fileNumber: 'P2023103',
    projectType: 'commercial',
    projectOwner: 'SAS Bureaux Modernes',
    workAmount: 1800000,
    location: 'Grenoble',
    adminAuthorization: 'building_permit',
    automaticDates: true,
    companies: [], // Add the empty companies array
    phases: {
      feasibility: true,
      dce: true,
      act: true,
      exe: false,
      reception: false,
      delivery: false
    },
    dates: {
      global: {
        startDate: formatISO(new Date(2023, 7, 1)),
        endDate: formatISO(new Date(2024, 12, 31))
      },
      phases: {
        feasibility: {
          startDate: formatISO(new Date(2023, 7, 1)),
          endDate: formatISO(new Date(2023, 8, 30))
        },
        dce: {
          startDate: formatISO(new Date(2023, 9, 1)),
          endDate: formatISO(new Date(2023, 11, 15))
        },
        act: {
          startDate: formatISO(new Date(2023, 11, 16)),
          endDate: formatISO(new Date(2024, 1, 31))
        }
      }
    },
    team: {
      projectManager: 'Julie Moreau',
      technicalDirector: 'Marc Lefevre'
    },
    execution: {},
    technicalOffices: {},
    trades: {},
    createdAt: '2023-06-10T14:20:00Z',
    updatedAt: '2023-12-05T11:30:00Z'
  }
];
