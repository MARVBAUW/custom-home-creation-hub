
import { FormData } from '../../types';

export const useEnvelopeSubmissions = (updateFormData: (data: Partial<FormData>) => void) => {
  // Gestion de la soumission du formulaire de couverture
  const handleCouvertureSubmit = (data: { roofingType: string }) => {
    updateFormData({
      roofingType: data.roofingType,
    });
  };

  // Gestion de la soumission du formulaire d'isolation
  const handleIsolationSubmit = (data: { insulationType: string }) => {
    updateFormData({
      insulationType: data.insulationType,
    });
  };

  // Gestion de la soumission du formulaire de façade
  const handleFacadeSubmit = (data: {
    facadeMaterial: string;
    metalCladdingPercentage?: string | number;
    woodCladdingPercentage?: string | number;
    stoneCladdingPercentage?: string | number;
  }) => {
    updateFormData({
      facadeMaterial: data.facadeMaterial,
      metalCladdingPercentage: data.metalCladdingPercentage,
      woodCladdingPercentage: data.woodCladdingPercentage,
      stoneCladdingPercentage: data.stoneCladdingPercentage,
    });
  };

  // Gestion de la soumission du formulaire de menuiseries extérieures
  const handleMenuiseriesExtSubmit = (data: {
    windowType: string;
    shutterType: string;
    windowRenovationArea?: string | number;
    windowNewArea?: string | number;
  }) => {
    updateFormData({
      windowType: data.windowType,
      shutterType: data.shutterType,
      windowRenovationArea: data.windowRenovationArea,
      windowNewArea: data.windowNewArea,
    });
  };

  return {
    handleCouvertureSubmit,
    handleIsolationSubmit,
    handleFacadeSubmit,
    handleMenuiseriesExtSubmit,
  };
};
