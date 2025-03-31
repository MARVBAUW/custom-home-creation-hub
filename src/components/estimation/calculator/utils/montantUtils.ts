
import { ensureNumber } from './typeConversions';

/**
 * Calculate electrical cost based on type and surface
 * @param electricalType The type of electrical installation
 * @param surface The surface area in m²
 * @returns The calculated cost
 */
export function calculateElectricalCost(electricalType: string, surface: number): number {
  // Base multipliers for different electrical types
  const multipliers: Record<string, number> = {
    standard: 55,
    advanced: 70,
    premium: 110
  };

  // Get the multiplier or use the standard one if not found
  const multiplier = multipliers[electricalType] || multipliers.standard;

  // Calculate cost based on surface and multiplier
  return surface * (multiplier / 1000);
}

/**
 * Calculate windows cost based on type and surface
 * @param windowType The type of window
 * @param surface The surface area in m²
 * @returns The calculated cost
 */
export function calculateWindowsCost(windowType: string, surface: number): number {
  // Base multipliers for different window types
  const multipliers: Record<string, number> = {
    standard: 400,
    doubleGlazing: 650,
    tripleGlazing: 950
  };

  // Get the multiplier or use the standard one if not found
  const multiplier = multipliers[windowType] || multipliers.standard;

  // Calculate cost based on surface and multiplier
  return surface * multiplier / 10;
}

/**
 * Calculate landscaping cost based on intensity and area
 * @param landscapingType The type/intensity of landscaping
 * @param area The area in m²
 * @returns The calculated cost
 */
export function calculateLandscapingCost(landscapingType: string, area: number): number {
  // Base costs per m² for different landscaping intensities
  const costsPerSqm: Record<string, number> = {
    'UN PEU': 23,
    'BEAUCOUP': 42,
    'PASSIONNEMENT': 60
  };

  // Get the cost per m² or use a default if not found
  const costPerSqm = costsPerSqm[landscapingType] || 0;

  // Calculate total cost
  return area * costPerSqm;
}

/**
 * Calculate fencing cost based on length
 * @param length The length in meters
 * @returns The calculated cost
 */
export function calculateFencingCost(length: number): number {
  const costPerMeter = 85;
  return length * costPerMeter;
}

/**
 * Calculate gate cost based on length
 * @param length The length in meters
 * @returns The calculated cost
 */
export function calculateGateCost(length: number): number {
  const costPerMeter = 1450;
  return length * costPerMeter;
}

/**
 * Calculate terrace cost based on area
 * @param area The area in m²
 * @returns The calculated cost
 */
export function calculateTerraceCost(area: number): number {
  const costPerSqm = 90;
  return area * costPerSqm;
}

/**
 * Calculate pool cost based on type and area
 * @param poolType The type of pool
 * @param area The area in m²
 * @returns The calculated cost
 */
export function calculatePoolCost(poolType: string, area: number): number {
  // Base costs per m² for different pool types
  const costsPerSqm: Record<string, number> = {
    'COQUE POLYESTER': 880,
    'BETON': 1350,
    'PISCINE LAGON (HORS AMENAGEMENT PAYSAGER)': 1950
  };

  // Get the cost per m² or use a default if not found
  const costPerSqm = costsPerSqm[poolType] || 0;

  // Calculate total cost
  return area * costPerSqm;
}

/**
 * Calculate pool heating cost based on area
 * @param area The area in m²
 * @returns The calculated cost
 */
export function calculatePoolHeatingCost(area: number): number {
  const costPerSqm = 120;
  return area * costPerSqm;
}

/**
 * Calculate jacuzzi cost based on type and area
 * @param jacuzziType The type of jacuzzi
 * @param area The area in m²
 * @returns The calculated cost
 */
export function calculateJacuzziCost(jacuzziType: string, area: number): number {
  // Base costs per m² for different jacuzzi types
  const costsPerSqm: Record<string, number> = {
    'BASE': 1500,
    'PLUS': 2750,
    'PREMIUM': 3550
  };

  // Get the cost per m² or use a default if not found
  const costPerSqm = costsPerSqm[jacuzziType] || 0;

  // Calculate total cost
  return area * costPerSqm;
}

/**
 * Calculate carport cost based on type
 * @param carportType The type of carport
 * @returns The calculated cost
 */
export function calculateCarportCost(carportType: string): number {
  // Fixed costs for different carport types
  const costs: Record<string, number> = {
    'SIMPLE': 4800,
    'DOUBLE': 6700
  };

  // Get the cost or return 0 if not found
  return costs[carportType] || 0;
}

/**
 * Calculate plumbing cost based on type and surface
 * @param plumbingType The type of plumbing
 * @param surface The surface area in m²
 * @returns The calculated cost
 */
export function calculatePlumbingCost(plumbingType: string, surface: number): number {
  // Base costs for different plumbing types per m²
  const costsPerSqm: Record<string, number> = {
    'base': 45,
    'advanced': 65,
    'premium': 90
  };

  // Get the cost per m² or use a default if not found
  const costPerSqm = costsPerSqm[plumbingType] || costsPerSqm.base;

  // Calculate total cost
  return surface * costPerSqm / 10;
}

/**
 * Calculate renewable energy cost based on type and current amount
 * @param renewableType The type of renewable energy solution
 * @param currentAmount The current cost amount
 * @returns The additional cost for renewable energy
 */
export function calculateRenewableEnergyCost(renewableType: string, currentAmount: number): number {
  // Percentage multipliers for different renewable energy options
  const percentages: Record<string, number> = {
    'OPTIMISATION ENERGETIQUE': 0.035,
    'SEMI AUTONOMIE ENERGETIQUE': 0.07,
    'AUTONOMIE ENERGETIQUE': 0.11
  };

  // Get the percentage or return 0 if not found
  const percentage = percentages[renewableType] || 0;

  // Calculate additional cost based on current amount and percentage
  return currentAmount * percentage;
}

/**
 * Calculate environmental solutions cost based on preference level and current amount
 * @param environmentalType The type/level of environmental solutions
 * @param currentAmount The current cost amount
 * @returns The additional cost for environmental solutions
 */
export function calculateEnvironmentalSolutionsCost(environmentalType: string, currentAmount: number): number {
  // Percentage multipliers for different environmental solution levels
  const percentages: Record<string, number> = {
    'OUI SI POSSIBLE DANS MON BUDGET': 0.018,
    'MOYENNEMENT SOUHAITE': 0.038,
    'FORTEMENT SOUHAITE': 0.057
  };

  // Get the percentage or return 0 if not found
  const percentage = percentages[environmentalType] || 0;

  // Calculate additional cost based on current amount and percentage
  return currentAmount * percentage;
}

/**
 * Calculate painting cost based on type, percentage and surface
 * @param paintType The type of paint
 * @param percentage The percentage of surface covered
 * @param surface The total surface area in m²
 * @returns The calculated cost
 */
export function calculatePaintingCost(paintType: string, percentage: number, surface: number): number {
  // Base costs per m² for different paint types
  const costsPerSqm: Record<string, number> = {
    'PEINTURE BASE': 0.58,
    'PEINTURE DECORATIVE': 0.606,
    'PAPIER PEINT': 0.6,
    'REVETEMENT MURAUX BOIS AJOURE': 1.3,
    'REVETEMENTS MURAUX TYPE PIERRE NATURELLE': 1.9
  };

  // Get the cost per m² or use a default if not found
  const costPerSqm = costsPerSqm[paintType] || 0;

  // Calculate cost based on percentage of surface and cost per m²
  return (percentage / 100) * surface * costPerSqm;
}

/**
 * Calculate kitchen cost based on type and unit count
 * @param kitchenType The type of kitchen
 * @param unitCount Number of units/apartments
 * @returns The calculated cost
 */
export function calculateKitchenCost(kitchenType: string, unitCount: number): number {
  // Base costs for different kitchen types
  const baseCosts: Record<string, number> = {
    'KITCHENETTE': 2700,
    'CUISINE DE BASE': 8500,
    'CUISINE +': 13500,
    'CUISINIE PREMIUM': 19000,
    'SANS CUISINE': 0
  };

  // Get the base cost or return 0 if not found
  const baseCost = baseCosts[kitchenType] || 0;

  // Calculate total cost based on number of units
  return baseCost * unitCount;
}

/**
 * Calculate bathroom cost based on type and count
 * @param bathroomType The type of bathroom
 * @param count Number of bathrooms
 * @returns The calculated cost
 */
export function calculateBathroomCost(bathroomType: string, count: number): number {
  // Base costs for different bathroom types
  const baseCosts: Record<string, number> = {
    'BASE': 2000,
    'MILIEU DE GAMME': 3150,
    'PREMIUM': 4200,
    'SANS OBJET': 0,
    'NON CONCERNE': 0
  };

  // Get the base cost or return 0 if not found
  const baseCost = baseCosts[bathroomType] || 0;

  // Calculate total cost based on count
  return baseCost * count;
}

/**
 * Calculate demolition cost based on type, area and percentage
 * @param demolitionType The type of element to demolish
 * @param area The surface area
 * @param percentage The percentage to demolish
 * @returns The calculated cost
 */
export function calculateDemolitionCost(demolitionType: string, area: number, percentage: number): number {
  // Base costs per m² for different demolition types
  const costsPerSqm: Record<string, number> = {
    'REVETEMENT DE FACADE': 0.65,
    'PLATRERIE': 0.19,
    'REVETEMENTS DE SOL': 0.25,
    'MENUISERIES INTERIEURES': 0.1,
    'MENUISERIES EXTERIEURES': 0.08,
    'PLOMBERIE': 0.17,
    'EQUIPEMENTS SANITAIRES': 0.08,
    'ELECTRICITE': 0.18,
    'CLIMATISATION': 0.06,
    'VENTILATION': 0.06,
    'CHAUFFAGE': 0.12,
    'TOTALITE HORS GROS OEUVRE': 193
  };

  // Get the cost per m² or return 0 if not found
  const costPerSqm = costsPerSqm[demolitionType] || 0;

  // For "TOTALITE HORS GROS OEUVRE", we don't apply percentage
  if (demolitionType === 'TOTALITE HORS GROS OEUVRE') {
    return area * costPerSqm;
  }

  // Calculate cost based on area, percentage and cost per m²
  return area * (percentage / 100) * costPerSqm;
}

/**
 * Calculate masonry wall cost
 * @param area The wall area in m²
 * @returns The calculated cost
 */
export function calculateMasonryWallCost(area: number): number {
  const costPerSqm = 120;
  return area * costPerSqm;
}

/**
 * Calculate floor construction cost based on type and area
 * @param floorType The type of floor (wood or concrete)
 * @param area The floor area in m²
 * @returns The calculated cost
 */
export function calculateFloorCost(floorType: string, area: number): number {
  // Costs per m² for different floor types
  const costsPerSqm: Record<string, number> = {
    'BOIS': 80,
    'BETON': 120
  };

  // Get the cost per m² or return 0 if not found
  const costPerSqm = costsPerSqm[floorType] || 0;

  // Calculate cost
  return area * costPerSqm;
}

/**
 * Calculate structural work specific feature cost
 * @param featureType The type of structural feature
 * @param value The quantity (length, area, or count)
 * @returns The calculated cost
 */
export function calculateStructuralFeatureCost(featureType: string, value: number): number {
  // Costs for different structural features
  const featureCosts: Record<string, number> = {
    'RESEAUX EVACUATION A REPRENDRE / TRANCHEE / REBOUCHAGE': 120, // per ml
    'DEMOLITION MUR PORTEUR': 120, // per m²
    'POSE D\'UN IPN': 850, // per ml
    'OUVERTURE EN FACADE/MUR PORTEUR': 120, // per m²
    'CREATION D\'UNE TREMIE* (ouverture dans un plancher pour accéder à un étage supérieur)': 90, // per m²
    'FONDATION SEMELLE': 80, // per ml
    'FONDATION MASSIF': 110, // per unit
    'CHAPE': 22, // per m²
    'RACCORDEMENT SANTAIRE RESEAU URBAIN': 145 // per ml
  };

  // Get the cost or return 0 if not found
  const cost = featureCosts[featureType] || 0;

  // Calculate total cost
  return cost * value;
}

/**
 * Ensure a value is a number for calculations
 * @param value The value to convert
 * @param defaultValue The default value to use if conversion fails
 * @returns A number
 */
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (value === undefined || value === null) return defaultValue;
  
  const parsed = typeof value === 'string' ? parseFloat(value) : Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};
