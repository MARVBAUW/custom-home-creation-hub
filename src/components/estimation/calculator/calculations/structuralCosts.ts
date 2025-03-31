
import { FormData } from '../types/formTypes';
import { ensureNumber, ensureBoolean } from '../utils/typeConversions';

export function calculateStructuralCosts(formData: FormData, baseCost: number): number {
  // Base structural cost as a percentage of total cost
  let structuralRatio = 0.4; // 40% of total cost by default
  
  // Adjust ratio based on construction type
  if (formData.constructionType) {
    switch (formData.constructionType) {
      case 'wooden':
        structuralRatio = 0.35;
        break;
      case 'concrete':
        structuralRatio = 0.45;
        break;
      case 'steel':
        structuralRatio = 0.5;
        break;
      case 'traditional':
      default:
        structuralRatio = 0.4;
        break;
    }
  }
  
  // Apply specific modifiers
  let modifiers = 1.0;
  
  // Foundation type adjustment
  if (formData.foundationType) {
    switch (formData.foundationType) {
      case 'slab':
        modifiers *= 0.9;
        break;
      case 'piles':
        modifiers *= 1.3;
        break;
      case 'strip':
      default:
        modifiers *= 1.0;
        break;
    }
  }
  
  // Wall type adjustment
  if (formData.wallType) {
    switch (formData.wallType) {
      case 'brick':
        modifiers *= 1.1;
        break;
      case 'concrete_block':
        modifiers *= 0.95;
        break;
      case 'timber_frame':
        modifiers *= 0.9;
        break;
      default:
        modifiers *= 1.0;
        break;
    }
  }
  
  // Adjust for basement
  const hasBasement = ensureBoolean(formData.has_basement);
  if (hasBasement) {
    modifiers *= 1.25;
  }
  
  // Calculate final cost
  let finalStructuralCost = baseCost * structuralRatio * modifiers;
  
  // Ensure minimum reasonable cost
  const minStructuralCost = ensureNumber(formData.surface) * 500;
  finalStructuralCost = Math.max(finalStructuralCost, minStructuralCost);
  
  return finalStructuralCost;
}
