
import { FormData } from '../types';
import { 
  BASE_PRICES, 
  CLIENT_MULTIPLIERS, 
  ACTIVITY_MULTIPLIERS, 
  ESTIMATION_TYPE_MULTIPLIERS,
  TERRAIN_PRICES,
  GROS_OEUVRE_PRICES,
  CHARPENTE_PRICES,
  COMBLE_PRICES,
  COUVERTURE_PRICES,
  ISOLATION_PRICES,
  MENUISERIE_EXT_PRICES,
  ELECTRICITE_PRICES,
  PLOMBERIE_PRICES,
  CHAUFFAGE_PRICES,
  CUISINE_PRICES,
  SALLE_DE_BAIN_PRICES,
  ANNUAL_INFLATION
} from './constants';

// Fonction de calcul de l'estimation simple
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
    units,
    terrainType,
    wallType,
    roofType,
    atticType,
    roofingType,
    insulationType,
    windowType,
    electricalType,
    plumbingType,
    heatingType,
    hasAirConditioning,
    kitchenType,
    bathroomType,
    bathroomCount
  } = formData;

  // Valeurs par défaut si non renseignées
  const surfaceValue = parseInt(surface) || 100;
  const levelsValue = parseInt(levels) || 1;
  const unitsValue = parseInt(units) || 1;

  // Initialisation du prix total
  let totalPrice = 0;

  // 1. Prix de base en fonction du type de projet
  let basePrice = BASE_PRICES[projectType as keyof typeof BASE_PRICES] || BASE_PRICES.construction;
  
  // 2. Multiplicateur client
  const clientMultiplier = CLIENT_MULTIPLIERS[clientType as keyof typeof CLIENT_MULTIPLIERS] || 1;
  
  // 3. Multiplicateur d'activité (pour les professionnels)
  let activityMultiplier = 1;
  if (clientType === 'professional' && activity) {
    activityMultiplier = ACTIVITY_MULTIPLIERS[activity as keyof typeof ACTIVITY_MULTIPLIERS] || 1;
  }
  
  // 4. Multiplicateur de type d'estimation
  const estimationTypeMultiplier = ESTIMATION_TYPE_MULTIPLIERS[estimationType as keyof typeof ESTIMATION_TYPE_MULTIPLIERS] || 1;
  
  // 5. Calcul pour les niveaux (économie d'échelle)
  let levelMultiplier = 1;
  for (let i = 1; i < levelsValue; i++) {
    levelMultiplier += 0.9; // 10% d'économie d'échelle pour chaque niveau supplémentaire
  }
  
  // 6. Calcul du prix initial
  totalPrice = basePrice * surfaceValue * clientMultiplier * activityMultiplier * levelMultiplier * estimationTypeMultiplier;
  
  // 7. Ajustement pour les unités multiples (appartements)
  if (unitsValue > 1) {
    totalPrice = totalPrice * (1 + (unitsValue - 1) * 0.7); // 30% d'économie d'échelle pour chaque unité supplémentaire
  }
  
  // 8. Terrain
  if (terrainType && terrainType.length > 0) {
    // Ajouter coût de base pour terrassement
    totalPrice += TERRAIN_PRICES.base * surfaceValue;
    
    // Si le terrain est viabilisé, ajuster le coût
    if (terrainType.includes('viabilise')) {
      totalPrice += TERRAIN_PRICES.viabilise * surfaceValue;
    }
  }
  
  // 9. Gros œuvre
  if (wallType) {
    const wallPrice = GROS_OEUVRE_PRICES[wallType as keyof typeof GROS_OEUVRE_PRICES] || GROS_OEUVRE_PRICES.brique;
    totalPrice += wallPrice * surfaceValue;
  }
  
  // 10. Charpente
  if (roofType) {
    const roofPrice = CHARPENTE_PRICES[roofType as keyof typeof CHARPENTE_PRICES] || 0;
    totalPrice += roofPrice * surfaceValue;
  }
  
  // 11. Combles
  if (atticType === 'amenageable') {
    totalPrice += (COMBLE_PRICES.amenageable * surfaceValue) / levelsValue;
  }
  
  // 12. Couverture
  if (roofingType) {
    const roofingKey = roofingType as keyof typeof COUVERTURE_PRICES;
    if (COUVERTURE_PRICES[roofingKey]) {
      totalPrice += COUVERTURE_PRICES[roofingKey] * surfaceValue;
    }
  }
  
  // 13. Isolation
  if (insulationType) {
    const isolationKey = insulationType as keyof typeof ISOLATION_PRICES;
    if (ISOLATION_PRICES[isolationKey]) {
      totalPrice += ISOLATION_PRICES[isolationKey] * surfaceValue;
    } else {
      // Par défaut, utiliser l'isolation performante
      totalPrice += ISOLATION_PRICES.performance * surfaceValue;
    }
  }
  
  // 14. Menuiseries extérieures
  if (windowType) {
    const windowKey = windowType as keyof typeof MENUISERIE_EXT_PRICES;
    if (MENUISERIE_EXT_PRICES[windowKey]) {
      // Estimation que les menuiseries représentent 15% de la surface totale
      totalPrice += MENUISERIE_EXT_PRICES[windowKey] * (surfaceValue * 0.15);
    }
  }
  
  // 15. Électricité
  if (electricalType) {
    const electricalKey = electricalType as keyof typeof ELECTRICITE_PRICES;
    if (ELECTRICITE_PRICES[electricalKey]) {
      totalPrice += ELECTRICITE_PRICES[electricalKey] * surfaceValue;
    }
  }
  
  // 16. Plomberie
  if (plumbingType) {
    const plumbingKey = plumbingType as keyof typeof PLOMBERIE_PRICES;
    if (PLOMBERIE_PRICES[plumbingKey]) {
      totalPrice += PLOMBERIE_PRICES[plumbingKey] * surfaceValue;
    }
  }
  
  // 17. Chauffage et climatisation
  if (heatingType) {
    const heatingKey = heatingType as keyof typeof CHAUFFAGE_PRICES;
    if (CHAUFFAGE_PRICES[heatingKey]) {
      totalPrice += CHAUFFAGE_PRICES[heatingKey] * surfaceValue;
    } else {
      // Par défaut, utiliser le meilleur rapport qualité/prix
      totalPrice += CHAUFFAGE_PRICES.qualitePrix * surfaceValue;
    }
    
    if (hasAirConditioning === 'yes') {
      totalPrice += CHAUFFAGE_PRICES.climatisation * surfaceValue;
    }
  }
  
  // 18. Cuisine
  if (kitchenType && kitchenType !== 'none') {
    const kitchenKey = kitchenType as keyof typeof CUISINE_PRICES;
    if (CUISINE_PRICES[kitchenKey]) {
      totalPrice += CUISINE_PRICES[kitchenKey] * unitsValue;
    }
  }
  
  // 19. Salle de bain
  if (bathroomType && bathroomType !== 'none') {
    const bathroomKey = bathroomType as keyof typeof SALLE_DE_BAIN_PRICES;
    const bathroomQuantity = parseInt(bathroomCount) || 1;
    
    if (SALLE_DE_BAIN_PRICES[bathroomKey]) {
      totalPrice += SALLE_DE_BAIN_PRICES[bathroomKey] * bathroomQuantity;
    }
  }
  
  // 20. Ajustement pour la date de début du projet (si fournie)
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
