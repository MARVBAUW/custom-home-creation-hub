
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
