
// Import the ensureNumber function from typeConversions to re-export it for compatibility
import { ensureNumber } from './typeConversions';

/**
 * Calculate costs for different types of windows based on area
 */
export const calculateWindowsCost = (type: string, area: number): number => {
  const costPerSquareMeter = getWindowCostPerSquareMeter(type);
  return costPerSquareMeter * ensureNumber(area);
};

/**
 * Get cost per square meter for different window types
 */
const getWindowCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'bois': return 750;
    case 'pvc': return 450;
    case 'alu': return 650;
    case 'mixte': return 850;
    case 'pvc_colore': return 550;
    default: return 0;
  }
};

/**
 * Calculate costs for floor tiling based on type and area
 */
export const calculateFloorTilingCost = (type: string, percentage: number, totalArea: number): number => {
  const area = (percentage / 100) * ensureNumber(totalArea);
  const costPerSquareMeter = getFloorTileCostPerSquareMeter(type);
  return costPerSquareMeter * area;
};

/**
 * Get cost per square meter for different floor tile types
 */
const getFloorTileCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'standard': return 80;
    case 'medium': return 120;
    case 'premium': return 200;
    default: return 0;
  }
};

/**
 * Calculate costs for wall tiling based on type and area
 */
export const calculateWallTilingCost = (type: string, totalArea: number): number => {
  // Wall tiling is typically 50% of floor area for bathrooms and kitchens
  const wallArea = ensureNumber(totalArea) * 0.5;
  const costPerSquareMeter = getWallTileCostPerSquareMeter(type);
  return costPerSquareMeter * wallArea;
};

/**
 * Get cost per square meter for different wall tile types
 */
const getWallTileCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'standard': return 60;
    case 'medium': return 90;
    case 'premium': return 150;
    default: return 0;
  }
};

/**
 * Calculate heating system costs
 */
export const calculateHeatingCost = (type: string, area: number): number => {
  const costPerSquareMeter = getHeatingCostPerSquareMeter(type);
  return costPerSquareMeter * ensureNumber(area);
};

/**
 * Get cost per square meter for different heating types
 */
const getHeatingCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'standard': return 120;
    case 'eco': return 180;
    case 'economic': return 90;
    case 'sans_avis': return 130;
    default: return 0;
  }
};

/**
 * Calculate air conditioning costs
 */
export const calculateAirConditioningCost = (hasAirConditioning: boolean, area: number): number => {
  if (!hasAirConditioning) return 0;
  return 180 * ensureNumber(area);
};

/**
 * Calculate roofing renovation costs
 */
export const calculateRoofingRenovCost = (type: string, area: string | number): number => {
  const costPerSquareMeter = getRoofingRenovCostPerSquareMeter(type);
  return costPerSquareMeter * ensureNumber(area);
};

/**
 * Get cost per square meter for different roofing types
 */
const getRoofingRenovCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'TUILES': return 120;
    case 'ARDOISES': return 240;
    case 'ZINC': return 180;
    case 'BACS ACIER': return 110;
    default: return 0;
  }
};

/**
 * Calculate roof framework renovation costs
 */
export const calculateRoofFrameworkRenovCost = (type: string, area: string | number): number => {
  const costPerSquareMeter = getRoofFrameworkRenovCostPerSquareMeter(type);
  return costPerSquareMeter * ensureNumber(area);
};

/**
 * Get cost per square meter for different roof framework types
 */
const getRoofFrameworkRenovCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'TOITURE TERRASSE ACCESSIBLE': return 190;
    case 'TOITURE TERRASSE INACCESSIBLE': return 180;
    case 'CHARPENTE INDUSTRIELLE': return 160;
    case 'CHARPENTE TRADITIONNELLE': return 185;
    default: return 0;
  }
};

/**
 * Calculate painting costs
 */
export const calculatePaintingCost = (options: any, area: number): number => {
  let totalCost = 0;
  
  if (options.basicPaint) {
    totalCost += 20 * area;
  }
  
  if (options.decorativePaint) {
    totalCost += 35 * area;
  }
  
  if (options.wallpaper) {
    totalCost += 30 * area;
  }
  
  if (options.woodPaneling) {
    totalCost += 50 * area;
  }
  
  if (options.stoneCladding) {
    totalCost += 70 * area;
  }
  
  return totalCost;
};

/**
 * Calculate facade renovation costs
 */
export const calculateFacadeCost = (type: string, area: number): number => {
  const costPerSquareMeter = getFacadeCostPerSquareMeter(type);
  return costPerSquareMeter * area;
};

/**
 * Get cost per square meter for different facade types
 */
const getFacadeCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'paint': return 45;
    case 'render': return 65;
    case 'stone': return 220;
    case 'brick': return 180;
    case 'wood': return 150;
    default: return 0;
  }
};

/**
 * Calculate flooring costs
 */
export const calculateFlooringCost = (type: string, area: number): number => {
  const costPerSquareMeter = getFlooringCostPerSquareMeter(type);
  return costPerSquareMeter * area;
};

/**
 * Get cost per square meter for different flooring types
 */
const getFlooringCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'laminate': return 30;
    case 'engineered': return 70;
    case 'solid': return 100;
    case 'exotic': return 150;
    default: return 0;
  }
};

/**
 * Calculate door costs
 */
export const calculateDoorCost = (type: string, count: number): number => {
  const costPerDoor = getDoorCostPerUnit(type);
  return costPerDoor * count;
};

/**
 * Get cost per unit for different door types
 */
const getDoorCostPerUnit = (type: string): number => {
  switch (type) {
    case 'hollow': return 250;
    case 'solid': return 450;
    case 'glazed': return 600;
    case 'custom': return 900;
    default: return 0;
  }
};

// Additional utility functions for other calculation needs

/**
 * Calculate landscaping costs
 */
export const calculateLandscapingCost = (type: string, area: number): number => {
  const costPerSquareMeter = getLandscapingCostPerSquareMeter(type);
  return costPerSquareMeter * area;
};

/**
 * Get cost per square meter for different landscaping types
 */
const getLandscapingCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'UN PEU': return 40;
    case 'BEAUCOUP': return 80;
    case 'PASSIONNEMENT': return 120;
    default: return 0;
  }
};

/**
 * Calculate fencing costs
 */
export const calculateFencingCost = (length: number): number => {
  return 85 * length; // Average cost per linear meter
};

/**
 * Calculate gate costs
 */
export const calculateGateCost = (length: number): number => {
  return 300 * length; // Base cost plus per-meter cost
};

/**
 * Calculate terrace costs
 */
export const calculateTerraceCost = (area: number): number => {
  return 200 * area; // Cost per square meter
};

/**
 * Calculate pool costs
 */
export const calculatePoolCost = (type: string, area: number): number => {
  const costPerSquareMeter = getPoolCostPerSquareMeter(type);
  return costPerSquareMeter * area;
};

/**
 * Get cost per square meter for different pool types
 */
const getPoolCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'concrete': return 1500;
    case 'fiberglass': return 1200;
    case 'vinyl': return 800;
    default: return 0;
  }
};

/**
 * Calculate pool heating costs
 */
export const calculatePoolHeatingCost = (hasHeating: boolean, area: number): number => {
  if (!hasHeating) return 0;
  return 120 * area; // Cost per square meter
};

/**
 * Calculate jacuzzi costs
 */
export const calculateJacuzziCost = (type: string, area: number): number => {
  switch (type) {
    case 'builtin': return 8000 + (500 * area);
    case 'portable': return 5000;
    default: return 0;
  }
};

/**
 * Calculate carport costs
 */
export const calculateCarportCost = (type: string): number => {
  switch (type) {
    case 'standard': return 3500;
    case 'premium': return 7000;
    case 'custom': return 10000;
    default: return 0;
  }
};

/**
 * Calculate demolition costs
 */
export const calculateDemolitionCost = (types: string[], areas: Record<string, number>): number => {
  let totalCost = 0;
  
  for (const type of types) {
    const area = areas[type] || 0;
    const costPerSquareMeter = getDemolitionCostPerSquareMeter(type);
    totalCost += costPerSquareMeter * area;
  }
  
  return totalCost;
};

/**
 * Get cost per square meter for different demolition types
 */
const getDemolitionCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'WALLS': return 80;
    case 'FLOORS': return 60;
    case 'CEILINGS': return 40;
    case 'COMPLETE': return 150;
    default: return 0;
  }
};

/**
 * Calculate wall construction costs
 */
export const calculateWallCost = (area: number): number => {
  return 180 * area; // Cost per square meter
};

/**
 * Calculate floor construction costs
 */
export const calculateFloorCost = (type: string, area: number): number => {
  const costPerSquareMeter = getFloorCostPerSquareMeter(type);
  return costPerSquareMeter * area;
};

/**
 * Get cost per square meter for different floor construction types
 */
const getFloorCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'CONCRETE': return 120;
    case 'WOODEN': return 150;
    case 'ENGINEERED': return 180;
    default: return 0;
  }
};

/**
 * Calculate costs for structural features
 */
export const calculateStructuralFeatureCost = (features: string[], values: Record<string, number>): number => {
  let totalCost = 0;
  
  for (const feature of features) {
    const value = values[feature] || 0;
    const costPerUnit = getStructuralFeatureCostPerUnit(feature);
    totalCost += costPerUnit * value;
  }
  
  return totalCost;
};

/**
 * Get cost per unit for different structural features
 */
const getStructuralFeatureCostPerUnit = (feature: string): number => {
  switch (feature) {
    case 'BEAMS': return 300;
    case 'COLUMNS': return 250;
    case 'STAIRS': return 2000;
    case 'MEZZANINE': return 500;
    default: return 0;
  }
};

/**
 * Calculate component costs for various construction components
 */
export const calculateComponentCost = (component: string, area: number): number => {
  switch (component) {
    case 'insulation': return 45 * area;
    case 'drywall': return 35 * area;
    case 'ceiling': return 40 * area;
    case 'electrical': return 80 * area;
    case 'plumbing': return 90 * area;
    default: return 0;
  }
};

// Re-export ensureNumber for backward compatibility
export { ensureNumber };
