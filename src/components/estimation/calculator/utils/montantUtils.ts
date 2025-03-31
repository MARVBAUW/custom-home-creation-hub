
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
