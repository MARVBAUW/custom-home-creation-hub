
import { FormData } from '../types';
import { TVA_RATE, DEFAULT_TAXE_AMENAGEMENT } from './constants';
import { parseToNumber } from '../utils/typeConversions';
import { 
  calculateGrosOeuvre,
  calculateToiture,
  calculateMenuiseries,
  calculateElectricite,
  calculatePlomberieChauffage,
  calculateCuisineSdb,
  calculateAmenagementExt
} from './costBreakdown';

// Fonction pour calculer l'estimation détaillée
export const calculateDetailedEstimation = (formData: FormData): any => {
  // Extraction des valeurs nécessaires avec conversion sécurisée
  const { 
    projectType, 
    surface,
    city,
    cityTaxRate,
    levels,
    finishLevel,
    wallType,
    roofType,
    insulationType,
    heatingType,
    hasAirConditioning,
    windowType,
    kitchenType,
    bathroomCount,
    renovationType,
    renovationAreas,
    terrainType,
    exteriorFeatures,
    startDate,
    landPrice
  } = formData;

  // Valeurs par défaut si non renseignées, avec conversion sécurisée
  const surfaceValue = parseToNumber(surface, 100);
  let levelsValue = 1;
  
  // Convertir les niveaux
  if (typeof levels === 'number') {
    levelsValue = levels;
  } else if (levels === '1 niveau (plain-pied)') levelsValue = 1;
  else if (levels === '2 niveaux (R+1)') levelsValue = 2;
  else if (levels === '3 niveaux (R+2)') levelsValue = 3;
  else if (levels === '4 niveaux ou plus') levelsValue = 4;
  
  // Valeur par défaut pour cityTaxRate
  const cityTaxRateValue = parseToNumber(cityTaxRate, DEFAULT_TAXE_AMENAGEMENT);
  
  // Initialisation du prix total HT
  let totalHT = 0;
  
  // Détail par corps d'état
  const corpsEtat: any = {};
  
  // 1. Gros œuvre
  let grosOeuvreCoef = 1;
  const grosOeuvreDetails: string[] = [];
  
  // Coefficient selon le type de murs
  if (wallType === 'Briques') {
    grosOeuvreCoef = 1;
    grosOeuvreDetails.push('Murs en briques');
  } else if (wallType === 'Parpaings') {
    grosOeuvreCoef = 0.95;
    grosOeuvreDetails.push('Murs en parpaings');
  } else if (wallType === 'Béton') {
    grosOeuvreCoef = 1.1;
    grosOeuvreDetails.push('Murs en béton');
  } else if (wallType === 'Bois') {
    grosOeuvreCoef = 1.15;
    grosOeuvreDetails.push('Structure en bois');
  } else if (wallType === 'Ossature métallique') {
    grosOeuvreCoef = 1.2;
    grosOeuvreDetails.push('Ossature métallique');
  }
  
  // Coefficient selon le terrain
  if (terrainType === 'Terrain plat') {
    grosOeuvreCoef *= 1;
    grosOeuvreDetails.push('Terrain plat');
  } else if (terrainType === 'Terrain en légère pente') {
    grosOeuvreCoef *= 1.1;
    grosOeuvreDetails.push('Adaptation à un terrain en légère pente');
  } else if (terrainType === 'Terrain en forte pente') {
    grosOeuvreCoef *= 1.25;
    grosOeuvreDetails.push('Adaptation à un terrain en forte pente');
  } else if (terrainType === 'Terrain complexe (accès difficile, etc.)') {
    grosOeuvreCoef *= 1.4;
    grosOeuvreDetails.push('Adaptation à un terrain complexe');
  }
  
  // Calcul du gros œuvre
  const grosOeuvreResult = calculateGrosOeuvre(
    projectType, 
    surfaceValue, 
    grosOeuvreCoef, 
    grosOeuvreDetails, 
    renovationAreas
  );
  
  if (grosOeuvreResult.montant > 0) {
    corpsEtat["Gros œuvre"] = {
      montantHT: grosOeuvreResult.montant,
      details: grosOeuvreResult.details
    };
    totalHT += grosOeuvreResult.montant;
  }
  
  // 2. Charpente et toiture
  let toitureCoef = 1;
  const toitureDetails: string[] = [];
  
  if (roofType === 'Toiture terrasse') {
    toitureCoef = 0.9;
    toitureDetails.push('Toiture terrasse avec étanchéité');
  } else if (roofType === 'Charpente traditionnelle') {
    toitureCoef = 1;
    toitureDetails.push('Charpente traditionnelle');
  } else if (roofType === 'Charpente métallique') {
    toitureCoef = 1.1;
    toitureDetails.push('Charpente métallique');
  } else if (roofType === 'Toiture mixte (terrasse et pente)') {
    toitureCoef = 1.15;
    toitureDetails.push('Toiture mixte');
  }
  
  // Calcul de la toiture
  const toitureResult = calculateToiture(
    projectType, 
    surfaceValue, 
    toitureCoef, 
    toitureDetails, 
    renovationAreas
  );
  
  if (toitureResult.montant > 0) {
    corpsEtat["Charpente & Toiture"] = {
      montantHT: toitureResult.montant,
      details: toitureResult.details
    };
    totalHT += toitureResult.montant;
  }
  
  // 3. Isolation et façade
  let isolationCoef = 1;
  const isolationDetails: string[] = [];
  
  if (insulationType === 'Basique (réglementaire)') {
    isolationCoef = 0.9;
    isolationDetails.push('Isolation réglementaire standard');
  } else if (insulationType === 'Performance (RT 2012)') {
    isolationCoef = 1;
    isolationDetails.push('Isolation performance RT 2012');
  } else if (insulationType === 'Ultra-performance (RT 2020/Passif)') {
    isolationCoef = 1.25;
    isolationDetails.push('Isolation très haute performance RT 2020/Passif');
  }
  
  let isolationPrix = surfaceValue * 120 * isolationCoef;
  
  if (projectType !== 'Rénovation' || (renovationAreas && renovationAreas.includes('Isolation'))) {
    corpsEtat["Isolation & Façade"] = {
      montantHT: isolationPrix,
      details: isolationDetails
    };
    totalHT += isolationPrix;
  }
  
  // 4. Menuiseries extérieures
  let menuiseriesCoef = 1;
  const menuiseriesDetails: string[] = [];
  
  if (windowType === 'PVC') {
    menuiseriesCoef = 0.9;
    menuiseriesDetails.push('Menuiseries PVC double vitrage');
  } else if (windowType === 'Aluminium') {
    menuiseriesCoef = 1.2;
    menuiseriesDetails.push('Menuiseries aluminium');
  } else if (windowType === 'Bois') {
    menuiseriesCoef = 1.1;
    menuiseriesDetails.push('Menuiseries bois');
  } else if (windowType === 'Mixte bois/alu') {
    menuiseriesCoef = 1.4;
    menuiseriesDetails.push('Menuiseries mixtes bois/aluminium');
  }
  
  // Calcul des menuiseries
  const menuiseriesResult = calculateMenuiseries(
    surfaceValue, 
    menuiseriesCoef, 
    menuiseriesDetails
  );
  
  corpsEtat["Menuiseries extérieures"] = {
    montantHT: menuiseriesResult.montant,
    details: menuiseriesResult.details
  };
  totalHT += menuiseriesResult.montant;
  
  // 5. Électricité
  const electricitePlomberieDetails: string[] = [];
  
  // Calcul de l'électricité
  const electriciteResult = calculateElectricite(
    surfaceValue, 
    hasAirConditioning === true, 
    electricitePlomberieDetails
  );
  
  corpsEtat["Électricité"] = {
    montantHT: electriciteResult.montant,
    details: electriciteResult.details
  };
  totalHT += electriciteResult.montant;
  
  // 6. Plomberie et chauffage
  const plomberieDetails: string[] = [];
  
  // Calcul de la plomberie et chauffage
  const plomberieResult = calculatePlomberieChauffage(
    surfaceValue, 
    heatingType, 
    plomberieDetails
  );
  
  corpsEtat["Plomberie & Chauffage"] = {
    montantHT: plomberieResult.montant,
    details: plomberieResult.details
  };
  totalHT += plomberieResult.montant;
  
  // 7. Cloisons et plâtrerie
  let platreriePrix = surfaceValue * 110;
  const platrerieDetails = ['Cloisons intérieures et plafonds'];
  
  corpsEtat["Plâtrerie"] = {
    montantHT: platreriePrix,
    details: platrerieDetails
  };
  totalHT += platreriePrix;
  
  // 8. Revêtements sols & murs
  let revetementsPrix = surfaceValue * 130;
  const revetementsDetails = ['Carrelage, peinture et revêtements muraux'];
  
  corpsEtat["Revêtements"] = {
    montantHT: revetementsPrix,
    details: revetementsDetails
  };
  totalHT += revetementsPrix;
  
  // 9. Cuisine et salle de bain
  const cuisineSdbDetails: string[] = [];
  
  // Calcul cuisine et salle de bain
  const bathroomCountValue = parseToNumber(bathroomCount, 1);
  const cuisineSdbResult = calculateCuisineSdb(
    kitchenType, 
    bathroomCountValue, 
    cuisineSdbDetails
  );
  
  corpsEtat["Cuisine & Salle de bain"] = {
    montantHT: cuisineSdbResult.montant,
    details: cuisineSdbResult.details
  };
  totalHT += cuisineSdbResult.montant;
  
  // 10. Aménagements extérieurs
  const amenagementResult = calculateAmenagementExt(
    exteriorFeatures, 
    surfaceValue
  );
  
  if (amenagementResult.montant > 0) {
    corpsEtat["Aménagements extérieurs"] = {
      montantHT: amenagementResult.montant,
      details: amenagementResult.details
    };
    totalHT += amenagementResult.montant;
  }
  
  // Calcul de la TVA et du total TTC
  const totalTTC = totalHT * (1 + TVA_RATE);
  
  // Calcul des honoraires
  let tauxHonoraires = 0;
  
  // Barème Progineer dégressif
  if (totalHT < 100000) tauxHonoraires = 0.12;
  else if (totalHT < 200000) tauxHonoraires = 0.10;
  else if (totalHT < 500000) tauxHonoraires = 0.09;
  else if (totalHT < 1000000) tauxHonoraires = 0.08;
  else tauxHonoraires = 0.07;
  
  const honorairesHT = totalHT * tauxHonoraires;
  const honorairesTTC = honorairesHT * (1 + TVA_RATE);
  
  // Calcul de la taxe d'aménagement
  const tauxTaxeAmenagement = cityTaxRateValue ? cityTaxRateValue / 100 : DEFAULT_TAXE_AMENAGEMENT;
  // Convert surfaceValue to number if it's a string - Fix type error
  const surfaceValueAsNumber = typeof surfaceValue === 'string' ? parseFloat(surfaceValue) : surfaceValue;
  // Fix for the type error - converting number to string
  const taxeAmenagement = surfaceValueAsNumber * 767 * tauxTaxeAmenagement; // 767€ est la valeur forfaitaire au m²
  
  // Études géotechniques
  const etudesGeotechniques = Math.min(3000 + (surfaceValue * 10), 8000);
  
  // Étude thermique
  const etudeThermique = Math.min(2000 + (surfaceValue * 5), 5000);
  
  // Garantie décennale
  const garantieDecennale = totalHT * 0.025;
  
  // Coût global
  const coutGlobalHT = totalHT + honorairesHT + etudesGeotechniques + etudeThermique + garantieDecennale;
  const coutGlobalTTC = coutGlobalHT * (1 + TVA_RATE) + taxeAmenagement; // La taxe d'aménagement est déjà TTC
  
  // Retourner l'estimation détaillée
  return {
    totalHT,
    totalTTC,
    vat: TVA_RATE,
    corpsEtat,
    honorairesHT,
    honorairesTTC,
    taxeAmenagement,
    garantieDecennale,
    etudesGeotechniques,
    etudeThermique,
    coutGlobalHT,
    coutGlobalTTC
  };
};
