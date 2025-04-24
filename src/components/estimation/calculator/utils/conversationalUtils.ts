
import { EstimationFormData, FormData } from '../types/formTypes';
import { ensureNumber } from './typeConversions';

/**
 * Extracts surface information from a message
 * @param message The message to extract from
 * @returns The extracted surface value or null
 */
export const extractSurface = (message: string): number | null => {
  const regex = /(\d+)[^\d]*m(?:ètre)?(?:s)? ?(?:carré)?(?:s)?/i;
  const match = message.match(regex);
  
  return match ? parseInt(match[1], 10) : null;
};

/**
 * Extracts location information from a message
 * @param message The message to extract from
 * @returns The extracted location or null
 */
export const extractLocation = (message: string): string | null => {
  const cities = [
    'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 
    'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes'
  ];
  
  for (const city of cities) {
    if (message.toLowerCase().includes(city.toLowerCase())) {
      return city;
    }
  }
  
  return null;
};

/**
 * Extracts project type from a message
 * @param message The message to extract from
 * @returns The extracted project type or null
 */
export const extractProjectType = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('rénovation') || lowerMessage.includes('renovation')) {
    return 'renovation';
  } else if (lowerMessage.includes('construction') || lowerMessage.includes('neuf')) {
    return 'construction';
  } else if (lowerMessage.includes('extension')) {
    return 'extension';
  }
  
  return null;
};

/**
 * Calculates an initial estimate based on form data
 * @param formData The form data to use for calculation
 * @returns The calculated estimate
 */
export const calculateInitialEstimate = (formData: FormData): number => {
  const surface = ensureNumber(formData.surface);
  const baseRate = formData.constructionType === 'neuf' ? 1500 : 1200;
  
  return surface * baseRate;
};

/**
 * Formats a number as currency
 * @param value The value to format
 * @returns Formatted string
 */
export const formatCurrency = (value: number | string): string => {
  const numValue = ensureNumber(value);
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    maximumFractionDigits: 0 
  }).format(numValue);
};
