
import React, { useState } from 'react';
import { DTUSchema } from './types';
import { Card, CardContent } from "@/components/ui/card";
import { ImageOff, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DTUSchemasProps {
  schemas: DTUSchema[];
}

export const DTUSchemas: React.FC<DTUSchemasProps> = ({ schemas }) => {
  const [selectedSchema, setSelectedSchema] = useState<DTUSchema | null>(null);
  
  if (!schemas || schemas.length === 0) return null;

  const handleOpenImage = (schema: DTUSchema) => {
    if (schema.imageUrl) {
      setSelectedSchema(schema);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Schémas techniques</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemas.map((schema) => (
          <Card key={schema.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <h4 className="font-medium mb-1">{schema.title}</h4>
                {schema.imageUrl ? (
                  <div 
                    className="relative aspect-video bg-gray-100 overflow-hidden mb-2 cursor-pointer group"
                    onClick={() => handleOpenImage(schema)}
                  >
                    <img 
                      src={schema.imageUrl} 
                      alt={schema.title}
                      className="w-full h-full object-contain transition-transform group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <ZoomIn className="text-white h-8 w-8" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center aspect-video bg-gray-100 mb-2">
                    <ImageOff className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <p className="text-sm text-gray-600">{schema.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Image Zoom Dialog */}
      <Dialog 
        open={!!selectedSchema} 
        onOpenChange={(open) => !open && setSelectedSchema(null)}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden">
          {selectedSchema?.imageUrl && (
            <div className="relative w-full h-full max-h-[80vh] bg-black flex items-center justify-center p-1">
              <img 
                src={selectedSchema.imageUrl} 
                alt={selectedSchema.title}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-70 text-white p-2 rounded">
                <h3 className="text-lg font-medium">{selectedSchema.title}</h3>
                <p className="text-sm text-gray-300">{selectedSchema.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
