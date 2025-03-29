
/**
 * Utility functions to help with data type conversions between
 * form values and API/state values
 */

/**
 * Safely converts a value to a number
 * @param value - The value to convert
 * @param defaultValue - Default value if conversion fails
 * @returns The converted number or default value
 */
export const toNumber = (value: any, defaultValue = 0): number => {
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};

/**
 * Safely converts a value to a boolean
 * @param value - The value to convert
 * @param defaultValue - Default value if conversion fails
 * @returns The converted boolean or default value
 */
export const toBoolean = (value: any, defaultValue = false): boolean => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  if (typeof value === 'boolean') {
    return value;
  }
  
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === 'yes' || value === '1';
  }
  
  return Boolean(value);
};

/**
 * Safely converts a value to a string
 * @param value - The value to convert
 * @param defaultValue - Default value if conversion fails
 * @returns The converted string or default value
 */
export const toString = (value: any, defaultValue = ''): string => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  return String(value);
};

/**
 * Safely converts a value to an array
 * @param value - The value to convert
 * @param defaultValue - Default value if conversion fails
 * @returns The converted array or default value
 */
export const toArray = (value: any, defaultValue: any[] = []): any[] => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  if (Array.isArray(value)) {
    return value;
  }
  
  return [value];
};
