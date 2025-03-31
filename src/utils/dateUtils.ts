
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Formate une date en français
 * @param date Date à formater
 * @param formatStr Format à utiliser (par défaut 'd MMMM yyyy')
 * @returns Date formatée en français
 */
export const formatDateFrench = (date: Date | string, formatStr = 'd MMMM yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr, { locale: fr });
};
