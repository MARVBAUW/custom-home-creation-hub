
/**
 * Utility functions for type conversions and validation
 */

/**
 * Ensures a value is converted to a number
 * @param value The value to convert
 * @param defaultValue Default value to use if conversion fails
 * @returns A number
 */
export const ensureNumber = (value: string | number | undefined, defaultValue: number = 0): number => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  if (typeof value === 'number') {
    return isNaN(value) ? defaultValue : value;
  }
  
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Ensures a value is converted to a boolean
 * @param value The value to convert
 * @param defaultValue Default value to use if value is undefined
 * @returns A boolean
 */
export const ensureBoolean = (value: boolean | undefined, defaultValue: boolean = false): boolean => {
  return value === undefined ? defaultValue : value;
};

/**
 * Ensures a value is converted to a string
 * @param value The value to convert
 * @param defaultValue Default value to use if value is undefined
 * @returns A string
 */
export const ensureString = (value: string | number | undefined, defaultValue: string = ''): string => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  return String(value);
};

/**
 * Format a number as currency (EUR)
 * @param value The number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Safely renders a value for display
 * @param value The value to render
 * @returns A string representation of the value
 */
export const safeRenderValue = (value: any): string => {
  if (value === undefined || value === null) {
    return '';
  }
  
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return '[Object]';
    }
  }
  
  return String(value);
};

/**
 * Convert a value to form-compatible format
 * @param value The value to convert
 * @returns Form-compatible value
 */
export const toFormValue = (value: any): string => {
  if (value === undefined || value === null) {
    return '';
  }
  
  return String(value);
};
