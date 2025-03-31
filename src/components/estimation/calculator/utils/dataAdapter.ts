import { FormData } from '../types/formTypes';
import { EstimationResponseData } from '../types/estimationTypes';

/**
 * Create a function that handles type conversions automatically when updating form data
 */
export const createTypeAdaptingUpdater = (
  updateFunction: (data: Partial<FormData>) => void
) => {
  return (partialData: Partial<any>) => {
    // Create a new object to store converted values
    const convertedData: Partial<FormData> = {};
    
    // Process each property for appropriate type conversion
    Object.entries(partialData).forEach(([key, value]) => {
      if (key === 'surface' || key === 'bedrooms' || key === 'bathrooms' || key === 'budget') {
        // Convert string to number for numeric fields
        if (typeof value === 'string' && value.trim() !== '') {
          convertedData[key] = parseFloat(value);
        } else if (typeof value === 'number') {
          convertedData[key] = value;
        }
      } else if (typeof value === 'boolean' || typeof value === 'string' || Array.isArray(value)) {
        // Keep boolean, string, and array values as they are
        convertedData[key] = value;
      } else if (value instanceof Date) {
        // Keep Date objects as they are
        convertedData[key] = value;
      } else if (typeof value === 'object' && value !== null) {
        // For objects, keep them as they are
        convertedData[key] = value;
      } else if (typeof value === 'number') {
        // Keep number values as they are
        convertedData[key] = value;
      }
    });
    
    // Call the update function with properly typed data
    updateFunction(convertedData);
  };
};

/**
 * Adapts form data to the estimation response data format
 */
export const adaptToEstimationResponseData = (formData: FormData, calculationResult: any): EstimationResponseData => {
  // Ensure the data has all required properties
  const response: EstimationResponseData = {
    projectType: formData.projectType || '',
    projectDetails: {
      surface: typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0),
      location: formData.city || '',
      projectType: formData.projectType || '',
      city: formData.city || '',
      bedrooms: typeof formData.bedrooms === 'string' ? parseInt(formData.bedrooms as string) : (formData.bedrooms || 0),
      bathrooms: typeof formData.bathrooms === 'string' ? parseInt(formData.bathrooms as string) : (formData.bathrooms || 0),
    },
    estimatedCost: calculationResult.totalAmount || 0,
    constructionCosts: calculationResult.constructionCosts || {
      structuralWork: 0,
      finishingWork: 0,
      technicalLots: 0,
      externalWorks: 0,
      total: 0
    },
    otherCosts: calculationResult.otherCosts || {
      insurance: 0,
      contingency: 0,
      taxes: 0,
      miscellaneous: 0,
      total: 0
    },
    totalAmount: calculationResult.totalAmount || 0,
    categories: calculationResult.categories || [],
    timeline: calculationResult.timeline || {
      design: 0,
      permits: 0,
      bidding: 0,
      construction: 0,
      total: 0
    },
    fees: calculationResult.fees || {
      architect: 0,
      engineeringFees: 0,
      architectFees: 0,
      officialFees: 0,
      inspectionFees: 0,
      technicalStudies: 0,
      other: 0,
      total: 0
    },
    dateGenerated: calculationResult.dateGenerated || new Date().toISOString(),
    isComplete: calculationResult.isComplete || false
  };
  
  return response;
};

/**
 * Convert any value to a number, with a fallback to a default value
 */
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  return defaultValue;
};

/**
 * Convert any value to a boolean
 */
export const ensureBoolean = (value: any): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1' || value === 'yes';
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  return false;
};

/**
 * Convert any value to a string
 */
export const ensureString = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value);
};
