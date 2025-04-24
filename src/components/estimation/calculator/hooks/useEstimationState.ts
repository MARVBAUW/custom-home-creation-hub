
import { useState, useCallback, useEffect } from 'react';
import { FormData, EstimationState } from '../types/formTypes';
import { useToast } from '@/hooks/use-toast';
import { calculateEstimationAmount, determineNextStep, determinePreviousStep, validateStep } from '../utils/navigationPathUtils';
import { adaptToEstimationResponseData } from '../utils/dataAdapter';
import { useLocalStorage } from '@/hooks/use-local-storage';

export const useEstimationState = (): {
  state: EstimationState;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  finalizeEstimation: () => any;
  resetForm: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
} => {
  // Use local storage to persist form data
  const [storedFormData, setStoredFormData] = useLocalStorage<FormData>('estimation_form_data', {});
  
  const [state, setState] = useState<EstimationState>({
    step: 0,
    totalSteps: 8, 
    formData: storedFormData || {},
    estimationResult: null,
    isSubmitting: false,
    animationDirection: 'forward',
    isComplete: false
  });
  
  const { toast } = useToast();

  // Update form data with validation
  const updateFormData = useCallback((data: Partial<FormData>) => {
    setState(prev => {
      const newFormData = { ...prev.formData, ...data };
      setStoredFormData(newFormData); // Persist to local storage
      
      // Calculate total steps based on selected options
      let totalSteps = calculateTotalSteps(newFormData);
      
      // Calculate progress
      const progress = Math.min(100, Math.round((prev.step / totalSteps) * 100));
      
      return {
        ...prev,
        formData: newFormData,
        totalSteps
      };
    });
  }, [setStoredFormData]);

  // Calculate total steps based on form data selections
  const calculateTotalSteps = (formData: FormData): number => {
    let baseSteps = 8;
    
    // Adjust based on client type
    if (formData.clientType === 'professional') {
      baseSteps = 10;
    }
    
    // Adjust based on project type
    if (formData.projectType === 'renovation' || formData.projectType === 'division') {
      baseSteps += 2;
    } else if (formData.projectType === 'construction' || formData.projectType === 'extension') {
      baseSteps += 3;
    }
    
    // Adjust based on estimation type
    if (formData.estimationType === 'precise') {
      baseSteps += 5;
    }
    
    return baseSteps;
  };

  // Go to next step with validation
  const goToNextStep = useCallback(() => {
    setState(prev => {
      // Validate current step
      const { isValid, errors } = validateStep(prev.step, prev.formData);
      
      if (!isValid) {
        errors.forEach(error => {
          toast({
            title: "Validation",
            description: error,
            variant: "destructive"
          });
        });
        return prev;
      }
      
      // Get the next step based on form data
      const nextStep = determineNextStep(prev.step, prev.formData);
      
      return {
        ...prev,
        step: nextStep,
        animationDirection: 'forward',
      };
    });
  }, [toast]);

  // Go to previous step
  const goToPreviousStep = useCallback(() => {
    setState(prev => {
      const previousStep = determinePreviousStep(prev.step, prev.formData);
      
      return {
        ...prev,
        step: previousStep,
        animationDirection: 'backward',
      };
    });
  }, []);

  // Go to specific step
  const goToStep = useCallback((stepIndex: number) => {
    setState(prev => {
      return {
        ...prev,
        step: stepIndex,
        animationDirection: stepIndex > prev.step ? 'forward' : 'backward'
      };
    });
  }, []);

  // Finalize the estimation and generate report
  const finalizeEstimation = useCallback(() => {
    setState(prev => {
      // Validate the entire form
      const allStepsValid = Array.from({ length: prev.step + 1 }, (_, i) => i)
        .every(step => {
          const { isValid } = validateStep(step, prev.formData);
          return isValid;
        });
        
      if (!allStepsValid) {
        toast({
          title: "Formulaire incomplet",
          description: "Veuillez remplir tous les champs requis avant de finaliser",
          variant: "destructive"
        });
        return prev;
      }
      
      // Calculate final amount
      const amount = calculateEstimationAmount(prev.formData);
      const updatedFormData = {
        ...prev.formData,
        montantT: amount,
        completed: true
      };
      
      // Generate estimation result
      const estimationResult = adaptToEstimationResponseData(updatedFormData);
      
      // Store the final data
      setStoredFormData(updatedFormData);
      
      return {
        ...prev,
        formData: updatedFormData,
        estimationResult,
        isComplete: true
      };
    });
    
    // Show success toast
    toast({
      title: "Estimation complétée",
      description: "Votre estimation de projet a été générée avec succès",
      variant: "default"
    });
    
    return state.estimationResult;
  }, [state.estimationResult, toast, setStoredFormData]);

  // Reset the form
  const resetForm = useCallback(() => {
    setStoredFormData({});
    setState({
      step: 0,
      totalSteps: 8,
      formData: {},
      estimationResult: null,
      isSubmitting: false,
      animationDirection: 'forward',
      isComplete: false
    });
  }, [setStoredFormData]);

  // Set submitting state
  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setState(prev => ({
      ...prev,
      isSubmitting
    }));
  }, []);

  // Effect to update total steps when form data changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      totalSteps: calculateTotalSteps(prev.formData)
    }));
  }, [state.formData.clientType, state.formData.projectType, state.formData.estimationType]);

  return {
    state,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    finalizeEstimation,
    resetForm,
    setSubmitting
  };
};
