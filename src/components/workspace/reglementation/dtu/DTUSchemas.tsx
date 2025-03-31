
import React from 'react';
import { DTUSchema } from './types';
import { SchemaCard } from './SchemaCard';
import { SchemaZoomDialog } from './SchemaZoomDialog';
import { useDTUSchemas } from './useDTUSchemas';

interface DTUSchemasProps {
  schemas: DTUSchema[];
}

export const DTUSchemas: React.FC<DTUSchemasProps> = ({ schemas }) => {
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
  
  if (!schemas || schemas.length === 0) return null;

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
