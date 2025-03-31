
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { DTUSchema } from './types';
import SchemaCard from './SchemaCard';
import SchemaZoomDialog from './SchemaZoomDialog';
import { highlightSearchTerm } from './searchUtils';

interface DTUSchemasProps {
  schemas: DTUSchema[];
  searchTerm?: string;
}

const DTUSchemas: React.FC<DTUSchemasProps> = ({ schemas, searchTerm = '' }) => {
  const [selectedSchema, setSelectedSchema] = useState<DTUSchema | null>(null);
  const [zoomDialogOpen, setZoomDialogOpen] = useState(false);

  const handleSchemaClick = (schema: DTUSchema) => {
    setSelectedSchema(schema);
    setZoomDialogOpen(true);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Schémas techniques</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemas.map((schema) => (
          <SchemaCard 
            key={schema.id}
            schema={schema}
            searchTerm={searchTerm}
            onClick={() => handleSchemaClick(schema)}
          />
        ))}
      </div>
      
      <SchemaZoomDialog
        schema={selectedSchema}
        isOpen={zoomDialogOpen}
        onOpenChange={setZoomDialogOpen}
      />
    </div>
  );
};

export default DTUSchemas;
