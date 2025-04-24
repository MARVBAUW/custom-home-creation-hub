
/**
 * Ensures a value is a number
 * If the value is already a number, it's returned as is
 * If it's a string, it's converted to a number
 * If it's undefined or null, it returns 0
 * 
 * @param value Value to ensure is a number
 * @returns The value as a number
 */
export const ensureNumber = (value: any): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    // Remove non-numeric characters except decimal point
    const cleanedValue = value.replace(/[^\d.-]/g, '');
    return cleanedValue ? parseFloat(cleanedValue) : 0;
  }
  return 0;
};

/**
 * Ensures a value is a boolean
 * If the value is already a boolean, it's returned as is
 * If it's a string 'true' or 'false', it's converted to a boolean
 * If it's undefined or null, it returns false
 * 
 * @param value Value to ensure is a boolean
 * @returns The value as a boolean
 */
export const ensureBoolean = (value: any): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return Boolean(value);
};

/**
 * Format a number as currency (€)
 * 
 * @param value Number to format
 * @returns Formatted currency string
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
 * 
 * @param value Number to format (0-1)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
};
