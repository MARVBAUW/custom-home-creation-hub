
/**
 * Informations extraites d'une entrée utilisateur
 */
export interface ExtractedInfo {
  entities: {
    project_type?: string;
    surface?: number;
    location?: string;
    rooms?: number;
    floors?: number;
    quality?: string;
    has_terrain?: boolean;
    terrain_price?: number;
    budget?: number;
    email?: string;
    phone?: string;
  };
  intent: string;
  confidence: number;
}

/**
 * Analyse l'intention de l'utilisateur en fonction de son message
 * @param userInput Message de l'utilisateur
 * @returns Information extraite du message
 */
export const analyzeUserIntent = (userInput: string): ExtractedInfo => {
  const entities: any = {};
  const input = userInput.toLowerCase();
  
  // Détecter le type de projet
  if (input.includes('construction') || input.includes('construire') || input.includes('bâtir') || input.includes('faire construire')) {
    entities.project_type = 'construction';
  } else if (input.includes('rénovation') || input.includes('rénover') || input.includes('réhabiliter')) {
    entities.project_type = 'renovation';
  } else if (input.includes('extension') || input.includes('agrandir') || input.includes('agrandissement')) {
    entities.project_type = 'extension';
  }
  
  // Détecter la surface
  const surfaceRegex = /(\d+)\s*m²|(\d+)\s*m2|(\d+)\s*mètres carrés|(\d+)\s*metres carres/;
  const surfaceMatch = input.match(surfaceRegex);
  if (surfaceMatch) {
    const surfaceValue = parseInt(surfaceMatch[1] || surfaceMatch[2] || surfaceMatch[3] || surfaceMatch[4]);
    entities.surface = surfaceValue;
  }
  
  // Détecter la localisation (villes françaises courantes)
  const cityRegex = /\b(paris|marseille|lyon|toulouse|nice|nantes|strasbourg|montpellier|bordeaux|lille|aix|toulon|rennes|grenoble|angers|dijon|brest|le mans|amiens|caen|annecy|perpignan|besançon|calais|cannes|saint-étienne|arles|avignon)\b/i;
  const cityMatch = input.match(cityRegex);
  if (cityMatch) {
    entities.location = cityMatch[0].charAt(0).toUpperCase() + cityMatch[0].slice(1);
  }
  
  // Détecter le nombre de chambres
  const roomsRegex = /(\d+)\s*(chambres?|pieces?|pièces?)/;
  const roomsMatch = input.match(roomsRegex);
  if (roomsMatch) {
    entities.rooms = parseInt(roomsMatch[1]);
  }
  
  // Détecter le nombre d'étages
  const floorsRegex = /(\d+)\s*(étages?|etages?|niveaux?)|plain[ -]pied|rez[ -]de[ -]chaussée/;
  const floorsMatch = input.match(floorsRegex);
  if (floorsMatch) {
    if (input.includes('plain-pied') || input.includes('plain pied') || input.includes('rez-de-chaussée') || input.includes('rez de chaussée')) {
      entities.floors = 1;
    } else if (floorsMatch[1]) {
      entities.floors = parseInt(floorsMatch[1]);
    }
  }
  
  // Détecter le niveau de qualité
  if (input.includes('haut de gamme') || input.includes('luxe') || input.includes('prestige') || input.includes('premium')) {
    entities.quality = 'premium';
  } else if (input.includes('standard') || input.includes('moyen') || input.includes('normal')) {
    entities.quality = 'standard';
  } else if (input.includes('économique') || input.includes('bas de gamme') || input.includes('budget')) {
    entities.quality = 'economy';
  }
  
  // Détecter si terrain mentionné
  if (input.includes('terrain') || input.includes('parcelle') || input.includes('lot')) {
    entities.has_terrain = true;
    
    // Détecter le prix du terrain
    const terrainPriceRegex = /terrain(\s*de|\s*à|\s*pour|\s*:)?\s*(\d+)(\s*k|\s*€|\s*euros)/i;
    const terrainPriceMatch = input.match(terrainPriceRegex);
    if (terrainPriceMatch) {
      let price = parseInt(terrainPriceMatch[2]);
      if (terrainPriceMatch[3] && terrainPriceMatch[3].includes('k')) {
        price *= 1000;
      }
      entities.terrain_price = price;
    }
  }
  
  // Détecter le budget
  const budgetRegex = /budget(\s*de|\s*:)?\s*(\d+)(\s*k|\s*K|\s*€|\s*euros|\s*euro)/i;
  const budgetMatch = input.match(budgetRegex);
  if (budgetMatch) {
    let budget = parseInt(budgetMatch[2]);
    if (budgetMatch[3] && (budgetMatch[3].includes('k') || budgetMatch[3].includes('K'))) {
      budget *= 1000;
    }
    entities.budget = budget;
  }
  
  // Détecter l'email
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailMatch = input.match(emailRegex);
  if (emailMatch) {
    entities.email = emailMatch[0];
  }
  
  // Détecter le téléphone (format français)
  const phoneRegex = /(?:0|\+33|0033)[1-9](?:[\s.-]?[0-9]{2}){4}/;
  const phoneMatch = input.match(phoneRegex);
  if (phoneMatch) {
    entities.phone = phoneMatch[0];
  }
  
  return {
    entities,
    intent: 'estimate_project',
    confidence: 0.9
  };
};
