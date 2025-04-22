
import { useState, useEffect } from 'react';
import { FormData, EstimationResponseData } from '../types';
import { calculateEstimationData } from '../calculationUtils';

/**
 * Hook for estimation calculations
 */
export const useEstimationCalculator = (formData: FormData) => {
  const [estimationResult, setEstimationResult] = useState<EstimationResponseData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Trigger calculation when form data changes significantly
  useEffect(() => {
    const requiredFields = ['projectType', 'surface'];
    const hasRequiredFields = requiredFields.every(field => 
      (formData as any)[field] !== undefined && (formData as any)[field] !== null && (formData as any)[field] !== ''
    );

    if (hasRequiredFields) {
      calculateEstimationResult();
    }
  }, [formData.projectType, formData.surface]);

  // Calculate the estimation
  const calculateEstimationResult = () => {
    setIsCalculating(true);
    setError(null);

    try {
      // Use a timeout to simulate calculation time
      setTimeout(() => {
        const result = calculateEstimationData(formData);
        setEstimationResult(result);
        setIsCalculating(false);
      }, 800);
    } catch (err) {
      console.error('Error calculating estimation:', err);
      setError('Une erreur est survenue lors du calcul de l\'estimation.');
      setIsCalculating(false);
    }
  };

  return {
    estimationResult,
    isCalculating,
    error,
    calculateEstimationResult
  };
};
