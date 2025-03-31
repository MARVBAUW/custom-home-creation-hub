
import { useState, useEffect } from 'react';
import { FormData, EstimationResponseData } from './types';
import { determineNextStep, determinePreviousStep, recalculateEstimation } from './utils/navigationPathUtils';
import { calculateEstimation } from './calculationUtils';
import { toast } from '@/hooks/use-toast';

export const useEstimationCalculator = () => {
  const [step, setStep] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(20); // Default number of steps
  const [formData, setFormData] = useState<FormData>({});
  const [estimationResult, setEstimationResult] = useState<EstimationResponseData | null>(null);
  const [showResultDialog, setShowResultDialog] = useState<boolean>(false);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Function to update form data
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...data
    }));
    
    console.log("Form data updated:", data);
  };
  
  // Calculate the estimation result
  const calculateEstimationResult = () => {
    try {
      setIsSubmitting(true);
      
      // Calculate the estimation based on the form data
      const result = calculateEstimation(formData);
      
      // Update the estimation result
      setEstimationResult(result);
      
      // Show the result dialog
      setShowResultDialog(true);
      
      toast({
        title: "Estimation calculée",
        description: `Total estimé : ${result.totalAmount.toLocaleString()} €`,
      });
      
      return result;
    } catch (error) {
      console.error("Error calculating estimation:", error);
      
      toast({
        title: "Erreur de calcul",
        description: "Une erreur est survenue lors du calcul de l'estimation.",
        variant: "destructive",
      });
      
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Finalize the estimation process
  const finalizeEstimation = () => {
    // Only calculate if no result exists yet
    if (!estimationResult) {
      return calculateEstimationResult();
    }
    return estimationResult;
  };
  
  // Function to go to the next step
  const goToNextStep = () => {
    const nextStep = determineNextStep(step, formData);
    setAnimationDirection('forward');
    
    // Delay to allow animation
    setTimeout(() => {
      setStep(nextStep);
    }, 200);
  };
  
  // Function to go to the previous step
  const goToPreviousStep = () => {
    const prevStep = determinePreviousStep(step, formData);
    setAnimationDirection('backward');
    
    // Delay to allow animation
    setTimeout(() => {
      setStep(prevStep);
    }, 200);
  };
  
  // Update the total steps when the form data changes
  useEffect(() => {
    // Recalculate the total number of steps based on the form data
    let newTotalSteps = 20; // Base number of steps
    
    // Adjust total steps based on client type
    if (formData.clientType === 'professional') {
      newTotalSteps = 3; // Professional flow is shorter
    }
    
    // Adjust total steps based on project type
    if (formData.projectType === 'optimisation' || formData.projectType === 'design') {
      newTotalSteps = 3; // Direct contact flow
    } else if (formData.estimationType === 'Rapide 5 mins (Précision à + ou - 10%)') {
      newTotalSteps = 8; // Quick estimation flow
    } else if (formData.projectType === 'renovation' || formData.projectType === 'division') {
      newTotalSteps = 48; // Renovation has additional steps
    }
    
    setTotalSteps(newTotalSteps);
  }, [formData.clientType, formData.projectType, formData.estimationType]);
  
  return {
    step,
    setStep,
    totalSteps,
    formData,
    estimationResult,
    showResultDialog,
    animationDirection,
    isSubmitting,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    calculateEstimationResult,
    finalizeEstimation
  };
};
