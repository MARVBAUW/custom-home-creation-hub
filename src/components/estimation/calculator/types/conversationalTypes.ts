
import { EstimationFormData } from './estimationFormData';

export interface Message {
  id: string;
  type: 'system' | 'user' | 'assistant' | 'loading';
  content: string;
  options?: string[];
  text?: string;
  isUser?: boolean;
  createdAt?: Date;
  timestamp?: Date;
}

export interface ConversationState {
  currentStep: string;
  askedQuestions: string[];
  completedFields: string[];
  formProgress: number;
  messages?: Message[];
  isTyping?: boolean;
}

export interface ConversationalProps {
  onUserInput: (input: string) => void;
  formData: EstimationFormData;
  updateFormData: (data: Partial<EstimationFormData>) => void;
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
  formData: EstimationFormData;
  updateFormData: (data: Partial<EstimationFormData>) => void;
}

export interface ExtractedInfo {
  projectType?: string | null;
  surface?: number | string | null;
  city?: string | null;
  location?: string | null;
  budget?: number | string | null;
  roomCount?: number | string;
  bathroomCount?: number | string;
  otherDetails: Record<string, any>;
}
