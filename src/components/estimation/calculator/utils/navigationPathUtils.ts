import { FormData } from '../types';

/**
 * Détermine la prochaine étape en fonction des réponses de l'utilisateur
 * @param currentStep - L'étape actuelle
 * @param formData - Les données du formulaire
 * @returns Le numéro de la prochaine étape
 */
export const determineNextStep = (currentStep: number, formData: FormData): number => {
  console.log(`Determining next step from ${currentStep} for project type: ${formData.projectType}, client type: ${formData.clientType}`);
  
  // Page 1: Choix du profil
  if (currentStep === 0) {
    return 1; // Aller à la page 1 - Ceci est déjà l'étape 1 dans notre programmation (index 0)
  }
  
  // Selon le type de client
  if (currentStep === 1) {
    if (formData.clientType === 'professional') {
      return 2; // Professionnel -> Page 2
    } else {
      return 3; // Particulier -> Page 3
    }
  }
  
  // Page 2: Professionnel - Infos projet
  if (currentStep === 2) {
    return 45; // Aller directement au formulaire de contact (Page 45)
  }
  
  // Page 3: Particulier - Choix du projet
  if (currentStep === 3) {
    // Les projets qui n'ont pas besoin d'estimation
    if (formData.projectType === 'optimisation' || formData.projectType === 'design') {
      return 45; // Aller directement au formulaire de contact (Page 45)
    }
    return 4; // Sinon continuer normalement vers la page 4
  }
  
  // Page 4: Type d'estimation (Rapide/Précise)
  if (currentStep === 4) {
    if (formData.estimationType === 'Rapide 5 mins (Précision à + ou - 10%)') {
      if (formData.projectType === 'renovation' || formData.projectType === 'division') {
        return 44; // Rénovation/Division Rapide -> Page 44 (Prestations concernées)
      }
    }
    return 5; // Normalement vers la page 5 (Détails du projet)
  }
  
  // Page 5: Détails du projet (surface, ville)
  if (currentStep === 5) {
    if (formData.projectType === 'renovation' || formData.projectType === 'division') {
      if (formData.estimationType === 'Précise 15 mins (précision à + ou- 5%)') {
        return 29; // Rénovation/Division Précise -> Page 29 (spécifique à la rénovation)
      } else {
        return 44; // Rénovation/Division Rapide -> Page 44
      }
    }
    return 6; // Construction/Extension -> Page 6 (Terrain)
  }
  
  // Page 29: Spécifique rénovation/division
  if (currentStep === 29) {
    return 6; // Après les questions spécifiques de rénovation, aller à la page 6
  }
  
  // Page 44: Prestations pour estimation rapide
  if (currentStep === 44) {
    return 45; // Aller au formulaire de contact
  }
  
  // Page 6-43: Pages de détails selon le type de projet
  if (currentStep >= 6 && currentStep <= 43) {
    // Logique pour sauter des pages selon les options choisies
    // Par exemple, si certaines options ne sont pas sélectionnées
    if (currentStep === 23 && !formData.includeEcoSolutions) {
      return 25; // Sauter la page 24
    }
    if (currentStep === 24 && !formData.includeRenewableEnergy) {
      return 26; // Sauter la page 25
    }
    // etc.
    
    // Si on arrive à la dernière page de détails
    if (currentStep === 43) {
      return 45; // Aller au formulaire de contact
    }
    
    return currentStep + 1; // Par défaut, aller à la page suivante
  }
  
  // Page 45: Formulaire de contact
  if (currentStep === 45) {
    // Si projet sans estimation, ne pas aller à la page d'estimation
    if (formData.projectType === 'optimisation' || 
        formData.projectType === 'design' || 
        formData.clientType === 'professional') {
      return 45; // Rester sur la même page ou finaliser
    }
    return 46; // Sinon aller à la page d'estimation
  }
  
  // Par défaut, passer à l'étape suivante
  return currentStep + 1;
};

/**
 * Détermine l'étape précédente en fonction des réponses de l'utilisateur
 * @param currentStep - L'étape actuelle
 * @param formData - Les données du formulaire
 * @returns Le numéro de l'étape précédente
 */
export const determinePreviousStep = (currentStep: number, formData: FormData): number => {
  // Chemin inverse depuis la page 3 (Particulier - Choix du projet)
  if (currentStep === 3) {
    return 1; // Retour à la page 1 (Choix du profil)
  }
  
  // Chemin inverse depuis la page 45 (Contact)
  if (currentStep === 45) {
    if (formData.clientType === 'professional') {
      return 2; // Retour à la page 2 pour les professionnels
    }
    
    if (formData.projectType === 'optimisation' || formData.projectType === 'design') {
      return 3; // Retour à la page 3 pour les projets sans estimation
    }
    
    if (formData.estimationType === 'Rapide 5 mins (Précision à + ou - 10%)') {
      return 44; // Retour à la page 44 pour l'estimation rapide
    }
    
    // Pour les autres cas, retrouver la dernière page de détails visitée
    return 43; // La dernière page de détails
  }
  
  // Chemin inverse depuis la page 46 (Estimation)
  if (currentStep === 46) {
    return 45; // Retour à la page de contact
  }
  
  // Chemin inverse depuis la page 44 (Prestations pour estimation rapide)
  if (currentStep === 44) {
    return 5; // Retour à la page 5 (Détails du projet)
  }
  
  // Chemin inverse depuis la page 5 (Détails du projet)
  if (currentStep === 5) {
    return 4; // Retour à la page 4 (Type d'estimation)
  }
  
  // Chemin inverse depuis la page 4 (Type d'estimation)
  if (currentStep === 4) {
    return 3; // Retour à la page 3 (Choix du projet)
  }
  
  // Cas particulier pour les pages de détails (6-43)
  if (currentStep >= 6 && currentStep <= 43) {
    // Logique pour sauter certaines pages en retour
    if (currentStep === 25 && !formData.includeEcoSolutions) {
      return 23; // Sauter la page 24 en retour
    }
    if (currentStep === 26 && !formData.includeRenewableEnergy) {
      return 24; // Sauter la page 25 en retour
    }
    // etc.
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
