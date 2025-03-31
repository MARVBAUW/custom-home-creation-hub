
import { FormData } from '../types';

/**
 * Format a montantT value for display
 */
export const formatMontantT = (montantT: number | undefined | null): string => {
  if (montantT === undefined || montantT === null) {
    return '0';
  }
  return montantT.toLocaleString();
};

/**
 * Calculate a new montantT value by adding a component cost
 */
export const calculateNewMontantT = (
  currentMontantT: number | undefined,
  componentCost: number
): number => {
  return (currentMontantT || 0) + componentCost;
};

/**
 * Calculate a component cost based on surface and rate
 */
export const calculateComponentCost = (
  surface: number | string | undefined,
  rate: number
): number => {
  const surfaceValue = typeof surface === 'string' ? parseFloat(surface) : (surface || 0);
  return surfaceValue * rate;
};

/**
 * Calculate the insulation cost based on type and surface
 */
export const calculateInsulationCost = (
  insulationType: string,
  surface: number | string | undefined
): number => {
  const surfaceValue = typeof surface === 'string' ? parseFloat(surface) : (surface || 0);
  
  switch (insulationType) {
    case 'base':
      return surfaceValue * 80; // ISO DE BASE
    case 'performance':
      return surfaceValue * 100; // ISO +
    case 'ultraPerformance':
      return surfaceValue * 120; // ISO ++
    default:
      return surfaceValue * 100; // Default to performance level if no selection
  }
};

/**
 * Calculate facade cost based on percentages and surface
 */
export const calculateFacadeCost = (
  formData: FormData,
  stonePercentage: number | string | undefined,
  plasterPercentage: number | string | undefined,
  brickPercentage: number | string | undefined,
  metalCladdingPercentage: number | string | undefined,
  woodCladdingPercentage: number | string | undefined,
  stoneCladdingPercentage: number | string | undefined
): number => {
  const surfaceValue = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
  
  // Convert percentages to numbers between 0 and 1
  const stonePercent = typeof stonePercentage === 'string' ? parseFloat(stonePercentage) / 100 : (stonePercentage || 0) / 100;
  const plasterPercent = typeof plasterPercentage === 'string' ? parseFloat(plasterPercentage) / 100 : (plasterPercentage || 0) / 100;
  const brickPercent = typeof brickPercentage === 'string' ? parseFloat(brickPercentage) / 100 : (brickPercentage || 0) / 100;
  const metalPercent = typeof metalCladdingPercentage === 'string' ? parseFloat(metalCladdingPercentage) / 100 : (metalCladdingPercentage || 0) / 100;
  const woodPercent = typeof woodCladdingPercentage === 'string' ? parseFloat(woodCladdingPercentage) / 100 : (woodCladdingPercentage || 0) / 100;
  const stoneCladPercent = typeof stoneCladdingPercentage === 'string' ? parseFloat(stoneCladdingPercentage) / 100 : (stoneCladdingPercentage || 0) / 100;
  
  // Calculate costs for each facade type
  const stoneCost = surfaceValue * stonePercent * 0.7; // ENDUIT for PIERRE NUE
  const plasterCost = surfaceValue * plasterPercent * 0.7; // ENDUIT
  const brickCost = surfaceValue * brickPercent * 0.7; // Using ENDUIT rate for BRIQUE
  const metalCost = surfaceValue * metalPercent * 3.0; // BARDAGE METAL
  const woodCost = surfaceValue * woodPercent * 2.1; // BARDAGE BOIS
  const stoneCladCost = surfaceValue * stoneCladPercent * 3.1; // BARDAGE MINERAL
  
  // Sum up all costs
  return stoneCost + plasterCost + brickCost + metalCost + woodCost + stoneCladCost;
};
