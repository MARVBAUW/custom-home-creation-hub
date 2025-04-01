import { ensureNumber } from './typeConversions';

// Basic conversion function to ensure we're working with numbers
export function ensureNumericValue(value: any, defaultValue: number = 0): number {
  if (typeof value === 'number') return value;
  if (!value) return defaultValue;
  
  if (typeof value === 'string') {
    // Remove currency symbols, commas, etc.
    const cleanValue = value.replace(/[^0-9.-]+/g, '');
    return parseFloat(cleanValue) || defaultValue;
  }
  
  return defaultValue;
}

// Generic cost calculation function that takes a base amount and multiplies by a coefficient
export function calculateCost(baseAmount: any, coefficient: number = 1): number {
  return ensureNumericValue(baseAmount) * coefficient;
}

// Calculate structural costs
export function calculateStructuralCost(formData: any, surfaceArea: number = 0): number {
  const baseCost = 600; // Base cost per square meter
  const surface = surfaceArea || ensureNumericValue(formData.surface, 0);
  return surface * baseCost;
}

// Calculate masonry wall costs
export function calculateMasonryWallCost(wallType: string, surfaceArea: number): number {
  let coefficient = 1;
  
  switch(wallType) {
    case 'bricks':
      coefficient = 1.2;
      break;
    case 'concrete':
      coefficient = 1.0;
      break;
    case 'stone':
      coefficient = 1.5;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 250 * surfaceArea * coefficient;
}

// Calculate floor costs
export function calculateFloorCost(floorType: string, surfaceArea: number): number {
  let coefficient = 1;
  
  switch(floorType) {
    case 'concrete':
      coefficient = 1.0;
      break;
    case 'wood':
      coefficient = 1.2;
      break;
    case 'reinforced':
      coefficient = 1.3;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 200 * surfaceArea * coefficient;
}

// Calculate demolition costs
export function calculateDemolitionCost(demolitionType: string, surfaceArea: number): number {
  let coefficient = 1;
  
  switch(demolitionType) {
    case 'total':
      coefficient = 1.5;
      break;
    case 'partial':
      coefficient = 1.0;
      break;
    case 'selective':
      coefficient = 1.2;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 100 * surfaceArea * coefficient;
}

// Calculate electricity costs
export function calculateElectricityCost(formData: any, surfaceArea?: number): number {
  const surface = surfaceArea || ensureNumericValue(formData.surface, 0);
  const complexity = formData.electricalComplexity || 'standard';
  
  let coefficient = 1;
  switch(complexity) {
    case 'basic':
      coefficient = 0.8;
      break;
    case 'standard':
      coefficient = 1.0;
      break;
    case 'advanced':
      coefficient = 1.3;
      break;
    case 'premium':
      coefficient = 1.6;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 85 * surface * coefficient;
}

// Calculate plumbing costs
export function calculatePlumbingCost(formData: any, surfaceArea?: number): number {
  const surface = surfaceArea || ensureNumericValue(formData.surface, 0);
  const bathrooms = ensureNumericValue(formData.bathrooms, 1);
  
  return 70 * surface + (2500 * bathrooms);
}

// Calculate heating costs
export function calculateHeatingCost(formData: any, heatingType: string = 'standard'): number {
  const surface = ensureNumericValue(formData.surface, 0);
  let coefficient = 1;
  
  switch(heatingType) {
    case 'electric':
      coefficient = 0.8;
      break;
    case 'gas':
      coefficient = 1.0;
      break;
    case 'heat_pump':
      coefficient = 1.5;
      break;
    case 'underfloor':
      coefficient = 1.3;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 60 * surface * coefficient;
}

// Calculate air conditioning costs
export function calculateAirConditioningCost(formData: any, type: string = 'standard'): number {
  const surface = ensureNumericValue(formData.surface, 0);
  let coefficient = 1;
  
  switch(type) {
    case 'split':
      coefficient = 0.8;
      break;
    case 'central':
      coefficient = 1.5;
      break;
    case 'ducted':
      coefficient = 1.3;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 100 * surface * coefficient;
}

// Calculate plastering costs
export function calculatePlasteringCost(formData: any, plasterType: string = 'standard'): number {
  const surface = ensureNumericValue(formData.surface, 0);
  let coefficient = 1;
  
  switch(plasterType) {
    case 'basic':
      coefficient = 0.8;
      break;
    case 'standard':
      coefficient = 1.0;
      break;
    case 'premium':
      coefficient = 1.3;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 45 * surface * coefficient;
}

// Calculate interior carpentry costs
export function calculateInteriorCarpenteryCost(formData: any, quality: string = 'standard'): number {
  const surface = ensureNumericValue(formData.surface, 0);
  let coefficient = 1;
  
  switch(quality) {
    case 'basic':
      coefficient = 0.8;
      break;
    case 'standard':
      coefficient = 1.0;
      break;
    case 'premium':
      coefficient = 1.5;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 120 * surface * coefficient;
}

// Calculate parquet costs
export function calculateParquetCost(formData: any, quality: string = 'standard'): number {
  const surface = ensureNumericValue(formData.surface, 0);
  let coefficient = 1;
  
  switch(quality) {
    case 'basic':
      coefficient = 0.7;
      break;
    case 'standard':
      coefficient = 1.0;
      break;
    case 'premium':
      coefficient = 1.8;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 80 * surface * coefficient;
}

// Calculate soft floor costs (carpet, vinyl, etc.)
export function calculateSoftFloorCost(formData: any, quality: string = 'standard'): number {
  const surface = ensureNumericValue(formData.surface, 0);
  let coefficient = 1;
  
  switch(quality) {
    case 'basic':
      coefficient = 0.7;
      break;
    case 'standard':
      coefficient = 1.0;
      break;
    case 'premium':
      coefficient = 1.5;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 50 * surface * coefficient;
}

// Calculate floor tiling costs
export function calculateFloorTilingCost(formData: any, quality: string = 'standard'): number {
  const surface = ensureNumericValue(formData.surface, 0);
  let coefficient = 1;
  
  switch(quality) {
    case 'basic':
      coefficient = 0.8;
      break;
    case 'standard':
      coefficient = 1.0;
      break;
    case 'premium':
      coefficient = 1.7;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 90 * surface * coefficient;
}

// Calculate wall tiling costs
export function calculateWallTilingCost(formData: any, quality: string = 'standard'): number {
  const surface = ensureNumericValue(formData.surface, 0);
  let coefficient = 1;
  
  switch(quality) {
    case 'basic':
      coefficient = 0.8;
      break;
    case 'standard':
      coefficient = 1.0;
      break;
    case 'premium':
      coefficient = 1.5;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 80 * surface * coefficient;
}

// Calculate painting costs
export function calculatePaintingCost(formData: any, quality: string = 'standard'): number {
  const surface = ensureNumericValue(formData.surface, 0);
  let coefficient = 1;
  
  switch(quality) {
    case 'basic':
      coefficient = 0.7;
      break;
    case 'standard':
      coefficient = 1.0;
      break;
    case 'premium':
      coefficient = 1.4;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 35 * surface * coefficient;
}

// Calculate structural feature costs (beams, columns, etc.)
export function calculateStructuralFeatureCost(featureType: string, quantity: number): number {
  let baseCost = 0;
  
  switch(featureType) {
    case 'beam':
      baseCost = 300;
      break;
    case 'column':
      baseCost = 500;
      break;
    case 'truss':
      baseCost = 800;
      break;
    default:
      baseCost = 400;
  }
  
  return baseCost * quantity;
}

// Calculate roofing costs
export function calculateRoofingCost(formData: any, roofingType: string = 'standard'): number {
  const surface = ensureNumericValue(formData.roofSurface, 0) || ensureNumericValue(formData.surface, 0) * 1.3;
  let coefficient = 1;
  
  switch(roofingType) {
    case 'tiles':
      coefficient = 1.0;
      break;
    case 'slate':
      coefficient = 1.5;
      break;
    case 'metal':
      coefficient = 0.9;
      break;
    case 'flat':
      coefficient = 1.2;
      break;
    default:
      coefficient = 1.0;
  }
  
  return 120 * surface * coefficient;
}

// Calculate landscaping costs
export function calculateLandscapingCost(formData: any, gardenSize: number = 0): number {
  const size = gardenSize || ensureNumericValue(formData.gardenSize, 0);
  
  if (size === 0) return 0;
  
  let baseCost = 30; // Base cost per square meter
  
  // Apply scaling for larger gardens
  if (size > 500) {
    baseCost = 25;
  } else if (size > 1000) {
    baseCost = 20;
  }
  
  return baseCost * size;
}

// Calculate fencing costs
export function calculateFencingCost(formData: any, fenceType: string = 'standard'): number {
  const length = ensureNumericValue(formData.fenceLength, 0);
  
  if (length === 0) return 0;
  
  let costPerMeter = 90;
  
  switch(fenceType) {
    case 'wood':
      costPerMeter = 80;
      break;
    case 'metal':
      costPerMeter = 120;
      break;
    case 'pvc':
      costPerMeter = 70;
      break;
    case 'stone':
      costPerMeter = 200;
      break;
    default:
      costPerMeter = 90;
  }
  
  return costPerMeter * length;
}

// Calculate terrace costs
export function calculateTerraceCost(formData: any, terraceType: string = 'standard'): number {
  const surface = ensureNumericValue(formData.terraceSurface, 0);
  
  if (surface === 0) return 0;
  
  let costPerMeter = 150;
  
  switch(terraceType) {
    case 'wood':
      costPerMeter = 180;
      break;
    case 'tile':
      costPerMeter = 150;
      break;
    case 'concrete':
      costPerMeter = 120;
      break;
    case 'stone':
      costPerMeter = 250;
      break;
    default:
      costPerMeter = 150;
  }
  
  return costPerMeter * surface;
}

// Calculate gate costs
export function calculateGateCost(formData: any, gateType: string = 'standard'): number {
  let cost = 1500;
  
  switch(gateType) {
    case 'manual':
      cost = 1200;
      break;
    case 'automatic':
      cost = 2500;
      break;
    case 'sliding':
      cost = 3000;
      break;
    default:
      cost = 1500;
  }
  
  return cost;
}

/**
 * Convert percentage from string to number
 */
export function percentageToNumber(value: string): number {
  if (!value) return 0;
  const numValue = parseFloat(value);
  return isNaN(numValue) ? 0 : numValue;
}

/**
 * Calculate detailed facade cost based on percentages of different materials
 */
export function calculateDetailedFacadeCost(
  formData: any,
  stonePercentage: string = "0",
  plasterPercentage: string = "0",
  brickPercentage: string = "0",
  metalCladdingPercentage: string = "0",
  woodCladdingPercentage: string = "0",
  stoneCladdingPercentage: string = "0"
): number {
  // Surface area from form data
  const surface = ensureNumericValue(formData.surface, 0);
  
  // Convert percentages to numbers
  const stonePercent = percentageToNumber(stonePercentage);
  const plasterPercent = percentageToNumber(plasterPercentage);
  const brickPercent = percentageToNumber(brickPercentage);
  const metalCladdingPercent = percentageToNumber(metalCladdingPercentage);
  const woodCladdingPercent = percentageToNumber(woodCladdingPercentage);
  const stoneCladdingPercent = percentageToNumber(stoneCladdingPercentage);
  
  // Define base costs per square meter for each material
  const stoneCost = 320;
  const plasterCost = 120;
  const brickCost = 200;
  const metalCladdingCost = 250;
  const woodCladdingCost = 180;
  const stoneCladdingCost = 280;
  
  // Calculate total facade area (assume 3m height per floor)
  const facadeArea = surface * 0.8; // Simplified calculation
  
  // Calculate costs for each material
  const stoneCostTotal = (stonePercent / 100) * facadeArea * stoneCost;
  const plasterCostTotal = (plasterPercent / 100) * facadeArea * plasterCost;
  const brickCostTotal = (brickPercent / 100) * facadeArea * brickCost;
  const metalCladdingCostTotal = (metalCladdingPercent / 100) * facadeArea * metalCladdingCost;
  const woodCladdingCostTotal = (woodCladdingPercent / 100) * facadeArea * woodCladdingCost;
  const stoneCladdingCostTotal = (stoneCladdingPercent / 100) * facadeArea * stoneCladdingCost;
  
  // Return the total cost
  return stoneCostTotal + plasterCostTotal + brickCostTotal + 
         metalCladdingCostTotal + woodCladdingCostTotal + stoneCladdingCostTotal;
}

/**
 * Calculate new total amount with facade costs
 */
export function calculateNewMontantT(currentMontantT: number = 0, facadeCost: number = 0): number {
  return ensureNumericValue(currentMontantT) + facadeCost;
}

// Export the ensureNumber function that's used elsewhere
export const ensureNumber = (value: any): number => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

// Additional functions needed by other components

/**
 * Calculate roofing renovation costs
 */
export function calculateRoofingRenovCost(roofingType: string, surface: number): number {
  const rates: Record<string, number> = {
    'tuilePlate': 160,
    'tuileRonde': 167,
    'ardoise': 240,
    'zinc': 190,
    'chaume': 230,
    'bacAcier': 85,
    'bitume': 95,
    'vegetalisee': 176,
    'gravillonnee': 125
  };
  
  return (rates[roofingType] || 160) * surface;
}

/**
 * Calculate roof framework renovation cost
 */
export function calculateRoofFrameworkRenovCost(type: string, surface: number): number {
  const rates: Record<string, number> = {
    'light': 100,
    'medium': 150,
    'heavy': 200,
    'complete': 300
  };
  
  return (rates[type] || 150) * surface;
}

/**
 * Calculate kitchen costs
 */
export function calculateKitchenCost(quality: string, size: number): number {
  const rates: Record<string, number> = {
    'basic': 3000,
    'standard': 6000,
    'premium': 12000,
    'luxury': 25000
  };
  
  return (rates[quality] || 6000) * (size / 10);
}

/**
 * Calculate bathroom costs
 */
export function calculateBathroomCost(quality: string, size: number): number {
  const rates: Record<string, number> = {
    'basic': 2500,
    'standard': 5000,
    'premium': 10000,
    'luxury': 20000
  };
  
  return (rates[quality] || 5000) * (size / 5);
}

/**
 * Calculate windows costs
 */
export function calculateWindowsCost(type: string, area: number): number {
  const rates: Record<string, number> = {
    'pvc': 400,
    'aluminum': 650,
    'wood': 700,
    'mixed': 750
  };
  
  return (rates[type] || 500) * area;
}

/**
 * Calculate insulation costs
 */
export function calculateInsulationCost(type: string, surface: number): number {
  const rates: Record<string, number> = {
    'base': 30,
    'performance': 45,
    'ultraPerformance': 65,
    'sansAvis': 40
  };
  
  return (rates[type] || 40) * surface;
}

/**
 * Calculate renewable energy solutions costs
 */
export function calculateRenewableEnergyCost(type: string, surface: number): number {
  const rates: Record<string, number> = {
    'solar': 250,
    'geothermal': 180,
    'heatPump': 120,
    'windmill': 300
  };
  
  return (rates[type] || 200) * surface * 0.1;
}

/**
 * Calculate environmental solutions costs
 */
export function calculateEnvironmentalSolutionsCost(type: string, surface: number): number {
  const rates: Record<string, number> = {
    'rainwaterHarvesting': 3500,
    'greyWaterRecycling': 5000,
    'greenRoof': 150, // per m²
    'smartHome': 80 // per m²
  };
  
  if (type === 'greenRoof' || type === 'smartHome') {
    return rates[type] * surface;
  }
  
  return rates[type] || 4000;
}

/**
 * Calculate electrical cost (renamed from electrical to electricity for consistency)
 */
export function calculateElectricalCost(formData: any, surface?: number): number {
  return calculateElectricityCost(formData, surface);
}
