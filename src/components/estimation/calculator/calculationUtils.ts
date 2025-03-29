
import { FormData } from './types';
import { 
  calculateDetailedEstimation, 
  calculateSimpleEstimation 
} from './calculations';
import { ensureNumber } from './utils/typeConversions';

export const calculateEstimation = (formData: FormData): number => {
  // Determine which estimation method to use
  // Use 'detailed' mode by default if not specified
  const mode = formData.estimationType || 'simple';
  
  if (mode === 'detailed') {
    // Extract just the number from the detailed calculation result
    const detailedResult = calculateDetailedEstimation(formData);
    return typeof detailedResult === 'object' && 'totalEstimation' in detailedResult 
      ? detailedResult.totalEstimation 
      : 0;
  }
  
  // Fall back to simple estimation
  return calculateSimpleEstimation(formData);
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
