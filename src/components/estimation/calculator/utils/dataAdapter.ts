
/**
 * Utility for adapting data between different type structures
 */
import { FormData, EstimationFormData } from '../types';
import { 
  ensureNumber, 
  ensureString, 
  ensureBoolean,
  ensureStringArray, 
  toOuiNon 
} from './typeConversions';

/**
 * Adapts FormData to EstimationFormData format
 * @param data - Source data in FormData format
 * @returns Data in EstimationFormData format
 */
export const adaptToEstimationFormData = (data: Partial<FormData>): Partial<EstimationFormData> => {
  const adapted: Partial<EstimationFormData> = { ...data };
  
  // Convert boolean fields that need to be "OUI"/"NON" in EstimationFormData
  if (data.createWalls !== undefined) {
    adapted.createWalls = typeof data.createWalls === 'boolean' 
      ? toOuiNon(data.createWalls) 
      : data.createWalls;
  }
  
  if (data.createFloors !== undefined) {
    adapted.createFloors = typeof data.createFloors === 'boolean' 
      ? toOuiNon(data.createFloors) 
      : data.createFloors;
  }
  
  // Convert terassementsViabilisation from boolean to string/number
  if (data.terassementsViabilisation !== undefined) {
    if (typeof data.terassementsViabilisation === 'boolean') {
      adapted.terassementsViabilisation = data.terassementsViabilisation ? 1 : 0;
    } else {
      adapted.terassementsViabilisation = data.terassementsViabilisation;
    }
  }
  
  // Convert other specific fields as needed
  // ...
  
  return adapted;
};

/**
 * Adapts EstimationFormData to FormData format
 * @param data - Source data in EstimationFormData format
 * @returns Data in FormData format
 */
export const adaptToFormData = (data: Partial<EstimationFormData>): Partial<FormData> => {
  const adapted: Partial<FormData> = { ...data };
  
  // Convert "OUI"/"NON" fields that need to be boolean in FormData
  if (data.createWalls !== undefined) {
    adapted.createWalls = data.createWalls === 'OUI';
  }
  
  if (data.createFloors !== undefined) {
    adapted.createFloors = data.createFloors === 'OUI';
  }
  
  // Convert terassementsViabilisation from string/number to boolean
  if (data.terassementsViabilisation !== undefined) {
    if (typeof data.terassementsViabilisation === 'string') {
      adapted.terassementsViabilisation = data.terassementsViabilisation === 'OUI' || 
                                         data.terassementsViabilisation === '1' || 
                                         ensureNumber(data.terassementsViabilisation) > 0;
    } else if (typeof data.terassementsViabilisation === 'number') {
      adapted.terassementsViabilisation = data.terassementsViabilisation > 0;
    }
  }
  
  // Convert other specific fields as needed
  // ...
  
  return adapted;
};

/**
 * Wraps the updateFormData function to automatically adapt data types
 * @param updateFn - Original update function
 * @returns Wrapped update function that handles type conversion
 */
export const createTypeAdaptingUpdater = (
  updateFn: (data: Partial<EstimationFormData>) => void
): (data: Partial<FormData>) => void => {
  return (data: Partial<FormData>) => {
    const adaptedData = adaptToEstimationFormData(data);
    updateFn(adaptedData);
  };
};
