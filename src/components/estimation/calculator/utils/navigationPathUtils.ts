import { FormData } from '../types';

/**
 * Détermine la prochaine étape en fonction des réponses de l'utilisateur
 * @param currentStep - L'étape actuelle
 * @param formData - Les données du formulaire
 * @returns Le numéro de la prochaine étape
 */
export const determineNextStep = (currentStep: number, formData: FormData): number => {
  console.log(`Determining next step from ${currentStep} for project type: ${formData.projectType}, client type: ${formData.clientType}`);
  
  // Page 0: Choix du profil (Client Type)
  if (currentStep === 0) {
    if (formData.clientType === 'professional') {
      return 1; // Professionnel -> Page 1 (Project Details)
    } else if (formData.clientType === 'individual') {
      return 2; // Particulier -> Page 2 (Project Type)
    }
    return 0; // Stay on same page if no choice made
  }
  
  // Page 1: Professionnel - Infos projet
  if (currentStep === 1) {
    return 7; // Aller directement au formulaire de contact (Page 7)
  }
  
  // Page 2: Particulier - Choix du projet (Project Type)
  if (currentStep === 2) {
    // Les projets qui n'ont pas besoin d'estimation
    if (formData.projectType === 'optimization' || formData.projectType === 'design') {
      return 7; // Aller directement au formulaire de contact (Page 7)
    }
    return 3; // Sinon continuer normalement vers la page 3 (Room Details)
  }
  
  // Pages 3-6: Diff details steps
  if (currentStep >= 3 && currentStep <= 6) {
    return currentStep + 1; // Go to next step
  }
  
  // Page 7: Contact Details
  if (currentStep === 7) {
    // Si projet sans estimation, ne pas aller à la page d'estimation
    if (formData.projectType === 'optimization' || 
        formData.projectType === 'design' || 
        formData.clientType === 'professional') {
      return 7; // Rester sur la même page ou finaliser
    }
    return 8; // Sinon aller à la page d'estimation (Results)
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
  // Chemin inverse depuis la page des détails de projet (page 1)
  if (currentStep === 1) {
    return 0; // Retour à la page 0 (Client Type)
  }
  
  // Chemin inverse depuis la page du type de projet (page 2)
  if (currentStep === 2) {
    return 0; // Retour à la page 0 (Client Type)
  }
  
  // Chemin inverse depuis la page de contact (page 7)
  if (currentStep === 7) {
    if (formData.clientType === 'professional') {
      return 1; // Retour à la page 1 pour les professionnels
    }
    
    if (formData.projectType === 'optimization' || formData.projectType === 'design') {
      return 2; // Retour à la page 2 pour les projets sans estimation
    }
    
    return 6; // Retour à la page précédente (Special Features)
  }
  
  // Chemin inverse depuis la page de résultats (page 8)
  if (currentStep === 8) {
    return 7; // Retour à la page de contact
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
