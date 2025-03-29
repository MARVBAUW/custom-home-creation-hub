
import { FormData } from '../../types';

export const useSpecialFeaturesSubmissions = (updateFormData: (data: Partial<FormData>) => void) => {
  // Gestion de la soumission du formulaire des énergies renouvelables
  const handleEnergiesRenouvelablesSubmit = (data: {
    energyType: string;
    solarPanelSurface?: string;
  }) => {
    updateFormData({
      energyType: data.energyType,
      solarPanelSurface: data.solarPanelSurface ? Number(data.solarPanelSurface) : undefined,
    });
  };

  // Gestion de la soumission du formulaire des solutions environnementales
  const handleSolutionsEnvironSubmit = (data: {
    solutionType: string;
    ecoFriendlyInsulation: boolean;
  }) => {
    updateFormData({
      solutionType: data.solutionType,
      ecoFriendlyInsulation: data.ecoFriendlyInsulation,
    });
  };

  // Gestion de la soumission du formulaire d'aménagement paysager
  const handleAmenagementPaysagerSubmit = (data: {
    gardenArea: string | number;
    garden: boolean;
    irrigation: boolean;
  }) => {
    updateFormData({
      gardenArea: data.gardenArea,
      garden: data.garden,
      irrigation: data.irrigation,
    });
  };

  // Gestion de la soumission du formulaire des options
  const handleOptionsSubmit = (data: {
    terrace: boolean;
    terraceType?: string;
    terraceArea?: string | number;
    swimmingPool: boolean;
    poolType?: string;
    garage: boolean;
    garageSize?: string;
    carport: boolean;
    fence: boolean;
    gate: boolean;
    outdoorLighting: boolean;
    outdoorKitchen?: boolean;
    pergola?: boolean;
    exteriorFeatures?: string[];
  }) => {
    updateFormData({
      terrace: data.terrace,
      terraceType: data.terraceType,
      terraceArea: data.terraceArea,
      swimmingPool: data.swimmingPool,
      poolType: data.poolType,
      garage: data.garage,
      garageSize: data.garageSize,
      carport: data.carport,
      fence: data.fence,
      gate: data.gate,
      outdoorLighting: data.outdoorLighting,
      outdoorKitchen: data.outdoorKitchen,
      pergola: data.pergola,
      exteriorFeatures: data.exteriorFeatures
    });
  };

  // Gestion de la soumission du formulaire de cuisine
  const handleCuisineSubmit = (data: { kitchenType: string }) => {
    updateFormData({
      kitchenType: data.kitchenType,
    });
  };

  // Gestion de la soumission du formulaire de salle de bain
  const handleSalleDeBainSubmit = (data: {
    bathroomType: string;
    bathroomCount: string;
  }) => {
    updateFormData({
      bathroomType: data.bathroomType,
      bathroomCount: data.bathroomCount
    });
  };

  return {
    handleEnergiesRenouvelablesSubmit,
    handleSolutionsEnvironSubmit,
    handleAmenagementPaysagerSubmit,
    handleOptionsSubmit,
    handleCuisineSubmit,
    handleSalleDeBainSubmit,
  };
};
