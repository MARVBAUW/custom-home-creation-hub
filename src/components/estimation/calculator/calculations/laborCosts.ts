
// This file contains constants for labor costs used in estimation calculations

export const LABOR_RATES = {
  'skilled': 45, // per hour
  'unskilled': 25, // per hour
  'specialized': 65 // per hour
};

export const TIME_ESTIMATES = {
  'wall_construction': {
    'concrete_blocks': 0.8, // hours per square meter
    'brick': 1.2,
    'wood_frame': 0.9,
    'concrete': 0.7,
    'stone': 1.6,
    'earth': 1.4,
    'steel_frame': 0.6
  },
  'roofing': {
    'tiles': 0.9, // hours per square meter
    'slate': 1.3,
    'metal': 0.7,
    'gravel': 0.5,
    'green_roof': 1.2,
    'shingles': 0.6,
    'membrane': 0.5
  },
  'flooring': {
    'tiles': 0.8, // hours per square meter
    'parquet': 0.9,
    'soft_floor': 0.4
  }
};

// Default function to calculate labor costs
export const calculateLaborCosts = (formData: any) => {
  // This is a stub - actual implementation would use the data from formData
  return {
    structuralLabor: 0,
    roofingLabor: 0,
    finishingLabor: 0,
    plumbingLabor: 0,
    electricalLabor: 0,
    total: 0
  };
};
