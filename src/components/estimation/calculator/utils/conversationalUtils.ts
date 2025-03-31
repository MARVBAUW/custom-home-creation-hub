import { FormData } from '../types';

/**
 * Analyzes user input to extract intent and information
 */
export const analyzeUserIntent = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('construction') || lowerMessage.includes('construire')) {
    return 'construction';
  } else if (lowerMessage.includes('rénovation') || lowerMessage.includes('rénover')) {
    return 'renovation';
  } else if (lowerMessage.includes('extension') || lowerMessage.includes('agrandir')) {
    return 'extension';
  } else if (lowerMessage.includes('terrain')) {
    return 'terrain';
  } else if (lowerMessage.includes('budget') || lowerMessage.includes('coût') || lowerMessage.includes('prix')) {
    return 'budget';
  } else if (lowerMessage.includes('surface') || lowerMessage.includes('m2') || lowerMessage.includes('m²')) {
    return 'surface';
  } else if (lowerMessage.includes('maison') || lowerMessage.includes('villa')) {
    return 'maison';
  } else if (lowerMessage.includes('appartement')) {
    return 'appartement';
  } else {
    return 'general';
  }
};

/**
 * Extracts information from user message
 */
export const extractInformation = (message: string): Partial<FormData> => {
  const result: Partial<FormData> = {};
  
  // Extract surface
  const surfaceMatch = message.match(/(\d+)\s*m[²2]/i);
  if (surfaceMatch && surfaceMatch[1]) {
    result.surface = parseInt(surfaceMatch[1], 10);
  }
  
  // Extract city/location
  const cityMatches = [
    /à\s+([A-Za-zÀ-ÖØ-öø-ÿ\s-]+?)(?:\s+\d|,|\.|\s+et|\s+ou|$)/i,
    /sur\s+([A-Za-zÀ-ÖØ-öø-ÿ\s-]+?)(?:\s+\d|,|\.|\s+et|\s+ou|$)/i,
    /dans\s+([A-Za-zÀ-ÖØ-öø-ÿ\s-]+?)(?:\s+\d|,|\.|\s+et|\s+ou|$)/i
  ];
  
  for (const pattern of cityMatches) {
    const match = message.match(pattern);
    if (match && match[1] && match[1].length > 2) {
      result.city = match[1].trim();
      break;
    }
  }
  
  // Extract project type
  if (message.toLowerCase().includes('construction')) {
    result.projectType = 'construction';
  } else if (message.toLowerCase().includes('rénovation') || message.toLowerCase().includes('renovation')) {
    result.projectType = 'renovation';
  } else if (message.toLowerCase().includes('extension')) {
    result.projectType = 'extension';
  }
  
  // Extract budget
  const budgetMatch = message.match(/(\d+(?:\s*\d+)*)\s*(?:€|euros)/i);
  if (budgetMatch && budgetMatch[1]) {
    const budgetStr = budgetMatch[1].replace(/\s/g, '');
    result.budget = parseInt(budgetStr, 10);
  }
  
  return result;
};

/**
 * Extracts form data from the user message and merges with existing form data
 */
export const extractFormDataFromMessage = (message: string, existingData: FormData): Partial<FormData> => {
  const extractedData = extractInformation(message);
  
  // We don't want to override existing data with undefined values
  const result: Partial<FormData> = {};
  
  // Only include properties that were extracted
  Object.keys(extractedData).forEach(key => {
    if (extractedData[key as keyof FormData] !== undefined) {
      result[key as keyof FormData] = extractedData[key as keyof FormData];
    }
  });
  
  return result;
};

/**
 * Generates a meaningful response based on the form data
 */
export const generateResponse = (formData: Partial<FormData>): string => {
  if (!formData || Object.keys(formData).length === 0) {
    return "Bonjour ! Je suis l'assistant d'estimation de Progineer. Comment puis-je vous aider aujourd'hui ?";
  }
  
  let response = "D'après ce que je comprends, ";
  
  if (formData.projectType) {
    const projectTypes: Record<string, string> = {
      'construction': 'la construction d\'un bien neuf',
      'renovation': 'la rénovation d\'un bien existant',
      'extension': 'l\'extension d\'un bien existant'
    };
    response += `vous êtes intéressé par ${projectTypes[formData.projectType] || 'un projet de construction'} `;
  } else {
    response += "vous êtes intéressé par un projet immobilier ";
  }
  
  if (formData.surface) {
    response += `d'une surface d'environ ${formData.surface} m² `;
  }
  
  if (formData.city) {
    response += `situé à ${formData.city} `;
  }
  
  if (formData.budget) {
    response += `avec un budget d'environ ${formData.budget.toLocaleString('fr-FR')} € `;
  }
  
  response += ".\n\nPour affiner votre estimation, pourriez-vous me préciser d'autres détails comme le nombre de pièces, le niveau de finition souhaité ou si vous avez des besoins spécifiques ?";
  
  return response;
};

/**
 * Generates a conversational response based on user input and existing form data
 */
export const generateConversationalResponse = (userInput: string, formData: FormData): string => {
  // First, analyze the user's intent
  const intent = analyzeUserIntent(userInput);
  
  // Generate a personalized response based on the intent and extracted data
  switch (intent) {
    case 'construction':
      return "Je comprends que vous êtes intéressé par un projet de construction. Pour vous fournir une estimation précise, pourriez-vous me préciser la surface approximative et la localisation de votre projet ?";
    
    case 'renovation':
      return "Pour votre projet de rénovation, il me faudrait quelques détails supplémentaires. Quelle est la surface à rénover et quels types de travaux envisagez-vous (cuisine, salle de bain, rénovation complète) ?";
    
    case 'extension':
      return "Une extension est un excellent moyen d'agrandir votre espace de vie. Quelle surface d'extension envisagez-vous et quel type d'espace souhaitez-vous créer (chambre supplémentaire, cuisine, salon) ?";
    
    case 'budget':
      if (formData.budget) {
        return `Votre budget de ${formData.budget.toLocaleString('fr-FR')} € est noté. Pour vous proposer des solutions adaptées, pourriez-vous me préciser le type de projet et la surface envisagée ?`;
      } else {
        return "Pour vous aider à établir un budget, pourriez-vous me donner une idée du type de projet et de la surface envisagée ?";
      }
    
    case 'surface':
      if (formData.surface) {
        return `J'ai bien noté une surface de ${formData.surface} m². Quel type de projet envisagez-vous pour cette surface (construction, rénovation, extension) ?`;
      } else {
        return "La surface est un élément important pour l'estimation. Quelle surface approximative envisagez-vous pour votre projet ?";
      }
    
    case 'terrain':
      return "Concernant le terrain, disposez-vous déjà d'un terrain ou êtes-vous en recherche ? Si vous avez un terrain, connaissez-vous sa superficie et sa localisation ?";
    
    default:
      // If we have enough information, generate a summary response
      if (Object.keys(formData).length > 2) {
        return generateResponse(formData);
      }
      
      // Otherwise, ask for more information
      return "Pour vous fournir une estimation précise, j'aurais besoin de quelques informations supplémentaires. Pouvez-vous me préciser le type de projet (construction, rénovation, extension), la surface approximative et la localisation ?";
  }
};
