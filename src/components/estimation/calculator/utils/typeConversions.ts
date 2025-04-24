
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
