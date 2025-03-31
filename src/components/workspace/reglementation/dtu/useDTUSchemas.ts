
import { useState } from 'react';
import { DTUSchema } from './types';

export const useDTUSchemas = (schemas: DTUSchema[] = []) => {
  const [selectedSchema, setSelectedSchema] = useState<DTUSchema | null>(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const openSchema = (schema: DTUSchema) => {
    setSelectedSchema(schema);
    setIsZoomOpen(true);
  };

  const closeZoom = () => {
    setIsZoomOpen(false);
  };

  return {
    schemas,
    selectedSchema,
    isZoomOpen,
    openSchema,
    closeZoom
  };
};

export default useDTUSchemas;
