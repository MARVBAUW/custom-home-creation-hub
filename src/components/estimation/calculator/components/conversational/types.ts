
export interface MessageDisplayProps {
  messages: Message[];
  loading: boolean;
  onOptionClick: (option: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  options?: string[];
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
