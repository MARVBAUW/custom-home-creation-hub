
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

// Prix par type de terrain
const TERRAIN_PRICES = {
  base: 260,           // Prix de base pour les terrassements/viabilisation par m²
  viabilise: 120,      // Prix supplémentaire pour un terrain viabilisé par m²
};

// Prix par type de gros œuvre
const GROS_OEUVRE_PRICES = {
  brique: 590,         // Prix au m² pour construction en briques
  parpaing: 580,       // Prix au m² pour construction en parpaings
  porotherme: 430,     // Prix au m² pour construction en porotherme
  pierre: 730,         // Prix au m² pour construction en pierre
  beton: 500,          // Prix au m² pour construction en béton
  betonCellulaire: 433 // Prix au m² pour construction en béton cellulaire
};

// Prix par type de charpente
const CHARPENTE_PRICES = {
  toitureAccessible: 150,    // Prix au m² pour toiture terrasse accessible
  toitureInaccessible: 130,  // Prix au m² pour toiture terrasse inaccessible
  charpenteIndustrielle: 110, // Prix au m² pour charpente industrielle
  charpenteTraditionnelle: 1, // Prix au m² pour charpente traditionnelle
};

// Prix par type de comble
const COMBLE_PRICES = {
  amenageable: 70,      // Prix au m² pour combles aménageables
};

// Prix par type de couverture
const COUVERTURE_PRICES = {
  tuilePlate: 130,      // Prix au m² pour tuile plate
  tuileRonde: 137,      // Prix au m² pour tuile ronde
  ardoise: 210,         // Prix au m² pour ardoise
  zinc: 160,            // Prix au m² pour zinc
  chaume: 200,          // Prix au m² pour chaume
  bacAcier: 65,         // Prix au m² pour bac acier
  bitume: 75,           // Prix au m² pour étanchéité bitume
  vegetalisee: 146,     // Prix au m² pour toiture végétalisée
  gravillonnee: 105,    // Prix au m² pour toiture gravillonnée
};

// Prix par type d'isolation
const ISOLATION_PRICES = {
  base: 80,             // Prix au m² pour isolation réglementaire
  performance: 100,     // Prix au m² pour isolation performante
  ultraPerformance: 120, // Prix au m² pour isolation ultra performante
};

// Prix par type de façade
const FACADE_PRICES = {
  enduit: 0.7,           // Multiplicateur pour enduit
  brique: 0.9,           // Multiplicateur pour brique
  bardageMetal: 3.0,     // Multiplicateur pour bardage métallique
  bardageBois: 2.1,      // Multiplicateur pour bardage bois
  bardagePierre: 3.1,    // Multiplicateur pour bardage pierre
};

// Prix par type de menuiserie extérieure
const MENUISERIE_EXT_PRICES = {
  bois: 650,             // Prix au m² pour menuiseries en bois
  pvc: 390,              // Prix au m² pour menuiseries en PVC
  alu: 620,              // Prix au m² pour menuiseries en aluminium
  mixte: 690,            // Prix au m² pour menuiseries mixtes bois/alu
  pvcColore: 410,        // Prix au m² pour menuiseries en PVC coloré
};

// Prix par type d'électricité
const ELECTRICITE_PRICES = {
  base: 100,             // Prix au m² pour électricité de base
  avancee: 125,          // Prix au m² pour électricité avancée
  hautDeGamme: 155,      // Prix au m² pour électricité haut de gamme
  domotique: 190,        // Prix au m² pour électricité avec domotique
};

// Prix par type de plomberie
const PLOMBERIE_PRICES = {
  base: 80,              // Prix au m² pour plomberie de base
  avancee: 100,          // Prix au m² pour plomberie avancée
  hautDeGamme: 125,      // Prix au m² pour plomberie haut de gamme
};

// Prix par type de chauffage
const CHAUFFAGE_PRICES = {
  qualitePrix: 60,       // Prix au m² pour chauffage meilleur rapport qualité/prix
  ecologique: 120,       // Prix au m² pour chauffage écologique
  economique: 45,        // Prix au m² pour chauffage économique
  climatisation: 65,     // Prix supplémentaire au m² pour climatisation
};

// Prix par type de cuisine
const CUISINE_PRICES = {
  kitchenette: 2700,     // Prix fixe pour kitchenette
  base: 8500,            // Prix fixe pour cuisine de base
  plus: 13500,           // Prix fixe pour cuisine plus
  premium: 19000,        // Prix fixe pour cuisine premium
};

// Prix par type de salle de bain
const SALLE_DE_BAIN_PRICES = {
  base: 2000,            // Prix fixe pour salle de bain de base
  milieuDeGamme: 3150,   // Prix fixe pour salle de bain milieu de gamme
  premium: 4200,         // Prix fixe pour salle de bain premium
};

// Facteur d'inflation annuel (pour les dates de projet futures)
const ANNUAL_INFLATION = 0.025; // 2.5% par an

// Fonction de calcul de l'estimation complète
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
