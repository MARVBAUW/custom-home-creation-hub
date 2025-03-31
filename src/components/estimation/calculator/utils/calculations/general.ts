
import { ensureNumber } from '../typeConversions';

/**
 * Calculate a new total amount by adding a cost
 */
export const calculateNewMontantT = (currentTotal: number | undefined, additionalCost: number): number => {
  const currentAmount = ensureNumber(currentTotal, 0);
  return currentAmount + additionalCost;
};

/**
 * Calculate component costs for various construction components
 */
export const calculateComponentCost = (area: number, ratePerSquareMeter: number): number => {
  return ratePerSquareMeter * ensureNumber(area);
};

/**
 * Calculate kitchen costs
 */
export const calculateKitchenCost = (type: string): number => {
  switch (type) {
    case 'standard': return 5000;
    case 'premium': return 10000;
    case 'luxury': return 20000;
    default: return 0;
  }
};

/**
 * Calculate bathroom costs
 */
export const calculateBathroomCost = (type: string, count: number): number => {
  const costPerBathroom = getBathroomCostPerUnit(type);
  return costPerBathroom * count;
};

/**
 * Get cost per unit for different bathroom types
 */
const getBathroomCostPerUnit = (type: string): number => {
  switch (type) {
    case 'standard': return 3500;
    case 'premium': return 6000;
    case 'luxury': return 10000;
    default: return 0;
  }
};

/**
 * Calculate renewable energy installation costs
 */
export const calculateRenewableEnergyCost = (type: string, area: number): number => {
  switch (type) {
    case 'solar': return 300 * area;
    case 'geothermal': return 10000 + (100 * area);
    case 'windmill': return 15000;
    default: return 0;
  }
};

/**
 * Calculate environmental solutions costs
 */
export const calculateEnvironmentalSolutionsCost = (type: string): number => {
  switch (type) {
    case 'rainwater': return 3000;
    case 'greywater': return 5000;
    case 'greenroof': return 8000;
    default: return 0;
  }
};
