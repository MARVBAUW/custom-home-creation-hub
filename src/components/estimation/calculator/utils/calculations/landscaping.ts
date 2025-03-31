
import { ensureNumber } from '../typeConversions';

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
