
import { FormData } from '../types/formTypes';
import { ensureNumber, ensureBoolean } from '../utils/typeConversions';

export function calculateFinishingCosts(formData: FormData, baseCost: number): number {
  // Base finishing cost as a percentage of total cost
  let finishingRatio = 0.3; // 30% of total cost by default
  
  // Adjust ratio based on project type
  if (formData.projectType) {
    switch (formData.projectType) {
      case 'renovation':
        finishingRatio = 0.45; // Renovations typically have higher finishing costs
        break;
      case 'extension':
        finishingRatio = 0.35;
        break;
      case 'construction':
      default:
        finishingRatio = 0.3;
        break;
    }
  }
  
  // Apply specific modifiers
  let modifiers = 1.0;
  
  // Flooring type adjustment
  if (formData.flooringType) {
    switch (formData.flooringType) {
      case 'tile':
        modifiers *= 1.1;
        break;
      case 'hardwood':
        modifiers *= 1.2;
        break;
      case 'carpet':
        modifiers *= 0.9;
        break;
      case 'vinyl':
        modifiers *= 0.85;
        break;
      default:
        modifiers *= 1.0;
        break;
    }
  }
  
  // Kitchen quality adjustment
  if (formData.kitchenQuality) {
    switch (formData.kitchenQuality) {
      case 'luxury':
        modifiers *= 1.4;
        break;
      case 'premium':
        modifiers *= 1.2;
        break;
      case 'standard':
        modifiers *= 1.0;
        break;
      case 'basic':
        modifiers *= 0.8;
        break;
      default:
        modifiers *= 1.0;
        break;
    }
  }
  
  // Bathroom quality adjustment
  if (formData.bathroomQuality) {
    switch (formData.bathroomQuality) {
      case 'luxury':
        modifiers *= 1.3;
        break;
      case 'premium':
        modifiers *= 1.15;
        break;
      case 'standard':
        modifiers *= 1.0;
        break;
      case 'basic':
        modifiers *= 0.85;
        break;
      default:
        modifiers *= 1.0;
        break;
    }
  }
  
  // Custom closets adjustment
  const hasCustomClosets = ensureBoolean(formData.hasCustomClosets);
  if (hasCustomClosets) {
    modifiers *= 1.1;
  }
  
  // Calculate final cost
  let finalFinishingCost = baseCost * finishingRatio * modifiers;
  
  // Ensure minimum reasonable cost
  const minFinishingCost = ensureNumber(formData.surface) * 350;
  finalFinishingCost = Math.max(finalFinishingCost, minFinishingCost);
  
  return finalFinishingCost;
}
