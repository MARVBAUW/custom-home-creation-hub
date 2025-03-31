
/**
 * Utility functions for calculating various costs in the estimation calculator
 */

/**
 * Calculate the cost of electrical installation based on the chosen type and surface area
 * @param electricalType The type of electrical installation
 * @param surface The surface area in square meters
 * @returns The calculated cost
 */
export const calculateElectricalCost = (electricalType: string, surface: number): number => {
  switch (electricalType) {
    case 'base':
      return surface * 100; // PRESTATION DE BASE
    case 'advanced':
      return surface * 125; // PRESTATIONS AVANCEES
    case 'premium':
      return surface * 155; // PRESTATIONS HAUT DE GAMME
    case 'domotique':
      return surface * 190; // PRESTATIONS HG + DOMMOTIQUE
    default:
      return surface * 100; // Default to base
  }
};

/**
 * Calculate the cost of plumbing based on the chosen type and surface area
 * @param plumbingType The type of plumbing
 * @param surface The surface area in square meters
 * @returns The calculated cost
 */
export const calculatePlumbingCost = (plumbingType: string, surface: number): number => {
  switch (plumbingType) {
    case 'base':
      return surface * 80; // PRESTATIONS DE BASE
    case 'advanced':
      return surface * 100; // PRESTATIONS AVANCEES
    case 'premium':
      return surface * 125; // PRESTATIONS HAUT DE GAMME
    default:
      return surface * 80; // Default to base
  }
};

/**
 * Calculate the cost of windows based on the chosen type and window area
 * @param windowType The type of windows
 * @param windowArea The window area in square meters
 * @returns The calculated cost
 */
export const calculateWindowsCost = (windowType: string, windowArea: number): number => {
  switch (windowType) {
    case 'bois':
      return windowArea * 650; // BOIS
    case 'pvc':
      return windowArea * 390; // PVC
    case 'alu':
      return windowArea * 620; // ALU
    case 'mixte':
      return windowArea * 690; // MIXTE BOIS ALU
    case 'pvcColore':
      return windowArea * 410; // PVC COLORE
    default:
      return windowArea * 500; // Default to average
  }
};

/**
 * Helper function to ensure a value is converted to a number
 * @param value The value to convert
 * @param defaultValue The default value if conversion fails
 * @returns The converted number
 */
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  return defaultValue;
};

/**
 * Calculate a component cost based on surface area and rate per m²
 * @param surface The surface area
 * @param ratePerSqm The rate per square meter
 * @returns The calculated cost
 */
export const calculateComponentCost = (surface: number | string, ratePerSqm: number): number => {
  const surfaceNum = ensureNumber(surface, 0);
  return surfaceNum * ratePerSqm;
};

/**
 * Calculate new total cost by adding a component cost to current total
 * @param currentTotal The current total cost
 * @param componentCost The cost to add
 * @returns The new total cost
 */
export const calculateNewMontantT = (currentTotal: number = 0, componentCost: number): number => {
  return (currentTotal || 0) + componentCost;
};

/**
 * Calculate facade cost based on surface percentages and rates
 * @param formData The form data
 * @param stonePercentage Percentage of stone facade
 * @param plasterPercentage Percentage of plaster facade
 * @param brickPercentage Percentage of brick facade
 * @param metalCladdingPercentage Percentage of metal cladding
 * @param woodCladdingPercentage Percentage of wood cladding
 * @param stoneCladdingPercentage Percentage of stone cladding
 * @returns The calculated facade cost
 */
export const calculateFacadeCost = (
  formData: any,
  stonePercentage: number | string,
  plasterPercentage: number | string,
  brickPercentage: number | string,
  metalCladdingPercentage: number | string,
  woodCladdingPercentage: number | string,
  stoneCladdingPercentage: number | string
): number => {
  const surface = ensureNumber(formData.surface, 0);
  
  // Convert percentages to numbers and divide by 100 to get ratios
  const stoneRatio = ensureNumber(stonePercentage, 0) / 100;
  const plasterRatio = ensureNumber(plasterPercentage, 0) / 100;
  const brickRatio = ensureNumber(brickPercentage, 0) / 100;
  const metalRatio = ensureNumber(metalCladdingPercentage, 0) / 100;
  const woodRatio = ensureNumber(woodCladdingPercentage, 0) / 100;
  const stoneCladdingRatio = ensureNumber(stoneCladdingPercentage, 0) / 100;
  
  // Rates per m² for different facade types
  const stoneRate = 2.5; // Stone facade rate
  const plasterRate = 0.7; // Plaster facade rate
  const brickRate = 1.8; // Brick facade rate
  const metalRate = 3.0; // Metal cladding rate
  const woodRate = 2.1; // Wood cladding rate
  const stoneCladdingRate = 3.1; // Stone cladding rate
  
  // Calculate costs for each facade type
  const stoneCost = surface * stoneRatio * stoneRate;
  const plasterCost = surface * plasterRatio * plasterRate;
  const brickCost = surface * brickRatio * brickRate;
  const metalCost = surface * metalRatio * metalRate;
  const woodCost = surface * woodRatio * woodRate;
  const stoneCladCost = surface * stoneCladdingRatio * stoneCladdingRate;
  
  // Return total facade cost
  return stoneCost + plasterCost + brickCost + metalCost + woodCost + stoneCladCost;
};
