
import { FormData } from '../types';
import { FLOORING_MATERIAL_COSTS } from './materialCosts';
import { ensureNumber, safeIncludes } from '../utils/typeConversions';

// Function to calculate finishing costs
export const calculateFinishingCosts = (formData: FormData) => {
  const surface = ensureNumber(formData.surface, 0);
  
  // Base finishing cost per m²
  let baseCost = 400; // Default
  
  // Adjust for finish standard if available
  if (formData.finishStandard || formData.finishLevel) {
    const finishLevel = formData.finishStandard || formData.finishLevel;
    
    // Using safe string comparison
    const finishLevelStr = String(finishLevel).toLowerCase();
    
    if (finishLevelStr.includes('economic') || finishLevelStr.includes('basic')) {
      baseCost = 300;
    } else if (finishLevelStr.includes('standard') || finishLevelStr.includes('medium')) {
      baseCost = 400;
    } else if (finishLevelStr.includes('premium') || finishLevelStr.includes('high')) {
      baseCost = 600;
    } else if (finishLevelStr.includes('luxury')) {
      baseCost = 900;
    }
  }
  
  // Adjustments for specific elements
  
  // Flooring
  let flooringCost = 0;
  
  if (formData.floorTileType) {
    const floorTileTypeStr = String(formData.floorTileType);
    const tileQuality = floorTileTypeStr.includes('luxury') ? 'luxury' 
      : floorTileTypeStr.includes('premium') ? 'premium' : 'standard';
    
    const floorTilePercentage = ensureNumber(formData.floorTilePercentage, 0) / 100;
    
    if (FLOORING_MATERIAL_COSTS.tiles[tileQuality as keyof typeof FLOORING_MATERIAL_COSTS.tiles]) {
      flooringCost += FLOORING_MATERIAL_COSTS.tiles[tileQuality as keyof typeof FLOORING_MATERIAL_COSTS.tiles] * surface * floorTilePercentage;
    }
  }
  
  if (formData.parquetType) {
    const parquetTypeStr = String(formData.parquetType);
    const parquetQuality = parquetTypeStr.includes('luxury') ? 'luxury' 
      : parquetTypeStr.includes('premium') ? 'premium' : 'standard';
    
    const parquetPercentage = ensureNumber(formData.parquetPercentage, 0) / 100;
    
    if (FLOORING_MATERIAL_COSTS.parquet[parquetQuality as keyof typeof FLOORING_MATERIAL_COSTS.parquet]) {
      flooringCost += FLOORING_MATERIAL_COSTS.parquet[parquetQuality as keyof typeof FLOORING_MATERIAL_COSTS.parquet] * surface * parquetPercentage;
    }
  }
  
  if (formData.softFloorType) {
    const softFloorTypeStr = String(formData.softFloorType);
    const softQuality = softFloorTypeStr.includes('luxury') ? 'luxury' 
      : softFloorTypeStr.includes('premium') ? 'premium' : 'standard';
    
    const softFloorPercentage = ensureNumber(formData.softFloorPercentage, 0) / 100;
    
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
