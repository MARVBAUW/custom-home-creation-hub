
import { EstimationFormData } from '../types/estimationFormData';

/**
 * Convert a value to a string, or empty string if undefined/null
 */
export const toString = (value: any): string => {
  if (value === undefined || value === null) return '';
  return String(value);
};

/**
 * Convert a value to a number, or 0 if NaN
 */
export const toNumber = (value: any): number => {
  if (value === undefined || value === null) return 0;
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

/**
 * Ensure a value is a number, with optional default value
 */
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (value === undefined || value === null) return defaultValue;
  if (typeof value === 'number') return value;
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};

/**
 * Ensure a value is a boolean
 */
export const ensureBoolean = (value: any, defaultValue: boolean = false): boolean => {
  if (value === undefined || value === null) return defaultValue;
  if (typeof value === 'boolean') return value;
  if (value === 'true' || value === 'OUI' || value === 'Oui' || value === 'oui' || value === '1') return true;
  if (value === 'false' || value === 'NON' || value === 'Non' || value === 'non' || value === '0') return false;
  return Boolean(value);
};

/**
 * Convert a value to a boolean
 */
export const toBoolean = (value: any): boolean => {
  if (typeof value === 'boolean') return value;
  if (value === 'true' || value === 'OUI') return true;
  if (value === 'false' || value === 'NON') return false;
  return Boolean(value);
};

/**
 * Convert a value to an array, or empty array if undefined/null
 */
export const toArray = (value: any): any[] => {
  if (value === undefined || value === null) return [];
  if (Array.isArray(value)) return value;
  return [value];
};

/**
 * Convert a value to a proper form value based on field type
 */
export const toFormValue = (value: any, fieldType: string = 'string'): any => {
  switch (fieldType) {
    case 'number':
      return toNumber(value);
    case 'boolean':
      return toBoolean(value);
    case 'array':
      return toArray(value);
    case 'string':
    default:
      return toString(value);
  }
};

/**
 * Stringify a value for JSON storage, handling special cases
 */
export const stringifyForJson = (value: any): string => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

/**
 * Convert EstimationFormData object to proper types for each field
 */
export const convertFormData = (data: Partial<EstimationFormData>): Partial<EstimationFormData> => {
  const result: Partial<EstimationFormData> = {};
  
  // Process each field with appropriate conversion
  Object.entries(data).forEach(([key, value]) => {
    // Skip undefined values
    if (value === undefined) return;
    
    // Convert based on field type hints in the key name
    if (key.includes('Count') || key.includes('Area') || key.includes('surface') || 
        key.includes('budget') || key.includes('price') || key.includes('cost') ||
        key.includes('Length') || key === 'montantT') {
      result[key as keyof EstimationFormData] = toNumber(value);
    }
    else if (key.startsWith('has') || key.includes('is')) {
      result[key as keyof EstimationFormData] = toBoolean(value);
    }
    else if (key.includes('Types') || key.endsWith('s') && !key.includes('address')) {
      result[key as keyof EstimationFormData] = toArray(value);
    }
    else {
      result[key as keyof EstimationFormData] = value;
    }
  });
  
  return result;
};

/**
 * Convert any value to appropriate string format for display
 */
export const formatValueForDisplay = (value: any): string => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'number') return value.toLocaleString('fr-FR');
  return String(value);
};

/**
 * Helper to safely check if a value includes a substring
 */
export const safeIncludes = (value: any, searchString: string): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value !== 'string') return false;
  return value.includes(searchString);
};

export default {
  toString,
  toNumber,
  toBoolean,
  toArray,
  toFormValue,
  convertFormData,
  formatValueForDisplay,
  ensureNumber,
  ensureBoolean,
  safeIncludes,
  stringifyForJson
};
