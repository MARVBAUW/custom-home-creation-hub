
import { FormData } from './types';
import { ensureNumber } from './utils/typeConversions';

// Prix standards par type et par m²
const PRICE_RATES = {
  // Types de construction (par m²)
  CONSTRUCTION: {
    BASE: 1800,
    TRADITIONAL: 1900,
    CONTEMPORARY: 2100,
    ECOLOGICAL: 2300
  },
  // Types de terrain (coûts additionnels par m²)
  TERRAIN: {
    ROCHEUX: 260,
    ARGILEUX: 200,
    ACCIDENTE: 230,
    PENTUE: 240,
    VIABILISE: 120,
    PLAT: 150,
    SANS_OBJET: 100
  },
  // Types de murs (par m²)
  MURS: {
    BRIQUES: 590,
    PARPAING: 580, 
    POROTHERME: 430,
    PIERRE: 730,
    BETON: 500,
    BETON_CELLULAIRE: 430,
    SANS_AVIS: 550
  },
  // Types de charpente (par m²)
  CHARPENTE: {
    TOITURE_TERRASSE_ACCESSIBLE: 150,
    TOITURE_TERRASSE_INACCESSIBLE: 130,
    CHARPENTE_INDUSTRIELLE: 110,
    CHARPENTE_TRADITIONNELLE: 140
  },
  // Types de combles (par m²)
  COMBLES: {
    AMENAGEABLES: 70,
    PERDUS: 50
  },
  // Taux de démolition (% du coût total)
  DEMOLITION: {
    AUCUNE: 0,
    DEMOLITION_25: 0.25,
    DEMOLITION_50: 0.5,
    DEMOLITION_75: 0.75,
    DEMOLITION_100: 1
  }
};

/**
 * Calcule l'estimation simplifiée basée sur les paramètres de base
 */
export const calculateEstimation = (formData: FormData): number => {
  console.log("Calcul d'estimation avec les données:", formData);
  
  // Extraire et normaliser les valeurs de base
  const surface = ensureNumber(formData.surface) || 100;
  const levels = ensureNumber(formData.levels) || 1;
  
  // Déterminer le prix de base par m² selon le type de projet
  let basePrice = PRICE_RATES.CONSTRUCTION.BASE;
  if (formData.constructionType === 'traditional') {
    basePrice = PRICE_RATES.CONSTRUCTION.TRADITIONAL;
  } else if (formData.constructionType === 'contemporary') {
    basePrice = PRICE_RATES.CONSTRUCTION.CONTEMPORARY;
  } else if (formData.constructionType === 'ecological') {
    basePrice = PRICE_RATES.CONSTRUCTION.ECOLOGICAL;
  }
  
  // Calculer le coût de base de la construction
  let totalCost = basePrice * surface;
  
  // Ajustement pour le nombre de niveaux (surcoût de 20% par niveau supplémentaire)
  if (levels > 1) {
    totalCost *= (1 + (levels - 1) * 0.2);
  }
  
  // Ajustement pour le type de terrain
  if (formData.terrainType) {
    const terrainType = formData.terrainType.replace(/\s+/g, '_').toUpperCase();
    const terrainRate = PRICE_RATES.TERRAIN[terrainType as keyof typeof PRICE_RATES.TERRAIN] || 100;
    totalCost += terrainRate * surface;
  }
  
  // Ajustement pour le type de mur
  if (formData.wallType) {
    const wallType = formData.wallType.replace(/\s+/g, '_').toUpperCase();
    const wallRate = PRICE_RATES.MURS[wallType as keyof typeof PRICE_RATES.MURS] || 550;
    totalCost += wallRate * surface;
  }
  
  // Ajustement pour le type de charpente
  if (formData.roofType) {
    const roofType = formData.roofType.replace(/\s+/g, '_').toUpperCase();
    const roofRate = PRICE_RATES.CHARPENTE[roofType as keyof typeof PRICE_RATES.CHARPENTE] || 120;
    totalCost += roofRate * surface;
  }
  
  // Ajustement pour le type de comble
  if (formData.atticType) {
    const atticType = formData.atticType.replace(/\s+/g, '_').toUpperCase();
    const atticRate = PRICE_RATES.COMBLES[atticType as keyof typeof PRICE_RATES.COMBLES] || 50;
    totalCost += atticRate * surface;
  }
  
  // Ajustement pour la démolition
  if (formData.demolitionType && formData.demolitionType !== "PAS DE DEMOLITION TERRAIN VIERGE") {
    const demolitionSurface = ensureNumber(formData.existingSurface) || surface;
    let demolitionRate = 0;
    
    if (formData.demolitionType === "DEMOLITION DES EXISTANTS 25%") {
      demolitionRate = PRICE_RATES.DEMOLITION.DEMOLITION_25;
    } else if (formData.demolitionType === "DEMOLITION DES EXISTANTS 50%") {
      demolitionRate = PRICE_RATES.DEMOLITION.DEMOLITION_50;
    } else if (formData.demolitionType === "DEMOLITION DES EXISTANTS 75%") {
      demolitionRate = PRICE_RATES.DEMOLITION.DEMOLITION_75;
    } else if (formData.demolitionType === "DEMOLITION DES EXISTANTS 100%") {
      demolitionRate = PRICE_RATES.DEMOLITION.DEMOLITION_100;
    }
    
    totalCost += 185 * demolitionSurface * demolitionRate;
  }
  
  // Ajustement selon le type de projet
  if (formData.projectType === 'renovation') {
    totalCost *= 0.85; // La rénovation coûte généralement moins cher que la construction neuve
  } else if (formData.projectType === 'extension') {
    totalCost *= 1.1; // Les extensions peuvent être plus complexes
  }
  
  // Arrondir et retourner le coût total
  return Math.round(totalCost);
};

/**
 * Fonction utilitaire pour obtenir une estimation sécurisée
 */
export const getSafeEstimation = (formData: FormData, fallbackValue: number = 100000): number => {
  try {
    const result = calculateEstimation(formData);
    return isNaN(result) || result <= 0 ? fallbackValue : result;
  } catch (error) {
    console.error("Erreur lors du calcul de l'estimation:", error);
    return fallbackValue;
  }
};
