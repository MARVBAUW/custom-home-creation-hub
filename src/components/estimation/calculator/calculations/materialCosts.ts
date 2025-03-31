
// This file contains constants for material costs used in estimation calculations

export const WALL_MATERIAL_COSTS = {
  'concrete_blocks': 120,
  'brick': 180,
  'wood_frame': 200,
  'concrete': 140,
  'stone': 350,
  'earth': 220,
  'steel_frame': 250
};

export const ROOF_MATERIAL_COSTS = {
  'tiles': 90,
  'slate': 120,
  'metal': 100,
  'gravel': 80,
  'green_roof': 160,
  'shingles': 75,
  'membrane': 85
};

export const FLOORING_MATERIAL_COSTS = {
  'tiles': {
    'standard': 40,
    'premium': 80,
    'luxury': 150
  },
  'parquet': {
    'standard': 50,
    'premium': 90,
    'luxury': 180
  },
  'soft_floor': {
    'standard': 30,
    'premium': 60,
    'luxury': 100
  }
};

// Default function to calculate material costs
export const calculateMaterialCosts = (formData: any) => {
  // This is a stub - actual implementation would use the data from formData
  return {
    wallsMaterials: 0,
    roofMaterials: 0,
    flooringMaterials: 0,
    windows: 0,
    doors: 0,
    plumbing: 0,
    electrical: 0,
    total: 0
  };
};
