
import { FormData } from './types';
import { 
  calculateDetailedEstimation, 
  calculateSimpleEstimation 
} from './calculations';
import { ensureNumber } from './utils/typeConversions';

export const calculateEstimation = (formData: FormData): number => {
  // Utiliser l'estimation détaillée si le mode détaillé est activé ou par défaut
  if (formData.estimationMode === 'detailed') {
    return calculateDetailedEstimation(formData);
  }
  
  // Sinon, utiliser l'estimation simple
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
