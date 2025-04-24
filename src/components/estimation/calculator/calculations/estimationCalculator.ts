import { ensureNumber } from '../utils/typeConversions';

/**
 * Calculates the base cost of construction based on project and construction type
 */
export const calculateConstructionBaseCost = (formData: any): number => {
  const { projectType, constructionType, surface } = formData;
  let baseCost = 0;

  if (!surface) {
    return 0; // No cost if no surface is defined
  }

  // Define base costs per square meter for different construction types
  const constructionCosts: { [key: string]: number } = {
    newConstruction: 1500, // Cost per m² for new construction
    renovation: 800,       // Cost per m² for renovation
    extension: 1200        // Cost per m² for extension
  };

  // Determine the construction type
  let selectedConstructionType = 'renovation'; // Default value
  if (projectType === 'construction') {
    selectedConstructionType = 'newConstruction';
  } else if (projectType === 'extension') {
    selectedConstructionType = 'extension';
  }

  // Get the cost per square meter for the selected construction type
  const costPerSqM = constructionCosts[selectedConstructionType] || constructionCosts['renovation'];

  // Calculate the base cost
  baseCost = surface * costPerSqM;

  return baseCost;
};

/**
 * Calculates the cost of the kitchen based on the selected kitchen type
 */
export const calculateKitchenCost = (formData: any): number => {
  const { kitchenType, surface } = formData;
  let kitchenCost = 0;

  if (!surface) {
    return 0; // No cost if no surface is defined
  }

  // Define kitchen costs per square meter for different kitchen types
  const kitchenCosts: { [key: string]: number } = {
    basic: 300,    // Cost per m² for a basic kitchen
    standard: 500, // Cost per m² for a standard kitchen
    premium: 800   // Cost per m² for a premium kitchen
  };

  // Get the cost per square meter for the selected kitchen type
  const costPerSqM = kitchenCosts[kitchenType] || 0;

  // Calculate the kitchen cost
  kitchenCost = surface * costPerSqM;

  return kitchenCost;
};

/**
 * Calculates the cost of the bathroom based on the selected bathroom type
 */
export const calculateBathroomCost = (formData: any): number => {
    const { bathroomType, bathrooms, surface } = formData;
    let bathroomCost = 0;

    if (!surface) {
        return 0; // No cost if no surface is defined
    }

    // Define bathroom costs per square meter for different bathroom types
    const bathroomCosts: { [key: string]: number } = {
        standard: 400,  // Cost per m² for a standard bathroom
        midRange: 700,  // Cost per m² for a mid-range bathroom
        premium: 1200, // Cost per m² for a premium bathroom
    };

    // Get the cost per square meter for the selected bathroom type
    let costPerSqM = 0;
    if (bathroomType && bathroomType !== 'none') {
        costPerSqM = bathroomCosts[bathroomType] || 0;
    }

    // Calculate the bathroom cost
    bathroomCost = (bathrooms || 1) * surface * costPerSqM;

    return bathroomCost;
};

/**
 * Calculates the cost of windows based on the number of windows
 */
export const calculateWindowsCost = (formData: any): number => {
  const { windows, surface } = formData;
  let windowsCost = 0;

  if (!surface) {
    return 0; // No cost if no surface is defined
  }

  // Define window cost per window
  const windowCostPerUnit = 300;

  // Calculate the windows cost
  windowsCost = (windows || 0) * windowCostPerUnit;

  return windowsCost;
};

/**
 * Calculates the cost of eco options based on selected options
 */
export const calculateEcoOptionsCost = (formData: any): number => {
  const { ecoOptions, surface } = formData;
  let ecoOptionsCost = 0;

  if (!surface) {
    return 0; // No cost if no surface is defined
  }

  // Define eco options costs per square meter for different eco options
  const ecoOptionsCosts: { [key: string]: number } = {
    solarPanels: 500,       // Cost per m² for solar panels
    insulation: 200,        // Cost per m² for insulation
    rainwaterHarvesting: 300 // Cost per m² for rainwater harvesting
  };

  // Calculate the eco options cost
  if (ecoOptions) {
    Object.keys(ecoOptions).forEach(option => {
      ecoOptionsCost += surface * (ecoOptionsCosts[option] || 0);
    });
  }

  return ecoOptionsCost;
};

/**
 * Main estimation calculator function that combines all calculations
 */
export const calculateEstimation = (formData: any): number => {
  // Base cost calculation based on construction type
  const baseCost = calculateConstructionBaseCost(formData);
  
  // Add costs for specific room types
  const kitchenCost = calculateKitchenCost(formData);
  const bathroomCost = calculateBathroomCost(formData);
  
  // Add costs for windows
  const windowsCost = calculateWindowsCost(formData);
  
  // Add costs for eco options if selected
  const ecoOptionsCost = formData.includeEcoSolutions ? calculateEcoOptionsCost(formData) : 0;
  
  // Calculate total
  return baseCost + kitchenCost + bathroomCost + windowsCost + ecoOptionsCost;
};
