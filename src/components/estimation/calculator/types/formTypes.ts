
import { ReactNode } from 'react';
import { FormData } from './index';

// Base interface for all form step components
export interface BaseFormStepProps {
  animationDirection: 'forward' | 'backward';
  goToPreviousStep?: () => void;
}

// Interface for form steps with default values and submit handler
export interface FormStepProps<T = any> extends BaseFormStepProps {
  defaultValues: T;
  onSubmit: (data: T) => void;
}

// Interface for form steps that work directly with FormData
export interface FormDataStepProps extends BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

// Common interface for step registry components
export interface StepComponentProps {
  title: string;
  icon: ReactNode;
  component: React.ComponentType<any>;
  skipCondition: (formData: FormData) => boolean;
}

// Form component interfaces
export interface ProjectDetailsFormProps extends FormDataStepProps {}
export interface TerrainFormProps extends FormDataStepProps {}
export interface GrosOeuvreFormProps extends FormDataStepProps {}
export interface CharpenteFormProps extends FormDataStepProps {}
export interface CouvertureFormProps extends FormDataStepProps {}
export interface FacadeFormProps extends FormDataStepProps {}
export interface MenuiseriesExtFormProps extends FormDataStepProps {}
export interface IsolationFormProps extends FormDataStepProps {}
export interface ElectriciteFormProps extends FormDataStepProps {}
export interface PlomberieFormProps extends FormDataStepProps {}
export interface ChauffageFormProps extends FormDataStepProps {}
export interface PlatrerieFormProps extends FormDataStepProps {}
export interface MenuiseriesIntFormProps extends FormDataStepProps {}
export interface CarrelageFormProps extends FormDataStepProps {}
export interface ParquetFormProps extends FormDataStepProps {}
export interface PeintureFormProps extends FormDataStepProps {}
export interface ContactFormProps extends FormDataStepProps {}
export interface AmenagementExtFormProps extends FormDataStepProps {}
export interface ClientTypeFormProps extends FormDataStepProps {}
