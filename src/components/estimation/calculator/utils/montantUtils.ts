
import { ensureNumber } from './typeConversions';

/**
 * Calculate the cost for floor tiling based on type, percentage, and surface
 */
export const calculateFloorTilingCost = (
  floorTileType: string,
  floorTilePercentage: number,
  surface: number
): number => {
  const percentageDecimal = floorTilePercentage / 100;
  let tileRate = 0;
  
  switch (floorTileType) {
    case 'standard':
      tileRate = 40; // €/m²
      break;
    case 'medium':
      tileRate = 60; // €/m²
      break;
    case 'premium':
      tileRate = 90; // €/m²
      break;
    default:
      tileRate = 0;
  }
  
  return surface * percentageDecimal * tileRate;
};

/**
 * Calculate the cost for wall tiling based on type and surface
 */
export const calculateWallTilingCost = (
  wallTileType: string,
  surface: number
): number => {
  let tileRate = 0;
  
  switch (wallTileType) {
    case 'standard':
      tileRate = 30; // €/m²
      break;
    case 'medium':
      tileRate = 45; // €/m²
      break;
    case 'premium':
      tileRate = 70; // €/m²
      break;
    default:
      tileRate = 0;
  }
  
  // Assume wall tiles cover about 30% of the wall area based on room height
  const wallArea = surface * 0.3;
  return wallArea * tileRate;
};

/**
 * Calculate the cost for heating based on type and surface
 */
export const calculateHeatingCost = (
  heatingType: string,
  surface: number
): number => {
  let rate = 0;
  
  switch (heatingType) {
    case 'standard':
      rate = 60; // €/m²
      break;
    case 'eco':
      rate = 90; // €/m²
      break;
    case 'economic':
      rate = 80; // €/m²
      break;
    case 'sans_avis':
      rate = 70; // €/m²
      break;
    case 'non_concerne':
      rate = 0;
      break;
    default:
      rate = 0;
  }
  
  return surface * rate;
};

/**
 * Calculate the cost for air conditioning based on selection and surface
 */
export const calculateAirConditioningCost = (
  hasAirConditioning: boolean,
  surface: number
): number => {
  if (!hasAirConditioning) return 0;
  
  // Base rate for air conditioning (€/m²)
  const acRate = 100;
  
  return surface * acRate;
};

/**
 * Calculate the cost for landscaping based on type and area
 */
export const calculateLandscapingCost = (
  landscapingType: string,
  area: number
): number => {
  let rate = 0;
  
  switch (landscapingType) {
    case 'UN PEU':
      rate = 30; // €/m²
      break;
    case 'BEAUCOUP':
      rate = 50; // €/m²
      break;
    case 'PASSIONNEMENT':
      rate = 80; // €/m²
      break;
    default:
      rate = 0;
  }
  
  return area * rate;
};

/**
 * Calculate the cost for fencing based on length
 */
export const calculateFencingCost = (length: number): number => {
  const fencingRate = 100; // €/m
  return length * fencingRate;
};

/**
 * Calculate the cost for gates based on length
 */
export const calculateGateCost = (length: number): number => {
  const gateBaseRate = 500; // € base cost
  const gateRatePerMeter = 300; // €/m additional
  return gateBaseRate + length * gateRatePerMeter;
};

/**
 * Calculate the cost for terrace construction
 */
export const calculateTerraceCost = (area: number): number => {
  const terraceRate = 150; // €/m²
  return area * terraceRate;
};

/**
 * Calculate the cost for roof framework renovation
 */
export const calculateRoofFrameworkRenovCost = (
  roofType: string,
  roofArea: string | number
): number => {
  const area = ensureNumber(roofArea);
  let rate = 0;
  
  switch (roofType) {
    case 'TOITURE TERRASSE ACCESSIBLE':
      rate = 190; // €/m²
      break;
    case 'TOITURE TERRASSE INACCESSIBLE':
      rate = 180; // €/m²
      break;
    case 'CHARPENTE INDUSTRIELLE':
      rate = 160; // €/m²
      break;
    case 'CHARPENTE TRADITIONNELLE':
      rate = 185; // €/m²
      break;
    case 'NON CONCERNE':
    default:
      rate = 0;
  }
  
  return area * rate;
};

/**
 * Calculate the cost for roof covering renovation
 */
export const calculateRoofCoveringRenovCost = (
  coveringType: string,
  area: string | number
): number => {
  const roofArea = ensureNumber(area);
  let rate = 0;
  
  switch (coveringType) {
    case 'TUILES':
      rate = 75; // €/m²
      break;
    case 'ARDOISES':
      rate = 85; // €/m²
      break;
    case 'ZINC':
      rate = 110; // €/m²
      break;
    case 'BACS ACIER':
      rate = 65; // €/m²
      break;
    case 'MEMBRANE':
      rate = 55; // €/m²
      break;
    case 'NON CONCERNE':
    default:
      rate = 0;
  }
  
  return roofArea * rate;
};

/**
 * Calculate facade renovation cost
 */
export const calculateDetailedFacadeCost = (
  facadeType: string,
  percentage: number,
  totalSurface: number
): number => {
  const surfacePortion = (totalSurface * percentage) / 100;
  let rate = 0;
  
  switch (facadeType) {
    case 'PIERRE':
      rate = 210; // €/m²
      break;
    case 'ENDUIT':
      rate = 75; // €/m²
      break;
    case 'BRIQUES':
      rate = 160; // €/m²
      break;
    case 'BARDAGE METAL':
      rate = 140; // €/m²
      break;
    case 'BARDAGE BOIS':
      rate = 180; // €/m²
      break;
    case 'BARDAGE PIERRE':
      rate = 250; // €/m²
      break;
    default:
      rate = 0;
  }
  
  return surfacePortion * rate;
};
