import { ensureNumber, ensureBoolean } from './typeConversions';

// Re-export for backwards compatibility with existing code
export { ensureNumber, ensureBoolean };

// Function to calculate the cost of floor tiling based on type and surface area
export const calculateFloorTilingCost = (type: string, percentage: number, surface: number): number => {
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'standard':
      costPerSquareMeter = 30;
      break;
    case 'medium':
      costPerSquareMeter = 50;
      break;
    case 'premium':
      costPerSquareMeter = 80;
      break;
    default:
      costPerSquareMeter = 30;
      break;
  }
  
  const area = surface * (percentage / 100);
  return area * costPerSquareMeter;
};

// Function to calculate the cost of wall tiling based on type and surface area
export const calculateWallTilingCost = (type: string, surface: number): number => {
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'standard':
      costPerSquareMeter = 40;
      break;
    case 'medium':
      costPerSquareMeter = 60;
      break;
    case 'premium':
      costPerSquareMeter = 90;
      break;
    default:
      costPerSquareMeter = 40;
      break;
  }
  
  return surface * costPerSquareMeter;
};

// Function to calculate the cost of heating based on type and surface area
export const calculateHeatingCost = (type: string, surface: number): number => {
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'standard':
      costPerSquareMeter = 25;
      break;
    case 'eco':
      costPerSquareMeter = 40;
      break;
    case 'economic':
      costPerSquareMeter = 30;
      break;
    case 'sans_avis':
      costPerSquareMeter = 35;
      break;
    case 'non_concerne':
      costPerSquareMeter = 0;
      break;
    default:
      costPerSquareMeter = 25;
      break;
  }
  
  return surface * costPerSquareMeter;
};

// Function to calculate the cost of air conditioning based on selection and surface area
export const calculateAirConditioningCost = (hasAirConditioning: boolean, surface: number): number => {
  if (hasAirConditioning) {
    return surface * 35;
  }
  return 0;
};

// Function to calculate the cost of a kitchen based on type
export const calculateKitchenCost = (type: string): number => {
  switch (type) {
    case 'basic':
      return 3000;
    case 'standard':
      return 5000;
    case 'premium':
      return 8000;
    case 'luxury':
      return 15000;
    default:
      return 5000;
  }
};

// Function to calculate the cost of a bathroom based on type
export const calculateBathroomCost = (type: string): number => {
  switch (type) {
    case 'basic':
      return 2000;
    case 'standard':
      return 4000;
    case 'premium':
      return 7000;
    case 'luxury':
      return 12000;
    default:
      return 4000;
  }
};

// Function to calculate the cost of landscaping based on type and area
export const calculateLandscapingCost = (type: string, area: number): number => {
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'UN PEU':
      costPerSquareMeter = 30;
      break;
    case 'BEAUCOUP':
      costPerSquareMeter = 50;
      break;
    case 'PASSIONNEMENT':
      costPerSquareMeter = 80;
      break;
    default:
      costPerSquareMeter = 30;
      break;
  }
  
  return area * costPerSquareMeter;
};

// Function to calculate the cost of fencing based on length
export const calculateFencingCost = (length: number): number => {
  return length * 100;
};

// Function to calculate the cost of a gate based on length
export const calculateGateCost = (length: number): number => {
  return length * 500;
};

// Function to calculate the cost of a terrace based on area
export const calculateTerraceCost = (area: number): number => {
  return area * 150;
};

/**
 * Calculate the cost of demolition based on type, surface, and percentage
 * @param type - The type of demolition
 * @param surface - The surface area to be demolished
 * @param percentage - The percentage of the surface to be demolished
 * @returns The cost of demolition
 */
export const calculateDemolitionCost = (type: string, surface: number, percentage: number): number => {
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'GROS OEUVRE (MACONNERIE, DALLE..)':
      costPerSquareMeter = 80;
      break;
    case 'REVETEMENT DE FACADE':
      costPerSquareMeter = 50;
      break;
    case 'PLATRERIE':
      costPerSquareMeter = 30;
      break;
    case 'REVETEMENTS DE SOL':
      costPerSquareMeter = 20;
      break;
    case 'MENUISERIES INTERIEURES':
      costPerSquareMeter = 40;
      break;
    case 'MENUISERIES EXTERIEURES':
      costPerSquareMeter = 60;
      break;
    case 'PLOMBERIE':
      costPerSquareMeter = 50;
      break;
    case 'EQUIPEMENTS SANITAIRES':
      costPerSquareMeter = 70;
      break;
    case 'ELECTRICITE':
      costPerSquareMeter = 40;
      break;
    case 'CLIMATISATION':
      costPerSquareMeter = 80;
      break;
    case 'VENTILATION':
      costPerSquareMeter = 50;
      break;
    case 'CHAUFFAGE':
      costPerSquareMeter = 60;
      break;
    case 'TOTALITE HORS GROS OEUVRE':
      costPerSquareMeter = 150;
      break;
    default:
      costPerSquareMeter = 0;
      break;
  }
  
  return surface * (percentage / 100) * costPerSquareMeter;
};

/**
 * Calculate the cost of roof framework renovation based on type and area
 * @param type - The type of roof framework
 * @param area - The area to be renovated
 * @returns The cost of roof framework renovation
 */
export const calculateRoofFrameworkRenovCost = (type: string, area: string | number): number => {
  const areaNumber = ensureNumber(area);
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'TOITURE TERRASSE ACCESSIBLE':
      costPerSquareMeter = 190;
      break;
    case 'TOITURE TERRASSE INACCESSIBLE':
      costPerSquareMeter = 180;
      break;
    case 'CHARPENTE INDUSTRIELLE':
      costPerSquareMeter = 160;
      break;
    case 'CHARPENTE TRADITIONNELLE':
      costPerSquareMeter = 185;
      break;
    default:
      costPerSquareMeter = 0;
      break;
  }
  
  return areaNumber * costPerSquareMeter;
};

/**
 * Calculate the cost of roof covering renovation based on type and area
 * @param type - The type of roof covering
 * @param area - The area to be renovated
 * @returns The cost of roof covering renovation
 */
export const calculateRoofCoveringRenovCost = (type: string, area: string | number): number => {
  const areaNumber = ensureNumber(area);
  let costPerSquareMeter = 0;
  
  switch (type) {
    case 'TUILES':
      costPerSquareMeter = 90;
      break;
    case 'ARDOISES':
      costPerSquareMeter = 120;
      break;
    case 'ZINC':
      costPerSquareMeter = 150;
      break;
    default:
      costPerSquareMeter = 0;
      break;
  }
  
  return areaNumber * costPerSquareMeter;
};

/**
 * Calculate the cost of facade work based on the percentages of different materials
 * @param formData - The form data containing the surface area
 * @param stonePercentage - The percentage of stone facade
 * @param plasterPercentage - The percentage of plaster facade
 * @param brickPercentage - The percentage of brick facade
 * @param metalCladdingPercentage - The percentage of metal cladding facade
 * @param woodCladdingPercentage - The percentage of wood cladding facade
 * @param stoneCladdingPercentage - The percentage of stone cladding facade
 * @returns The cost of facade work
 */
export const calculateDetailedFacadeCost = (
  formData: any,
  stonePercentage: string,
  plasterPercentage: string,
  brickPercentage: string,
  metalCladdingPercentage: string,
  woodCladdingPercentage: string,
  stoneCladdingPercentage: string
): number => {
  const surface = ensureNumber(formData.surface, 0);
  
  const stoneArea = surface * (ensureNumber(stonePercentage, 0) / 100);
  const plasterArea = surface * (ensureNumber(plasterPercentage, 0) / 100);
  const brickArea = surface * (ensureNumber(brickPercentage, 0) / 100);
  const metalCladdingArea = surface * (ensureNumber(metalCladdingPercentage, 0) / 100);
  const woodCladdingArea = surface * (ensureNumber(woodCladdingPercentage, 0) / 100);
  const stoneCladdingArea = surface * (ensureNumber(stoneCladdingPercentage, 0) / 100);
  
  const stoneCost = stoneArea * 150;
  const plasterCost = plasterArea * 80;
  const brickCost = brickArea * 120;
  const metalCladdingCost = metalCladdingArea * 180;
  const woodCladdingCost = woodCladdingArea * 160;
  const stoneCladdingCost = stoneCladdingArea * 200;
  
  return stoneCost + plasterCost + brickCost + metalCladdingCost + woodCladdingCost + stoneCladdingCost;
};

/**
 * Calculate the new montantT by adding the newAmount to the existing montantT
 * @param currentMontantT - The current montantT, could be a string, number, or undefined
 * @param newAmount - The new amount to add
 * @returns The new montantT
 */
export const calculateNewMontantT = (currentMontantT: string | number | undefined, newAmount: number): number => {
  return ensureNumber(currentMontantT, 0) + newAmount;
};
