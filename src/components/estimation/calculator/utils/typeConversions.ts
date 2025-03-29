
/**
 * Safely parses a value to a number
 * If the value is a string, it attempts to convert it to a number
 * If the value is already a number, it returns it
 * If the value is not a valid number, it returns the fallback value or 0
 */
export const parseToNumber = (value: string | number | undefined | null, fallback: number = 0): number => {
  if (value === undefined || value === null) {
    return fallback;
  }
  
  if (typeof value === 'number') {
    return value;
  }
  
  const parsed = Number(value);
  return isNaN(parsed) ? fallback : parsed;
};

/**
 * Safely retrieves a value as string
 * If the value is undefined or null, it returns an empty string
 * If the value is a number, it converts it to a string
 */
export const asString = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) {
    return '';
  }
  
  return String(value);
};

/**
 * Convert a number or string to string for form inputs
 * This avoids "uncontrolled to controlled" warnings
 */
export const toFormValue = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) {
    return '';
  }
  
  return String(value);
};

/**
 * Ensures a value is of type number for calculations
 */
export const ensureNumber = (value: string | number | undefined | null): number => {
  if (value === undefined || value === null) {
    return 0;
  }
  
  if (typeof value === 'number') {
    return value;
  }
  
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? 0 : parsedValue;
};

/**
 * Safely adds two values that might be strings or numbers
 */
export const safeAdd = (a: string | number | undefined | null, b: string | number | undefined | null): number => {
  return ensureNumber(a) + ensureNumber(b);
};

/**
 * Safely multiplies two values that might be strings or numbers
 */
export const safeMultiply = (a: string | number | undefined | null, b: string | number | undefined | null): number => {
  return ensureNumber(a) * ensureNumber(b);
};

/**
 * Safely converts a string or number to a number for use in calculations
 */
export const toCalculationValue = (value: string | number | undefined | null): number => {
  return ensureNumber(value);
};

/**
 * Safely converts a value to string for API submissions
 */
export const toApiString = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) {
    return '';
  }
  
  return String(value);
};

/**
 * Safely gets a percentage value (0-100) and converts it to a decimal (0-1)
 */
export const percentToDecimal = (value: string | number | undefined | null): number => {
  const num = ensureNumber(value);
  return num > 1 ? num / 100 : num;
};

/**
 * Formats a number as currency (EUR)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Formats a number with thousand separators
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('fr-FR').format(value);
};
