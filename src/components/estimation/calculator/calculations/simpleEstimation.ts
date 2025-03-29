
import { FormData } from '../types';
import { parseToNumber } from '../utils/typeConversions';

// Simple estimation calculation
export const calculateEstimation = (formData: FormData): number => {
  const {
    projectType,
    surface,
    finishLevel,
    terrainType,
    landPrice,
    landIncluded,
  } = formData;

  // Parse surface to number
  const surfaceValue = parseToNumber(surface);
  const landPriceValue = parseToNumber(landPrice);

  // Base cost per square meter
  let baseCostPerSqMeter = 1500; // Default for construction

  // Adjust based on project type
  if (projectType === 'renovation') {
    baseCostPerSqMeter = 1200;
  } else if (projectType === 'extension') {
    baseCostPerSqMeter = 1800;
  } else if (projectType === 'design') {
    baseCostPerSqMeter = 300;
  }

  // Adjust based on finish level
  if (finishLevel === 'premium') {
    baseCostPerSqMeter *= 1.2;
  } else if (finishLevel === 'luxe') {
    baseCostPerSqMeter *= 1.4;
  }

  // Adjust based on terrain type
  let terrainMultiplier = 1;
  if (terrainType === 'sloping') {
    terrainMultiplier = 1.1;
  } else if (terrainType === 'wooded') {
    terrainMultiplier = 1.15;
  }

  // Calculate base construction cost
  let totalCost = baseCostPerSqMeter * surfaceValue * terrainMultiplier;

  // Add land price if included
  if (landIncluded === 'yes' && landPriceValue > 0) {
    totalCost += landPriceValue;
  }

  // Add 20% VAT
  totalCost *= 1.2;

  return Math.round(totalCost);
};
