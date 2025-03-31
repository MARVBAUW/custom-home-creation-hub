
export interface Message {
  content: string;
  timestamp: Date;
  isUser: boolean;
  isProcessed?: boolean;
}

export interface ConversationState {
  messages: Message[];
  isLoading: boolean;
  processingStatus: string | null;
  currentQuestion: string | null;
  conversationHistory: string[];
}

export interface QuestionData {
  question: string;
  options?: string[];
  type: 'text' | 'options' | 'number' | 'boolean' | 'date' | 'multiselect';
  formField?: string;
  nextQuestionBasedOn?: Record<string, string>;
  defaultNextQuestion?: string;
}

export interface ConversationContext {
  estimationType?: string;
  projectType?: string;
  surfaceArea?: number;
  budget?: number;
  location?: string;
  stages?: number;
  timeframe?: string;
  structuralWork?: boolean;
  demolition?: boolean;
  renovation?: boolean;
  newConstruction?: boolean;
}
