
import { FormData } from './formTypes';
import { Dispatch, SetStateAction, RefObject } from 'react';
import { Message } from '../ConversationalEstimator';

export interface MessageProcessorProps {
  onUserInput: (input: string) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export interface MessageDisplayProps {
  messages: Message[];
  loading: boolean;
  onOptionClick: (option: string) => void;
  messagesEndRef: RefObject<HTMLDivElement>;
}

export interface InputAreaProps {
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}
