
import { ReactNode } from 'react';
import { FormData } from './index';

// Base interface for all form step components
export interface BaseFormStepProps {
  animationDirection: 'forward' | 'backward';
  goToPreviousStep?: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

// Interface for form steps with default values and submit handler
export interface FormStepProps<T = any> extends BaseFormStepProps {
  defaultValues?: T;
  onSubmit?: (data: T) => void;
}

// Form component interfaces - all inheriting from BaseFormStepProps for consistency
export interface ClientTypeFormProps extends BaseFormStepProps {
  defaultValues?: { clientType: string };
  onSubmit?: (data: { clientType: string }) => void;
}
export interface ProjectDetailsFormProps extends BaseFormStepProps {}
export interface TerrainFormProps extends BaseFormStepProps {}
export interface GrosOeuvreFormProps extends BaseFormStepProps {}
export interface CharpenteFormProps extends BaseFormStepProps {
  defaultValues?: { roofType: string };
}
export interface CombleFormProps extends BaseFormStepProps {
  defaultValues?: { atticType: string };
}
export interface CouvertureFormProps extends BaseFormStepProps {
  defaultValues?: { roofingType: string };
}
export interface FacadeFormProps extends BaseFormStepProps {}
export interface MenuiseriesExtFormProps extends BaseFormStepProps {
  defaultValues?: {
    windowType?: string;
    windowRenovationArea?: string;
    windowNewArea?: string;
  };
}
export interface IsolationFormProps extends BaseFormStepProps {
  defaultValues?: { insulationType: string };
}
export interface ElectriciteFormProps extends BaseFormStepProps {
  defaultValues?: { electricalType: string };
}
export interface PlomberieFormProps extends BaseFormStepProps {
  defaultValues?: { plumbingType: string };
}
export interface ChauffageFormProps extends BaseFormStepProps {
  defaultValues?: { heatingType: string; hasAirConditioning: boolean };
}
export interface PlatrerieFormProps extends BaseFormStepProps {
  defaultValues?: { plasteringType: string };
}
export interface MenuiseriesIntFormProps extends BaseFormStepProps {
  defaultValues?: { doorType: string; interiorFittings: string[] };
}
export interface CarrelageFormProps extends BaseFormStepProps {
  defaultValues?: { floorTileType: string; wallTileType: string; floorTilePercentage: number };
}
export interface ParquetFormProps extends BaseFormStepProps {
  defaultValues?: { 
    parquetType: string; 
    parquetPercentage: number;
    softFloorType: string;
    softFloorPercentage: number;
  };
}
export interface PeintureFormProps extends BaseFormStepProps {
  defaultValues?: {
    basicPaintPercentage: number;
    decorativePaintPercentage: number;
    wallpaperPercentage: number;
    woodCladPercentage: number;
    stoneCladPercentage: number;
  };
}
export interface ContactFormProps extends BaseFormStepProps {}
export interface AmenagementExtFormProps extends BaseFormStepProps {}
export interface ConstructionDetailsFormProps extends BaseFormStepProps {}
export interface ResultsFormProps extends BaseFormStepProps {
  estimationResult: number;
  categoriesAmounts: { category: string; amount: number; }[];
}

// Additional interfaces for professional and individual project forms
export interface ProfessionalProjectFormProps extends BaseFormStepProps {
  defaultValues?: {
    activity: string;
    projectType: string;
    startDate: string;
    endDate: string;
  };
  onSubmit?: (data: any) => void;
}

export interface IndividualProjectFormProps extends BaseFormStepProps {
  defaultValues?: {
    projectType: string;
  };
  onSubmit?: (data: {projectType: string}) => void;
}

export interface EstimationTypeFormProps extends BaseFormStepProps {
  defaultValues?: {
    estimationType: string;
    termsAccepted: boolean;
  };
  onSubmit?: (data: any) => void;
}
