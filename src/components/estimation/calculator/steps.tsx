
import React from 'react';
import { 
  Home, 
  Building, 
  Calculator, 
  User, 
  FileText, 
  Construction, 
  Palette, 
  Ruler, 
  Hammer, 
  Thermometer, 
  Layers, 
  Grid, 
  CircuitBoard, 
  Sun, 
  Lightbulb, 
  Flower, 
  Bath,
  Kitchen,
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
    title: "Électricité",
    icon: <CircuitBoard />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Plomberie",
    icon: <CircuitBoard />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Chauffage",
    icon: <Thermometer />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Climatisation",
    icon: <Sun />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Plâtrerie",
    icon: <Layers />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Type de portes",
    icon: <Grid />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Aménagements intérieurs",
    icon: <Home />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Carrelage sols",
    icon: <Grid />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Carrelage murs",
    icon: <Grid />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Parquet",
    icon: <Layers />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Revêtements souples",
    icon: <Layers />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Peintures et revêtements muraux",
    icon: <Palette />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Solutions énergétiques",
    icon: <Lightbulb />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Aménagement extérieur",
    icon: <Flower />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Clôtures et portails",
    icon: <Grid />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Terrasse",
    icon: <Grid />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Paysagisme",
    icon: <Flower />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Abri de voiture",
    icon: <Home />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Piscine",
    icon: <Bath />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Spa / Jacuzzi",
    icon: <Bath />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Cuisine",
    icon: <Kitchen />,
    skipCondition: (formData: FormData) => false,
  },
  {
    title: "Salle de bain",
    icon: <Bath />,
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
