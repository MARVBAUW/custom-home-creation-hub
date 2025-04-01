
import { ensureNumber, ensureBoolean } from './typeConversions';

// Base calculation functions
export function calculateCost(baseCost: number, multiplier: number = 1, options: any = {}): number {
  return baseCost * multiplier;
}

// Construction calculations
export function calculateStructuralCost(surface: number, constructionType: string = 'standard'): number {
  let baseRate = 800;
  
  switch (constructionType.toLowerCase()) {
    case 'luxury':
      baseRate = 1200;
      break;
    case 'economic':
      baseRate = 600;
      break;
    case 'passive':
      baseRate = 1000;
      break;
    case 'standard':
    default:
      baseRate = 800;
  }
  
  return surface * baseRate;
}

// Facade calculations
export function calculateFacadeCost(surface: number, facadeType: string = 'standard'): number {
  let baseRate = 150;
  
  switch (facadeType.toLowerCase()) {
    case 'stone':
      baseRate = 280;
      break;
    case 'brick':
      baseRate = 200;
      break;
    case 'wood':
      baseRate = 190;
      break;
    case 'metal':
      baseRate = 210;
      break;
    case 'plaster':
    default:
      baseRate = 150;
  }
  
  return surface * baseRate;
}

// Detailed facade cost calculation
export function calculateDetailedFacadeCost(options: any = {}): number {
  let totalCost = 0;
  const facadeSurface = ensureNumber(options.facadeSurface, 0);
  
  // Calculate based on selected options
  if (options.stone) totalCost += facadeSurface * 280 * ensureNumber(options.stone, 0) / 100;
  if (options.plaster) totalCost += facadeSurface * 150 * ensureNumber(options.plaster, 0) / 100;
  if (options.brick) totalCost += facadeSurface * 200 * ensureNumber(options.brick, 0) / 100;
  if (options.metalCladding) totalCost += facadeSurface * 210 * ensureNumber(options.metalCladding, 0) / 100;
  if (options.woodCladding) totalCost += facadeSurface * 190 * ensureNumber(options.woodCladding, 0) / 100;
  if (options.stoneCladding) totalCost += facadeSurface * 230 * ensureNumber(options.stoneCladding, 0) / 100;
  
  return totalCost > 0 ? totalCost : facadeSurface * 150; // Default to standard plaster if nothing selected
}

// Roofing calculations
export function calculateRoofingCost(surface: number, roofingType: string = 'tiles'): number {
  let baseRate = 120;
  
  switch (roofingType.toLowerCase()) {
    case 'slate':
      baseRate = 180;
      break;
    case 'zinc':
      baseRate = 200;
      break;
    case 'green_roof':
      baseRate = 250;
      break;
    case 'flat_roof':
      baseRate = 160;
      break;
    case 'tiles':
    default:
      baseRate = 120;
  }
  
  return surface * baseRate;
}

// Windows cost calculation
export function calculateWindowsCost(quantity: number, windowType: string = 'standard', options: any = {}): number {
  let baseCost = 500;
  
  switch (windowType.toLowerCase()) {
    case 'high_performance':
      baseCost = 800;
      break;
    case 'acoustic':
      baseCost = 700;
      break;
    case 'triple_glazed':
      baseCost = 900;
      break;
    case 'standard':
    default:
      baseCost = 500;
  }
  
  // Adjust based on options
  if (options.isAluminum) baseCost *= 1.2;
  if (options.isLargeFormat) baseCost *= 1.4;
  
  return quantity * baseCost;
}

// Electrical cost calculation
export function calculateElectricityCost(surface: number, electricalType: string = 'standard'): number {
  let baseRate = 90;
  
  switch (electricalType.toLowerCase()) {
    case 'smart':
      baseRate = 150;
      break;
    case 'basic':
      baseRate = 70;
      break;
    case 'standard':
    default:
      baseRate = 90;
  }
  
  return surface * baseRate;
}

// Plumbing cost calculation
export function calculatePlumbingCost(surface: number, plumbingType: string = 'standard'): number {
  let baseRate = 110;
  
  switch (plumbingType.toLowerCase()) {
    case 'high_end':
      baseRate = 180;
      break;
    case 'basic':
      baseRate = 80;
      break;
    case 'standard':
    default:
      baseRate = 110;
  }
  
  return surface * baseRate;
}

// Heating cost calculation
export function calculateHeatingCost(surface: number, heatingType: string = 'radiator'): number {
  let baseRate = 100;
  
  switch (heatingType.toLowerCase()) {
    case 'floor_heating':
      baseRate = 150;
      break;
    case 'heat_pump':
      baseRate = 180;
      break;
    case 'solar':
      baseRate = 200;
      break;
    case 'radiator':
    default:
      baseRate = 100;
  }
  
  return surface * baseRate;
}

// Floor tiles cost calculation
export function calculateTilesCost(surface: number, tileType: string = 'standard', options: any = {}): number {
  let baseRate = 90;
  
  switch (tileType.toLowerCase()) {
    case 'natural_stone':
      baseRate = 150;
      break;
    case 'porcelain':
      baseRate = 120;
      break;
    case 'ceramic':
    default:
      baseRate = 90;
  }
  
  // Adjust based on options
  if (options.isLargeFormat) baseRate *= 1.2;
  if (options.isComplexPattern) baseRate *= 1.3;
  
  return surface * baseRate;
}

// Parquet cost calculation
export function calculateParquetCost(surface: number, parquetType: string = 'standard'): number {
  let baseRate = 80;
  
  switch (parquetType.toLowerCase()) {
    case 'solid_wood':
      baseRate = 120;
      break;
    case 'engineered':
      baseRate = 90;
      break;
    case 'laminate':
      baseRate = 50;
      break;
    case 'standard':
    default:
      baseRate = 80;
  }
  
  return surface * baseRate;
}

// Painting cost calculation
export function calculatePaintingCost(surface: number, paintType: string = 'standard'): number {
  let baseRate = 35;
  
  switch (paintType.toLowerCase()) {
    case 'high_quality':
      baseRate = 50;
      break;
    case 'eco_friendly':
      baseRate = 45;
      break;
    case 'basic':
      baseRate = 25;
      break;
    case 'standard':
    default:
      baseRate = 35;
  }
  
  return surface * baseRate;
}

// Kitchen cost calculation
export function calculateKitchenCost(options: any = {}): number {
  const baseCost = 5000;
  let totalCost = baseCost;
  
  // Add costs based on options
  if (options.isHighEnd) totalCost += 8000;
  if (options.isCustomMade) totalCost += 5000;
  if (options.hasIsland) totalCost += 2500;
  if (options.hasPremiumAppliances) totalCost += 4000;
  
  return totalCost;
}

// Bathroom cost calculation
export function calculateBathroomCost(options: any = {}): number {
  const baseCost = 4000;
  let totalCost = baseCost;
  
  // Add costs based on options
  if (options.isHighEnd) totalCost += 6000;
  if (options.hasShower) totalCost += 1500;
  if (options.hasBathtub) totalCost += 2000;
  if (options.hasDoubleSink) totalCost += 1200;
  
  return totalCost;
}

// External works cost calculation
export function calculateExternalWorksCost(surface: number, options: any = {}): number {
  const baseRate = 50;
  let totalCost = surface * baseRate;
  
  // Add costs based on options
  if (options.hasTerrace) totalCost += ensureNumber(options.terraceSize, 0) * 200;
  if (options.hasGarden) totalCost += ensureNumber(options.gardenSize, 0) * 80;
  if (options.hasSwimmingPool) totalCost += 20000;
  if (options.hasFencing) totalCost += ensureNumber(options.fencingLength, 0) * 120;
  
  return totalCost;
}
