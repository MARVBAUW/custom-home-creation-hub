
/**
 * Ensures a value is converted to a number if possible
 * @param value The value to convert
 * @returns A number if conversion is possible, or the original value
 */
export const ensureNumber = (value: any): number => {
  if (value === null || value === undefined || value === '') {
    return 0;
  }
  
  const parsed = Number(value);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Converts a form value to string for display in form components
 * @param value The value to convert
 * @returns A string representation of the value
 */
export const toFormValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  return String(value);
};
