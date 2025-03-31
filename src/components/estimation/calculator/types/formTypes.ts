
// FormData interface
export interface FormData {
  // General project data
  clientType?: string;
  projectType?: string;
  estimationType?: string;
  surface?: number;
  budget?: number;
  
  // Project details
  terassementsViabilisation?: boolean;
  roofType?: string;
  wallType?: string;
  electricalType?: string;
  plumbingType?: string;
  heatingType?: string;
  plasteringType?: string;
  
  // Plastering details
  plastering?: string;
  
  // Interior carpentry details
  interiorDoorType?: string;
  hasMoldings?: boolean;
  hasCustomFurniture?: boolean;
  
  // Tiling details
  floorTileType?: string;
  floorTilePercentage?: number;
  floorTileArea?: number;
  wallTileType?: string;
  
  // Parquet and soft floor details
  parquetType?: string;
  parquetArea?: number;
  softFloorType?: string;
  softFloorArea?: number;
  
  // Painting and wall coverings
  basicPaintPercentage?: number;
  decorativePaintPercentage?: number;
  wallpaperPercentage?: number;
  woodPanelingPercentage?: number;
  stonePanelingPercentage?: number;
  
  // Windows details
  windowType?: string;
  windowRenovationArea?: number;
  windowNewArea?: number;
  
  // Air conditioning
  hasAirConditioning?: boolean;
  
  // Current total amount for the project
  montantT?: number;
  
  // Contact information
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  acceptTerms?: boolean;
  
  // Quick Estimation Navigation
  selectedFeatures?: string[];
  nextPage?: number;
  
  // Feature flags for controlling navigation
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  
  // For location information
  city?: string;
  
  // For property details
  levels?: number;
  finishLevel?: string;
  units?: number;
  
  // For estimation complexity
  complexity?: string;
  qualityStandard?: string;
  
  // For room counts
  bedrooms?: number;
  bathrooms?: number;
  kitchens?: number;
  livingRooms?: number;
  
  // For amenagements exterieurs
  hasPool?: boolean;
  hasTerrace?: boolean;
  hasOutdoorKitchen?: boolean;
  
  // For special features
  solarPanels?: boolean;
  rainwaterHarvesting?: boolean;
  homeAutomation?: boolean;
  energyEfficiency?: boolean;
  
  // For terrain details
  landPrice?: number;
  landIncluded?: boolean;
  landType?: string;
  
  // For attic details
  atticType?: string;
  
  // For insulation
  insulationType?: string;
}

// Base form props that all form steps will use
export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: Partial<FormData>;
  onSubmit?: (data: Partial<FormData>) => void;
}
