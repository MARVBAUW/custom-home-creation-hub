
import { FormData, EstimationFormData } from '../types';
import { ensureNumber } from './typeConversions';

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
export const adaptToReportData = (formData: EstimationFormData): FormData => {
  return formData as FormData;
};
