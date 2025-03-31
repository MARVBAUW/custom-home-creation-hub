
import { FormData } from '../types';

/**
 * Determine the next step based on the current step and form data
 */
export const determineNextStep = (currentStep: number, formData: FormData): number => {
  // If skipToContact is set, go directly to contact form
  if (formData.skipToContact) {
    return 16; // Contact step
  }
  
  // If current step is the client type selection (step 0)
  if (currentStep === 0) {
    if (formData.clientType === 'professional') {
      return 1; // Professional project details
    }
    return 2; // Individual project type
  }
  
  // If current step is professional project details (step 1)
  if (currentStep === 1) {
    return 3; // Estimation type step
  }
  
  // If current step is individual project type (step 2)
  if (currentStep === 2) {
    // For optimisation or design projects, skip to contact
    if (formData.projectType === 'optimisation' || formData.projectType === 'design') {
      return 16; // Skip to contact form
    }
    return 3; // Estimation type step
  }
  
  // If current step is estimation type (step 3)
  if (currentStep === 3) {
    return 4; // Construction details
  }
  
  // If current step is construction details (step 4)
  if (currentStep === 4) {
    return 5; // Terrain step
  }
  
  // If current step is terrain (step 5)
  if (currentStep === 5) {
    return 6; // Demolition step
  }
  
  // If current step is demolition (step 6)
  if (currentStep === 6) {
    return 7; // Gros Oeuvre step
  }
  
  // If current step is gros oeuvre (step 7)
  if (currentStep === 7) {
    return 8; // Charpente step
  }
  
  // If current step is charpente (step 8)
  if (currentStep === 8) {
    return 9; // Combles step
  }
  
  // If current step is combles (step 9)
  if (currentStep === 9) {
    return 10; // Couverture step
  }
  
  // If current step is couverture (step 10)
  if (currentStep === 10) {
    // If renovation or division project, go to renovation specific step
    if (formData.projectType === 'renovation' || formData.projectType === 'division') {
      return 11; // Renovation specific step
    }
    return 12; // Rooms details step
  }
  
  // If current step is renovation specific (step 11)
  if (currentStep === 11) {
    return 12; // Rooms details step
  }
  
  // For remaining steps, just increment
  return currentStep + 1;
};

/**
 * Determine the previous step based on the current step and form data
 */
export const determinePreviousStep = (currentStep: number, formData: FormData): number => {
  // If at step 1 (professional project details), go back to client type
  if (currentStep === 1) {
    return 0;
  }
  
  // If at step 2 (individual project type), go back to client type
  if (currentStep === 2) {
    return 0;
  }
  
  // If at step 11 (renovation specific), go back to couverture
  if (currentStep === 11) {
    return 10;
  }
  
  // If at step 12 (rooms details) and renovation/division, go back to renovation specific
  if (currentStep === 12 && (formData.projectType === 'renovation' || formData.projectType === 'division')) {
    return 11;
  }
  
  // For all other steps, just decrement
  return Math.max(0, currentStep - 1);
};

/**
 * Recalculate the estimation when form data changes
 */
export const recalculateEstimation = (formData: FormData): number => {
  // Base amount calculation based on form data
  let total = 0;
  
  // Add existing montantT if it exists
  if (formData.montantT) {
    total = formData.montantT;
  }
  
  // Add any additional calculations here
  
  return total;
};
