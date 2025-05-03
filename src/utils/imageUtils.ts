
/**
 * Utilitaire pour la gestion des images
 */

/**
 * Vérifie si le navigateur supporte le lazy loading natif
 * @returns Boolean indiquant si le lazy loading est supporté
 */
export const isLazyLoadingSupported = (): boolean => {
  return 'loading' in HTMLImageElement.prototype;
};

/**
 * Génère les attributs pour une image avec optimisation
 * @param src URL de l'image
 * @param alt Texte alternatif
 * @param className Classes CSS
 * @param width Largeur (optionnel)
 * @param height Hauteur (optionnel)
 * @param eager Chargement prioritaire (pour les images above the fold)
 * @returns Objet contenant les attributs pour l'image
 */
export const getOptimizedImageProps = (
  src: string,
  alt: string,
  className?: string,
  width?: number,
  height?: number,
  eager?: boolean
): React.ImgHTMLAttributes<HTMLImageElement> => {
  return {
    src,
    alt,
    className,
    width,
    height,
    loading: eager ? 'eager' : 'lazy',
    decoding: eager ? 'sync' : 'async',
    // Conseillé pour les images de contenu importantes
    fetchPriority: eager ? 'high' : 'auto'
  };
};

/**
 * Génère une URL de placeholder pour les images pendant le chargement
 * @param width Largeur
 * @param height Hauteur
 * @param color Couleur de fond (format hexadécimal sans #)
 * @param text Texte à afficher
 * @returns URL du placeholder
 */
export const getPlaceholderImageUrl = (
  width: number = 100,
  height: number = 100,
  color: string = 'EEEEEE',
  text: string = ''
): string => {
  return `https://via.placeholder.com/${width}x${height}/${color}?text=${encodeURIComponent(text)}`;
};

/**
 * Convertit une image en base64 pour préchargement
 * @param url URL de l'image
 * @returns Promise avec l'image en base64
 */
export const getBase64Image = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Erreur lors de la conversion en base64:', error);
    return '';
  }
};
