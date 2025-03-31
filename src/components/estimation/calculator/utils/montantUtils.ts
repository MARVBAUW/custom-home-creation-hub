
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

/**
 * Calculate insulation cost based on the insulation type and surface area
 * @param type Type of insulation
 * @param area Surface area to insulate in square meters
 * @returns Cost of insulation in euros
 */
export function calculateInsulationCost(type: string, area: number): number {
  switch (type) {
    case 'standard':
    case 'ISOLATION THERMIQUE REGLEMENTAIRE (BASE)':
      return 80 * area; // Base insulation cost
    case 'reinforced':
    case 'ISOLATION THERMIQUE PERFORMANTE':
      return 100 * area; // Enhanced insulation cost
    case 'passive':
    case 'ISOLATION THERMIQUE ULTRA PERFORMANTE':
      return 120 * area; // High performance insulation cost
    case 'ecological':
      return 110 * area; // Ecological materials insulation cost
    case 'renovation':
      return 90 * area; // Renovation standard insulation cost
    case 'non_concerne':
    case 'NON CONCERNE':
    default:
      return 0; // No insulation
  }
}

/**
 * Calculate facade cost based on the facade material type and surface area
 * @param materials Object containing facade materials and their percentages
 * @param area Total surface area in square meters
 * @returns Total cost of facade materials
 */
export function calculateFacadeCost(materials: Record<string, number>, area: number): number {
  let totalCost = 0;
  
  // Apply costs for each material type based on their percentage
  if (materials.PIERRE_NUE) {
    totalCost += (materials.PIERRE_NUE / 100) * area * 2.5;
  }
  
  if (materials.ENDUIT) {
    totalCost += (materials.ENDUIT / 100) * area * 0.7;
  }
  
  if (materials.BRIQUE) {
    totalCost += (materials.BRIQUE / 100) * area * 1.9;
  }
  
  if (materials.BARDAGE_METALLIQUE) {
    totalCost += (materials.BARDAGE_METALLIQUE / 100) * area * 3;
  }
  
  if (materials.BARDAGE_BOIS) {
    totalCost += (materials.BARDAGE_BOIS / 100) * area * 2.1;
  }
  
  if (materials.BARDAGE_PIERRE) {
    totalCost += (materials.BARDAGE_PIERRE / 100) * area * 3.1;
  }
  
  return totalCost;
}

/**
 * Calculate cost for windows based on the window type and area
 * @param type Type of windows (bois, pvc, alu, mixte, pvc_colore)
 * @param area Surface area of windows in square meters
 * @returns Cost of windows in euros
 */
export function calculateWindowsCost(type: string, area: number): number {
  switch (type) {
    case 'bois':
      return 650 * area;
    case 'pvc':
      return 390 * area;
    case 'alu':
      return 620 * area;
    case 'mixte':
      return 690 * area;
    case 'pvc_colore':
      return 410 * area;
    case 'sans_avis':
    case 'non_concerne':
    default:
      return 0;
  }
}

/**
 * Calculate cost for electrical installation based on the type and surface area
 * @param type Type of electrical installation
 * @param area Surface area in square meters
 * @returns Cost of electrical installation in euros
 */
export function calculateElectricalCost(type: string, area: number): number {
  switch (type) {
    case 'basic':
    case 'PRESTATION DE BASE':
      return 100 * area;
    case 'standard':
    case 'PRESTATIONS AVANCEES':
      return 125 * area;
    case 'premium':
    case 'PRESTATIONS HAUT DE GAMME':
      return 155 * area;
    case 'smart_home':
    case 'PRESTATIONS HG + DOMMOTIQUE':
      return 190 * area;
    case 'non_concerne':
    case 'NON CONCERNE':
    default:
      return 0;
  }
}

/**
 * Calculate cost for plumbing based on the plumbing type and surface area
 * @param type Type of plumbing installation
 * @param area Surface area in square meters
 * @returns Cost of plumbing in euros
 */
export function calculatePlumbingCost(type: string, area: number): number {
  switch (type) {
    case 'basic':
    case 'PRESTATIONS DE BASE':
      return 80 * area;
    case 'standard':
    case 'PRESTATIONS AVANCEES':
      return 100 * area;
    case 'premium':
    case 'PRESTATIONS HAUT DE GAMME':
      return 125 * area;
    case 'non_concerne':
    case 'NON CONCERNE':
    default:
      return 0;
  }
}

/**
 * Calculate cost for heating system based on the type and surface area
 * @param type Type of heating system
 * @param area Surface area in square meters
 * @returns Cost of heating in euros
 */
export function calculateHeatingCost(type: string, area: number): number {
  switch (type) {
    case 'standard':
    case 'MEILLEURS RAPPORT QUALITE PRIX':
    case 'SANS AVIS':
      return 60 * area;
    case 'eco':
    case 'LE PLUS ECOLOGIQUE':
      return 120 * area;
    case 'economic':
    case 'LE PLUS ECONOMIQUE':
      return 45 * area;
    case 'non_concerne':
    case 'NON CONCERNE':
    default:
      return 0;
  }
}

/**
 * Calculate cost for air conditioning based on whether it's included
 * @param hasAirConditioning Boolean indicating if air conditioning is required
 * @param area Surface area in square meters
 * @returns Cost of air conditioning in euros
 */
export function calculateAirConditioningCost(hasAirConditioning: boolean, area: number): number {
  return hasAirConditioning ? 65 * area : 0;
}

