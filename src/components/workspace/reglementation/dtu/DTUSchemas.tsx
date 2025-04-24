
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { DTUSchema } from './types';
import { highlightSearchTerm } from './searchUtils';
import { Image } from 'lucide-react';

interface DTUSchemasProps {
  schemas: DTUSchema[];
  searchTerm?: string;
}

const DTUSchemas: React.FC<DTUSchemasProps> = ({ schemas, searchTerm = '' }) => {
  if (!schemas || schemas.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Schémas et illustrations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemas.map((schema) => (
          <Card key={schema.id} className="overflow-hidden">
            <div className="aspect-video relative bg-gray-100 flex items-center justify-center">
              {schema.imageUrl ? (
                <img 
                  src={schema.imageUrl} 
                  alt={schema.title} 
                  className="object-contain max-h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <Image className="h-12 w-12 mb-2" />
                  <p>Image non disponible</p>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium mb-1">{highlightSearchTerm(schema.title, searchTerm)}</h4>
              <p className="text-sm text-gray-600">{highlightSearchTerm(schema.description, searchTerm)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DTUSchemas;
