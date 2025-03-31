
/**
 * Ensures a value is a number
 * 
 * @param value Value to convert
 * @param defaultValue Default value if conversion fails
 * @returns Converted number or default value
 */
export function ensureNumber(value: string | number | undefined, defaultValue: number): number {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  if (typeof value === 'number') {
    return isNaN(value) ? defaultValue : value;
  }
  
  // Try to convert string to number
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Converts a value to a form-friendly string value
 * 
 * @param value Value to convert
 * @param defaultValue Default value if conversion fails
 * @returns String representation for form inputs
 */
export function toFormValue(value: string | number | undefined, defaultValue: string = ''): string {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  return String(value);
}
