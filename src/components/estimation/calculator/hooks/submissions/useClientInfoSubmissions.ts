
import { FormData } from '../../types';
import { ensureNumber } from '../../utils/typeConversions';

export const useClientInfoSubmissions = (
  updateFormData: (data: Partial<FormData>) => void,
  setStep: (step: number) => void
) => {
  // Soumission du formulaire de type de client
  const onClientTypeSubmit = (data: { clientType: string }) => {
    console.log("Type de client soumis:", data);
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
    console.log("Projet professionnel soumis:", data);
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
    console.log("Projet particulier soumis:", data);
    updateFormData({ projectType: data.projectType });
    setStep(4); // Type d'estimation
  };

  // Soumission du formulaire de type d'estimation
  const onEstimationTypeSubmit = (data: { 
    estimationType: 'simple' | 'standard' | 'detailed' | 'quick' | 'basic' | string;
    termsAccepted: boolean;
  }) => {
    console.log("Type d'estimation soumis:", data);
    updateFormData({
      estimationType: data.estimationType,
      termsAccepted: data.termsAccepted,
    });
    setStep(5); // Détails de construction
  };

  // Soumission du formulaire de détails de construction
  const onConstructionDetailsSubmit = (data: {
    constructionType: string;
    surface: number | string;
    levels: number | string; // Use levels instead of floors
    rooms: number | string;
    bedrooms: number | string;
    bathrooms: number | string;
  }) => {
    console.log("Détails de construction soumis:", data);
    updateFormData({
      constructionType: data.constructionType,
      surface: ensureNumber(data.surface),
      levels: ensureNumber(data.levels), // Use levels instead of floors
      rooms: ensureNumber(data.rooms),
      bedrooms: ensureNumber(data.bedrooms),
      bathrooms: ensureNumber(data.bathrooms)
    });
    setStep(6); // Type de terrain
  };

  // Soumission du formulaire de type de terrain
  const onTerrainSubmit = (data: {
    terrainType: string;
    terrainAccess: string; // Match the property name in FormData
    landIncluded: string;
    landPrice?: number | string;
  }) => {
    console.log("Terrain soumis:", data);
    updateFormData({
      terrainType: data.terrainType,
      terrainAccess: data.terrainAccess, // Match the property name in FormData
      landIncluded: data.landIncluded,
      landPrice: data.landPrice ? ensureNumber(data.landPrice) : undefined
    });
    setStep(7); // Structure des murs
  };

  // Soumission du formulaire de coordonnées et calcul de l'estimation
  const onContactSubmit = (data: { 
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city?: string;
    message?: string;
  }) => {
    console.log("Contact soumis:", data);
    updateFormData({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      city: data.city,
      message: data.message
    });
    // Cette étape est la dernière - afficher les résultats
    setStep(99); // Afficher les résultats
  };

  return {
    onClientTypeSubmit,
    onProfessionalProjectSubmit,
    onIndividualProjectSubmit,
    onEstimationTypeSubmit,
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onContactSubmit
  };
};
