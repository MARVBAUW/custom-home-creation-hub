import { ensureNumber } from './typeConversions';

/**
 * Calculate heating cost based on surface and heating type
 */
export const calculateHeatingCost = (surface: number | string, heatingType?: string): number => {
  const surfaceNum = ensureNumber(surface);
  let baseCost = 0;
  
  switch (heatingType) {
    case 'electric':
      baseCost = 70;
      break;
    case 'gas':
      baseCost = 100;
      break;
    case 'heatPump':
      baseCost = 150;
      break;
    case 'geothermal':
      baseCost = 200;
      break;
    case 'woodStove':
      baseCost = 90;
      break;
    default:
      baseCost = 80;
  }
  
  return surfaceNum * baseCost;
};

/**
 * Calculate plumbing cost based on surface and features
 */
export const calculatePlumbingCost = (surface: number | string, features?: string[]): number => {
  const surfaceNum = ensureNumber(surface);
  const baseCost = 80;
  let featureMultiplier = 1;
  
  if (features && features.length) {
    if (features.includes('highEnd')) featureMultiplier = 1.5;
    if (features.includes('ecofriendly')) featureMultiplier = 1.3;
  }
  
  return surfaceNum * baseCost * featureMultiplier;
};

/**
 * Calculate electrical cost based on surface and electrical type
 */
export const calculateElectricalCost = (surface: number | string, electricalType?: string): number => {
  const surfaceNum = ensureNumber(surface);
  let baseCost = 0;
  
  switch (electricalType) {
    case 'basic':
      baseCost = 70;
      break;
    case 'standard':
      baseCost = 100;
      break;
    case 'premium':
      baseCost = 150;
      break;
    case 'smart_home':
      baseCost = 200;
      break;
    case 'non_concerne':
      baseCost = 0;
      break;
    default:
      baseCost = 90;
  }
  
  return surfaceNum * baseCost;
};

/**
 * Alias for calculateElectricalCost for backward compatibility
 */
export const calculateElectricityCost = calculateElectricalCost;

/**
 * Calculate air conditioning cost
 */
export const calculateAirConditioningCost = (hasAirConditioning: boolean, surface: number | string): number => {
  if (!hasAirConditioning) return 0;
  const surfaceNum = ensureNumber(surface);
  return 180 * surfaceNum;
};

/**
 * Calculate insulation cost based on surface and insulation type
 */
export const calculateInsulationCost = (surface: number | string, insulationType?: string): number => {
  const surfaceNum = ensureNumber(surface);
  let baseCost = 0;
  
  switch (insulationType) {
    case 'standard':
      baseCost = 50;
      break;
    case 'highPerformance':
      baseCost = 80;
      break;
    case 'ecofriendly':
      baseCost = 90;
      break;
    default:
      baseCost = 60;
  }
  
  return surfaceNum * baseCost;
};

/**
 * Calculate roofing cost based on surface and roof type
 */
export const calculateRoofingCost = (surface: number | string, roofType?: string): number => {
  const surfaceNum = ensureNumber(surface);
  let baseCost = 0;
  
  switch (roofType) {
    case 'tile':
      baseCost = 120;
      break;
    case 'slate':
      baseCost = 180;
      break;
    case 'metal':
      baseCost = 150;
      break;
    case 'flatRoof':
      baseCost = 100;
      break;
    default:
      baseCost = 120;
  }
  
  return surfaceNum * baseCost;
};

/**
 * Calculate roofing renovation cost
 */
export const calculateRoofingRenovCost = (surface: number | string, roofState?: string): number => {
  const surfaceNum = ensureNumber(surface);
  let baseCost = 0;
  
  switch (roofState) {
    case 'good':
      baseCost = 50;
      break;
    case 'average':
      baseCost = 100;
      break;
    case 'poor':
      baseCost = 180;
      break;
    default:
      baseCost = 100;
  }
  
  return surfaceNum * baseCost;
};

/**
 * Calculate facade cost with detailed parameters
 */
export const calculateDetailedFacadeCost = (
  surface: number | string, 
  facadeType: { 
    stone?: number,
    plaster?: number,
    brick?: number,
    metalCladding?: number,
    woodCladding?: number,
    stoneCladding?: number
  }
): number => {
  const surfaceNum = ensureNumber(surface);
  let totalCost = 0;
  
  // Base costs per m² for each type
  const costs = {
    stone: 250,
    plaster: 80,
    brick: 120,
    metalCladding: 180,
    woodCladding: 160,
    stoneCladding: 200
  };
  
  // Calculate cost based on percentage of each type
  for (const [type, percentage] of Object.entries(facadeType)) {
    if (percentage && costs[type as keyof typeof costs]) {
      totalCost += surfaceNum * (percentage / 100) * costs[type as keyof typeof costs];
    }
  }
  
  return totalCost || surfaceNum * costs.plaster; // Default to plaster if no types specified
};

/**
 * Calculate windows cost based on number of windows and type
 */
export const calculateWindowsCost = (windowCount: number | string, windowType?: string): number => {
  const count = ensureNumber(windowCount);
  let unitCost = 0;
  
  switch (windowType) {
    case 'pvc':
      unitCost = 600;
      break;
    case 'aluminum':
      unitCost = 900;
      break;
    case 'wood':
      unitCost = 1200;
      break;
    case 'highPerformance':
      unitCost = 1500;
      break;
    default:
      unitCost = 800;
  }
  
  return count * unitCost;
};

/**
 * Calculate interior carpentry cost based on door count and quality
 */
export const calculateInteriorCarpenteryCost = (doorCount: number | string, quality?: string): number => {
  const count = ensureNumber(doorCount);
  let unitCost = 0;
  
  switch (quality) {
    case 'standard':
      unitCost = 300;
      break;
    case 'premium':
      unitCost = 600;
      break;
    case 'luxury':
      unitCost = 1200;
      break;
    default:
      unitCost = 400;
  }
  
  return count * unitCost;
};

/**
 * Calculate plaster work cost
 */
export const calculatePlasteringCost = (surface: number | string, quality?: string): number => {
  const surfaceNum = ensureNumber(surface);
  let baseCost = 0;
  
  switch (quality) {
    case 'standard':
      baseCost = 30;
      break;
    case 'premium':
      baseCost = 45;
      break;
    case 'luxury':
      baseCost = 65;
      break;
    default:
      baseCost = 35;
  }
  
  return surfaceNum * baseCost;
};

/**
 * Calculate parquet flooring cost
 */
export const calculateParquetCost = (surface: number | string, quality?: string): number => {
  const surfaceNum = ensureNumber(surface);
  let baseCost = 0;
  
  switch (quality) {
    case 'standard':
      baseCost = 60;
      break;
    case 'premium':
      baseCost = 100;
      break;
    case 'luxury':
      baseCost = 180;
      break;
    default:
      baseCost = 80;
  }
  
  return surfaceNum * baseCost;
};

/**
 * Calculate soft floor covering cost (carpet, vinyl, etc.)
 */
export const calculateSoftFloorCost = (surface: number | string, quality?: string): number => {
  const surfaceNum = ensureNumber(surface);
  let baseCost = 0;
  
  switch (quality) {
    case 'standard':
      baseCost = 30;
      break;
    case 'premium':
      baseCost = 55;
      break;
    case 'luxury':
      baseCost = 90;
      break;
    default:
      baseCost = 40;
  }
  
  return surfaceNum * baseCost;
};

/**
 * Calculate tile flooring cost
 */
export const calculateFloorTilingCost = (surface: number | string, quality?: string): number => {
  const surfaceNum = ensureNumber(surface);
  let baseCost = 0;
  
  switch (quality) {
    case 'standard':
      baseCost = 70;
      break;
    case 'premium':
      baseCost = 120;
      break;
    case 'luxury':
      baseCost = 200;
      break;
    default:
      baseCost = 90;
  }
  
  return surfaceNum * baseCost;
};

/**
 * Calculate wall tiling cost
 */
export const calculateWallTilingCost = (surface: number | string, quality?: string): number => {
  const surfaceNum = ensureNumber(surface);
  let baseCost = 0;
  
  switch (quality) {
    case 'standard':
      baseCost = 75;
      break;
    case 'premium':
      baseCost = 130;
      break;
    case 'luxury':
      baseCost = 210;
      break;
    default:
      baseCost = 95;
  }
  
  return surfaceNum * baseCost;
};

/**
 * Calculate painting cost
 */
export const calculatePaintingCost = (surface: number | string, quality?: string): number => {
  const surfaceNum = ensureNumber(surface);
  let baseCost = 0;
  
  switch (quality) {
    case 'standard':
      baseCost = 20;
      break;
    case 'premium':
      baseCost = 35;
      break;
    case 'luxury':
      baseCost = 55;
      break;
    default:
      baseCost = 25;
  }
  
  return surfaceNum * baseCost;
};

/**
 * Calculate kitchen cost
 */
export const calculateKitchenCost = (quality?: string, size?: string): number => {
  let baseCost = 0;
  let sizeMultiplier = 1;
  
  switch (quality) {
    case 'standard':
      baseCost = 5000;
      break;
    case 'premium':
      baseCost = 10000;
      break;
    case 'luxury':
      baseCost = 20000;
      break;
    default:
      baseCost = 7500;
  }
  
  switch (size) {
    case 'small':
      sizeMultiplier = 0.7;
      break;
    case 'medium':
      sizeMultiplier = 1;
      break;
    case 'large':
      sizeMultiplier = 1.5;
      break;
    case 'openPlan':
      sizeMultiplier = 1.8;
      break;
    default:
      sizeMultiplier = 1;
  }
  
  return baseCost * sizeMultiplier;
};

/**
 * Calculate bathroom cost
 */
export const calculateBathroomCost = (quality?: string, features?: string[]): number => {
  let baseCost = 0;
  let featureMultiplier = 1;
  
  switch (quality) {
    case 'standard':
      baseCost = 4000;
      break;
    case 'premium':
      baseCost = 8000;
      break;
    case 'luxury':
      baseCost = 15000;
      break;
    default:
      baseCost = 6000;
  }
  
  if (features && features.length) {
    if (features.includes('bathtub')) featureMultiplier += 0.2;
    if (features.includes('separateShower')) featureMultiplier += 0.3;
    if (features.includes('doubleBasin')) featureMultiplier += 0.15;
    if (features.includes('heatedFloor')) featureMultiplier += 0.25;
  }
  
  return baseCost * featureMultiplier;
};

/**
 * Calculate masonry wall cost
 */
export const calculateMasonryWallCost = (wallLength: number | string, height?: number, thickness?: string): number => {
  const length = ensureNumber(wallLength);
  const wallHeight = ensureNumber(height, 2.5); // Default height 2.5m
  let baseCostPerM2 = 0;
  
  switch (thickness) {
    case 'thin':
      baseCostPerM2 = 100;
      break;
    case 'standard':
      baseCostPerM2 = 150;
      break;
    case 'thick':
      baseCostPerM2 = 220;
      break;
    default:
      baseCostPerM2 = 150;
  }
  
  return length * wallHeight * baseCostPerM2;
};

/**
 * Calculate floor cost
 */
export const calculateFloorCost = (surface: number | string, floorType?: string): number => {
  const surfaceNum = ensureNumber(surface);
  let baseCost = 0;
  
  switch (floorType) {
    case 'concrete':
      baseCost = 80;
      break;
    case 'reinforced':
      baseCost = 120;
      break;
    case 'woodFrame':
      baseCost = 150;
      break;
    default:
      baseCost = 100;
  }
  
  return surfaceNum * baseCost;
};

/**
 * Calculate structural feature cost
 */
export const calculateStructuralFeatureCost = (feature: string, size?: number): number => {
  const featureSize = ensureNumber(size, 1);
  let baseCost = 0;
  
  switch (feature) {
    case 'beam':
      baseCost = 300;
      break;
    case 'column':
      baseCost = 250;
      break;
    case 'archway':
      baseCost = 500;
      break;
    case 'staircase':
      baseCost = 2000;
      break;
    default:
      baseCost = 300;
  }
  
  return baseCost * featureSize;
};

/**
 * Calculate renewable energy installation cost
 */
export const calculateRenewableEnergyCost = (energyType: string, size?: number): number => {
  const installationSize = ensureNumber(size, 1);
  let baseCost = 0;
  
  switch (energyType) {
    case 'solarPanels':
      baseCost = 1000; // per kW
      break;
    case 'windTurbine':
      baseCost = 2000; // per kW
      break;
    case 'geothermal':
      baseCost = 1500; // per kW
      break;
    default:
      baseCost = 1000;
  }
  
  return baseCost * installationSize;
};

/**
 * Calculate environmental solutions cost
 */
export const calculateEnvironmentalSolutionsCost = (solutionType: string, houseSize?: number): number => {
  const size = ensureNumber(houseSize, 100);
  let baseCost = 0;
  
  switch (solutionType) {
    case 'rainwaterHarvesting':
      baseCost = 2500;
      break;
    case 'greyWaterSystem':
      baseCost = 4000;
      break;
    case 'greenRoof':
      baseCost = 150; // per m²
      return baseCost * (size * 0.7); // Assume roof is 70% of house footprint
    case 'homeAutomation':
      baseCost = 50; // per m²
      return baseCost * size;
    default:
      baseCost = 3000;
  }
  
  return baseCost;
};

/**
 * Calculate fencing cost
 */
export const calculateFencingCost = (length: number | string, fenceType?: string): number => {
  const fenceLength = ensureNumber(length);
  let costPerMeter = 0;
  
  switch (fenceType) {
    case 'wood':
      costPerMeter = 80;
      break;
    case 'chainLink':
      costPerMeter = 50;
      break;
    case 'pvc':
      costPerMeter = 100;
      break;
    case 'aluminum':
      costPerMeter = 150;
      break;
    case 'wroughtIron':
      costPerMeter = 200;
      break;
    default:
      costPerMeter = 90;
  }
  
  return fenceLength * costPerMeter;
};

/**
 * Calculate gate cost
 */
export const calculateGateCost = (gateType: string, width?: number): number => {
  const gateWidth = ensureNumber(width, 3);
  let baseCost = 0;
  
  switch (gateType) {
    case 'swing':
      baseCost = 1000;
      break;
    case 'sliding':
      baseCost = 1500;
      break;
    case 'automatic':
      baseCost = 2500;
      break;
    default:
      baseCost = 1200;
  }
  
  return baseCost * (gateWidth / 3); // Adjust cost based on gate width (normalized to 3m)
};

/**
 * Calculate new montantT based on current montantT and additional costs
 */
export const calculateNewMontantT = (currentMontantT: number | string, additionalCost: number): number => {
  const currentAmount = ensureNumber(currentMontantT);
  return currentAmount + additionalCost;
};
