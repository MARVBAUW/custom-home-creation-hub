
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

// Fonction de calcul améliorée pour gérer les différents types et convertir correctement
const calculateEstimationResult = (formData: FormData) => {
  let totalCost = 50000; // Coût de base

  // Ajuster en fonction de la surface
  if (formData.surface) {
    const surfaceValue = typeof formData.surface === 'string' 
      ? parseFloat(formData.surface) 
      : formData.surface;
    
    if (!isNaN(surfaceValue)) {
      if (surfaceValue < 50) {
        totalCost += 20000; // petit projet
      }
      else if (surfaceValue > 200) {
        totalCost += 80000; // grand projet
      } else {
        totalCost += 50000; // projet moyen
      }
      
      // Ajouter un coût au m²
      totalCost += surfaceValue * 1000;
    }
  }
  
  // Ajuster selon le type de projet
  if (formData.projectType === 'renovation') {
    totalCost *= 1.2; // Rénovation coûte plus cher
  }

  // Ajuster selon le niveau de finition
  const finishLevel = formData.finishLevel || formData.finishingLevel;
  if (finishLevel === 'Premium (haut de gamme)') {
    totalCost *= 1.5; // Finition haut de gamme
  } else if (finishLevel === 'Basique (entrée de gamme)') {
    totalCost *= 0.8; // Finition basique
  }
  
  // Ajouter le prix du terrain si disponible
  if (formData.landPrice) {
    const landPriceValue = typeof formData.landPrice === 'string' 
      ? parseFloat(formData.landPrice) 
      : formData.landPrice;
    
    if (!isNaN(landPriceValue) && landPriceValue > 0) {
      totalCost += landPriceValue;
    }
  }

  // Ajouter des coûts pour les options spéciales
  if (formData.pool) totalCost += 25000;
  if (formData.terrace) totalCost += 10000;
  if (formData.smartHome) totalCost += 15000;
  if (formData.solarPanels) totalCost += 20000;
  if (formData.outdoorKitchen) totalCost += 15000;

  return totalCost;
};
