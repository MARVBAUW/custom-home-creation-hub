
// Re-export des fonctions de calcul depuis leurs modules
export { calculateSimpleEstimation } from './simpleEstimation';
export { calculateDetailedEstimation } from './detailedEstimation';

// Export stub functions for missing modules
export const calculateMaterialCosts = (data: any) => {
  console.log('Material costs calculation', data);
  return { total: 0, items: [] };
};

export const calculateLaborCosts = (data: any) => {
  console.log('Labor costs calculation', data);
  return { total: 0, items: [] };
};
