
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ImageOff, ZoomIn } from 'lucide-react';
import { DTUSchema } from './types';
import { formatImageUrl, isLikelyValidImagePath } from './imageUtils';

interface SchemaCardProps {
  schema: DTUSchema;
  isValidImage: boolean;
  hasError: boolean;
  onOpenImage: (schema: DTUSchema) => void;
}

export const SchemaCard: React.FC<SchemaCardProps> = ({
  schema,
  isValidImage,
  hasError,
  onOpenImage,
}) => {
  // Pre-format the image URL for display
  const displayImageUrl = formatImageUrl(schema.imageUrl);
  
  // Additional validation check before attempting to display the image
  const shouldShowImage = isValidImage && !hasError && isLikelyValidImagePath(displayImageUrl);
  
  return (
    <Card key={schema.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4">
          <h4 className="font-medium mb-1">{schema.title}</h4>
          <div 
            className={`relative aspect-video bg-gray-100 overflow-hidden mb-2 ${shouldShowImage ? 'cursor-pointer group' : ''}`}
            onClick={() => shouldShowImage && onOpenImage(schema)}
          >
            {shouldShowImage ? (
              <>
                <img 
                  src={displayImageUrl} 
                  alt={schema.title}
                  className="w-full h-full object-contain transition-transform group-hover:scale-105"
                  onError={() => onOpenImage(schema)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ZoomIn className="text-white h-8 w-8" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <ImageOff className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Image non disponible</p>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600">{schema.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
