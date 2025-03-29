import { useState, useEffect } from 'react';
import { FormData } from '../types';

export const useEstimationResult = (formData: FormData) => {
  const [estimationResult, setEstimationResult] = useState<number | null>(null);

  useEffect(() => {
    if (formData) {
      const result = calculateEstimationResult(formData);
      setEstimationResult(result);
    }
  }, [formData]);

  return estimationResult;
};

// Fix type conversion issues in the file by ensuring consistent types
const calculateEstimationResult = (formData: FormData) => {
  let totalCost = 50000; // Base cost

  // Fix number/string comparison issues
  if (formData.surface && typeof formData.surface === 'string') {
    const surfaceValue = parseFloat(formData.surface);
    
    if (surfaceValue < 50) {
      totalCost += 20000; // small project
    }
    else if (surfaceValue > 200) {
      totalCost += 80000; // large project
    } else {
      totalCost += 50000; // medium project
    }
  }
  
  if (formData.projectType === 'renovation') {
    totalCost *= 1.2; // Renovation costs more
  }

  if (formData.finishLevel === 'Premium (haut de gamme)') {
    totalCost *= 1.5; // High-end finish
  } else if (formData.finishLevel === 'Basique (entrée de gamme)') {
    totalCost *= 0.8; // Basic finish
  }
  
  // Fix string-to-number conversions
  if (formData.landPrice && typeof formData.landPrice === 'string') {
    const landPriceValue = parseFloat(formData.landPrice);
    if (landPriceValue > 0) {
      totalCost += landPriceValue;
    }
  }

  return totalCost;
};
