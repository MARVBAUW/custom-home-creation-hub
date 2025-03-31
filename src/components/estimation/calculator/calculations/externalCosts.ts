
import { FormData } from '../types/formTypes';
import { ensureNumber, ensureBoolean } from '../utils/typeConversions';

export function calculateExternalCosts(formData: FormData, baseCost: number): number {
  // Base external cost as a percentage of total cost
  let externalRatio = 0.1; // 10% of total cost by default
  
  // Apply specific modifiers
  let modifiers = 1.0;
  
  // Pool adjustment
  const hasPool = ensureBoolean(formData.pool);
  if (hasPool) {
    modifiers *= 1.5;
  }
  
  // Terrace adjustment
  const hasTerrace = ensureBoolean(formData.terrace);
  if (hasTerrace) {
    const terraceArea = ensureNumber(formData.terraceArea);
    if (terraceArea > 0) {
      modifiers *= (1 + (terraceArea / 100) * 0.1);
    } else {
      modifiers *= 1.2;
    }
  }
  
  // Outdoor kitchen adjustment
  const hasOutdoorKitchen = ensureBoolean(formData.outdoorKitchen);
  if (hasOutdoorKitchen) {
    modifiers *= 1.3;
  }
  
  // Landscaping adjustment
  const landscapingArea = ensureNumber(formData.landscapingArea);
  if (landscapingArea > 0) {
    modifiers *= (1 + (landscapingArea / 200) * 0.1);
  }
  
  // Fencing adjustment
  const fencingLength = ensureNumber(formData.fencingLength);
  if (fencingLength > 0) {
    modifiers *= (1 + (fencingLength / 100) * 0.05);
  }
  
  // Calculate final cost
  let finalExternalCost = baseCost * externalRatio * modifiers;
  
  // Ensure minimum reasonable cost
  const minExternalCost = ensureNumber(formData.surface) * 50;
  finalExternalCost = Math.max(finalExternalCost, minExternalCost);
  
  return finalExternalCost;
}
