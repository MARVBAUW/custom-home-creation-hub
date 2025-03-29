import { FormData } from '../types';

/**
 * Détermine la prochaine étape en fonction des réponses de l'utilisateur
 * @param currentStep - L'étape actuelle
 * @param formData - Les données du formulaire
 * @returns Le numéro de la prochaine étape
 */
export const determineNextStep = (currentStep: number, formData: FormData): number => {
  console.log(`Determining next step from ${currentStep} for project type: ${formData.projectType}`);
  
  // Chemin spécifique pour les clients professionnels
  if (formData.clientType === 'professional') {
    if (currentStep === 1) {
      return 2; // Aller à l'étape du projet professionnel
    }
    if (currentStep === 2) {
      return 4; // Sauter la page 3 (projet particulier) et aller à l'étape 4
    }
  }
  
  // Chemin spécifique pour les clients particuliers
  if (formData.clientType === 'individual') {
    if (currentStep === 1) {
      return 3; // Aller à l'étape du projet particulier
    }
    if (currentStep === 3) {
      return 4; // Après projet particulier, aller à l'étape 4
    }
  }
  
  // Traitement spécial pour les projets de design d'espace
  if (formData.projectType === 'design') {
    return 9; // Aller directement au formulaire de contact
  }
  
  // Chemins spécifiques selon le type d'estimation
  if (currentStep === 4) {
    // Estimation rapide en 5 minutes
    if (formData.estimationType === 'Rapide 5 mins (Précision à + ou - 10%)') {
      return 7; // Aller à l'étape d'électricité
    }
  }
  
  // Chemins spécifiques selon le type de projet
  if (formData.projectType === 'construction' || formData.projectType === 'extension') {
    // Pour l'estimation précise
    if (formData.estimationType === 'Précise 15 mins (précision à + ou- 5%)') {
      if (currentStep === 7 && formData.electricalType) { // Après avoir choisi le type d'électricité
        return 8; // Aller à la plomberie
      }
      if (currentStep === 8 && formData.plumbingType) { // Après avoir choisi le type de plomberie
        return 9; // Aller au formulaire de contact
      }
    }
  } else if (formData.projectType === 'renovation' || formData.projectType === 'division') {
    // Chemins pour projets de rénovation
    if (formData.estimationType === 'Précise 15 mins (précision à + ou- 5%)') {
      if (currentStep === 7 && formData.electricalType) { // Après avoir choisi le type d'électricité
        return 8; // Aller à la plomberie
      }
      if (currentStep === 8 && formData.plumbingType) { // Après avoir choisi le type de plomberie
        return 9; // Aller au formulaire de contact
      }
    }
  }
  
  // Gérer les sauts pour les options spécifiques
  if (currentStep === 8 && !formData.plumbingType) {
    return 9; // Si pas de données de plomberie, aller au formulaire de contact
  }
  
  // En cas de données manquantes à une étape, ne pas avancer
  if (currentStep === 7 && !formData.electricalType) {
    console.log("Electrical type is missing, staying at step 7");
    return 7; // Rester sur l'étape électricité
  }
  
  // Par défaut, aller à l'étape suivante
  return currentStep + 1;
};

/**
 * Détermine l'étape précédente en fonction des réponses de l'utilisateur
 * @param currentStep - L'étape actuelle
 * @param formData - Les données du formulaire
 * @returns Le numéro de l'étape précédente
 */
export const determinePreviousStep = (currentStep: number, formData: FormData): number => {
  // Chemin inverse pour les clients professionnels
  if (formData.clientType === 'professional') {
    if (currentStep === 4) {
      return 2; // Revenir à l'étape du projet professionnel
    }
  }
  
  // Chemin inverse pour les clients particuliers
  if (formData.clientType === 'individual') {
    if (currentStep === 4) {
      return 3; // Revenir à l'étape du projet particulier
    }
    if (currentStep === 3) {
      return 1; // Revenir à l'étape du type de client
    }
  }
  
  // Par défaut, aller à l'étape précédente
  return Math.max(currentStep - 1, 0); // Ne pas descendre en-dessous de 0
};

/**
 * Recalcule le montant estimé en fonction des choix de l'utilisateur
 * @param formData - Les données du formulaire
 * @returns Le montant estimé calculé
 */
export const recalculateEstimation = (formData: FormData): number => {
  
  let montantTotal = 0;
  
  // Calculer la base selon la surface
  if (formData.surface) {
    // Convertir la surface en nombre si c'est une chaîne
    const surface = typeof formData.surface === 'string' ? 
      parseFloat(formData.surface) : formData.surface;
      
    if (!isNaN(surface)) {
      // Calcul de base par m²
      const coutParM2 = 1000; // Coût de base par m²
      montantTotal += surface * coutParM2;
    }
  }
  
  // Ajustements selon le type de projet
  if (formData.projectType === 'renovation') {
    montantTotal *= 0.8; // Rénovation moins chère que construction neuve
  } else if (formData.projectType === 'construction') {
    montantTotal *= 1.0; // Coût standard pour construction
  } else if (formData.projectType === 'extension') {
    montantTotal *= 1.1; // Extension plus chère en proportion
  } else if (formData.projectType === 'division') {
    montantTotal *= 0.75; // Division légèrement moins chère que rénovation
  }
  
  // Calcul pour terrain uniquement si c'est un projet de construction/extension
  if ((formData.projectType === 'construction' || formData.projectType === 'extension') && formData.terrainSurface) {
    const terrainSurface = typeof formData.terrainSurface === 'string' ? 
      parseFloat(formData.terrainSurface) : formData.terrainSurface;
    
    if (!isNaN(terrainSurface)) {
      // Ajouter coût du terrain si prix fourni, sinon estimation
      if (formData.landPrice) {
        const landPrice = typeof formData.landPrice === 'string' ?
          parseFloat(formData.landPrice) : formData.landPrice;
        if (!isNaN(landPrice)) {
          // Ne pas ajouter au montant total mais le prendre en compte dans le calcul
          // car c'est un coût supplémentaire séparé
        }
      }
      
      // Ajuster le coût selon le type de terrain
      if (formData.terrainType === 'plat') {
        // Terrain plat - pas de supplément
      } else if (formData.terrainType === 'pente_legere') {
        montantTotal *= 1.05; // +5% pour pente légère
      } else if (formData.terrainType === 'pente_forte') {
        montantTotal *= 1.15; // +15% pour forte pente
      }
    }
  }
  
  // Ajustements selon les choix techniques - Pour tous types de projets
  
  // Électricité
  if (formData.electricalType === 'basic') {
    // Convertir la surface en nombre si c'est une chaîne
    const surfaceValue = parseFloat(typeof formData.surface === 'string' ? formData.surface : String(formData.surface || '0'));
    montantTotal += surfaceValue * 100;
  } else if (formData.electricalType === 'standard') {
    const surfaceValue = parseFloat(typeof formData.surface === 'string' ? formData.surface : String(formData.surface || '0'));
    montantTotal += surfaceValue * 125;
  } else if (formData.electricalType === 'premium') {
    const surfaceValue = parseFloat(typeof formData.surface === 'string' ? formData.surface : String(formData.surface || '0'));
    montantTotal += surfaceValue * 155;
  } else if (formData.electricalType === 'smart_home') {
    const surfaceValue = parseFloat(typeof formData.surface === 'string' ? formData.surface : String(formData.surface || '0'));
    montantTotal += surfaceValue * 190;
  }
  
  // Plomberie
  if (formData.plumbingType === 'basic') {
    const surfaceValue = parseFloat(typeof formData.surface === 'string' ? formData.surface : String(formData.surface || '0'));
    montantTotal += surfaceValue * 80;
  } else if (formData.plumbingType === 'standard') {
    const surfaceValue = parseFloat(typeof formData.surface === 'string' ? formData.surface : String(formData.surface || '0'));
    montantTotal += surfaceValue * 100;
  } else if (formData.plumbingType === 'premium') {
    const surfaceValue = parseFloat(typeof formData.surface === 'string' ? formData.surface : String(formData.surface || '0'));
    montantTotal += surfaceValue * 125;
  }
  
  // Chauffage
  if (formData.heatingType === 'standard') {
    const surfaceValue = parseFloat(typeof formData.surface === 'string' ? formData.surface : String(formData.surface || '0'));
    montantTotal += surfaceValue * 60;
  } else if (formData.heatingType === 'eco') {
    const surfaceValue = parseFloat(typeof formData.surface === 'string' ? formData.surface : String(formData.surface || '0'));
    montantTotal += surfaceValue * 120;
  } else if (formData.heatingType === 'economic') {
    const surfaceValue = parseFloat(typeof formData.surface === 'string' ? formData.surface : String(formData.surface || '0'));
    montantTotal += surfaceValue * 45;
  }
  
  // Climatisation
  if (formData.hasAirConditioning) {
    const surfaceValue = parseFloat(typeof formData.surface === 'string' ? formData.surface : String(formData.surface || '0'));
    montantTotal += surfaceValue * 65;
  }
  
  // Menuiseries extérieures
  // Différencier entre construction (ajout) et rénovation (remplacement)
  if (formData.projectType === 'construction' || formData.projectType === 'extension') {
    // Pour construction, on utilise windowNewArea
    if (formData.windowType === 'bois' && formData.windowNewArea) {
      const area = typeof formData.windowNewArea === 'string' ? 
        parseFloat(formData.windowNewArea) : formData.windowNewArea;
      if (!isNaN(area)) montantTotal += area * 650;
    } else if (formData.windowType === 'pvc' && formData.windowNewArea) {
      const area = typeof formData.windowNewArea === 'string' ? 
        parseFloat(formData.windowNewArea) : formData.windowNewArea;
      if (!isNaN(area)) montantTotal += area * 390;
    } else if (formData.windowType === 'alu' && formData.windowNewArea) {
      const area = typeof formData.windowNewArea === 'string' ? 
        parseFloat(formData.windowNewArea) : formData.windowNewArea;
      if (!isNaN(area)) montantTotal += area * 620;
    } else if (formData.windowType === 'mixte' && formData.windowNewArea) {
      const area = typeof formData.windowNewArea === 'string' ? 
        parseFloat(formData.windowNewArea) : formData.windowNewArea;
      if (!isNaN(area)) montantTotal += area * 690;
    } else if (formData.windowType === 'pvc_colore' && formData.windowNewArea) {
      const area = typeof formData.windowNewArea === 'string' ? 
        parseFloat(formData.windowNewArea) : formData.windowNewArea;
      if (!isNaN(area)) montantTotal += area * 410;
    }
  } else {
    // Pour rénovation, on utilise windowRenovationArea
    if (formData.windowType === 'bois' && formData.windowRenovationArea) {
      const area = typeof formData.windowRenovationArea === 'string' ? 
        parseFloat(formData.windowRenovationArea) : formData.windowRenovationArea;
      if (!isNaN(area)) montantTotal += area * 650;
    } else if (formData.windowType === 'pvc' && formData.windowRenovationArea) {
      const area = typeof formData.windowRenovationArea === 'string' ? 
        parseFloat(formData.windowRenovationArea) : formData.windowRenovationArea;
      if (!isNaN(area)) montantTotal += area * 390;
    } else if (formData.windowType === 'alu' && formData.windowRenovationArea) {
      const area = typeof formData.windowRenovationArea === 'string' ? 
        parseFloat(formData.windowRenovationArea) : formData.windowRenovationArea;
      if (!isNaN(area)) montantTotal += area * 620;
    } else if (formData.windowType === 'mixte' && formData.windowRenovationArea) {
      const area = typeof formData.windowRenovationArea === 'string' ? 
        parseFloat(formData.windowRenovationArea) : formData.windowRenovationArea;
      if (!isNaN(area)) montantTotal += area * 690;
    } else if (formData.windowType === 'pvc_colore' && formData.windowRenovationArea) {
      const area = typeof formData.windowRenovationArea === 'string' ? 
        parseFloat(formData.windowRenovationArea) : formData.windowRenovationArea;
      if (!isNaN(area)) montantTotal += area * 410;
    }
  }
  
  // Options supplémentaires selon le questionnaire
  if (formData.includeEcoSolutions) {
    montantTotal *= 1.05; // +5% pour solutions écologiques
  }
  
  if (formData.includeRenewableEnergy) {
    montantTotal *= 1.08; // +8% pour énergies renouvelables
  }
  
  if (formData.includeLandscaping) {
    montantTotal *= 1.03; // +3% pour aménagements paysagers
  }
  
  // Spécifique à la rénovation
  if (formData.projectType === 'renovation' && formData.needsDemolition) {
    montantTotal *= 1.1; // +10% pour démolition en rénovation
  }
  
  return Math.round(montantTotal); // Arrondir à l'entier
};
