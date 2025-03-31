
/**
 * Format a number as a currency string
 * @param value The value to format
 * @param locale The locale to use for formatting (default: fr-FR)
 * @param currency The currency to use (default: EUR)
 * @returns The formatted currency string
 */
export const formatCurrency = (value: number | string): string => {
  // Ensure we're working with a number
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Handle invalid values
  if (isNaN(numValue)) {
    return '0,00 €';
  }
  
  // Format with French locale and Euro currency
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numValue);
};

/**
 * Format a number with thousands separators
 * @param value The value to format
 * @param locale The locale to use for formatting (default: fr-FR)
 * @returns The formatted number string
 */
export const formatNumber = (value: number | string): string => {
  // Ensure we're working with a number
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Handle invalid values
  if (isNaN(numValue)) {
    return '0';
  }
  
  // Format with French locale
  return new Intl.NumberFormat('fr-FR').format(numValue);
};

/**
 * Format a date string
 * @param date The date to format
 * @param locale The locale to use for formatting (default: fr-FR)
 * @returns The formatted date string
 */
export const formatDate = (date: Date | string): string => {
  // Ensure we're working with a Date object
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Handle invalid dates
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  // Format with French locale
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(dateObj);
};
