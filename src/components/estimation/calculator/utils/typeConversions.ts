
/**
 * Utility functions to ensure consistent type handling
 */

export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (value === undefined || value === null) return defaultValue;
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};

export const ensureBoolean = (value: any, defaultValue: boolean = false): boolean => {
  if (value === undefined || value === null) return defaultValue;
  return Boolean(value);
};

export const ensureString = (value: any, defaultValue: string = ''): string => {
  if (value === undefined || value === null) return defaultValue;
  return String(value);
};

export const percentageToNumber = (percentage: string | number): number => {
  if (typeof percentage === 'string') {
    // Handle "50%" format
    if (percentage.endsWith('%')) {
      return Number(percentage.replace('%', '')) / 100;
    }
    return Number(percentage) / 100;
  }
  return percentage / 100;
};

/**
 * Safely converts any value to a form-compatible value
 */
export const toFormValue = (value: any): string => {
  if (value === undefined || value === null) return '';
  return String(value);
};

/**
 * Safely render a value as a string with fallback
 */
export const safeRenderValue = (value: any, fallback: string = '-'): string => {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value);
};

/**
 * Format a number as currency (Euros)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
};

/**
 * Format a number with correct separators and precision
 */
export const formatNumber = (value: number, precision: number = 0): string => {
  return new Intl.NumberFormat('fr-FR', { 
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(value);
};
