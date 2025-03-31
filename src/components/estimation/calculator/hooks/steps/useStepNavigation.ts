import { useState } from 'react';
import { FormData } from '../../types/formTypes';

export const useStepNavigation = (currentStep: number, formData: FormData) => {
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  
  // Navigate to the next step
  const goToNextStep = () => {
    setAnimationDirection('forward');
    
    let nextStep = currentStep + 1;
    
    // --- Routing based on client type ---
    if (formData.clientType === "individual") {
      // If the choice is "individual", skip the "professional project" step
      if (currentStep === 1) {
        nextStep = 3; // Go directly to "individual project" step
      }
    } else if (formData.clientType === "professional") {
      // If the choice is "professional", skip the "individual project" step
      if (currentStep === 2) {
        nextStep = 4; // Go directly to "estimation type" step
      }
    }
    
    // --- Routing based on project type ---
    if (formData.projectType === "design") {
      // For design projects, go directly to the contact step
      return {
        nextStep: 28, // Final contact step
        animationDirection: 'forward' as const
      };
    }
    
    // --- Routing based on estimation type ---
    if (formData.estimationType === "quick") {
      if (currentStep === 3) {
        // For quick estimation, go to the page of features selection (page 44)
        nextStep = 44;
      }
    }
    
    // --- Handle navigation from the features selection page ---
    if (currentStep === 44) {
      // If a next page is specified in formData, use that
      if (formData.nextPage) {
        nextStep = formData.nextPage;
      } else {
        // Otherwise, go to the contact page
        nextStep = 45;
      }
    }
    
    // --- Handle navigation from contact page to thank you page ---
    if (currentStep === 45) {
      nextStep = 46; // Thank you page
    }
    
    // --- Routing for construction/extension vs renovation/division ---
    if (formData.projectType === "construction" || formData.projectType === "extension") {
      // Skip the renovation-specific step
      if (nextStep === 29) {
        nextStep = 30; // Skip the demolition page in renovation
      }
      
      // Handle skips for specific options based on choices
      if (nextStep === 24 && !formData.includeRenewableEnergy) {
        nextStep = 25; // Skip to landscaping
      }
      if (nextStep === 25 && !formData.includeLandscaping) {
        nextStep = 26; // Skip to options
      }
      if (nextStep === 26 && !formData.includeOptions) {
        nextStep = 27; // Skip to kitchen
      }
      if (nextStep === 27 && !formData.includeCuisine) {
        nextStep = 28; // Skip to bathroom
      }
      if (nextStep === 28 && !formData.includeBathroom) {
        nextStep = 45; // Go to contact form
      }
    } else if (formData.projectType === "renovation" || formData.projectType === "division") {
      // For renovation/division projects
      if (currentStep === 22 && !formData.includeEcoSolutions) {
        nextStep = 23; // Skip to renewable energy
      }
      if (nextStep === 23 && !formData.includeRenewableEnergy) {
        nextStep = 24; // Skip to landscaping
      }
      if (nextStep === 24 && !formData.includeLandscaping) {
        nextStep = 25; // Skip to options
      }
      if (nextStep === 25 && !formData.includeOptions) {
        nextStep = 26; // Skip to kitchen
      }
      if (nextStep === 26 && !formData.includeCuisine) {
        nextStep = 27; // Skip to bathroom
      }
      if (nextStep === 27 && !formData.includeBathroom) {
        nextStep = 45; // Go to contact form
      }
    }
    
    // Make sure not to exceed the total number of available steps
    if (nextStep > 46) {
      nextStep = 46; // Final step (thank you page)
    }
    
    return {
      nextStep,
      animationDirection: 'forward' as const
    };
  };

  // Navigate to the previous step
  const goToPreviousStep = () => {
    setAnimationDirection('backward');
    
    // Similar logic for the navigation in reverse
    let prevStep = currentStep - 1;
    
    // --- Handle navigation from thank you page back to contact page ---
    if (currentStep === 46) {
      prevStep = 45; // Go back to contact page
    }
    
    // --- Client type specific navigation ---
    if (formData.clientType === "individual") {
      // If coming back from "individual project" step to client type
      if (currentStep === 3) {
        prevStep = 1; // Go back to client type step
      }
    } else if (formData.clientType === "professional") {
      // If coming back from "estimation type" to "professional project"
      if (currentStep === 4) {
        prevStep = 2; // Go back to professional project step
      }
    }
    
    // --- Project type specific navigation ---
    if (formData.projectType === "construction" || formData.projectType === "extension") {
      // Avoid going back to renovation-specific pages
      if (prevStep === 29) {
        prevStep = 28; // Skip the demolition page
      }
      
      // Handle back navigation for options
      if (prevStep === 28 && !formData.includeBathroom) {
        prevStep = 27;
      }
      if (prevStep === 27 && !formData.includeCuisine) {
        prevStep = 26;
      }
      if (prevStep === 26 && !formData.includeOptions) {
        prevStep = 25;
      }
      if (prevStep === 25 && !formData.includeLandscaping) {
        prevStep = 24;
      }
      if (prevStep === 24 && !formData.includeRenewableEnergy) {
        prevStep = 23;
      }
    } else if (formData.projectType === "renovation" || formData.projectType === "division") {
      // Handle back navigation for options in renovation
      if (prevStep === 28 && !formData.includeBathroom) {
        prevStep = 27;
      }
      if (prevStep === 27 && !formData.includeCuisine) {
        prevStep = 26;
      }
      if (prevStep === 26 && !formData.includeOptions) {
        prevStep = 25;
      }
      if (prevStep === 25 && !formData.includeLandscaping) {
        prevStep = 24;
      }
      if (prevStep === 24 && !formData.includeRenewableEnergy) {
        prevStep = 23;
      }
      if (prevStep === 23 && !formData.includeEcoSolutions) {
        prevStep = 22;
      }
    }
    
    // --- Special case for quick estimation features page ---
    if (currentStep === 44) {
      prevStep = 3; // Go back to estimation type selection
    }
    
    // --- Special case for contact page in quick flow ---
    if (currentStep === 45 && formData.estimationType === "quick") {
      prevStep = 44; // Go back to features selection
    }
    
    // Make sure not to go below step 1
    prevStep = Math.max(prevStep, 1);
    
    return {
      prevStep,
      animationDirection: 'backward' as const
    };
  };

  return {
    animationDirection,
    goToNextStep,
    goToPreviousStep,
  };
};
