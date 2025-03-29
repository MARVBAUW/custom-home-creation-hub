
// This file now exports functions from the restructured modules
import { FormData } from './types';
import { 
  calculateDetailedEstimation as detailedEstimation,
  calculateEstimation as simpleEstimation
} from './calculations';

// Export the calculation functions for backward compatibility
export const calculateDetailedEstimation = detailedEstimation;
export const calculateEstimation = simpleEstimation;
