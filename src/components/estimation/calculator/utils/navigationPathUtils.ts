
import { FormData } from '../types';

/**
 * Détermine la prochaine étape en fonction des réponses de l'utilisateur
 * @param currentStep - L'étape actuelle
 * @param formData - Les données du formulaire
 * @returns Le numéro de la prochaine étape
 */
export const determineNextStep = (currentStep: number, formData: FormData): number => {
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
  
  // Chemins spécifiques selon le type de projet
  if (formData.projectType === 'construction' || formData.projectType === 'extension') {
    if (currentStep === 4) {
      // Si le type d'estimation est précis, aller à l'étape de construction/extension précise
      if (formData.estimationType === 'Précise 15 mins (précision à + ou- 5%)') {
        return 5; // CONSTRUCTION EXTENSION PRECIS
      }
    }
  }
  
  if (formData.projectType === 'renovation' || formData.projectType === 'division') {
    if (currentStep === 4) {
      // Selon le type d'estimation pour rénovation/division
      if (formData.estimationType === 'Précise 15 mins (précision à + ou- 5%)' ||
          formData.estimationType === 'Rapide 5 mins (Précision à + ou - 10%)') {
        return 5; // CONSTRUCTION EXTENSION PRECIS
      }
    }
  }
  
  // Gérer les sauts pour les options spécifiques
  if (currentStep === 23) { // Énergies renouvelables
    // Vérifier si on doit montrer les solutions environnementales
    if (formData.includeEcoSolutions) {
      return 24; // Aller aux solutions environnementales
    } else if (formData.includeLandscaping) {
      return 25; // Sauter les solutions environnementales et aller à l'aménagement paysager
    } else if (formData.includeOptions) {
      return 26; // Sauter aux options
    } else if (formData.includeCuisine) {
      return 27; // Sauter aux cuisines
    } else if (formData.includeBathroom) {
      return 28; // Sauter aux salles de bain
    } else {
      return 29; // Aller à l'étape finale (contact)
    }
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
  
  // Gérer les sauts inverses pour les options spécifiques
  if (currentStep === 24) { // Solutions environnementales
    if (!formData.includeEcoSolutions) {
      return 23; // Revenir aux énergies renouvelables
    }
  }
  
  // Par défaut, aller à l'étape précédente
  return Math.max(currentStep - 1, 1); // Ne pas descendre en-dessous de 1
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
  }
  
  // Ajustements selon les choix techniques
  
  // Électricité
  if (formData.electricalType === 'basic') {
    montantTotal += parseFloat(formData.surface || '0') * 100;
  } else if (formData.electricalType === 'standard') {
    montantTotal += parseFloat(formData.surface || '0') * 125;
  } else if (formData.electricalType === 'premium') {
    montantTotal += parseFloat(formData.surface || '0') * 155;
  } else if (formData.electricalType === 'smart_home') {
    montantTotal += parseFloat(formData.surface || '0') * 190;
  }
  
  // Plomberie
  if (formData.plumbingType === 'basic') {
    montantTotal += parseFloat(formData.surface || '0') * 80;
  } else if (formData.plumbingType === 'standard') {
    montantTotal += parseFloat(formData.surface || '0') * 100;
  } else if (formData.plumbingType === 'premium') {
    montantTotal += parseFloat(formData.surface || '0') * 125;
  }
  
  // Chauffage
  if (formData.heatingType === 'standard') {
    montantTotal += parseFloat(formData.surface || '0') * 60;
  } else if (formData.heatingType === 'eco') {
    montantTotal += parseFloat(formData.surface || '0') * 120;
  } else if (formData.heatingType === 'economic') {
    montantTotal += parseFloat(formData.surface || '0') * 45;
  }
  
  // Climatisation
  if (formData.hasAirConditioning) {
    montantTotal += parseFloat(formData.surface || '0') * 65;
  }
  
  // Options supplémentaires selon le questionnaire
  if (formData.includeEcoSolutions) {
    montantTotal *= 1.05; // +5% pour solutions écologiques
  }
  
  if (formData.includeRenewableEnergy) {
    montantTotal *= 1.08; // +8% pour énergies renouvelables
  }
  
  return Math.round(montantTotal); // Arrondir à l'entier
};
