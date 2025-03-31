
export interface Message {
  id?: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp?: number;
}

export interface ConversationState {
  messages: Message[];
  currentStep?: string;
  completedFields?: Record<string, any>;
  formData?: Record<string, any>;
}

export interface MessageDisplayProps {
  message: Message;
}

export interface MessageProcessorProps {
  content: string;
  onProcessed: (processedContent: React.ReactNode) => void;
}

export interface ConversationAction {
  type: 'ADD_MESSAGE' | 'UPDATE_FORM' | 'SET_STEP' | 'RESET';
  payload?: any;
}
