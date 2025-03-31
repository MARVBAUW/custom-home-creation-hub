
/**
 * Complete type definition for the estimation form data
 */
export interface EstimationFormData {
  // Project basics
  estimationType?: string;
  projectType?: string;
  surface?: number;
  city?: string;
  
  // Rooms information
  bedrooms?: number;
  bathrooms?: number;
  doorCount?: number;
  
  // Foundation and structure
  foundationType?: string;
  wallType?: string;
  
  // Renovations
  needsRenovation?: boolean;
  repairFoundation?: string;
  repairStructure?: string;
  repairFramework?: string;
  structureType?: "BOIS" | "BETON";
  
  // Demolition
  demolitionTypes?: string[];
  demolitionPercentages?: { [key: string]: string };
  demolitionTotalArea?: number;
  demolitionCost?: number;
  demolitionDetailedCosts?: { [key: string]: number };
  
  // Facade
  stonePercentage?: number;
  plasterPercentage?: number;
  brickPercentage?: number;
  metalCladdingPercentage?: number;
  woodCladdingPercentage?: number;
  stoneCladdingPercentage?: number;
  
  // Roof
  roofType?: string;
  roofArea?: string;
  
  // Electrical systems
  electricalType?: string;
  hasSmartHome?: boolean;
  
  // Plumbing
  plumbingType?: string;
  
  // Heating
  heatingType?: string;
  hasAirConditioning?: boolean;
  
  // Flooring
  flooringType?: string;
  flooringArea?: number;
  
  // Paintwork
  paintSurface?: number;
  paintTypes?: {
    basicPaint: number;
    decorativePaint: number;
    wallpaper: number;
    woodPaneling: number;
    stoneCladding: number;
  };
  
  // Kitchen
  kitchenQuality?: string;
  kitchenSize?: number;
  
  // Bathroom
  bathroomQuality?: string;
  bathroomCount?: number;
  
  // Interior details
  hasDressingRoom?: boolean;
  hasCustomClosets?: boolean;
  
  // Exterior features
  pool?: boolean;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  
  // Landscaping
  landscapingType?: string | string[];
  landscapingArea?: string;
  fencingLength?: string;
  gateLength?: string;
  terraceArea?: string;
  includeLandscaping?: boolean;
  
  // Special features
  hasElevator?: boolean;
  hasHomeAutomation?: boolean;
  hasSecuritySystem?: boolean;
  hasHeatRecovery?: boolean;
  
  // Contact information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  
  // Total amount
  montantT?: number;
  
  // Environmental solutions
  environmentalSolutions?: string[];
  
  // Additional fields for the application
  [key: string]: string | number | boolean | string[] | { [key: string]: string | number } | undefined;
}
