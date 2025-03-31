
import { ensureNumber } from "./typeConversions";

/**
 * Calculate the electrical cost based on the type of installation and surface
 * @param electricalType Type of electrical installation
 * @param surface Surface area in square meters
 * @returns The calculated electrical cost
 */
export function calculateElectricalCost(electricalType: string, surface: number): number {
  let ratePerSqm = 0;
  
  switch (electricalType) {
    case 'premium':
      ratePerSqm = 120;
      break;
    case 'advanced':
      ratePerSqm = 90;
      break;
    case 'standard':
    default:
      ratePerSqm = 65;
      break;
  }
  
  return surface * ratePerSqm;
}

/**
 * Calculate the plumbing cost based on the type of installation and surface
 * @param plumbingType Type of plumbing installation
 * @param surface Surface area in square meters
 * @returns The calculated plumbing cost
 */
export function calculatePlumbingCost(plumbingType: string, surface: number): number {
  let ratePerSqm = 0;
  
  switch (plumbingType) {
    case 'premium':
      ratePerSqm = 95;
      break;
    case 'advanced':
      ratePerSqm = 75;
      break;
    case 'standard':
    default:
      ratePerSqm = 55;
      break;
  }
  
  return surface * ratePerSqm;
}

/**
 * Calculate the heating cost based on the type of installation and surface
 * @param heatingType Type of heating system
 * @param surface Surface area in square meters
 * @param hasAirConditioning Whether air conditioning is included
 * @returns The calculated heating cost
 */
export function calculateHeatingCost(heatingType: string, surface: number, hasAirConditioning?: boolean): number {
  let baseRate = 0;
  
  switch (heatingType) {
    case 'ecological':
      baseRate = 120;
      break;
    case 'economical':
      baseRate = 45;
      break;
    case 'standard':
    default:
      baseRate = 60;
      break;
  }
  
  let total = surface * baseRate;
  
  // Add air conditioning cost if applicable
  if (hasAirConditioning) {
    total += surface * 65;
  }
  
  return total;
}

/**
 * Calculate the plastering cost based on the type and surface
 * @param plasteringType Type of plastering work
 * @param surface Surface area in square meters
 * @returns The calculated plastering cost
 */
export function calculatePlasteringCost(plasteringType: string, surface: number): number {
  let ratePerSqm = 0;
  
  switch (plasteringType) {
    case 'advanced':
      ratePerSqm = 120;
      break;
    case 'specific':
      ratePerSqm = 105;
      break;
    case 'standard':
    default:
      ratePerSqm = 95;
      break;
  }
  
  return surface * ratePerSqm;
}

/**
 * Calculate the interior carpentry cost based on type, surface, and extras
 * @param doorType Type of interior doors
 * @param surface Surface area in square meters
 * @param hasMoldings Whether moldings are included
 * @param hasCustomFurniture Whether custom furniture is included
 * @returns The calculated interior carpentry cost
 */
export function calculateInteriorCarpenteryCost(
  doorType: string, 
  surface: number, 
  hasMoldings?: boolean, 
  hasCustomFurniture?: boolean
): number {
  let baseRate = 0;
  
  switch (doorType) {
    case 'premium':
      baseRate = 70;
      break;
    case 'standing':
      baseRate = 60;
      break;
    case 'standard':
    default:
      baseRate = 50;
      break;
  }
  
  let total = surface * baseRate;
  
  // Add cost for moldings if applicable
  if (hasMoldings) {
    total += surface * 10;
  }
  
  // Add cost for custom furniture if applicable
  if (hasCustomFurniture) {
    total += surface * 20;
  }
  
  return total;
}

/**
 * Calculate the floor tiling cost based on type, percentage and surface
 * @param tileType Type of floor tiles
 * @param percentage Percentage of the surface to be tiled
 * @param surface Total surface area in square meters
 * @returns The calculated floor tiling cost
 */
export function calculateFloorTilingCost(tileType: string, percentage: number, surface: number): number {
  let ratePerSqm = 0;
  
  switch (tileType) {
    case 'premium':
      ratePerSqm = 0.86;
      break;
    case 'medium':
      ratePerSqm = 0.76;
      break;
    case 'standard':
    default:
      ratePerSqm = 0.66;
      break;
  }
  
  return surface * (percentage / 100) * ratePerSqm;
}

/**
 * Calculate the wall tiling cost based on type and surface
 * @param tileType Type of wall tiles
 * @param surface Surface area in square meters
 * @returns The calculated wall tiling cost
 */
export function calculateWallTilingCost(tileType: string, surface: number): number {
  let ratePerSqm = 0;
  
  switch (tileType) {
    case 'premium':
      ratePerSqm = 0.0963;
      break;
    case 'medium':
      ratePerSqm = 0.0612;
      break;
    case 'standard':
    default:
      ratePerSqm = 0.0536;
      break;
  }
  
  return surface * ratePerSqm;
}

/**
 * Calculate the parquet flooring cost based on type, percentage and surface
 * @param parquetType Type of parquet
 * @param percentage Percentage of the surface to have parquet
 * @param surface Total surface area in square meters
 * @returns The calculated parquet cost
 */
export function calculateParquetCost(parquetType: string, percentage: number, surface: number): number {
  let ratePerSqm = 0;
  
  switch (parquetType) {
    case 'premium':
      ratePerSqm = 1.08;
      break;
    case 'medium':
      ratePerSqm = 0.66;
      break;
    case 'standard':
    default:
      ratePerSqm = 0.55;
      break;
  }
  
  return surface * (percentage / 100) * ratePerSqm;
}

/**
 * Calculate the soft flooring cost based on type, percentage and surface
 * @param flooringType Type of soft flooring
 * @param percentage Percentage of the surface to have soft flooring
 * @param surface Total surface area in square meters
 * @returns The calculated soft flooring cost
 */
export function calculateSoftFlooringCost(flooringType: string, percentage: number, surface: number): number {
  let ratePerSqm = 0;
  
  switch (flooringType) {
    case 'premium':
      ratePerSqm = 0.4;
      break;
    case 'medium':
      ratePerSqm = 0.35;
      break;
    case 'standard':
    default:
      ratePerSqm = 0.3;
      break;
  }
  
  return surface * (percentage / 100) * ratePerSqm;
}

/**
 * Calculate the wall painting cost based on type, percentages and surface
 * @param paintType Type of paint (base, decorative, etc.)
 * @param percentages Object containing percentages for different wall coverings
 * @param surface Total surface area in square meters
 * @returns The calculated painting cost
 */
export function calculatePaintingCost(
  percentages: {
    basicPaint: number;
    decorativePaint: number;
    wallpaper: number;
    woodPaneling: number;
    stoneCladding: number;
  },
  surface: number
): number {
  // Calculate the cost for each type of wall covering
  const basicPaintCost = percentages.basicPaint > 0 ? surface * (percentages.basicPaint / 100) * 0.58 : 0;
  const decorativePaintCost = percentages.decorativePaint > 0 ? surface * (percentages.decorativePaint / 100) * 0.606 : 0;
  const wallpaperCost = percentages.wallpaper > 0 ? surface * (percentages.wallpaper / 100) * 0.6 : 0;
  const woodPanelingCost = percentages.woodPaneling > 0 ? surface * (percentages.woodPaneling / 100) * 1.3 : 0;
  const stonePanelingCost = percentages.stoneCladding > 0 ? surface * (percentages.stoneCladding / 100) * 1.9 : 0;
  
  // Return the total cost
  return basicPaintCost + decorativePaintCost + wallpaperCost + woodPanelingCost + stonePanelingCost;
}

/**
 * Calculate the renewable energy cost based on type and total amount
 * @param energyType Type of renewable energy solution
 * @param totalAmount Current total amount
 * @returns The additional cost for renewable energy
 */
export function calculateRenewableEnergyCost(energyType: string, totalAmount: number): number {
  let percentageIncrease = 0;
  
  switch (energyType) {
    case 'autonomous':
      percentageIncrease = 0.11;
      break;
    case 'semiAutonomous':
      percentageIncrease = 0.07;
      break;
    case 'optimized':
      percentageIncrease = 0.035;
      break;
    case 'standard':
    default:
      percentageIncrease = 0;
      break;
  }
  
  return totalAmount * percentageIncrease;
}

/**
 * Calculate the environmental solutions cost based on preference level and total amount
 * @param environmentalType Level of environmental commitment
 * @param totalAmount Current total amount
 * @returns The additional cost for environmental solutions
 */
export function calculateEnvironmentalSolutionsCost(environmentalType: string, totalAmount: number): number {
  let percentageIncrease = 0;
  
  switch (environmentalType) {
    case 'high':
      percentageIncrease = 0.057;
      break;
    case 'medium':
      percentageIncrease = 0.038;
      break;
    case 'low':
      percentageIncrease = 0.018;
      break;
    case 'none':
    default:
      percentageIncrease = 0;
      break;
  }
  
  return totalAmount * percentageIncrease;
}

/**
 * Calculate the windows cost based on type, area and surface
 * @param windowType Type of windows
 * @param windowArea Area of windows in square meters
 * @param isRenovation Whether it's a renovation or new construction
 * @returns The calculated windows cost
 */
export function calculateWindowsCost(windowType: string, windowArea: number, isRenovation: boolean): number {
  let ratePerSqm = 0;
  
  switch (windowType) {
    case 'premium':
      ratePerSqm = isRenovation ? 1600 : 1400;
      break;
    case 'medium':
      ratePerSqm = isRenovation ? 1200 : 1000;
      break;
    case 'standard':
    default:
      ratePerSqm = isRenovation ? 900 : 750;
      break;
  }
  
  return windowArea * ratePerSqm;
}

/**
 * Calculate facade cost based on type and surface
 * @param facadeType Type of facade
 * @param surface Surface area in square meters
 * @returns The calculated facade cost
 */
export function calculateFacadeCost(facadeType: string, surface: number): number {
  let ratePerSqm = 0;
  
  switch (facadeType) {
    case 'stone':
      ratePerSqm = 280;
      break;
    case 'brick':
      ratePerSqm = 220;
      break;
    case 'wood':
      ratePerSqm = 200;
      break;
    case 'plaster':
    default:
      ratePerSqm = 150;
      break;
  }
  
  return surface * ratePerSqm;
}

/**
 * Calculate facade cost based on percentages
 * @param percentages Object containing percentages for different facade materials
 * @param surface Total surface area in square meters
 * @returns The calculated facade cost
 */
export function calculateFacadeMixCost(
  percentages: {
    stone: number;
    plaster: number;
    brick: number;
    metalCladding: number;
    woodCladding: number;
    stoneCladding: number;
  },
  surface: number
): number {
  // Calculate the cost for each facade material
  const stoneCost = percentages.stone > 0 ? surface * (percentages.stone / 100) * 280 : 0;
  const plasterCost = percentages.plaster > 0 ? surface * (percentages.plaster / 100) * 150 : 0;
  const brickCost = percentages.brick > 0 ? surface * (percentages.brick / 100) * 220 : 0;
  const metalCladdingCost = percentages.metalCladding > 0 ? surface * (percentages.metalCladding / 100) * 240 : 0;
  const woodCladdingCost = percentages.woodCladding > 0 ? surface * (percentages.woodCladding / 100) * 200 : 0;
  const stoneCladdingCost = percentages.stoneCladding > 0 ? surface * (percentages.stoneCladding / 100) * 250 : 0;
  
  // Return the total cost
  return stoneCost + plasterCost + brickCost + metalCladdingCost + woodCladdingCost + stoneCladdingCost;
}

/**
 * Calculate insulation cost based on type and surface
 * @param insulationType Type of insulation
 * @param surface Surface area in square meters
 * @returns The calculated insulation cost
 */
export function calculateInsulationCost(insulationType: string, surface: number): number {
  let ratePerSqm = 0;
  
  switch (insulationType) {
    case 'premium':
      ratePerSqm = 95;
      break;
    case 'medium':
      ratePerSqm = 75;
      break;
    case 'standard':
    default:
      ratePerSqm = 55;
      break;
  }
  
  return surface * ratePerSqm;
}

/**
 * Calculate component cost based on component type and parameters
 * @param componentType Type of component
 * @param params Parameters for calculation
 * @returns The calculated component cost
 */
export function calculateComponentCost(componentType: string, params: any): number {
  switch (componentType) {
    case 'electrical':
      return calculateElectricalCost(params.type, ensureNumber(params.surface));
    case 'plumbing':
      return calculatePlumbingCost(params.type, ensureNumber(params.surface));
    case 'heating':
      return calculateHeatingCost(params.type, ensureNumber(params.surface), params.hasAirConditioning);
    case 'plastering':
      return calculatePlasteringCost(params.type, ensureNumber(params.surface));
    case 'interiorCarpentry':
      return calculateInteriorCarpenteryCost(params.type, ensureNumber(params.surface), params.hasMoldings, params.hasCustomFurniture);
    case 'floorTiling':
      return calculateFloorTilingCost(params.type, ensureNumber(params.percentage), ensureNumber(params.surface));
    case 'wallTiling':
      return calculateWallTilingCost(params.type, ensureNumber(params.surface));
    case 'parquet':
      return calculateParquetCost(params.type, ensureNumber(params.percentage), ensureNumber(params.surface));
    case 'softFlooring':
      return calculateSoftFlooringCost(params.type, ensureNumber(params.percentage), ensureNumber(params.surface));
    case 'painting':
      return calculatePaintingCost(params.percentages, ensureNumber(params.surface));
    case 'windows':
      return calculateWindowsCost(params.type, ensureNumber(params.area), params.isRenovation);
    case 'facade':
      return calculateFacadeCost(params.type, ensureNumber(params.surface));
    case 'facadeMix':
      return calculateFacadeMixCost(params.percentages, ensureNumber(params.surface));
    case 'insulation':
      return calculateInsulationCost(params.type, ensureNumber(params.surface));
    case 'renewableEnergy':
      return calculateRenewableEnergyCost(params.type, ensureNumber(params.totalAmount));
    case 'environmentalSolutions':
      return calculateEnvironmentalSolutionsCost(params.type, ensureNumber(params.totalAmount));
    default:
      return 0;
  }
}
