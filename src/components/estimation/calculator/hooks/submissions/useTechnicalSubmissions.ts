
import { FormData } from '../../types';
import { ensureNumber } from '../../utils/typeConversions';
import { 
  calculateElectricityCost, 
  calculatePlumbingCost,
  calculateHeatingCost
} from '../../utils/montantUtils';

export const useTechnicalSubmissions = () => {
  // Function to handle electricity submission
  const handleElectriciteSubmit = (data: any, formData: FormData) => {
    const surface = ensureNumber(formData.surface, 0);
    const additionalCost = calculateElectricityCost(
      data.electricalType,
      surface
    );
    
    return {
      electricalType: data.electricalType,
      hasSmartHome: data.hasSmartHome || false,
      montantT: (formData.montantT || 0) + additionalCost
    };
  };

  // Function to handle plumbing submission
  const handlePlomberieSubmit = (data: any, formData: FormData) => {
    const surface = ensureNumber(formData.surface, 0);
    const additionalCost = calculatePlumbingCost(
      data.plumbingType,
      surface
    );
    
    return {
      plumbingType: data.plumbingType,
      montantT: (formData.montantT || 0) + additionalCost
    };
  };

  // Function to handle heating submission
  const handleChauffageSubmit = (data: any, formData: FormData) => {
    // Use doorCount if available, otherwise default to 0
    const doorCount = formData.doorCount ? ensureNumber(formData.doorCount, 0) : 0;
    const surface = ensureNumber(formData.surface, 0);
    
    let additionalCost = 0;
    
    if (data.heatingType) {
      additionalCost += calculateHeatingCost(data.heatingType, surface);
    }
    
    return {
      heatingType: data.heatingType,
      hasAirConditioning: data.hasAirConditioning || false,
      montantT: (formData.montantT || 0) + additionalCost
    };
  };

  return {
    handleElectriciteSubmit,
    handlePlomberieSubmit,
    handleChauffageSubmit
  };
};
