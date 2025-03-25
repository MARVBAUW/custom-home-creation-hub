
import React from 'react';
import { 
  Building, Home, Eye, Paintbrush, Ruler, Building2, Landmark, 
  Construction, User, Users, Compass, Map, Globe,
  Sun, Calculator, Check, Bath, UtensilsCrossed
} from 'lucide-react';

// Fonction pour sélectionner l'icône appropriée en fonction de l'étape
export const getStepIcon = (stepNumber: number) => {
  switch (stepNumber) {
    case 1: return <User className="text-progineer-gold" size={24} />;
    case 2:
    case 3: return <Compass className="text-progineer-gold" size={24} />;
    case 4: return <Eye className="text-progineer-gold" size={24} />;
    case 5: return <Building className="text-progineer-gold" size={24} />;
    case 6: return <Globe className="text-progineer-gold" size={24} />; // Changement d'icône pour le terrain
    case 7: return <Building2 className="text-progineer-gold" size={24} />;
    case 8:
    case 9:
    case 10: return <Home className="text-progineer-gold" size={24} />;
    case 11: return <Sun className="text-progineer-gold" size={24} />;
    case 12:
    case 13: return <Landmark className="text-progineer-gold" size={24} />;
    case 14:
    case 15:
    case 16: return <Construction className="text-progineer-gold" size={24} />;
    case 17:
    case 18:
    case 19:
    case 20:
    case 21: return <Paintbrush className="text-progineer-gold" size={24} />;
    case 22: return <UtensilsCrossed className="text-progineer-gold" size={24} />;
    case 23: return <Bath className="text-progineer-gold" size={24} />;
    case 24: return <Users className="text-progineer-gold" size={24} />;
    default: return <Calculator className="text-progineer-gold" size={24} />;
  }
};

// Déterminer le titre de l'étape en fonction du numéro d'étape
export const getStepTitle = (stepNumber: number) => {
  switch (stepNumber) {
    case 1: return "Profil";
    case 2: return "Projet Pro";
    case 3: return "Projet Particulier";
    case 4: return "Type d'estimation";
    case 5: return "Détails construction";
    case 6: return "Terrain";
    case 7: return "Structure des murs";
    case 8: return "Type de toiture";
    case 9: return "Type de combles";
    case 10: return "Couverture toiture";
    case 11: return "Isolation";
    case 12: return "Revêtements mur ext.";
    case 13: return "Type de menuiseries";
    case 14: return "Électricité";
    case 15: return "Plomberie";
    case 16: return "Chauffage/Clim";
    case 17: return "Plâtrerie";
    case 18: return "Menuiseries int.";
    case 19: return "Carrelage";
    case 20: return "Parquet & sol souple";
    case 21: return "Peinture & revêtements";
    case 22: return "Cuisine";
    case 23: return "Salle de bain";
    case 24: return "Informations personnelles";
    default: return "Étape";
  }
};
