import { BaseSyntheticEvent } from 'react';

export interface FormData {
  clientType?: string;
  activity?: string;
  projectType?: string;
  startDate?: string;
  endDate?: string;
  estimationType?: string;
  termsAccepted?: boolean;
  surface?: string;
  city?: string;
  levels?: string;
  roomCount?: string;
  finishLevel?: string;
  hasLand?: boolean;
  landPrice?: string;
  wallType?: string;
  roofType?: string;
  atticType?: string;
  roofingType?: string;
  insulationType?: string;
  facadeType?: string;
  windowType?: string;
  electricalType?: string;
  plumbingType?: string;
  heatingType?: string;
  hasAirConditioning?: boolean;
  plasteringType?: string;
  flooringType?: string;
  wallCoveringType?: string;
  includeEcoSolutions?: boolean;
  includeRenewableEnergy?: boolean;
  includeLandscaping?: boolean;
  includeOptions?: boolean;
  includeCuisine?: boolean;
  includeBathroom?: boolean;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  budget?: string;
  kitchenType?: string;
  kitchenBudget?: string;
  landscapingType?: string;
  landscapingBudget?: string;
}

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
