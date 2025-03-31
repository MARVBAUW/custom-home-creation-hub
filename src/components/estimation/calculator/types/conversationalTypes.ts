
export interface Message {
  id: string;
  type: 'system' | 'user' | 'assistant' | 'loading';
  content: string;
  options?: string[];
}

export interface ConversationState {
  currentStep: string;
  askedQuestions: string[];
  completedFields: string[];
  formProgress: number;
}
