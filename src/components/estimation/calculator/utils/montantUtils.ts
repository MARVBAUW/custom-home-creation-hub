
// Import the ensureNumber function from typeConversions to re-export it
import { ensureNumber } from './typeConversions';

// Re-export the ensureNumber function
export { ensureNumber };

/**
 * Calculates the additional cost for interior carpentry based on chosen options
 * 
 * @param doorType Type of interior doors
 * @param hasMoldings Whether moldings are included
 * @param hasCustomFurniture Whether custom furniture is included
 * @param surface Surface area in square meters
 * @returns Additional cost in euros
 */
export function calculateInteriorCarpenteryCost(
  doorType: string,
  hasMoldings: boolean,
  hasCustomFurniture: boolean,
  surface: number
): number {
  let doorCost = 0;
  
  // Cost calculation for door type
  switch (doorType) {
    case 'base':
      doorCost = 90 * surface / 10; // Standard doors cost
      break;
    case 'standing':
      doorCost = 120 * surface / 10; // Quality doors cost
      break;
    case 'premium':
      doorCost = 180 * surface / 10; // High-end doors cost
      break;
    default:
      doorCost = 0;
  }
  
  // Add cost for moldings if selected
  const moldingsCost = hasMoldings ? 30 * surface / 10 : 0;
  
  // Add cost for custom furniture if selected
  const customFurnitureCost = hasCustomFurniture ? 180 * surface / 10 : 0;
  
  // Return total carpentry cost
  return doorCost + moldingsCost + customFurnitureCost;
}

/**
 * Calculate cost for carpentry or roof renovation
 * @param type Type of roof structure
 * @param area Surface area to renovate
 */
export function calculateRoofFrameworkCost(type: string, area: number): number {
  switch (type) {
    case 'CHARPENTE TRADITIONNELLE':
      return 185 * area;
    case 'CHARPENTE INDUSTRIELLE':
      return 160 * area;
    case 'TOITURE TERRASSE ACCESSIBLE':
      return 190 * area;
    case 'TOITURE TERRASSE INACCESSIBLE':
      return 180 * area;
    case 'NON CONCERNE':
    default:
      return 0;
  }
}

/**
 * Calculate cost for roofing renovation
 * @param type Type of roofing
 * @param area Surface area to renovate
 */
export function calculateRoofingCost(type: string, area: number): number {
  switch (type) {
    case 'TUILE PLATE':
      return 125 * area;
    case 'TUILE RONDE':
      return 130 * area;
    case 'ARDOISE':
      return 180 * area;
    case 'ZINC JOINT DEBOUT':
      return 200 * area;
    case 'TOIT DE CHAUME':
      return 250 * area;
    case 'BAC ACIER':
      return 115 * area;
    case 'ETANCHEITE BITUME (TOITURE PLATE)':
      return 125 * area;
    case 'TOITURE VEGETALISE (TOITURE PLATE)':
      return 186 * area;
    case 'TOITURE GRAVILLONNEE (TOITURE PLATE)':
      return 145 * area;
    case 'NON CONCERNE':
    default:
      return 0;
  }
}
