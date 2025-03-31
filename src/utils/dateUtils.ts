
/**
 * Format a date to a French locale date string (DD/MM/YYYY)
 */
export const formatDateFrench = (date: Date): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "Date invalide";
  }
  
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Format a date to include time (DD/MM/YYYY HH:MM)
 */
export const formatDateTimeFrench = (date: Date): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "Date invalide";
  }
  
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get a relative time string (e.g., "il y a 2 jours")
 */
export const getRelativeTimeString = (date: Date): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "Date invalide";
  }
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return "à l'instant";
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `il y a ${diffInMonths} mois`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`;
};

/**
 * Check if a date is in the past
 */
export const isDateInPast = (date: Date): boolean => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }
  
  const now = new Date();
  return date.getTime() < now.getTime();
};

/**
 * Check if a date is in the future
 */
export const isDateInFuture = (date: Date): boolean => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }
  
  const now = new Date();
  return date.getTime() > now.getTime();
};

/**
 * Calculate the number of days between two dates
 */
export const daysBetweenDates = (startDate: Date, endDate: Date): number => {
  if (!startDate || !endDate || !(startDate instanceof Date) || !(endDate instanceof Date)) {
    return 0;
  }
  
  // Convert both dates to UTC to avoid timezone issues
  const utcStart = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const utcEnd = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  
  // Calculate the difference in milliseconds and convert to days
  const diffInMilliseconds = utcEnd - utcStart;
  return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
};
