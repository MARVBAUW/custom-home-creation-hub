
import { useState, useEffect, useCallback } from 'react';
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
}

export const useConversationalEstimator = (
  initialFormData: FormData = {},
  updateFormData: (data: Partial<FormData>) => void
) => {
  const [conversation, setConversation] = useState<ConversationState>({
    messages: [
      {
        id: uuidv4(),
        text: "Bonjour ! Je suis votre assistant d'estimation. Comment puis-je vous aider avec votre projet de construction ou rénovation ?",
        isUser: false,
        createdAt: new Date()
      }
    ],
    isTyping: false
  });
  
  const { toast } = useToast();

  // Helper to add a new message
  const addMessage = useCallback((text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: uuidv4(),
      text,
      isUser,
      createdAt: new Date()
    };
    
    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
    
    return newMessage;
  }, []);

  // Simulate assistant typing
  const simulateTyping = useCallback((duration: number = 1000) => {
    setConversation(prev => ({ ...prev, isTyping: true }));
    
    return new Promise<void>(resolve => {
      setTimeout(() => {
        setConversation(prev => ({ ...prev, isTyping: false }));
        resolve();
      }, duration);
    });
  }, []);

  // Process user input
  const processUserInput = useCallback(async (input: string) => {
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
    } else if (input.toLowerCase().includes('rénovation') || input.toLowerCase().includes('renovation')) {
      response = "Un projet de rénovation. Quelle est la surface à rénover et quel est l'état actuel du bien ?";
      updateFormData({ projectType: 'renovation' });
    } else if (input.toLowerCase().includes('extension')) {
      response = "Une extension de votre habitation existante. Quelle surface souhaitez-vous ajouter ?";
      updateFormData({ projectType: 'extension' });
    } else if (/\d+\s*m²/.test(input)) {
      const match = input.match(/(\d+)\s*m²/);
      if (match) {
        const surface = parseInt(match[1]);
        response = `Une surface de ${surface} m². C'est noté. Dans quelle ville ou région se situe votre projet ?`;
        updateFormData({ surface });
      }
    } else if (input.toLowerCase().includes('budget')) {
      response = "Le budget est un élément important. Nous allons créer une estimation qui vous permettra d'avoir une vision claire des coûts associés à votre projet.";
    }
    
    // Add assistant response
    addMessage(response, false);
  }, [addMessage, simulateTyping, updateFormData]);

  // Suggest potential next actions
  const getSuggestions = useCallback(() => {
    const suggestions = [];
    
    if (!initialFormData.projectType) {
      suggestions.push("Je veux construire une maison neuve");
      suggestions.push("Je souhaite rénover mon appartement");
      suggestions.push("Je cherche à faire une extension");
    } else if (!initialFormData.surface) {
      suggestions.push("La surface sera d'environ 100 m²");
      suggestions.push("Je prévois une surface de 150 m²");
    } else if (!initialFormData.city) {
      suggestions.push("Le projet se situe à Paris");
      suggestions.push("Le projet est dans le Sud de la France");
    }
    
    return suggestions.length > 0 ? suggestions : [
      "Quel est le prix au m² pour une construction neuve ?",
      "Quels sont les délais habituels pour un tel projet ?",
      "Quels sont les principaux postes de dépense ?"
    ];
  }, [initialFormData]);

  return {
    conversation,
    processUserInput,
    addMessage,
    simulateTyping,
    getSuggestions
  };
};

export default useConversationalEstimator;
