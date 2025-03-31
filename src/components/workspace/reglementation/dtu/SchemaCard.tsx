
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DTUSchema } from './types';
import SchemaZoomDialog from './SchemaZoomDialog';
import { Maximize2 } from 'lucide-react';

interface SchemaCardProps {
  schema: DTUSchema;
}

const SchemaCard: React.FC<SchemaCardProps> = ({ schema }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative overflow-hidden h-48 bg-gray-100">
          <img 
            src={schema.imageUrl} 
            alt={schema.title} 
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/schema-placeholder.png';
            }}
          />
          <Button 
            variant="secondary" 
            size="sm" 
            className="absolute bottom-2 right-2 bg-white/80 hover:bg-white"
            onClick={() => setIsDialogOpen(true)}
          >
            <Maximize2 className="h-4 w-4 mr-1" />
            Agrandir
          </Button>
        </div>
        <CardContent className="p-4">
          <CardTitle className="text-md font-medium mb-1 line-clamp-1">{schema.title}</CardTitle>
          <CardDescription className="line-clamp-2 text-xs">{schema.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            variant="ghost" 
            className="w-full text-sm"
            onClick={() => setIsDialogOpen(true)}
          >
            Voir en détail
          </Button>
        </CardFooter>
      </Card>

      <SchemaZoomDialog 
        schema={schema} 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </>
  );
};

export default SchemaCard;
