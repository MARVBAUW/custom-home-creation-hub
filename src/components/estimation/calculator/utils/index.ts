
// Export utility functions here to be used across the application

/**
 * Format a number as a price in EUR
 * @param price The price to format
 * @returns Formatted price string
 */
export const formatPrice = (price: number | string) => {
  if (typeof price === 'string') {
    price = parseFloat(price);
  }
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(price || 0);
};

/**
 * Format a date string
 * @param dateString The date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};
