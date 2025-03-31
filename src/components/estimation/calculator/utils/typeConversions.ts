
/**
 * Convert any value to a form-friendly value
 */
export const toFormValue = (value: any): string => {
  if (value === undefined || value === null) {
    return '';
  }
  return String(value);
};

/**
 * Convert a string value to a number if possible, otherwise return the original value
 */
export const toNumber = (value: string): number | string => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? value : parsed;
};

/**
 * Convert a string representation of a boolean to an actual boolean
 */
export const toBoolean = (value: string | boolean): boolean => {
  if (typeof value === 'boolean') return value;
  return value === 'true' || value === '1' || value === 'yes';
};
