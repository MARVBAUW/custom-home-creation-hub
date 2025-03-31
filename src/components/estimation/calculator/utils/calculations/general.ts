
import { ensureNumber } from '../typeConversions';

/**
 * Calculate a new total amount by adding a cost
 */
export const calculateNewMontantT = (currentTotal: number | undefined, additionalCost: number): number => {
  const currentAmount = ensureNumber(currentTotal, 0);
  return currentAmount + additionalCost;
};
