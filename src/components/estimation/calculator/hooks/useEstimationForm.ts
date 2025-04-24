import { useState, useCallback } from 'react';
import { FormData } from '../types';
import { calculateEstimationAmount } from '../utils/navigationPathUtils';
import { useToast } from '@/hooks/use-toast';
import { EstimationResponseData } from '../types/estimationTypes';

export const useEstimationForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    clientType: undefined,
    projectType: undefined,
    surface: 0,
    city: '',
    constructionType: undefined,
    bedrooms: 0,
    bathrooms: 0,
    budget: 0,
  });
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  const { toast } = useToast();

  const updateFormData = useCallback((newData: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...newData
    }));
  }, []);

  const calculateEstimation = useCallback((): EstimationResponseData => {
    const amount = calculateEstimationAmount(formData);
    
    return {
      projectType: formData.projectType || '',
      projectDetails: {
        surface: formData.surface || 0,
        location: formData.city || '',
        constructionType: formData.constructionType || '',
        bedrooms: formData.bedrooms || 0,
        bathrooms: formData.bathrooms || 0,
        projectType: formData.projectType || '',
      },
      estimatedCost: {
        total: amount,
        perSquareMeter: formData.surface ? amount / formData.surface : 0,
        breakdown: {
          materials: amount * 0.6,
          labor: amount * 0.3,
          fees: amount * 0.1
        }
      },
      constructionCosts: {
        structuralWork: amount * 0.4,
        finishingWork: amount * 0.3,
        technicalLots: amount * 0.2,
        externalWorks: amount * 0.1,
        total: amount
      },
      fees: {
        architect: amount * 0.04,
        architectFees: amount * 0.03,
        engineeringFees: amount * 0.02,
        projectManagement: amount * 0.03,
        officialFees: amount * 0.01,
        inspectionFees: amount * 0.01,
        technicalStudies: amount * 0.02,
        permits: amount * 0.01,
        insurance: amount * 0.01,
        contingency: amount * 0.05,
        taxes: amount * 0.2,
        other: amount * 0.02,
        total: amount * 0.45
      },
      otherCosts: {
        land: 0,
        demolition: 0,
        siteDevelopment: amount * 0.05,
        insurance: amount * 0.02,
        contingency: amount * 0.05,
        taxes: amount * 0.2,
        miscellaneous: amount * 0.03,
        total: amount * 0.35
      },
      totalAmount: amount,
      dateGenerated: new Date().toISOString(),
      isComplete: true,
      timeline: {
        design: 2,
        permits: 3,
        construction: 8,
        total: 13,
        totalMonths: 13
      },
      categories: [
        { name: 'Gros œuvre', cost: amount * 0.4, percentage: 40, amount: amount * 0.4 },
        { name: 'Second œuvre', cost: amount * 0.3, percentage: 30, amount: amount * 0.3 },
        { name: 'Lots techniques', cost: amount * 0.2, percentage: 20, amount: amount * 0.2 },
        { name: 'Aménagements', cost: amount * 0.1, percentage: 10, amount: amount * 0.1 }
      ]
    };
  }, [formData]);

  return {
    step,
    setStep,
    formData,
    updateFormData,
    animationDirection,
    setAnimationDirection,
    calculateEstimation
  };
};
