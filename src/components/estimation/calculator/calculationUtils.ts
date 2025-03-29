
import { FormData } from './types';
import { 
  calculateDetailedEstimation, 
  calculateSimpleEstimation 
} from './calculations';
import { ensureNumber } from './utils/typeConversions';

export const calculateEstimation = (formData: FormData): number => {
  // Determine which estimation method to use based on estimationType
  const mode = formData.estimationType || 'simple';
  console.log("Calculating estimation with mode:", mode);
  console.log("Form data for calculation:", formData);
  
  try {
    if (mode === 'detailed' || mode === 'standard') {
      // Extract just the number from the detailed calculation result
      const detailedResult = calculateDetailedEstimation(formData);
      console.log("Detailed calculation result:", detailedResult);
      
      if (typeof detailedResult === 'object' && 'totalEstimation' in detailedResult) {
        return ensureNumber(detailedResult.totalEstimation);
      }
      // Fallback to a basic calculation if object doesn't have totalEstimation
      return calculateBasicEstimation(formData);
    }
    
    // Use simple estimation for 'simple' or 'quick' modes
    const simpleResult = calculateSimpleEstimation(formData);
    console.log("Simple calculation result:", simpleResult);
    return ensureNumber(simpleResult);
  } catch (error) {
    console.error("Error in calculation:", error);
    // Return a fallback value if calculation fails
    return calculateBasicEstimation(formData);
  }
};

// Basic estimation function as fallback
const calculateBasicEstimation = (formData: FormData): number => {
  let cost = 0;
  
  // Get base cost by surface
  const surface = ensureNumber(formData.surface);
  if (surface > 0) {
    // Basic price per m²
    let pricePerM2 = 1500; // Default price per m²
    
    // Adjust price based on construction type
    if (formData.constructionType === 'traditional') {
      pricePerM2 = 1600;
    } else if (formData.constructionType === 'contemporary') {
      pricePerM2 = 1800;
    } else if (formData.constructionType === 'eco') {
      pricePerM2 = 2000;
    }
    
    cost = surface * pricePerM2;
  } else {
    // Default cost if no surface provided
    cost = 150000;
  }
  
  // Adjust based on project type
  if (formData.projectType === 'renovation') {
    cost *= 0.7; // Renovation is typically cheaper than new construction
  } else if (formData.projectType === 'extension') {
    cost *= 1.1; // Extensions can be more complex and thus more expensive
  }
  
  // Add terrain cost if applicable
  if (formData.landPrice && formData.landIncluded === 'yes') {
    cost += ensureNumber(formData.landPrice);
  }
  
  return Math.round(cost);
};

// Fonction utilitaire pour obtenir une estimation par défaut si le calcul échoue
export const getSafeEstimation = (formData: FormData, fallbackValue: number = 50000): number => {
  try {
    const result = calculateEstimation(formData);
    return isNaN(result) || result <= 0 ? fallbackValue : result;
  } catch (error) {
    console.error("Erreur lors du calcul de l'estimation:", error);
    return fallbackValue;
  }
};
