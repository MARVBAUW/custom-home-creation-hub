
import { useState, useCallback } from 'react';
import { FormData, Message, ConversationState } from '../types';

export const useConversationalEstimator = (formData: FormData, updateFormData: (data: Partial<FormData>) => void) => {
  const [conversation, setConversation] = useState<ConversationState>({
    messages: [],
    options: [],
    activeQuestions: [],
    collectedData: {},
    stage: 'initial'
  });

  // Add a message to the conversation
  const addMessage = useCallback((text: string, isUser: boolean): Message => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
      type: 'text'
    };

    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    return newMessage;
  }, []);

  // Simulate the bot typing
  const simulateTyping = useCallback(async (duration: number = 1000): Promise<void> => {
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      text: '...',
      isUser: false,
      timestamp: new Date(),
      type: 'loading'
    };

    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, typingMessage]
    }));

    return new Promise(resolve => {
      setTimeout(() => {
        setConversation(prev => ({
          ...prev,
          messages: prev.messages.filter(m => m.id !== typingMessage.id)
        }));
        resolve();
      }, duration);
    });
  }, []);

  // Get suggestions based on current conversation state
  const getSuggestions = useCallback(() => {
    const { stage } = conversation;
    
    // Return different options based on the conversation stage
    switch (stage) {
      case 'initial':
        return ['Particulier', 'Professionnel'];
      case 'projectType':
        return ['Construction', 'Rénovation', 'Extension'];
      case 'surface':
        return ['< 50m²', '50-100m²', '100-150m²', '150-200m²', '> 200m²'];
      case 'budget':
        return ['< 100K€', '100K-200K€', '200K-300K€', '> 300K€'];
      default:
        return [];
    }
  }, [conversation]);

  // Process user input and update conversation
  const processUserInput = useCallback(async (input: string): Promise<void> => {
    // Simulate bot thinking
    await simulateTyping();

    // Extract information from user input
    const extractProjectType = (input: string): string | null => {
      if (input.toLowerCase().includes('construction') || input.toLowerCase().includes('construire')) {
        return 'construction';
      } else if (input.toLowerCase().includes('rénovation') || input.toLowerCase().includes('rénover')) {
        return 'renovation';
      } else if (input.toLowerCase().includes('extension') || input.toLowerCase().includes('agrandir')) {
        return 'extension';
      }
      return null;
    };

    const extractSurface = (input: string): number | null => {
      const match = input.match(/(\d+)\s*m²/);
      return match ? parseInt(match[1]) : null;
    };

    // Update formData based on extracted information
    const projectType = extractProjectType(input);
    const surface = extractSurface(input);

    if (projectType) {
      updateFormData({ projectType });
    }

    if (surface) {
      updateFormData({ surface });
    }

    // Determine next bot response based on conversation stage
    let botResponse = '';
    let nextStage = conversation.stage;

    switch (conversation.stage) {
      case 'initial':
        if (input.toLowerCase().includes('particulier')) {
          updateFormData({ clientType: 'individual' });
          botResponse = 'Super ! Et quel type de projet avez-vous ? (construction, rénovation, extension)';
          nextStage = 'projectType';
        } else if (input.toLowerCase().includes('professionnel')) {
          updateFormData({ clientType: 'professional' });
          botResponse = 'Excellent ! Pour quel type de projet professionnel puis-je vous aider ? (construction, rénovation, extension)';
          nextStage = 'projectType';
        } else {
          botResponse = 'Êtes-vous un particulier ou un professionnel ?';
        }
        break;
      case 'projectType':
        if (projectType) {
          botResponse = `Parfait, un projet de ${projectType} ! Quelle surface approximative prévoyez-vous en m² ?`;
          nextStage = 'surface';
        } else {
          botResponse = 'Quel type de projet avez-vous ? (construction, rénovation, extension)';
        }
        break;
      case 'surface':
        if (surface) {
          botResponse = `${surface}m², c'est noté ! Quel est votre budget approximatif pour ce projet ?`;
          nextStage = 'budget';
        } else {
          botResponse = 'Quelle est la surface approximative de votre projet en m² ?';
        }
        break;
      case 'budget':
        botResponse = 'Merci pour ces informations ! Je vais maintenant calculer une estimation pour votre projet. Vous souhaitez une estimation détaillée par corps de métier ?';
        nextStage = 'estimation';
        break;
      case 'estimation':
        botResponse = 'Votre estimation est maintenant disponible dans l\'onglet "Formulaire détaillé". Vous pouvez y accéder pour voir tous les détails de votre projet.';
        nextStage = 'complete';
        break;
      default:
        botResponse = 'Que puis-je faire d\'autre pour vous ?';
        break;
    }

    // Add bot response and update conversation stage
    addMessage(botResponse, false);
    setConversation(prev => ({ ...prev, stage: nextStage }));

  }, [conversation, updateFormData, simulateTyping, addMessage]);

  return {
    conversation,
    processUserInput,
    addMessage,
    simulateTyping,
    getSuggestions
  };
};

export type { Message };
