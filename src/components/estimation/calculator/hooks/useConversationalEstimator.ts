
import { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormData } from '../types';
import { useToast } from '@/hooks/use-toast';

// Define message types for the conversational UI
export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  createdAt: Date;
}

export interface ConversationState {
  messages: Message[];
  isTyping: boolean;
  formProgress: number;
}

export interface ConversationalEstimatorProps {
  onUserInput: (input: string) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onClientTypeSubmit?: (data: {clientType: string}) => void;
  goToStep?: (step: number) => void;
}

export const useConversationalEstimator = (props: ConversationalEstimatorProps) => {
  const { onUserInput, formData, updateFormData } = props;
  
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      text: "Bonjour ! Je suis votre assistant d'estimation. Comment puis-je vous aider avec votre projet de construction ou rénovation ?",
      isUser: false,
      createdAt: new Date()
    }
  ]);
  
  const [conversationState, setConversationState] = useState<{formProgress: number}>({
    formProgress: 0
  });
  
  const { toast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Helper to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper to add a new message
  const addMessage = useCallback((text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: uuidv4(),
      text,
      isUser,
      createdAt: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    return newMessage;
  }, []);

  // Simulate assistant typing
  const simulateTyping = useCallback((duration: number = 1000) => {
    setLoading(true);
    
    return new Promise<void>(resolve => {
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, duration);
    });
  }, []);

  // Process user input
  const processUserInput = useCallback(async (input: string) => {
    if (!input.trim()) return;
    
    // Add user message
    addMessage(input, true);
    
    // Simulate AI thinking
    await simulateTyping(1500);
    
    // Process the input
    let response = "Je vous remercie pour ces informations. Pouvez-vous me préciser d'autres détails sur votre projet, comme la surface, le type de construction, ou votre budget ?";
    
    // Basic intent recognition
    if (input.toLowerCase().includes('bonjour') || input.toLowerCase().includes('salut')) {
      response = "Bonjour ! Je suis ravi de vous aider avec votre estimation. Quel type de projet envisagez-vous ? Construction neuve, rénovation, extension ?";
    } else if (input.toLowerCase().includes('maison')) {
      response = "Une maison ! Excellent. Quelle surface approximative envisagez-vous pour votre projet ?";
      updateFormData({ projectType: 'construction' });
      updateProgress();
    } else if (input.toLowerCase().includes('rénovation') || input.toLowerCase().includes('renovation')) {
      response = "Un projet de rénovation. Quelle est la surface à rénover et quel est l'état actuel du bien ?";
      updateFormData({ projectType: 'renovation' });
      updateProgress();
    } else if (input.toLowerCase().includes('extension')) {
      response = "Une extension de votre habitation existante. Quelle surface souhaitez-vous ajouter ?";
      updateFormData({ projectType: 'extension' });
      updateProgress();
    } else if (/\d+\s*m²/.test(input)) {
      const match = input.match(/(\d+)\s*m²/);
      if (match) {
        const surface = parseInt(match[1]);
        response = `Une surface de ${surface} m². C'est noté. Dans quelle ville ou région se situe votre projet ?`;
        updateFormData({ surface });
        updateProgress();
      }
    } else if (input.toLowerCase().includes('budget')) {
      response = "Le budget est un élément important. Nous allons créer une estimation qui vous permettra d'avoir une vision claire des coûts associés à votre projet.";
    }
    
    // Send the analyzed data to parent component
    onUserInput(input);
    
    // Add assistant response
    addMessage(response, false);
  }, [addMessage, simulateTyping, updateFormData, onUserInput]);

  // Update progress based on collected information
  const updateProgress = useCallback(() => {
    // Count the number of essential fields that have been filled
    const essentialFields = [
      'projectType', 'surface', 'city', 'constructionType', 
      'finishLevel', 'heatingType', 'wallType'
    ];
    
    let filledFields = 0;
    essentialFields.forEach(field => {
      if (formData[field]) filledFields++;
    });
    
    // Calculate progress percentage
    const progress = Math.min(Math.round((filledFields / essentialFields.length) * 100), 100);
    
    setConversationState(prev => ({
      ...prev,
      formProgress: progress
    }));
  }, [formData]);

  // User clicked on a suggested option
  const handleOptionClick = useCallback((option: string) => {
    setUserInput(option);
    processUserInput(option);
  }, [processUserInput]);

  // User pressed enter in input field
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (userInput.trim()) {
        processUserInput(userInput);
        setUserInput('');
      }
    }
  }, [userInput, processUserInput]);

  // Handle send message button click
  const handleSendMessage = useCallback(() => {
    if (userInput.trim()) {
      processUserInput(userInput);
      setUserInput('');
    }
  }, [userInput, processUserInput]);

  // Suggest potential next actions
  const getSuggestions = useCallback(() => {
    const suggestions = [];
    
    if (!formData.projectType) {
      suggestions.push("Je veux construire une maison neuve");
      suggestions.push("Je souhaite rénover mon appartement");
      suggestions.push("Je cherche à faire une extension");
    } else if (!formData.surface) {
      suggestions.push("La surface sera d'environ 100 m²");
      suggestions.push("Je prévois une surface de 150 m²");
    } else if (!formData.city) {
      suggestions.push("Le projet se situe à Paris");
      suggestions.push("Le projet est dans le Sud de la France");
    }
    
    return suggestions.length > 0 ? suggestions : [
      "Quel est le prix au m² pour une construction neuve ?",
      "Quels sont les délais habituels pour un tel projet ?",
      "Quels sont les principaux postes de dépense ?"
    ];
  }, [formData]);

  return {
    messages,
    loading,
    userInput,
    setUserInput,
    messagesEndRef,
    handleSendMessage,
    handleOptionClick,
    handleKeyPress,
    conversationState,
    processUserInput,
    addMessage,
    simulateTyping,
    getSuggestions
  };
};

export default useConversationalEstimator;
