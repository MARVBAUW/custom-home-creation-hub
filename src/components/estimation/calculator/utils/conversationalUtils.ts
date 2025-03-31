
import { EstimationFormData } from '../types/estimationFormData';

// Exporter les fonctions du MessageProcessor pour les rendre disponibles
export { analyzeUserIntent, extractFormDataFromMessage } from '../components/conversational/MessageProcessor';

// Fonction pour générer une réponse basée sur les données du formulaire
export const generateResponse = (formData: EstimationFormData): string => {
  // Si nous n'avons pas encore de données, donner une réponse générique
  if (!formData || Object.keys(formData).length === 0) {
    return "Bonjour ! Je suis l'assistant d'estimation de Progineer. Comment puis-je vous aider avec votre projet de construction ou rénovation ?";
  }

  // Si nous connaissons le type de projet
  if (formData.projectType) {
    // Si nous n'avons pas encore la surface
    if (!formData.surface) {
      return `Pour votre projet de ${getProjectTypeLabel(formData.projectType)}, quelle superficie envisagez-vous ? (en m²)`;
    }
    
    // Si nous avons la surface mais pas le budget
    if (formData.surface && !formData.budget) {
      return `Pour votre projet de ${getProjectTypeLabel(formData.projectType)} de ${formData.surface} m², quel est votre budget approximatif ?`;
    }
    
    // Si nous avons la surface et le budget mais pas la localisation
    if (formData.surface && formData.budget && !formData.city) {
      return `Merci pour ces informations. Où se situe votre projet ? (ville ou département)`;
    }
    
    // Si nous avons la surface, le budget et la localisation
    if (formData.surface && formData.budget && formData.city) {
      // Si nous n'avons pas encore les informations sur les pièces
      if (!formData.bedrooms && !formData.bathrooms) {
        return `Votre projet à ${formData.city} prend forme. Combien de chambres et de salles de bain souhaitez-vous ?`;
      }
      
      // Si nous avons toutes les informations principales
      return `D'après les informations que vous m'avez fournies :
      - Type de projet : ${getProjectTypeLabel(formData.projectType)}
      - Surface : ${formData.surface} m²
      - Localisation : ${formData.city}
      - Budget : ${formData.budget.toLocaleString('fr-FR')} €
      ${formData.bedrooms ? `- Nombre de chambres : ${formData.bedrooms}` : ''}
      ${formData.bathrooms ? `- Nombre de salles de bain : ${formData.bathrooms}` : ''}
      
      Je peux maintenant calculer une estimation plus précise. Souhaitez-vous des précisions sur d'autres aspects du projet ?`;
    }
  } else {
    // Si nous ne connaissons pas encore le type de projet
    return "Pour vous aider au mieux, pourriez-vous me préciser quel type de projet vous envisagez ? (construction, rénovation ou extension)";
  }
  
  // Réponse par défaut si aucune condition n'est remplie
  return "Merci pour ces informations. Y a-t-il d'autres détails que vous souhaiteriez me communiquer sur votre projet ?";
};

// Fonction pour extraire les informations du message
export const extractInformation = (message: string): Partial<EstimationFormData> => {
  return extractFormDataFromMessage(message, {} as EstimationFormData);
};

// Fonction utilitaire pour obtenir le libellé du type de projet
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
