
/**
 * Format a date to a French locale date string (DD/MM/YYYY)
 */
export const formatDateFrench = (date: string | Date): string => {
  if (!date) {
    return "Date invalide";
  }
  
  let dateObject: Date;
  
  if (typeof date === 'string') {
    dateObject = new Date(date);
  } else {
    dateObject = date;
  }
  
  if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
    return "Date invalide";
  }
  
  return dateObject.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Format a date to include time (DD/MM/YYYY HH:MM)
 */
export const formatDateTimeFrench = (date: string | Date): string => {
  if (!date) {
    return "Date invalide";
  }
  
  let dateObject: Date;
  
  if (typeof date === 'string') {
    dateObject = new Date(date);
  } else {
    dateObject = date;
  }
  
  if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
    return "Date invalide";
  }
  
  return dateObject.toLocaleDateString('fr-FR', {
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
export const getRelativeTimeString = (date: string | Date): string => {
  if (!date) {
    return "Date invalide";
  }
  
  let dateObject: Date;
  
  if (typeof date === 'string') {
    dateObject = new Date(date);
  } else {
    dateObject = date;
  }
  
  if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
    return "Date invalide";
  }
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObject.getTime()) / 1000);
  
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
export const isDateInPast = (date: string | Date): boolean => {
  if (!date) {
    return false;
  }
  
  let dateObject: Date;
  
  if (typeof date === 'string') {
    dateObject = new Date(date);
  } else {
    dateObject = date;
  }
  
  if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
    return false;
  }
  
  const now = new Date();
  return dateObject.getTime() < now.getTime();
};

/**
 * Check if a date is in the future
 */
export const isDateInFuture = (date: string | Date): boolean => {
  if (!date) {
    return false;
  }
  
  let dateObject: Date;
  
  if (typeof date === 'string') {
    dateObject = new Date(date);
  } else {
    dateObject = date;
  }
  
  if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
    return false;
  }
  
  const now = new Date();
  return dateObject.getTime() > now.getTime();
};

/**
 * Calculate the number of days between two dates
 */
export const daysBetweenDates = (startDate: string | Date, endDate: string | Date): number => {
  if (!startDate || !endDate) {
    return 0;
  }
  
  let startDateObject: Date;
  let endDateObject: Date;
  
  if (typeof startDate === 'string') {
    startDateObject = new Date(startDate);
  } else {
    startDateObject = startDate;
  }
  
  if (typeof endDate === 'string') {
    endDateObject = new Date(endDate);
  } else {
    endDateObject = endDate;
  }
  
  if (!(startDateObject instanceof Date) || !(endDateObject instanceof Date) || 
      isNaN(startDateObject.getTime()) || isNaN(endDateObject.getTime())) {
    return 0;
  }
  
  // Convert both dates to UTC to avoid timezone issues
  const utcStart = Date.UTC(startDateObject.getFullYear(), startDateObject.getMonth(), startDateObject.getDate());
  const utcEnd = Date.UTC(endDateObject.getFullYear(), endDateObject.getMonth(), endDateObject.getDate());
  
  // Calculate the difference in milliseconds and convert to days
  const diffInMilliseconds = utcEnd - utcStart;
  return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
};
