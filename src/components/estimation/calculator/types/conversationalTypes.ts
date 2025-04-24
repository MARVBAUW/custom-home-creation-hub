
export interface Message {
  id: string;
  type: 'user' | 'system' | 'assistant' | 'bot';
  content: string;
  time?: string;
  timestamp?: string;
  options?: string[];
  isUser?: boolean; // For compatibility with older code
}

export interface MessageDisplayProps {
  messages: Message[];
  loading: boolean;
  onOptionClick: (option: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  message: string; // Required property
}

export interface MessageProcessorProps {
  onUserInput: (input: string) => void;
  formData: any;
  updateFormData: (data: any) => void;
  content: string;
  onProcessed: (content: string) => void;
}

export interface InputAreaProps {
  userInput: string;
  setUserInput: (input: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

export interface ConversationState {
  currentStep: string;
  askedQuestions: string[];
  completedFields: string[];
  formProgress: number;
  messages: Message[];
}

export interface EstimationIntents {
  projectType?: string;
  clientType?: string;
  surface?: number;
  location?: string;
  budget?: number;
  timeline?: string;
  rooms?: {
    bedrooms?: number;
    bathrooms?: number;
  };
  constructionType?: string;
  preferences?: string[];
}
