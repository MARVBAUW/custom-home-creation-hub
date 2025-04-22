import { FormData } from '../types/formTypes';
import { EstimationResponseData } from '../types/estimationTypes';
import { ensureNumber, ensureString, ensureBoolean } from './typeConversions';
import { calculateEstimationData } from '../calculationUtils';

/**
 * Convert form data to the format needed for estimation calculations
 * @param formData Raw form data
 * @returns Data in the format needed for estimation
 */
export const adaptToEstimationData = (formData: FormData): any => {
  return {
    projectType: formData.projectType || 'renovation',
    surface: ensureNumber(formData.surface, 0),
    location: formData.location || '',
    constructionType: formData.constructionType || 'standard',
    bedrooms: ensureNumber(formData.bedrooms, 0),
    bathrooms: ensureNumber(formData.bathrooms, 0),
    city: formData.city || '',
    // Add other necessary fields
    montantT: ensureNumber(formData.montantT, 0)
  };
};

/**
 * Convert estimation form data to full estimation response
 * @param formData Form data to convert
 * @returns Complete estimation response data
 */
export const adaptToEstimationResponseData = (formData: FormData): EstimationResponseData => {
  const adaptedData = adaptToEstimationData(formData);
  return calculateEstimationData(adaptedData);
};

/**
 * Create a function that handles type conversion when updating form data
 * @param updateFn Original update function
 * @returns New update function with type adaptation
 */
export const createTypeAdaptingUpdater = (updateFn: (data: Partial<FormData>) => void) => {
  return (data: Partial<FormData>) => {
    // Adapt types as needed
    const adaptedData: Partial<FormData> = { ...data };
    
    // Handle specific conversions
    if (data.surface !== undefined) {
      adaptedData.surface = ensureNumber(data.surface);
    }
    
    if (data.montantT !== undefined) {
      adaptedData.montantT = ensureNumber(data.montantT);
    }
    
    if (data.bedrooms !== undefined) {
      adaptedData.bedrooms = ensureNumber(data.bedrooms);
    }
    
    if (data.bathrooms !== undefined) {
      adaptedData.bathrooms = ensureNumber(data.bathrooms);
    }
    
    // Call the original update function with adapted data
    updateFn(adaptedData);
  };
};

/**
 * Initialize a FormData object with default values
 * @returns Default FormData object
 */
export const createDefaultFormData = (): FormData => {
  return {
    projectType: 'renovation',
    surface: 0,
    constructionType: 'standard',
    bedrooms: 0,
    bathrooms: 0,
    location: '',
    city: '',
    montantT: 0
  };
};
