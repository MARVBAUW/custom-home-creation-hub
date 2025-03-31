
// Import necessary types
import { FormData, ExtractedInfo } from '../types';

/**
 * Analyzes the user's input to determine intent
 * @param input The user input message
 * @returns Analysis object with intent and confidence
 */
export const analyzeUserIntent = (input: string) => {
  const intents = {
    projectTypeIntent: /\b(maison|appartement|villa|construction|rénov|renov|extension)\b/i,
    surfaceIntent: /\b(\d+)\s*m²|\b(\d+)\s*m2|\b(\d+)\s*metres?( carré)?/i,
    locationIntent: /\b(ville|region|département|departement|à|a)\s+([A-Za-zÀ-ÖØ-öø-ÿ\s-]+)\b/i,
    budgetIntent: /\b(\d+)\s*(euros?|€|k€)/i,
    timelineIntent: /\b(délai|debut|début|commencer|commenc|finir|fin|termin|livraison)\b/i,
    contactIntent: /\b(contact|email|téléphone|telephone|appele|appeler|rendez-vous|rencontr|rdv)\b/i
  };

  const analysis = {
    projectType: null as string | null,
    surface: null as number | null,
    location: null as string | null,
    budget: null as number | null,
    timeline: false,
    contact: false
  };

  // Analyze project type
  const projectTypeMatch = input.match(intents.projectTypeIntent);
  if (projectTypeMatch) {
    const match = projectTypeMatch[0].toLowerCase();
    if (match.includes('maison') || match.includes('villa')) {
      analysis.projectType = 'construction';
    } else if (match.includes('appartement')) {
      analysis.projectType = 'apartment';
    } else if (match.includes('rénov') || match.includes('renov')) {
      analysis.projectType = 'renovation';
    } else if (match.includes('extension')) {
      analysis.projectType = 'extension';
    } else {
      analysis.projectType = 'construction';
    }
  }

  // Analyze surface
  const surfaceMatch = input.match(intents.surfaceIntent);
  if (surfaceMatch) {
    const surface = parseInt(surfaceMatch[1] || surfaceMatch[2] || surfaceMatch[3], 10);
    if (!isNaN(surface)) {
      analysis.surface = surface;
    }
  }

  // Analyze location
  const locationMatch = input.match(intents.locationIntent);
  if (locationMatch && locationMatch[2]) {
    analysis.location = locationMatch[2].trim();
  }

  // Analyze budget
  const budgetMatch = input.match(intents.budgetIntent);
  if (budgetMatch) {
    let budget = parseInt(budgetMatch[1], 10);
    const unit = budgetMatch[2].toLowerCase();
    
    // Convert k€ to euros
    if (unit.includes('k')) {
      budget *= 1000;
    }
    
    if (!isNaN(budget)) {
      analysis.budget = budget;
    }
  }

  // Check for timeline and contact intents
  analysis.timeline = intents.timelineIntent.test(input);
  analysis.contact = intents.contactIntent.test(input);

  return analysis;
};

/**
 * Extracts form data from user message
 * @param message The user input message
 * @param existingData Current form data
 * @returns Updated form data
 */
export const extractFormDataFromMessage = (message: string, existingData: FormData): Partial<FormData> => {
  const updatedData: Partial<FormData> = {};
  const analysis = analyzeUserIntent(message);

  // Update project type if detected
  if (analysis.projectType) {
    updatedData.projectType = analysis.projectType;
  }

  // Update surface if detected
  if (analysis.surface) {
    updatedData.surface = analysis.surface;
  }

  // Update location/city if detected
  if (analysis.location) {
    updatedData.city = analysis.location;
  }

  // Extract common patterns
  if (message.toLowerCase().includes('terrain inclus') || message.toLowerCase().includes('avec terrain')) {
    updatedData.landIncluded = 'yes';
  } else if (message.toLowerCase().includes('sans terrain') || message.toLowerCase().includes('terrain non inclus')) {
    updatedData.landIncluded = 'no';
  }

  if (message.toLowerCase().includes('particulier')) {
    updatedData.clientType = 'individual';
  } else if (message.toLowerCase().includes('professionnel')) {
    updatedData.clientType = 'professional';
  }

  // Return updated data
  return updatedData;
};

/**
 * Generates a conversational response based on the extracted information
 * @param extractedInfo The information extracted from the user's message
 * @returns A conversational response
 */
export const generateConversationalResponse = (extractedInfo: ExtractedInfo): string => {
  const { projectType, surface, city, budget, otherDetails } = extractedInfo;
  
  let response = "D'après ce que je comprends, ";
  
  if (projectType) {
    if (projectType === 'construction') {
      response += "vous souhaitez construire une maison";
    } else if (projectType === 'renovation') {
      response += "vous souhaitez rénover un bien";
    } else if (projectType === 'extension') {
      response += "vous envisagez une extension";
    } else {
      response += `vous avez un projet de ${projectType}`;
    }
    
    if (surface) {
      response += ` d'une surface de ${surface} m²`;
    }
    
    if (city) {
      response += ` à ${city}`;
    }
    
    if (budget) {
      response += ` avec un budget d'environ ${budget.toLocaleString('fr-FR')} €`;
    }
    
    response += ". ";
  } else {
    response = "Pourriez-vous me préciser le type de projet que vous envisagez ? S'agit-il d'une construction neuve, d'une rénovation ou d'une extension ?";
  }
  
  response += "\n\nPour affiner votre estimation, j'aurais besoin de quelques informations supplémentaires.";
  
  return response;
};
