
import { useState } from 'react';
import { FormData } from '../../types';
import { 
  calculateRoofingCost, 
  calculateDetailedFacadeCost, 
  calculateWindowsCost,
  calculateInsulationCost
} from '../../utils/montantUtils';
import { ensureNumber } from '../../utils/typeConversions';

export const useEnvelopeSubmissions = (formData: FormData, updateFormData: (data: Partial<FormData>) => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleCouvertureSubmit = (couvertureData: { roofingType: string }) => {
    setIsSubmitting(true);
    
    try {
      // Utiliser ensureNumber pour s'assurer que surface est un nombre
      const surface = ensureNumber(formData.surface);
      const roofCost = calculateRoofingCost(couvertureData.roofingType, surface);
      
      updateFormData({
        ...couvertureData,
        montantT: (formData.montantT || 0) + roofCost
      });
      
      return true;
    } catch (error) {
      console.error('Error submitting couverture data:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleIsolationSubmit = (isolationData: { insulationType: string }) => {
    setIsSubmitting(true);
    
    try {
      // Utiliser ensureNumber pour s'assurer que surface est un nombre
      const surface = ensureNumber(formData.surface);
      const insulationCost = calculateInsulationCost(isolationData.insulationType, surface);
      
      updateFormData({
        ...isolationData,
        montantT: (formData.montantT || 0) + insulationCost
      });
      
      return true;
    } catch (error) {
      console.error('Error submitting isolation data:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFacadeSubmit = (facadeData: {
    stonePercentage: number | string,
    plasterPercentage: number | string,
    brickPercentage: number | string,
    metalCladdingPercentage: number | string,
    woodCladdingPercentage: number | string,
    stoneCladdingPercentage: number | string
  }) => {
    setIsSubmitting(true);
    
    try {
      const facadeCost = calculateDetailedFacadeCost(
        formData,
        facadeData.stonePercentage,
        facadeData.plasterPercentage,
        facadeData.brickPercentage,
        facadeData.metalCladdingPercentage,
        facadeData.woodCladdingPercentage,
        facadeData.stoneCladdingPercentage
      );
      
      updateFormData({
        stonePercentage: Number(facadeData.stonePercentage),
        plasterPercentage: Number(facadeData.plasterPercentage),
        brickPercentage: Number(facadeData.brickPercentage),
        metalCladdingPercentage: Number(facadeData.metalCladdingPercentage),
        woodCladdingPercentage: Number(facadeData.woodCladdingPercentage),
        stoneCladdingPercentage: Number(facadeData.stoneCladdingPercentage),
        montantT: (formData.montantT || 0) + facadeCost
      });
      
      return true;
    } catch (error) {
      console.error('Error submitting facade data:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleMenuiseriesExtSubmit = (menuiseriesData: {
    windowType: string,
    windowRenovationArea: number | string,
    windowNewArea: number | string
  }) => {
    setIsSubmitting(true);
    
    try {
      // Calculate total window area
      const windowArea = ensureNumber(menuiseriesData.windowNewArea) + ensureNumber(menuiseriesData.windowRenovationArea);
      const windowsCost = calculateWindowsCost(menuiseriesData.windowType, windowArea);
      
      updateFormData({
        ...menuiseriesData,
        montantT: (formData.montantT || 0) + windowsCost
      });
      
      return true;
    } catch (error) {
      console.error('Error submitting menuiseries data:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    isSubmitting,
    handleCouvertureSubmit,
    handleIsolationSubmit,
    handleFacadeSubmit,
    handleMenuiseriesExtSubmit
  };
};

