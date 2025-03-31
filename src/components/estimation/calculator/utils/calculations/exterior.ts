
import { ensureNumber } from '../typeConversions';

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
  const stonePercent = ensureNumber(stonePercentage);
  const plasterPercent = ensureNumber(plasterPercentage);
  const brickPercent = ensureNumber(brickPercentage);
  const metalPercent = ensureNumber(metalCladdingPercentage);
  const woodPercent = ensureNumber(woodCladdingPercentage);
  const stoneCladdingPercent = ensureNumber(stoneCladdingPercentage);
  
  // Calculate wall surface area (estimate based on project type and surface)
  let wallSurface = 0;
  const surface = ensureNumber(formData.surface);
  
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

