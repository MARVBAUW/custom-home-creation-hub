
/**
 * Ensures a value is a number
 * 
 * @param value The value to convert to a number
 * @param defaultValue The default value to return if conversion fails
 * @returns The numeric value or default value
 */
export function ensureNumber(value: any, defaultValue: number = 0): number {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  
  if (typeof value === 'number') {
    return isNaN(value) ? defaultValue : value;
  }
  
  if (typeof value === 'string') {
    // Try to convert string to number
    const num = parseFloat(value);
    return isNaN(num) ? defaultValue : num;
  }
  
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }
  
  return defaultValue;
}

/**
 * Converts a string to a boolean
 * 
 * @param value The value to convert
 * @param defaultValue The default value if conversion fails
 * @returns The boolean value
 */
export function ensureBoolean(value: any, defaultValue: boolean = false): boolean {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  
  if (typeof value === 'boolean') {
    return value;
  }
  
  if (typeof value === 'string') {
    const lowercaseValue = value.toLowerCase();
    if (lowercaseValue === 'true' || lowercaseValue === '1' || lowercaseValue === 'yes' || lowercaseValue === 'oui') {
      return true;
    }
    if (lowercaseValue === 'false' || lowercaseValue === '0' || lowercaseValue === 'no' || lowercaseValue === 'non') {
      return false;
    }
  }
  
  if (typeof value === 'number') {
    return value !== 0;
  }
  
  return defaultValue;
}

/**
 * Converts form values to the appropriate format for display or processing
 * 
 * @param value The form value to convert
 * @returns The formatted value
 */
export function toFormValue(value: any): string {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  
  return String(value);
}
