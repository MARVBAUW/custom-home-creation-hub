
import { useState } from 'react';
import { FormData } from '../../types';
import { 
  calculateRoofingCost, 
  calculateFacadeCost, 
  calculateWindowsCost,
  calculateInsulationCost
} from '../../utils/montantUtils';

export const useEnvelopeSubmissions = (formData: FormData, updateFormData: (data: Partial<FormData>) => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleCouvertureSubmit = (couvertureData: { roofingType: string }) => {
    setIsSubmitting(true);
    
    try {
      const roofCost = calculateRoofingCost(formData, couvertureData.roofingType);
      
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
      const insulationCost = calculateInsulationCost(formData, isolationData.insulationType);
      
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
      const facadeCost = calculateFacadeCost(
        formData,
        facadeData.stonePercentage,
        facadeData.plasterPercentage,
        facadeData.brickPercentage,
        facadeData.metalCladdingPercentage,
        facadeData.woodCladdingPercentage,
        facadeData.stoneCladdingPercentage
      );
      
      updateFormData({
        ...facadeData,
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
      const windowsCost = calculateWindowsCost(
        formData,
        menuiseriesData.windowType,
        menuiseriesData.windowRenovationArea,
        menuiseriesData.windowNewArea
      );
      
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
