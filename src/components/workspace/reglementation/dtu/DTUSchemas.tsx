
import React from 'react';
import { DTUSchema } from './types';
import { Card, CardContent } from "@/components/ui/card";
import { ImageOff } from 'lucide-react';

interface DTUSchemasProps {
  schemas: DTUSchema[];
}

export const DTUSchemas: React.FC<DTUSchemasProps> = ({ schemas }) => {
  if (!schemas || schemas.length === 0) return null;

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
                  <div className="relative aspect-video bg-gray-100 overflow-hidden mb-2">
                    <img 
                      src={schema.imageUrl} 
                      alt={schema.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/placeholder-image.jpg';
                      }}
                    />
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
    </div>
  );
};
