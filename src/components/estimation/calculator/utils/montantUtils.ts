
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
