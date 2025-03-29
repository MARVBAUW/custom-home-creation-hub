
import { FormData } from '../types';
import { ensureNumber } from '../utils/typeConversions';

export const calculateEstimation = (formData: FormData): number => {
  // Coût de base
  let totalCost = 25000;
  
  // Ajustement en fonction de la surface
  const surface = ensureNumber(formData.surface);
  if (surface > 0) {
    totalCost += surface * 1200; // 1200€ par m²
  }
  
  // Ajustement en fonction du type de projet
  if (formData.projectType === 'renovation') {
    totalCost *= 0.8; // La rénovation coûte moins cher que la construction
  } else if (formData.projectType === 'extension') {
    totalCost *= 0.9; // L'extension coûte un peu moins cher que la construction
  }
  
  // Ajustement en fonction du niveau de finition
  const finishLevel = formData.finishLevel || '';
  if (finishLevel.includes('Premium') || finishLevel.includes('premium')) {
    totalCost *= 1.3; // Premium: +30%
  } else if (finishLevel.includes('Basique') || finishLevel.includes('basique')) {
    totalCost *= 0.9; // Basique: -10%
  }
  
  // Ajustement pour les caractéristiques spéciales
  if (formData.domotic) totalCost += 8000;
  if (formData.alarm) totalCost += 3000;
  if (formData.centralVacuum) totalCost += 5000;
  if (formData.smartHome) totalCost += 12000;
  if (formData.solarPanels) totalCost += 15000;
  
  // Ajout du prix du terrain si nécessaire
  if (formData.landIncluded === 'yes' && formData.landPrice) {
    const landPrice = ensureNumber(formData.landPrice);
    totalCost += landPrice;
  }
  
  // S'assurer que le résultat est un nombre positif
  return Math.max(totalCost, 25000);
};
