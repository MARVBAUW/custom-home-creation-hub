
import { EstimationFormData } from '../types/estimationFormData';
import { ExtractedInfo } from '../types/conversationalTypes';

/**
 * Analyzes the user intent from their message
 * @param input The user's message
 * @returns Analysis results including intent and entities
 */
export const analyzeUserIntent = (input: string): ExtractedInfo => {
  const intent = determineIntent(input);
  const entities = extractEntities(input);
  
  return { intent, entities };
};

/**
 * Determines the intent behind the user's message
 * @param input The user's message
 * @returns The detected intent
 */
const determineIntent = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('construire') || lowerInput.includes('maison') || lowerInput.includes('construction')) {
    return 'construction_intent';
  } else if (lowerInput.includes('renover') || lowerInput.includes('rénovation') || lowerInput.includes('renovation')) {
    return 'renovation_intent';
  } else if (lowerInput.includes('extension') || lowerInput.includes('agrandir')) {
    return 'extension_intent';
  } else if (lowerInput.includes('budget') || lowerInput.includes('coût') || lowerInput.includes('prix') || lowerInput.includes('cout')) {
    return 'budget_intent';
  } else if (lowerInput.includes('terrain') || lowerInput.includes('land')) {
    return 'terrain_intent';
  } else if (lowerInput.includes('question') || lowerInput.includes('aide') || lowerInput.includes('help')) {
    return 'help_intent';
  }
  
  return 'unknown_intent';
};

/**
 * Extracts entities from the user's message
 * @param input The user's message
 * @returns Extracted entities
 */
const extractEntities = (input: string): { [key: string]: any } => {
  const entities: { [key: string]: any } = {};
  
  // Extract surface area
  const surfaceMatch = input.match(/(\d+)\s*m²|(\d+)\s*m2|(\d+)\s*mètres? carrés?|(\d+)\s*metres? carres?/i);
  if (surfaceMatch) {
    const surfaceValue = surfaceMatch[1] || surfaceMatch[2] || surfaceMatch[3] || surfaceMatch[4];
    entities.surface = parseInt(surfaceValue, 10);
  }
  
  // Extract budget
  const budgetMatch = input.match(/(\d+)\s*(k€|k\s?€|k|mille|mill|000|€|euros?)/i);
  if (budgetMatch) {
    let budgetValue = parseInt(budgetMatch[1], 10);
    const unit = budgetMatch[2].toLowerCase();
    
    if (unit.includes('k') || unit.includes('mille') || unit.includes('mill')) {
      budgetValue *= 1000;
    }
    
    entities.budget = budgetValue;
  }
  
  // Extract location
  const cities = ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille'];
  for (const city of cities) {
    if (input.includes(city)) {
      entities.city = city;
      break;
    }
  }
  
  return entities;
};

/**
 * Extracts form data from the user's message
 * @param input The user's message
 * @param currentData Current form data
 * @returns Updated form data
 */
export const extractFormDataFromMessage = (
  input: string,
  currentData: EstimationFormData
): Partial<EstimationFormData> => {
  const extractedData: Partial<EstimationFormData> = {};
  const { intent, entities } = analyzeUserIntent(input);
  
  // Transfer extracted entities to form data
  if (entities.surface) {
    extractedData.surface = entities.surface;
  }
  
  if (entities.city) {
    extractedData.city = entities.city;
  }
  
  if (entities.budget) {
    extractedData.budget = entities.budget;
  }
  
  // Set project type based on intent
  if (intent === 'construction_intent') {
    extractedData.projectType = 'construction';
  } else if (intent === 'renovation_intent') {
    extractedData.projectType = 'renovation';
  } else if (intent === 'extension_intent') {
    extractedData.projectType = 'extension';
  }
  
  // Analyze for more specific details
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('maison individuelle') || lowerInput.includes('pavillon')) {
    extractedData.constructionType = 'individual';
  } else if (lowerInput.includes('appartement') || lowerInput.includes('flat')) {
    extractedData.constructionType = 'apartment';
  }
  
  if (lowerInput.includes('moderne') || lowerInput.includes('contemporain')) {
    extractedData.constructionStyle = 'modern';
  } else if (lowerInput.includes('traditionnel') || lowerInput.includes('classique')) {
    extractedData.constructionStyle = 'traditional';
  }
  
  return extractedData;
};

/**
 * Generates a response based on the conversation context
 * @param input User's input
 * @param formData Current form data
 * @returns Generated response
 */
export const generateConversationalResponse = (
  input: string,
  formData: EstimationFormData
): string => {
  const { intent, entities } = analyzeUserIntent(input);
  const lowerInput = input.toLowerCase();
  
  // Check if we have some basic form data to personalize the response
  if (formData.projectType === 'construction' && formData.surface) {
    return `Pour votre projet de construction de ${formData.surface}m², nous allons avoir besoin de quelques détails supplémentaires. Pouvez-vous me préciser le style architectural que vous recherchez ?`;
  }
  
  if (formData.projectType === 'renovation' && formData.surface) {
    return `Pour votre projet de rénovation de ${formData.surface}m², pourriez-vous me préciser l'âge approximatif du bâtiment et les principaux travaux envisagés ?`;
  }
  
  if (intent === 'budget_intent') {
    return `Pour établir un budget précis, j'ai besoin de connaître la surface de votre projet et sa localisation. Pouvez-vous me donner ces informations ?`;
  }
  
  if (intent === 'terrain_intent') {
    return `Concernant votre terrain, pouvez-vous me préciser sa surface et sa configuration (plat, en pente, etc.) ?`;
  }
  
  // Default responses based on intent
  switch (intent) {
    case 'construction_intent':
      return "Pour votre projet de construction, quelle surface habitable envisagez-vous ?";
    case 'renovation_intent':
      return "Pour votre projet de rénovation, quelle est la surface concernée ?";
    case 'extension_intent':
      return "Pour votre projet d'extension, quelle surface supplémentaire souhaitez-vous ajouter ?";
    case 'help_intent':
      return "Je suis là pour vous aider à estimer votre projet. Vous pouvez me parler de votre projet de construction, rénovation ou extension, en précisant la surface, le style et votre budget approximatif.";
    default:
      return "Bonjour ! Je suis l'assistant d'estimation Progineer. Parlez-moi de votre projet de construction ou rénovation pour que je puisse vous aider à l'estimer.";
  }
};
