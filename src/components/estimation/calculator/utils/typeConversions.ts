
/**
 * Type conversion utility functions
 */

/**
 * Ensures a value is a number, with fallback to defaultValue if conversion fails
 * @param value - The value to ensure is a number
 * @param defaultValue - The default value to use if conversion fails (default: 0)
 * @returns The value as a number
 */
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (value === undefined || value === null) return defaultValue;
  
  // If value is already a number, return it
  if (typeof value === 'number') return value;
  
  // If value is a boolean, convert to 0 or 1
  if (typeof value === 'boolean') return value ? 1 : 0;
  
  // Try to parse as number
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Ensures a value is a boolean, with logic for string conversions
 * @param value - The value to ensure is a boolean
 * @param defaultValue - The default value to use if conversion is ambiguous (default: false)
 * @returns The value as a boolean
 */
export const ensureBoolean = (value: any, defaultValue: boolean = false): boolean => {
  if (value === undefined || value === null) return defaultValue;
  
  // If value is already a boolean, return it
  if (typeof value === 'boolean') return value;
  
  // Handle string values
  if (typeof value === 'string') {
    const lowercased = value.toLowerCase();
    if (lowercased === 'true' || lowercased === 'yes' || lowercased === 'oui' || lowercased === '1') {
      return true;
    }
    if (lowercased === 'false' || lowercased === 'no' || lowercased === 'non' || lowercased === '0') {
      return false;
    }
  }
  
  // For numbers, 0 is false, anything else is true
  if (typeof value === 'number') {
    return value !== 0;
  }
  
  return defaultValue;
};

/**
 * Ensures a value is a string
 * @param value - The value to ensure is a string
 * @param defaultValue - The default value to use if conversion is ambiguous (default: '')
 * @returns The value as a string
 */
export const ensureString = (value: any, defaultValue: string = ''): string => {
  if (value === undefined || value === null) return defaultValue;
  
  // If value is already a string, return it
  if (typeof value === 'string') return value;
  
  // Convert other types to string
  return String(value);
};
