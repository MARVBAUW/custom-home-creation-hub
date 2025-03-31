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
 * Ensures image URLs are properly formatted for various path formats
 * @param url The URL to format
 * @returns A properly formatted URL
 */
export const formatImageUrl = (url?: string): string | undefined => {
  if (!url) return undefined;
  
  // Trim the URL to handle whitespace
  url = url.trim();
  
  // If already a fully qualified URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Handle absolute paths that start with /
  if (url.startsWith('/')) {
    // If it's already pointing to the images directory, keep it
    if (url.startsWith('/images/')) {
      return url;
    }
    
    // If it's a schema path but not in images directory
    if (url.includes('/schemas/') || url.includes('schemas/')) {
      return url.replace('/schemas/', '/images/schemas/');
    }
    
    return url;
  }
  
  // Handle relative paths (no leading slash)
  
  // If it's a schema path
  if (url.includes('schemas/')) {
    return `/images/${url}`;
  }
  
  // For other relative paths, add a leading slash
  return `/${url}`;
};

/**
 * Tests if a given URL points to a valid image location in our project structure
 * @param url The URL to test
 * @returns true if the URL appears to point to a valid image location
 */
export const isLikelyValidImagePath = (url?: string): boolean => {
  if (!url) return false;
  
  const formattedUrl = formatImageUrl(url);
  if (!formattedUrl) return false;
  
  // Check common image extensions
  const hasImageExtension = /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(formattedUrl);
  
  // Check if it's in one of our expected image directories
  const inImageDirectory = formattedUrl.includes('/images/') || 
                           formattedUrl.includes('/schemas/') || 
                           formattedUrl.includes('/assets/');
  
  return hasImageExtension || inImageDirectory;
};

/**
 * Generates a fallback image URL for when the primary image fails to load
 * @param schemaId The ID of the schema to generate a fallback for
 * @returns A fallback image URL
 */
export const generateFallbackImageUrl = (schemaId: string): string => {
  // For now just return a generic placeholder, but this could be expanded
  // to generate more specific fallbacks based on schema ID or category
  return '/placeholder.svg';
};

/**
 * Creates an absolute URL from a relative path
 * @param relativePath The relative path to convert
 * @returns An absolute URL
 */
export const toAbsoluteUrl = (relativePath?: string): string | undefined => {
  if (!relativePath) return undefined;
  
  // If already absolute, return as is
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }
  
  // Get the base URL of the current page
  const baseUrl = window.location.origin;
  
  // Ensure relativePath starts with a slash
  const normalizedPath = relativePath.startsWith('/') 
    ? relativePath 
    : `/${relativePath}`;
  
  return `${baseUrl}${normalizedPath}`;
};
