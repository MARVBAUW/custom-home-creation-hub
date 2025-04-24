
export interface FormData {
  projectType?: string;
  surface?: string | number;
  city?: string;
  bedrooms?: string | number;
  bathrooms?: string | number;
  constructionType?: string;
  // Additional form data properties
  clientType?: string;
  includeLandscaping?: boolean;
  pool?: boolean;
  terrace?: boolean;
  outdoorKitchen?: boolean;
  heatingType?: string;
  hasAirConditioning?: boolean;
  floorTileType?: string;
  floorTilePercentage?: number;
  wallTileType?: string;
  montantT?: number;
  atticType?: string;
  levels?: number;
  createWalls?: string;
  createFloors?: string;
  wallArea?: number;
  floorArea?: number;
  floorType?: string;
  quality?: string;
  structuralFeatures?: string[];
  structuralFeatureValues?: Record<string, string>;
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
