
// Utility functions for type conversion

// Convert any value to number, handling strings, nulls, etc.
export const ensureNumber = (value: any): number => {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return value;
  
  // Try to convert from string
  if (typeof value === 'string') {
    // Remove any non-numeric characters except decimal point
    const cleanValue = value.replace(/[^\d.-]/g, '');
    const result = parseFloat(cleanValue);
    return isNaN(result) ? 0 : result;
  }
  
  return 0;
};

// Format a number as currency (Euro)
export const formatCurrency = (value: number | string): string => {
  const numValue = ensureNumber(value);
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numValue);
};

// Convert a value to boolean
export const ensureBoolean = (value: any): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lowercaseValue = value.toLowerCase();
    return lowercaseValue === 'true' || lowercaseValue === 'yes' || lowercaseValue === 'oui' || lowercaseValue === '1';
  }
  return Boolean(value);
};

// Format a date string to a readable format
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

// Convert a form value to a string representation
export const toFormValue = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  
  // If it's an object or array, stringify it
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return '';
    }
  }
  
  return String(value);
};
