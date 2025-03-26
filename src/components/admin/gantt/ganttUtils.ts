
import { ProjectDetails } from '@/types/project';
import { addMonths, addDays, parseISO, formatISO } from 'date-fns';

// Étiquettes pour les phases du projet
export const phaseLabels: Record<string, string> = {
  feasibility: 'Faisabilité',
  dce: 'DCE',
  act: 'ACT',
  exe: 'Exécution',
  reception: 'Réception',
  delivery: 'Livraison',
};

// Couleurs pour les phases du projet
export const phaseColors: Record<string, string> = {
  feasibility: 'bg-blue-500 hover:bg-blue-600',
  dce: 'bg-indigo-500 hover:bg-indigo-600',
  act: 'bg-khaki-500 hover:bg-khaki-600',
  exe: 'bg-amber-500 hover:bg-amber-600',
  reception: 'bg-emerald-500 hover:bg-emerald-600',
  delivery: 'bg-green-500 hover:bg-green-600',
};

// Projets de démonstration pour l'affichage initial
export const mockProjects: ProjectDetails[] = [
  {
    projectName: "Maison Dupont",
    fileNumber: "P2023001",
    workAmount: "320 000 €",
    projectOwner: "M. et Mme Dupont",
    projectType: "residential",
    adminAuthorization: "building_permit",
    automaticDates: true,
    dates: {
      global: {
        startDate: formatISO(new Date()),
        endDate: formatISO(addMonths(new Date(), 12))
      },
      feasibility: {
        startDate: formatISO(new Date()),
        endDate: formatISO(addDays(new Date(), 30))
      },
      dce: {
        startDate: formatISO(addDays(new Date(), 31)),
        endDate: formatISO(addDays(new Date(), 90))
      },
      act: {
        startDate: formatISO(addDays(new Date(), 91)),
        endDate: formatISO(addDays(new Date(), 120))
      },
      exe: {
        startDate: formatISO(addDays(new Date(), 121)),
        endDate: formatISO(addDays(new Date(), 300))
      },
      reception: {
        startDate: formatISO(addDays(new Date(), 301)),
        endDate: formatISO(addDays(new Date(), 330))
      },
      delivery: {
        startDate: formatISO(addDays(new Date(), 331)),
        endDate: formatISO(addDays(new Date(), 365))
      }
    },
    phases: {
      feasibility: true,
      dce: true,
      act: true,
      exe: true,
      reception: true,
      delivery: true
    },
    team: {},
    execution: {},
    technicalOffices: {},
    trades: {}
  },
  {
    projectName: "Immeuble Martin",
    fileNumber: "P2023002",
    workAmount: "750 000 €",
    projectOwner: "SCI Martin",
    projectType: "commercial",
    adminAuthorization: "building_permit",
    automaticDates: true,
    dates: {
      global: {
        startDate: formatISO(addDays(new Date(), 15)),
        endDate: formatISO(addMonths(addDays(new Date(), 15), 14))
      },
      feasibility: {
        startDate: formatISO(addDays(new Date(), 15)),
        endDate: formatISO(addDays(new Date(), 60))
      },
      dce: {
        startDate: formatISO(addDays(new Date(), 61)),
        endDate: formatISO(addDays(new Date(), 120))
      },
      act: {
        startDate: formatISO(addDays(new Date(), 121)),
        endDate: formatISO(addDays(new Date(), 180))
      },
      exe: {
        startDate: formatISO(addDays(new Date(), 181)),
        endDate: formatISO(addDays(new Date(), 380))
      }
    },
    phases: {
      feasibility: true,
      dce: true,
      act: true,
      exe: true,
      reception: false,
      delivery: false
    },
    team: {},
    execution: {},
    technicalOffices: {},
    trades: {}
  },
  {
    projectName: "Rénovation Dubois",
    fileNumber: "P2023003",
    workAmount: "180 000 €",
    projectOwner: "M. Dubois",
    projectType: "renovation",
    adminAuthorization: "declaration",
    automaticDates: true,
    dates: {
      global: {
        startDate: formatISO(addDays(new Date(), -30)),
        endDate: formatISO(addMonths(addDays(new Date(), -30), 8))
      },
      feasibility: {
        startDate: formatISO(addDays(new Date(), -30)),
        endDate: formatISO(addDays(new Date(), 0))
      },
      dce: {
        startDate: formatISO(addDays(new Date(), 1)),
        endDate: formatISO(addDays(new Date(), 45))
      },
      exe: {
        startDate: formatISO(addDays(new Date(), 46)),
        endDate: formatISO(addDays(new Date(), 200))
      }
    },
    phases: {
      feasibility: true,
      dce: true,
      act: false,
      exe: true,
      reception: false,
      delivery: false
    },
    team: {},
    execution: {},
    technicalOffices: {},
    trades: {}
  }
];
