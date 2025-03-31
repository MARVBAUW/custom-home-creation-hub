
import { EstimationFormData } from '../types';

// Calculate structural costs based on form data
export const calculateStructuralCosts = (formData: EstimationFormData) => {
  const surface = typeof formData.surface === 'string' 
    ? parseFloat(formData.surface) 
    : (formData.surface || 0);
  
  let baseStructuralCost = 900; // Default structural cost per m²
  
  // Apply modifiers based on wall type
  switch (formData.wallType) {
    case 'concrete_blocks':
      baseStructuralCost *= 1.0;
      break;
    case 'brick':
      baseStructuralCost *= 1.15;
      break;
    case 'wood_frame':
      baseStructuralCost *= 1.1;
      break;
    case 'concrete':
      baseStructuralCost *= 1.05;
      break;
    case 'stone':
      baseStructuralCost *= 1.4;
      break;
    case 'earth':
      baseStructuralCost *= 1.25;
      break;
    case 'steel_frame':
      baseStructuralCost *= 1.2;
      break;
    default:
      // No adjustment
  }
  
  // Apply modifiers based on foundation type
  switch (formData.foundationType) {
    case 'strip':
      baseStructuralCost *= 1.0;
      break;
    case 'slab':
      baseStructuralCost *= 1.05;
      break;
    case 'piles':
      baseStructuralCost *= 1.2;
      break;
    case 'crawl_space':
      baseStructuralCost *= 1.1;
      break;
    case 'basement':
      baseStructuralCost *= 1.3;
      break;
    default:
      // No adjustment
  }
  
  // Apply terrain type modifier
  switch (formData.terrainType) {
    case 'flat':
      baseStructuralCost *= 1.0;
      break;
    case 'slight_slope':
      baseStructuralCost *= 1.1;
      break;
    case 'steep_slope':
      baseStructuralCost *= 1.25;
      break;
    case 'uneven':
      baseStructuralCost *= 1.15;
      break;
    default:
      // No adjustment
  }
  
  // Calculate total structural cost
  const totalStructuralCost = surface * baseStructuralCost;
  
  return {
    foundations: totalStructuralCost * 0.2,
    walls: totalStructuralCost * 0.4,
    floors: totalStructuralCost * 0.15,
    roof: totalStructuralCost * 0.25,
    total: totalStructuralCost
  };
};
