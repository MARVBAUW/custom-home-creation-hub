
/**
 * Utility functions for type conversions in the estimation calculator
 */

/**
 * Ensures a value is a number. Converts strings to numbers and provides default value for nullish values.
 * @param value The value to ensure is a number
 * @param defaultValue The default value to use if the value is nullish (default: 0)
 * @returns The value as a number
 */
export const ensureNumber = (value: string | number | undefined | null, defaultValue: number = 0): number => {
  // Return default value if value is nullish
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  
  // If value is already a number, return it
  if (typeof value === 'number') {
    return value;
  }
  
  // Try to parse the string to a number
  const parsed = parseFloat(value);
  
  // Return parsed value if valid, otherwise default value
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Convert a value to a string for form inputs
 * @param value The value to convert
 * @returns The value as a string
 */
export const toFormValue = (value: any): string => {
  if (value === undefined || value === null) {
    return '';
  }
  return String(value);
};

/**
 * Ensures a value is a boolean
 * @param value The value to convert to boolean
 * @returns boolean
 */
export const ensureBoolean = (value: any): boolean => {
  if (typeof value === 'boolean') return value;
  if (value === 'true' || value === true || value === 1 || value === '1') return true;
  return false;
};

/**
 * Safely check if an array includes a value
 * @param arr The array to check
 * @param value The value to check for
 * @returns boolean indicating if the array includes the value
 */
export const safeIncludes = (arr: any[] | undefined | null, value: any): boolean => {
  if (!arr || !Array.isArray(arr)) return false;
  return arr.includes(value);
};
