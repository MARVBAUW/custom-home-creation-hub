
/**
 * Utility functions for type conversions
 */

/**
 * Ensures a value is a number, converting from string if necessary
 */
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (typeof value === 'number') return value;
  if (!value) return defaultValue;
  
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Converts a form field value to appropriate format for form display
 */
export const toFormValue = (value: any, defaultValue: string = ''): string => {
  if (value === undefined || value === null) return defaultValue;
  return value.toString();
};

/**
 * Converts a string to boolean
 */
export const toBoolean = (value: any): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1' || value === 'yes' || value === 'oui';
  }
  return Boolean(value);
};

/**
 * Format a number as currency
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Format a number as percentage
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
};
