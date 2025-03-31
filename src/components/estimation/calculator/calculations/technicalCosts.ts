
import { FormData } from '../types/formTypes';
import { ensureNumber, ensureBoolean } from '../utils/typeConversions';

export function calculateTechnicalCosts(formData: FormData, baseCost: number): number {
  // Base technical cost as a percentage of total cost
  let technicalRatio = 0.2; // 20% of total cost by default
  
  // Apply specific modifiers
  let modifiers = 1.0;
  
  // Heating type adjustment
  if (formData.heatingType) {
    switch (formData.heatingType) {
      case 'geothermal':
        modifiers *= 1.4;
        break;
      case 'aerothermal':
        modifiers *= 1.25;
        break;
      case 'gas':
        modifiers *= 1.1;
        break;
      case 'electric':
        modifiers *= 0.9;
        break;
      default:
        modifiers *= 1.0;
        break;
    }
  }
  
  // Air conditioning adjustment
  const hasAirConditioning = ensureBoolean(formData.hasAirConditioning);
  if (hasAirConditioning) {
    modifiers *= 1.15;
  }
  
  // Smart home adjustment
  const hasSmartHome = ensureBoolean(formData.hasSmartHome);
  if (hasSmartHome) {
    modifiers *= 1.1;
  }
  
  // Home automation adjustment
  const hasHomeAutomation = ensureBoolean(formData.hasHomeAutomation);
  if (hasHomeAutomation) {
    modifiers *= 1.2;
  }
  
  // Security system adjustment
  const hasSecuritySystem = ensureBoolean(formData.hasSecuritySystem);
  if (hasSecuritySystem) {
    modifiers *= 1.05;
  }
  
  // Heat recovery adjustment
  const hasHeatRecovery = ensureBoolean(formData.hasHeatRecovery);
  if (hasHeatRecovery) {
    modifiers *= 1.1;
  }
  
  // Calculate final cost
  let finalTechnicalCost = baseCost * technicalRatio * modifiers;
  
  // Ensure minimum reasonable cost
  const minTechnicalCost = ensureNumber(formData.surface) * 200;
  finalTechnicalCost = Math.max(finalTechnicalCost, minTechnicalCost);
  
  return finalTechnicalCost;
}
