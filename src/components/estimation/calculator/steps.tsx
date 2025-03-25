
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
  Check,
  Hammer, 
  Droplet,
  Leaf,
  PencilRuler,
  Bath,
  UtensilsCrossed // Using UtensilsCrossed instead of Kitchen which doesn't exist
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
    skipCondition: (formData: FormData) => false, // Terrain toujours inclus
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
    title: "Électricité",
    icon: <Layers />,
    skipCondition: (formData: FormData) => formData.projectType === "design",
  },
  {
    title: "Plomberie",
    icon: <Droplet />,
    skipCondition: (formData: FormData) => formData.projectType === "design",
  },
  {
    title: "Chauffage & clim",
    icon: <Thermometer />,
    skipCondition: (formData: FormData) => formData.projectType === "design",
  },
  {
    title: "Plâtrerie",
    icon: <Construction />,
    skipCondition: (formData: FormData) => formData.projectType === "design",
  },
  {
    title: "Menuiseries intérieures",
    icon: <Hammer />,
    skipCondition: (formData: FormData) => formData.projectType === "design",
  },
  {
    title: "Carrelage",
    icon: <Grid />,
    skipCondition: (formData: FormData) => formData.projectType === "design",
  },
  {
    title: "Parquet & sol souple",
    icon: <Grid />,
    skipCondition: (formData: FormData) => formData.projectType === "design",
  },
  {
    title: "Peinture & revêtements",
    icon: <PencilRuler />,
    skipCondition: (formData: FormData) => formData.projectType === "design",
  },
  {
    title: "Solutions écologiques",
    icon: <Leaf />,
    skipCondition: (formData: FormData) => !formData.includeEcoSolutions,
  },
  {
    title: "Énergies renouvelables",
    icon: <Leaf />,
    skipCondition: (formData: FormData) => !formData.includeRenewableEnergy,
  },
  {
    title: "Aménagement paysager",
    icon: <Leaf />,
    skipCondition: (formData: FormData) => !formData.includeLandscaping,
  },
  {
    title: "Options extérieures",
    icon: <Home />,
    skipCondition: (formData: FormData) => !formData.includeOptions,
  },
  {
    title: "Cuisine",
    icon: <UtensilsCrossed />, // Changed from Kitchen to UtensilsCrossed
    skipCondition: (formData: FormData) => !formData.includeCuisine,
  },
  {
    title: "Salle de bain",
    icon: <Bath />,
    skipCondition: (formData: FormData) => !formData.includeBathroom,
  },
  {
    title: "Informations personnelles",
    icon: <FileText />,
    skipCondition: (formData: FormData) => false, // Dernière étape, jamais sautée
  },
];

// Options spécifiques pour la rénovation
export const renovationSteps = [
  {
    title: "Démolition",
    icon: <Hammer />,
    skipCondition: (formData: FormData) => formData.projectType !== "renovation",
  },
  {
    title: "Gros œuvre rénovation",
    icon: <Construction />,
    skipCondition: (formData: FormData) => formData.projectType !== "renovation",
  },
  // Autres étapes de rénovation spécifiques
];

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
  return step ? step.icon : <Check />;
};

