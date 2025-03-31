
/**
 * Ensures a value is converted to a number.
 * If the conversion fails, returns 0 or the provided defaultValue.
 * 
 * @param value - The value to convert to a number
 * @param defaultValue - Optional default value to return if conversion fails
 * @returns A number representation of the value or the default
 */
export const ensureNumber = (value: string | number | undefined, defaultValue: number = 0): number => {
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  
  // If it's already a number, return it
  if (typeof value === 'number') {
    return isNaN(value) ? defaultValue : value;
  }
  
  // Try to convert string to number
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};

/**
 * Ensures a value is converted to a string.
 * 
 * @param value - The value to convert to a string
 * @param defaultValue - Optional default value to return if conversion fails
 * @returns A string representation of the value or the default
 */
export const ensureString = (value: any, defaultValue: string = ''): string => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  return String(value);
};

/**
 * Ensures a value is converted to a boolean.
 * 
 * @param value - The value to convert to a boolean
 * @param defaultValue - Optional default value to return if conversion fails
 * @returns A boolean representation of the value or the default
 */
export const ensureBoolean = (value: any, defaultValue: boolean = false): boolean => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  if (typeof value === 'boolean') {
    return value;
  }
  
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  
  if (typeof value === 'number') {
    return value === 1;
  }
  
  return Boolean(value);
};
