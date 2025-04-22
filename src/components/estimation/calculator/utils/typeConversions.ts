
/**
 * Ensure a value is a number
 * @param value Value to convert
 * @param defaultValue Default value if conversion fails
 * @returns Number
 */
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (value === null || value === undefined) return defaultValue;
  
  if (typeof value === 'number') return value;
  
  if (typeof value === 'string') {
    const parsed = parseFloat(value.replace(/,/g, ''));
    return isNaN(parsed) ? defaultValue : parsed;
  }
  
  return defaultValue;
};

/**
 * Ensure a value is a boolean
 * @param value Value to convert
 * @param defaultValue Default value if conversion fails
 * @returns Boolean
 */
export const ensureBoolean = (value: any, defaultValue: boolean = false): boolean => {
  if (value === null || value === undefined) return defaultValue;
  
  if (typeof value === 'boolean') return value;
  
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  
  if (typeof value === 'number') {
    return value === 1;
  }
  
  return defaultValue;
};

/**
 * Ensure a value is a string
 * @param value Value to convert
 * @param defaultValue Default value if conversion fails
 * @returns String
 */
export const ensureString = (value: any, defaultValue: string = ''): string => {
  if (value === null || value === undefined) return defaultValue;
  
  if (typeof value === 'string') return value;
  
  return String(value);
};
