
import { useState, useEffect } from 'react';
import { DTUSchema } from './types';

export const useDTUSchemas = (schemas: DTUSchema[] | undefined, searchTerm: string = '') => {
  const [filteredSchemas, setFilteredSchemas] = useState<DTUSchema[]>([]);
  
  useEffect(() => {
    if (!schemas || schemas.length === 0) {
      setFilteredSchemas([]);
      return;
    }
    
    if (!searchTerm) {
      setFilteredSchemas(schemas);
      return;
    }
    
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    
    const filtered = schemas.filter(schema => 
      schema.title.toLowerCase().includes(lowercaseSearchTerm) ||
      schema.description.toLowerCase().includes(lowercaseSearchTerm)
    );
    
    setFilteredSchemas(filtered);
  }, [schemas, searchTerm]);
  
  return filteredSchemas;
};

export default useDTUSchemas;
