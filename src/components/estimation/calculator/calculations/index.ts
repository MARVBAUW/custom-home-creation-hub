
// Export the calculation functions from their respective modules
export { calculateDetailedEstimation } from './detailedEstimation';
export { calculateEstimation as calculateSimpleEstimation } from './simpleEstimation';

// Default export for backward compatibility
export * from './common';
