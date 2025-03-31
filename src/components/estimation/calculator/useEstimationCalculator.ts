
import { useState, useCallback } from 'react';
import { FormData, EstimationFormData, EstimationResponseData } from './types';
import { createTypeAdaptingUpdater, adaptToEstimationFormData } from './utils/dataAdapter';

// Initial form data
const initialFormData: FormData = {
  clientType: '',
  projectType: '',
  surface: '',
  budget: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  montantT: 0
};

export const useEstimationCalculator = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [estimationResult, setEstimationResult] = useState<EstimationResponseData | null>(null);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  
  // Total number of steps - can be updated based on project type
  const totalSteps = 20;
  
  // Update form data with new values
  const updateFormData = useCallback((newData: Partial<FormData>) => {
    // Convert the incoming data to a format compatible with FormData
    setFormData(prevData => ({
      ...prevData,
      ...newData
    }));
  }, []);
  
  // Move to the next step
  const goToNextStep = useCallback(() => {
    setAnimationDirection('forward');
    setStep(prev => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);
  
  // Move to the previous step
  const goToPreviousStep = useCallback(() => {
    setAnimationDirection('backward');
    setStep(prev => Math.max(prev - 1, 0));
  }, []);
  
  // Calculate the estimation result
  const calculateEstimationResult = useCallback((): EstimationResponseData => {
    // Base cost per square meter
    const baseCostPerSquareMeter = 1500;
    
    // Get numeric values from form data
    const surface = Number(formData.surface) || 0;
    
    // Calculate basic costs
    const structuralWorkCost = surface * baseCostPerSquareMeter * 0.4;
    const finishingWorkCost = surface * baseCostPerSquareMeter * 0.3;
    const technicalLotsCost = surface * baseCostPerSquareMeter * 0.2;
    const externalWorksCost = surface * baseCostPerSquareMeter * 0.1;
    
    // Calculate total construction cost
    const totalConstructionCost = structuralWorkCost + finishingWorkCost + technicalLotsCost + externalWorksCost;
    
    // Calculate fees (architect, engineering, etc.)
    const architectFees = totalConstructionCost * 0.1;
    const engineeringFees = totalConstructionCost * 0.05;
    const otherFees = totalConstructionCost * 0.03;
    const totalFees = architectFees + engineeringFees + otherFees;
    
    // Calculate other costs
    const insuranceCost = totalConstructionCost * 0.02;
    const contingencyCost = totalConstructionCost * 0.05;
    const taxesCost = totalConstructionCost * 0.01;
    const miscellaneousCost = totalConstructionCost * 0.01;
    const totalOtherCosts = insuranceCost + contingencyCost + taxesCost + miscellaneousCost;
    
    // Calculate total amount
    const totalAmount = totalConstructionCost + totalFees + totalOtherCosts;
    
    // Create categories for pie chart
    const categories = [
      { category: 'Gros œuvre', amount: structuralWorkCost },
      { category: 'Second œuvre', amount: finishingWorkCost },
      { category: 'Lots techniques', amount: technicalLotsCost },
      { category: 'Aménagements extérieurs', amount: externalWorksCost },
      { category: 'Honoraires', amount: totalFees },
      { category: 'Autres coûts', amount: totalOtherCosts }
    ];
    
    // Create timeline estimation
    const timelineEstimation = {
      design: 2,
      permits: 3,
      bidding: 1,
      construction: surface > 200 ? 12 : (surface > 100 ? 9 : 6),
      total: 0
    };
    
    // Calculate total timeline
    timelineEstimation.total = timelineEstimation.design + timelineEstimation.permits + timelineEstimation.bidding + timelineEstimation.construction;
    
    // Create and return the estimation result
    const result: EstimationResponseData = {
      constructionCosts: {
        structuralWork: structuralWorkCost,
        finishingWork: finishingWorkCost,
        technicalLots: technicalLotsCost,
        externalWorks: externalWorksCost,
        total: totalConstructionCost
      },
      fees: {
        architect: architectFees,
        engineeringFees: engineeringFees,
        architectFees: architectFees,
        officialFees: engineeringFees * 0.2,
        inspectionFees: engineeringFees * 0.3,
        technicalStudies: engineeringFees * 0.5,
        other: otherFees,
        total: totalFees
      },
      otherCosts: {
        insurance: insuranceCost,
        contingency: contingencyCost,
        taxes: taxesCost,
        miscellaneous: miscellaneousCost,
        total: totalOtherCosts
      },
      totalAmount,
      categories,
      timeline: timelineEstimation
    };
    
    return result;
  }, [formData]);
  
  // Finalize the estimation and store the result
  const finalizeEstimation = useCallback(() => {
    const result = calculateEstimationResult();
    setEstimationResult(result);
    return result;
  }, [calculateEstimationResult]);
  
  return {
    step,
    setStep,
    totalSteps,
    formData,
    estimationResult,
    animationDirection,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    calculateEstimationResult,
    finalizeEstimation
  };
};
