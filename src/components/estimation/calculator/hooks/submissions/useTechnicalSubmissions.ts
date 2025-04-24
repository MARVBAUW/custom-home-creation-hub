import { EstimationFormData, FormData } from '../../types/formTypes';
import { ensureNumber } from '../../utils/typeConversions';
import { 
  calculateElectricalCost, 
  calculatePlumbingCost,
  calculateHeatingCost,
  calculateAirConditioningCost
} from '../../utils/montantUtils';

export const useTechnicalSubmissions = () => {
  // Function to handle electricity submission
  const handleElectriciteSubmit = (data: any, formData: EstimationFormData | FormData) => {
    const surface = ensureNumber(formData.surface, 0);
    const additionalCost = calculateElectricalCost(
      surface,
      data.electricalType
    );
    
    return {
      electricalType: data.electricalType,
      hasSmartHome: data.hasSmartHome || false,
      montantT: ensureNumber(formData.montantT, 0) + additionalCost
    };
  };

  // Function to handle plumbing submission
  const handlePlomberieSubmit = (data: any, formData: EstimationFormData | FormData) => {
    const surface = ensureNumber(formData.surface, 0);
    const additionalCost = calculatePlumbingCost(
      surface,
      data.plumbingType
    );
    
    return {
      plumbingType: data.plumbingType,
      montantT: ensureNumber(formData.montantT, 0) + additionalCost
    };
  };

  // Function to handle heating submission
  const handleChauffageSubmit = (data: any, formData: EstimationFormData | FormData) => {
    // Use doorCount if available, otherwise default to 0
    const doorCount = formData.doorCount ? ensureNumber(formData.doorCount, 0) : 0;
    const surface = ensureNumber(formData.surface, 0);
    
    let additionalCost = 0;
    
    if (data.heatingType) {
      additionalCost += calculateHeatingCost(surface, data.heatingType);
    }
    
    // Add air conditioning cost if selected
    if (data.hasAirConditioning) {
      additionalCost += calculateAirConditioningCost(data.hasAirConditioning, surface);
    }
    
    return {
      heatingType: data.heatingType,
      hasAirConditioning: data.hasAirConditioning || false,
      montantT: ensureNumber(formData.montantT, 0) + additionalCost
    };
  };

  return {
    handleElectriciteSubmit,
    handlePlomberieSubmit,
    handleChauffageSubmit
  };
};
