
/**
 * Ensures a value is a number, converting strings to numbers if possible.
 * Returns 0 if the value cannot be converted to a number.
 * 
 * @param value The value to convert to a number
 * @returns A number representation of the value
 */
export function ensureNumber(value: any): number {
  if (typeof value === 'number') {
    return value;
  }
  
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  
  return 0;
}

/**
 * Converts a value to a form-compatible value (string for inputs)
 * 
 * @param value The value to convert
 * @returns A string representation of the value, or empty string if null/undefined
 */
export function toFormValue(value: any): string {
  if (value === null || value === undefined) {
    return '';
  }
  
  return String(value);
}

/**
 * Converts a string to a boolean
 * 
 * @param value The string value to convert
 * @returns A boolean representation of the value
 */
export function stringToBoolean(value: string | undefined): boolean {
  if (!value) return false;
  
  return value.toLowerCase() === 'true' || 
         value.toLowerCase() === 'yes' || 
         value.toLowerCase() === 'oui' || 
         value === '1';
}
