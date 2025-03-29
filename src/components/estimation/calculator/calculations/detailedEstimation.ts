import { FormData } from '../types';

// Fonction principale pour calculer l'estimation détaillée
export const calculateDetailedEstimation = (formData: FormData): number => {
  // Calculer l'estimation de base
  const baseEstimate = calculateBaseEstimate(formData);
  
  // Appliquer les ajustements spécifiques
  const adjustedEstimate = applySpecificAdjustments(formData, baseEstimate);
  
  // Arrondir à l'entier le plus proche
  return Math.round(adjustedEstimate);
};

// Fonction pour obtenir une estimation sécurisée (avec gestion d'erreurs)
export const getSafeEstimation = (formData: FormData): number => {
  try {
    return calculateDetailedEstimation(formData);
  } catch (error) {
    console.error("Erreur lors du calcul de l'estimation:", error);
    // Valeur par défaut en cas d'erreur
    return 50000;
  }
};

// Calcul de l'estimation de base en fonction de la surface et du type de construction
export const calculateBaseEstimate = (formData: FormData): number => {
  // Convert surface to a number to ensure proper comparison
  const surface = typeof formData.surface === 'string' 
    ? parseFloat(formData.surface) 
    : (formData.surface || 0);
  
  // Base estimation calculation
  let basePrice = 1600; // Default price per m²
  
  // Adjust based on construction type
  if (formData.constructionType === 'traditional') {
    basePrice += 200;
  } else if (formData.constructionType === 'wooden') {
    basePrice -= 100;
  }
  
  // Adjust based on construction style
  if (formData.constructionType === 'luxury') {
    basePrice += 500;
  } else if (formData.constructionType === 'standard') {
    basePrice += 0;
  } else if (formData.constructionType === 'economic') {
    basePrice -= 200;
  }
  
  // Adjust for size economies of scale
  if (surface > 150) {
    basePrice *= 0.95; // 5% discount for larger projects
  } else if (surface > 250) {
    basePrice *= 0.9; // 10% discount for even larger projects
  }
  
  return basePrice * surface;
};

// Appliquer des ajustements spécifiques en fonction des caractéristiques du projet
const applySpecificAdjustments = (formData: FormData, baseEstimate: number): number => {
  let adjustedEstimate = baseEstimate;
  
  // Ajustement pour le type de terrain
  if (formData.terrainType === 'difficult') {
    adjustedEstimate *= 1.1; // +10% pour terrain difficile
  } else if (formData.terrainType === 'very-difficult') {
    adjustedEstimate *= 1.2; // +20% pour terrain très difficile
  }
  
  // Ajustement pour le type de toiture
  if (formData.roofType === 'complex') {
    adjustedEstimate += 15000; // Supplément pour toiture complexe
  } else if (formData.roofType === 'flat') {
    adjustedEstimate += 5000; // Supplément pour toit plat
  }
  
  // Ajustement pour les caractéristiques spéciales
  if (formData.basement) {
    const surface = typeof formData.surface === 'string' 
      ? parseFloat(formData.surface) 
      : (formData.surface || 0);
    adjustedEstimate += surface * 400; // 400€/m² pour un sous-sol
  }
  
  if (formData.garage) {
    adjustedEstimate += 15000; // Supplément pour un garage
  }
  
  // Ajustement pour les équipements techniques
  if (formData.heatingType === 'heatPump') {
    adjustedEstimate += 10000; // Supplément pour pompe à chaleur
  } else if (formData.heatingType === 'floorHeating') {
    adjustedEstimate += 8000; // Supplément pour plancher chauffant
  }
  
  if (formData.hasAirConditioning) {
    adjustedEstimate += 7000; // Supplément pour climatisation
  }
  
  // Ajustement pour les finitions
  if (formData.finishLevel === 'high') {
    adjustedEstimate *= 1.15; // +15% pour finitions haut de gamme
  } else if (formData.finishLevel === 'luxury') {
    adjustedEstimate *= 1.3; // +30% pour finitions luxueuses
  }
  
  // Ajustement pour les aménagements extérieurs
  if (formData.pool) {
    adjustedEstimate += 25000; // Supplément pour piscine
  }
  
  if (formData.terrace) {
    adjustedEstimate += 10000; // Supplément pour terrasse
  }
  
  // Ajustement pour les énergies renouvelables
  if (formData.solarPanels) {
    adjustedEstimate += 12000; // Supplément pour panneaux solaires
  }
  
  return adjustedEstimate;
};

// Calculer la répartition des coûts par catégorie
export const calculateCostBreakdown = (totalEstimation: number, formData: FormData) => {
  // Répartition standard des coûts en pourcentage
  const standardBreakdown = {
    terrassement: 0.05, // 5%
    fondations: 0.08, // 8%
    grosOeuvre: 0.15, // 15%
    charpente: 0.08, // 8%
    couverture: 0.07, // 7%
    menuiseriesExt: 0.08, // 8%
    isolation: 0.06, // 6%
    plomberie: 0.06, // 6%
    electricite: 0.07, // 7%
    chauffage: 0.05, // 5%
    platerie: 0.05, // 5%
    menuiseriesInt: 0.04, // 4%
    revetementsSol: 0.05, // 5%
    peinture: 0.04, // 4%
    amenagementExt: 0.03, // 3%
    honoraires: 0.04 // 4%
  };
  
  // Ajuster la répartition en fonction des caractéristiques du projet
  let adjustedBreakdown = { ...standardBreakdown };
  
  // Exemple d'ajustement pour un terrain difficile
  if (formData.terrainType === 'difficult' || formData.terrainType === 'very-difficult') {
    adjustedBreakdown.terrassement = 0.08; // 8% au lieu de 5%
    adjustedBreakdown.fondations = 0.1; // 10% au lieu de 8%
    // Réduire d'autres postes pour compenser
    adjustedBreakdown.amenagementExt = 0.02; // 2% au lieu de 3%
    adjustedBreakdown.peinture = 0.03; // 3% au lieu de 4%
  }
  
  // Calculer les montants par catégorie
  const costBreakdown = Object.entries(adjustedBreakdown).reduce((acc, [key, percentage]) => {
    acc[key] = Math.round(totalEstimation * percentage);
    return acc;
  }, {} as Record<string, number>);
  
  return costBreakdown;
};
