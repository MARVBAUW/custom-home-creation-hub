
import React from 'react';
import { Check, Globe } from 'lucide-react';
import { FormData } from '../types';
import { stepDefinitions } from './stepDefinitions';
import { renovationSteps } from './renovationSteps';

// Obtient les étapes visibles en fonction des données du formulaire
export const getVisibleSteps = (formData: FormData) => {
  let steps = [...stepDefinitions];
  
  // Ajouter les étapes de rénovation si c'est un projet de rénovation
  if (formData.projectType === "renovation") {
    steps = [...steps, ...renovationSteps.filter(step => !step.skipCondition(formData))];
  }
  
  // Filtrer toutes les étapes selon leurs conditions
  return steps.filter(step => !step.skipCondition(formData));
};

// Obtient le titre de l'étape actuelle
export const getStepTitle = (stepNumber: number): string => {
  const steps = stepDefinitions;
  // Ajustement de l'index pour correspondre au numéro d'étape (les étapes commencent à 1)
  const stepIndex = stepNumber - 1;
  const step = stepIndex >= 0 && stepIndex < steps.length ? steps[stepIndex] : null;
  return step ? step.title : `Étape ${stepNumber}`;
};

// Obtient l'icône de l'étape actuelle
export const getStepIcon = (stepNumber: number): React.ReactNode => {
  const steps = stepDefinitions;
  // Ajustement de l'index pour correspondre au numéro d'étape (les étapes commencent à 1)
  const stepIndex = stepNumber - 1;
  const step = stepIndex >= 0 && stepIndex < steps.length ? steps[stepIndex] : null;
  
  // Correction pour l'étape du terrain (étape 6) - utiliser l'icône Globe
  if (stepNumber === 6) {
    return <Globe className="text-progineer-gold" />;
  }
  
  return step ? step.icon : <Check />;
};
