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
    if (lowercased === 'true' || lowercased === 'yes' || lowercased === 'oui' || lowercased === '1' || lowercased === 'oui') {
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

/**
 * Helper function to convert any value to string format suitable for form inputs
 * @param value - The value to convert to a form-friendly string
 * @returns The value as a string suitable for form inputs
 */
export const toFormValue = (value: any): string => {
  if (value === undefined || value === null) return '';
  return String(value);
};

/**
 * Converts a value to a string[] array if it's not already
 * @param value - The value to ensure is a string array
 * @param defaultValue - Default value if conversion fails
 * @returns The value as a string array
 */
export const ensureStringArray = (value: any, defaultValue: string[] = []): string[] => {
  if (value === undefined || value === null) return defaultValue;
  
  // If already an array, ensure all elements are strings
  if (Array.isArray(value)) {
    return value.map(item => ensureString(item));
  }
  
  // If it's a string with commas, split it
  if (typeof value === 'string' && value.includes(',')) {
    return value.split(',').map(item => item.trim());
  }
  
  // Otherwise, wrap in array
  return [ensureString(value)];
};

/**
 * Ensures an object has string values
 * @param obj - The object to process
 * @returns An object with string values
 */
export const ensureStringRecord = (obj: Record<string, any>): Record<string, string> => {
  const result: Record<string, string> = {};
  
  if (!obj) return result;
  
  for (const key in obj) {
    result[key] = ensureString(obj[key]);
  }
  
  return result;
};

/**
 * Ensures an object has number values
 * @param obj - The object to process
 * @returns An object with number values
 */
export const ensureNumberRecord = (obj: Record<string, any>): Record<string, number> => {
  const result: Record<string, number> = {};
  
  if (!obj) return result;
  
  for (const key in obj) {
    result[key] = ensureNumber(obj[key]);
  }
  
  return result;
};

/**
 * Convert a value to OUI/NON format
 * @param value - The value to convert
 * @returns "OUI" or "NON"
 */
export const toOuiNon = (value: any): "OUI" | "NON" => {
  return ensureBoolean(value) ? "OUI" : "NON";
};

/**
 * Convert OUI/NON to boolean
 * @param value - The OUI/NON value
 * @returns true or false
 */
export const fromOuiNon = (value: "OUI" | "NON" | string): boolean => {
  return value === "OUI";
};
