import { FormData } from '../types';

/**
 * Détermine la prochaine étape en fonction des réponses de l'utilisateur
 * @param currentStep - L'étape actuelle
 * @param formData - Les données du formulaire
 * @returns Le numéro de la prochaine étape
 */
export const determineNextStep = (currentStep: number, formData: FormData): number => {
  console.log(`Determining next step from ${currentStep} for project type: ${formData.projectType}, client type: ${formData.clientType}`);
  
  // Page 0: Choix du type de client (particulier ou professionnel)
  if (currentStep === 0) {
    if (formData.clientType === 'professional') {
      return 1; // Aller à la page des informations professionnelles (Page 2)
    } else if (formData.clientType === 'individual') {
      return 2; // Aller à la page des informations particulier (Page 3)
    }
    return 0; // Rester sur la même page si aucun choix n'est fait
  }
  
  // Page 1: Professionnel - Infos projet
  if (currentStep === 1) {
    // Si le projet est optimisation, design ou autre projet sans estimation précise
    if (formData.projectType === 'optimization' || formData.projectType === 'design') {
      return 7; // Aller directement au formulaire de contact (Page 7)
    }
    return 3; // Sinon aller à l'étape d'estimation (rapide/précise)
  }
  
  // Page 2: Particulier - Choix du projet
  if (currentStep === 2) {
    // Les projets qui n'ont pas besoin d'estimation
    if (formData.projectType === 'optimization' || formData.projectType === 'design') {
      return 7; // Aller directement au formulaire de contact (Page 7)
    }
    return 3; // Sinon continuer normalement vers la page 3 (Estimation Type)
  }
  
  // Page 3: Type d'estimation (rapide ou précise)
  if (currentStep === 3) {
    // Tous les types de projets vont à la page de détails de construction
    return 4;
  }
  
  // Page 4: Détails de construction
  if (currentStep === 4) {
    // Si rénovation ou division avec estimation précise
    if ((formData.projectType === 'renovation' || formData.projectType === 'division') && 
        formData.estimationType === 'precise') {
      return 29; // Aller à la page spécifique de rénovation
    }
    
    // Pour tous les autres cas
    return 5; // Aller à la page 5 (Terrain)
  }
  
  // Page 5: Détails du terrain
  if (currentStep === 5) {
    return 6; // Aller à la page 6 (Démolition)
  }
  
  // Page 6: Démolition
  if (currentStep === 6) {
    // Décider de la prochaine étape selon le type de projet et d'estimation
    if (formData.projectType === 'renovation' || formData.projectType === 'division') {
      if (formData.estimationType === 'quick') {
        return 44; // Aller à l'estimation rapide pour rénovation/division
      }
    }
    
    // Pour les autres cas (construction, extension)
    return 7; // Aller au formulaire de contact
  }
  
  // Page 7: Contact Details
  if (currentStep === 7) {
    // Pour les projets avec estimation
    if (formData.projectType !== 'optimization' && 
        formData.projectType !== 'design' &&
        formData.clientType === 'individual') {
      return 8; // Aller à la page de résultats d'estimation
    }
    return 7; // Rester sur la page de contact pour les projets sans estimation
  }
  
  // Page 29: Rénovation spécifique (si c'est un projet de rénovation ou division avec estimation précise)
  if (currentStep === 29) {
    return 6; // Aller à la page de démolition
  }
  
  // Page 44: Estimation rapide pour rénovation/division
  if (currentStep === 44) {
    return 7; // Aller au formulaire de contact
  }
  
  // Par défaut, passer à l'étape suivante
  return Math.min(currentStep + 1, 8);
};

/**
 * Détermine l'étape précédente en fonction des réponses de l'utilisateur
 * @param currentStep - L'étape actuelle
 * @param formData - Les données du formulaire
 * @returns Le numéro de l'étape précédente
 */
export const determinePreviousStep = (currentStep: number, formData: FormData): number => {
  // Chemin inverse depuis la page des infos pro (page 1)
  if (currentStep === 1) {
    return 0; // Retour à la page 0 (Type de client)
  }
  
  // Chemin inverse depuis la page du type de projet particulier (page 2)
  if (currentStep === 2) {
    return 0; // Retour à la page 0 (Type de client)
  }
  
  // Chemin inverse depuis la page du type d'estimation (page 3)
  if (currentStep === 3) {
    // Si professionnel, retour aux informations pro
    if (formData.clientType === 'professional') {
      return 1; // Retour à la page 1
    }
    // Si particulier, retour au choix de projet
    return 2; // Retour à la page 2
  }
  
  // Chemin inverse depuis la page de détails de construction (page 4)
  if (currentStep === 4) {
    return 3; // Retour à la page 3 (Estimation Type)
  }
  
  // Chemin inverse depuis la page de terrain (page 5)
  if (currentStep === 5) {
    return 4; // Retour à la page 4 (Construction Details)
  }
  
  // Chemin inverse depuis la page de démolition (page 6)
  if (currentStep === 6) {
    // Si c'est un projet de rénovation ou division avec estimation précise
    if ((formData.projectType === 'renovation' || formData.projectType === 'division') && 
        formData.estimationType === 'precise') {
      return 29; // Retour à la page 29 (Rénovation spécifique)
    }
    
    // Sinon retour normal
    return 5; // Retour à la page 5 (Terrain)
  }
  
  // Chemin inverse depuis la page de contact (page 7)
  if (currentStep === 7) {
    // Si c'est un projet sans estimation, retour au type de projet
    if (formData.projectType === 'optimization' || formData.projectType === 'design') {
      return formData.clientType === 'professional' ? 1 : 2;
    }
    
    // Pour rénovation/division avec estimation rapide
    if ((formData.projectType === 'renovation' || formData.projectType === 'division') && 
        formData.estimationType === 'quick') {
      return 44; // Retour à l'estimation rapide
    }
    
    // Sinon retour à la démolition
    return 6;
  }
  
  // Chemin inverse depuis la page de résultats (page 8)
  if (currentStep === 8) {
    return 7; // Retour à la page de contact
  }
  
  // Chemin inverse depuis la page de rénovation spécifique (page 29)
  if (currentStep === 29) {
    return 4; // Retour à la page de détails de construction
  }
  
  // Chemin inverse depuis la page d'estimation rapide pour rénovation (page 44)
  if (currentStep === 44) {
    return 6; // Retour à la page de démolition
  }
  
  // Par défaut, retourner à l'étape précédente
  return Math.max(currentStep - 1, 0); // Ne pas descendre en-dessous de 0
};

// Fonction pour calculer l'estimation mise à jour
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
