
import { EstimationFormData } from "../types";

/**
 * Analyzes user input to extract intents and entities
 * @param input - The user's text input
 * @returns An object containing the detected intent and entities
 */
export interface ExtractedInfo {
  intent: string;
  entities: {
    [key: string]: any;
  };
}

export const analyzeUserIntent = (input: string): ExtractedInfo => {
  const lowerInput = input.toLowerCase();
  const result: ExtractedInfo = {
    intent: 'unknown',
    entities: {}
  };
  
  // Detect intent based on keywords
  if (lowerInput.includes('particulier') || lowerInput.includes('individuel')) {
    result.intent = 'client_type';
    result.entities.client_type = 'individual';
  } 
  else if (lowerInput.includes('professionnel') || lowerInput.includes('entreprise')) {
    result.intent = 'client_type';
    result.entities.client_type = 'professional';
  }
  else if (lowerInput.includes('construction') || lowerInput.includes('maison') || lowerInput.includes('neuve')) {
    result.intent = 'project_type';
    result.entities.project_type = 'construction';
  }
  else if (lowerInput.includes('rénov') || lowerInput.includes('renov')) {
    result.intent = 'project_type';
    result.entities.project_type = 'renovation';
  }
  else if (lowerInput.includes('extension') || lowerInput.includes('agrandissement')) {
    result.intent = 'project_type';
    result.entities.project_type = 'extension';
  }
  else if (lowerInput.includes('budget')) {
    result.intent = 'budget';
    // Extract budget amount
    const budgetMatch = lowerInput.match(/(\d+(?:[.,]\d+)?)\s*(?:k|€|euros?|mille)/i);
    if (budgetMatch) {
      let budget = parseFloat(budgetMatch[1].replace(',', '.'));
      // Handle k abbreviation for thousands
      if (lowerInput.includes('k') && budget < 1000) {
        budget *= 1000;
      }
      result.entities.budget = budget;
    }
  }
  
  // Extract surface information
  const surfaceMatch = lowerInput.match(/(\d+(?:[.,]\d+)?)\s*m(?:ètres?)?(?:\s*carrés?)?(?:\s*²)?/i);
  if (surfaceMatch) {
    result.entities.surface = parseFloat(surfaceMatch[1].replace(',', '.'));
    if (!result.intent || result.intent === 'unknown') {
      result.intent = 'surface';
    }
  }
  
  // Extract location information
  const locationMatch = lowerInput.match(/à\s+([a-zA-Z\-\s]+)/) || lowerInput.match(/sur\s+([a-zA-Z\-\s]+)/);
  if (locationMatch) {
    result.entities.location = locationMatch[1].trim();
  }
  
  // Extract email
  const emailMatch = lowerInput.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    result.entities.email = emailMatch[0];
    if (!result.intent || result.intent === 'unknown') {
      result.intent = 'contact';
    }
  }
  
  // Extract phone number
  const phoneMatch = lowerInput.match(/(?:0|\+33|0033)[1-9](?:[\s.-]?\d{2}){4}/);
  if (phoneMatch) {
    result.entities.phone = phoneMatch[0];
    if (!result.intent || result.intent === 'unknown') {
      result.intent = 'contact';
    }
  }
  
  return result;
};
