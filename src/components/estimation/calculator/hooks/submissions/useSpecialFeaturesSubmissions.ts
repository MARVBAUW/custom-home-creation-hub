
import { EstimationFormData as FormData } from '../../types';

export const useSpecialFeaturesSubmissions = (
  formData: FormData,
  updateFormData: (data: Partial<FormData>) => void,
  goToNextStep: () => void
) => {
  // Function to handle renewable energy features submission
  const onRenewableEnergySubmit = (data: Partial<FormData>) => {
    // Update formData with renewable energy features
    updateFormData({
      solarPanelType: data.solarPanelType,
      solarPanelSurface: data.solarPanelSurface,
      windTurbineType: data.windTurbineType,
    });
    
    // Go to next step
    goToNextStep();
  };
  
  // Function to handle eco solutions submission
  const onEcoSolutionsSubmit = (data: Partial<FormData>) => {
    // Update formData with eco solutions
    updateFormData({
      rainwaterHarvesting: data.rainwaterHarvesting,
      greywaterRecycling: data.greywaterRecycling,
      ecoFriendlyInsulation: data.ecoFriendlyInsulation,
    });
    
    // Go to next step
    goToNextStep();
  };
  
  // Function to handle landscaping submission
  const onLandscapingSubmit = (data: Partial<FormData>) => {
    // Update formData with landscaping information
    const updatedData: Partial<FormData> = {
      landscapingType: data.landscapingType,
      gardenSurface: data.gardenSurface,
      pool: data.pool,
      outdoorKitchen: data.outdoorKitchen,
    };
    
    // Only include landscapingBudget if it exists
    if (data.landscapingBudget !== undefined) {
      updatedData.landscapingBudget = data.landscapingBudget;
    }
    
    // Update formData
    updateFormData(updatedData);
    
    // Go to next step
    goToNextStep();
  };
  
  // Function to handle exterior options submission
  const onExteriorOptionsSubmit = (data: Partial<FormData>) => {
    // Update formData with exterior options
    const updatedData: Partial<FormData> = {
      exteriorFeatures: data.exteriorFeatures,
    };
    
    // Only include terrace if it exists
    if (data.terrace !== undefined) {
      updatedData.terrace = data.terrace;
    }
    
    // Update formData
    updateFormData(updatedData);
    
    // Go to next step
    goToNextStep();
  };
  
  return {
    onRenewableEnergySubmit,
    onEcoSolutionsSubmit,
    onLandscapingSubmit,
    onExteriorOptionsSubmit,
  };
};
