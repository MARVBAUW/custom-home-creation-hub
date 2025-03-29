
/**
 * Parse a string or number to a number value
 */
export const parseToNumber = (value: string | number | undefined): number => {
  if (value === undefined || value === '') {
    return 0;
  }
  
  if (typeof value === 'number') {
    return value;
  }
  
  // Remove non-numeric characters (except decimal point)
  const cleanedValue = value.toString().replace(/[^\d.-]/g, '');
  const result = parseFloat(cleanedValue);
  
  return isNaN(result) ? 0 : result;
};

/**
 * Convert a value to a form value
 */
export const toFormValue = (value: any): string => {
  if (value === undefined || value === null) {
    return '';
  }
  
  return value.toString();
};

/**
 * Convert any value to a number before using it
 * This is a helper function to update form submissions and avoid type errors
 */
export const ensureNumber = (value: any): number => {
  if (value === undefined || value === null || value === '') {
    return 0;
  }
  
  if (typeof value === 'number') {
    return value;
  }
  
  const parsed = parseFloat(value.toString());
  return isNaN(parsed) ? 0 : parsed;
};
