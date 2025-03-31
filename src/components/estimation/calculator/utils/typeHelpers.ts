
import { EstimationFormData, EstimationResponseData, EstimationTimeline } from '../types/estimationFormData';

/**
 * Converts a generic FormData object to the standardized EstimationFormData 
 * to ensure compatibility between different component versions
 */
export const normalizeFormData = (formData: any): EstimationFormData => {
  const result: EstimationFormData = { ...formData };
  
  // Ensure numeric values are normalized
  if (typeof result.surface === 'string' && !isNaN(parseFloat(result.surface))) {
    result.surface = parseFloat(result.surface);
  }
  
  if (typeof result.levels === 'string' && !isNaN(parseFloat(result.levels))) {
    result.levels = parseFloat(result.levels);
  }
  
  if (typeof result.units === 'string' && !isNaN(parseFloat(result.units))) {
    result.units = parseFloat(result.units);
  }
  
  if (typeof result.budget === 'string' && !isNaN(parseFloat(result.budget))) {
    result.budget = parseFloat(result.budget);
  }
  
  // Ensure boolean values are normalized
  if (typeof result.hasAirConditioning === 'string') {
    result.hasAirConditioning = result.hasAirConditioning === 'true' || 
                               result.hasAirConditioning === 'OUI' ||
                               result.hasAirConditioning === '1';
  }
  
  if (typeof result.poolHeating === 'string') {
    result.poolHeating = result.poolHeating === 'true' || 
                        result.poolHeating === 'OUI' ||
                        result.poolHeating === '1';
  }
  
  // Normalize array fields
  if (typeof result.landscapingType === 'string' && result.landscapingType.includes(',')) {
    result.landscapingType = result.landscapingType.split(',').map(t => t.trim());
  }
  
  return result;
};

/**
 * Converts the calculation result to the expected EstimationResponseData format
 */
export const convertEstimationResponseData = (result: any): EstimationResponseData => {
  const baseResponse: EstimationResponseData = {
    constructionCosts: {
      structuralWork: 0,
      finishingWork: 0,
      technicalLots: 0,
      externalWorks: 0,
      total: 0,
    },
    fees: {
      architect: 0,
      engineeringFees: 0,
      architectFees: 0,
      masterBuilderFees: 0,
      safetyCoordination: 0,
      technicalControl: 0,
      insurance: 0,
      total: 0,
    },
    otherCosts: {
      landRegistry: 0,
      urbanismTax: 0,
      landTax: 0,
      connectionFees: 0,
      total: 0,
    },
    totalAmount: 0,
    categories: [],
    timeline: {
      duration: 12,
      type: EstimationTimeline.Standard
    }
  };
  
  // If we have a valid object, merge it
  if (result && typeof result === 'object') {
    // Handle construction costs
    if (result.constructionCosts) {
      baseResponse.constructionCosts = {
        ...baseResponse.constructionCosts,
        ...result.constructionCosts
      };
    }
    
    // Handle fees
    if (result.fees) {
      baseResponse.fees = {
        ...baseResponse.fees,
        ...result.fees
      };
    }
    
    // Handle other costs
    if (result.otherCosts) {
      baseResponse.otherCosts = {
        ...baseResponse.otherCosts,
        ...result.otherCosts
      };
    }
    
    // Set total amount
    if (typeof result.totalAmount === 'number') {
      baseResponse.totalAmount = result.totalAmount;
    }
    
    // Set timeline
    if (result.timeline) {
      baseResponse.timeline = {
        ...baseResponse.timeline,
        ...result.timeline
      };
    }
    
    // Generate categories if not present
    if (!result.categories || !Array.isArray(result.categories) || result.categories.length === 0) {
      baseResponse.categories = generateDefaultCategories(baseResponse.totalAmount);
    } else {
      baseResponse.categories = result.categories;
    }
  } else if (typeof result === 'number') {
    // If the result is just a number, use it as the total amount
    baseResponse.totalAmount = result;
    baseResponse.categories = generateDefaultCategories(result);
  }
  
  return baseResponse;
};

/**
 * Helper function to convert any value to string format suitable for form inputs
 */
export const toFormValue = (value: any): string => {
  if (value === undefined || value === null) return '';
  return String(value);
};

/**
 * Generates default categories based on a total amount
 */
const generateDefaultCategories = (totalAmount: number): { category: string; amount: number; details?: string }[] => {
  return [
    { category: 'Gros œuvre', amount: totalAmount * 0.35 },
    { category: 'Charpente', amount: totalAmount * 0.10 },
    { category: 'Couverture', amount: totalAmount * 0.08 },
    { category: 'Menuiseries extérieures', amount: totalAmount * 0.07 },
    { category: 'Isolation', amount: totalAmount * 0.06 },
    { category: 'Plâtrerie', amount: totalAmount * 0.05 },
    { category: 'Électricité', amount: totalAmount * 0.05 },
    { category: 'Plomberie', amount: totalAmount * 0.04 },
    { category: 'Chauffage', amount: totalAmount * 0.06 },
    { category: 'Revêtements', amount: totalAmount * 0.05 },
    { category: 'Frais d\'études', amount: totalAmount * 0.04 },
    { category: 'Frais administratifs', amount: totalAmount * 0.03 },
    { category: 'Divers', amount: totalAmount * 0.02 }
  ];
};
