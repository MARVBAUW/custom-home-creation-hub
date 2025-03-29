import { FormData } from '../types';

// Types pour l'analyse des intentions
export type IntentType = 
  | 'project_type'
  | 'location'
  | 'dimensions'
  | 'budget'
  | 'quality'
  | 'terrain'
  | 'materials'
  | 'timeline'
  | 'features'
  | 'contact'
  | 'help'
  | 'unknown';

// Interface pour les informations extraites
export interface ExtractedInfo {
  intent: IntentType;
  confidence: number;
  entities: {
    project_type?: string;
    location?: string;
    surface?: number;
    budget?: number;
    quality?: string;
    terrain_price?: number;
    has_terrain?: boolean;
    materials?: string[];
    timeline?: string;
    features?: string[];
    email?: string;
    phone?: string;
  };
}

// Expressions régulières pour l'extraction d'informations
const INTENT_PATTERNS = {
  project_type: /construction|maison|bâtir|bâtiment|immeuble|rénov|réhabilit|restaur|réaménag|extens|agrandis|ajout|annexe|surélév|projet/i,
  location: /ville|région|région|departement|où|localisation|localité/i,
  dimensions: /surface|m2|m²|mètre|metre|superficie|taille|dimension/i,
  budget: /prix|coût|cout|budget|montant|euros|€|financement|prêt|emprunt/i,
  quality: /qualité|finition|gamme|standing|luxe|premium|basique|standard|niveau/i,
  terrain: /terrain|parcelle|lot|foncier|sol/i,
  materials: /matériau|béton|bois|brique|parpaing|acier|paille|pierre|structure|mur|charpente|toiture/i,
  timeline: /délai|temps|durée|mois|année|planning|calendrier|quand|combien de temps/i,
  features: /cuisine|salle de bain|chambre|salon|bureau|garage|piscine|terrasse|jardin|balcon|équipement/i,
  contact: /email|mail|e-mail|courriel|téléphone|contacter|contact|appeler/i,
  help: /aide|aidez|question|comment|expliquer|assistance|guide|pouvez-vous/i
};

// Fonction principale d'analyse d'intention
export const analyzeUserIntent = (input: string): ExtractedInfo => {
  // Résultat par défaut
  const result: ExtractedInfo = {
    intent: 'unknown',
    confidence: 0,
    entities: {}
  };
  
  // Analyser chaque type d'intention
  let highestConfidence = 0.3; // Seuil minimum pour considérer une intention
  
  for (const [intent, pattern] of Object.entries(INTENT_PATTERNS)) {
    const matches = input.match(pattern);
    if (matches) {
      const confidence = calculateConfidence(matches, input);
      if (confidence > highestConfidence) {
        highestConfidence = confidence;
        result.intent = intent as IntentType;
        result.confidence = confidence;
      }
    }
  }
  
  // Maintenant, extraire les entités spécifiques
  extractEntities(input, result);
  
  return result;
};

// Calculer la confiance en fonction des correspondances
const calculateConfidence = (matches: RegExpMatchArray, input: string): number => {
  const totalMatchLength = matches.reduce((acc, match) => acc + (match?.length || 0), 0);
  const inputLength = input.length;
  
  // Calculer la confiance basée sur la proportion de texte correspondant
  let confidence = Math.min(totalMatchLength / inputLength * 2, 0.8);
  
  // Améliorer la confiance si plusieurs correspondances
  if (matches.length > 1) {
    confidence += 0.1;
  }
  
  return Math.min(confidence, 0.9); // Maximum de 0.9 pour garder une marge d'erreur
};

// Extraire les entités spécifiques
const extractEntities = (input: string, result: ExtractedInfo) => {
  // Extraire le type de projet
  if (input.match(/construction neuve|construction|maison neuve|bâtir|neuf/i)) {
    result.entities.project_type = 'Construction neuve';
  } else if (input.match(/rénov|réhabilit|restaur|ancien/i)) {
    result.entities.project_type = 'Rénovation';
  } else if (input.match(/extension|agrandis|agrandi|ajout|annexe|surélev/i)) {
    result.entities.project_type = 'Extension';
  }
  
  // Extraire la surface
  const surfaceMatch = input.match(/(\d+)[\s]*(m²|m2|mètres?[\s]*carrés?|metres?[\s]*carres?)/i);
  if (surfaceMatch) {
    result.entities.surface = parseInt(surfaceMatch[1]);
  }
  
  // Extraire le budget
  const budgetMatch = input.match(/(\d+)[\s]*(€|euros|k€|k euros)/i);
  if (budgetMatch) {
    let budget = parseInt(budgetMatch[1].replace(/\s/g, ''));
    // Vérifier si le budget est en milliers (k€)
    if (budgetMatch[2].toLowerCase().includes('k')) {
      budget *= 1000;
    }
    result.entities.budget = budget;
  }
  
  // Extraire le niveau de qualité
  if (input.match(/premium|haut[\s-]*de[\s-]*gamme|luxe|luxueux|supérieure?/i)) {
    result.entities.quality = 'Premium (haut de gamme)';
  } else if (input.match(/standard|moyen|normal|milieu[\s-]*de[\s-]*gamme/i)) {
    result.entities.quality = 'Standard (qualité moyenne)';
  } else if (input.match(/basique|simple|entrée[\s-]*de[\s-]*gamme|économique/i)) {
    result.entities.quality = 'Basique (entrée de gamme)';
  }
  
  // Extraire les informations sur le terrain
  if (input.match(/terrain|parcelle/i)) {
    if (input.match(/j['e]\s*ai|possède|dispose|acquis|déjà|avec/i)) {
      result.entities.has_terrain = true;
      
      // Essayer d'extraire le prix du terrain
      const terrainPriceMatch = input.match(/terrain[\s\w]*(\d+)[\s]*(€|euros|k€|k euros)/i);
      if (terrainPriceMatch) {
        let price = parseInt(terrainPriceMatch[1].replace(/\s/g, ''));
        // Vérifier si le prix est en milliers (k€)
        if (terrainPriceMatch[2].toLowerCase().includes('k')) {
          price *= 1000;
        }
        result.entities.terrain_price = price;
      }
    } else if (input.match(/pas[\s]*de|sans|aucun|non/i)) {
      result.entities.has_terrain = false;
    }
  }
  
  // Extraire les matériaux
  const materialMatches = [];
  if (input.match(/béton|beton/i)) materialMatches.push('Béton');
  if (input.match(/bois/i)) materialMatches.push('Bois');
  if (input.match(/brique/i)) materialMatches.push('Briques');
  if (input.match(/parpaing/i)) materialMatches.push('Parpaings');
  if (input.match(/acier|métal|metal/i)) materialMatches.push('Métal');
  if (input.match(/pierre/i)) materialMatches.push('Pierre');
  
  if (materialMatches.length > 0) {
    result.entities.materials = materialMatches;
  }
  
  // Extraire l'email
  const emailMatch = input.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  if (emailMatch) {
    result.entities.email = emailMatch[0];
  }
  
  // Extraire le téléphone (format français)
  const phoneMatch = input.match(/0[1-9][\s.-]?(\d{2}[\s.-]?){4}/);
  if (phoneMatch) {
    result.entities.phone = phoneMatch[0].replace(/[\s.-]/g, '');
  }
};

// Générer une réponse personnalisée en fonction de l'analyse d'intention
export const generateSmartResponse = (
  analysis: ExtractedInfo,
  currentFormData: FormData
): string => {
  const { intent, entities } = analysis;
  
  // Vérifier ce que nous savons déjà et ce qui nous manque
  const knownInfo = {
    project_type: Boolean(currentFormData.projectType),
    location: Boolean(currentFormData.city),
    surface: Boolean(currentFormData.surface),
    quality: Boolean(currentFormData.finishLevel),
    terrain: currentFormData.hasLand !== undefined,
  };
  
  // Réponses possibles selon l'intention
  switch (intent) {
    case 'project_type':
      if (entities.project_type) {
        return `Je note que votre projet est une ${entities.project_type}. ${!knownInfo.location ? 'Où se situe ce projet ?' : !knownInfo.surface ? 'Quelle surface prévoyez-vous pour ce projet ?' : 'Pouvez-vous me donner plus de détails ?'}`;
      } else {
        return "Quel type de projet envisagez-vous ? Une construction neuve, une rénovation ou une extension ?";
      }
      
    case 'location':
      if (entities.location) {
        return `Le projet se situe à ${entities.location}. ${!knownInfo.surface ? 'Quelle surface prévoyez-vous ?' : !knownInfo.quality ? 'Quel niveau de finition souhaitez-vous ?' : 'Merci pour cette précision.'}`;
      } else {
        return "Dans quelle ville ou région se situe votre projet ?";
      }
      
    case 'dimensions':
      if (entities.surface) {
        return `${entities.surface} m², c'est noté. ${!knownInfo.quality ? 'Quel niveau de finition recherchez-vous (basique, standard ou premium) ?' : !knownInfo.terrain ? 'Avez-vous déjà un terrain pour ce projet ?' : 'Merci pour cette information.'}`;
      } else {
        return "Quelle surface en m² envisagez-vous pour votre projet ?";
      }
      
    case 'budget':
      if (entities.budget) {
        return `Je comprends que votre budget est d'environ ${entities.budget.toLocaleString('fr-FR')} €. Cela nous aidera à adapter l'estimation à vos moyens.`;
      } else {
        return "Avez-vous un budget approximatif pour ce projet ?";
      }
      
    case 'quality':
      if (entities.quality) {
        return `J'ai noté que vous souhaitez une finition de niveau ${entities.quality}. ${!knownInfo.terrain ? 'Disposez-vous déjà d'un terrain pour ce projet ?' : 'Merci pour cette précision.'}`;
      } else {
        return "Quel niveau de finition recherchez-vous ? Premium (haut de gamme), standard (qualité moyenne) ou basique (entrée de gamme) ?";
      }
      
    case 'terrain':
      if (entities.has_terrain !== undefined) {
        if (entities.has_terrain && entities.terrain_price) {
          return `Merci pour cette information. Vous possédez donc un terrain au prix de ${entities.terrain_price.toLocaleString('fr-FR')} €. Cela nous permettra de calculer le coût global de votre projet avec terrain.`;
        } else if (entities.has_terrain) {
          return "Vous avez déjà un terrain, c'est parfait. Connaissez-vous son prix d'acquisition pour que je puisse l'inclure dans mon estimation ?";
        } else {
          return "Vous n'avez pas encore de terrain. Votre estimation concernera donc uniquement les travaux de construction.";
        }
      } else {
        return "Disposez-vous déjà d'un terrain pour votre projet ?";
      }
      
    case 'materials':
      if (entities.materials && entities.materials.length > 0) {
        return `Je note votre intérêt pour des matériaux comme ${entities.materials.join(', ')}. Ceux-ci peuvent effectivement avoir un impact sur la qualité et le coût de votre projet.`;
      } else {
        return "Avez-vous une préférence pour certains matériaux de construction ?";
      }
      
    case 'timeline':
      return "La durée des travaux dépendra de plusieurs facteurs, notamment la complexité du projet, sa taille et les finitions choisies. Pour un projet comme le vôtre, comptez en général entre 8 et 14 mois.";
      
    case 'contact':
      if (entities.email) {
        return `Merci pour votre email (${entities.email}). Nous utiliserons cette adresse pour vous envoyer votre estimation détaillée.`;
      } else if (entities.phone) {
        return `Merci pour votre numéro de téléphone (${entities.phone}). Un expert Progineer pourra vous contacter à ce numéro pour affiner votre projet.`;
      } else {
        return "Pour finaliser votre estimation, pourriez-vous me communiquer votre email ?";
      }
      
    case 'help':
      return "Je suis là pour vous aider à estimer le coût de votre projet. Dites-moi simplement le type de projet, la surface, l'emplacement et vos préférences en termes de finition. Plus vous me donnez de détails, plus l'estimation sera précise.";
      
    default:
      // Si nous avons déjà les informations essentielles, proposer de calculer l'estimation
      if (knownInfo.project_type && knownInfo.surface && (knownInfo.location || knownInfo.quality)) {
        return "Je pense avoir suffisamment d'informations pour calculer une première estimation. Souhaitez-vous que je procède au calcul maintenant ?";
      } else {
        return "Pouvez-vous me donner plus de détails sur votre projet ? J'ai besoin de connaître au minimum le type de projet, sa surface et son emplacement.";
      }
  }
};

// Suggérer des questions pertinentes en fonction du contexte actuel
export const generateSuggestions = (formData: FormData): string[] => {
  const suggestions: string[] = [];
  
  // Suggestions basées sur ce qui manque dans les données du formulaire
  if (!formData.projectType) {
    suggestions.push("Je veux construire une maison neuve");
    suggestions.push("Je souhaite rénover mon appartement");
    suggestions.push("J'envisage une extension de 30m²");
  } else if (!formData.city) {
    suggestions.push("Mon projet est à Marseille");
    suggestions.push("C'est dans le département 13");
    suggestions.push("En région PACA");
  } else if (!formData.surface) {
    suggestions.push("La surface est de 120m²");
    suggestions.push("Environ 90m²");
    suggestions.push("Entre 100 et 150m²");
  } else if (!formData.finishLevel) {
    suggestions.push("Finition haut de gamme");
    suggestions.push("Qualité standard");
    suggestions.push("Basique, pour maîtriser le budget");
  } else if (formData.hasLand === undefined) {
    suggestions.push("J'ai déjà un terrain");
    suggestions.push("Je n'ai pas encore de terrain");
    suggestions.push("Le terrain coûte 150000€");
  } else if (!formData.email) {
    suggestions.push("Mon email est...");
    suggestions.push("Calculer mon estimation");
    suggestions.push("Je souhaite être contacté");
  } else {
    suggestions.push("Calculer mon estimation");
    suggestions.push("J'ai d'autres questions");
    suggestions.push("Merci pour votre aide");
  }
  
  return suggestions.slice(0, 3); // Limiter à 3 suggestions
};
