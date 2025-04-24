import { FormData } from '../types';

export const simpleEstimation = (formData: FormData): number => {
  let basePrice = 500; // Base price per square meter
  let totalPrice = 0;

  // Adjust base price based on project type
  if (formData.projectType === 'renovation') {
    basePrice = 700; // Higher base price for renovation
  } else if (formData.projectType === 'extension') {
    basePrice = 600; // Different base price for extension
  }

  // Get surface area
  const surface = formData.surface || 0;

  // Calculate initial total price
  totalPrice = basePrice * surface;

  // Adjustments based on other form data
  if (formData.bedrooms) {
    totalPrice += formData.bedrooms * 5000; // Additional cost per bedroom
  }
  if (formData.bathrooms) {
    totalPrice += formData.bathrooms * 7000; // Additional cost per bathroom
  }

  // Example adjustments based on construction type and terrain type
  if (formData.constructionType === 'high_end') {
    totalPrice *= 1.2; // Increase price by 20% for high-end construction
  }
  if (formData.terrainType === 'sloping') {
    totalPrice *= 1.1; // Increase price by 10% for sloping terrain
  }

  // Add land price if land is included
  if (formData.landIncluded && formData.landPrice) {
    totalPrice += formData.landPrice;
  }

  // Further adjustments can be added based on other criteria
  // For example, city, specific materials, etc.

  // Ensure the projectType is defined before calling toLowerCase()
  const lowerCaseProjectType = formData.projectType ? formData.projectType.toLowerCase() : '';

  // Apply different logic based on the project type
  if (lowerCaseProjectType === 'renovation') {
    // Renovation-specific adjustments
    totalPrice *= 1.15; // Increase price by 15% for renovation projects
  } else if (lowerCaseProjectType === 'extension') {
    // Extension-specific adjustments
    totalPrice *= 1.20; // Increase price by 20% for extension projects
  }

  return totalPrice;
};
