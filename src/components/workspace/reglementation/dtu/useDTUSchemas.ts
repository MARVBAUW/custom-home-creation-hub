
import { useState } from 'react';
import { DTUSchema } from './types';
import { toast } from "sonner";
import { preloadImage, formatImageUrl } from './imageUtils';

export const useDTUSchemas = (schemas: DTUSchema[]) => {
  const [selectedSchema, setSelectedSchema] = useState<DTUSchema | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  
  // Function to check if the image URL is valid (not empty and not undefined)
  const isValidImageUrl = (url?: string): boolean => {
    return !!url && url.trim() !== '';
  };

  const handleOpenImage = async (schema: DTUSchema) => {
    // First format the URL if needed
    if (schema.imageUrl) {
      const formattedUrl = formatImageUrl(schema.imageUrl);
      schema = { ...schema, imageUrl: formattedUrl };
    }
    
    // Only open if we have a valid URL and no previous error
    if (isValidImageUrl(schema.imageUrl) && !imageError[schema.id]) {
      // Try to preload the image
      const imageLoaded = await preloadImage(schema.imageUrl);
      
      if (imageLoaded) {
        setSelectedSchema(schema);
        setZoomLevel(1); // Reset zoom level when opening a new image
        console.log(`Opening schema: ${schema.id} with URL: ${schema.imageUrl}`);
      } else {
        handleImageError(schema.id);
      }
    } else {
      console.log(`Schema image unavailable: ${schema.id}`);
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
    handleImageError
  };
};
