
// Utility functions for calculating amounts and costs

/**
 * Calculate plumbing cost based on surface area and plumbing type
 * @param surface Surface area in square meters
 * @param plumbingType Type of plumbing installation
 * @returns Plumbing cost estimate
 */
export const calculatePlumbingCost = (surface: number, plumbingType: string): number => {
  // Base values for plumbing costs per square meter
  const baseCosts = {
    basic: 50,       // Basic plumbing amenities
    standard: 80,    // Standard plumbing with additional points
    premium: 120,    // Premium quality plumbing with optimized networks
    non_concerne: 0  // No plumbing required
  };

  // Get the cost per square meter based on plumbing type
  const costPerSqm = baseCosts[plumbingType as keyof typeof baseCosts] || 0;
  
  // Calculate total cost based on surface area
  // The factor 0.25 adjusts the cost as plumbing doesn't scale linearly with total surface
  return Math.round(surface * costPerSqm * 0.25);
};

/**
 * Calculate heating cost based on surface area and heating type
 * @param surface Surface area in square meters
 * @param heatingType Type of heating system
 * @returns Heating cost estimate
 */
export const calculateHeatingCost = (surface: number, heatingType: string): number => {
  // Base costs for different heating systems per square meter
  const baseCosts = {
    electric: 60,       // Electric heating system
    gas: 80,           // Gas heating system
    heat_pump: 150,    // Heat pump system
    solar: 200,        // Solar heating system
    geothermal: 250,   // Geothermal heating system
    non_concerne: 0    // No heating system required
  };

  // Get the cost per square meter based on heating type
  const costPerSqm = baseCosts[heatingType as keyof typeof baseCosts] || 0;
  
  // Calculate total cost based on surface area
  // The factor 0.3 adjusts the cost as heating doesn't scale linearly with total surface
  return Math.round(surface * costPerSqm * 0.3);
};

/**
 * Calculate air conditioning cost based on whether it's included and surface area
 * @param hasAirConditioning Boolean indicating if air conditioning is requested
 * @param surface Surface area in square meters
 * @returns Air conditioning cost estimate
 */
export const calculateAirConditioningCost = (hasAirConditioning: boolean, surface: number): number => {
  if (!hasAirConditioning) return 0;
  
  // Base cost for air conditioning per square meter
  const baseAcCost = 100;
  
  // Calculate total cost based on surface area
  // The factor 0.4 adjusts the cost as air conditioning doesn't scale linearly with total surface
  return Math.round(surface * baseAcCost * 0.4);
};

/**
 * Helper function to ensure a value is a number
 * @param value Value to convert to number
 * @param defaultValue Default value if conversion fails
 * @returns Number value
 */
export const ensureNumber = (value: any, defaultValue: number = 0): number => {
  if (value === undefined || value === null) return defaultValue;
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};

/**
 * Convert percentage to a number (e.g. "50%" -> 0.5)
 * @param percentage Percentage string or number
 * @returns Number representation (0-1)
 */
export const percentageToNumber = (percentage: string | number): number => {
  if (typeof percentage === 'number') return percentage / 100;
  
  if (typeof percentage === 'string') {
    const cleanPercentage = percentage.replace('%', '');
    const num = parseFloat(cleanPercentage);
    if (!isNaN(num)) return num / 100;
  }
  
  return 0;
};
