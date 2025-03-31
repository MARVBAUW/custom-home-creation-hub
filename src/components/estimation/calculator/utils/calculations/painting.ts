
import { ensureNumber } from '../typeConversions';

/**
 * Calculate painting costs based on types and surface area
 */
export const calculatePaintingCost = (
  paintTypes: {
    basicPaint: number;
    decorativePaint: number;
    wallpaper: number;
    woodPaneling: number;
    stoneCladding: number;
  },
  surface: number | string
): number => {
  const surfaceNum = ensureNumber(surface);
  
  // Define cost per square meter for each paint type
  const costPerType: { [key: string]: number } = {
    'basicPaint': 25,          // 25€ per m²
    'decorativePaint': 45,     // 45€ per m²
    'wallpaper': 35,           // 35€ per m²
    'woodPaneling': 90,        // 90€ per m²
    'stoneCladding': 150       // 150€ per m²
  };
  
  // Calculate wall area (typically 2.5x floor area for standard ceiling height)
  const wallArea = surfaceNum * 2.5;
  
  // Calculate total cost based on percentage of each type
  let totalCost = 0;
  
  totalCost += (paintTypes.basicPaint / 100) * wallArea * costPerType.basicPaint;
  totalCost += (paintTypes.decorativePaint / 100) * wallArea * costPerType.decorativePaint;
  totalCost += (paintTypes.wallpaper / 100) * wallArea * costPerType.wallpaper;
  totalCost += (paintTypes.woodPaneling / 100) * wallArea * costPerType.woodPaneling;
  totalCost += (paintTypes.stoneCladding / 100) * wallArea * costPerType.stoneCladding;
  
  return totalCost;
};

/**
 * Calculate wall covering costs based on type and area
 */
export const calculateWallCoveringCost = (type: string, area: number): number => {
  const costPerSquareMeter = getWallCoveringCostPerSquareMeter(type);
  return costPerSquareMeter * area;
};

/**
 * Get cost per square meter for different wall covering types
 */
const getWallCoveringCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'paint_basic':
      return 25;
    case 'paint_premium':
      return 45;
    case 'wallpaper_standard':
      return 35;
    case 'wallpaper_premium':
      return 60;
    case 'wood_paneling':
      return 90;
    case 'stone_cladding':
      return 150;
    default:
      return 25;
  }
};

/**
 * Calculate ceiling paint costs
 */
export const calculateCeilingPaintCost = (area: number, isPremium: boolean = false): number => {
  return area * (isPremium ? 30 : 20);
};

/**
 * Calculate trim paint costs
 */
export const calculateTrimPaintCost = (area: number, isPremium: boolean = false): number => {
  return area * (isPremium ? 35 : 25);
};
