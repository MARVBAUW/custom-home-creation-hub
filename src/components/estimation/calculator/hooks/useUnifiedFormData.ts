
/**
 * Hook for managing form data with automatic type conversion between different formats
 */
import { useCallback } from 'react';
import { FormData, EstimationFormData } from '../types';
import { adaptToEstimationData } from '../utils/dataAdapter';

interface UseUnifiedFormDataProps {
  formData: FormData | EstimationFormData;
  updateFormData: (data: Partial<FormData> | Partial<EstimationFormData>) => void;
}

export const useUnifiedFormData = ({ 
  formData, 
  updateFormData 
}: UseUnifiedFormDataProps) => {
  
  /**
   * Update function that ensures data is in the correct format
   */
  const updateUnifiedFormData = useCallback((data: Partial<FormData> | Partial<EstimationFormData>) => {
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
