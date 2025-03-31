import { FormData, EstimationFormData, EstimationResponseData } from '../types';
import { ensureNumber, ensureBoolean } from './typeConversions';

/**
 * Adapts raw form data to properly typed EstimationFormData
 */
export const adaptFormData = (rawData: any): EstimationFormData => {
  const adaptedData: EstimationFormData = { ...rawData };
  
  // Convert numeric fields
  if (rawData.surface) adaptedData.surface = ensureNumber(rawData.surface);
  if (rawData.bedrooms) adaptedData.bedrooms = ensureNumber(rawData.bedrooms);
  if (rawData.bathrooms) adaptedData.bathrooms = ensureNumber(rawData.bathrooms);
  if (rawData.doorCount) adaptedData.doorCount = ensureNumber(rawData.doorCount);
  if (rawData.montantT) adaptedData.montantT = ensureNumber(rawData.montantT);
  
  // Convert percentage fields
  if (rawData.stonePercentage) adaptedData.stonePercentage = ensureNumber(rawData.stonePercentage);
  if (rawData.plasterPercentage) adaptedData.plasterPercentage = ensureNumber(rawData.plasterPercentage);
  if (rawData.brickPercentage) adaptedData.brickPercentage = ensureNumber(rawData.brickPercentage);
  if (rawData.metalCladdingPercentage) adaptedData.metalCladdingPercentage = ensureNumber(rawData.metalCladdingPercentage);
  if (rawData.woodCladdingPercentage) adaptedData.woodCladdingPercentage = ensureNumber(rawData.woodCladdingPercentage);
  if (rawData.stoneCladdingPercentage) adaptedData.stoneCladdingPercentage = ensureNumber(rawData.stoneCladdingPercentage);
  
  return adaptedData;
};

/**
 * Converts EstimationFormData to FormData for reporting
 */
export const adaptToFormData = (formData: EstimationFormData): FormData => {
  return formData as FormData;
};

/**
 * Converts FormData to EstimationFormData
 */
export const adaptToEstimationFormData = (formData: Partial<FormData>): Partial<EstimationFormData> => {
  return formData as Partial<EstimationFormData>;
};

/**
 * Creates a function that adapts the type of data when updating form data
 * @param updateFn The original update function
 * @returns A new function that adapts the data type before updating
 */
export const createTypeAdaptingUpdater = (updateFn: (data: Partial<FormData>) => void) => {
  return (data: Partial<FormData> | Partial<EstimationFormData>) => {
    // Convert any numeric string values to actual numbers
    const adaptedData: Partial<FormData> = {};
    
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        
        // Handle boolean values (convert string 'true'/'false' to actual booleans)
        if (value === 'true' || value === 'false') {
          adaptedData[key] = value === 'true';
        } 
        // Handle numeric values (convert string numbers to actual numbers)
        else if (typeof value === 'string' && !isNaN(Number(value)) && value.trim() !== '') {
          adaptedData[key] = Number(value);
        } 
        // Keep other values as they are
        else {
          adaptedData[key] = value;
        }
      }
    }
    
    // Call the original update function with the adapted data
    updateFn(adaptedData);
  };
};

/**
 * Utility function to add type adapting capabilities to an existing updater
 */
export const withTypeAdapting = <T extends object>(obj: T, updateFnName: keyof T): T => {
  const originalFn = obj[updateFnName] as unknown as (data: Partial<FormData>) => void;
  
  if (typeof originalFn !== 'function') {
    console.error(`${String(updateFnName)} is not a function on the provided object`);
    return obj;
  }
  
  const newObj = { ...obj };
  newObj[updateFnName] = createTypeAdaptingUpdater(originalFn) as unknown as T[keyof T];
  
  return newObj;
};
