
import { ensureNumber, ensureString, ensureBoolean, ensurePercentage } from './typeConversions';

/**
 * Base calculation functions for different construction/renovation costs
 */

// Constants for pricing (example values)
const COST_PER_SQM_FOUNDATION = 150;
const COST_PER_SQM_WALL = 210;
const COST_PER_SQM_FLOOR = 180;
const COST_PER_SQM_ROOF_FRAMEWORK = 240;
const COST_PER_SQM_ROOFING = 120;
const COST_PER_SQM_FACADE = 180;
const COST_PER_SQM_WINDOW = 450;
const COST_PER_SQM_DOOR = 380;
const COST_PER_SQM_INSULATION = 80;
const COST_PER_SQM_PLUMBING = 110;
const COST_PER_SQM_ELECTRICAL = 95;
const COST_PER_SQM_HEATING = 130;
const COST_PER_SQM_PLASTER = 60;
const COST_PER_SQM_FLOOR_TILING = 90;
const COST_PER_SQM_WALL_TILING = 85;
const COST_PER_SQM_PARQUET = 120;
const COST_PER_SQM_SOFT_FLOOR = 70;
const COST_PER_SQM_PAINT = 35;
const COST_PER_SQM_EXTERIOR = 90;
const COST_PER_SQM_POOL = 1200;
const COST_AIR_CONDITIONING = 8000;
const COST_PER_BATHROOM_STANDARD = 5000;
const COST_PER_BATHROOM_LUXURY = 15000;
const COST_PER_KITCHEN_STANDARD = 8000;
const COST_PER_KITCHEN_LUXURY = 25000;
const COST_PER_GATE = 3000;
const COST_PER_CARPORT = 8000;
const COST_PER_JACUZZI = 12000;
const COST_SOLAR_PANELS = 15000;
const COST_HEAT_PUMP = 12000;

/**
 * Calculate foundation cost based on surface area
 */
export const calculateFoundationCost = (
  surface: number | string,
  foundationType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (foundationType === 'reinforced') multiplier = 1.3;
  if (foundationType === 'pile') multiplier = 1.6;
  
  return area * COST_PER_SQM_FOUNDATION * multiplier;
};

/**
 * Calculate wall construction cost
 */
export const calculateWallsCost = (
  surface: number | string,
  wallType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (wallType === 'brick') multiplier = 1.2;
  if (wallType === 'stone') multiplier = 1.5;
  
  return area * COST_PER_SQM_WALL * multiplier;
};

/**
 * Calculate flooring construction cost
 */
export const calculateFlooringCost = (
  surface: number | string,
  floorType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (floorType === 'BETON') multiplier = 1.2;
  if (floorType === 'BOIS') multiplier = 1.4;
  
  return area * COST_PER_SQM_FLOOR * multiplier;
};

/**
 * Calculate roof framework cost
 */
export const calculateRoofFrameworkCost = (
  surface: number | string,
  roofType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (roofType === 'complex') multiplier = 1.4;
  if (roofType === 'mansard') multiplier = 1.6;
  
  return area * COST_PER_SQM_ROOF_FRAMEWORK * multiplier;
};

/**
 * Calculate roof framework renovation cost
 */
export const calculateRoofFrameworkRenovCost = (
  surface: number | string,
  roofType: string = 'standard',
  renovExtent: number = 50
): number => {
  const baseCost = calculateRoofFrameworkCost(surface, roofType);
  const renovPercentage = ensurePercentage(renovExtent) / 100;
  return baseCost * renovPercentage * 1.2; // Renovation costs 20% more than new
};

/**
 * Calculate roofing cost
 */
export const calculateRoofingCost = (
  surface: number | string,
  roofingType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (roofingType === 'tile') multiplier = 1.2;
  if (roofingType === 'slate') multiplier = 1.5;
  if (roofingType === 'metal') multiplier = 1.3;
  if (roofingType === 'flat') multiplier = 1.8;
  
  return area * COST_PER_SQM_ROOFING * multiplier;
};

/**
 * Calculate roofing renovation cost
 */
export const calculateRoofingRenovCost = (
  surface: number | string,
  roofingType: string = 'standard',
  renovExtent: number = 50
): number => {
  const baseCost = calculateRoofingCost(surface, roofingType);
  const renovPercentage = ensurePercentage(renovExtent) / 100;
  return baseCost * renovPercentage * 1.15; // Renovation costs 15% more than new
};

/**
 * Calculate facade cost
 */
export const calculateFacadeCost = (
  surface: number | string,
  facadeType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (facadeType === 'stone') multiplier = 1.8;
  if (facadeType === 'wood') multiplier = 1.4;
  if (facadeType === 'composite') multiplier = 1.5;
  
  return area * COST_PER_SQM_FACADE * multiplier;
};

/**
 * Calculate windows cost
 */
export const calculateWindowsCost = (
  surface: number | string,
  windowType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (windowType === 'double') multiplier = 1.2;
  if (windowType === 'triple') multiplier = 1.5;
  if (windowType === 'aluminum') multiplier = 1.4;
  
  return area * COST_PER_SQM_WINDOW * multiplier;
};

/**
 * Calculate door cost
 */
export const calculateDoorCost = (
  surface: number | string,
  doorType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (doorType === 'security') multiplier = 1.5;
  if (doorType === 'glass') multiplier = 1.3;
  if (doorType === 'designer') multiplier = 1.8;
  
  return area * COST_PER_SQM_DOOR * multiplier;
};

/**
 * Calculate insulation cost
 */
export const calculateInsulationCost = (
  surface: number | string,
  insulationType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (insulationType === 'high-performance') multiplier = 1.4;
  if (insulationType === 'eco') multiplier = 1.6;
  
  return area * COST_PER_SQM_INSULATION * multiplier;
};

/**
 * Calculate plumbing cost
 */
export const calculatePlumbingCost = (
  surface: number | string,
  complexity: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (complexity === 'complex') multiplier = 1.5;
  
  return area * COST_PER_SQM_PLUMBING * multiplier;
};

/**
 * Calculate electrical cost
 */
export const calculateElectricalCost = (
  surface: number | string,
  complexity: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (complexity === 'complex') multiplier = 1.4;
  if (complexity === 'smart') multiplier = 1.8;
  
  return area * COST_PER_SQM_ELECTRICAL * multiplier;
};

/**
 * Calculate heating cost
 */
export const calculateHeatingCost = (
  surface: number | string,
  heatingType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (heatingType === 'floor') multiplier = 1.5;
  if (heatingType === 'heat-pump') multiplier = 1.8;
  
  return area * COST_PER_SQM_HEATING * multiplier;
};

/**
 * Calculate air conditioning cost
 */
export const calculateAirConditioningCost = (
  surface: number | string,
  hasAirConditioning: string | boolean = false
): number => {
  if (!hasAirConditioning || hasAirConditioning === 'NON') {
    return 0;
  }
  
  const area = ensureNumber(surface);
  const baseUnits = Math.ceil(area / 50); // One unit per 50m²
  
  return baseUnits * COST_AIR_CONDITIONING;
};

/**
 * Calculate plastering cost
 */
export const calculatePlasteringCost = (
  surface: number | string,
  complexity: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (complexity === 'complex') multiplier = 1.3;
  if (complexity === 'decorative') multiplier = 1.5;
  
  return area * COST_PER_SQM_PLASTER * multiplier;
};

/**
 * Calculate floor tiling cost
 */
export const calculateFloorTilingCost = (
  surface: number | string,
  tileType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (tileType === 'luxury') multiplier = 1.5;
  if (tileType === 'natural-stone') multiplier = 1.8;
  
  return area * COST_PER_SQM_FLOOR_TILING * multiplier;
};

/**
 * Calculate wall tiling cost
 */
export const calculateWallTilingCost = (
  surface: number | string,
  tileType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (tileType === 'luxury') multiplier = 1.5;
  if (tileType === 'mosaic') multiplier = 1.7;
  
  return area * COST_PER_SQM_WALL_TILING * multiplier;
};

/**
 * Calculate parquet flooring cost
 */
export const calculateParquetCost = (
  surface: number | string,
  parquetType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (parquetType === 'premium') multiplier = 1.5;
  if (parquetType === 'exotic') multiplier = 2;
  
  return area * COST_PER_SQM_PARQUET * multiplier;
};

/**
 * Calculate soft flooring cost (carpet, vinyl, etc.)
 */
export const calculateSoftFloorCost = (
  surface: number | string,
  floorType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (floorType === 'premium') multiplier = 1.4;
  
  return area * COST_PER_SQM_SOFT_FLOOR * multiplier;
};

/**
 * Calculate painting cost
 */
export const calculatePaintingCost = (
  surface: number | string,
  paintType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (paintType === 'premium') multiplier = 1.3;
  if (paintType === 'decorative') multiplier = 1.6;
  
  return area * COST_PER_SQM_PAINT * multiplier;
};

/**
 * Calculate exterior work cost
 */
export const calculateExteriorWorkCost = (
  surface: number | string,
  workType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (workType === 'landscaping') multiplier = 1.4;
  if (workType === 'hardscaping') multiplier = 1.6;
  
  return area * COST_PER_SQM_EXTERIOR * multiplier;
};

/**
 * Calculate bathroom cost
 */
export const calculateBathroomCost = (
  count: number | string,
  bathroomType: string = 'standard'
): number => {
  const bathrooms = ensureNumber(count);
  let baseCost = COST_PER_BATHROOM_STANDARD;
  
  if (bathroomType === 'luxury') baseCost = COST_PER_BATHROOM_LUXURY;
  
  return bathrooms * baseCost;
};

/**
 * Calculate kitchen cost
 */
export const calculateKitchenCost = (
  kitchenType: string = 'standard'
): number => {
  if (kitchenType === 'luxury') return COST_PER_KITCHEN_LUXURY;
  return COST_PER_KITCHEN_STANDARD;
};

/**
 * Calculate pool cost
 */
export const calculatePoolCost = (
  surface: number | string,
  poolType: string = 'standard'
): number => {
  const area = ensureNumber(surface);
  let multiplier = 1;
  
  if (poolType === 'infinity') multiplier = 1.5;
  if (poolType === 'indoor') multiplier = 1.8;
  
  return area * COST_PER_SQM_POOL * multiplier;
};

/**
 * Calculate pool heating cost
 */
export const calculatePoolHeatingCost = (
  poolHeating: string | boolean
): number => {
  if (!poolHeating || poolHeating === 'NON') {
    return 0;
  }
  
  return 6000;
};

/**
 * Calculate gate cost
 */
export const calculateGateCost = (
  includeGate: string | boolean,
  gateType: string = 'standard'
): number => {
  if (!includeGate || includeGate === 'NON') {
    return 0;
  }
  
  let baseCost = COST_PER_GATE;
  if (gateType === 'automatic') baseCost *= 1.5;
  if (gateType === 'ornamental') baseCost *= 1.8;
  
  return baseCost;
};

/**
 * Calculate carport cost
 */
export const calculateCarportCost = (
  carportType: string = 'none'
): number => {
  if (carportType === 'none') return 0;
  
  let baseCost = COST_PER_CARPORT;
  if (carportType === 'enclosed') baseCost *= 1.4;
  if (carportType === 'double') baseCost *= 1.8;
  
  return baseCost;
};

/**
 * Calculate jacuzzi cost
 */
export const calculateJacuzziCost = (
  jacuzziType: string = 'none',
  jacuzziArea: number | string = 0
): number => {
  if (jacuzziType === 'none') return 0;
  
  const area = ensureNumber(jacuzziArea);
  let baseCost = COST_PER_JACUZZI;
  
  if (jacuzziType === 'luxury') baseCost *= 1.5;
  if (jacuzziType === 'swim-spa') baseCost *= 2;
  
  // Add size factor
  if (area > 10) {
    baseCost *= (1 + (area - 10) * 0.1);
  }
  
  return baseCost;
};

/**
 * Calculate masonry wall cost
 */
export const calculateMasonryWallCost = (
  wallArea: number | string, 
  createWalls: string | boolean
): number => {
  if (!createWalls || createWalls === 'NON') {
    return 0;
  }
  
  const area = ensureNumber(wallArea);
  return area * COST_PER_SQM_WALL * 1.2; // Renovation costs more than new construction
};

/**
 * Calculate structural feature cost
 */
export const calculateStructuralFeatureCost = (
  features: string[],
  featureValues: { [key: string]: string | number }
): number => {
  let totalCost = 0;
  
  for (const feature of features) {
    const value = ensureNumber(featureValues[feature] || 0);
    
    switch (feature) {
      case 'beam':
        totalCost += value * 1000;
        break;
      case 'column':
        totalCost += value * 1200;
        break;
      case 'arch':
        totalCost += value * 2000;
        break;
      case 'vault':
        totalCost += value * 3000;
        break;
      default:
        totalCost += value * 500;
    }
  }
  
  return totalCost;
};

/**
 * Calculate interior carpentry cost
 */
export const calculateInteriorCarpenteryCost = (
  doorCount: number | string,
  doorType: string = 'standard'
): number => {
  const doors = ensureNumber(doorCount);
  let costPerDoor = 800;
  
  if (doorType === 'premium') costPerDoor = 1200;
  if (doorType === 'custom') costPerDoor = 2000;
  
  return doors * costPerDoor;
};

/**
 * Calculate renewable energy cost
 */
export const calculateRenewableEnergyCost = (
  renewableType: string = 'none'
): number => {
  if (renewableType === 'none') return 0;
  
  if (renewableType === 'solar') return COST_SOLAR_PANELS;
  if (renewableType === 'heat-pump') return COST_HEAT_PUMP;
  if (renewableType === 'both') return COST_SOLAR_PANELS + COST_HEAT_PUMP;
  
  return 0;
};

/**
 * Calculate environmental solutions cost
 */
export const calculateEnvironmentalSolutionsCost = (
  solutionType: string = 'none'
): number => {
  if (solutionType === 'none') return 0;
  
  if (solutionType === 'rainwater') return 6000;
  if (solutionType === 'greywater') return 8000;
  if (solutionType === 'green-roof') return 12000;
  if (solutionType === 'combination') return 20000;
  
  return 0;
};

/**
 * Calculate global estimation based on all parameters
 */
export const calculateGlobalEstimation = (
  surface: number | string,
  projectType: string = 'construction',
  complexityFactor: number = 1
): number => {
  const area = ensureNumber(surface);
  let baseCost = 0;
  
  // Base costs for different project types
  if (projectType === 'construction') {
    baseCost = area * 1800; // 1800€/m² for new construction
  } else if (projectType === 'renovation') {
    baseCost = area * 1300; // 1300€/m² for renovation
  } else if (projectType === 'extension') {
    baseCost = area * 2000; // 2000€/m² for extension
  }
  
  // Apply complexity factor
  return baseCost * complexityFactor;
};

/**
 * Create a new montantT value by combining different costs
 */
export const calculateNewMontantT = (
  currentMontantT: number,
  newCost: number,
  operationType: 'add' | 'subtract' | 'multiply' | 'replace' = 'add'
): number => {
  const current = ensureNumber(currentMontantT);
  const cost = ensureNumber(newCost);
  
  switch (operationType) {
    case 'add':
      return current + cost;
    case 'subtract':
      return Math.max(0, current - cost);
    case 'multiply':
      return current * cost;
    case 'replace':
      return cost;
    default:
      return current + cost;
  }
};
