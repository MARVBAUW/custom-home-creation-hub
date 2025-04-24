
export interface MessageDisplayProps {
  messages: Message[];
  loading: boolean;
  onOptionClick: (option: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  message?: string; // Making this optional
}

export interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system' | 'bot';
  content: string;
  options?: string[];
  timestamp?: string;
  text?: string; // Added for compatibility
}

export interface ConversationalProps {
  onUserInput: (input: string) => void;
  formData: any;
  updateFormData: (data: any) => void;
  onClientTypeSubmit: (data: { clientType: string }) => void;
  goToStep: (step: number) => void;
}

export interface InputAreaProps {
  userInput: string;
  setUserInput: (input: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

export interface MessageProcessorProps {
  onUserInput: (input: string) => void;
  formData: any;
  updateFormData: (data: any) => void;
  content: string;
  onProcessed: (content: string) => void;
}
