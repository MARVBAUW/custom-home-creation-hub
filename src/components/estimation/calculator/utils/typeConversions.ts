
/**
 * Utility functions to ensure consistent type handling
 */

export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (value === undefined || value === null) return defaultValue;
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};

export const ensureBoolean = (value: any, defaultValue: boolean = false): boolean => {
  if (value === undefined || value === null) return defaultValue;
  return Boolean(value);
};

export const ensureString = (value: any, defaultValue: string = ''): string => {
  if (value === undefined || value === null) return defaultValue;
  return String(value);
};

export const percentageToNumber = (percentage: string | number): number => {
  if (typeof percentage === 'string') {
    // Handle "50%" format
    if (percentage.endsWith('%')) {
      return Number(percentage.replace('%', '')) / 100;
    }
    return Number(percentage) / 100;
  }
  return percentage / 100;
};
