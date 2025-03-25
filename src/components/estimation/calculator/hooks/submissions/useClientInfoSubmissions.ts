
import { FormData } from '../../types';

export const useClientInfoSubmissions = (
  updateFormData: (data: Partial<FormData>) => void,
  setStep: (step: number) => void
) => {
  // Soumission du formulaire de type de client
  const onClientTypeSubmit = (data: { clientType: string }) => {
    updateFormData({ clientType: data.clientType });
    
    // Déterminer l'étape suivante en fonction du type de client
    if (data.clientType === "professional") {
      setStep(2); // Infos projet pro
    } else {
      setStep(3); // Infos projet particulier
    }
  };

  // Soumission du formulaire de projet professionnel
  const onProfessionalProjectSubmit = (data: { 
    activity: string;
    projectType: string;
    startDate: string;
    endDate: string;
  }) => {
    updateFormData({
      activity: data.activity,
      projectType: data.projectType,
      startDate: data.startDate,
      endDate: data.endDate,
    });
    setStep(4); // Type d'estimation
  };

  // Soumission du formulaire de projet particulier
  const onIndividualProjectSubmit = (data: { projectType: string }) => {
    updateFormData({ projectType: data.projectType });
    setStep(4); // Type d'estimation
  };

  // Soumission du formulaire de type d'estimation
  const onEstimationTypeSubmit = (data: { 
    estimationType: string;
    termsAccepted: boolean;
  }) => {
    updateFormData({
      estimationType: data.estimationType,
      termsAccepted: data.termsAccepted,
    });
    setStep(5); // Détails de construction
  };

  // Soumission du formulaire de coordonnées et calcul de l'estimation
  const onContactSubmit = (data: { 
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }) => {
    updateFormData({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
    });
  };

  return {
    onClientTypeSubmit,
    onProfessionalProjectSubmit,
    onIndividualProjectSubmit,
    onEstimationTypeSubmit,
    onContactSubmit
  };
};
