
import { ProjectPhase } from '@/types/project';

export const phaseColors: Record<ProjectPhase, string> = {
  feasibility: "bg-blue-400",
  dce: "bg-green-400",
  act: "bg-yellow-400",
  exe: "bg-purple-400",
  reception: "bg-pink-400",
  delivery: "bg-red-400"
};

export const phaseLabels: Record<ProjectPhase, string> = {
  feasibility: "Faisabilité",
  dce: "DCE",
  act: "ACT",
  exe: "EXE",
  reception: "Réception",
  delivery: "Livraison"
};

// Mock data for demonstration
export const mockProjects = [
  {
    projectName: "Centre commercial Marseille",
    fileNumber: "PRG-2023-001",
    workAmount: "1200000",
    projectOwner: "SCI Méditerranée",
    projectType: "commercial",
    adminAuthorization: "building_permit",
    automaticDates: true,
    dates: {
      global: {
        startDate: "2023-10-01",
        endDate: "2024-07-15"
      },
      feasibility: {
        startDate: "2023-10-01",
        endDate: "2023-10-30"
      },
      dce: {
        startDate: "2023-11-01",
        endDate: "2023-12-15"
      },
      act: {
        startDate: "2023-12-16",
        endDate: "2024-01-20"
      },
      exe: {
        startDate: "2024-01-21",
        endDate: "2024-06-30"
      },
      reception: {
        startDate: "2024-07-01",
        endDate: "2024-07-10"
      },
      delivery: {
        startDate: "2024-07-11",
        endDate: "2024-07-15"
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
    projectName: "Immeuble résidentiel Lyon",
    fileNumber: "PRG-2023-002",
    workAmount: "850000",
    projectOwner: "Groupe Immobilier Rhône",
    projectType: "residential",
    adminAuthorization: "building_permit",
    automaticDates: true,
    dates: {
      global: {
        startDate: "2023-11-15",
        endDate: "2024-08-30"
      },
      feasibility: {
        startDate: "2023-11-15",
        endDate: "2023-12-15"
      },
      dce: {
        startDate: "2023-12-16",
        endDate: "2024-01-31"
      },
      act: {
        startDate: "2024-02-01",
        endDate: "2024-02-29"
      },
      exe: {
        startDate: "2024-03-01",
        endDate: "2024-08-15"
      },
      reception: {
        startDate: "2024-08-16",
        endDate: "2024-08-25"
      },
      delivery: {
        startDate: "2024-08-26",
        endDate: "2024-08-30"
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
  }
];
