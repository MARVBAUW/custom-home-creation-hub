
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DTUSchema } from './types';
import SchemaCard from './SchemaCard';

interface DTUSchemasProps {
  schemas: DTUSchema[];
  searchTerm?: string;
}

const DTUSchemas: React.FC<DTUSchemasProps> = ({ schemas, searchTerm = '' }) => {
  if (!schemas || schemas.length === 0) {
    return null;
  }

  // Filter schemas based on search term if provided
  const filteredSchemas = searchTerm 
    ? schemas.filter(schema => 
        schema.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        schema.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : schemas;

  if (filteredSchemas.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Aucun schéma trouvé pour "{searchTerm}"</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-xl mb-4">Schémas techniques</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredSchemas.map(schema => (
          <SchemaCard key={schema.id} schema={schema} />
        ))}
      </div>
    </div>
  );
};

export default DTUSchemas;
