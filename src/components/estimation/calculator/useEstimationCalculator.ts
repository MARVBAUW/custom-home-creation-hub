
import { useState, useCallback, useEffect } from 'react';
import { EstimationFormData, FormData } from './types/formTypes';
import { adaptToEstimationResponseData } from './utils/dataAdapter';
import { ensureNumber } from './utils/typeConversions';
import { EstimationResponseData } from './types/estimationTypes';
import { determineNextStep, determinePreviousStep } from './utils/navigationPathUtils';

// Move the function outside the hook
export function generateEstimationResult(formData: EstimationFormData | FormData): EstimationResponseData {
  return adaptToEstimationResponseData(formData);
}

export const useEstimationCalculator = () => {
  // State management for steps and form data
  const [step, setStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(20);
  const [formData, setFormData] = useState<EstimationFormData | FormData>({
    surface: 0,
    city: '',
    // Initialize with default values
  });
  const [estimationResult, setEstimationResult] = useState<EstimationResponseData | null>(null);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate total steps based on project type and estimation type
  useEffect(() => {
    let stepsCount = 20; // Default number of steps
    
    // Adjust based on client type
    if (formData.clientType === 'professional') {
      stepsCount = 20; // Professional has specific steps
    } else if (formData.clientType === 'individual') {
      stepsCount = 19; // Individual has different steps
    }
    
    // Adjust based on project type
    if (formData.projectType === 'renovation' || formData.projectType === 'division') {
      stepsCount += 9; // Additional steps for renovation/division
    } else if (formData.projectType === 'construction' || formData.projectType === 'extension') {
      stepsCount += 7; // Additional steps for construction/extension
    }
    
    // Adjust based on options selected
    if (formData.includeEcoSolutions) stepsCount += 1;
    if (formData.includeRenewableEnergy) stepsCount += 1;
    if (formData.includeLandscaping) stepsCount += 1;
    if (formData.includeOptions) stepsCount += 1;
    if (formData.includeCuisine) stepsCount += 1;
    if (formData.includeBathroom) stepsCount += 1;
    
    // Set the calculated total steps
    setTotalSteps(stepsCount);
  }, [formData]);

  // Update form data with partial data
  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData(prev => {
      // Ensure data types are properly converted
      const updatedData = { ...prev, ...data };
      
      // Convert specific fields to number as needed
      if (data.surface !== undefined) {
        updatedData.surface = ensureNumber(data.surface);
      }
      if (data.bedrooms !== undefined) {
        updatedData.bedrooms = ensureNumber(data.bedrooms);
      }
      if (data.bathrooms !== undefined) {
        updatedData.bathrooms = ensureNumber(data.bathrooms);
      }
      if (data.budget !== undefined) {
        updatedData.budget = ensureNumber(data.budget);
      }
      if (data.montantT !== undefined) {
        updatedData.montantT = ensureNumber(data.montantT);
      }
      
      // Handle percentages to ensure they don't exceed 100%
      const percentageFields = [
        'floorTilePercentage',
        'wallTilePercentage',
        'basicPaintPercentage',
        'decorativePaintPercentage',
        'wallpaperPercentage'
      ];
      
      let totalPercentage = 0;
      percentageFields.forEach(field => {
        if (updatedData[field]) {
          totalPercentage += ensureNumber(updatedData[field]);
        }
      });
      
      // Warn if percentages exceed 100%
      if (totalPercentage > 100) {
        console.warn('Total percentage exceeds 100%', totalPercentage);
      }
      
      return updatedData;
    });
  }, []);

  // Navigate to next step with conditional logic
  const goToNextStep = useCallback(() => {
    setAnimationDirection('forward');
    setIsSubmitting(true);
    
    // Use our navigation utility to determine the next step based on form data
    const nextStep = determineNextStep(step, formData);
    
    setTimeout(() => {
      setStep(nextStep);
      setIsSubmitting(false);
    }, 300);
  }, [step, formData]);

  // Navigate to previous step with conditional logic
  const goToPreviousStep = useCallback(() => {
    setAnimationDirection('backward');
    
    // Use our navigation utility to determine the previous step based on form data
    const previousStep = determinePreviousStep(step, formData);
    
    setTimeout(() => {
      setStep(previousStep);
    }, 300);
  }, [step, formData]);

  // Go to specific step
  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex > step) {
      setAnimationDirection('forward');
    } else if (stepIndex < step) {
      setAnimationDirection('backward');
    }
    setStep(Math.max(0, Math.min(stepIndex, totalSteps - 1)));
  }, [step, totalSteps]);

  // Calculate estimation result
  const calculateEstimationResult = useCallback(() => {
    // We need to recalculate the Montant T€ based on all selections
    // This will be implemented in detail later
    const result = generateEstimationResult(formData);
    setEstimationResult(result);
    return result;
  }, [formData]);

  // Finalize estimation
  const finalizeEstimation = useCallback(() => {
    setIsSubmitting(true);
    
    // Generate final estimation result
    const result = calculateEstimationResult();
    
    // Complete result is already created in generateEstimationResult
    setEstimationResult(result);
    setShowResultDialog(true);
    
    // Move to the results step
    goToNextStep();
    
    setIsSubmitting(false);
    
    return result;
  }, [calculateEstimationResult, goToNextStep]);

  return {
    step,
    setStep,
    totalSteps,
    formData,
    estimationResult,
    animationDirection,
    showResultDialog,
    setShowResultDialog,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    calculateEstimationResult,
    finalizeEstimation,
    isSubmitting
  };
};
