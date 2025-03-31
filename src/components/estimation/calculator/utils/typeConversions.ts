
/**
 * Utility functions for type conversions and validations
 */

/**
 * Ensures a value is a number
 * @param value - The value to convert to a number
 * @param defaultValue - Optional default value if conversion fails (defaults to 0)
 * @returns The converted number or default value
 */
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (typeof value === 'number') {
    return isNaN(value) ? defaultValue : value;
  }
  
  if (typeof value === 'string') {
    const parsed = parseFloat(value.replace(/,/g, '.').replace(/\s/g, ''));
    return isNaN(parsed) ? defaultValue : parsed;
  }
  
  return defaultValue;
};

/**
 * Ensures a value is a boolean
 * @param value - The value to convert to a boolean
 * @param defaultValue - Optional default value if conversion is ambiguous
 * @returns The converted boolean
 */
export const ensureBoolean = (value: any, defaultValue: boolean = false): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }
  
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase();
    if (['true', 'yes', 'oui', '1'].includes(lowerValue)) {
      return true;
    }
    if (['false', 'no', 'non', '0'].includes(lowerValue)) {
      return false;
    }
  }
  
  if (typeof value === 'number') {
    return value === 1;
  }
  
  return defaultValue;
};

/**
 * Formats a number as a Euro currency string
 * @param value - The number to format
 * @returns Formatted string with Euro symbol
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};
