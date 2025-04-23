
/**
 * Utilitaires pour la gestion des pages SEO localisées par ville et métier
 */

// Types pour la gestion des URLs dynamiques
export interface LocalSEOParams {
  profession: string;
  city: string;
  originalUrl: string;
}

// Liste des villes ciblées
export const targetedCities = [
  'marseille',
  'nice',
  'toulon', 
  'cannes',
  'aix-en-provence',
  'antibes',
  'saint-tropez',
  'fréjus',
  'saint-raphaël',
  'la-ciotat',
  'hyères',
  'six-fours-les-plages',
  'cassis',
  'bandol',
  'sanary-sur-mer'
];

// Liste des métiers ciblés et leurs mappages
export const professionMappings: Record<string, {
  targetPage: string;
  displayName: string;
  description: string;
}> = {
  'constructeur': {
    targetPage: 'construction-neuve',
    displayName: 'Constructeur de maison',
    description: 'Construction de maisons individuelles sur mesure adaptées à vos besoins et à votre terrain.'
  },
  'constructeur-de-maison': {
    targetPage: 'construction-neuve',
    displayName: 'Constructeur de maison',
    description: 'Construction de maisons individuelles personnalisées selon vos exigences et votre budget.'
  },
  'constructeur-villa': {
    targetPage: 'construction-neuve',
    displayName: 'Constructeur de villa',
    description: 'Construction de villas haut de gamme et de résidences de prestige adaptées à votre style de vie.'
  },
  'maitre-doeuvre': {
    targetPage: 'renovation',
    displayName: 'Maître d\'œuvre',
    description: 'Coordination complète de vos projets de construction et rénovation, de la conception à la livraison.'
  },
  'maitre-doeuvre-renovation': {
    targetPage: 'renovation',
    displayName: 'Maître d\'œuvre spécialiste en rénovation',
    description: 'Transformation et modernisation de votre habitat existant avec une expertise en rénovation.'
  },
  'maitre-doeuvre-extension': {
    targetPage: 'extension',
    displayName: 'Maître d\'œuvre spécialiste en extension',
    description: 'Agrandissement de votre espace de vie avec des extensions parfaitement intégrées à votre habitat.'
  },
  'architecte': {
    targetPage: 'renovation',
    displayName: 'Architecte',
    description: 'Conception architecturale et suivi de projet pour transformer votre espace de vie.'
  },
  'architecte-renovation': {
    targetPage: 'renovation',
    displayName: 'Architecte spécialiste en rénovation',
    description: 'Rénovation complète et transformations architecturales pour valoriser votre bien immobilier.'
  },
  'architecte-dinterieur': {
    targetPage: 'design-interieur',
    displayName: 'Architecte d\'intérieur',
    description: 'Conception d\'espaces intérieurs personnalisés qui allient esthétique, fonctionnalité et confort.'
  },
  'architecte-maison-individuelle': {
    targetPage: 'construction-neuve',
    displayName: 'Architecte de maison individuelle',
    description: 'Conception de maisons individuelles uniques qui reflètent votre personnalité et votre mode de vie.'
  },
  'optimisation': {
    targetPage: 'optimisation-espace',
    displayName: 'Spécialiste en optimisation d\'espace',
    description: 'Solutions pour maximiser chaque mètre carré et transformer vos espaces contraints.'
  },
  'optimisation-espace': {
    targetPage: 'optimisation-espace',
    displayName: 'Expert en optimisation d\'espace',
    description: 'Aménagements intelligents pour exploiter pleinement le potentiel de votre surface habitable.'
  }
};

/**
 * Génère le titre de la page en fonction de la profession et de la ville
 */
export const generatePageTitle = (profession: string, city: string): string => {
  const mapping = professionMappings[profession];
  if (!mapping) return `Progineer | Maître d'œuvre à ${formatCityName(city)} et en PACA`;
  
  return `${mapping.displayName} à ${formatCityName(city)} | Progineer PACA`;
};

/**
 * Génère la description de la page en fonction de la profession et de la ville
 */
export const generatePageDescription = (profession: string, city: string): string => {
  const mapping = professionMappings[profession];
  if (!mapping) {
    return `Progineer, maître d'œuvre à ${formatCityName(city)} et en PACA. Construction, rénovation et extension de maisons sur mesure. Devis gratuit.`;
  }
  
  return `${mapping.description} Progineer, votre ${mapping.displayName.toLowerCase()} à ${formatCityName(city)} et en région PACA. Devis gratuit et sans engagement.`;
};

/**
 * Génère le contenu H1 de la page en fonction de la profession et de la ville
 */
export const generatePageH1 = (profession: string, city: string): string => {
  const mapping = professionMappings[profession];
  if (!mapping) return `Maître d'œuvre à ${formatCityName(city)}`;
  
  return `${mapping.displayName} à ${formatCityName(city)}`;
};

/**
 * Formate le nom de la ville pour l'affichage (majuscule à la première lettre)
 */
export const formatCityName = (city: string): string => {
  // Gestion des tirets et espaces pour les noms composés
  return city
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('-')
    .replace(/-/g, ' ');
};

/**
 * Détermine la page cible en fonction de la profession
 */
export const getTargetPageForProfession = (profession: string): string => {
  const mapping = professionMappings[profession];
  return mapping ? mapping.targetPage : 'renovation'; // Par défaut, on redirige vers la page rénovation
};

/**
 * Analyse l'URL pour extraire la profession et la ville
 * Format attendu: /[profession]-[ville]
 */
export const parseLocalSEOUrl = (path: string): LocalSEOParams | null => {
  // On retire le premier slash s'il existe
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // On cherche le dernier tiret qui sépare la profession de la ville
  let lastIndex = cleanPath.lastIndexOf('-');
  if (lastIndex === -1) return null;
  
  // On vérifie si c'est un cas spécial avec "six-fours-les-plages"
  const potentialCity = cleanPath.substring(lastIndex + 1);
  if (!targetedCities.includes(potentialCity)) {
    // On cherche si la ville contient un tiret
    for (const city of targetedCities) {
      if (city.includes('-') && cleanPath.endsWith(city)) {
        // On recalcule l'index en fonction de la position de la ville
        lastIndex = cleanPath.length - city.length - 1;
        break;
      }
    }
  }
  
  // On extrait la profession et la ville
  const profession = cleanPath.substring(0, lastIndex);
  const city = cleanPath.substring(lastIndex + 1);
  
  // On vérifie si la ville est dans notre liste de villes ciblées
  if (!targetedCities.includes(city)) return null;
  
  // On vérifie si la profession est dans notre liste de métiers ciblés
  // ou si elle contient un des mots-clés que nous ciblons
  let foundProfession = null;
  for (const targetProfession of Object.keys(professionMappings)) {
    if (profession === targetProfession || profession.includes(targetProfession)) {
      foundProfession = targetProfession;
      break;
    }
  }
  
  if (!foundProfession) return null;
  
  return {
    profession: foundProfession,
    city,
    originalUrl: `/${cleanPath}`
  };
};
