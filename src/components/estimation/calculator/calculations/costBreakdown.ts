
import { FormData } from '../types';

// Fonction pour calculer le prix du gros œuvre en fonction du type de projet
export const calculateGrosOeuvre = (
  projectType: string | undefined,
  surfaceValue: number,
  grosOeuvreCoef: number,
  grosOeuvreDetails: string[],
  renovationAreas?: string[]
): { montant: number; details: string[] } => {
  let grosOeuvrePrix = 0;
  
  if (projectType === 'Construction neuve') {
    grosOeuvrePrix = surfaceValue * 450 * grosOeuvreCoef;
    return { montant: grosOeuvrePrix, details: grosOeuvreDetails };
  } else if (projectType === 'Rénovation') {
    // Pour la rénovation, le gros œuvre dépend des zones à rénover
    if (renovationAreas && renovationAreas.includes('Façade')) {
      grosOeuvrePrix = surfaceValue * 150 * grosOeuvreCoef;
      grosOeuvreDetails.push('Rénovation de façade');
      return { montant: grosOeuvrePrix, details: grosOeuvreDetails };
    }
  } else if (projectType === 'Extension') {
    grosOeuvrePrix = surfaceValue * 500 * grosOeuvreCoef;
    grosOeuvreDetails.push('Extension attenante au bâtiment existant');
    return { montant: grosOeuvrePrix, details: grosOeuvreDetails };
  } else if (projectType === 'Surélévation') {
    grosOeuvrePrix = surfaceValue * 550 * grosOeuvreCoef;
    grosOeuvreDetails.push('Renforcement structure existante');
    return { montant: grosOeuvrePrix, details: grosOeuvreDetails };
  }
  
  return { montant: grosOeuvrePrix, details: grosOeuvreDetails };
};

// Fonction pour calculer le prix de la charpente et toiture
export const calculateToiture = (
  projectType: string | undefined,
  surfaceValue: number,
  toitureCoef: number,
  toitureDetails: string[],
  renovationAreas?: string[]
): { montant: number; details: string[] } => {
  let toiturePrix = 0;
  
  if (projectType === 'Construction neuve' || projectType === 'Extension' || projectType === 'Surélévation') {
    toiturePrix = surfaceValue * 200 * toitureCoef;
    return { montant: toiturePrix, details: toitureDetails };
  } else if (projectType === 'Rénovation' && renovationAreas && renovationAreas.includes('Toiture')) {
    toiturePrix = surfaceValue * 180 * toitureCoef;
    toitureDetails.push('Rénovation de toiture');
    return { montant: toiturePrix, details: toitureDetails };
  }
  
  return { montant: toiturePrix, details: toitureDetails };
};

// Fonction pour calculer le prix des menuiseries extérieures
export const calculateMenuiseries = (
  surfaceValue: number,
  menuiseriesCoef: number,
  menuiseriesDetails: string[]
): { montant: number; details: string[] } => {
  // Estimation que les menuiseries représentent environ 15% de la surface
  const menuiseriesPrix = (surfaceValue * 0.15) * 900 * menuiseriesCoef;
  return { montant: menuiseriesPrix, details: menuiseriesDetails };
};

// Fonction pour calculer le prix de l'électricité
export const calculateElectricite = (
  surfaceValue: number,
  hasAirConditioning: boolean,
  electricitePlomberieDetails: string[]
): { montant: number; details: string[] } => {
  let electricitePrix = surfaceValue * 90;
  
  electricitePlomberieDetails.push('Réseau électrique complet');
  
  if (hasAirConditioning) {
    electricitePrix += surfaceValue * 120;
    electricitePlomberieDetails.push('Installation climatisation');
  }
  
  return { montant: electricitePrix, details: electricitePlomberieDetails };
};

// Fonction pour calculer le prix de la plomberie et chauffage
export const calculatePlomberieChauffage = (
  surfaceValue: number,
  heatingType: string | undefined,
  plomberieDetails: string[]
): { montant: number; details: string[] } => {
  let plomberiePrix = surfaceValue * 80;
  
  plomberieDetails.push('Réseau plomberie et évacuations');
  
  // Type de chauffage
  if (heatingType === 'Électrique') {
    plomberiePrix += surfaceValue * 50;
    plomberieDetails.push('Chauffage électrique');
  } else if (heatingType === 'Gaz') {
    plomberiePrix += surfaceValue * 90;
    plomberieDetails.push('Chauffage central au gaz');
  } else if (heatingType === 'Pompe à chaleur') {
    plomberiePrix += surfaceValue * 160;
    plomberieDetails.push('Pompe à chaleur air/eau');
  } else if (heatingType === 'Géothermie') {
    plomberiePrix += surfaceValue * 220;
    plomberieDetails.push('Chauffage géothermique');
  } else if (heatingType === 'Poêle à bois/granulés') {
    plomberiePrix += surfaceValue * 70;
    plomberieDetails.push('Poêle à bois/granulés');
  } else if (heatingType === 'Solaire') {
    plomberiePrix += surfaceValue * 180;
    plomberieDetails.push('Système solaire combiné');
  }
  
  return { montant: plomberiePrix, details: plomberieDetails };
};

// Fonction pour calculer le prix des cuisines et salles de bain
export const calculateCuisineSdb = (
  kitchenType: string | undefined,
  bathroomCount: string | undefined,
  cuisineSdbDetails: string[]
): { montant: number; details: string[] } => {
  let cuisineSdbPrix = 0;
  
  // Cuisine
  if (kitchenType === 'Cuisine équipée haut de gamme') {
    cuisineSdbPrix += 25000;
    cuisineSdbDetails.push('Cuisine équipée haut de gamme');
  } else if (kitchenType === 'Cuisine standard équipée') {
    cuisineSdbPrix += 15000;
    cuisineSdbDetails.push('Cuisine standard équipée');
  } else if (kitchenType === 'Cuisine basique') {
    cuisineSdbPrix += 8000;
    cuisineSdbDetails.push('Cuisine basique');
  }
  
  // Salles de bain (selon le nombre)
  const nbSdb = bathroomCount ? parseInt(bathroomCount.charAt(0)) : 1;
  cuisineSdbPrix += nbSdb * 7000;
  cuisineSdbDetails.push(`${nbSdb} salle(s) de bain équipée(s)`);
  
  return { montant: cuisineSdbPrix, details: cuisineSdbDetails };
};

// Fonction pour calculer le prix des aménagements extérieurs
export const calculateAmenagementExt = (
  exteriorFeatures: string[] | undefined,
  surfaceValue: number
): { montant: number; details: string[] } => {
  let amenagementPrix = 0;
  const amenagementDetails: string[] = [];
  
  if (exteriorFeatures && exteriorFeatures.length > 0 && !exteriorFeatures.includes('Aucun aménagement extérieur')) {
    if (exteriorFeatures.includes('Terrasse')) {
      amenagementPrix += 200 * Math.min(surfaceValue * 0.3, 50); // Max 50m²
      amenagementDetails.push('Terrasse');
    }
    
    if (exteriorFeatures.includes('Piscine')) {
      amenagementPrix += 25000;
      amenagementDetails.push('Piscine');
    }
    
    if (exteriorFeatures.includes('Jardin paysager')) {
      amenagementPrix += 8000;
      amenagementDetails.push('Jardin paysager');
    }
    
    if (exteriorFeatures.includes('Clôture/Portail')) {
      amenagementPrix += 5000;
      amenagementDetails.push('Clôture et portail');
    }
    
    if (exteriorFeatures.includes('Garage/Abri')) {
      amenagementPrix += 15000;
      amenagementDetails.push('Garage ou abri');
    }
  }
  
  return { montant: amenagementPrix, details: amenagementDetails };
};
