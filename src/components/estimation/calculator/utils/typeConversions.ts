
/**
 * Ensures a value is a number
 * @param value Value to convert to number
 * @returns Number or 0 if conversion fails
 */
export const ensureNumber = (value: any): number => {
  if (value === undefined || value === null) {
    return 0;
  }
  
  if (typeof value === 'number') {
    return value;
  }
  
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  
  return 0;
};

/**
 * Converts a value to form value (empty string if undefined)
 * @param value Value to convert
 * @returns String representation or empty string
 */
export const toFormValue = (value: any): string => {
  if (value === undefined || value === null) {
    return '';
  }
  
  return String(value);
};
