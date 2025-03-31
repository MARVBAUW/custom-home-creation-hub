
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
 * Calculate electrical system costs based on type and area
 */
export const calculateElectricalCost = (type: string, area: number): number => {
  const costPerSquareMeter = getElectricalCostPerSquareMeter(type);
  return costPerSquareMeter * ensureNumber(area);
};

/**
 * Get cost per square meter for different electrical system types
 */
const getElectricalCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'basic': return 70;
    case 'standard': return 100;
    case 'premium': return 150;
    case 'smart_home': return 200;
    case 'non_concerne': return 0;
    default: return 0;
  }
};

/**
 * Calculate plumbing system costs based on type and area
 */
export const calculatePlumbingCost = (type: string, area: number): number => {
  const costPerSquareMeter = getPlumbingCostPerSquareMeter(type);
  return costPerSquareMeter * ensureNumber(area);
};

/**
 * Get cost per square meter for different plumbing system types
 */
const getPlumbingCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'basic': return 80;
    case 'standard': return 120;
    case 'premium': return 170;
    case 'non_concerne': return 0;
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
 * Calculate facade renovation costs (basic version)
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

/**
 * Calculate insulation costs based on insulation type and area
 */
export const calculateInsulationCost = (type: string, area: number): number => {
  const costPerSquareMeter = getInsulationCostPerSquareMeter(type);
  return costPerSquareMeter * ensureNumber(area);
};

/**
 * Get cost per square meter for different insulation types
 */
const getInsulationCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'standard': return 80;
    case 'reinforced': return 100;
    case 'passive': return 120;
    case 'ecological': return 110;
    case 'renovation': return 90;
    case 'base': return 80;
    case 'performance': return 100;
    case 'ultraPerformance': return 120;
    case 'non_concerne': return 0;
    default: return 0;
  }
};

/**
 * Calculate roofing costs
 */
export const calculateRoofingCost = (type: string, area: number): number => {
  const costPerSquareMeter = getRoofingCostPerSquareMeter(type);
  return costPerSquareMeter * ensureNumber(area);
};

/**
 * Get cost per square meter for different roofing types
 */
const getRoofingCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'tuilePlate': return 120;
    case 'tuileRonde': return 130;
    case 'ardoise': return 240;
    case 'zinc': return 180;
    case 'chaume': return 220;
    case 'bacAcier': return 110;
    case 'bitume': return 90;
    case 'vegetalisee': return 200;
    case 'gravillonnee': return 150;
    default: return 0;
  }
};

/**
 * Calculate detailed facade costs (enhanced version with percentages)
 */
export const calculateDetailedFacadeCost = (
  formData: any,
  stonePercentage: number | string,
  plasterPercentage: number | string,
  brickPercentage: number | string,
  metalCladdingPercentage: number | string,
  woodCladdingPercentage: number | string,
  stoneCladdingPercentage: number | string
): number => {
  // Convert percentages to numbers
  const stonePercent = ensureNumber(stonePercentage, 0);
  const plasterPercent = ensureNumber(plasterPercentage, 0);
  const brickPercent = ensureNumber(brickPercentage, 0);
  const metalPercent = ensureNumber(metalCladdingPercentage, 0);
  const woodPercent = ensureNumber(woodCladdingPercentage, 0);
  const stoneCladdingPercent = ensureNumber(stoneCladdingPercentage, 0);
  
  // Calculate wall surface area (estimate based on project type and surface)
  let wallSurface = 0;
  const surface = ensureNumber(formData.surface, 0);
  
  if (formData.projectType === 'construction' || formData.projectType === 'extension') {
    wallSurface = surface * 2.8; // Approximate wall surface based on floor surface (2.8m height)
  } else if (formData.projectType === 'renovation') {
    wallSurface = surface * 2.5; // Slightly lower for renovation
  } else {
    wallSurface = surface * 2.5; // Default
  }
  
  // Calculate cost based on percentages
  let totalCost = 0;
  
  // Stone facade
  if (stonePercent > 0) {
    totalCost += (stonePercent / 100) * wallSurface * 220;
  }
  
  // Plaster facade
  if (plasterPercent > 0) {
    totalCost += (plasterPercent / 100) * wallSurface * 65;
  }
  
  // Brick facade
  if (brickPercent > 0) {
    totalCost += (brickPercent / 100) * wallSurface * 180;
  }
  
  // Metal cladding
  if (metalPercent > 0) {
    totalCost += (metalPercent / 100) * wallSurface * 150;
  }
  
  // Wood cladding
  if (woodPercent > 0) {
    totalCost += (woodPercent / 100) * wallSurface * 150;
  }
  
  // Stone cladding
  if (stoneCladdingPercent > 0) {
    totalCost += (stoneCladdingPercent / 100) * wallSurface * 200;
  }
  
  return totalCost;
};

/**
 * Calculate a new total amount by adding a cost
 */
export const calculateNewMontantT = (currentTotal: number | undefined, additionalCost: number): number => {
  const currentAmount = ensureNumber(currentTotal, 0);
  return currentAmount + additionalCost;
};

// Re-export ensureNumber for backward compatibility
export { ensureNumber };
