
import { FormData } from '../types';
import { ensureNumber } from '../utils/typeConversions';

// Fonction simple de calcul d'estimation
export const calculateEstimation = (formData: FormData): number => {
  // Prix de base par m²
  let basePricePerSqm = 1500;
  
  // Récupérer les principales données
  const surface = formData.surface ? 
    ensureNumber(formData.surface) : 100;
  const finishLevel = formData.finishLevel || 'Standard';
  const terrainType = formData.terrainType;
  const landPrice = formData.landPrice ? 
    ensureNumber(formData.landPrice) : 0;
  
  // Ajuster le prix au m² selon le type de projet
  if (formData.projectType === 'neuf') {
    basePricePerSqm = 1800;
  } else if (formData.projectType === 'renovation') {
    basePricePerSqm = 1200;
  } else if (formData.projectType === 'extension') {
    basePricePerSqm = 1500;
  }
  
  // Ajuster selon le niveau de finition
  if (finishLevel === 'Premium (haut de gamme)') {
    basePricePerSqm *= 1.5;
  } else if (finishLevel === 'Standard (milieu de gamme)') {
    basePricePerSqm *= 1.2;
  } else if (finishLevel === 'Basique (entrée de gamme)') {
    basePricePerSqm *= 0.9;
  }
  
  // Calculer le coût de la construction
  let constructionCost = surface * basePricePerSqm;
  
  // Ajouter des coûts supplémentaires pour les options
  if (formData.pool) constructionCost += 25000;
  if (formData.terrace) constructionCost += 10000;
  if (formData.domotic) constructionCost += 15000;
  if (formData.solarPanels) constructionCost += 20000;
  if (formData.outdoorKitchen) constructionCost += 15000;
  
  // Coût total avec terrain si applicable
  let totalCost = constructionCost;
  if (landPrice > 0) {
    totalCost += landPrice;
  }
  
  // Arrondir au millier près
  return Math.round(totalCost / 1000) * 1000;
};
