
import { FormData } from '../../types';

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
  messages: Message[]; // Added messages field that is required by hooks
}

// Add a default initial conversation state to prevent errors
export const initialConversationState: ConversationState = {
  currentStep: 'intro',
  askedQuestions: [],
  completedFields: [],
  formProgress: 0,
  messages: []
};

// Add a default initial form data to prevent errors with empty objects
export const defaultFormDataValues: FormData = {
  clientType: 'individual',
  projectType: 'construction',
  surface: 0,
  city: '',
  location: '',
  bedrooms: 0,
  bathrooms: 0,
  constructionType: 'standard',
  estimatedCost: 0,
  structuralWork: 0,
  finishingWork: 0,
  technicalLots: 0,
  externalWorks: 0,
  architectFees: 0,
  engineeringFees: 0,
  projectManagement: 0,
  officialFees: 0,
  inspectionFees: 0,
  technicalStudies: 0,
  permits: 0,
  insurance: 0,
  contingency: 0,
  taxes: 0,
  other: 0,
  land: 0,
  demolition: 0,
  siteDevelopment: 0,
  miscellaneous: 0,
  designTime: 0,
  permitsTime: 0,
  biddingTime: 0,
  constructionTime: 0,
  totalTimeMonths: 0
};
