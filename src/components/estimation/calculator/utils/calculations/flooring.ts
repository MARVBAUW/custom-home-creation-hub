
import { ensureNumber } from '../typeConversions';

/**
 * Calculate costs for floor tiling based on type and area
 */
export const calculateFloorTilingCost = (type: string, percentage: number, totalArea: number | string): number => {
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
    case 'non_concerne': return 0;
    default: return 0;
  }
};

/**
 * Calculate parquet flooring costs based on type and area
 */
export const calculateParquetCost = (type: string, area: number | string): number => {
  const costPerSquareMeter = getParquetCostPerSquareMeter(type);
  return costPerSquareMeter * ensureNumber(area);
};

/**
 * Get cost per square meter for different parquet types
 */
const getParquetCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'base': return 45;
    case 'milieuDeGamme': return 75;
    case 'hautDeGamme': return 120;
    case 'PARQUET DE BASE': return 50;
    case 'PARQUET MG': return 90;
    case 'PARQUET HG': return 160;
    case 'none': return 0;
    default: return 0;
  }
};

/**
 * Calculate soft flooring costs based on type and area
 */
export const calculateSoftFloorCost = (type: string, area: number | string): number => {
  const costPerSquareMeter = getSoftFloorCostPerSquareMeter(type);
  return costPerSquareMeter * ensureNumber(area);
};

/**
 * Get cost per square meter for different soft floor types
 */
const getSoftFloorCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'base': return 25;
    case 'milieuDeGamme': return 40;
    case 'hautDeGamme': return 60;
    case 'SOL SOUPLE BASE': return 30;
    case 'SOL SOUPLE MG': return 60;
    case 'SOL SOUPLE HG': return 100;
    case 'none': return 0;
    default: return 0;
  }
};

/**
 * Calculate wall tiling costs based on type and area
 */
export const calculateWallTilingCost = (type: string, totalArea: number | string): number => {
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
 * Calculate flooring costs
 */
export const calculateFlooringCost = (type: string, area: number | string): number => {
  const costPerSquareMeter = getFlooringCostPerSquareMeter(type);
  return costPerSquareMeter * ensureNumber(area);
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
 * Calculate floor construction costs
 */
export const calculateFloorCost = (type: string, area: number | string): number => {
  const costPerSquareMeter = getFloorCostPerSquareMeter(type);
  return costPerSquareMeter * ensureNumber(area);
};

/**
 * Get cost per square meter for different floor construction types
 */
const getFloorCostPerSquareMeter = (type: string): number => {
  switch (type) {
    case 'BOIS': return 150;
    case 'BETON': return 200;
    case 'CONCRETE': return 120;
    case 'WOODEN': return 150;
    case 'ENGINEERED': return 180;
    default: return 180;
  }
};
