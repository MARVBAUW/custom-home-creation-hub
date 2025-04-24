
export interface FormData {
  // Project and client identification
  projectType?: 'construction' | 'renovation' | 'extension' | 'optimization' | 'design' | 'division';
  clientType?: 'individual' | 'professional';
  
  // Basic project information
  surface?: string | number;
  city?: string;
  bedrooms?: string | number;
  bathrooms?: string | number;
  constructionType?: string;
  estimationType?: 'quick' | 'precise';
  termsAccepted?: boolean;
  levels?: number;
  apartments?: number;
  existingSurface?: number; // For renovation projects
  
  // Client information (Page 45)
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  zipCode?: string;
  message?: string;
  
  // Professional specific fields (Page 2)
  activity?: string;
  startDate?: string;
  endDate?: string;
  
  // Navigation control flags
  skipToContact?: boolean;
  
  // Option selection flags
  includeEcoSolutions?: boolean;
  ecoLevel?: 'minimal' | 'moderate' | 'extensive';
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  
  // Terrain options (Page 6)
  terrainType?: string;
  groundType?: string;
  isServiced?: boolean; // Terrain viabilisé
  
  // Demolition options (Page 7)
  demolitionPercentage?: number;
  demolitionArea?: number;
  
  // Structure options (Gros Oeuvre - Page 8)
  wallType?: string;
  foundationType?: string;
  
  // Roof structure (Charpente - Page 9)
  roofType?: string;
  
  // Attic options (Combles - Page 10)
  atticType?: string;
  
  // Roofing options (Couverture - Page 11)
  roofingType?: string;
  
  // Insulation options (Isolation - Page 12)
  insulationType?: string;
  wallInsulationThickness?: number;
  roofInsulationThickness?: number;
  floorInsulationThickness?: number;
  
  // Facade options (Page 13)
  facadeType?: string;
  stonePercentage?: number;
  plasterPercentage?: number;
  brickPercentage?: number;
  metalCladdingPercentage?: number;
  woodCladdingPercentage?: number;
  stoneCladdingPercentage?: number;
  
  // External openings (Menuiseries ext. - Page 14)
  windowType?: string;
  windowRenovationArea?: number;
  windowNewArea?: number;
  
  // Electricity options (Page 15)
  electricalType?: string;
  smartHome?: boolean;
  
  // Plumbing options (Page 16)
  plumbingType?: string;
  
  // Heating options (Page 17)
  heatingType?: string;
  hasAirConditioning?: boolean;
  
  // Interior walls (Plâtrerie - Page 18)
  plasteringType?: string;
  interiorFittings?: string;
  
  // Interior doors and trim (Page 19)
  doorType?: string;
  interiorDoorsType?: string;
  hasMoldings?: boolean;
  hasCustomFurniture?: boolean;
  
  // Floor covering (Carrelage - Page 20)
  floorTileType?: string;
  floorTilePercentage?: number;
  floorTileArea?: number;
  wallTileType?: string;
  
  // Wood flooring (Parquet - Page 21)
  parquetType?: string;
  parquetArea?: number;
  softFloorType?: string;
  softFloorArea?: number;
  floorType?: string;
  
  // Wall finishes (Peinture - Page 22)
  paintType?: string;
  basicPaintPercentage?: number;
  decorativePaintPercentage?: number;
  wallpaperPercentage?: number;
  
  // Renewable energy (Page 23)
  renewableEnergyTypes?: string[];
  hasSolarPanels?: boolean;
  hasHeatPump?: boolean;
  
  // Outdoor amenities (Pages 25-26)
  hasPool?: boolean;
  poolType?: 'polyester' | 'concrete' | 'natural';
  poolSize?: number;
  poolHeating?: boolean;
  hasJacuzzi?: boolean;
  jacuzziType?: 'basic' | 'plus' | 'premium';
  hasCarport?: boolean;
  carportType?: 'single' | 'double';
  
  // Kitchen (Page 27)
  kitchenType?: 'none' | 'kitchenette' | 'basic' | 'standard' | 'premium';
  
  // Bathroom (Page 28)
  bathroomType?: 'standard' | 'mid-range' | 'premium';
  bathroomCount?: number;
  
  // Quality level for various components
  quality?: string;
  
  // Special features
  structuralFeatures?: string[];
  structuralFeatureValues?: Record<string, string>;
  
  // Cost calculation
  montantT?: number; // Total amount calculated
  
  // Any additional fields
  [key: string]: any;
}

export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: Partial<FormData>;
  onSubmit?: (data: any) => void;
}

export interface ConversationState {
  currentStep: string;
  askedQuestions?: string[];
  completedFields?: string[];
  formProgress?: number;
  messages: Array<{
    role?: 'user' | 'assistant';
    type?: string;
    content: string;
    timestamp?: string;
  }>;
  currentQuestion?: string;
  expectedAnswer?: string;
  contextData?: Record<string, any>;
  completedSteps?: string[];
  formData?: FormData;
}
