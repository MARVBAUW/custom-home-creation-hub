
import React from 'react';
import { Home, Building, Calculator, User, FileText, Construction, LayoutDashboard, Ruler, Hammer, Palette, Check } from 'lucide-react';
import { FormData } from './types';

// Définition des étapes du formulaire avec icônes et titres
export const stepDefinitions = [
  {
    title: "Type de client",
    icon: <User />,
    skipCondition: () => false, // Jamais sauté
  },
  {
    title: "Projet professionnel",
    icon: <Building />,
    skipCondition: (formData: FormData) => formData.clientType !== "professional",
  },
  {
    title: "Projet particulier",
    icon: <Home />,
    skipCondition: (formData: FormData) => formData.clientType !== "individual",
  },
  {
    title: "Type d'estimation",
    icon: <Calculator />,
    skipCondition: () => false, // Jamais sauté
  },
  {
    title: "Détails de construction",
    icon: <Construction />,
    skipCondition: () => false, // Jamais sauté
  },
  {
    title: "Informations personnelles",
    icon: <FileText />,
    skipCondition: () => false, // Dernière étape, jamais sautée
  },
];

// Obtient les étapes visibles en fonction des données du formulaire
export const getVisibleSteps = (formData: FormData) => {
  return stepDefinitions.filter(step => !step.skipCondition(formData));
};

// Obtient le titre de l'étape actuelle
export const getStepTitle = (stepNumber: number) => {
  const steps = stepDefinitions;
  // Ajustement de l'index pour correspondre au numéro d'étape (les étapes commencent à 1)
  const step = steps[stepNumber - 1];
  return step ? step.title : `Étape ${stepNumber}`;
};

// Obtient l'icône de l'étape actuelle
export const getStepIcon = (stepNumber: number) => {
  const steps = stepDefinitions;
  // Ajustement de l'index pour correspondre au numéro d'étape (les étapes commencent à 1)
  const step = steps[stepNumber - 1];
  return step ? step.icon : <Check />;
};
