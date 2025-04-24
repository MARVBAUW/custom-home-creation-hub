
import { useCallback } from 'react';
import { EstimationFormData, FormData } from '../../types/formTypes';
import { calculateFacadeRenovCost, percentageToNumber } from '../../utils/montantUtils';
import { ensureNumber } from '../../utils/typeConversions';

export const useEnvelopeSubmissions = (
  formData: EstimationFormData | FormData,
  updateFormData: (data: Partial<EstimationFormData | FormData>) => void
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
    
    // Calculate cost for each facade type
    const surface = ensureNumber(formData.surface);
    let facadeCost = 0;
    
    // Add cost for each facade type based on percentage
    if (percentages.stone > 0) facadeCost += calculateFacadeRenovCost('premium', surface * percentages.stone / 100);
    if (percentages.plaster > 0) facadeCost += calculateFacadeRenovCost('standard', surface * percentages.plaster / 100);
    if (percentages.brick > 0) facadeCost += calculateFacadeRenovCost('premium', surface * percentages.brick / 100);
    if (percentages.metalCladding > 0) facadeCost += calculateFacadeRenovCost('premium', surface * percentages.metalCladding / 100);
    if (percentages.woodCladding > 0) facadeCost += calculateFacadeRenovCost('premium', surface * percentages.woodCladding / 100);
    if (percentages.stoneCladding > 0) facadeCost += calculateFacadeRenovCost('luxury', surface * percentages.stoneCladding / 100);
    
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
