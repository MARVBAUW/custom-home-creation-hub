
/**
 * Safely converts any value to a number.
 * Returns the default value if conversion fails.
 */
export const parseToNumber = (value: any, defaultValue: number = 0): number => {
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Safely converts a number or undefined value to a string for form inputs.
 * Returns an empty string if value is null or undefined.
 */
export const toFormValue = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) {
    return '';
  }
  return String(value);
};

/**
 * Safely converts a boolean to a string representation for form values.
 */
export const booleanToString = (value: boolean | undefined): 'yes' | 'no' | '' => {
  if (value === undefined) return '';
  return value ? 'yes' : 'no';
};

/**
 * Converts a string representation back to a boolean.
 */
export const stringToBoolean = (value: string | undefined): boolean | undefined => {
  if (value === undefined || value === '') return undefined;
  return value === 'yes';
};

/**
 * Safely converts an array to a serialized string.
 */
export const arrayToString = (array: any[] | undefined): string => {
  if (!array || !Array.isArray(array)) return '';
  return array.join(',');
};

/**
 * Safely converts a serialized string back to an array.
 */
export const stringToArray = (str: string | undefined): string[] => {
  if (!str) return [];
  return str.split(',').filter(Boolean);
};
