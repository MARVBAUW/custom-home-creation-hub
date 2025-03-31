
/**
 * Ensures that the provided value is converted to a number
 * If the value is not a valid number, the default value is returned
 * 
 * @param value Value to convert to number
 * @param defaultValue Default value to return if conversion fails
 * @returns The numeric value or the default value
 */
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  
  // If it's already a number, return it
  if (typeof value === 'number') {
    return value;
  }
  
  // Try to convert to a number
  const parsedValue = Number(value);
  
  // Check if the conversion resulted in a valid number
  if (!isNaN(parsedValue)) {
    return parsedValue;
  }
  
  // Return the default if conversion failed
  return defaultValue;
};

/**
 * Converts a value to a form-friendly string value
 * 
 * @param value Value to convert to string
 * @returns A string representation suitable for form inputs
 */
export const toFormValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  // If it's already a string, return it
  if (typeof value === 'string') {
    return value;
  }
  
  // Convert to string
  return String(value);
};
