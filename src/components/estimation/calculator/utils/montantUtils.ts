
import { FormData } from '../types';
import { ensureNumber, percentageToNumber } from './typeConversions';

/**
 * Returns default form data
 */
export const getDefaultFormData = (): FormData => {
  return {
    clientType: 'individual',
    projectType: 'construction',
    surface: 100,
    city: '',
    location: '',
    constructionType: 'standard',
    bedrooms: 2,
    bathrooms: 1
  };
};

/**
 * Calculate the detailed facade cost based on facade types and percentages
 */
export const calculateDetailedFacadeCost = (
  formData: FormData,
  stonePercentage: string = '0',
  plasterPercentage: string = '0',
  brickPercentage: string = '0',
  metalCladdingPercentage: string = '0',
  woodCladdingPercentage: string = '0',
  stoneCladdingPercentage: string = '0'
): number => {
  // Base cost per square meter for each facade type
  const stoneCost = 280;
  const plasterCost = 120;
  const brickCost = 190;
  const metalCladdingCost = 210;
  const woodCladdingCost = 240;
  const stoneCladdingCost = 320;
  
  // Default facade surface if not specified
  const facadeSurface = formData.facadeSurface || formData.surface * 1.2 || 100;
  
  // Convert percentage strings to numbers
  const stonePercent = percentageToNumber(stonePercentage);
  const plasterPercent = percentageToNumber(plasterPercentage);
  const brickPercent = percentageToNumber(brickPercentage);
  const metalCladdingPercent = percentageToNumber(metalCladdingPercentage);
  const woodCladdingPercent = percentageToNumber(woodCladdingPercentage);
  const stoneCladdingPercent = percentageToNumber(stoneCladdingPercentage);
  
  // Calculate the total cost based on percentages
  const totalCost = 
    (facadeSurface * (stonePercent / 100) * stoneCost) +
    (facadeSurface * (plasterPercent / 100) * plasterCost) +
    (facadeSurface * (brickPercent / 100) * brickCost) +
    (facadeSurface * (metalCladdingPercent / 100) * metalCladdingCost) +
    (facadeSurface * (woodCladdingPercent / 100) * woodCladdingCost) +
    (facadeSurface * (stoneCladdingPercent / 100) * stoneCladdingCost);
  
  return totalCost;
};

/**
 * Calculate the new total montant based on the old total and facade cost
 */
export const calculateNewMontantT = (
  currentMontantT: number,
  facadeCost: number
): number => {
  // Adjust the total based on the new facade cost
  // This is a simple implementation - it may need to be refined based on your business logic
  return currentMontantT + facadeCost;
};

/**
 * Calculate heating cost based on surface and heating type
 */
export const calculateHeatingCost = (formData: FormData, heatingType: string): number => {
  const surface = ensureNumber(formData.surface);
  const baseRate = heatingType === 'electric' ? 100 : (heatingType === 'gas' ? 150 : 200);
  return surface * baseRate;
};

/**
 * Calculate air conditioning cost
 */
export const calculateAirConditioningCost = (formData: FormData, hasAirConditioning: boolean): number => {
  if (!hasAirConditioning) return 0;
  const surface = ensureNumber(formData.surface);
  return surface * 120;
};

/**
 * Calculate electricity cost
 */
export const calculateElectricityCost = (formData: FormData, complexityLevel: string): number => {
  const surface = ensureNumber(formData.surface);
  const rateMap: Record<string, number> = {
    'basic': 60,
    'standard': 90,
    'complex': 120
  };
  const rate = rateMap[complexityLevel] || 90;
  return surface * rate;
};

/**
 * Calculate insulation cost
 */
export const calculateInsulationCost = (formData: FormData, insulationType: string): number => {
  const surface = ensureNumber(formData.surface);
  const rateMap: Record<string, number> = {
    'basic': 40,
    'standard': 60,
    'high': 100
  };
  const rate = rateMap[insulationType] || 60;
  return surface * rate;
};

/**
 * Calculate windows cost
 */
export const calculateWindowsCost = (formData: FormData, windowType: string, quantity: number): number => {
  const priceMap: Record<string, number> = {
    'pvc': 500,
    'aluminum': 800,
    'wood': 1000,
    'high-performance': 1200
  };
  const unitPrice = priceMap[windowType] || 500;
  return unitPrice * quantity;
};

/**
 * Calculate doors cost
 */
export const calculateDoorsCost = (formData: FormData, doorType: string, quantity: number): number => {
  const priceMap: Record<string, number> = {
    'interior': 300,
    'exterior': 1000,
    'security': 1500,
    'sliding': 1200
  };
  const unitPrice = priceMap[doorType] || 300;
  return unitPrice * quantity;
};

/**
 * Calculate plumbing cost
 */
export const calculatePlumbingCost = (formData: FormData, complexityLevel: string): number => {
  const surface = ensureNumber(formData.surface);
  const bathrooms = ensureNumber(formData.bathrooms);
  const baseRate = 80;
  const bathroomMultiplier = complexityLevel === 'basic' ? 1000 : (complexityLevel === 'standard' ? 1500 : 2500);
  return (surface * baseRate) + (bathrooms * bathroomMultiplier);
};

/**
 * Calculate kitchen cost
 */
export const calculateKitchenCost = (formData: FormData, kitchenType: string): number => {
  const priceMap: Record<string, number> = {
    'basic': 5000,
    'standard': 10000,
    'premium': 20000,
    'luxury': 35000
  };
  return priceMap[kitchenType] || 10000;
};

/**
 * Calculate floor tiling cost
 */
export const calculateFloorTilingCost = (formData: FormData, tileType: string): number => {
  const surface = ensureNumber(formData.surface);
  const rateMap: Record<string, number> = {
    'ceramic': 60,
    'porcelain': 90,
    'natural-stone': 150,
    'high-end': 200
  };
  const rate = rateMap[tileType] || 90;
  return surface * 0.7 * rate; // Assume tiling covers about 70% of the floor area
};

/**
 * Calculate wall tiling cost
 */
export const calculateWallTilingCost = (formData: FormData, tileType: string, area: number): number => {
  const rateMap: Record<string, number> = {
    'ceramic': 50,
    'porcelain': 80,
    'natural-stone': 130,
    'high-end': 180
  };
  const rate = rateMap[tileType] || 80;
  return area * rate;
};

/**
 * Calculate demolition cost
 */
export const calculateDemolitionCost = (formData: FormData, demolitionType: string, area: number): number => {
  const rateMap: Record<string, number> = {
    'interior-walls': 70,
    'load-bearing-walls': 150,
    'flooring': 40,
    'ceiling': 50,
    'complete': 200
  };
  const rate = rateMap[demolitionType] || 100;
  return area * rate;
};

/**
 * Calculate masonry wall cost
 */
export const calculateMasonryWallCost = (formData: FormData, wallType: string, area: number): number => {
  const rateMap: Record<string, number> = {
    'brick': 120,
    'concrete-block': 100,
    'reinforced-concrete': 180,
    'stone': 250
  };
  const rate = rateMap[wallType] || 120;
  return area * rate;
};

/**
 * Calculate floor cost
 */
export const calculateFloorCost = (formData: FormData, floorType: string, area: number): number => {
  const rateMap: Record<string, number> = {
    'concrete-slab': 140,
    'wood-frame': 180,
    'steel-frame': 220,
    'composite': 200
  };
  const rate = rateMap[floorType] || 140;
  return area * rate;
};

/**
 * Calculate structural feature cost
 */
export const calculateStructuralFeatureCost = (formData: FormData, featureType: string, quantity: number): number => {
  const priceMap: Record<string, number> = {
    'beam': 1000,
    'column': 800,
    'archway': 1200,
    'staircase': 5000
  };
  const unitPrice = priceMap[featureType] || 1000;
  return unitPrice * quantity;
};

/**
 * Calculate roof framework renovation cost
 */
export const calculateRoofFrameworkRenovCost = (formData: FormData, renovationType: string, area: number): number => {
  const rateMap: Record<string, number> = {
    'repair': 120,
    'partial-replacement': 200,
    'complete-replacement': 350
  };
  const rate = rateMap[renovationType] || 200;
  return area * rate;
};

/**
 * Calculate roofing renovation cost
 */
export const calculateRoofingRenovCost = (formData: FormData, roofingType: string, area: number): number => {
  const rateMap: Record<string, number> = {
    'tiles': 100,
    'slate': 150,
    'metal': 120,
    'flat-roof': 180
  };
  const rate = rateMap[roofingType] || 120;
  return area * rate;
};

/**
 * Calculate landscaping cost
 */
export const calculateLandscapingCost = (formData: FormData, landscapingType: string, area: number): number => {
  const rateMap: Record<string, number> = {
    'lawn': 20,
    'garden': 50,
    'hardscape': 150,
    'water-feature': 200
  };
  const rate = rateMap[landscapingType] || 50;
  return area * rate;
};

/**
 * Calculate fencing cost
 */
export const calculateFencingCost = (formData: FormData, fencingType: string, length: number): number => {
  const rateMap: Record<string, number> = {
    'wood': 80,
    'metal': 120,
    'composite': 150,
    'stone': 250
  };
  const rate = rateMap[fencingType] || 100;
  return length * rate;
};

/**
 * Calculate gate cost
 */
export const calculateGateCost = (formData: FormData, gateType: string, width: number): number => {
  const basePrice: Record<string, number> = {
    'standard': 800,
    'automatic': 2000,
    'decorative': 1500,
    'security': 2500
  };
  const price = basePrice[gateType] || 1000;
  return price * (width / 3); // Adjust price based on width, assuming standard width is 3m
};

/**
 * Calculate terrace cost
 */
export const calculateTerraceCost = (formData: FormData, terraceType: string, area: number): number => {
  const rateMap: Record<string, number> = {
    'concrete': 100,
    'wood': 180,
    'composite': 220,
    'stone': 250,
    'tile': 180
  };
  const rate = rateMap[terraceType] || 180;
  return area * rate;
};

/**
 * Calculate renewable energy system cost
 */
export const calculateRenewableEnergyCost = (formData: FormData, systemType: string): number => {
  const priceMap: Record<string, number> = {
    'solar-panels': 15000,
    'geothermal': 25000,
    'heat-pump': 12000,
    'wind': 20000
  };
  return priceMap[systemType] || 15000;
};

/**
 * Calculate residential elevator cost
 */
export const calculateElevatorCost = (formData: FormData, elevatorType: string): number => {
  const priceMap: Record<string, number> = {
    'standard': 25000,
    'panoramic': 35000,
    'luxury': 50000
  };
  return priceMap[elevatorType] || 25000;
};

/**
 * Calculate swimming pool cost
 */
export const calculateSwimmingPoolCost = (formData: FormData, poolType: string, area: number): number => {
  const rateMap: Record<string, number> = {
    'concrete': 1000,
    'fiberglass': 800,
    'vinyl': 600,
    'infinity': 1500
  };
  const rate = rateMap[poolType] || 1000;
  return area * rate;
};
