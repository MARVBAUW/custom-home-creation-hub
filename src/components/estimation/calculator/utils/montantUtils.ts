
import { FormData } from '../types/formTypes';
import { ensureNumber } from './typeConversions';
import { 
  calculateRoofingCost as calcRoofingCost,
  calculateRoofingRenovCost as calcRoofingRenovCost,
  calculateRoofFrameworkRenovCost as calcRoofFrameworkRenovCost,
  calculateFacadeCost as calcFacadeCost,
  calculateDetailedFacadeCost as calcDetailedFacadeCost
} from './calculations/exterior';

// Export ensureNumber for usage in components
export { ensureNumber };

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
export const calculateGateCost = (length: number, type: string = 'standard'): number => {
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
export const calculateWindowsCost = (type: string = 'standard', area: number): number => {
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
export const calculateInsulationCost = (type: string = 'standard', area: number): number => {
  const costPerSquareMeter = {
    'standard': 40,
    'premium': 60,
    'ecological': 75,
    'highPerformance': 90
  }[type] || 50;
  
  return costPerSquareMeter * area;
};

// Add additional calculation functions that were missing
export const calculateElectricityCost = (type: string = 'standard', size: number): number => {
  const costPerSquareMeter = {
    'basic': 40,
    'standard': 60, 
    'premium': 85,
    'smart': 120
  }[type] || 60;
  
  return costPerSquareMeter * size;
};

export const calculatePlumbingCost = (type: string = 'standard', size: number): number => {
  const costPerSquareMeter = {
    'basic': 35,
    'standard': 50, 
    'premium': 75
  }[type] || 50;
  
  return costPerSquareMeter * size;
};

export const calculateHeatingCost = (type: string = 'standard', size: number): number => {
  const costPerSquareMeter = {
    'electric': 45,
    'gas': 65,
    'heatPump': 120,
    'geothermal': 180
  }[type] || 65;
  
  return costPerSquareMeter * size;
};

export const calculateAirConditioningCost = (type: string = 'standard', size: number): number => {
  const costPerSquareMeter = {
    'split': 80,
    'central': 150,
    'premium': 200
  }[type] || 80;
  
  return costPerSquareMeter * size;
};

export const calculateParquetCost = (type: string = 'standard', area: number): number => {
  const costPerSquareMeter = {
    'basic': 45,
    'standard': 75,
    'premium': 120,
    'luxury': 180
  }[type] || 75;
  
  return costPerSquareMeter * area;
};

export const calculateSoftFloorCost = (type: string = 'standard', area: number): number => {
  const costPerSquareMeter = {
    'vinyl': 25,
    'carpet': 40,
    'linoleum': 35,
    'premium': 70
  }[type] || 35;
  
  return costPerSquareMeter * area;
};

export const calculatePlasteringCost = (type: string = 'standard', area: number): number => {
  const costPerSquareMeter = {
    'basic': 25,
    'standard': 35,
    'premium': 50
  }[type] || 35;
  
  return costPerSquareMeter * area;
};

export const calculateInteriorCarpenteryCost = (type: string = 'standard', units: number): number => {
  const costPerUnit = {
    'basic': 500,
    'standard': 800,
    'premium': 1200,
    'luxury': 2000
  }[type] || 800;
  
  return costPerUnit * units;
};

export const calculatePaintingCost = (type: string = 'standard', area: number): number => {
  const costPerSquareMeter = {
    'basic': 20,
    'standard': 30,
    'premium': 50,
    'decorative': 80
  }[type] || 30;
  
  return costPerSquareMeter * area;
};

export const calculateFloorTilingCost = (type: string = 'standard', area: number): number => {
  const costPerSquareMeter = {
    'ceramic': 60,
    'porcelain': 80,
    'natural': 150,
    'luxury': 250
  }[type] || 80;
  
  return costPerSquareMeter * area;
};

export const calculateWallTilingCost = (type: string = 'standard', area: number): number => {
  const costPerSquareMeter = {
    'ceramic': 50,
    'porcelain': 70,
    'glass': 130,
    'mosaic': 200
  }[type] || 70;
  
  return costPerSquareMeter * area;
};

export const calculateDemolitionCost = (type: string = 'standard', area: number): number => {
  const costPerSquareMeter = {
    'light': 50,
    'standard': 90,
    'heavy': 150,
    'structural': 250
  }[type] || 90;
  
  return costPerSquareMeter * area;
};

export const calculateMasonryWallCost = (type: string = 'standard', area: number): number => {
  const costPerSquareMeter = {
    'brick': 180,
    'block': 120,
    'concrete': 150,
    'stone': 350
  }[type] || 150;
  
  return costPerSquareMeter * area;
};

export const calculateFloorCost = (type: string = 'standard', area: number): number => {
  const costPerSquareMeter = {
    'wood': 150,
    'concrete': 180,
    'composite': 220
  }[type] || 180;
  
  return costPerSquareMeter * area;
};

export const calculateStructuralFeatureCost = (feature: string, quantity: number): number => {
  const unitCosts: Record<string, number> = {
    'beam': 800,
    'column': 600,
    'foundation': 1200,
    'slab': 250,
    'wall': 350
  };
  
  return (unitCosts[feature] || 500) * quantity;
};

export const calculateLandscapingCost = (type: string = 'standard', area: number): number => {
  const costPerSquareMeter = {
    'basic': 30,
    'standard': 50,
    'premium': 100,
    'luxury': 200
  }[type] || 50;
  
  return costPerSquareMeter * area;
};

export const calculateFencingCost = (type: string = 'standard', length: number): number => {
  const costPerMeter = {
    'wire': 50,
    'wood': 100,
    'metal': 150,
    'brick': 250
  }[type] || 100;
  
  return costPerMeter * length;
};

export const calculateTerraceCost = (type: string = 'standard', area: number): number => {
  const costPerSquareMeter = {
    'concrete': 100,
    'wood': 150,
    'composite': 220,
    'stone': 300
  }[type] || 150;
  
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

