
/**
 * Utility functions for type conversions in the estimation calculator
 */

/**
 * Ensure a value is a number
 * @param value Value to convert
 * @param defaultValue Default value if conversion fails
 * @returns Number
 */
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (value === null || value === undefined) return defaultValue;
  
  if (typeof value === 'number') return value;
  
  if (typeof value === 'string') {
    const parsed = parseFloat(value.replace(/,/g, ''));
    return isNaN(parsed) ? defaultValue : parsed;
  }
  
  return defaultValue;
};

/**
 * Ensure a value is a boolean
 * @param value Value to convert
 * @param defaultValue Default value if conversion fails
 * @returns Boolean
 */
export const ensureBoolean = (value: any, defaultValue: boolean = false): boolean => {
  if (value === null || value === undefined) return defaultValue;
  
  if (typeof value === 'boolean') return value;
  
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  
  if (typeof value === 'number') {
    return value === 1;
  }
  
  return defaultValue;
};

/**
 * Ensure a value is a string
 * @param value Value to convert
 * @param defaultValue Default value if conversion fails
 * @returns String
 */
export const ensureString = (value: any, defaultValue: string = ''): string => {
  if (value === null || value === undefined) return defaultValue;
  
  if (typeof value === 'string') return value;
  
  return String(value);
};

/**
 * Convert a value to the correct form field value format
 * @param value Value to convert
 * @returns Form field value
 */
export const toFormValue = (value: any): string | number | boolean => {
  if (value === null || value === undefined) return '';
  
  return value;
};

/**
 * Safely render a value for display (prevents React errors with null/undefined)
 * @param value The value to render
 * @param defaultValue Default value to display if value is null/undefined
 * @returns Safe value for rendering
 */
export const safeRenderValue = (value: any, defaultValue: string = '-'): string => {
  if (value === null || value === undefined) return defaultValue;
  
  if (typeof value === 'number') {
    // Format number with thousands separator
    return value.toLocaleString();
  }
  
  if (typeof value === 'boolean') {
    return value ? 'Oui' : 'Non';
  }
  
  return String(value) || defaultValue;
};

/**
 * Convert a percentage string to a number
 * @param percentage Percentage string (e.g. "50%", "50")
 * @returns Number between 0-100
 */
export const percentageToNumber = (percentage: string): number => {
  if (!percentage) return 0;
  
  // Remove % sign if present
  const cleaned = percentage.replace('%', '');
  const value = parseFloat(cleaned);
  
  if (isNaN(value)) return 0;
  
  // Ensure the value is between 0-100
  return Math.min(100, Math.max(0, value));
};

/**
 * Convert a number to a percentage string
 * @param value Number to convert
 * @returns Percentage string (e.g. "50%")
 */
export const numberToPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};
