
import React from 'react';
import { DTUSchema } from './types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Info } from 'lucide-react';

interface DTUSchemasProps {
  schemas: DTUSchema[];
}

export const DTUSchemas: React.FC<DTUSchemasProps> = ({ schemas }) => {
  if (!schemas || schemas.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Info className="h-5 w-5 text-blue-500" />
        Schémas pédagogiques
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemas.map((schema) => (
          <Card key={schema.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{schema.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {schema.imageUrl && (
                <div className="mb-3">
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                    <img 
                      src={schema.imageUrl} 
                      alt={schema.title} 
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
              )}
              <p className="text-sm text-gray-600">{schema.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
