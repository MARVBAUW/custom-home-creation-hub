
import { FormData } from '../types';
import { FLOORING_MATERIAL_COSTS } from './materialCosts';

// Function to calculate finishing costs
export const calculateFinishingCosts = (formData: FormData) => {
  const surface = typeof formData.surface === 'string' 
    ? parseFloat(formData.surface) 
    : (formData.surface || 0);
  
  // Base finishing cost per m²
  let baseCost = 400; // Default
  
  // Adjust for finish standard if available
  if (formData.finishStandard || formData.finishLevel) {
    const finishLevel = formData.finishStandard || formData.finishLevel;
    
    switch (finishLevel) {
      case 'economic':
      case 'basic':
        baseCost = 300;
        break;
      case 'standard':
      case 'medium':
        baseCost = 400;
        break;
      case 'premium':
      case 'high':
        baseCost = 600;
        break;
      case 'luxury':
        baseCost = 900;
        break;
      default:
        baseCost = 400;
    }
  }
  
  // Adjustments for specific elements
  
  // Flooring
  let flooringCost = 0;
  
  if (formData.floorTileType) {
    const tileQuality = formData.floorTileType.includes('luxury') ? 'luxury' 
      : formData.floorTileType.includes('premium') ? 'premium' : 'standard';
    
    const floorTilePercentage = typeof formData.floorTilePercentage === 'string' 
      ? parseFloat(formData.floorTilePercentage) / 100 
      : (formData.floorTilePercentage || 0) / 100;
    
    if (FLOORING_MATERIAL_COSTS.tiles[tileQuality as keyof typeof FLOORING_MATERIAL_COSTS.tiles]) {
      flooringCost += FLOORING_MATERIAL_COSTS.tiles[tileQuality as keyof typeof FLOORING_MATERIAL_COSTS.tiles] * surface * floorTilePercentage;
    }
  }
  
  if (formData.parquetType) {
    const parquetQuality = formData.parquetType.includes('luxury') ? 'luxury' 
      : formData.parquetType.includes('premium') ? 'premium' : 'standard';
    
    const parquetPercentage = typeof formData.parquetPercentage === 'string' 
      ? parseFloat(formData.parquetPercentage) / 100 
      : (formData.parquetPercentage || 0) / 100;
    
    if (FLOORING_MATERIAL_COSTS.parquet[parquetQuality as keyof typeof FLOORING_MATERIAL_COSTS.parquet]) {
      flooringCost += FLOORING_MATERIAL_COSTS.parquet[parquetQuality as keyof typeof FLOORING_MATERIAL_COSTS.parquet] * surface * parquetPercentage;
    }
  }
  
  if (formData.softFloorType) {
    const softQuality = formData.softFloorType.includes('luxury') ? 'luxury' 
      : formData.softFloorType.includes('premium') ? 'premium' : 'standard';
    
    const softFloorPercentage = typeof formData.softFloorPercentage === 'string' 
      ? parseFloat(formData.softFloorPercentage) / 100 
      : (formData.softFloorPercentage || 0) / 100;
    
    if (FLOORING_MATERIAL_COSTS.soft_floor[softQuality as keyof typeof FLOORING_MATERIAL_COSTS.soft_floor]) {
      flooringCost += FLOORING_MATERIAL_COSTS.soft_floor[softQuality as keyof typeof FLOORING_MATERIAL_COSTS.soft_floor] * surface * softFloorPercentage;
    }
  }
  
  // If no specific flooring was selected, use the base cost
  if (flooringCost === 0) {
    flooringCost = baseCost * surface * 0.2; // Assume flooring is 20% of finishing cost
  }
  
  // Calculate the total finishing costs
  // Base finishing without flooring (which we calculated separately)
  const baseFinishingWithoutFlooring = baseCost * surface * 0.8;
  const totalFinishingCost = baseFinishingWithoutFlooring + flooringCost;
  
  return totalFinishingCost;
};
