
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
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  termsAccepted?: boolean;
  [key: string]: any; // Allow additional properties
}

export interface BaseFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

export interface Message {
  id?: string;
  type: 'user' | 'bot' | 'system' | 'assistant';
  content: string;
  options?: string[];
  timestamp?: string;
}

export interface ConversationState {
  currentStep: string | number;
  askedQuestions: string[];
  completedFields: string[];
  formProgress: number;
  messages: Message[];
  isProcessing?: boolean;
  formData?: FormData;
}
