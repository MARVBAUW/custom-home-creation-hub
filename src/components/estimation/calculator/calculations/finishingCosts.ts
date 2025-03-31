
import { EstimationFormData } from '../types';

// Calculate finishing costs based on form data
export const calculateFinishingCosts = (formData: EstimationFormData) => {
  const surface = typeof formData.surface === 'string' 
    ? parseFloat(formData.surface) 
    : (formData.surface || 0);
  
  let baseFinishingCost = 600; // Default finishing cost per m²
  
  // Apply modifiers based on finishing level
  switch (formData.finishLevel || formData.finishStandard || formData.finishingLevel) {
    case 'basic':
      baseFinishingCost *= 0.8;
      break;
    case 'standard':
      baseFinishingCost *= 1.0;
      break;
    case 'medium':
      baseFinishingCost *= 1.2;
      break;
    case 'high':
      baseFinishingCost *= 1.5;
      break;
    case 'luxury':
      baseFinishingCost *= 2.0;
      break;
    default:
      // Default to standard
      baseFinishingCost *= 1.0;
  }
  
  // Calculate total finishing cost
  const totalFinishingCost = surface * baseFinishingCost;
  
  return {
    flooring: totalFinishingCost * 0.25,
    walls: totalFinishingCost * 0.2,
    ceilings: totalFinishingCost * 0.1,
    painting: totalFinishingCost * 0.15,
    fixtures: totalFinishingCost * 0.3,
    total: totalFinishingCost
  };
};
