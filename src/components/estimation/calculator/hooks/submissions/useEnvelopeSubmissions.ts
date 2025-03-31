
import { useCallback } from 'react';
import { FormData } from '../../types/formTypes';
import { percentageToNumber, calculateFacadeCost, calculateDetailedFacadeCost } from '../../utils/montantUtils';
import { ensureNumber } from '../../utils/typeConversions';

export const useEnvelopeSubmissions = (
  formData: FormData,
  updateFormData: (data: Partial<FormData>) => void
) => {
  // Handle submission for facade step
  const handleFacadeSubmit = useCallback((data: {
    stonePercentage: string;
    plasterPercentage: string;
    brickPercentage: string;
    metalCladdingPercentage: string;
    woodCladdingPercentage: string;
    stoneCladdingPercentage: string;
  }) => {
    const { 
      stonePercentage,
      plasterPercentage,
      brickPercentage,
      metalCladdingPercentage,
      woodCladdingPercentage,
      stoneCladdingPercentage
    } = data;
    
    // Extract numeric percentages
    const percentages = {
      stone: percentageToNumber(stonePercentage),
      plaster: percentageToNumber(plasterPercentage),
      brick: percentageToNumber(brickPercentage),
      metalCladding: percentageToNumber(metalCladdingPercentage),
      woodCladding: percentageToNumber(woodCladdingPercentage),
      stoneCladding: percentageToNumber(stoneCladdingPercentage)
    };
    
    // Calculate cost based on facade percentages
    const facadeCost = calculateDetailedFacadeCost(
      ensureNumber(formData.surface),
      percentages
    );
    
    // Update form data with facade information and cost
    updateFormData({
      stonePercentage: percentages.stone,
      plasterPercentage: percentages.plaster,
      brickPercentage: percentages.brick,
      metalCladdingPercentage: percentages.metalCladding,
      woodCladdingPercentage: percentages.woodCladding,
      stoneCladdingPercentage: percentages.stoneCladding,
      montantT: ensureNumber(formData.montantT) + facadeCost
    });
    
  }, [formData, updateFormData]);
  
  return {
    handleFacadeSubmit
  };
};
