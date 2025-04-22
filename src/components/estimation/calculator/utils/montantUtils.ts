
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
