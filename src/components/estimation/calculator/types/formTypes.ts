
export interface FormData {
  clientType?: 'individual' | 'professional';
  projectType?: string;
  estimationType?: 'quick' | 'precise';
  surface?: number;
  city?: string;
  bedrooms?: number;
  bathrooms?: number;
  constructionType?: string;
  terrainType?: string;
  wallType?: string;
  roofType?: string;
  atticType?: string;
  roofingType?: string;
  insulationType?: string;
  floorTileType?: string;
  floorTilePercentage?: number;
  wallTileType?: string;
  wallTilePercentage?: number;
  units?: number;
  kitchenType?: string;
  bathroomType?: 'standard' | 'mid-range' | 'premium' | 'none';
  bathroomCount?: number;
  hasAirConditioning?: boolean;
  heatingType?: string;
  doorCount?: number;
  budget?: number;
  montantT?: number;
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  skipToContact?: boolean;
  hasPool?: boolean;
  hasJacuzzi?: boolean;
  hasCarport?: boolean;
  poolType?: string;
  poolSize?: number;
  poolHeating?: boolean;
  jacuzziType?: string;
  carportType?: string;
  activity?: string;
  ecoLevel?: string;
  [key: string]: any; // Allow additional properties
}

export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

export interface ConversationState {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  isProcessing: boolean;
  currentStep: number;
  formData: FormData;
}
