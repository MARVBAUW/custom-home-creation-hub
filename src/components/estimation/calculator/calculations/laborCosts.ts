
import { FormData } from '../types';

// Labor cost constants
export const LABOR_COSTS_PER_HOUR = {
  unskilled: 25,
  skilled: 45,
  specialized: 65,
  expert: 95
};

// Labor hours estimation per m² for different construction types
export const LABOR_HOURS_PER_SQM = {
  construction: {
    unskilled: 2.5,
    skilled: 3.0,
    specialized: 1.5,
    expert: 0.5
  },
  renovation: {
    unskilled: 3.0,
    skilled: 3.5,
    specialized: 2.0,
    expert: 0.7
  },
  extension: {
    unskilled: 2.3,
    skilled: 2.8,
    specialized: 1.4,
    expert: 0.4
  },
  commercial: {
    unskilled: 2.0,
    skilled: 2.5,
    specialized: 1.2,
    expert: 0.3
  }
};

// Regional labor cost adjustments
export const REGION_LABOR_MULTIPLIERS = {
  'paca': 1.1,
  'ile_de_france': 1.2,
  'rhone_alpes': 1.05,
  'default': 1.0
};

// Function to calculate labor costs
export const calculateLaborCosts = (formData: FormData): number => {
  const surface = typeof formData.surface === 'string' 
    ? parseFloat(formData.surface) 
    : (formData.surface || 0);
  
  // Determine project type for labor calculation
  const projectType = formData.projectType || 'construction';
  
  // Determine which labor hours table to use
  const laborHoursTable = LABOR_HOURS_PER_SQM[projectType as keyof typeof LABOR_HOURS_PER_SQM] || LABOR_HOURS_PER_SQM.construction;
  
  // Calculate hours needed for each labor category
  const unskilledHours = laborHoursTable.unskilled * surface;
  const skilledHours = laborHoursTable.skilled * surface;
  const specializedHours = laborHoursTable.specialized * surface;
  const expertHours = laborHoursTable.expert * surface;
  
  // Calculate labor costs for each category
  const unskilledCost = unskilledHours * LABOR_COSTS_PER_HOUR.unskilled;
  const skilledCost = skilledHours * LABOR_COSTS_PER_HOUR.skilled;
  const specializedCost = specializedHours * LABOR_COSTS_PER_HOUR.specialized;
  const expertCost = expertHours * LABOR_COSTS_PER_HOUR.expert;
  
  // Apply regional adjustments if city is specified
  let regionalMultiplier = REGION_LABOR_MULTIPLIERS.default;
  if (formData.city) {
    const cityLower = formData.city.toLowerCase();
    
    if (cityLower.includes('paris') || cityLower.includes('île-de-france')) {
      regionalMultiplier = REGION_LABOR_MULTIPLIERS.ile_de_france;
    } else if (cityLower.includes('marseille') || cityLower.includes('nice') || cityLower.includes('toulon')) {
      regionalMultiplier = REGION_LABOR_MULTIPLIERS.paca;
    } else if (cityLower.includes('lyon') || cityLower.includes('grenoble')) {
      regionalMultiplier = REGION_LABOR_MULTIPLIERS.rhone_alpes;
    }
  }
  
  // Calculate total labor cost with regional adjustment
  const totalLaborCost = (unskilledCost + skilledCost + specializedCost + expertCost) * regionalMultiplier;
  
  return totalLaborCost;
};
