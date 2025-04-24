
import { FormData } from '../types/formTypes';
import { EstimationResponseData } from '../types/estimationTypes';
import { calculateEstimation } from '../calculations/estimationCalculator';
import { ensureNumber } from './typeConversions';

/**
 * Adapts the form data to the estimation response data format
 */
export const adaptToEstimationResponseData = (formData: FormData): EstimationResponseData => {
  return calculateEstimation(formData);
};

/**
 * Creates a function that updates form data while adapting types
 */
export const createTypeAdaptingUpdater = (updateFn: (data: any) => void) => {
  return (data: any) => {
    const adaptedData = { ...data };
    
    // Convert numeric strings to numbers
    if (adaptedData.surface) {
      adaptedData.surface = ensureNumber(adaptedData.surface);
    }
    
    if (adaptedData.bedrooms) {
      adaptedData.bedrooms = ensureNumber(adaptedData.bedrooms);
    }
    
    if (adaptedData.bathrooms) {
      adaptedData.bathrooms = ensureNumber(adaptedData.bathrooms);
    }
    
    if (adaptedData.budget) {
      adaptedData.budget = ensureNumber(adaptedData.budget);
    }
    
    // Convert boolean strings to actual booleans
    if (adaptedData.hasPool === 'true') adaptedData.hasPool = true;
    if (adaptedData.hasPool === 'false') adaptedData.hasPool = false;
    
    if (adaptedData.hasTerrace === 'true') adaptedData.hasTerrace = true;
    if (adaptedData.hasTerrace === 'false') adaptedData.hasTerrace = false;
    
    // Call the original update function with the adapted data
    updateFn(adaptedData);
  };
};

/**
 * Calculates a price coefficient based on location
 */
export const getLocationCoefficient = (location: string): number => {
  const locationCoefficients: Record<string, number> = {
    'Marseille': 1.15,
    'Nice': 1.25,
    'Toulon': 1.10,
    'Aix-en-Provence': 1.2,
    'Cannes': 1.3,
    'Antibes': 1.2,
    'Monaco': 1.5,
    // Default regions
    'PACA': 1.15,
    'Île-de-France': 1.35,
    'Rhône-Alpes': 1.10,
    'default': 1.0
  };
  
  return locationCoefficients[location] || locationCoefficients['default'];
};

/**
 * Generates a detailed estimation for bank or insurance purposes
 */
export const generateBankReport = (estimationData: EstimationResponseData): EstimationResponseData => {
  // Add additional details for bank reports
  return {
    ...estimationData,
    isComplete: true
  };
};
