
/**
 * Formate un nombre en devise (EUR)
 * @param amount - Montant à formater
 * @returns Le montant formaté (ex: 1 234,56 €)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Formate une date au format français
 * @param date - Date à formater (string ou Date)
 * @returns La date formatée (ex: 01/01/2022)
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR').format(dateObj);
};

/**
 * Formate une surface en mètres carrés
 * @param surface - Surface à formater
 * @returns La surface formatée (ex: 120 m²)
 */
export const formatSurface = (surface: number | string): string => {
  if (!surface) return '0 m²';
  const surfaceNum = typeof surface === 'string' ? parseFloat(surface) : surface;
  return `${surfaceNum.toLocaleString('fr-FR')} m²`;
};

/**
 * Tronque un texte s'il dépasse une certaine longueur
 * @param text - Texte à tronquer
 * @param maxLength - Longueur maximale
 * @returns Le texte tronqué
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
