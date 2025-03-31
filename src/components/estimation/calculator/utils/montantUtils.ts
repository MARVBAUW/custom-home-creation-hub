
/**
 * Utility functions for calculating costs in the estimation forms
 */

import { ensureNumber, ensureBoolean, ensureStringArray } from './typeConversions';

// Base cost factors
const BASE_FACTORS = {
  ELECTRICAL: 50, // €/m²
  PLUMBING: 80, // €/m²
  HEATING: 70, // €/m²
  AIR_CONDITIONING: 120, // €/m²
  INSULATION: 45, // €/m²
  WINDOWS: 600, // €/window
  DOORS: 800, // €/door
  INTERIOR_DOORS: 350, // €/door
  PLASTERING: 30, // €/m²
  PAINTING: 25, // €/m²
  PARQUET: 60, // €/m²
  SOFT_FLOOR: 40, // €/m²
  TILING: 80, // €/m²
  MASONRY: 200, // €/m²
  CARPENTRY: 180, // €/m²
  ROOFING: 150, // €/m²
  BASEMENT: 400, // €/m²
  FACADE: 120, // €/m²
  POOL: 800, // €/m²
  POOL_HEATING: 5000, // €
  JACUZZI: 10000, // € base price
  CARPORT: 250, // €/m²
  GATE: 3000, // € base price
  FENCING: 150, // €/m
  TERRACE: 120, // €/m²
  LANDSCAPING: 50, // €/m²
  RENEWABLE_ENERGY: 12000, // € base price for solar panels
  GEOTHERMAL: 20000, // € base price
  ENVIRONMENTAL_SOLUTIONS: 5000, // € base price for water recovery
};

// Quality multipliers
const QUALITY_MULTIPLIER = {
  BASIC: 0.8,
  STANDARD: 1.0,
  PREMIUM: 1.5,
  LUXURY: 2.2,
};

// Complexity multipliers
const COMPLEXITY_MULTIPLIER = {
  SIMPLE: 0.9,
  MEDIUM: 1.0,
  COMPLEX: 1.3,
  VERY_COMPLEX: 1.6,
};

/**
 * Calculate electrical system cost
 */
export const calculateElectricalCost = (surface: number | string, quality: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  const basePrice = BASE_FACTORS.ELECTRICAL * surfaceNum;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate plumbing system cost
 */
export const calculatePlumbingCost = (surface: number | string, quality: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  const basePrice = BASE_FACTORS.PLUMBING * surfaceNum;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate heating system cost
 */
export const calculateHeatingCost = (type: string = 'standard', surface: number | string = 0, quality: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let basePrice = BASE_FACTORS.HEATING * surfaceNum;
  
  // Adjust based on heating type
  if (type === 'eco' || type === 'FLOOR_HEATING') {
    basePrice *= 1.5;
  } else if (type === 'economic' || type === 'HEAT_PUMP') {
    basePrice *= 1.2;
  } else if (type === 'standard' || type === 'CENTRAL') {
    basePrice *= 1.0;
  } else if (type === 'sans_avis' || type === 'non_concerne') {
    basePrice *= 0.8;
  }
  
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate air conditioning cost
 */
export const calculateAirConditioningCost = (hasAirConditioning: boolean | string = false, surface: number | string = 0): number => {
  const surfaceNum = ensureNumber(surface, 0);
  const hasAC = ensureBoolean(hasAirConditioning, false);
  
  if (!hasAC) return 0;
  
  const basePrice = BASE_FACTORS.AIR_CONDITIONING * surfaceNum;
  return Math.round(basePrice);
};

/**
 * Calculate insulation cost
 */
export const calculateInsulationCost = (surface: number | string, quality: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  const basePrice = BASE_FACTORS.INSULATION * surfaceNum;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate windows cost
 */
export const calculateWindowsCost = (quantity: number | string, type: string = 'STANDARD', quality: string = 'STANDARD'): number => {
  const quantityNum = ensureNumber(quantity, 0);
  let basePrice = BASE_FACTORS.WINDOWS * quantityNum;
  
  // Adjust based on window type
  if (type === 'ALUMINUM') {
    basePrice *= 1.3;
  } else if (type === 'WOOD') {
    basePrice *= 1.5;
  } else if (type === 'PVC') {
    basePrice *= 0.9;
  }
  
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate interior carpentry cost (doors, etc.)
 */
export const calculateInteriorCarpenteryCost = (doorCount: number | string, quality: string = 'STANDARD'): number => {
  const doorCountNum = ensureNumber(doorCount, 0);
  const basePrice = BASE_FACTORS.INTERIOR_DOORS * doorCountNum;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate plastering cost
 */
export const calculatePlasteringCost = (surface: number | string, quality: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  const basePrice = BASE_FACTORS.PLASTERING * surfaceNum;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate painting cost
 */
export const calculatePaintingCost = (surface: number | string, quality: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  const basePrice = BASE_FACTORS.PAINTING * surfaceNum;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate parquet flooring cost
 */
export const calculateParquetCost = (surface: number | string, quality: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  const basePrice = BASE_FACTORS.PARQUET * surfaceNum;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate soft flooring cost (carpet, vinyl, etc.)
 */
export const calculateSoftFloorCost = (surface: number | string, quality: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  const basePrice = BASE_FACTORS.SOFT_FLOOR * surfaceNum;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate floor tiling cost
 */
export const calculateFloorTilingCost = (surface: number | string, quality: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  const basePrice = BASE_FACTORS.TILING * surfaceNum;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate wall tiling cost
 */
export const calculateWallTilingCost = (surface: number | string, quality: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  // Wall tiling is usually a bit more expensive than floor
  const basePrice = (BASE_FACTORS.TILING * 1.2) * surfaceNum;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate masonry wall cost
 */
export const calculateMasonryWallCost = (surface: number | string, quality: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  const basePrice = BASE_FACTORS.MASONRY * surfaceNum;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate floor structural cost
 */
export const calculateFloorCost = (surface: number | string, type: string = 'CONCRETE', quality: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let basePrice = BASE_FACTORS.MASONRY * surfaceNum * 0.7; // Floor is typically cheaper than walls
  
  // Adjust based on floor type
  if (type === 'WOOD' || type === 'BOIS') {
    basePrice *= 0.8;
  } else if (type === 'CONCRETE' || type === 'BETON') {
    basePrice *= 1.0;
  }
  
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate structural feature cost
 */
export const calculateStructuralFeatureCost = (
  features: string | string[],
  surface: number | string,
  featureValues: Record<string, string | number> = {}
): number => {
  let totalCost = 0;
  const surfaceNum = ensureNumber(surface, 0);
  const featuresArray = ensureStringArray(features);
  
  if (!featuresArray || featuresArray.length === 0) return 0;
  
  featuresArray.forEach(feature => {
    const featureValue = ensureNumber(featureValues[feature], 0);
    
    switch (feature) {
      case 'beam':
        totalCost += 2000 + (featureValue * 200);
        break;
      case 'column':
        totalCost += 1500 + (featureValue * 300);
        break;
      case 'arch':
        totalCost += 3000 + (featureValue * 500);
        break;
      case 'staircaseRenovation':
        totalCost += 5000 + (featureValue * 1000);
        break;
      default:
        totalCost += 1000; // Default cost for unknown features
    }
  });
  
  return Math.round(totalCost);
};

/**
 * Calculate roofing cost
 */
export const calculateRoofingCost = (surface: number | string, type: string = 'STANDARD', quality: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let basePrice = BASE_FACTORS.ROOFING * surfaceNum;
  
  // Adjust based on roof type
  if (type === 'ARDOISES' || type === 'SLATE') {
    basePrice *= 1.8;
  } else if (type === 'TUILES' || type === 'TILE') {
    basePrice *= 1.2;
  } else if (type === 'ZINC' || type === 'METAL' || type === 'BACS ACIER') {
    basePrice *= 0.9;
  } else if (type === 'FLAT') {
    basePrice *= 1.1;
  }
  
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate roof renovation cost
 */
export const calculateRoofingRenovCost = (type: string = 'TUILES', surface: number | string = 0): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let cost = 0;
  
  switch (type) {
    case 'TUILES':
      cost = 120 * surfaceNum;
      break;
    case 'ARDOISES':
      cost = 240 * surfaceNum;
      break;
    case 'ZINC':
      cost = 180 * surfaceNum;
      break;
    case 'BACS ACIER':
      cost = 110 * surfaceNum;
      break;
    case 'NON CONCERNE':
      cost = 0;
      break;
    default:
      cost = 150 * surfaceNum;
  }
  
  return Math.round(cost);
};

/**
 * Calculate roof framework renovation cost
 */
export const calculateRoofFrameworkRenovCost = (type: string = 'WOOD', surface: number | string = 0): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let cost = 0;
  
  switch (type) {
    case 'WOOD':
    case 'BOIS':
      cost = 180 * surfaceNum;
      break;
    case 'METAL':
    case 'METALLIQUE':
      cost = 220 * surfaceNum;
      break;
    case 'NON CONCERNE':
      cost = 0;
      break;
    default:
      cost = 200 * surfaceNum;
  }
  
  return Math.round(cost);
};

/**
 * Calculate pool cost
 */
export const calculatePoolCost = (surface: number | string, type: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let basePrice = BASE_FACTORS.POOL * surfaceNum;
  
  // Adjust based on pool type
  if (type === 'INFINITY') {
    basePrice *= 1.8;
  } else if (type === 'NATURAL') {
    basePrice *= 1.5;
  } else if (type === 'INDOOR') {
    basePrice *= 2.2;
  }
  
  return Math.round(basePrice);
};

/**
 * Calculate pool heating cost
 */
export const calculatePoolHeatingCost = (hasHeating: boolean | string, poolSurface: number | string): number => {
  const hasHeatingBool = ensureBoolean(hasHeating, false);
  const poolSurfaceNum = ensureNumber(poolSurface, 0);
  
  if (!hasHeatingBool) return 0;
  
  const basePrice = BASE_FACTORS.POOL_HEATING;
  const surfaceFactor = Math.sqrt(poolSurfaceNum) / 3; // Square root to avoid excessive costs for large pools
  
  return Math.round(basePrice * surfaceFactor);
};

/**
 * Calculate jacuzzi cost
 */
export const calculateJacuzziCost = (type: string = 'STANDARD'): number => {
  let basePrice = BASE_FACTORS.JACUZZI;
  
  // Adjust based on jacuzzi type
  if (type === 'PREMIUM') {
    basePrice *= 1.5;
  } else if (type === 'LUXURY') {
    basePrice *= 2.2;
  }
  
  return Math.round(basePrice);
};

/**
 * Calculate carport cost
 */
export const calculateCarportCost = (surface: number | string, type: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let basePrice = BASE_FACTORS.CARPORT * surfaceNum;
  
  // Adjust based on carport type
  if (type === 'WOOD') {
    basePrice *= 0.9;
  } else if (type === 'METAL') {
    basePrice *= 1.0;
  } else if (type === 'ALUMINUM') {
    basePrice *= 1.3;
  }
  
  return Math.round(basePrice);
};

/**
 * Calculate gate cost
 */
export const calculateGateCost = (type: string = 'STANDARD', isAutomated: boolean | string = false): number => {
  const isAutomatedBool = ensureBoolean(isAutomated, false);
  let basePrice = BASE_FACTORS.GATE;
  
  // Adjust based on gate type
  if (type === 'SLIDING') {
    basePrice *= 1.2;
  } else if (type === 'SWINGING') {
    basePrice *= 1.0;
  }
  
  // Add automation cost
  if (isAutomatedBool) {
    basePrice += 1500;
  }
  
  return Math.round(basePrice);
};

/**
 * Calculate fencing cost
 */
export const calculateFencingCost = (length: number | string, type: string = 'STANDARD'): number => {
  const lengthNum = ensureNumber(length, 0);
  let basePrice = BASE_FACTORS.FENCING * lengthNum;
  
  // Adjust based on fencing type
  if (type === 'WOOD') {
    basePrice *= 0.8;
  } else if (type === 'METAL') {
    basePrice *= 1.0;
  } else if (type === 'MASONRY') {
    basePrice *= 2.0;
  }
  
  return Math.round(basePrice);
};

/**
 * Calculate terrace cost
 */
export const calculateTerraceCost = (surface: number | string, type: string = 'STANDARD'): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let basePrice = BASE_FACTORS.TERRACE * surfaceNum;
  
  // Adjust based on terrace type
  if (type === 'WOOD') {
    basePrice *= 1.0;
  } else if (type === 'TILE') {
    basePrice *= 1.2;
  } else if (type === 'STONE') {
    basePrice *= 1.5;
  } else if (type === 'COMPOSITE') {
    basePrice *= 1.3;
  }
  
  return Math.round(basePrice);
};

/**
 * Calculate landscaping cost
 */
export const calculateLandscapingCost = (surface: number | string, types: string | string[] = []): number => {
  const surfaceNum = ensureNumber(surface, 0);
  const typesArray = ensureStringArray(types);
  let basePrice = BASE_FACTORS.LANDSCAPING * surfaceNum;
  let multiplier = 1.0;
  
  // Adjust based on landscaping types
  if (typesArray.includes('LAWN')) multiplier += 0.1;
  if (typesArray.includes('GARDEN')) multiplier += 0.3;
  if (typesArray.includes('TREES')) multiplier += 0.2;
  if (typesArray.includes('IRRIGATION')) multiplier += 0.4;
  if (typesArray.includes('LIGHTING')) multiplier += 0.3;
  
  return Math.round(basePrice * multiplier);
};

/**
 * Calculate renewable energy system cost
 */
export const calculateRenewableEnergyCost = (type: string = 'SOLAR', surface: number | string = 0): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let basePrice = BASE_FACTORS.RENEWABLE_ENERGY;
  
  // Adjust based on renewable energy type
  if (type === 'SOLAR') {
    basePrice = 1000 * Math.ceil(surfaceNum / 10); // Roughly 1000€ per 10m²
    basePrice = Math.max(basePrice, 5000); // Minimum cost
  } else if (type === 'GEOTHERMAL') {
    basePrice = BASE_FACTORS.GEOTHERMAL;
  } else if (type === 'HEAT_PUMP') {
    basePrice = 8000 + (surfaceNum * 20);
  }
  
  return Math.round(basePrice);
};

/**
 * Calculate environmental solutions cost
 */
export const calculateEnvironmentalSolutionsCost = (type: string = 'WATER_RECOVERY', surface: number | string = 0): number => {
  const surfaceNum = ensureNumber(surface, 0);
  let basePrice = BASE_FACTORS.ENVIRONMENTAL_SOLUTIONS;
  
  // Adjust based on solution type
  if (type === 'WATER_RECOVERY') {
    basePrice = 5000 + (surfaceNum * 10);
  } else if (type === 'GREEN_ROOF') {
    basePrice = surfaceNum * 150;
  } else if (type === 'COMPOSTING') {
    basePrice = 2000;
  }
  
  return Math.round(basePrice);
};

/**
 * Calculate bathroom cost
 */
export const calculateBathroomCost = (count: number | string, quality: string = 'STANDARD'): number => {
  const countNum = ensureNumber(count, 0);
  let basePrice = 5000; // Base price for a standard bathroom
  
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  
  return Math.round(basePrice * countNum * qualityMultiplier);
};

/**
 * Calculate kitchen cost
 */
export const calculateKitchenCost = (quality: string = 'STANDARD', surface: number | string = 15): number => {
  const surfaceNum = ensureNumber(surface, 15);
  let basePrice = 7000; // Base price for a standard kitchen
  
  // Adjust for surface
  const surfaceFactor = surfaceNum / 15; // Standardized to 15m²
  
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  
  return Math.round(basePrice * surfaceFactor * qualityMultiplier);
};

/**
 * Calculate demolition cost
 */
export const calculateDemolitionCost = (
  demolitionTypes: string | string[] = [], 
  surface: number | string = 0, 
  percentages: Record<string, string | number> = {}
): number => {
  const surfaceNum = ensureNumber(surface, 0);
  const typesArray = ensureStringArray(demolitionTypes);
  let totalCost = 0;
  
  typesArray.forEach(type => {
    const percentage = ensureNumber(percentages[type], 0) / 100; // Convert percentage to decimal
    let basePrice = 0;
    
    switch (type) {
      case 'walls':
        basePrice = 40 * surfaceNum * percentage;
        break;
      case 'floors':
        basePrice = 30 * surfaceNum * percentage;
        break;
      case 'ceilings':
        basePrice = 25 * surfaceNum * percentage;
        break;
      case 'stairs':
        basePrice = 1500 * percentage;
        break;
      case 'bathroom':
        basePrice = 800 * percentage;
        break;
      case 'kitchen':
        basePrice = 1000 * percentage;
        break;
      case 'windows':
        basePrice = 200 * surfaceNum * percentage;
        break;
      case 'doors':
        basePrice = 150 * surfaceNum * percentage;
        break;
      case 'electricalSystem':
        basePrice = 20 * surfaceNum * percentage;
        break;
      case 'plumbingSystem':
        basePrice = 25 * surfaceNum * percentage;
        break;
      default:
        basePrice = 50 * surfaceNum * percentage;
    }
    
    totalCost += basePrice;
  });
  
  return Math.round(totalCost);
};

/**
 * Calculate detailed facade cost
 */
export const calculateDetailedFacadeCost = (
  formData: any,
  stonePercentage: number | string = '0',
  plasterPercentage: number | string = '0',
  brickPercentage: number | string = '0',
  metalCladdingPercentage: number | string = '0',
  woodCladdingPercentage: number | string = '0',
  stoneCladdingPercentage: number | string = '0'
): number => {
  const surface = ensureNumber(formData.surface, 0);
  // Calculate wall area based on surface and number of levels
  const levels = ensureNumber(formData.levels, 1);
  const wallHeight = 3; // Average height per level in meters
  const wallArea = Math.sqrt(surface) * 4 * wallHeight * levels; // Approximate perimeter * height
  
  // Convert percentages to numbers
  const stonePercent = ensureNumber(stonePercentage, 0);
  const plasterPercent = ensureNumber(plasterPercentage, 0);
  const brickPercent = ensureNumber(brickPercentage, 0);
  const metalCladdingPercent = ensureNumber(metalCladdingPercentage, 0);
  const woodCladdingPercent = ensureNumber(woodCladdingPercentage, 0);
  const stoneCladdingPercent = ensureNumber(stoneCladdingPercentage, 0);
  
  // Calculate costs for each type
  const stoneCost = 250 * wallArea * (stonePercent / 100);
  const plasterCost = 80 * wallArea * (plasterPercent / 100);
  const brickCost = 180 * wallArea * (brickPercent / 100);
  const metalCladdingCost = 160 * wallArea * (metalCladdingPercent / 100);
  const woodCladdingCost = 140 * wallArea * (woodCladdingPercent / 100);
  const stoneCladdingCost = 220 * wallArea * (stoneCladdingPercent / 100);
  
  // Calculate total cost
  const totalCost = stoneCost + plasterCost + brickCost + metalCladdingCost + woodCladdingCost + stoneCladdingCost;
  
  return Math.round(totalCost);
};

/**
 * Calculate new total with added cost
 */
export const calculateNewMontantT = (currentTotal: number | string | undefined, additionalCost: number): number => {
  const total = ensureNumber(currentTotal, 0);
  return total + additionalCost;
};

/**
 * Helper function for ensureNumber with consistent import
 */
export { ensureNumber };

/**
 * Helper function for ensureBoolean with consistent import
 */
export { ensureBoolean };

/**
 * Helper function for ensureStringArray with consistent import
 */
export { ensureStringArray };
