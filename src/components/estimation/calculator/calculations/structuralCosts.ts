
import { FormData } from '../types';
import { WALL_MATERIAL_COSTS } from './materialCosts';

// Function to calculate structural costs
export const calculateStructuralCosts = (formData: FormData) => {
  const surface = typeof formData.surface === 'string' 
    ? parseFloat(formData.surface) 
    : (formData.surface || 0);
  
  // Base structural cost per m²
  let baseCost = 800; // Default
  
  // Adjust for wall type if available
  if (formData.wallType && WALL_MATERIAL_COSTS[formData.wallType as keyof typeof WALL_MATERIAL_COSTS]) {
    baseCost = WALL_MATERIAL_COSTS[formData.wallType as keyof typeof WALL_MATERIAL_COSTS];
  }
  
  // Adjust for complexity and house type
  if (formData.complexity === 'high') {
    baseCost *= 1.3; // +30% for high complexity
  } else if (formData.complexity === 'medium') {
    baseCost *= 1.15; // +15% for medium complexity
  }
  
  // For multi-level buildings, add complexity
  const levels = typeof formData.levels === 'string' 
    ? parseInt(formData.levels) 
    : (formData.levels || 1);
  
  if (levels > 1) {
    baseCost *= (1 + (levels - 1) * 0.1); // +10% per additional level
  }
  
  // Foundation type adjustment
  if (formData.foundationType) {
    let foundationMultiplier = 1.0;
    
    switch (formData.foundationType) {
      case 'slab':
        foundationMultiplier = 1.0;
        break;
      case 'strip':
        foundationMultiplier = 0.9;
        break;
      case 'piles':
        foundationMultiplier = 1.4;
        break;
      case 'crawl_space':
        foundationMultiplier = 1.1;
        break;
      case 'basement':
        foundationMultiplier = 1.5;
        break;
      default:
        foundationMultiplier = 1.0;
    }
    
    baseCost *= foundationMultiplier;
  }
  
  // Calculate the total structural costs
  const totalStructuralCost = baseCost * surface;
  
  return totalStructuralCost;
};
