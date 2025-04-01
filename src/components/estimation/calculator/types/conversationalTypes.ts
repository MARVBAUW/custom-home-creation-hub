
export interface Message {
  id?: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  options?: string[];
  time?: string;
}

export interface ConversationState {
  messages: Message[];
  currentStep?: string;
  askedQuestions?: string[];
  completedFields?: string[];
  formProgress?: number;
}

export interface MessageDisplayProps {
  messages: Message[];
  loading: boolean;
  onOptionClick: (option: string) => void;
  messagesEndRef: React.MutableRefObject<HTMLDivElement>;
  message?: string;
}

export interface MessageProcessorProps {
  onUserInput: (input: string) => void;
  formData: any;
  updateFormData: (data: any) => void;
  content?: string;
  onProcessed?: () => void;
}
