
import { ProjectPhase } from '@/types/project';

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
