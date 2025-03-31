
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DTUSchema } from './types';
import { Maximize2 } from 'lucide-react';
import { highlightSearchTerm } from './searchUtils';

interface SchemaCardProps {
  schema: DTUSchema;
  searchTerm?: string;
  onClick: () => void;
}

const SchemaCard: React.FC<SchemaCardProps> = ({ schema, searchTerm = '', onClick }) => {
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative">
          <AspectRatio ratio={4/3} className="bg-gray-100 border-b">
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={schema.imageUrl} 
                alt={schema.title}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Maximize2 className="h-8 w-8 text-white bg-black/50 p-1.5 rounded-full" />
              </div>
            </div>
          </AspectRatio>
        </div>
        <div className="p-4">
          <h4 className="font-medium mb-1">
            {highlightSearchTerm(schema.title, searchTerm)}
          </h4>
          <p className="text-sm text-gray-600">
            {highlightSearchTerm(schema.description, searchTerm)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchemaCard;
