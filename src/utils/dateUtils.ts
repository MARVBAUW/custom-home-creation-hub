
/**
 * Returns a formatted date in French
 * @param date Date object or ISO string
 * @returns Formatted date in French (e.g., "28 janvier 2025")
 */
export const formatDateFrench = (date: Date | string = new Date()): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // French month names
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];
  
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};
