import { FormData } from '../types/formTypes';

/**
 * Adapts form data to the format expected by the estimation API
 */
export const adaptToEstimationData = (formData: FormData) => {
  return {
    clientType: formData.clientType || 'particular',
    projectType: formData.projectType || 'construction',
    surface: formData.surface || 0,
    location: formData.location || '',
    constructionType: formData.constructionType || 'traditional',
    quality: formData.quality || 'standard',
    // Add other necessary fields based on your form data structure
  };
};

/**
 * Creates a function that updates form data while handling type conversions
 * This is useful for ensuring consistent data types across the application
 */
export const createTypeAdaptingUpdater = (updateFunction: (data: any) => void) => {
  return (data: any) => {
    // Process the data before passing it to the update function
    // This could include type conversions, validation, etc.
    const processedData = { ...data };
    
    // Call the original update function with the processed data
    updateFunction(processedData);
  };
};
