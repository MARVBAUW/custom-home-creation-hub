
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
