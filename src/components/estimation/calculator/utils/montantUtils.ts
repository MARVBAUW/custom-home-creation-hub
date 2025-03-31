
/**
 * Utility functions for calculating costs in the estimation form
 */
import { ensureNumber } from './typeConversions';

/**
 * Calculate floor tiling cost based on type, percentage, and surface area
 * @param type The type of floor tiling
 * @param percentage Percentage of surface to be tiled
 * @param surface Total surface area
 * @returns Cost of floor tiling
 */
export const calculateFloorTilingCost = (
  type: string,
  percentage: number | string,
  surface: number | string
): number => {
  const percentValue = ensureNumber(percentage, 0) / 100;
  const surfaceValue = ensureNumber(surface, 0);
  const tileArea = surfaceValue * percentValue;
  
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'standard':
      costPerSquareMeter = 50; // €/m²
      break;
    case 'medium':
      costPerSquareMeter = 75; // €/m²
      break;
    case 'premium':
      costPerSquareMeter = 120; // €/m²
      break;
    default:
      costPerSquareMeter = 0;
  }
  
  return Math.round(tileArea * costPerSquareMeter);
};

/**
 * Calculate wall tiling cost based on type and surface area
 * @param type The type of wall tiling
 * @param surface Total surface area (used for estimating wall area)
 * @returns Cost of wall tiling
 */
export const calculateWallTilingCost = (
  type: string,
  surface: number | string
): number => {
  const surfaceValue = ensureNumber(surface, 0);
  // Estimate wall tile area based on surface (bathrooms + kitchen area)
  const estimatedWallArea = surfaceValue * 0.2; // 20% of total surface for bathrooms and kitchen walls
  
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'standard':
      costPerSquareMeter = 45; // €/m²
      break;
    case 'medium':
      costPerSquareMeter = 65; // €/m²
      break;
    case 'premium':
      costPerSquareMeter = 95; // €/m²
      break;
    default:
      costPerSquareMeter = 0;
  }
  
  return Math.round(estimatedWallArea * costPerSquareMeter);
};

/**
 * Calculate demolition cost based on type, area, and percentage
 * @param type The type of demolition
 * @param area Surface area
 * @param percentage Percentage to demolish (0-100)
 * @returns Cost of demolition
 */
export const calculateDemolitionCost = (
  type: string,
  area: number | string,
  percentage: number | string
): number => {
  const areaValue = ensureNumber(area, 0);
  const percentValue = ensureNumber(percentage, 0) / 100;
  
  // Apply demolition to the percentage of the area
  const demolitionArea = areaValue * percentValue;
  
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'GROS OEUVRE (MACONNERIE, DALLE..)':
      costPerSquareMeter = 180; // €/m²
      break;
    case 'REVETEMENT DE FACADE':
      costPerSquareMeter = 50; // €/m²
      break;
    case 'PLATRERIE':
      costPerSquareMeter = 30; // €/m²
      break;
    case 'REVETEMENTS DE SOL':
      costPerSquareMeter = 25; // €/m²
      break;
    case 'MENUISERIES INTERIEURES':
      costPerSquareMeter = 35; // €/m²
      break;
    case 'MENUISERIES EXTERIEURES':
      costPerSquareMeter = 45; // €/m²
      break;
    case 'PLOMBERIE':
      costPerSquareMeter = 40; // €/m²
      break;
    case 'EQUIPEMENTS SANITAIRES':
      costPerSquareMeter = 45; // €/m²
      break;
    case 'ELECTRICITE':
      costPerSquareMeter = 35; // €/m²
      break;
    case 'CLIMATISATION':
      costPerSquareMeter = 40; // €/m²
      break;
    case 'VENTILATION':
      costPerSquareMeter = 30; // €/m²
      break;
    case 'CHAUFFAGE':
      costPerSquareMeter = 35; // €/m²
      break;
    case 'TOTALITE HORS GROS OEUVRE':
      costPerSquareMeter = 250; // €/m²
      break;
    default:
      costPerSquareMeter = 0;
  }
  
  return Math.round(demolitionArea * costPerSquareMeter);
};

/**
 * Calculate landscaping cost based on type and area
 * @param type The type of landscaping
 * @param area Land area to landscape
 * @returns Cost of landscaping
 */
export const calculateLandscapingCost = (
  type: string,
  area: number | string
): number => {
  const areaValue = ensureNumber(area, 0);
  
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'UN PEU':
      costPerSquareMeter = 30; // €/m²
      break;
    case 'BEAUCOUP':
      costPerSquareMeter = 60; // €/m²
      break;
    case 'PASSIONNEMENT':
      costPerSquareMeter = 100; // €/m²
      break;
    default:
      costPerSquareMeter = 0;
  }
  
  return Math.round(areaValue * costPerSquareMeter);
};

/**
 * Calculate fencing cost based on length
 * @param length Length of fencing in meters
 * @returns Cost of fencing
 */
export const calculateFencingCost = (
  length: number | string
): number => {
  const lengthValue = ensureNumber(length, 0);
  // Average cost of fencing per linear meter
  const costPerMeter = 120; // €/m
  
  return Math.round(lengthValue * costPerMeter);
};

/**
 * Calculate gate cost based on width
 * @param width Width of gate in meters
 * @returns Cost of gate
 */
export const calculateGateCost = (
  width: number | string
): number => {
  const widthValue = ensureNumber(width, 0);
  // Base cost plus cost per meter of width
  const baseCost = 800; // €
  const costPerMeter = 400; // €/m
  
  return Math.round(baseCost + (widthValue * costPerMeter));
};

/**
 * Calculate terrace cost based on area
 * @param area Terrace area in square meters
 * @returns Cost of terrace
 */
export const calculateTerraceCost = (
  area: number | string
): number => {
  const areaValue = ensureNumber(area, 0);
  // Average cost of terrace per square meter
  const costPerSquareMeter = 200; // €/m²
  
  return Math.round(areaValue * costPerSquareMeter);
};

/**
 * Calculate heating system cost based on type and surface
 * @param type Heating system type
 * @param surface Surface area to heat
 * @returns Cost of heating system
 */
export const calculateHeatingCost = (
  type: string,
  surface: number | string
): number => {
  const surfaceValue = ensureNumber(surface, 0);
  
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'electric':
      costPerSquareMeter = 60; // €/m²
      break;
    case 'gas':
      costPerSquareMeter = 80; // €/m²
      break;
    case 'heat_pump':
      costPerSquareMeter = 120; // €/m²
      break;
    case 'solar':
      costPerSquareMeter = 140; // €/m²
      break;
    case 'wood':
      costPerSquareMeter = 90; // €/m²
      break;
    case 'fuel':
      costPerSquareMeter = 85; // €/m²
      break;
    case 'pellets':
      costPerSquareMeter = 95; // €/m²
      break;
    default:
      costPerSquareMeter = 70; // Default value
  }
  
  return Math.round(surfaceValue * costPerSquareMeter);
};

/**
 * Calculate air conditioning cost based on surface
 * @param surface Surface area to cool
 * @returns Cost of air conditioning system
 */
export const calculateAirConditioningCost = (
  surface: number | string
): number => {
  const surfaceValue = ensureNumber(surface, 0);
  // Average cost of A/C per square meter
  const costPerSquareMeter = 120; // €/m²
  
  return Math.round(surfaceValue * costPerSquareMeter);
};

/**
 * Calculate bathroom cost based on type and count
 * @param type Bathroom type/quality
 * @param count Number of bathrooms
 * @returns Cost of bathrooms
 */
export const calculateBathroomCost = (
  type: string,
  count: number | string
): number => {
  const countValue = ensureNumber(count, 0);
  
  let costPerBathroom = 0;
  
  switch (type) {
    case 'basic':
      costPerBathroom = 3000; // €
      break;
    case 'standard':
      costPerBathroom = 5000; // €
      break;
    case 'premium':
      costPerBathroom = 10000; // €
      break;
    case 'luxury':
      costPerBathroom = 15000; // €
      break;
    default:
      costPerBathroom = 5000; // Default value
  }
  
  return Math.round(countValue * costPerBathroom);
};

/**
 * Calculate kitchen cost based on type
 * @param type Kitchen type/quality
 * @returns Cost of kitchen
 */
export const calculateKitchenCost = (
  type: string
): number => {
  switch (type) {
    case 'basic':
      return 5000; // €
    case 'standard':
      return 10000; // €
    case 'premium':
      return 20000; // €
    case 'luxury':
      return 35000; // €
    default:
      return 10000; // Default value
  }
};

/**
 * Calculate structural work cost based on features and values
 * @param features Array of structural features
 * @param values Object mapping features to their values
 * @param surface Total surface area
 * @returns Cost of structural work
 */
export const calculateStructuralWorkCost = (
  features: string[],
  values: { [key: string]: string | number },
  surface: number | string
): number => {
  const surfaceValue = ensureNumber(surface, 0);
  let totalCost = 0;
  
  if (!features || !values) return 0;
  
  features.forEach(feature => {
    const featureValue = ensureNumber(values[feature], 0);
    
    switch (feature) {
      case 'MURS PORTEURS':
        totalCost += featureValue * 350; // €/m²
        break;
      case 'DALLE BETON':
        totalCost += featureValue * 150; // €/m²
        break;
      case 'PLANCHER BOIS':
        totalCost += featureValue * 120; // €/m²
        break;
      case 'POUTRES':
        totalCost += featureValue * 250; // €/linear meter
        break;
      case 'ESCALIER':
        totalCost += featureValue * 3500; // € per staircase
        break;
      default:
        // No calculation for unknown features
        break;
    }
  });
  
  return Math.round(totalCost);
};

/**
 * Calculate isolation cost based on type and surface
 * @param type Isolation type
 * @param surface Surface area to isolate
 * @returns Cost of isolation
 */
export const calculateIsolationCost = (
  type: string,
  surface: number | string
): number => {
  const surfaceValue = ensureNumber(surface, 0);
  
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'standard':
      costPerSquareMeter = 40; // €/m²
      break;
    case 'reinforced':
      costPerSquareMeter = 60; // €/m²
      break;
    case 'passive':
      costPerSquareMeter = 100; // €/m²
      break;
    case 'ecological':
      costPerSquareMeter = 80; // €/m²
      break;
    case 'renovation':
      costPerSquareMeter = 50; // €/m²
      break;
    default:
      costPerSquareMeter = 40; // Default value
  }
  
  return Math.round(surfaceValue * costPerSquareMeter);
};

/**
 * Calculate electrical work cost based on type and surface
 * @param type Electrical work type
 * @param surface Surface area
 * @returns Cost of electrical work
 */
export const calculateElectricalCost = (
  type: string,
  surface: number | string
): number => {
  const surfaceValue = ensureNumber(surface, 0);
  
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'basic':
      costPerSquareMeter = 60; // €/m²
      break;
    case 'standard':
      costPerSquareMeter = 90; // €/m²
      break;
    case 'premium':
      costPerSquareMeter = 130; // €/m²
      break;
    case 'smart_home':
      costPerSquareMeter = 180; // €/m²
      break;
    case 'renovation':
      costPerSquareMeter = 100; // €/m²
      break;
    default:
      costPerSquareMeter = 90; // Default value
  }
  
  return Math.round(surfaceValue * costPerSquareMeter);
};

/**
 * Calculate plumbing cost based on type and surface
 * @param type Plumbing type
 * @param surface Surface area
 * @returns Cost of plumbing
 */
export const calculatePlumbingCost = (
  type: string,
  surface: number | string
): number => {
  const surfaceValue = ensureNumber(surface, 0);
  
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'basic':
      costPerSquareMeter = 50; // €/m²
      break;
    case 'standard':
      costPerSquareMeter = 70; // €/m²
      break;
    case 'premium':
      costPerSquareMeter = 100; // €/m²
      break;
    case 'renovation':
      costPerSquareMeter = 80; // €/m²
      break;
    default:
      costPerSquareMeter = 70; // Default value
  }
  
  return Math.round(surfaceValue * costPerSquareMeter);
};

/**
 * Calculate parquet flooring cost based on type and surface
 * @param type Parquet type
 * @param surface Surface area
 * @returns Cost of parquet flooring
 */
export const calculateParquetCost = (
  type: string,
  surface: number | string
): number => {
  const surfaceValue = ensureNumber(surface, 0);
  
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'laminate':
      costPerSquareMeter = 35; // €/m²
      break;
    case 'engineered':
      costPerSquareMeter = 70; // €/m²
      break;
    case 'solid':
      costPerSquareMeter = 100; // €/m²
      break;
    case 'luxury':
      costPerSquareMeter = 150; // €/m²
      break;
    default:
      costPerSquareMeter = 70; // Default value
  }
  
  return Math.round(surfaceValue * costPerSquareMeter);
};

/**
 * Calculate painting cost based on surface and paint types
 * @param types Object with percentages for each paint type
 * @param surface Surface area
 * @returns Cost of painting
 */
export const calculatePaintingCost = (
  types: {
    basicPaint: number;
    decorativePaint: number;
    wallpaper: number;
    woodPaneling: number;
    stoneCladding: number;
  },
  surface: number | string
): number => {
  const surfaceValue = ensureNumber(surface, 0);
  
  // Estimate wall surface area (typically 2.5-3x floor area)
  const wallSurface = surfaceValue * 3;
  
  // Calculate cost for each type based on its percentage
  const basicPaintCost = (types.basicPaint / 100) * wallSurface * 25; // €/m²
  const decorativePaintCost = (types.decorativePaint / 100) * wallSurface * 45; // €/m²
  const wallpaperCost = (types.wallpaper / 100) * wallSurface * 40; // €/m²
  const woodPanelingCost = (types.woodPaneling / 100) * wallSurface * 90; // €/m²
  const stoneCladingCost = (types.stoneCladding / 100) * wallSurface * 120; // €/m²
  
  return Math.round(
    basicPaintCost +
    decorativePaintCost +
    wallpaperCost +
    woodPanelingCost +
    stoneCladingCost
  );
};

/**
 * Calculate pool cost based on type and area
 * @param type Pool type
 * @param area Pool area
 * @returns Cost of pool
 */
export const calculatePoolCost = (
  type: string,
  area: number | string
): number => {
  const areaValue = ensureNumber(area, 0);
  
  let baseCost = 0;
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'aboveground':
      baseCost = 2000;
      costPerSquareMeter = 300; // €/m²
      break;
    case 'concrete':
      baseCost = 10000;
      costPerSquareMeter = 1000; // €/m²
      break;
    case 'fiberglass':
      baseCost = 8000;
      costPerSquareMeter = 800; // €/m²
      break;
    case 'vinyl':
      baseCost = 6000;
      costPerSquareMeter = 600; // €/m²
      break;
    default:
      baseCost = 8000;
      costPerSquareMeter = 800; // Default values
  }
  
  return Math.round(baseCost + (areaValue * costPerSquareMeter));
};

/**
 * Calculate jacuzzi cost based on type and capacity
 * @param type Jacuzzi type
 * @param capacity Capacity in number of people
 * @returns Cost of jacuzzi
 */
export const calculateJacuzziCost = (
  type: string,
  capacity: number | string
): number => {
  const capacityValue = ensureNumber(capacity, 0);
  
  let baseCost = 0;
  let costPerPerson = 0;
  
  switch (type) {
    case 'portable':
      baseCost = 3000;
      costPerPerson = 500; // € per person
      break;
    case 'built-in':
      baseCost = 8000;
      costPerPerson = 1000; // € per person
      break;
    case 'luxury':
      baseCost = 15000;
      costPerPerson = 2000; // € per person
      break;
    default:
      baseCost = 5000;
      costPerPerson = 800; // Default values
  }
  
  return Math.round(baseCost + (capacityValue * costPerPerson));
};
