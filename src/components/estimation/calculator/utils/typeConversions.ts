
/**
 * Ensures a value is a number
 * @param value The value to convert to number
 * @param defaultValue Default value if conversion fails
 * @returns A number
 */
export function ensureNumber(value: any, defaultValue: number = 0): number {
  if (value === undefined || value === null) return defaultValue;
  
  const parsed = typeof value === 'string' ? parseFloat(value) : Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Ensures a value is a boolean
 * @param value The value to convert to boolean
 * @param defaultValue Default value if value is undefined or null
 * @returns A boolean
 */
export function ensureBoolean(value: any, defaultValue: boolean = false): boolean {
  if (value === undefined || value === null) return defaultValue;
  
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1' || value === 'yes';
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  
  return Boolean(value);
}

/**
 * Ensures a value is a string
 * @param value The value to convert to string
 * @param defaultValue Default value if value is undefined or null
 * @returns A string
 */
export function ensureString(value: any, defaultValue: string = ''): string {
  if (value === undefined || value === null) return defaultValue;
  
  return String(value);
}

/**
 * Validates an email address
 * @param email The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number
 * @param phone The phone number to validate
 * @returns True if the phone number is valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

/**
 * Validates if total percentages add up to 100
 * @param percentages Array of percentage values
 * @returns True if percentages add up to 100, false otherwise
 */
export function validatePercentageTotal(percentages: number[]): boolean {
  const total = percentages.reduce((sum, percentage) => sum + percentage, 0);
  return Math.abs(total - 100) < 0.01; // Allow small floating point errors
}

/**
 * Format a number as currency
 * @param value The number to format
 * @param locale The locale to use (default: 'fr-FR')
 * @param currency The currency code (default: 'EUR')
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, locale: string = 'fr-FR', currency: string = 'EUR'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
