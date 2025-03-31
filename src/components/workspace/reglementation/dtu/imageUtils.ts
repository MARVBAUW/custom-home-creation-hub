
/**
 * Utility functions for handling images in DTU schemas
 */

/**
 * Preloads an image to check if it can be loaded successfully
 * @param url The URL of the image to preload
 * @returns A promise that resolves to true if the image loads successfully, false otherwise
 */
export const preloadImage = (url?: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!url || url.trim() === '') {
      resolve(false);
      return;
    }
    
    const img = new Image();
    
    img.onload = () => {
      resolve(true);
    };
    
    img.onerror = () => {
      console.warn(`Failed to load image: ${url}`);
      resolve(false);
    };
    
    img.src = url;
  });
};

/**
 * Ensures image URLs are properly formatted
 * @param url The URL to format
 * @returns A properly formatted URL
 */
export const formatImageUrl = (url?: string): string | undefined => {
  if (!url) return undefined;
  
  // If the URL doesn't start with http/https or /, assume it's a relative URL
  if (!url.startsWith('http') && !url.startsWith('/')) {
    return `/${url}`;
  }
  
  // Handle schema images consistently
  if (url.includes('schemas/') && !url.startsWith('/images/')) {
    if (url.startsWith('/schemas/')) {
      return `/images${url}`;
    } else if (url.startsWith('schemas/')) {
      return `/images/${url}`;
    }
  }
  
  return url;
};
