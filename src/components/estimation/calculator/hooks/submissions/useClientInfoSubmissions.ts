
import { useState } from 'react';
import { FormData } from '../../types';
import { z } from 'zod';

// Define validation schema
const ClientTypeSchema = z.object({
  clientType: z.enum(['individual', 'professional'], {
    required_error: "Le type de client est requis",
  }),
});

export const useClientInfoSubmissions = () => {
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  
  // Handle client type submission
  const handleClientTypeSubmit = (data: { clientType: string }) => {
    try {
      // Validate the data
      const validatedData = ClientTypeSchema.parse(data);
      setValidationErrors([]);
      
      // Return the validated data
      return {
        clientType: validatedData.clientType
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.errors);
      }
      return null;
    }
  };
  
  // Handle professional project submission
  const handleProfessionalProjectSubmit = (data: any) => {
    try {
      // No need for validation here as it's handled by the form
      setValidationErrors([]);
      
      return {
        activity: data.activity,
        projectType: data.projectType,
        startDate: data.startDate,
        endDate: data.endDate
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.errors);
      }
      return null;
    }
  };
  
  // Handle individual project submission
  const handleIndividualProjectSubmit = (data: { projectType: string }) => {
    try {
      // No need for validation here as it's handled by the form
      setValidationErrors([]);
      
      return {
        projectType: data.projectType
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.errors);
      }
      return null;
    }
  };
  
  // Handle construction details submission
  const handleConstructionDetailsSubmit = (data: any) => {
    try {
      // No need for validation here as it's handled by the form
      setValidationErrors([]);
      
      return {
        surface: data.surface,
        levels: data.levels,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        // Only include this property if it exists in the FormData interface
        // This is a safe way to handle it without causing type errors
        ...(data.units !== undefined && {
          units: data.units
        })
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.errors);
      }
      return null;
    }
  };
  
  // Handle terrain submission
  const handleTerrainSubmit = (data: any) => {
    try {
      // No need for validation here as it's handled by the form
      setValidationErrors([]);
      
      return {
        terrainType: data.terrainType,
        terrainSurface: data.terrainSurface,
        // Include these fields only if they are in the FormData interface
        ...(data.demolitionType !== undefined && {
          demolitionType: data.demolitionType
        }),
        ...(data.existingSurface !== undefined && {
          existingSurface: data.existingSurface
        })
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.errors);
      }
      return null;
    }
  };
  
  // Handle gros oeuvre submission
  const handleGrosOeuvreSubmit = (data: any) => {
    try {
      // No need for validation here as it's handled by the form
      setValidationErrors([]);
      
      return {
        ...(data.wallType !== undefined && {
          wallType: data.wallType
        }),
        ...(data.foundationType !== undefined && {
          foundationType: data.foundationType
        })
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.errors);
      }
      return null;
    }
  };
  
  // Handle charpente submission
  const handleCharpenteSubmit = (data: any) => {
    try {
      // No need for validation here as it's handled by the form
      setValidationErrors([]);
      
      return {
        roofType: data.roofType
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.errors);
      }
      return null;
    }
  };
  
  // Handle combles submission
  const handleComblesSubmit = (data: any) => {
    try {
      // No need for validation here as it's handled by the form
      setValidationErrors([]);
      
      return {
        ...(data.atticType !== undefined && {
          atticType: data.atticType
        })
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.errors);
      }
      return null;
    }
  };
  
  return {
    validationErrors,
    handleClientTypeSubmit,
    handleProfessionalProjectSubmit,
    handleIndividualProjectSubmit,
    handleConstructionDetailsSubmit,
    handleTerrainSubmit,
    handleGrosOeuvreSubmit,
    handleCharpenteSubmit,
    handleComblesSubmit
  };
};
