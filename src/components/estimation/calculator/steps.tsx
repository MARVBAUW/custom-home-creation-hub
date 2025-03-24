
import React from 'react';
import { 
  User, Briefcase, Home, Calculator, Building, Map, Building2, 
  Sun, Paintbrush, Plug, ChefHat, Bath, Compass
} from 'lucide-react';
import { EstimationStep } from './types';

// Définition des étapes de l'estimation
export const getSteps = (): EstimationStep[] => [
  { title: "Votre profil", icon: <User size={20} /> },
  { 
    title: "Informations sur votre projet (Professionnel)", 
    icon: <Briefcase size={20} />, 
    skipCondition: (data) => data.clientType !== "professional" 
  },
  { 
    title: "Informations sur votre projet (Particulier)", 
    icon: <Home size={20} />, 
    skipCondition: (data) => data.clientType !== "individual" 
  },
  { 
    title: "Type d'estimation", 
    description: "Choisissez le niveau de précision souhaité pour votre estimation", 
    icon: <Calculator size={20} /> 
  },
  { 
    title: "Détails de construction", 
    description: "Informations de base sur votre projet", 
    icon: <Building size={20} /> 
  },
  { 
    title: "Type de terrain", 
    description: "Caractéristiques de votre terrain", 
    icon: <Map size={20} /> 
  },
  { 
    title: "Type de bâtiment", 
    description: "Structure et matériaux principaux", 
    icon: <Building2 size={20} /> 
  },
  { 
    title: "Toiture", 
    description: "Type de toiture envisagée", 
    icon: <Home size={20} /> 
  },
  { 
    title: "Combles", 
    description: "Aménagement des combles", 
    icon: <Home size={20} /> 
  },
  { 
    title: "Couverture / Étanchéité", 
    description: "Matériaux de couverture", 
    icon: <Home size={20} /> 
  },
  { 
    title: "Isolation", 
    description: "Niveau d'isolation thermique", 
    icon: <Sun size={20} /> 
  },
  { 
    title: "Façade", 
    description: "Revêtements extérieurs", 
    icon: <Building size={20} /> 
  },
  { 
    title: "Menuiseries ext.", 
    description: "Fenêtres et portes extérieures", 
    icon: <Building size={20} /> 
  },
  { 
    title: "Électricité", 
    description: "Installation électrique", 
    icon: <Plug size={20} /> 
  },
  { 
    title: "Plomberie", 
    description: "Installation sanitaire", 
    icon: <Plug size={20} /> 
  },
  { 
    title: "Chauffage / Climatisation", 
    description: "Système de chauffage et climatisation", 
    icon: <Sun size={20} /> 
  },
  { 
    title: "Plâtrerie", 
    description: "Cloisons et aménagements", 
    icon: <Paintbrush size={20} /> 
  },
  { 
    title: "Menuiseries int.", 
    description: "Portes et aménagements intérieurs", 
    icon: <Paintbrush size={20} /> 
  },
  { 
    title: "Carrelage / Faïence", 
    description: "Revêtements de sol et murs", 
    icon: <Paintbrush size={20} /> 
  },
  { 
    title: "Parquet / Sol souple", 
    description: "Revêtements de sol", 
    icon: <Paintbrush size={20} /> 
  },
  { 
    title: "Peinture / Revêtements muraux", 
    description: "Finitions murales", 
    icon: <Paintbrush size={20} /> 
  },
  { 
    title: "Cuisine", 
    description: "Aménagement de cuisine", 
    icon: <ChefHat size={20} /> 
  },
  { 
    title: "Salle de bain", 
    description: "Aménagement de salle de bain", 
    icon: <Bath size={20} /> 
  },
  { 
    title: "Vos coordonnées", 
    description: "Pour recevoir votre estimation par email", 
    icon: <User size={20} /> 
  },
];

// Fonction pour obtenir les étapes visibles en fonction des données du formulaire
export const getVisibleSteps = (formData: any): EstimationStep[] => {
  const steps = getSteps();
  return steps.filter(s => !s.skipCondition || !s.skipCondition(formData));
};

// Fonction pour obtenir le titre de l'étape en fonction du numéro d'étape
export const getStepTitle = (stepNumber: number): string => {
  const steps = getSteps();
  if (stepNumber >= 1 && stepNumber <= steps.length) {
    return steps[stepNumber - 1].title;
  }
  return "Étape";
};

// Fonction pour obtenir l'icône de l'étape en fonction du numéro d'étape
export const getStepIcon = (stepNumber: number) => {
  switch (stepNumber) {
    case 1: return <User className="text-progineer-gold" size={24} />;
    case 2:
    case 3: return <Compass className="text-progineer-gold" size={24} />;
    case 4: return <Calculator className="text-progineer-gold" size={24} />;
    case 5: return <Building className="text-progineer-gold" size={24} />;
    case 6: return <Map className="text-progineer-gold" size={24} />;
    case 7: return <Building2 className="text-progineer-gold" size={24} />;
    case 8:
    case 9:
    case 10: return <Home className="text-progineer-gold" size={24} />;
    case 11: return <Sun className="text-progineer-gold" size={24} />;
    case 12:
    case 13: return <Building className="text-progineer-gold" size={24} />;
    case 14:
    case 15: return <Plug className="text-progineer-gold" size={24} />;
    case 16: return <Sun className="text-progineer-gold" size={24} />;
    case 17:
    case 18:
    case 19:
    case 20:
    case 21: return <Paintbrush className="text-progineer-gold" size={24} />;
    case 22: return <ChefHat className="text-progineer-gold" size={24} />;
    case 23: return <Bath className="text-progineer-gold" size={24} />;
    case 24: return <User className="text-progineer-gold" size={24} />;
    default: return <Calculator className="text-progineer-gold" size={24} />;
  }
};
