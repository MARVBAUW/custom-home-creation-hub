
/**
 * Utility functions for the estimation calculator
 */

/**
 * Format a number as a price in EUR
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(price);
};
