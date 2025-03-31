
import { ensureNumber } from '../typeConversions';

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
 * Calculate masonry wall costs
 */
export const calculateMasonryWallCost = (wallType: string, area: number): number => {
  const costPerSquareMeter = getMasonryWallCostPerSquareMeter(wallType);
  return costPerSquareMeter * area;
};

/**
 * Get cost per square meter for different masonry wall types
 */
const getMasonryWallCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'briques': return 590;
    case 'parpaing': return 580;
    case 'porotherme': return 430;
    case 'pierre': return 730;
    case 'beton': return 500;
    case 'beton_cellulaire': return 433;
    default: return 0;
  }
};
