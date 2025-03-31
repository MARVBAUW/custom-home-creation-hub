
/**
 * Format a date in French format (DD/MM/YYYY)
 */
export const formatDateFrench = (date: string | Date): string => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObject.getTime())) {
    console.error('Invalid date provided to formatDateFrench:', date);
    return 'Date invalide';
  }
  
  // Format using French locale
  return dateObject.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Format a date in a human-readable format (e.g., "15 janvier 2023")
 */
export const formatDateHuman = (date: string | Date): string => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObject.getTime())) {
    console.error('Invalid date provided to formatDateHuman:', date);
    return 'Date invalide';
  }
  
  // Format using French locale with month name
  return dateObject.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Format a date and time (DD/MM/YYYY HH:MM)
 */
export const formatDateTime = (date: string | Date): string => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObject.getTime())) {
    console.error('Invalid date provided to formatDateTime:', date);
    return 'Date invalide';
  }
  
  // Format date and time
  const dateStr = dateObject.toLocaleDateString('fr-FR');
  const timeStr = dateObject.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return `${dateStr} ${timeStr}`;
};
