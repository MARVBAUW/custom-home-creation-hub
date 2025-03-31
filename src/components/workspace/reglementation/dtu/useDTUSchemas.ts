
import { useState } from 'react';
import { DTUSchema } from './types';
import { toast } from "sonner";
import { preloadImage, formatImageUrl, isLikelyValidImagePath, generateFallbackImageUrl } from './imageUtils';

export const useDTUSchemas = (schemas: DTUSchema[]) => {
  const [selectedSchema, setSelectedSchema] = useState<DTUSchema | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  
  // Function to check if the image URL is valid
  const isValidImageUrl = (url?: string): boolean => {
    return !!url && url.trim() !== '' && isLikelyValidImagePath(url);
  };

  const handleOpenImage = async (schema: DTUSchema) => {
    // Create a copy of the schema to avoid mutating the original
    const schemaCopy = { ...schema };
    
    // First format the URL if needed
    if (schemaCopy.imageUrl) {
      const formattedUrl = formatImageUrl(schemaCopy.imageUrl);
      schemaCopy.imageUrl = formattedUrl;
      
      // Add a timestamp parameter to force reload if needed
      // This helps prevent browser cache issues
      if (formattedUrl && !formattedUrl.includes('?')) {
        schemaCopy.imageUrl = `${formattedUrl}?t=${Date.now()}`;
      }
    }
    
    // Only open if we have a valid URL and no previous error
    if (isValidImageUrl(schemaCopy.imageUrl) && !imageError[schemaCopy.id]) {
      try {
        // Try to preload the image
        const imageLoaded = await preloadImage(schemaCopy.imageUrl);
        
        if (imageLoaded) {
          setSelectedSchema(schemaCopy);
          setZoomLevel(1); // Reset zoom level when opening a new image
          console.log(`Opening schema: ${schemaCopy.id} with URL: ${schemaCopy.imageUrl}`);
        } else {
          // If primary image fails, try with a fallback
          const fallbackUrl = generateFallbackImageUrl(schemaCopy.id);
          const fallbackLoaded = await preloadImage(fallbackUrl);
          
          if (fallbackLoaded) {
            schemaCopy.imageUrl = fallbackUrl;
            setSelectedSchema(schemaCopy);
            setZoomLevel(1);
            console.log(`Using fallback image for schema: ${schemaCopy.id}`);
          } else {
            handleImageError(schemaCopy.id);
          }
        }
      } catch (err) {
        console.error('Error opening image:', err);
        handleImageError(schemaCopy.id);
      }
    } else {
      console.log(`Schema image unavailable: ${schemaCopy.id}`);
      toast.error("Image non disponible", {
        description: "L'image de ce schéma n'est pas disponible actuellement."
      });
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3)); // Max zoom 3x
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5)); // Min zoom 0.5x
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

  const handleCloseDialog = () => {
    setSelectedSchema(null);
  };

  const handleImageError = (schemaId: string) => {
    console.error(`Image loading error for schema: ${schemaId}`);
    setImageError(prev => ({
      ...prev,
      [schemaId]: true
    }));
  };

  // Add ability to clear errors for a specific schema
  const clearImageError = (schemaId: string) => {
    setImageError(prev => {
      const newErrors = { ...prev };
      delete newErrors[schemaId];
      return newErrors;
    });
  };

  return {
    selectedSchema,
    zoomLevel,
    imageError,
    isValidImageUrl,
    handleOpenImage,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handleCloseDialog,
    handleImageError,
    clearImageError
  };
};
