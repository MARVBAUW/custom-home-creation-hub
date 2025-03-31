
import { ensureNumber } from '../typeConversions';

/**
 * Calculate insulation costs based on type and area
 */
export const calculateInsulationCost = (type: string, area: number | string): number => {
  const areaNum = ensureNumber(area);
  
  switch (type) {
    case 'base':
      return areaNum * 60; // 60€ per m²
    case 'performance':
      return areaNum * 80; // 80€ per m²
    case 'ultraPerformance':
      return areaNum * 110; // 110€ per m²
    case 'sansAvis':
      return areaNum * 70; // 70€ per m² (average cost)
    default:
      return 0;
  }
};

/**
 * Calculate plastering costs based on type and area
 */
export const calculatePlasteringCost = (area: number | string, type: string): number => {
  const areaNum = ensureNumber(area);
  
  switch (type) {
    case 'base':
      return areaNum * 60; // 60€ per m²
    case 'specific':
      return areaNum * 90; // 90€ per m²
    case 'advanced':
      return areaNum * 140; // 140€ per m²
    case 'non_concerne':
      return 0;
    default:
      return 0;
  }
};

/**
 * Calculate wall insulation cost for specific thermal requirements
 */
export const calculateWallInsulationCost = (type: string, area: number | string, thickness: number = 10): number => {
  const areaNum = ensureNumber(area);
  let baseCost = 0;
  
  switch (type) {
    case 'mineral_wool':
      baseCost = 45; // Base cost for mineral wool
      break;
    case 'polystyrene':
      baseCost = 50; // Base cost for polystyrene
      break;
    case 'polyurethane':
      baseCost = 70; // Base cost for polyurethane
      break;
    case 'natural_fiber':
      baseCost = 85; // Base cost for natural fibers (hemp, flax, etc.)
      break;
    case 'reflective':
      baseCost = 60; // Base cost for reflective insulation
      break;
    default:
      baseCost = 45;
  }
  
  // Adjust cost based on thickness (default is 10cm)
  const thicknessMultiplier = thickness / 10;
  
  return areaNum * baseCost * thicknessMultiplier;
};

/**
 * Calculate roof insulation cost
 */
export const calculateRoofInsulationCost = (area: number | string, type: string, thickness: number = 30): number => {
  const areaNum = ensureNumber(area);
  let baseCost = 0;
  
  switch (type) {
    case 'mineral_wool':
      baseCost = 55; // Base cost for roof mineral wool
      break;
    case 'polyurethane':
      baseCost = 80; // Base cost for roof polyurethane
      break;
    case 'cellulose':
      baseCost = 65; // Base cost for cellulose insulation
      break;
    case 'natural_fiber':
      baseCost = 90; // Base cost for natural fibers
      break;
    default:
      baseCost = 55;
  }
  
  // Adjust cost based on thickness (default is 30cm for roof)
  const thicknessMultiplier = thickness / 30;
  
  return areaNum * baseCost * thicknessMultiplier;
};

/**
 * Calculate floor insulation cost
 */
export const calculateFloorInsulationCost = (area: number | string, type: string): number => {
  const areaNum = ensureNumber(area);
  
  switch (type) {
    case 'polystyrene':
      return areaNum * 40; // Base cost for floor polystyrene
    case 'polyurethane':
      return areaNum * 60; // Base cost for floor polyurethane
    case 'mineral_wool':
      return areaNum * 45; // Base cost for floor mineral wool
    case 'none':
      return 0;
    default:
      return areaNum * 40;
  }
};
