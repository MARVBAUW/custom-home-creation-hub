
import { BaseSyntheticEvent } from 'react';
import { FormData as FormDataFromIndex } from './types/index';

// Re-export the FormData from the index file
export type FormData = FormDataFromIndex;

export interface BaseFormStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: 'forward' | 'backward';
}

export interface Message {
  id: string;
  type: 'system' | 'user' | 'assistant' | 'loading';
  content: string;
  options?: string[];
}

export interface ConversationalProps {
  onUserInput: (input: string) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onClientTypeSubmit: (data: {clientType: string}) => void;
  goToStep: (step: number) => void;
}

export interface MessageDisplayProps {
  messages: Message[];
  loading: boolean;
  onOptionClick: (option: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface InputAreaProps {
  userInput: string;
  setUserInput: (input: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

export interface MessageProcessorProps {
  onUserInput: (input: string) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

// The state of the conversation to track progress
export interface ConversationState {
  currentStep: string;
  askedQuestions: string[];
  completedFields: string[];
  formProgress: number;
}

// Form props interfaces
export interface ClientTypeFormProps extends BaseFormStepProps {}
export interface ProfessionalProjectFormProps extends BaseFormStepProps {
  defaultValues?: any;
  onSubmit: (data: any) => void;
}
export interface IndividualProjectFormProps extends BaseFormStepProps {
  defaultValues?: any;
  onSubmit: (data: any) => void;
}
export interface EstimationTypeFormProps extends BaseFormStepProps {
  defaultValues?: any;
  onSubmit: (data: any) => void;
}
export interface ConstructionDetailsFormProps extends BaseFormStepProps {}
export interface TerrainFormProps extends BaseFormStepProps {}
export interface GrosOeuvreFormProps extends BaseFormStepProps {}
export interface CharpenteFormProps extends BaseFormStepProps {}
export interface ComblesFormProps extends BaseFormStepProps {}
export interface CouvertureFormProps extends BaseFormStepProps {}
export interface IsolationFormProps extends BaseFormStepProps {}
export interface FacadeFormProps extends BaseFormStepProps {}
export interface MenuiseriesExtFormProps extends BaseFormStepProps {}
export interface ElectriciteFormProps extends BaseFormStepProps {
  defaultValues?: any;
  onSubmit: (data: any) => void;
}
export interface PlomberieFormProps extends BaseFormStepProps {}
export interface ChauffageFormProps extends BaseFormStepProps {}
export interface PlatrerieFormProps extends BaseFormStepProps {}
export interface MenuiseriesIntFormProps extends BaseFormStepProps {}
export interface CarrelageFormProps extends BaseFormStepProps {}
export interface ParquetFormProps extends BaseFormStepProps {}
export interface PeintureFormProps extends BaseFormStepProps {}
export interface AmenagementExtFormProps extends BaseFormStepProps {}
export interface ContactFormProps extends BaseFormStepProps {}

// Schema types
export interface ConstructionDetailsSchema {}
export interface EstimationTypeSchema {}
export interface IndividualProjectSchema {}
export interface ProfessionalProjectSchema {}
