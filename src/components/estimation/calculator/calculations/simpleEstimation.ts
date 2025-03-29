// Base calculation functions for simple estimation
import { FormData } from '../types';

// Calculate base cost based on surface area and finish level
export const calculateBaseCost = (surface: number, finishLevel: string): number => {
  // Conversion from number to string for template literal
  const surfaceStr = String(surface);
  const basePrice = getBasePriceByFinishLevel(finishLevel);
  
  // Apply surface area adjustments
  let adjustedPrice = basePrice;
  
  if (surface < 50) {
    adjustedPrice *= 1.15; // Small surface premium
  } else if (surface > 200) {
    adjustedPrice *= 0.92; // Large surface discount
  }
  
  return adjustedPrice * surface;
};

// Helper function to ensure parameter types
export const getBasePriceByFinishLevel = (finishLevel: string): number => {
  switch (finishLevel) {
    case 'Basique':
      return 1200;
    case 'Standard':
      return 1500;
    case 'Premium':
      return 1800;
    case 'Luxe':
      return 2200;
    default:
      return 1500;
  }
};

// Calculate construction cost based on form data
export const calculateConstructionCost = (formData: FormData): number => {
  const surface = formData.surface || 100;
  const finishLevel = formData.finishLevel || 'Standard';
  const constructionType = formData.constructionType || 'traditional';
  
  // Base cost calculation
  let baseCost = calculateBaseCost(surface, finishLevel);
  
  // Apply construction type multipliers
  switch (constructionType) {
    case 'wooden':
      baseCost *= 1.05;
      break;
    case 'modern':
      baseCost *= 1.15;
      break;
    case 'ecological':
      baseCost *= 1.2;
      break;
    default: // traditional
      break;
  }
  
  // Apply terrain type adjustments
  if (formData.terrainType === 'sloped') {
    baseCost *= 1.1;
  } else if (formData.terrainType === 'difficult') {
    baseCost *= 1.2;
  }
  
  // Apply wall type adjustments
  if (formData.wallType === 'brick') {
    baseCost *= 1.05;
  } else if (formData.wallType === 'stone') {
    baseCost *= 1.15;
  }
  
  // Apply roof type adjustments
  if (formData.roofType === 'complex') {
    baseCost *= 1.1;
  } else if (formData.roofType === 'flat') {
    baseCost *= 0.95;
  }
  
  return baseCost;
};

// Calculate renovation cost based on form data
export const calculateRenovationCost = (formData: FormData): number => {
  const surface = formData.surface || 80;
  const finishLevel = formData.finishLevel || 'Standard';
  
  // Base renovation cost is typically 60-80% of new construction
  let baseCost = calculateBaseCost(surface, finishLevel) * 0.7;
  
  // Apply specific renovation adjustments
  if (formData.wallType === 'reinforcement') {
    baseCost *= 1.15;
  }
  
  if (formData.electricalType === 'complete') {
    baseCost += surface * 85;
  } else if (formData.electricalType === 'partial') {
    baseCost += surface * 45;
  }
  
  if (formData.plumbingType === 'complete') {
    baseCost += surface * 95;
  } else if (formData.plumbingType === 'partial') {
    baseCost += surface * 50;
  }
  
  return baseCost;
};

// Calculate additional features cost
export const calculateAdditionalFeaturesCost = (formData: FormData): number => {
  let additionalCost = 0;
  const surface = formData.surface || 100;
  
  // Fix for boolean comparisons
  if (includesEcoSolutions(formData)) {
    additionalCost += surface * 120;
  }
  
  if (formData.includeRenewableEnergy) {
    additionalCost += 15000;
  }
  
  if (formData.includeLandscaping) {
    additionalCost += 8000;
  }
  
  if (formData.includeCuisine) {
    additionalCost += 12000;
  }
  
  if (formData.includeBathroom) {
    additionalCost += 9000;
  }
  
  return additionalCost;
};

// Fix for boolean comparisons
export const includesEcoSolutions = (formData: any): boolean => {
  // Convert string 'true'/'false' to boolean if needed
  if (typeof formData.includeEcoSolutions === 'string') {
    return formData.includeEcoSolutions === 'true';
  }
  return !!formData.includeEcoSolutions;
};

// Main estimation function
export const calculateEstimation = (formData: FormData): number => {
  let totalCost = 0;
  
  if (formData.projectType?.toLowerCase().includes('construction')) {
    totalCost = calculateConstructionCost(formData);
  } else if (formData.projectType?.toLowerCase().includes('rénov') || 
             formData.projectType?.toLowerCase().includes('renov')) {
    totalCost = calculateRenovationCost(formData);
  } else {
    // Default to construction calculation
    totalCost = calculateConstructionCost(formData);
  }
  
  // Add costs for additional features
  totalCost += calculateAdditionalFeaturesCost(formData);
  
  // Apply professional discount if applicable
  if (formData.clientType === 'professional') {
    totalCost *= 0.9; // 10% discount for professionals
  }
  
  return Math.round(totalCost);
};

// Export all calculation functions
export default {
  calculateEstimation,
  calculateConstructionCost,
  calculateRenovationCost,
  calculateAdditionalFeaturesCost,
  calculateBaseCost
};
