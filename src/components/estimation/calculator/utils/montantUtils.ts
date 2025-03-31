
/**
 * Utility functions for calculating costs in the estimation forms
 */

// Base cost factors
const BASE_FACTORS = {
  ELECTRICAL: 50, // €/m²
  PLUMBING: 80, // €/m²
  HEATING: 70, // €/m²
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
export const calculateElectricalCost = (surface: number, quality: string = 'STANDARD'): number => {
  const basePrice = BASE_FACTORS.ELECTRICAL * surface;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate plumbing system cost
 */
export const calculatePlumbingCost = (surface: number, quality: string = 'STANDARD'): number => {
  const basePrice = BASE_FACTORS.PLUMBING * surface;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate heating system cost
 */
export const calculateHeatingCost = (surface: number, type: string = 'STANDARD', quality: string = 'STANDARD'): number => {
  let basePrice = BASE_FACTORS.HEATING * surface;
  
  // Adjust based on heating type
  if (type === 'FLOOR_HEATING') {
    basePrice *= 1.5;
  } else if (type === 'HEAT_PUMP') {
    basePrice *= 2.2;
  } else if (type === 'CENTRAL') {
    basePrice *= 1.3;
  }
  
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate insulation cost
 */
export const calculateInsulationCost = (surface: number, quality: string = 'STANDARD'): number => {
  const basePrice = BASE_FACTORS.INSULATION * surface;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate windows cost
 */
export const calculateWindowsCost = (quantity: number, type: string = 'STANDARD', quality: string = 'STANDARD'): number => {
  let basePrice = BASE_FACTORS.WINDOWS * quantity;
  
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
export const calculateInteriorCarpenteryCost = (doorCount: number, quality: string = 'STANDARD'): number => {
  const basePrice = BASE_FACTORS.INTERIOR_DOORS * doorCount;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate plastering cost
 */
export const calculatePlasteringCost = (surface: number, quality: string = 'STANDARD'): number => {
  const basePrice = BASE_FACTORS.PLASTERING * surface;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate painting cost
 */
export const calculatePaintingCost = (surface: number, quality: string = 'STANDARD'): number => {
  const basePrice = BASE_FACTORS.PAINTING * surface;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate parquet flooring cost
 */
export const calculateParquetCost = (surface: number, quality: string = 'STANDARD'): number => {
  const basePrice = BASE_FACTORS.PARQUET * surface;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate soft flooring cost (carpet, vinyl, etc.)
 */
export const calculateSoftFloorCost = (surface: number, quality: string = 'STANDARD'): number => {
  const basePrice = BASE_FACTORS.SOFT_FLOOR * surface;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate floor tiling cost
 */
export const calculateFloorTilingCost = (surface: number, quality: string = 'STANDARD'): number => {
  const basePrice = BASE_FACTORS.TILING * surface;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate masonry wall cost
 */
export const calculateMasonryWallCost = (surface: number, quality: string = 'STANDARD'): number => {
  const basePrice = BASE_FACTORS.MASONRY * surface;
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  return Math.round(basePrice * qualityMultiplier);
};

/**
 * Calculate floor structural cost
 */
export const calculateFloorCost = (surface: number, type: string = 'CONCRETE', quality: string = 'STANDARD'): number => {
  let basePrice = BASE_FACTORS.MASONRY * surface * 0.7; // Floor is typically cheaper than walls
  
  // Adjust based on floor type
  if (type === 'WOOD') {
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
export const calculateStructuralFeatureCost = (features: string[], surface: number, 
                                             featureValues: Record<string, number> = {}): number => {
  let totalCost = 0;
  
  if (!features || features.length === 0) return 0;
  
  features.forEach(feature => {
    const featureValue = featureValues[feature] || 0;
    
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
  
  return totalCost;
};

/**
 * Calculate roofing cost
 */
export const calculateRoofingCost = (surface: number, type: string = 'STANDARD', quality: string = 'STANDARD'): number => {
  let basePrice = BASE_FACTORS.ROOFING * surface;
  
  // Adjust based on roof type
  if (type === 'SLATE') {
    basePrice *= 1.8;
  } else if (type === 'TILE') {
    basePrice *= 1.2;
  } else if (type === 'METAL') {
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
export const calculateRoofCoveringRenovCost = (surface: number, type: string = 'STANDARD'): number => {
  return calculateRoofingCost(surface, type) * 0.7; // Renovation is typically 70% of new cost
};

/**
 * Calculate pool cost
 */
export const calculatePoolCost = (surface: number, type: string = 'STANDARD'): number => {
  let basePrice = BASE_FACTORS.POOL * surface;
  
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
export const calculatePoolHeatingCost = (hasHeating: boolean, poolSurface: number): number => {
  if (!hasHeating) return 0;
  
  const basePrice = BASE_FACTORS.POOL_HEATING;
  const surfaceFactor = Math.sqrt(poolSurface) / 3; // Square root to avoid excessive costs for large pools
  
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
export const calculateCarportCost = (surface: number, type: string = 'STANDARD'): number => {
  let basePrice = BASE_FACTORS.CARPORT * surface;
  
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
export const calculateGateCost = (type: string = 'STANDARD', isAutomated: boolean = false): number => {
  let basePrice = BASE_FACTORS.GATE;
  
  // Adjust based on gate type
  if (type === 'SLIDING') {
    basePrice *= 1.2;
  } else if (type === 'SWINGING') {
    basePrice *= 1.0;
  }
  
  // Add automation cost
  if (isAutomated) {
    basePrice += 1500;
  }
  
  return Math.round(basePrice);
};

/**
 * Calculate fencing cost
 */
export const calculateFencingCost = (length: number, type: string = 'STANDARD'): number => {
  let basePrice = BASE_FACTORS.FENCING * length;
  
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
export const calculateTerraceCost = (surface: number, type: string = 'STANDARD'): number => {
  let basePrice = BASE_FACTORS.TERRACE * surface;
  
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
export const calculateLandscapingCost = (surface: number, types: string[] = []): number => {
  let basePrice = BASE_FACTORS.LANDSCAPING * surface;
  let multiplier = 1.0;
  
  // Adjust based on landscaping types
  if (types.includes('LAWN')) {
    multiplier += 0.1;
  }
  if (types.includes('GARDEN')) {
    multiplier += 0.3;
  }
  if (types.includes('TREES')) {
    multiplier += 0.2;
  }
  if (types.includes('IRRIGATION')) {
    multiplier += 0.4;
  }
  if (types.includes('LIGHTING')) {
    multiplier += 0.3;
  }
  
  return Math.round(basePrice * multiplier);
};

/**
 * Calculate renewable energy system cost
 */
export const calculateRenewableEnergyCost = (type: string = 'SOLAR', surface: number = 0): number => {
  let basePrice = BASE_FACTORS.RENEWABLE_ENERGY;
  
  // Adjust based on renewable energy type
  if (type === 'SOLAR') {
    basePrice = 1000 * Math.ceil(surface / 10); // Roughly 1000€ per 10m²
    basePrice = Math.max(basePrice, 5000); // Minimum cost
  } else if (type === 'GEOTHERMAL') {
    basePrice = BASE_FACTORS.GEOTHERMAL;
  } else if (type === 'HEAT_PUMP') {
    basePrice = 8000 + (surface * 20);
  }
  
  return Math.round(basePrice);
};

/**
 * Calculate environmental solutions cost
 */
export const calculateEnvironmentalSolutionsCost = (type: string = 'WATER_RECOVERY', surface: number = 0): number => {
  let basePrice = BASE_FACTORS.ENVIRONMENTAL_SOLUTIONS;
  
  // Adjust based on solution type
  if (type === 'WATER_RECOVERY') {
    basePrice = 5000 + (surface * 10);
  } else if (type === 'GREEN_ROOF') {
    basePrice = surface * 150;
  } else if (type === 'COMPOSTING') {
    basePrice = 2000;
  }
  
  return Math.round(basePrice);
};

/**
 * Calculate bathroom cost
 */
export const calculateBathroomCost = (count: number, quality: string = 'STANDARD'): number => {
  let basePrice = 5000; // Base price for a standard bathroom
  
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  
  return Math.round(basePrice * count * qualityMultiplier);
};

/**
 * Calculate kitchen cost
 */
export const calculateKitchenCost = (quality: string = 'STANDARD', surface: number = 15): number => {
  let basePrice = 7000; // Base price for a standard kitchen
  
  // Adjust for surface
  const surfaceFactor = surface / 15; // Standardized to 15m²
  
  const qualityMultiplier = QUALITY_MULTIPLIER[quality as keyof typeof QUALITY_MULTIPLIER] || QUALITY_MULTIPLIER.STANDARD;
  
  return Math.round(basePrice * surfaceFactor * qualityMultiplier);
};
