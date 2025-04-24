import { EstimationFormData, FormData } from '../types/formTypes';

// Base cost calculation per square meter based on construction type
export const calculateConstructionBaseCost = (formData: EstimationFormData | FormData): number => {
  const { projectType, constructionType, surface } = formData;
  let baseCost = 0;
  
  if (!surface || surface <= 0) {
    return 0;
  }
  
  // Default costs per m² based on project and construction type
  switch (projectType) {
    case 'construction':
      switch (constructionType) {
        case 'traditional':
          baseCost = 1600;
          break;
        case 'wooden':
          baseCost = 1800;
          break;
        case 'eco':
          baseCost = 2000;
          break;
        default:
          baseCost = 1700; // Default for construction
      }
      break;
    case 'renovation':
      switch (constructionType) {
        case 'light':
          baseCost = 700;
          break;
        case 'medium':
          baseCost = 1100;
          break;
        case 'heavy':
          baseCost = 1500;
          break;
        default:
          baseCost = 1000; // Default for renovation
      }
      break;
    case 'extension':
      switch (constructionType) {
        case 'traditional':
          baseCost = 1700;
          break;
        case 'wooden':
          baseCost = 1900;
          break;
        default:
          baseCost = 1800; // Default for extension
      }
      break;
    default:
      baseCost = 1500; // General default
  }
  
  // Adjust for surface area (economies of scale)
  if (surface > 200) {
    baseCost *= 0.9; // 10% discount for large areas
  } else if (surface < 50) {
    baseCost *= 1.15; // 15% increase for small areas
  }
  
  return baseCost * surface;
};

// Calculate kitchen cost based on selected type
export const calculateKitchenCost = (formData: FormData): number => {
  const { kitchenType } = formData;
  
  switch (kitchenType) {
    case 'basic':
      return 5000;
    case 'standard':
      return 10000;
    case 'premium':
      return 20000;
    default:
      return 0; // No kitchen
  }
};

// Calculate bathroom cost based on type and count
export const calculateBathroomCost = (formData: FormData): number => {
  const { bathroomType, bathroomCount } = formData;
  let baseCost = 0;
  
  if (bathroomType === 'none' || !bathroomCount) {
    return 0;
  }
  
  switch (bathroomType) {
    case 'standard':
      baseCost = 3500;
      break;
    case 'mid-range':
      baseCost = 6000;
      break;
    case 'premium':
      baseCost = 12000;
      break;
    default:
      baseCost = 0;
  }
  
  return baseCost * bathroomCount;
};

// Calculate windows cost
export const calculateWindowsCost = (formData: FormData): number => {
  const { surface, menuiseriesExtType } = formData;
  
  if (!surface) return 0;
  
  // Estimate window area as 15% of total surface
  const estimatedWindowArea = surface * 0.15;
  
  // Cost per m² based on material
  let costPerSqm = 0;
  switch (menuiseriesExtType) {
    case 'pvc':
      costPerSqm = 400;
      break;
    case 'aluminum':
      costPerSqm = 700;
      break;
    case 'wood':
      costPerSqm = 800;
      break;
    case 'wood_aluminum':
      costPerSqm = 1000;
      break;
    default:
      costPerSqm = 500; // Default
  }
  
  return estimatedWindowArea * costPerSqm;
};

// Calculate eco-friendly options cost
export const calculateEcoOptionsCost = (formData: FormData): number => {
  let totalCost = 0;
  const { includeRenewableEnergy, includeEcoSolutions, surface } = formData;
  
  if (!surface) return 0;
  
  if (includeRenewableEnergy) {
    // Solar panels, heat pumps, etc.
    totalCost += 15000 + (surface * 50);
  }
  
  if (includeEcoSolutions) {
    // Rainwater harvesting, extra insulation, etc.
    totalCost += 8000 + (surface * 30);
  }
  
  return totalCost;
};
