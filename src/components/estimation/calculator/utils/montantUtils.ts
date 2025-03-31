
// This is now a barrel file that re-exports everything from the specialized calculation modules

// Re-export from specialized calculation modules
export * from './calculations/flooring';
export * from './calculations/windows';
export * from './calculations/technical';
export * from './calculations/insulation';
export * from './calculations/exterior';
export * from './calculations/landscaping';
export * from './calculations/structural';
// Export functions from general.ts with explicit names to avoid conflicts
export { 
  calculateNewMontantT,
  calculateKitchenCost,
  calculateBathroomCost,
  calculateRenewableEnergyCost,
  calculateEnvironmentalSolutionsCost
} from './calculations/general';
// Export calculateComponentCost from general.ts with a different name to avoid conflict
export { calculateComponentCost as calculateGeneralComponentCost } from './calculations/general';

// Re-export the ensureNumber function for backward compatibility
export { ensureNumber } from './typeConversions';
