
import { FormData } from './types';
import { 
  calculateDetailedEstimation, 
  calculateSimpleEstimation 
} from './calculations';
import { ensureNumber } from './utils/typeConversions';

export const calculateEstimation = (formData: FormData): number => {
  // Log the incoming form data for debugging
  console.log("Formulaire pour calcul:", formData);
  
  // Determine which estimation method to use based on estimationType
  // Match the original form options: "Rapide 5 mins" or "Précise 15 mins"
  const mode = formData.estimationType || 'simple';
  console.log("Mode de calcul:", mode);
  
  try {
    // For detailed or standard estimation (précise 15 mins)
    if (mode === 'detailed' || mode === 'standard' || mode.includes('Précise')) {
      try {
        const detailedResult = calculateDetailedEstimation(formData);
        console.log("Résultat du calcul détaillé:", detailedResult);
        
        if (typeof detailedResult === 'object' && 'totalEstimation' in detailedResult) {
          return ensureNumber(detailedResult.totalEstimation);
        }
        
        // If the result doesn't have the expected structure, use basic calculation
        console.log("Structure de résultat inattendue, utilisation du calcul basique");
        return calculateBasicEstimation(formData);
      } catch (error) {
        console.error("Erreur dans le calcul détaillé:", error);
        return calculateBasicEstimation(formData);
      }
    }
    
    // For simple or quick estimation (rapide 5 mins)
    if (mode === 'simple' || mode === 'quick' || mode === 'basic' || mode.includes('Rapide')) {
      try {
        const simpleResult = calculateSimpleEstimation(formData);
        console.log("Résultat du calcul simple:", simpleResult);
        return ensureNumber(simpleResult);
      } catch (error) {
        console.error("Erreur dans le calcul simple:", error);
        return calculateBasicEstimation(formData);
      }
    }
    
    // Default calculation if no mode matches
    console.log("Mode non reconnu, utilisation du calcul basique");
    return calculateBasicEstimation(formData);
  } catch (error) {
    console.error("Erreur générale dans le calcul:", error);
    // Return a fallback value if all calculations fail
    return calculateBasicEstimation(formData);
  }
};

// Basic estimation function as fallback
const calculateBasicEstimation = (formData: FormData): number => {
  console.log("Exécution du calcul basique");
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
  
  console.log("Coût basique calculé:", cost);
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
