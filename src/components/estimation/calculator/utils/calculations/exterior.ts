
/**
 * Utility functions for exterior-related cost calculations 
 */

/**
 * Calculate facade cost based on type and surface area
 */
export const calculateFacadeCost = (type: string, surface: number): number => {
  const rates: Record<string, number> = {
    'stone': 320,
    'plaster': 120,
    'brick': 200,
    'metal': 250,
    'wood': 180,
    'composite': 220
  };
  
  return (rates[type] || 150) * surface;
};

/**
 * Calculate detailed facade cost based on percentages of different materials
 */
export const calculateDetailedFacadeCost = (
  surface: number,
  percentages: {
    stone?: number;
    plaster?: number;
    brick?: number;
    metalCladding?: number;
    woodCladding?: number;
    stoneCladding?: number;
  }
): number => {
  // Default rates per square meter
  const rates = {
    stone: 320,
    plaster: 120,
    brick: 200,
    metalCladding: 250,
    woodCladding: 180,
    stoneCladding: 280
  };
  
  // Calculate the cost for each material based on its percentage
  let totalCost = 0;
  
  if (percentages.stone) {
    totalCost += (percentages.stone / 100) * surface * rates.stone;
  }
  
  if (percentages.plaster) {
    totalCost += (percentages.plaster / 100) * surface * rates.plaster;
  }
  
  if (percentages.brick) {
    totalCost += (percentages.brick / 100) * surface * rates.brick;
  }
  
  if (percentages.metalCladding) {
    totalCost += (percentages.metalCladding / 100) * surface * rates.metalCladding;
  }
  
  if (percentages.woodCladding) {
    totalCost += (percentages.woodCladding / 100) * surface * rates.woodCladding;
  }
  
  if (percentages.stoneCladding) {
    totalCost += (percentages.stoneCladding / 100) * surface * rates.stoneCladding;
  }
  
  return totalCost;
};

/**
 * Calculate roofing cost based on type and surface area
 */
export const calculateRoofingCost = (type: string, surface: number): number => {
  const rates: Record<string, number> = {
    'tuile_plate': 130,
    'tuile_ronde': 137,
    'ardoise': 210,
    'zinc': 160,
    'chaume': 200,
    'bac_acier': 65,
    'etancheite_bitume': 75,
    'toiture_vegetalise': 146,
    'toiture_gravillonnee': 105
  };
  
  return (rates[type] || 130) * surface;
};

/**
 * Calculate roof renovation cost based on type and surface area
 */
export const calculateRoofingRenovCost = (type: string, surface: number): number => {
  const rates: Record<string, number> = {
    'tuile_plate': 160,
    'tuile_ronde': 167,
    'ardoise': 240,
    'zinc': 190,
    'chaume': 230,
    'bac_acier': 85,
    'etancheite_bitume': 95,
    'toiture_vegetalise': 176,
    'toiture_gravillonnee': 125
  };
  
  return (rates[type] || 160) * surface;
};

/**
 * Calculate roof framework renovation cost
 */
export const calculateRoofFrameworkRenovCost = (type: string, surface: number): number => {
  const rates: Record<string, number> = {
    'light': 100,
    'medium': 150,
    'heavy': 200,
    'complete': 300
  };
  
  return (rates[type] || 150) * surface;
};
