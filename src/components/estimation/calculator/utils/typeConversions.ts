
/**
 * Convert a value to a number or provide a default if conversion fails
 * @param value The value to convert to a number
 * @param defaultValue The default value to use if conversion fails
 * @returns The converted number or default value
 */
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (value === undefined || value === null) return defaultValue;
  
  const parsed = typeof value === 'string' ? parseFloat(value) : Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Convert a value to a form-friendly string
 * @param value The value to convert to a form string
 * @returns The converted string
 */
export const toFormValue = (value: any): string => {
  if (value === undefined || value === null) return "";
  
  return String(value);
};
