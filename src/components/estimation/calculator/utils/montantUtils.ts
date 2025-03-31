
import { FormData } from '../types/formTypes';
import { ensureNumber } from './typeConversions';
import { 
  calculateRoofingCost as calcRoofingCost,
  calculateRoofingRenovCost as calcRoofingRenovCost,
  calculateRoofFrameworkRenovCost as calcRoofFrameworkRenovCost,
  calculateFacadeCost as calcFacadeCost,
  calculateDetailedFacadeCost as calcDetailedFacadeCost
} from './calculations/exterior';

/**
 * Calculate kitchen cost based on quality and size
 */
export const calculateKitchenCost = (quality: string, size: number): number => {
  const basePrice = {
    'basic': 300,
    'standard': 600,
    'premium': 1200,
    'luxury': 2000
  }[quality] || 600;
  
  return basePrice * size;
};

/**
 * Calculate bathroom cost based on quality and count
 */
export const calculateBathroomCost = (quality: string, count: number): number => {
  const basePrice = {
    'basic': 2000,
    'standard': 4000,
    'premium': 8000,
    'luxury': 15000
  }[quality] || 4000;
  
  return basePrice * count;
};

/**
 * Calculate environmental solutions cost
 */
export const calculateEnvironmentalSolutionsCost = (solutions: string[]): number => {
  const prices: Record<string, number> = {
    'solar': 10000,
    'geothermal': 20000,
    'rainwater': 5000,
    'greenRoof': 8000,
    'trippleGlazing': 6000,
    'heatPump': 9000,
    'smartHome': 4000
  };
  
  return solutions.reduce((total, solution) => total + (prices[solution] || 0), 0);
};

/**
 * Calculate renewable energy cost
 */
export const calculateRenewableEnergyCost = (type: string, size: number): number => {
  const basePrices: Record<string, number> = {
    'solar': 800,
    'geothermal': 1500,
    'heatPump': 1000,
    'biomass': 700
  };
  
  return (basePrices[type] || 800) * size;
};

/**
 * Calculate gate cost
 */
export const calculateGateCost = (length: number, type: string): number => {
  const basePrice = {
    'metal': 250,
    'wood': 150,
    'composite': 200,
    'automatic': 400
  }[type] || 200;
  
  return basePrice * length;
};

/**
 * Convert string percentage to number for calculations
 */
export const percentageToNumber = (value: string | number | undefined): number => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  
  // Remove % sign if present
  const cleanValue = value.toString().replace('%', '').trim();
  return parseFloat(cleanValue) || 0;
};

/**
 * Calculate windows cost
 */
export const calculateWindowsCost = (type: string, area: number): number => {
  const costPerSquareMeter = {
    'pvc': 350,
    'aluminum': 500,
    'wood': 600,
    'steel': 550
  }[type] || 400;
  
  return costPerSquareMeter * area;
};

/**
 * Calculate insulation cost
 */
export const calculateInsulationCost = (type: string, area: number): number => {
  const costPerSquareMeter = {
    'standard': 40,
    'premium': 60,
    'ecological': 75,
    'highPerformance': 90
  }[type] || 50;
  
  return costPerSquareMeter * area;
};

/**
 * Re-export facade calculation functions
 */
export const calculateFacadeCost = calcFacadeCost;
export const calculateDetailedFacadeCost = calcDetailedFacadeCost;
export const calculateRoofingCost = calcRoofingCost;
export const calculateRoofingRenovCost = calcRoofingRenovCost;
export const calculateRoofFrameworkRenovCost = calcRoofFrameworkRenovCost;

/**
 * Calculate new total amount with a new cost component
 */
export const calculateNewMontantT = (currentMontantT: number | undefined, additionalCost: number): number => {
  const current = currentMontantT || 0;
  return current + additionalCost;
};

