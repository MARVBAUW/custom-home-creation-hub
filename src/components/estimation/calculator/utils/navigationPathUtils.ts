import { FormData } from '../types';

/**
 * Determine the next step based on the current step and form data
 * This implements the conditional navigation flow described in the requirements
 */
export const determineNextStep = (currentStep: number, formData: FormData): number => {
  // If skipToContact is set, go directly to contact form
  if (formData.skipToContact) {
    return 45; // Contact step (Page 45)
  }
  
  // Client Type Selection (Page 1)
  if (currentStep === 0) {
    if (formData.clientType === 'professional') {
      return 1; // Professional project details (Page 2)
    }
    return 2; // Individual project type (Page 3)
  }
  
  // Professional Project Details (Page 2)
  if (currentStep === 1) {
    return 3; // Estimation type step (Page 4)
  }
  
  // Individual Project Type (Page 3)
  if (currentStep === 2) {
    // For optimization or design projects, skip to contact
    if (formData.projectType === 'optimization' || formData.projectType === 'design') {
      return 45; // Skip to contact form (Page 45)
    }
    return 3; // Estimation type step (Page 4)
  }
  
  // Estimation Type (Page 4)
  if (currentStep === 3) {
    return 4; // Construction details (Page 5)
  }
  
  // Construction Details (Page 5)
  if (currentStep === 4) {
    // If renovation or division project and estimation is "precise"
    if ((formData.projectType === 'renovation' || formData.projectType === 'division') && 
        formData.estimationType === 'precise') {
      return 29; // Jump to renovation specific flow (Page 29)
    }
    
    // If renovation or division project and estimation is "quick"
    if ((formData.projectType === 'renovation' || formData.projectType === 'division') && 
        formData.estimationType === 'quick') {
      return 44; // Jump to quick estimation (Page 44)
    }
    
    return 5; // Continue to terrain step (Page 6)
  }
  
  // Terrain (Page 6)
  if (currentStep === 5) {
    return 6; // Demolition step (Page 7)
  }
  
  // Demolition (Page 7)
  if (currentStep === 6) {
    return 7; // Gros Oeuvre step (Page 8)
  }
  
  // Gros Oeuvre (Page 8)
  if (currentStep === 7) {
    return 8; // Charpente step (Page 9)
  }
  
  // Charpente (Page 9)
  if (currentStep === 8) {
    return 9; // Combles step (Page 10)
  }
  
  // Combles (Page 10)
  if (currentStep === 9) {
    return 10; // Couverture step (Page 11)
  }
  
  // Couverture (Page 11)
  if (currentStep === 10) {
    return 11; // Isolation step (Page 12)
  }
  
  // Isolation (Page 12)
  if (currentStep === 11) {
    return 12; // Facade step (Page 13)
  }
  
  // Facade (Page 13)
  if (currentStep === 12) {
    return 13; // Menuiseries exterieures (Page 14)
  }
  
  // Menuiseries exterieures (Page 14)
  if (currentStep === 13) {
    return 14; // Électricité (Page 15)
  }
  
  // Électricité (Page 15)
  if (currentStep === 14) {
    return 15; // Plomberie (Page 16)
  }
  
  // Plomberie (Page 16)
  if (currentStep === 15) {
    return 16; // Chauffage (Page 17)
  }
  
  // Chauffage (Page 17)
  if (currentStep === 16) {
    return 17; // Plâtrerie (Page 18)
  }
  
  // Plâtrerie (Page 18)
  if (currentStep === 17) {
    return 18; // Menuiseries intérieures (Page 19)
  }
  
  // Menuiseries intérieures (Page 19)
  if (currentStep === 18) {
    return 19; // Carrelage (Page 20)
  }
  
  // Carrelage (Page 20)
  if (currentStep === 19) {
    return 20; // Parquet (Page 21)
  }
  
  // Parquet (Page 21)
  if (currentStep === 20) {
    return 21; // Peinture (Page 22)
  }
  
  // Peinture (Page 22)
  if (currentStep === 21) {
    return 22; // Énergies renouvelables (Page 23)
  }
  
  // Énergies renouvelables (Page 23)
  if (currentStep === 22) {
    // Check if any optional sections were selected
    if (formData.estimationType === 'quick') {
      return 45; // Jump to contact form for quick estimation (Page 45)
    }
    
    // For full estimation, check for optional sections
    let nextStep = 45; // Default to contact
    
    // Check for solutions environnementales
    if (formData.includeEcoSolutions) {
      return 23; // Solutions environnementales (Page 24)
    }
    
    // If no eco solutions but we have landscaping
    if (formData.includeLandscaping) {
      return 24; // Aménagements extérieurs (Page 25)
    }
    
    // If no landscaping but we have kitchen
    if (formData.includeCuisine) {
      return 26; // Cuisine (Page 27)
    }
    
    // If no kitchen but we have bathroom
    if (formData.includeBathroom) {
      return 27; // Salle de bain (Page 28)
    }
    
    return nextStep; // Jump to contact form (Page 45)
  }
  
  // Solutions environnementales (Page 24)
  if (currentStep === 23) {
    // Check if we should show landscaping
    if (formData.includeLandscaping) {
      return 24; // Aménagements extérieurs (Page 25)
    }
    
    // If no landscaping but we have kitchen
    if (formData.includeCuisine) {
      return 26; // Cuisine (Page 27)
    }
    
    // If no kitchen but we have bathroom
    if (formData.includeBathroom) {
      return 27; // Salle de bain (Page 28)
    }
    
    return 45; // Contact form (Page 45)
  }
  
  // Aménagements extérieurs (Page 25)
  if (currentStep === 24) {
    return 25; // Aménagements extérieurs details (Page 26)
  }
  
  // Aménagements extérieurs details (Page 26)
  if (currentStep === 25) {
    // Check if we should show kitchen
    if (formData.includeCuisine) {
      return 26; // Cuisine (Page 27)
    }
    
    // If no kitchen but we have bathroom
    if (formData.includeBathroom) {
      return 27; // Salle de bain (Page 28)
    }
    
    return 45; // Contact form (Page 45)
  }
  
  // Cuisine (Page 27)
  if (currentStep === 26) {
    // Check if we should show bathroom
    if (formData.includeBathroom) {
      return 27; // Salle de bain (Page 28)
    }
    
    return 45; // Contact form (Page 45)
  }
  
  // Salle de bain (Page 28)
  if (currentStep === 27) {
    return 45; // Contact form (Page 45)
  }
  
  // Contact Form (Page 45)
  if (currentStep === 45) {
    return 46; // Thank you page (Page 46)
  }
  
  // For renovation specific flow (Pages 29-43)
  // We're not implementing the full renovation flow yet, but we'll add the structure
  if (currentStep >= 29 && currentStep < 44) {
    return currentStep + 1; // Continue through renovation flow
  }
  
  // Quick estimation (Page 44)
  if (currentStep === 44) {
    return 45; // Contact step
  }
  
  // For remaining steps, just increment
  return Math.min(currentStep + 1, 46); // Don't go beyond thank you page
};

/**
 * Determine the previous step based on the current step and form data
 * This implements the backward conditional navigation flow
 */
export const determinePreviousStep = (currentStep: number, formData: FormData): number => {
  // At professional project details, go back to client type
  if (currentStep === 1) {
    return 0; // Client type
  }
  
  // At individual project type, go back to client type
  if (currentStep === 2) {
    return 0; // Client type
  }
  
  // At contact form, determine where to go back based on form state
  if (currentStep === 45) {
    // If came from renovation quick flow
    if (formData.projectType === 'renovation' || formData.projectType === 'division') {
      if (formData.estimationType === 'quick') {
        return 44; // Quick estimation page
      }
    }
    
    // If we have optional sections enabled, go back to the last one that applies
    if (formData.includeBathroom) {
      return 27; // Salle de bain
    }
    
    if (formData.includeCuisine) {
      return 26; // Cuisine
    }
    
    if (formData.includeLandscaping) {
      return 25; // Aménagements extérieurs details
    }
    
    if (formData.includeEcoSolutions) {
      return 23; // Solutions environnementales
    }
    
    // If no optional sections, go back to the energies renouvelables
    if (formData.projectType === 'construction' || formData.projectType === 'extension') {
      return 22; // Énergies renouvelables
    }
    
    // For renovation projects with precise estimation
    if ((formData.projectType === 'renovation' || formData.projectType === 'division') && 
        formData.estimationType === 'precise') {
      return 43; // Last step of renovation flow
    }
    
    // Default fallback
    return 22; // Energies renouvelables
  }
  
  // At thank you page, go back to contact form
  if (currentStep === 46) {
    return 45; // Contact form
  }
  
  // For renovation specific flow (Pages 29-43)
  if (currentStep > 29 && currentStep <= 43) {
    return currentStep - 1; // Go back one step in renovation flow
  }
  
  // At first renovation page, go back to construction details
  if (currentStep === 29) {
    return 4; // Construction details
  }
  
  // For all other steps, just decrement
  return Math.max(0, currentStep - 1);
};

/**
 * Calculate the montant total based on form data
 * This is a placeholder for the actual calculation logic
 */
export const calculateEstimationAmount = (formData: FormData): number => {
  let total = 0;
  
  // Start with base amount if available
  if (typeof formData.montantT === 'number') {
    total = formData.montantT;
  }
  
  // Base calculation on project type and surface
  const surface = typeof formData.surface === 'number' ? formData.surface : 0;
  
  // Different base rates depending on project type
  switch (formData.projectType) {
    case 'construction':
      // Base rate for construction projects
      total += surface * 1200; // Example: 1200€ per m²
      break;
      
    case 'renovation':
      // Base rate for renovation projects
      total += surface * 800; // Example: 800€ per m²
      break;
      
    case 'extension':
      // Base rate for extension projects
      total += surface * 1500; // Example: 1500€ per m²
      break;
      
    case 'division':
      // Base rate for division projects
      total += surface * 600; // Example: 600€ per m²
      break;
      
    default:
      // Default rate if project type is not specified
      total += surface * 1000; // Example: 1000€ per m²
  }
  
  // Add costs for different construction elements if they exist in formData
  
  // Apply environmental solution coefficient if selected
  if (formData.includeEcoSolutions) {
    // Different coefficients based on eco level
    switch (formData.ecoLevel) {
      case 'minimal':
        total *= 1.018; // +1.8%
        break;
      case 'moderate':
        total *= 1.038; // +3.8%
        break;
      case 'extensive':
        total *= 1.057; // +5.7%
        break;
    }
  }
  
  // Add cost for pools if applicable
  if (formData.includeLandscaping && formData.hasPool) {
    const poolSize = typeof formData.poolSize === 'number' ? formData.poolSize : 0;
    
    // Different pool costs based on type
    switch (formData.poolType) {
      case 'polyester':
        total += poolSize * 1200; // Example: 1200€ per m² for polyester pool
        break;
      case 'concrete':
        total += poolSize * 2000; // Example: 2000€ per m² for concrete pool
        break;
      case 'natural':
        total += poolSize * 1500; // Example: 1500€ per m² for natural pool
        break;
    }
    
    // Add pool heating if selected
    if (formData.poolHeating) {
      total += 5000; // Example: fixed cost for pool heating
    }
  }
  
  // Add cost for jacuzzi if applicable
  if (formData.includeLandscaping && formData.hasJacuzzi) {
    // Different jacuzzi costs based on type
    switch (formData.jacuzziType) {
      case 'basic':
        total += 8000; // Example: 8000€ for basic jacuzzi
        break;
      case 'plus':
        total += 12000; // Example: 12000€ for plus jacuzzi
        break;
      case 'premium':
        total += 18000; // Example: 18000€ for premium jacuzzi
        break;
    }
  }
  
  // Add cost for carport if applicable
  if (formData.includeLandscaping && formData.hasCarport) {
    // Different carport costs based on type
    switch (formData.carportType) {
      case 'single':
        total += 5000; // Example: 5000€ for single carport
        break;
      case 'double':
        total += 9000; // Example: 9000€ for double carport
        break;
    }
  }
  
  // Add costs for kitchen if applicable
  if (formData.includeCuisine && formData.kitchenType) {
    // Cost per kitchen based on type
    let kitchenCost = 0;
    
    switch (formData.kitchenType) {
      case 'kitchenette':
        kitchenCost = 3000; // Example: 3000€ for kitchenette
        break;
      case 'basic':
        kitchenCost = 6000; // Example: 6000€ for basic kitchen
        break;
      case 'standard':
        kitchenCost = 12000; // Example: 12000€ for standard kitchen
        break;
      case 'premium':
        kitchenCost = 25000; // Example: 25000€ for premium kitchen
        break;
    }
    
    // Multiply by number of apartments if applicable
    const apartments = typeof formData.apartments === 'number' ? formData.apartments : 1;
    total += kitchenCost * apartments;
  }
  
  // Add costs for bathrooms if applicable
  if (formData.includeBathroom && formData.bathroomType) {
    // Cost per bathroom based on type
    let bathroomCost = 0;
    
    switch (formData.bathroomType) {
      case 'standard':
        bathroomCost = 5000; // Example: 5000€ for standard bathroom
        break;
      case 'mid-range':
        bathroomCost = 10000; // Example: 10000€ for mid-range bathroom
        break;
      case 'premium':
        bathroomCost = 20000; // Example: 20000€ for premium bathroom
        break;
    }
    
    // Multiply by number of bathrooms and apartments if applicable
    const bathrooms = typeof formData.bathrooms === 'number' ? formData.bathrooms : 1;
    const apartments = typeof formData.apartments === 'number' ? formData.apartments : 1;
    total += bathroomCost * bathrooms * apartments;
  }
  
  return Math.round(total); // Round to nearest euro
};

/**
 * Validate the current step data
 */
export const validateStep = (step: number, formData: FormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Depending on the current step, validate different fields
  switch (step) {
    case 0: // Client Type
      if (!formData.clientType) {
        errors.push('Veuillez sélectionner un type de client');
      }
      break;
    
    case 1: // Professional Project Details
      if (formData.clientType === 'professional' && !formData.projectType) {
        errors.push('Veuillez sélectionner un type de projet professionnel');
      }
      break;
    
    case 2: // Individual Project Type
      if (formData.clientType === 'individual' && !formData.projectType) {
        errors.push('Veuillez sélectionner un type de projet individuel');
      }
      break;
    
    case 3: // Estimation Type
      if (!formData.estimationType) {
        errors.push('Veuillez sélectionner un type d\'estimation');
      }
      break;
    
    case 4: // Construction Details
      if (typeof formData.surface === 'undefined' || Number(formData.surface) <= 0) {
        errors.push('Veuillez entrer une surface valide');
      }
      break;
    
    case 45: // Contact Form
      if (!formData.firstName) {
        errors.push('Veuillez entrer votre prénom');
      }
      if (!formData.lastName) {
        errors.push('Veuillez entrer votre nom');
      }
      if (!formData.email) {
        errors.push('Veuillez entrer votre adresse email');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Veuillez entrer une adresse email valide');
      }
      if (!formData.phone) {
        errors.push('Veuillez entrer votre numéro de téléphone');
      }
      break;
    
    // Add validations for other steps as needed
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
