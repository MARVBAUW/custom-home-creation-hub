
import { ensureNumber } from '../typeConversions';

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

/**
 * Calculate interior carpentry costs based on door type, moldings, custom furniture and area
 */
export const calculateInteriorCarpenteryCost = (doorType: string, hasMoldings: boolean, hasCustomFurniture: boolean, area: number): number => {
  // Base cost for the door type
  let totalCost = getDoorTypeCostPerSquareMeter(doorType) * ensureNumber(area);
  
  // Add cost for moldings if selected
  if (hasMoldings) {
    totalCost += 40 * ensureNumber(area);
  }
  
  // Add cost for custom furniture if selected
  if (hasCustomFurniture) {
    totalCost += 120 * ensureNumber(area);
  }
  
  return totalCost;
};

/**
 * Get cost per square meter for different door types
 */
const getDoorTypeCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'base': return 80;
    case 'standing': return 130;
    case 'premium': return 200;
    case 'non_concerne': return 0;
    default: return 0;
  }
};
