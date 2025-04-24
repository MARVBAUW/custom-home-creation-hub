
/**
 * Safely renders a value as a string, handling null/undefined and objects
 */
export const safeRenderValue = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch (error) {
      return String(value);
    }
  }
  
  return String(value);
};

/**
 * Ensures a value is a number, or returns default value if it cannot be converted
 * @param value - The value to convert to a number
 * @param defaultValue - Optional default value to return if conversion fails (defaults to 0)
 */
export const ensureNumber = (value: unknown, defaultValue: number = 0): number => {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  
  if (typeof value === 'number') {
    return value;
  }
  
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Ensures a value is a boolean
 */
export const ensureBoolean = (value: unknown): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }
  
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  
  return Boolean(value);
};

/**
 * Ensures a value is a string
 */
export const ensureString = (value: unknown): string => {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  return String(value);
};

/**
 * Converts a value for form use, ensuring it matches form field expectations
 */
export const toFormValue = (value: unknown, defaultValue: string = ''): string => {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  
  return defaultValue;
};
