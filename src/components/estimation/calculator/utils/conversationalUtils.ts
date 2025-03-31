
import { EstimationFormData } from '../types/estimationFormData';

// Import the MessageProcessor functions
import { analyzeUserIntent, extractFormDataFromMessage as extractDataFromMessage } from '../components/conversational/MessageProcessor';

// Export these functions to make them available
export { analyzeUserIntent, extractDataFromMessage as extractFormDataFromMessage };

// Function for generating a response based on form data
export const generateResponse = (formData: EstimationFormData): string => {
  // If we don't have any data yet, give a generic response
  if (!formData || Object.keys(formData).length === 0) {
    return "Bonjour ! Je suis l'assistant d'estimation de Progineer. Comment puis-je vous aider avec votre projet de construction ou rénovation ?";
  }

  // If we know the project type
  if (formData.projectType) {
    // If we don't have the surface yet
    if (!formData.surface) {
      return `Pour votre projet de ${getProjectTypeLabel(formData.projectType)}, quelle superficie envisagez-vous ? (en m²)`;
    }
    
    // If we have the surface but not the budget
    if (formData.surface && !formData.budget) {
      return `Pour votre projet de ${getProjectTypeLabel(formData.projectType)} de ${formData.surface} m², quel est votre budget approximatif ?`;
    }
    
    // If we have the surface and the budget but not the location
    if (formData.surface && formData.budget && !formData.city) {
      return `Merci pour ces informations. Où se situe votre projet ? (ville ou département)`;
    }
    
    // If we have the surface, budget and location
    if (formData.surface && formData.budget && formData.city) {
      // If we don't have information about rooms yet
      if (!formData.bedrooms && !formData.bathrooms) {
        return `Votre projet à ${formData.city} prend forme. Combien de chambres et de salles de bain souhaitez-vous ?`;
      }
      
      // If we have all the main information
      return `D'après les informations que vous m'avez fournies :
      - Type de projet : ${getProjectTypeLabel(formData.projectType)}
      - Surface : ${formData.surface} m²
      - Localisation : ${formData.city}
      - Budget : ${typeof formData.budget === 'number' ? formData.budget.toLocaleString('fr-FR') : formData.budget} €
      ${formData.bedrooms ? `- Nombre de chambres : ${formData.bedrooms}` : ''}
      ${formData.bathrooms ? `- Nombre de salles de bain : ${formData.bathrooms}` : ''}
      
      Je peux maintenant calculer une estimation plus précise. Souhaitez-vous des précisions sur d'autres aspects du projet ?`;
    }
  } else {
    // If we don't know the project type yet
    return "Pour vous aider au mieux, pourriez-vous me préciser quel type de projet vous envisagez ? (construction, rénovation ou extension)";
  }
  
  // Default response if no other condition is met
  return "Merci pour ces informations. Y a-t-il d'autres détails que vous souhaiteriez me communiquer sur votre projet ?";
};

// Function to extract information from a message
export const extractInformation = (message: string): Partial<EstimationFormData> => {
  return extractDataFromMessage(message, {} as EstimationFormData);
};

// Utility function to get the project type label
const getProjectTypeLabel = (projectType: string): string => {
  switch (projectType) {
    case 'construction':
      return 'construction';
    case 'renovation':
      return 'rénovation';
    case 'extension':
      return 'extension';
    default:
      return projectType;
  }
};
