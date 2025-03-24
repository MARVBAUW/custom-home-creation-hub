
import { FormData } from './types';

// Coefficients de base pour les estimations
const BASE_PRICES = {
  construction: 1500, // Prix au m² pour la construction
  renovation: 950,    // Prix au m² pour la rénovation
  extension: 1200,    // Prix au m² pour l'extension
  optimization: 600,  // Prix au m² pour l'optimisation
  division: 800,      // Prix au m² pour la division
  design: 400,        // Prix au m² pour le design
};

// Multiplicateurs par type de client
const CLIENT_MULTIPLIERS = {
  professional: 1.2,   // Plus complexe pour les professionnels
  individual: 1.0,     // Base pour les particuliers
};

// Multiplicateurs par activité professionnelle
const ACTIVITY_MULTIPLIERS = {
  offices: 1.1,        // Bureaux (installations spécifiques)
  commerce: 1.15,      // Commerce (vitrines, sécurité, etc.)
  hotel: 1.25,         // Hôtel (normes spécifiques)
  restaurant: 1.2,     // Restaurant (cuisine professionnelle)
  industry: 1.3,       // Industrie (installations techniques)
  realEstate: 1.05,    // Immobilier (résidentiel)
};

// Multiplicateurs par type d'estimation
const ESTIMATION_TYPE_MULTIPLIERS = {
  quick: 1.0,          // Estimation rapide (base)
  precise: 1.05,       // Estimation précise (léger supplément pour plus de détail)
};

// Facteur d'inflation annuel (pour les dates de projet futures)
const ANNUAL_INFLATION = 0.025; // 2.5% par an

// Fonction de calcul de l'estimation
export const calculateEstimation = (formData: FormData): number => {
  // Extraction des valeurs nécessaires au calcul
  const { 
    clientType, 
    activity,
    projectType, 
    startDate,
    estimationType,
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
  
  // Multiplicateur d'activité (pour les professionnels)
  let activityMultiplier = 1;
  if (clientType === 'professional' && activity) {
    activityMultiplier = ACTIVITY_MULTIPLIERS[activity as keyof typeof ACTIVITY_MULTIPLIERS] || 1;
  }
  
  // Multiplicateur de type d'estimation
  const estimationTypeMultiplier = ESTIMATION_TYPE_MULTIPLIERS[estimationType as keyof typeof ESTIMATION_TYPE_MULTIPLIERS] || 1;
  
  // Calcul pour les niveaux (économie d'échelle)
  let levelMultiplier = 1;
  for (let i = 1; i < levelsValue; i++) {
    levelMultiplier += 0.9; // 10% d'économie d'échelle pour chaque niveau supplémentaire
  }
  
  // Calcul du prix initial
  let totalPrice = basePrice * surfaceValue * clientMultiplier * activityMultiplier * levelMultiplier * estimationTypeMultiplier;
  
  // Ajustement pour les unités multiples (appartements)
  if (unitsValue > 1) {
    totalPrice = totalPrice * (1 + (unitsValue - 1) * 0.7); // 30% d'économie d'échelle pour chaque unité supplémentaire
  }
  
  // Ajustement pour la date de début du projet (si fournie)
  if (startDate) {
    const startDateObj = new Date(startDate);
    const currentDate = new Date();
    const yearsDifference = (startDateObj.getFullYear() - currentDate.getFullYear()) + 
                           (startDateObj.getMonth() - currentDate.getMonth()) / 12;
    
    // Appliquer un facteur d'inflation pour les projets futurs
    if (yearsDifference > 0) {
      totalPrice = totalPrice * Math.pow(1 + ANNUAL_INFLATION, yearsDifference);
    }
  }
  
  // Arrondir à l'entier le plus proche
  return Math.round(totalPrice);
};
