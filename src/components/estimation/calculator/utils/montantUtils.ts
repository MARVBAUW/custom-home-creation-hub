
// Utility functions for montant/cost calculations

/**
 * Ensures a value is a number
 * @param value The value to convert to number
 * @param defaultValue Default value if conversion fails
 * @returns A number
 */
export function ensureNumber(value: any, defaultValue: number = 0): number {
  if (value === undefined || value === null) return defaultValue;
  
  const parsed = typeof value === 'string' ? parseFloat(value) : Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Calculates the cost of a component based on its type and surface area
 * @param componentType The type of component (standard, medium, premium)
 * @param surface Surface area in square meters
 * @param baseRate Cost per square meter for standard component
 * @param mediumRate Cost per square meter for medium component
 * @param premiumRate Cost per square meter for premium component
 * @returns The calculated cost
 */
export function calculateComponentCost(
  componentType: string,
  surface: number,
  baseRate: number,
  mediumRate: number,
  premiumRate: number
): number {
  let rate = 0;
  
  switch (componentType) {
    case 'basic':
    case 'standard':
    case 'base':
      rate = baseRate;
      break;
    case 'medium':
    case 'advanced':
    case 'milieu_de_gamme':
      rate = mediumRate;
      break;
    case 'premium':
    case 'luxury':
    case 'haut_de_gamme':
      rate = premiumRate;
      break;
    default:
      rate = baseRate;
  }
  
  return surface * rate;
}

/**
 * Calculates the electrical installation cost
 * @param electricalType Type of electrical installation
 * @param surface Surface area in square meters
 * @returns The calculated cost
 */
export function calculateElectricalCost(electricalType: string, surface: number): number {
  return calculateComponentCost(
    electricalType,
    surface,
    55, // Base rate for standard electrical
    65, // Medium rate for advanced electrical
    80  // Premium rate for high-end electrical
  );
}

/**
 * Calculates the plumbing installation cost
 * @param plumbingType Type of plumbing installation
 * @param surface Surface area in square meters
 * @returns The calculated cost
 */
export function calculatePlumbingCost(plumbingType: string, surface: number): number {
  return calculateComponentCost(
    plumbingType,
    surface,
    45, // Base rate for standard plumbing
    55, // Medium rate for advanced plumbing
    70  // Premium rate for high-end plumbing
  );
}

/**
 * Calculates the heating system cost
 * @param heatingType Type of heating system
 * @param surface Surface area in square meters
 * @returns The calculated cost
 */
export function calculateHeatingCost(heatingType: string, surface: number): number {
  let baseRate = 60; // MEILLEURS RAPPORT QUALITE PRIX / SANS AVIS
  let econoRate = 45; // LE PLUS ECONOMIQUE
  let ecoloRate = 120; // LE PLUS ECOLOGIQUE
  
  switch (heatingType) {
    case 'best_value':
    case 'sans_avis':
      return baseRate * surface;
    case 'economique':
      return econoRate * surface;
    case 'ecologique':
      return ecoloRate * surface;
    default:
      return baseRate * surface;
  }
}

/**
 * Calculates the air conditioning cost
 * @param hasAirConditioning Whether the project includes air conditioning
 * @param surface Surface area in square meters
 * @returns The calculated cost
 */
export function calculateAirConditioningCost(hasAirConditioning: boolean, surface: number): number {
  const airConditioningRate = 65; // CLIMAT
  return hasAirConditioning ? airConditioningRate * surface : 0;
}

/**
 * Calculates the plastering cost
 * @param plasteringType Type of plastering
 * @param surface Surface area in square meters
 * @returns The calculated cost
 */
export function calculatePlasteringCost(plasteringType: string, surface: number): number {
  let baseRate = 95; // PRESTATION DE BASE
  let mediumRate = 105; // PRESTATION AVEC QUELQUES SPECIFICITES
  let advancedRate = 120; // PRESTATIONS AVANCEES
  
  switch (plasteringType) {
    case 'basic':
      return baseRate * surface;
    case 'medium':
      return mediumRate * surface;
    case 'advanced':
      return advancedRate * surface;
    default:
      return baseRate * surface;
  }
}

/**
 * Calculates the interior doors and carpentry cost
 * @param doorType Type of interior doors
 * @param surface Surface area in square meters
 * @returns The calculated cost
 */
export function calculateInteriorDoorsAndCarpentry(
  doorType: string,
  hasMoldings: boolean,
  hasCustomFurniture: boolean,
  surface: number
): number {
  let baseCost = 0;
  
  // Door type cost
  switch (doorType) {
    case 'basic':
      baseCost += 50 * surface; // MEN BASE
      break;
    case 'standard':
      baseCost += 60 * surface; // MEN +
      break;
    case 'premium':
      baseCost += 70 * surface; // MEN ++
      break;
  }
  
  // Additional features
  if (hasMoldings) {
    baseCost += 10 * surface; // MOULURE
  }
  
  if (hasCustomFurniture) {
    baseCost += 20 * surface; // AMEUBLEMENT SPE
  }
  
  return baseCost;
}

/**
 * Calculates the facade cost based on percentage distribution of materials
 * @param stonePercentage Percentage of stone facade
 * @param plasterPercentage Percentage of plaster facade
 * @param brickPercentage Percentage of brick facade
 * @param metalCladdingPercentage Percentage of metal cladding
 * @param woodCladdingPercentage Percentage of wood cladding
 * @param stoneCladdingPercentage Percentage of stone cladding
 * @param surface Surface area in square meters
 * @returns The calculated cost
 */
export function calculateFacadeCost(
  stonePercentage: number = 0,
  plasterPercentage: number = 0,
  brickPercentage: number = 0,
  metalCladdingPercentage: number = 0,
  woodCladdingPercentage: number = 0,
  stoneCladdingPercentage: number = 0,
  surface: number
): number {
  const stoneCost = 180 * (stonePercentage / 100);
  const plasterCost = 65 * (plasterPercentage / 100);
  const brickCost = 120 * (brickPercentage / 100);
  const metalCladdingCost = 150 * (metalCladdingPercentage / 100);
  const woodCladdingCost = 140 * (woodCladdingPercentage / 100);
  const stoneCladdingCost = 160 * (stoneCladdingPercentage / 100);
  
  const totalCost = (stoneCost + plasterCost + brickCost + metalCladdingCost + woodCladdingCost + stoneCladdingCost) * surface;
  
  return totalCost;
}

/**
 * Calculates the cost of windows based on type and area
 * @param windowType Type of windows
 * @param area Window area in square meters
 * @returns The calculated cost
 */
export function calculateWindowsCost(windowType: string, area: number): number {
  let baseCost = 0;
  
  switch (windowType) {
    case 'standard_pvc':
      baseCost = 300;
      break;
    case 'alu':
      baseCost = 500;
      break;
    case 'bois':
      baseCost = 650;
      break;
    case 'mixte':
      baseCost = 800;
      break;
    default:
      baseCost = 300;
  }
  
  return baseCost * area;
}
