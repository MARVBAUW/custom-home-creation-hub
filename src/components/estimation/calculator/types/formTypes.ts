
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
export interface ClientTypeFormProps extends BaseFormStepProps {}
export interface ProjectDetailsFormProps extends BaseFormStepProps {}
export interface TerrainFormProps extends BaseFormStepProps {}
export interface GrosOeuvreFormProps extends BaseFormStepProps {}
export interface CharpenteFormProps extends BaseFormStepProps {}
export interface CombleFormProps extends BaseFormStepProps {}
export interface CouvertureFormProps extends BaseFormStepProps {}
export interface FacadeFormProps extends BaseFormStepProps {}
export interface MenuiseriesExtFormProps extends BaseFormStepProps {}
export interface IsolationFormProps extends BaseFormStepProps {}
export interface ElectriciteFormProps extends BaseFormStepProps {}
export interface PlomberieFormProps extends BaseFormStepProps {}
export interface ChauffageFormProps extends BaseFormStepProps {}
export interface PlatrerieFormProps extends BaseFormStepProps {}
export interface MenuiseriesIntFormProps extends BaseFormStepProps {}
export interface CarrelageFormProps extends BaseFormStepProps {}
export interface ParquetFormProps extends BaseFormStepProps {}
export interface PeintureFormProps extends BaseFormStepProps {}
export interface ContactFormProps extends BaseFormStepProps {}
export interface AmenagementExtFormProps extends BaseFormStepProps {}
export interface ConstructionDetailsFormProps extends BaseFormStepProps {}
export interface ResultsFormProps extends BaseFormStepProps {
  estimationResult: number;
  categoriesAmounts: { category: string; amount: number; }[];
}
