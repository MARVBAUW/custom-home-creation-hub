
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
  Droplet,
  Hammer, 
  Leaf,
  PencilRuler,
  Bath,
  UtensilsCrossed,
  Globe
} from 'lucide-react';
import { FormData } from '../types';

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
    icon: <Globe />, // Changé de Ruler à Globe pour cohérence
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
    icon: <UtensilsCrossed />,
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
