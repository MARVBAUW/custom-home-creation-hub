
import { FormData, ExtractedInfo } from '../types';

/**
 * Extracts form data from user message using NLP techniques
 * @param message The user's message text
 * @returns ExtractedInfo object with form data fields
 */
export const extractFormDataFromMessage = (message: string): ExtractedInfo => {
  const extractedInfo: ExtractedInfo = {};
  
  // Extract project type
  if (message.toLowerCase().includes('construction') || message.toLowerCase().includes('maison')) {
    extractedInfo.projectType = 'construction';
  } else if (message.toLowerCase().includes('rénovation') || message.toLowerCase().includes('renovation')) {
    extractedInfo.projectType = 'renovation';
  } else if (message.toLowerCase().includes('extension')) {
    extractedInfo.projectType = 'extension';
  }
  
  // Extract surface area
  const surfaceRegex = /(\d+)\s*m²/;
  const surfaceMatch = message.match(surfaceRegex);
  if (surfaceMatch && surfaceMatch[1]) {
    extractedInfo.surface = parseInt(surfaceMatch[1], 10);
  }
  
  // Extract budget
  const budgetRegex = /(\d+)\s*(k€|k euros|mille euros|000\s*€|000\s*euros)/i;
  const budgetMatch = message.match(budgetRegex);
  if (budgetMatch && budgetMatch[1]) {
    extractedInfo.budget = parseInt(budgetMatch[1], 10) * 1000;
  }
  
  const largeBudgetRegex = /(\d+(?:\.\d+)?)\s*(million|M€|M euros)/i;
  const largeBudgetMatch = message.match(largeBudgetRegex);
  if (largeBudgetMatch && largeBudgetMatch[1]) {
    extractedInfo.budget = parseFloat(largeBudgetMatch[1]) * 1000000;
  }
  
  // Extract location (city)
  const cities = ['marseille', 'nice', 'toulon', 'aix', 'cannes', 'antibes', 'monaco', 'montpellier', 'avignon', 'arles'];
  
  for (const city of cities) {
    if (message.toLowerCase().includes(city)) {
      extractedInfo.city = city.charAt(0).toUpperCase() + city.slice(1);
      break;
    }
  }
  
  return extractedInfo;
};

/**
 * Generate a conversational response to the user's message
 * @param message The user's message text
 * @param currentData Current form data
 * @returns AI response message
 */
export const generateConversationalResponse = (message: string, currentData: FormData): string => {
  // Determine what we're missing in the form data
  const missingInfo = [];
  
  if (!currentData.projectType) {
    missingInfo.push('type de projet (construction, rénovation, extension)');
  }
  
  if (!currentData.surface) {
    missingInfo.push('surface en m²');
  }
  
  if (!currentData.city) {
    missingInfo.push('ville ou localisation');
  }
  
  // Generate appropriate response
  if (missingInfo.length > 0) {
    return `Merci pour ces informations. Pour affiner mon estimation, pourriez-vous me préciser ${missingInfo.join(', ')} ?`;
  } else if (!currentData.budget) {
    return "Merci ! Pour définir les finitions et équipements adaptés, avez-vous un budget approximatif en tête ?";
  } else if (!currentData.complexity) {
    return "Parfait. Considérez-vous que votre projet est plutôt simple, standard ou complexe en termes de conception ?";
  } else {
    return "Merci pour toutes ces informations. Je peux maintenant vous proposer une estimation détaillée de votre projet. Vous pouvez voir les résultats dans l'onglet suivant.";
  }
};

/**
 * Process the user's conversational input and update form data
 * @param input The user's input text
 * @param currentData Current form data
 * @returns Updated form data
 */
export const processConversationalInput = (input: string, currentData: FormData): Partial<FormData> => {
  const extractedInfo = extractFormDataFromMessage(input);
  return { ...extractedInfo };
};
