
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
    rooms?: number;
    floors?: number;
    style?: string;
    energy_efficiency?: boolean;
    ecological?: boolean;
    special_features?: string[];
    exterior_features?: string[];
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
  materials: /matériau|béton|bois|brique|parpaing|acier|paille|pierre|structure|mur|charpente|toiture|bardage/i,
  timeline: /délai|temps|durée|mois|année|planning|calendrier|quand|combien de temps/i,
  features: /cuisine|salle de bain|chambre|salon|bureau|garage|piscine|terrasse|jardin|balcon|équipement|escalier|insert/i,
  contact: /email|mail|e-mail|courriel|téléphone|contacter|contact|appeler/i,
  help: /aide|aidez|question|comment|expliquer|assistance|guide|pouvez-vous|oriente|orienter/i
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
  
  // Vérifier si l'utilisateur est bloqué et demande de l'orientation
  if (input.match(/non ou alors oriente moi|bloqué|coincé|orientation|guide|quoi faire maintenant|et maintenant|que faire/i)) {
    result.intent = 'help';
    result.confidence = 0.9;
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
  
  // Extraire le nombre d'étages
  if (input.match(/r\+1|r\s*\+\s*1|étage|étages|premier étage|un étage/i)) {
    result.entities.floors = 2; // rez-de-chaussée + 1 étage = 2 niveaux
  } else if (input.match(/r\+2|r\s*\+\s*2|deux étages|2 étages/i)) {
    result.entities.floors = 3;
  } else if (input.match(/plain[ -]pied|rez[ -]de[ -]chaussée/i)) {
    result.entities.floors = 1;
  }
  
  // Extraire le style architectural
  if (input.match(/provençal|provencal|traditionnel|méditerranéen/i)) {
    result.entities.style = 'Provençal/Traditionnel';
  } else if (input.match(/moderne|contemporain/i)) {
    result.entities.style = 'Moderne/Contemporain';
  } else if (input.match(/design|minimaliste/i)) {
    result.entities.style = 'Design/Minimaliste';
  }
  
  // Extraire le nombre de chambres
  const roomsMatch = input.match(/(\d+)[\s]*(chambres?)/i);
  if (roomsMatch) {
    result.entities.rooms = parseInt(roomsMatch[1]);
  }
  
  // Extraire les caractéristiques énergétiques
  if (input.match(/économ|econom|peu de consommation|basse consommation|consomme (peu|moins)|efficacité énergétique/i)) {
    result.entities.energy_efficiency = true;
  }
  
  // Extraire les aspects écologiques
  if (input.match(/écologi|ecologi|développement durable|durable|bio|naturel|environnement|vert/i)) {
    result.entities.ecological = true;
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
  } else if (input.match(/qualité|belle finition|bien fini|bonne qualité/i)) {
    result.entities.quality = 'Premium (haut de gamme)';
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
  if (input.match(/bardage/i)) materialMatches.push('Bardage');
  if (input.match(/alu|aluminium/i)) materialMatches.push('Aluminium');
  
  if (materialMatches.length > 0) {
    result.entities.materials = materialMatches;
  }
  
  // Extraire les caractéristiques spéciales
  const featuresMatches = [];
  if (input.match(/insert|cheminée|foyer/i)) featuresMatches.push('Insert/Cheminée');
  if (input.match(/escalier suspendu/i)) featuresMatches.push('Escalier suspendu');
  if (input.match(/cuisine ouverte|cuisine américaine/i)) featuresMatches.push('Cuisine ouverte');
  if (input.match(/domotique|smart home|connecté/i)) featuresMatches.push('Domotique');
  if (input.match(/panneaux solaires|photovoltaïque/i)) featuresMatches.push('Panneaux solaires');
  if (input.match(/récupération d'eau|eau de pluie/i)) featuresMatches.push('Récupération d\'eau');
  if (input.match(/pompe à chaleur|pac/i)) featuresMatches.push('Pompe à chaleur');
  if (input.match(/grande baie vitrée|baie vitrée|grandes fenêtres|surface vitrée/i)) featuresMatches.push('Grandes baies vitrées');
  
  if (featuresMatches.length > 0) {
    result.entities.special_features = featuresMatches;
  }
  
  // Extraire les caractéristiques extérieures
  const exteriorMatches = [];
  if (input.match(/piscine/i)) exteriorMatches.push('Piscine');
  if (input.match(/terrasse/i)) exteriorMatches.push('Terrasse');
  if (input.match(/jardin/i)) exteriorMatches.push('Jardin');
  if (input.match(/garage/i)) exteriorMatches.push('Garage');
  if (input.match(/carport/i)) exteriorMatches.push('Carport');
  if (input.match(/pool house/i)) exteriorMatches.push('Pool house');
  
  if (exteriorMatches.length > 0) {
    result.entities.exterior_features = exteriorMatches;
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
  
  // Si nous avons beaucoup d'informations mais que nous sommes bloqués
  if (Object.keys(entities).length > 3 && intent === 'help') {
    // Vérifier les informations manquantes essentielles
    const missingEssentials = [];
    if (!knownInfo.location) missingEssentials.push("la ville ou région où se situe votre projet");
    if (!knownInfo.terrain) missingEssentials.push("si vous disposez déjà d'un terrain");
    if (!currentFormData.email) missingEssentials.push("votre email de contact");
    
    if (missingEssentials.length > 0) {
      return `Merci pour toutes ces informations détaillées ! Pour finaliser votre estimation, j'aurais besoin de savoir ${missingEssentials.join(', ')}. Pouvez-vous me préciser ces points ?`;
    } else {
      return "Je crois avoir suffisamment d'informations pour calculer une estimation précise de votre projet. Souhaitez-vous que je procède à l'estimation maintenant ?";
    }
  }
  
  // Si beaucoup d'informations détaillées déjà fournies, faire un résumé et orienter
  if (entities.surface && entities.rooms && entities.special_features && entities.floors) {
    const qualityLevel = entities.quality || "de qualité";
    const styleText = entities.style ? `de style ${entities.style}` : "";
    const energyText = entities.energy_efficiency ? "à basse consommation énergétique" : "";
    const ecoText = entities.ecological ? "écologique" : "";
    
    // Construction du résumé
    let summary = `J'ai bien noté votre projet de maison ${qualityLevel} ${styleText} ${energyText} ${ecoText} de ${entities.surface} m² avec ${entities.rooms} chambres sur ${entities.floors === 1 ? 'plain-pied' : entities.floors + ' niveaux'}.`;
    
    // Ajouter les spécificités
    if (entities.special_features) {
      summary += ` Vous souhaitez des équipements spécifiques comme ${entities.special_features.join(', ')}.`;
    }
    
    if (entities.exterior_features) {
      summary += ` À l'extérieur, vous prévoyez ${entities.exterior_features.join(', ')}.`;
    }
    
    // Questions pour compléter
    if (!knownInfo.location) {
      return `${summary}\n\nPour avancer dans l'estimation, j'aurais besoin de savoir dans quelle ville ou région se situe votre projet ?`;
    } else if (!knownInfo.terrain) {
      return `${summary}\n\nAvez-vous déjà un terrain pour ce projet ? Si oui, connaissez-vous son prix d'acquisition ?`;
    } else if (!currentFormData.email) {
      return `${summary}\n\nPour finaliser votre estimation personnalisée, pourriez-vous me communiquer votre email de contact ?`;
    } else {
      return `${summary}\n\nJe dispose maintenant de toutes les informations nécessaires. Souhaitez-vous que je calcule votre estimation détaillée ?`;
    }
  }
  
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
        return `J'ai noté que vous souhaitez une finition de niveau ${entities.quality}. ${!knownInfo.terrain ? 'Disposez-vous déjà d\'un terrain pour ce projet ?' : 'Merci pour cette précision.'}`;
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
      
    case 'features':
      if (entities.special_features && entities.special_features.length > 0) {
        return `J'ai bien noté les équipements spécifiques que vous souhaitez : ${entities.special_features.join(', ')}. Avez-vous d'autres besoins particuliers pour votre projet ?`;
      } else {
        return "Avez-vous des besoins spécifiques comme une cuisine ouverte, un insert, des grandes baies vitrées ou d'autres éléments importants pour vous ?";
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
      return "Je suis là pour vous guider dans votre projet. Souhaitez-vous me parler de la localisation, de la surface envisagée, du style architectural ou du budget ? Ou préférez-vous que je vous pose des questions plus précises pour avancer ?";
      
    default:
      // Si nous avons déjà les informations essentielles, proposer de calculer l'estimation
      if (knownInfo.project_type && knownInfo.surface && (knownInfo.location || knownInfo.quality)) {
        return "Je pense avoir suffisamment d'informations pour calculer une première estimation. Souhaitez-vous que je procède au calcul maintenant ?";
      } else {
        return "Pour avancer dans l'estimation de votre projet, pourriez-vous me préciser plus d'informations comme la surface, la localisation ou le style de construction envisagé ?";
      }
  }
};

// Suggérer des questions pertinentes en fonction du contexte actuel
export const generateSuggestions = (formData: FormData, lastIntent?: string): string[] => {
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
    suggestions.push("Je veux des finitions haut de gamme");
    suggestions.push("Je préfère une qualité standard");
    suggestions.push("Qualité standard mais bonnes performances énergétiques");
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
  
  // Ajouter des suggestions adaptées au dernier sujet abordé
  if (lastIntent === 'materials') {
    suggestions.push("Je veux une maison en bois");
    suggestions.push("Je préfère une construction traditionnelle");
    suggestions.push("J'aimerais un bardage bois pour la façade");
  } else if (lastIntent === 'features') {
    suggestions.push("Je veux une cuisine ouverte");
    suggestions.push("J'aimerais 3 chambres avec salle de bain");
    suggestions.push("Je souhaite un grand salon lumineux");
  } else if (lastIntent === 'help') {
    suggestions.push("Parlons de la localisation");
    suggestions.push("Quelles questions me reste-t-il à répondre?");
    suggestions.push("Je veux voir une estimation");
  }
  
  return suggestions.slice(0, 3); // Limiter à 3 suggestions
};
