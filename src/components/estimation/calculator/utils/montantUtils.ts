
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
