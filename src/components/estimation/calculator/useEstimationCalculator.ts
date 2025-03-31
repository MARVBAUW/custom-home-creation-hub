
import { useState } from 'react';
import { FormData, EstimationResponseData } from './types';
import { useEstimationSteps } from './hooks/useEstimationSteps';
import { useEstimationForm } from './hooks/useEstimationForm';
import { useEstimationResult } from './hooks/useEstimationResult';
import { useFormSubmissions } from './hooks/useFormSubmissions';

export const useEstimationCalculator = () => {
  // Form data state
  const { formData, updateFormData } = useEstimationForm();
  
  // Step navigation state
  const { 
    step, 
    setStep, 
    totalSteps, 
    animationDirection, 
    visibleSteps, 
    goToNextStep, 
    goToPreviousStep 
  } = useEstimationSteps(formData);
  
  // Estimation result state
  const [estimationResult, setEstimationResult] = useState<EstimationResponseData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [error, setError] = useState('');
  
  // Function to calculate the estimation result
  const calculateEstimationResult = () => {
    setIsCalculating(true);
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Create a simulated estimation result
        const result: EstimationResponseData = {
          constructionCosts: {
            structuralWork: 120000,
            finishingWork: 80000,
            technicalLots: 45000,
            externalWorks: 35000,
            total: 280000
          },
          fees: {
            architectFees: 30000,
            engineeringFees: 15000,
            officialFees: 8000,
            inspectionFees: 7000,
            total: 60000
          },
          otherCosts: {
            insurance: 5000,
            contingency: 15000,
            taxes: 10000,
            miscellaneous: 5000,
            total: 35000
          },
          totalAmount: 375000,
          timeline: {
            design: 2,
            permits: 3,
            bidding: 1,
            construction: 12,
            total: 18
          }
        };
        
        setEstimationResult(result);
        setIsCalculating(false);
      } catch (err) {
        setError('Error calculating estimation');
        setIsCalculating(false);
      }
    }, 1500);
  };
  
  // Function to finalize the estimation
  const finalizeEstimation = () => {
    calculateEstimationResult();
    setShowResultDialog(true);
  };
  
  // Get form submissions functions
  const { 
    onClientTypeSubmit, 
    onProfessionalProjectSubmit, 
    onIndividualProjectSubmit, 
    onEstimationTypeSubmit, 
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onComblesSubmit,
    onCouvertureSubmit,
    onIsolationSubmit,
    onFacadeSubmit,
    onMenuiseriesExtSubmit,
    onElectriciteSubmit,
    onPlomberieSubmit,
    onChauffageSubmit,
    onPlatrerieSubmit,
    onMenuiseriesIntSubmit,
    onCarrelageSubmit,
    onParquetSubmit,
    onPeintureSubmit,
    onEnergiesRenouvelablesSubmit,
    onSolutionsEnvironSubmit,
    onAmenagementPaysagerSubmit,
    onOptionsSubmit,
    onCuisineSubmit,
    onSalleDeBainSubmit,
    onDemolitionSubmit,
    onGrosOeuvreRenovSubmit,
    onCharpenteRenovSubmit,
    onCouvertureRenovSubmit,
    onFacadeRenovSubmit,
    onContactSubmit 
  } = useFormSubmissions(formData, updateFormData, setStep, goToNextStep, finalizeEstimation);

  return {
    step,
    setStep,
    totalSteps,
    formData,
    estimationResult,
    showResultDialog,
    setShowResultDialog,
    animationDirection,
    isCalculating,
    error,
    visibleSteps,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    calculateEstimationResult,
    finalizeEstimation,
    onClientTypeSubmit,
    onProfessionalProjectSubmit,
    onIndividualProjectSubmit,
    onEstimationTypeSubmit,
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onComblesSubmit,
    onCouvertureSubmit,
    onIsolationSubmit,
    onFacadeSubmit,
    onMenuiseriesExtSubmit,
    onElectriciteSubmit,
    onPlomberieSubmit,
    onChauffageSubmit,
    onPlatrerieSubmit,
    onMenuiseriesIntSubmit,
    onCarrelageSubmit,
    onParquetSubmit,
    onPeintureSubmit,
    onEnergiesRenouvelablesSubmit,
    onSolutionsEnvironSubmit,
    onAmenagementPaysagerSubmit,
    onOptionsSubmit,
    onCuisineSubmit,
    onSalleDeBainSubmit,
    onDemolitionSubmit,
    onGrosOeuvreRenovSubmit,
    onCharpenteRenovSubmit,
    onCouvertureRenovSubmit,
    onFacadeRenovSubmit,
    onContactSubmit,
  };
};
