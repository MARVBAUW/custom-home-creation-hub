
import { ensureNumber } from '../typeConversions';

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
    case 'electric': return 50;
    case 'gas': return 70;
    case 'heat_pump': return 90;
    case 'solar': return 120;
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
 * Calculate electrical system costs (alias for calculateElectricalCost for backward compatibility)
 */
export const calculateElectricityCost = calculateElectricalCost;

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
 * Calculate pool heating costs
 */
export const calculatePoolHeatingCost = (hasHeating: boolean, area: number): number => {
  if (!hasHeating) return 0;
  return 120 * area; // Cost per square meter
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
