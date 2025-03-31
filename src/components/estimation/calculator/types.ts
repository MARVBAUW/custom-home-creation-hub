
import { BaseSyntheticEvent } from 'react';
import { FormData as FormDataFromIndex } from './types/index';
import * as FormTypesModule from './types/formTypes';

// Re-export the FormData from the index file
export type FormData = FormDataFromIndex;

// Re-export the form types
export * from './types/formTypes';
export * from './types/estimationTypes';

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
