
import { FormData } from '../../types';

export const useEnvelopeSubmissions = (
  updateFormData: (data: Partial<FormData>) => void,
  goToNextStep: () => void
) => {
  // Soumission du formulaire de couverture
  const onCouvertureSubmit = (data: {
    roofingType: string;
  }) => {
    updateFormData({
      roofingType: data.roofingType,
    });
    goToNextStep(); // Passer à l'étape isolation (11)
  };

  // Soumission du formulaire d'isolation
  const onIsolationSubmit = (data: {
    insulationType: string;
  }) => {
    updateFormData({
      insulationType: data.insulationType,
    });
    goToNextStep(); // Passer à l'étape façade (12)
  };

  // Soumission du formulaire de façade
  const onFacadeSubmit = (data: {
    stonePercentage: string;
    plasterPercentage: string;
    brickPercentage: string;
    metalCladdingPercentage: string;
    woodCladdingPercentage: string;
    stoneCladdingPercentage: string;
  }) => {
    updateFormData({
      stonePercentage: Number(data.stonePercentage),
      plasterPercentage: Number(data.plasterPercentage),
      brickPercentage: Number(data.brickPercentage),
      metalCladdingPercentage: Number(data.metalCladdingPercentage),
      woodCladdingPercentage: Number(data.woodCladdingPercentage),
      stoneCladdingPercentage: Number(data.stoneCladdingPercentage),
    });
    goToNextStep(); // Passer à l'étape menuiseries extérieures (13)
  };

  // Soumission du formulaire de menuiseries extérieures
  const onMenuiseriesExtSubmit = (data: {
    windowType: string;
    windowRenovationArea?: string;
    windowNewArea?: string;
  }) => {
    updateFormData({
      windowType: data.windowType,
      windowRenovationArea: data.windowRenovationArea ? Number(data.windowRenovationArea) : undefined,
      windowNewArea: data.windowNewArea ? Number(data.windowNewArea) : undefined,
    });
    goToNextStep(); // Passer à l'étape électricité (14)
  };

  return {
    onCouvertureSubmit,
    onIsolationSubmit,
    onFacadeSubmit,
    onMenuiseriesExtSubmit
  };
};
