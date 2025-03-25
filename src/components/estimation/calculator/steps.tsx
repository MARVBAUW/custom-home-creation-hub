
import React from 'react';
import { 
  Home, 
  Building, 
  Calculator, 
  User, 
  FileText, 
  Construction, 
  Ruler, 
  Layers, 
  Thermometer, 
  Grid, 
  Check 
} from 'lucide-react';
import { FormData } from './types';

// Définition des étapes du formulaire avec icônes et titres
export const stepDefinitions = [
  {
    title: "Type de client",
    icon: <User />,
    skipCondition: (formData: FormData) => false, // Jamais sauté
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
    skipCondition: (formData: FormData) => false, // Jamais sauté
  },
  {
    title: "Détails de construction",
    icon: <Construction />,
    skipCondition: (formData: FormData) => false, // Jamais sauté
  },
  {
    title: "Type de terrain",
    icon: <Ruler />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Structure des murs",
    icon: <Layers />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Type de toiture",
    icon: <Home />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Type de combles",
    icon: <Layers />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Couverture toiture",
    icon: <Layers />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Isolation",
    icon: <Thermometer />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Revêtements mur extérieur",
    icon: <Grid />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Type de menuiseries",
    icon: <Grid />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Informations personnelles",
    icon: <FileText />,
    skipCondition: (formData: FormData) => false, // Dernière étape, jamais sautée
  },
];

// Obtient les étapes visibles en fonction des données du formulaire
export const getVisibleSteps = (formData: FormData) => {
  return stepDefinitions.filter(step => !step.skipCondition(formData));
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
  return step ? step.icon : <Check />;
};
