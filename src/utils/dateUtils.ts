
/**
 * Format a date to a French-style date string
 * @param date Date object or ISO string to format
 * @returns Formatted date string in French format
 */
export const formatDateFrench = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(dateObj);
};

/**
 * Format a date to include time in a French-style date string
 * @param date Date object or ISO string to format
 * @returns Formatted date and time string in French format
 */
export const formatDateTimeFrench = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
};

/**
 * Calculate the difference in days between two dates
 * @param startDate Start date
 * @param endDate End date
 * @returns Number of days between the dates
 */
export const daysBetween = (startDate: Date | string, endDate: Date | string): number => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  // Calculate the time difference in milliseconds
  const timeDifference = end.getTime() - start.getTime();
  
  // Convert to days
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
};

/**
 * Check if a date is in the past
 * @param date Date to check
 * @returns Boolean indicating if the date is in the past
 */
export const isDatePast = (date: Date | string): boolean => {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  // Set hours, minutes, seconds, and milliseconds to 0 for comparing just the date
  today.setHours(0, 0, 0, 0);
  checkDate.setHours(0, 0, 0, 0);
  
  return checkDate < today;
};

/**
 * Check if a date is today
 * @param date Date to check
 * @returns Boolean indicating if the date is today
 */
export const isDateToday = (date: Date | string): boolean => {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};
