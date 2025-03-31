
import { EstimationFormData as FormData } from '../../types';

export const useTechnicalSubmissions = (
  updateFormData: (data: Partial<FormData>) => void,
  goToNextStep: () => void
) => {
  // Soumission du formulaire d'électricité
  const onElectriciteSubmit = (data: {
    electricalType: string;
  }) => {
    updateFormData({
      electricalType: data.electricalType,
    });
    goToNextStep(); // Passer à l'étape plomberie (15)
  };

  // Soumission du formulaire de plomberie
  const onPlomberieSubmit = (data: {
    plumbingType: string;
  }) => {
    updateFormData({
      plumbingType: data.plumbingType,
    });
    goToNextStep(); // Passer à l'étape chauffage (16)
  };

  // Soumission du formulaire de chauffage
  const onChauffageSubmit = (data: {
    heatingType: string;
    hasAirConditioning: boolean;
  }) => {
    updateFormData({
      heatingType: data.heatingType,
      hasAirConditioning: data.hasAirConditioning,
    });
    goToNextStep(); // Passer à l'étape plâtrerie (17)
  };

  return {
    onElectriciteSubmit,
    onPlomberieSubmit,
    onChauffageSubmit
  };
};
