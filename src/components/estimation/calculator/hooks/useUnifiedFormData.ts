
/**
 * Hook for managing form data with automatic type conversion between different formats
 */
import { useCallback } from 'react';
import { FormData, EstimationFormData } from '../types/formTypes';
import { EstimationResponseData } from '../types/estimationTypes';
import { adaptToEstimationData } from '../utils/dataAdapter';

interface UseUnifiedFormDataProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export const useUnifiedFormData = ({ 
  formData, 
  updateFormData 
}: UseUnifiedFormDataProps) => {
  
  /**
   * Update function that ensures data is in the correct format
   */
  const updateUnifiedFormData = useCallback((data: Partial<FormData>) => {
    updateFormData(data);
  }, [updateFormData]);
  
  /**
   * Get the form data in FormData format
   */
  const getFormData = useCallback((): FormData => {
    return formData as FormData;
  }, [formData]);
  
  /**
   * Get the form data in EstimationFormData format
   */
  const getEstimationFormData = useCallback((): EstimationFormData => {
    return formData as EstimationFormData;
  }, [formData]);
  
  return {
    formData, // Original data
    updateFormData: updateUnifiedFormData, // Type-safe update function
    getFormData, // Get data in FormData format
    getEstimationFormData // Get data in EstimationFormData format
  };
};
