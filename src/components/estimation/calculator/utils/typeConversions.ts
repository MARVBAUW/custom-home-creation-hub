/**
 * Ensures a value is a number or zero if undefined/null/NaN
 * 
 * @param value The value to convert to number
 * @param defaultValue Default value to use if conversion fails (defaults to 0)
 * @returns A number
 */
export const ensureNumber = (
  value: string | number | undefined | null,
  defaultValue: number = 0
): number => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  if (typeof value === 'number') {
    return isNaN(value) ? defaultValue : value;
  }
  
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Converts a value to a string
 * 
 * @param value The value to convert to string
 * @param defaultValue Default value to use if value is undefined/null
 * @returns A string
 */
export const ensureString = (
  value: string | number | undefined | null,
  defaultValue: string = ''
): string => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  return String(value);
};

/**
 * Converts a value to a boolean
 * 
 * @param value The value to convert to boolean
 * @param defaultValue Default value to use if conversion is not clear
 * @returns A boolean
 */
export const ensureBoolean = (
  value: string | boolean | number | undefined | null,
  defaultValue: boolean = false
): boolean => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  if (typeof value === 'boolean') {
    return value;
  }
  
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1' || value === 'yes' || value === 'oui';
  }
  
  if (typeof value === 'number') {
    return value === 1;
  }
  
  return defaultValue;
};

/**
 * Convert a string representation to an appropriate type (for calculated fields)
 * 
 * @param value The string value to parse
 * @returns The converted value
 */
export const parseStringValue = (value: string): string | number | boolean => {
  // Check if it's a number
  if (!isNaN(Number(value)) && value.trim() !== '') {
    return Number(value);
  }
  
  // Check if it's a boolean
  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    return value.toLowerCase() === 'true';
  }
  
  // Otherwise return as string
  return value;
};
