
// Utility functions for the conversational UI

import { ExtractedInfo } from '../types/conversationalTypes';

/**
 * Analyzes user input to extract intent and entities
 */
export const analyzeUserIntent = (input: string): ExtractedInfo => {
  const lowerInput = input.toLowerCase();
  const result: ExtractedInfo = {
    intent: 'unknown',
    entities: {}
  };
  
  // Extract project type
  if (lowerInput.includes('construction') || lowerInput.includes('maison') || lowerInput.includes('neuf')) {
    result.intent = 'project_info';
    result.entities.project_type = 'construction';
  } else if (lowerInput.includes('rénovation') || lowerInput.includes('renovation')) {
    result.intent = 'project_info';
    result.entities.project_type = 'renovation';
  } else if (lowerInput.includes('extension') || lowerInput.includes('agrandissement')) {
    result.intent = 'project_info';
    result.entities.project_type = 'extension';
  }
  
  // Extract surface
  const surfaceMatch = lowerInput.match(/(\d+)\s*m[²2]/);
  if (surfaceMatch && surfaceMatch[1]) {
    result.entities.surface = parseInt(surfaceMatch[1]);
  }
  
  // Extract budget
  const budgetMatch = lowerInput.match(/(\d+[\s\d]*)\s*(€|euros|k€|k euros)/);
  if (budgetMatch && budgetMatch[1]) {
    let budget = parseInt(budgetMatch[1].replace(/\s/g, ''));
    if (lowerInput.includes('k€') || lowerInput.includes('k euros')) {
      budget *= 1000;
    }
    result.entities.budget = budget;
  }
  
  // Extract location
  const cities = ['paris', 'lyon', 'marseille', 'nice', 'toulouse', 'bordeaux', 'lille'];
  for (const city of cities) {
    if (lowerInput.includes(city)) {
      result.entities.location = city.charAt(0).toUpperCase() + city.slice(1);
      break;
    }
  }
  
  // Extract number of rooms, bedrooms, etc.
  const roomsMatch = lowerInput.match(/(\d+)\s*(?:pièces|pieces)/);
  if (roomsMatch && roomsMatch[1]) {
    result.entities.rooms = parseInt(roomsMatch[1]);
  }
  
  const bedroomsMatch = lowerInput.match(/(\d+)\s*(?:chambres)/);
  if (bedroomsMatch && bedroomsMatch[1]) {
    result.entities.bedrooms = parseInt(bedroomsMatch[1]);
  }
  
  // Extract number of floors
  const floorsMatch = lowerInput.match(/(\d+)\s*(?:étages|etages|niveaux)/);
  if (floorsMatch && floorsMatch[1]) {
    result.entities.floors = parseInt(floorsMatch[1]);
  }
  
  // Extract quality level
  if (lowerInput.includes('luxe') || lowerInput.includes('premium') || lowerInput.includes('haut de gamme')) {
    result.entities.quality = 'luxury';
  } else if (lowerInput.includes('standard') || lowerInput.includes('moyen')) {
    result.entities.quality = 'standard';
  } else if (lowerInput.includes('économique') || lowerInput.includes('economique') || lowerInput.includes('basique')) {
    result.entities.quality = 'economic';
  }
  
  // Extract email if present
  const emailMatch = lowerInput.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    result.entities.email = emailMatch[0];
  }
  
  // Extract phone number if present
  const phoneMatch = lowerInput.match(/(?:0|\+33|0033)[1-9](?:[\s.-]?[0-9]{2}){4}/);
  if (phoneMatch) {
    result.entities.phone = phoneMatch[0];
  }
  
  return result;
};

/**
 * Generates a response based on the conversation state and user input
 */
export const generateResponse = (
  userInput: string, 
  conversationState: any, 
  formData: FormData
): { message: string; suggestedNextQuestion?: string } => {
  // This is a placeholder - in a real implementation this might call an API or use a more sophisticated algorithm
  
  // Default response if nothing else matches
  let response = {
    message: "Je ne suis pas sûr de comprendre. Pouvez-vous me donner plus de détails sur votre projet ?",
    suggestedNextQuestion: "Quelle est la surface approximative de votre projet ?"
  };
  
  const analysis = analyzeUserIntent(userInput);
  
  if (analysis.intent === 'project_info') {
    if (analysis.entities.project_type) {
      response.message = `Je vois que vous êtes intéressé par un projet de ${analysis.entities.project_type}.`;
      
      if (!formData.surface) {
        response.suggestedNextQuestion = "Quelle serait la surface approximative ?";
      } else if (!formData.city) {
        response.suggestedNextQuestion = "Dans quelle ville se situe votre projet ?";
      }
    }
  }
  
  return response;
};
