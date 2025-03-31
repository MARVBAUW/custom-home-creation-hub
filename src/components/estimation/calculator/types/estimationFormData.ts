
export interface EstimationFormData {
  // Client type
  clientType?: string;
  
  // Project details
  projectType?: string;
  surface?: number;
  city?: string;
  
  // Budget
  budget?: number;
  
  // Terrain details
  landIncluded?: string;
  landPrice?: number;
  terrainType?: string;
  
  // Construction details
  constructionType?: string;
  levels?: number;
  bedrooms?: number;
  bathrooms?: number;
  kitchens?: number;
  livingRooms?: number;
  
  // Finish details
  finishStandard?: string;
  
  // Special features
  solarPanels?: boolean;
  rainwaterHarvesting?: boolean;
  homeAutomation?: boolean;
  energyEfficiency?: boolean;
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  
  // Exterior features
  pool?: boolean;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  
  // Personal information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

// For backward compatibility, create an alias
export type FormData = EstimationFormData;
