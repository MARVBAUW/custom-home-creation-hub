
import { FormData } from './types';

// Coefficients de base pour les estimations
const BASE_PRICES = {
  construction: 1500, // Prix au m² pour la construction
  renovation: 950,    // Prix au m² pour la rénovation
  extension: 1200,    // Prix au m² pour l'extension
};

// Multiplicateurs par type de client
const CLIENT_MULTIPLIERS = {
  professional: 1.2,   // Plus complexe pour les professionnels
  individual: 1.0,     // Base pour les particuliers
};

// Multiplicateurs par niveau
const LEVEL_MULTIPLIER = 0.9; // Diminution de 10% pour chaque niveau supplémentaire

// Fonction de calcul de l'estimation
export const calculateEstimation = (formData: FormData): number => {
  // Extraction des valeurs nécessaires au calcul
  const { 
    clientType, 
    projectType, 
    surface, 
    levels,
    units 
  } = formData;

  // Valeurs par défaut si non renseignées
  const surfaceValue = parseInt(surface) || 100;
  const levelsValue = parseInt(levels) || 1;
  const unitsValue = parseInt(units) || 1;

  // Prix de base en fonction du type de projet
  let basePrice = BASE_PRICES[projectType as keyof typeof BASE_PRICES] || BASE_PRICES.construction;
  
  // Multiplicateur client
  const clientMultiplier = CLIENT_MULTIPLIERS[clientType as keyof typeof CLIENT_MULTIPLIERS] || 1;
  
  // Calcul pour les niveaux (économie d'échelle)
  let levelMultiplier = 1;
  for (let i = 1; i < levelsValue; i++) {
    levelMultiplier += LEVEL_MULTIPLIER;
  }
  
  // Calcul du prix total
  let totalPrice = basePrice * surfaceValue * clientMultiplier * levelMultiplier;
  
  // Ajustement pour les unités multiples (appartements)
  if (unitsValue > 1) {
    totalPrice = totalPrice * (1 + (unitsValue - 1) * 0.7); // 30% d'économie d'échelle pour chaque unité supplémentaire
  }
  
  // Arrondir à l'entier le plus proche
  return Math.round(totalPrice);
};
