
import { ensureNumber } from '../typeConversions';

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
 * Calculate plastering system costs based on type and area
 */
export const calculatePlasteringCost = (type: string, area: number): number => {
  const costPerSquareMeter = getPlasteringCostPerSquareMeter(type);
  return costPerSquareMeter * ensureNumber(area);
};

/**
 * Get cost per square meter for different plastering types
 */
const getPlasteringCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'base': return 60;
    case 'specific': return 90;
    case 'advanced': return 140;
    case 'non_concerne': return 0;
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
