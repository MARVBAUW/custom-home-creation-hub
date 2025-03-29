
import { FormData } from './index';

// Base props for all form steps
export interface BaseFormStepProps {
  formData?: FormData;
  updateFormData?: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  goToNextStep?: () => void;
  animationDirection: 'forward' | 'backward';
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

// Form props for different steps
export interface ClientTypeFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface ProjectDetailsFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface TerrainFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface CombleFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface CouvertureFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface CharpenteFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface ContactFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep?: () => void;
}

export interface ProfessionalProjectFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface IndividualProjectFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface EstimationTypeFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface ConstructionDetailsFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface IsolationFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface FacadeFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface MenuiseriesExtFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface ElectriciteFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface PlomberieFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface ChauffageFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface PlatrerieFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface MenuiseriesIntFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface CarrelageFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface ParquetFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface PeintureFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface AmenagementExtFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface GrosOeuvreFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface EnergiesRenouvelablesFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface SolutionsEnvironFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface AmenagementPaysagerFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface OptionsFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface CuisineFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface SalleDeBainFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface DemolitionFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface GrosOeuvreRenovFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface CharpenteRenovFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface CouvertureRenovFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface FacadeRenovFormProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export interface ResultsFormProps {
  estimationResult: number | null;
  formData: FormData;
  categoriesAmounts: Array<{category: string; amount: number}>;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

export interface EstimationReportProps {
  estimation: {
    totalHT: number;
    totalTTC: number;
    vat: number;
    corpsEtat: Record<string, { montantHT: number; details: string[] }>;
    honorairesHT: number;
    honorairesTTC: number;
    taxeAmenagement: number;
    garantieDecennale: number;
    etudesGeotechniques: number;
    etudeThermique: number;
    coutGlobalHT: number;
    coutGlobalTTC: number;
  };
  formData: FormData;
  includeTerrainPrice: boolean;
}
