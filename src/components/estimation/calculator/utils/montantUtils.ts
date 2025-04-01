
import { ensureNumber, ensureBoolean, percentageToNumber } from './typeConversions';

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

// Roofing renovation costs
export function calculateRoofingRenovCost(roofType: string, roofArea: string | number): number {
  const area = ensureNumber(roofArea, 0);
  let rate = 120; // Default rate
  
  switch(roofType) {
    case 'TUILES':
      rate = 120;
      break;
    case 'ARDOISES':
      rate = 240;
      break;
    case 'ZINC':
      rate = 180;
      break;
    case 'BACS ACIER':
      rate = 110;
      break;
    case 'NON CONCERNE':
      return 0;
    default:
      rate = 120;
  }
  
  return area * rate;
}

// Roof framework renovation costs
export function calculateRoofFrameworkRenovCost(roofType: string, roofArea: string | number): number {
  const area = ensureNumber(roofArea, 0);
  let rate = 160; // Default rate
  
  switch(roofType) {
    case 'TOITURE TERRASSE ACCESSIBLE':
      rate = 190;
      break;
    case 'TOITURE TERRASSE INACCESSIBLE':
      rate = 180;
      break;
    case 'CHARPENTE INDUSTRIELLE':
      rate = 160;
      break;
    case 'CHARPENTE TRADITIONNELLE':
      rate = 185;
      break;
    case 'NON CONCERNE':
      return 0;
    default:
      rate = 160;
  }
  
  return area * rate;
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

// Electrical cost calculation alias
export function calculateElectricalCost(electricalType: string, surface: number): number {
  return calculateElectricityCost(surface, electricalType);
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
export function calculateHeatingCost(heatingType: string = 'standard', surface: number = 0): number {
  let baseRate = 100;
  
  switch (heatingType.toLowerCase()) {
    case 'floor_heating':
    case 'eco':
      baseRate = 150;
      break;
    case 'heat_pump':
      baseRate = 180;
      break;
    case 'solar':
    case 'economic':
      baseRate = 120;
      break;
    case 'radiator':
    case 'standard':
    default:
      baseRate = 100;
  }
  
  return surface * baseRate;
}

// Air conditioning cost calculation
export function calculateAirConditioningCost(hasAirConditioning: boolean, surface: number): number {
  if (!hasAirConditioning) return 0;
  return surface * 120; // Base rate of 120€/m² for air conditioning
}

// Floor tiles cost calculation
export function calculateFloorTilingCost(tileType: string = 'standard', percentage: number = 100, surface: number = 0): number {
  let baseRate = 90;
  
  switch (tileType.toLowerCase()) {
    case 'premium':
      baseRate = 150;
      break;
    case 'medium':
      baseRate = 120;
      break;
    case 'standard':
    default:
      baseRate = 90;
  }
  
  // Apply percentage of total surface
  const tileArea = surface * (percentage / 100);
  return tileArea * baseRate;
}

// Wall tiles cost calculation
export function calculateWallTilingCost(tileType: string = 'standard', surface: number = 0): number {
  let baseRate = 80;
  
  switch (tileType.toLowerCase()) {
    case 'premium':
      baseRate = 130;
      break;
    case 'medium':
      baseRate = 100;
      break;
    case 'standard':
    default:
      baseRate = 80;
  }
  
  // Assume wall tiling covers about 20% of the walls in a typical house
  const wallArea = surface * 0.2;
  return wallArea * baseRate;
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

// Soft flooring cost calculation (vinyl, carpet, etc.)
export function calculateSoftFloorCost(floorType: string, surface: number): number {
  let baseRate = 50;
  
  switch (floorType.toLowerCase()) {
    case 'premium_vinyl':
      baseRate = 80;
      break;
    case 'carpet':
      baseRate = 60;
      break;
    case 'standard_vinyl':
    default:
      baseRate = 50;
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
  
  // Check if options is a string
  if (typeof options === 'string') {
    switch (options.toLowerCase()) {
      case 'basic':
        return 5000;
      case 'standard':
        return 8000;
      case 'premium':
        return 12000;
      case 'luxury':
        return 18000;
      default:
        return 5000;
    }
  }
  
  // Add costs based on options
  if (options.isHighEnd) totalCost += 8000;
  if (options.isCustomMade) totalCost += 5000;
  if (options.hasIsland) totalCost += 2500;
  if (options.hasPremiumAppliances) totalCost += 4000;
  
  return totalCost;
}

// Bathroom cost calculation
export function calculateBathroomCost(bathroomType: string = 'standard', count: number = 1): number {
  let baseCost;
  
  switch (bathroomType.toLowerCase()) {
    case 'luxury':
      baseCost = 12000;
      break;
    case 'premium':
      baseCost = 8000;
      break;
    case 'standard':
    default:
      baseCost = 5000;
  }
  
  return baseCost * count;
}

// Demolition cost calculation
export function calculateDemolitionCost(demolitionType: string, area: number): number {
  let baseRate = 100;
  
  switch (demolitionType.toLowerCase()) {
    case 'complete':
      baseRate = 150;
      break;
    case 'partial':
      baseRate = 100;
      break;
    case 'light':
      baseRate = 50;
      break;
    default:
      baseRate = 100;
  }
  
  return area * baseRate;
}

// Masonry wall cost calculation
export function calculateMasonryWallCost(wallType: string, length: number): number {
  let baseRate = 350;
  
  switch (wallType.toLowerCase()) {
    case 'brick':
      baseRate = 400;
      break;
    case 'concrete_blocks':
      baseRate = 350;
      break;
    case 'stone':
      baseRate = 500;
      break;
    default:
      baseRate = 350;
  }
  
  return length * baseRate;
}

// Floor cost calculation
export function calculateFloorCost(floorType: string, area: number): number {
  let baseRate = 120;
  
  switch (floorType.toLowerCase()) {
    case 'concrete':
      baseRate = 120;
      break;
    case 'wood':
      baseRate = 180;
      break;
    case 'reinforced':
      baseRate = 200;
      break;
    default:
      baseRate = 120;
  }
  
  return area * baseRate;
}

// Structural feature cost calculation
export function calculateStructuralFeatureCost(featureType: string, quantity: number): number {
  let baseCost = 1000;
  
  switch (featureType.toLowerCase()) {
    case 'beam':
      baseCost = 1000;
      break;
    case 'column':
      baseCost = 800;
      break;
    case 'arch':
      baseCost = 1500;
      break;
    default:
      baseCost = 1000;
  }
  
  return baseCost * quantity;
}

// Interior carpentry cost calculation
export function calculateInteriorCarpenteryCost(carpentryType: string, area: number): number {
  let baseRate = 300;
  
  switch (carpentryType.toLowerCase()) {
    case 'custom_built_in':
      baseRate = 500;
      break;
    case 'standard_doors':
      baseRate = 300;
      break;
    case 'hardwood_trim':
      baseRate = 200;
      break;
    default:
      baseRate = 300;
  }
  
  return baseRate * area;
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

// Landscaping cost calculation
export function calculateLandscapingCost(landscapeType: string, area: number): number {
  let baseRate = 50;
  
  switch (landscapeType.toUpperCase()) {
    case 'UN PEU':
      baseRate = 50;
      break;
    case 'BEAUCOUP':
      baseRate = 100;
      break;
    case 'PASSIONNEMENT':
      baseRate = 150;
      break;
    default:
      baseRate = 50;
  }
  
  return area * baseRate;
}

// Fencing cost calculation
export function calculateFencingCost(length: number): number {
  return length * 120; // Standard rate of 120€/m for fencing
}

// Gate cost calculation
export function calculateGateCost(length: number): number {
  return length * 600; // Standard rate of 600€/m for gates
}

// Terrace cost calculation
export function calculateTerraceCost(area: number): number {
  return area * 200; // Standard rate of 200€/m² for terraces
}

// Plaster work cost calculation
export function calculatePlasteringCost(plastererType: string, surface: number): number {
  let baseRate = 40;
  
  switch (plastererType.toLowerCase()) {
    case 'premium':
      baseRate = 60;
      break;
    case 'standard':
      baseRate = 40;
      break;
    case 'basic':
      baseRate = 30;
      break;
    default:
      baseRate = 40;
  }
  
  return surface * baseRate;
}

// Insulation cost calculation
export function calculateInsulationCost(insulationType: string, surface: number): number {
  let baseRate = 50;
  
  switch (insulationType.toLowerCase()) {
    case 'premium':
      baseRate = 80;
      break;
    case 'standard':
      baseRate = 50;
      break;
    case 'basic':
      baseRate = 30;
      break;
    default:
      baseRate = 50;
  }
  
  return surface * baseRate;
}

// Renewable energy cost calculation
export function calculateRenewableEnergyCost(energyType: string, currentTotal: number): number {
  let percentage = 0;
  
  switch (energyType.toLowerCase()) {
    case 'optimized':
      percentage = 0.035;
      break;
    case 'semiautonomous':
      percentage = 0.07;
      break;
    case 'autonomous':
      percentage = 0.11;
      break;
    case 'standard':
    default:
      percentage = 0;
  }
  
  return currentTotal * percentage;
}

// Environmental solutions cost calculation
export function calculateEnvironmentalSolutionsCost(solutionType: string, currentTotal: number): number {
  let percentage = 0;
  
  switch (solutionType.toLowerCase()) {
    case 'low':
      percentage = 0.018;
      break;
    case 'medium':
      percentage = 0.038;
      break;
    case 'high':
      percentage = 0.057;
      break;
    case 'none':
    default:
      percentage = 0;
  }
  
  return currentTotal * percentage;
}

// New montant total calculation helper
export function calculateNewMontantT(currentMontantT: number, additionalCost: number): number {
  return ensureNumber(currentMontantT, 0) + ensureNumber(additionalCost, 0);
}
