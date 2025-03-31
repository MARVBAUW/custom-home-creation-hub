
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
 * Calculate wall covering costs for a specific type and area
 */
export const calculateWallCoveringCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area);
  
  switch (type) {
    case 'basic':
      return areaNum * 25; // Basic paint
    case 'decorative':
      return areaNum * 45; // Decorative paint
    case 'wallpaper':
      return areaNum * 35; // Wallpaper
    case 'woodPanel':
      return areaNum * 90; // Wood paneling
    case 'stone':
      return areaNum * 150; // Stone cladding
    default:
      return 0;
  }
};

/**
 * Calculate ceiling painting cost based on area and type
 */
export const calculateCeilingPaintCost = (area: number | string, type: string): number => {
  const areaNum = ensureNumber(area);
  
  switch (type) {
    case 'basic':
      return areaNum * 20; // Basic ceiling paint
    case 'acoustic':
      return areaNum * 45; // Acoustic ceiling treatment
    case 'decorative':
      return areaNum * 65; // Decorative ceiling (moldings, etc.)
    default:
      return areaNum * 20; // Default to basic
  }
};

/**
 * Calculate trim/molding painting cost
 */
export const calculateTrimPaintCost = (linearMeters: number | string, type: string): number => {
  const length = ensureNumber(linearMeters);
  
  switch (type) {
    case 'basic':
      return length * 15; // Basic trim painting
    case 'decorative':
      return length * 30; // Decorative trim with complex finish
    case 'premium':
      return length * 45; // Premium trim with multiple coats/special finish
    default:
      return length * 15; // Default to basic
  }
};
