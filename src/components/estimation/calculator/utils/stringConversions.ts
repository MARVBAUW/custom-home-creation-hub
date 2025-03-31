
/**
 * Utility functions for string value conversions
 */

/**
 * Converts a number or boolean to a string representation
 * @param value - Number or boolean to convert
 * @returns String representation
 */
export const convertToString = (value: number | boolean | string | undefined): string => {
  if (value === undefined || value === null) return '';
  
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  
  return String(value);
};

/**
 * Converts a value to a display-friendly string format
 * @param value - Value to format
 * @returns Formatted string
 */
export const formatDisplayValue = (value: any): string => {
  if (value === undefined || value === null) return '-';
  
  if (typeof value === 'number') {
    // Format number with thousands separator
    return value.toLocaleString('fr-FR');
  }
  
  if (typeof value === 'boolean') {
    return value ? 'Oui' : 'Non';
  }
  
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  
  return String(value);
};

/**
 * Format a price for display
 * @param value - Price value
 * @param includeCurrency - Whether to include the currency symbol
 * @returns Formatted price
 */
export const formatPrice = (value: number | string | undefined, includeCurrency: boolean = true): string => {
  if (value === undefined || value === null) return '-';
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return '-';
  
  return includeCurrency
    ? `${numValue.toLocaleString('fr-FR')} €`
    : numValue.toLocaleString('fr-FR');
};

/**
 * Format a percentage for display
 * @param value - Percentage value (0-100)
 * @returns Formatted percentage
 */
export const formatPercentage = (value: number | string | undefined): string => {
  if (value === undefined || value === null) return '-';
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return '-';
  
  return `${numValue}%`;
};

/**
 * Format a surface area for display
 * @param value - Surface area value
 * @returns Formatted surface area
 */
export const formatSurface = (value: number | string | undefined): string => {
  if (value === undefined || value === null) return '-';
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return '-';
  
  return `${numValue.toLocaleString('fr-FR')} m²`;
};

/**
 * Format a length for display
 * @param value - Length value
 * @returns Formatted length
 */
export const formatLength = (value: number | string | undefined): string => {
  if (value === undefined || value === null) return '-';
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return '-';
  
  return `${numValue.toLocaleString('fr-FR')} m`;
};

/**
 * Convert "OUI"/"NON" string to Oui/Non for display
 * @param value - OUI/NON value
 * @returns Oui/Non display value
 */
export const formatOuiNon = (value: string | undefined): string => {
  if (value === undefined || value === null) return '-';
  
  if (value === 'OUI') return 'Oui';
  if (value === 'NON') return 'Non';
  
  return String(value);
};
