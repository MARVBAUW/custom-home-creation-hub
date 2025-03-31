
// This is now a barrel file that re-exports everything from the specialized calculation modules

// Re-export from specialized calculation modules
export * from './calculations/flooring';
export * from './calculations/windows';
export * from './calculations/technical';
export * from './calculations/insulation';
export * from './calculations/exterior';
export * from './calculations/landscaping';
export * from './calculations/structural';
export * from './calculations/general';

// Re-export the ensureNumber function for backward compatibility
export { ensureNumber } from './typeConversions';
