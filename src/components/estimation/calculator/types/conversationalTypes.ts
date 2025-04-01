
export interface Message {
  id?: string;
  content: string;
  type: 'user' | 'assistant' | 'system';
  timestamp?: number;
  options?: string[];
  isUser?: boolean;
}

export interface ConversationState {
  messages: Message[];
  currentStep?: string;
  completedFields?: Record<string, any>;
  formData?: Record<string, any>;
  askedQuestions?: string[];
  formProgress?: number;
}

export interface MessageDisplayProps {
  message: Message;
  messages: Message[];
  loading: boolean;
  onOptionClick: (option: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface MessageProcessorProps {
  content: string;
  onProcessed: (processedContent: React.ReactNode) => void;
  onUserInput: (input: string) => void;
  formData: any;
  updateFormData: (data: any) => void;
}

export interface ConversationAction {
  type: 'ADD_MESSAGE' | 'UPDATE_FORM' | 'SET_STEP' | 'RESET';
  payload?: any;
}
