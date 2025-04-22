
/**
 * Utility functions for type conversions
 */

/**
 * Ensure a value is a number - useful for handling form inputs
 */
export const ensureNumber = (value: any): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

/**
 * Ensure a value is a boolean - useful for handling form inputs
 */
export const ensureBoolean = (value: any): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  return false;
};

/**
 * Convert a percentage string to a number
 */
export const percentageToNumber = (percentageStr: string): number => {
  if (!percentageStr) return 0;
  const value = parseFloat(percentageStr);
  return isNaN(value) ? 0 : value;
};

/**
 * Convert a value to a form-friendly format
 */
export const toFormValue = (value: any): string => {
  if (value === undefined || value === null) return '';
  return String(value);
};

/**
 * Safely render a value for display, providing a fallback
 */
export const safeRenderValue = (value: any, fallback: string = '-'): string => {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value);
};
