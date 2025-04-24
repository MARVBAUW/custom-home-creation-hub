
/**
 * This file contains utility functions for calculating estimation costs
 */

import { FormData } from '../types';

/**
 * Calculate base costs for a construction project
 */
export const calculateConstructionBaseCost = (formData: FormData): number => {
  const surface = typeof formData.surface === 'string' 
    ? parseFloat(formData.surface) 
    : (formData.surface || 0);
    
  // Base cost per m² depending on construction type
  let baseCostPerM2 = 0;
  
  switch (formData.constructionType) {
    case 'traditional':
      baseCostPerM2 = 1800;
      break;
    case 'sustainable':
      baseCostPerM2 = 2100;
      break;
    case 'prefab':
      baseCostPerM2 = 1500;
      break;
    default:
      baseCostPerM2 = 1800; // Default to traditional
  }
  
  return surface * baseCostPerM2;
};

/**
 * Calculate kitchen costs based on type and number of units
 */
export const calculateKitchenCost = (formData: FormData): number => {
  if (!formData.kitchenType || formData.kitchenType === 'none') {
    return 0;
  }
  
  const units = typeof formData.units === 'string' 
    ? parseInt(formData.units) 
    : (formData.units || 1);
  
  let costPerKitchen = 0;
  
  switch (formData.kitchenType) {
    case 'kitchenette':
      costPerKitchen = 3000;
      break;
    case 'basic':
      costPerKitchen = 5000;
      break;
    case 'standard':
      costPerKitchen = 8000;
      break;
    case 'premium':
      costPerKitchen = 15000;
      break;
    default:
      costPerKitchen = 0;
  }
  
  return costPerKitchen * units;
};

/**
 * Calculate bathroom costs based on type, count and number of units
 */
export const calculateBathroomCost = (formData: FormData): number => {
  if (!formData.bathroomType || formData.bathroomType === 'none') {
    return 0;
  }
  
  const units = typeof formData.units === 'string' 
    ? parseInt(formData.units) 
    : (formData.units || 1);
    
  const count = typeof formData.bathroomCount === 'string' 
    ? parseInt(formData.bathroomCount) 
    : (formData.bathroomCount || 1);
  
  let costPerBathroom = 0;
  
  switch (formData.bathroomType) {
    case 'standard':
      costPerBathroom = 3500;
      break;
    case 'mid-range':
      costPerBathroom = 5500;
      break;
    case 'premium':
      costPerBathroom = 8500;
      break;
    default:
      costPerBathroom = 3500; // Default to standard
  }
  
  return costPerBathroom * count * units;
};

/**
 * Calculate window costs based on type and area
 */
export const calculateWindowsCost = (windowType: string, area: number): number => {
  let costPerM2 = 0;
  
  switch (windowType) {
    case 'bois':
      costPerM2 = 850;
      break;
    case 'pvc':
      costPerM2 = 550;
      break;
    case 'alu':
      costPerM2 = 750;
      break;
    case 'mixte':
      costPerM2 = 900;
      break;
    case 'pvc_colore':
      costPerM2 = 650;
      break;
    default:
      costPerM2 = 0; // No cost if type is undefined or 'non_concerne'
  }
  
  return area * costPerM2;
};

/**
 * Calculate ecological options cost based on level and total amount
 */
export const calculateEcoOptionsCost = (formData: FormData, totalAmount: number): number => {
  if (!formData.ecoLevel) {
    return 0;
  }
  
  let ecoCoefficient = 0;
  
  switch (formData.ecoLevel) {
    case 'minimal':
      ecoCoefficient = 0.018; // +1.8%
      break;
    case 'moderate':
      ecoCoefficient = 0.038; // +3.8%
      break;
    case 'extensive':
      ecoCoefficient = 0.057; // +5.7%
      break;
    default:
      ecoCoefficient = 0;
  }
  
  return totalAmount * ecoCoefficient;
};
