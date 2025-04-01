
import { FormData } from '../types/formTypes';
import { EstimationFormData } from '../types/estimationFormData';
import { ensureNumber, ensureString } from './typeConversions';

/**
 * Converts form data to estimation form data structure
 */
export function adaptFormDataToEstimation(formData: FormData): EstimationFormData {
  return {
    projectType: formData.projectType || 'construction',
    surface: ensureNumber(formData.surface, 0),
    location: formData.location || '',
    constructionType: formData.constructionType || 'standard',
    bedrooms: ensureNumber(formData.bedrooms, 0),
    bathrooms: ensureNumber(formData.bathrooms, 0),
    budget: ensureNumber(formData.budget, 0),
    city: formData.city || '',
    clientType: formData.clientType || 'individual'
  };
}

/**
 * Creates a typed form data updater
 */
export function createTypeAdaptingUpdater(
  updateFn: (data: Partial<FormData>) => void
): (data: Partial<FormData>) => void {
  return (data: Partial<FormData>) => {
    // Ensure numeric values are properly converted
    const adaptedData: Partial<FormData> = { ...data };
    
    if ('surface' in data) {
      adaptedData.surface = ensureNumber(data.surface);
    }
    
    if ('bedrooms' in data) {
      adaptedData.bedrooms = ensureNumber(data.bedrooms);
    }
    
    if ('bathrooms' in data) {
      adaptedData.bathrooms = ensureNumber(data.bathrooms);
    }
    
    if ('budget' in data) {
      adaptedData.budget = ensureNumber(data.budget);
    }
    
    updateFn(adaptedData);
  };
}

/**
 * Creates default form data with initial values
 */
export function createDefaultFormData(): FormData {
  return {
    clientType: 'individual',
    projectType: 'construction',
    surface: 0,
    city: '',
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    budget: 0,
    constructionType: 'standard'
  };
}

/**
 * Creates a default estimation form data with initial values
 */
export function createDefaultEstimationData(): EstimationFormData {
  return {
    projectType: 'construction',
    surface: 0,
    location: '',
    constructionType: 'standard',
    bedrooms: 0,
    bathrooms: 0,
    budget: 0,
    city: '',
    clientType: 'individual'
  };
}
