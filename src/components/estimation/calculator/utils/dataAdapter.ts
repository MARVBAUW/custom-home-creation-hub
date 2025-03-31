
import { FormData, EstimationFormData } from '../types';
import { ensureNumber, ensureBoolean, toArray, toString } from './typeConversions';

/**
 * Creates a type-adapting wrapper around updateFormData to ensure proper type conversion
 */
export const createTypeAdaptingUpdater = (
  updateFn: (data: Partial<FormData>) => void
) => {
  return (data: Partial<FormData>) => {
    // Convert data types before updating
    const convertedData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value === undefined) {
        return acc;
      }

      // Convert based on key name patterns for consistent types
      if (
        key.includes('surface') ||
        key.includes('area') ||
        key.includes('length') ||
        key.includes('count') ||
        key.includes('price') ||
        key.includes('cost') ||
        key.includes('montant') ||
        key.includes('percentage')
      ) {
        acc[key] = ensureNumber(value);
      } else if (
        key.startsWith('has') ||
        key.startsWith('is') ||
        key.includes('include')
      ) {
        acc[key] = ensureBoolean(value);
      } else if (
        key.endsWith('Types') ||
        key.endsWith('Categories') ||
        key.includes('features')
      ) {
        acc[key] = Array.isArray(value) ? value : [value];
      } else {
        acc[key] = value;
      }

      return acc;
    }, {} as Record<string, any>);

    updateFn(convertedData);
  };
};

/**
 * Convert form data to string values for display or export
 */
export const adaptFormDataToStringValues = (data: FormData): Record<string, string> => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (value === undefined || value === null) {
      acc[key] = '';
    } else if (typeof value === 'boolean') {
      acc[key] = value ? 'OUI' : 'NON';
    } else if (Array.isArray(value)) {
      acc[key] = value.join(', ');
    } else if (typeof value === 'object') {
      acc[key] = JSON.stringify(value);
    } else {
      acc[key] = String(value);
    }
    return acc;
  }, {} as Record<string, string>);
};

/**
 * Safely access nested properties in form data object
 */
export const getNestedValue = (
  obj: any,
  path: string,
  defaultValue: any = undefined
): any => {
  try {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      if (result === undefined || result === null) return defaultValue;
      result = result[key];
    }
    return result === undefined ? defaultValue : result;
  } catch (error) {
    return defaultValue;
  }
};

/**
 * Formats a value based on its type for display
 */
export const formatValueForDisplay = (value: any): string => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'number') {
    return value.toLocaleString('fr-FR');
  }
  return String(value);
};

/**
 * Cleanly maps form data to estimation form data with proper typing
 */
export const adaptFormData = (formData: Record<string, any>): Partial<EstimationFormData> => {
  // Convert values to appropriate types based on key patterns
  return Object.entries(formData).reduce((result, [key, value]) => {
    if (value === undefined) return result;
    
    // Number values
    if (
      key.includes('Count') || 
      key.includes('Area') || 
      key.includes('surface') || 
      key.includes('budget') || 
      key.includes('price') || 
      key.includes('cost') ||
      key.includes('montant') ||
      key.includes('Length')
    ) {
      result[key] = ensureNumber(value);
    }
    // Boolean values
    else if (key.startsWith('has') || key.includes('is') || key.includes('include')) {
      result[key] = ensureBoolean(value);
    }
    // Array values
    else if (key.includes('Types') || key.endsWith('s') && !key.includes('address')) {
      result[key] = toArray(value);
    }
    // String or other values
    else {
      result[key] = value;
    }
    
    return result;
  }, {} as Record<string, any>);
};
