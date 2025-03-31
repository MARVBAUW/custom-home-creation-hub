
import React from 'react';
import { DTUSchema } from './types';
import { SchemaCard } from './SchemaCard';
import { SchemaZoomDialog } from './SchemaZoomDialog';
import { useDTUSchemas } from './useDTUSchemas';
import { DTUEmptyState } from './DTUEmptyState';

interface DTUSchemasProps {
  schemas: DTUSchema[];
  isLoading?: boolean;
  error?: Error | null;
}

export const DTUSchemas: React.FC<DTUSchemasProps> = ({ 
  schemas, 
  isLoading = false,
  error = null
}) => {
  const {
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
  } = useDTUSchemas(schemas);
  
  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <DTUEmptyState 
        type="error" 
        message="Erreur de chargement des schémas" 
        description={error.message} 
      />
    );
  }

  // Handle empty state
  if (!schemas || schemas.length === 0) {
    return (
      <DTUEmptyState 
        type="empty" 
        message="Aucun schéma technique disponible" 
        description="Les schémas techniques pour cette section n'ont pas encore été ajoutés." 
      />
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Schémas techniques</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemas.map((schema) => (
          <SchemaCard
            key={schema.id}
            schema={schema}
            isValidImage={isValidImageUrl(schema.imageUrl)}
            hasError={!!imageError[schema.id]}
            onOpenImage={handleOpenImage}
          />
        ))}
      </div>
      
      {/* Image Zoom Dialog */}
      <SchemaZoomDialog
        selectedSchema={selectedSchema}
        isOpen={!!selectedSchema}
        onClose={handleCloseDialog}
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
        onImageError={handleImageError}
      />
    </div>
  );
};
