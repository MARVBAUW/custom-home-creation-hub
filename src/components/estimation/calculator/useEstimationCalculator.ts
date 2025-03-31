
import { useState, useCallback } from 'react';
import { FormData } from './types/formTypes';
import { adaptToEstimationResponseData } from './utils/dataAdapter';
import { ensureNumber } from './utils/typeConversions';

export interface EstimationResponseData {
  projectType: string;
  projectDetails: {
    surface: number;
    bedrooms: number;
    bathrooms: number;
    city: string;
    constructionType: string;
    clientType: string;
  };
  estimatedCost: number;
  dateGenerated: string;
  isComplete: boolean;
  constructionCosts: {
    structuralWork: number;
    finishingWork: number;
    technicalLots: number;
    externalWorks: number;
    total: number;
  };
  fees: {
    architect: number;
    engineeringFees: number;
    projectManagement: number;
    permits: number;
    insurance: number;
    contingency: number;
    taxes: number;
    total: number;
  };
  otherCosts: {
    insurance: number;
    contingency: number;
    taxes: number;
    miscellaneous: number;
    total: number;
  };
  totalAmount: number;
  timeline: {
    planning: { duration: string; startOffset: number };
    permits: { duration: string; startOffset: number };
    foundation: { duration: string; startOffset: number };
    structure: { duration: string; startOffset: number };
    envelope: { duration: string; startOffset: number };
    interiors: { duration: string; startOffset: number };
    finishing: { duration: string; startOffset: number };
    total: string;
  };
  categories: Array<{
    name: string;
    amount: number;
  }>;
  
  // For the report 
  totalHT?: number;
  totalTTC?: number;
  vat?: number;
  corpsEtat?: Record<string, { montantHT: number, details: string[] }>;
  honorairesHT?: number;
  coutGlobalHT?: number;
  coutGlobalTTC?: number;
  taxeAmenagement?: number;
  garantieDecennale?: number;
  etudesGeotechniques?: number;
  etudeThermique?: number;
}

export const useEstimationCalculator = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 20;
  const [formData, setFormData] = useState<FormData>({
    surface: 0,
    city: '',
    // Initialize with default values
  });
  const [estimationResult, setEstimationResult] = useState<EstimationResponseData | null>(null);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  const [showResultDialog, setShowResultDialog] = useState(false);

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
      
      return updatedData;
    });
  }, []);

  // Navigate to next step
  const goToNextStep = useCallback(() => {
    setAnimationDirection('forward');
    setStep(prev => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  // Navigate to previous step
  const goToPreviousStep = useCallback(() => {
    setAnimationDirection('backward');
    setStep(prev => Math.max(prev - 1, 0));
  }, []);

  // Go to specific step
  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex > step) {
      setAnimationDirection('forward');
    } else if (stepIndex < step) {
      setAnimationDirection('backward');
    }
    setStep(Math.max(0, Math.min(stepIndex, totalSteps - 1)));
  }, [step, totalSteps]);

  // Generate estimation result
  export function generateEstimationResult(formData: FormData): EstimationResponseData {
    return adaptToEstimationResponseData(formData);
  }

  // Calculate estimation result
  const calculateEstimationResult = useCallback(() => {
    // Generate result based on form data
    const result = generateEstimationResult(formData);
    setEstimationResult(result);
    return result;
  }, [formData]);

  // Finalize estimation
  const finalizeEstimation = useCallback(() => {
    const result = calculateEstimationResult();
    
    // Complete result is already created in generateEstimationResult
    setEstimationResult(result);
    setShowResultDialog(true);
    
    // Move to the results step
    goToNextStep();
    
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
    finalizeEstimation
  };
};
