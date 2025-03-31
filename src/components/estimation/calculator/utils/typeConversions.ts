
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

/**
 * Converts any value to a form-friendly string representation
 * 
 * @param value The value to convert to a form value
 * @param defaultValue Default value to use if value is undefined/null
 * @returns A string representation for form fields
 */
export const toFormValue = (
  value: string | number | boolean | undefined | null,
  defaultValue: string = ''
): string => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  return String(value);
};

/**
 * Ensures a string value is properly formatted for an OUI/NON type
 * 
 * @param value The value to convert to OUI/NON
 * @param defaultValue Default value to use
 * @returns Either "OUI" or "NON"
 */
export const ensureOuiNon = (
  value: string | boolean | undefined | null,
  defaultValue: "OUI" | "NON" = "NON"
): "OUI" | "NON" => {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  if (typeof value === 'boolean') {
    return value ? "OUI" : "NON";
  }
  
  if (typeof value === 'string') {
    const normalized = value.toUpperCase().trim();
    if (normalized === 'OUI' || normalized === 'YES' || normalized === 'TRUE' || normalized === '1') {
      return "OUI";
    }
    if (normalized === 'NON' || normalized === 'NO' || normalized === 'FALSE' || normalized === '0') {
      return "NON";
    }
  }
  
  return defaultValue;
};

/**
 * Ensures a percentage value is within the valid 0-100 range
 * 
 * @param value The value to convert to percentage
 * @param defaultValue Default value to use if conversion fails
 * @returns A number between 0 and 100
 */
export const ensurePercentage = (
  value: string | number | undefined | null,
  defaultValue: number = 0
): number => {
  const num = ensureNumber(value, defaultValue);
  return Math.max(0, Math.min(100, num));
};

/**
 * Converts array or comma-separated string values to proper string array
 * 
 * @param value The value to convert to a string array
 * @returns An array of strings
 */
export const ensureStringArray = (
  value: string | string[] | undefined | null
): string[] => {
  if (value === undefined || value === null) {
    return [];
  }
  
  if (Array.isArray(value)) {
    return value.map(String);
  }
  
  // If it's a comma-separated string, split it
  if (typeof value === 'string' && value.includes(',')) {
    return value.split(',').map(item => item.trim());
  }
  
  return [String(value)];
};

/**
 * Creates a tuple with at least one required element
 * 
 * @param items Array of items to convert to tuple
 * @param defaultFirst Default value for the first item if array is empty
 * @returns A tuple with at least one required element
 */
export const createRequiredTuple = <T>(
  items: T[],
  defaultFirst: T
): [T, ...T[]] => {
  if (!items.length) {
    return [defaultFirst];
  }
  
  const [first, ...rest] = items;
  return [first, ...rest];
};
