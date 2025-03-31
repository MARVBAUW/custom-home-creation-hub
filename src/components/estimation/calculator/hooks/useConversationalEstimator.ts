
import { useState, useCallback, useEffect } from 'react';
import { FormData } from '../types';
import { Message, ConversationState } from '../types/conversationalTypes';

export const useConversationalEstimator = (
  initialFormData: FormData = {},
  updateFormData: (data: Partial<FormData>) => void
) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Bonjour ! Je suis votre assistant d\'estimation Progineer. Comment puis-je vous aider avec votre projet de construction ou rénovation ?',
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>({
    currentStep: 'initial',
    askedQuestions: [],
    completedFields: [],
    formProgress: 0
  });

  // Add a user message
  const addUserMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  // Add an assistant message
  const addAssistantMessage = useCallback((content: string, options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content,
      options,
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  // Process user input
  const processUserInput = useCallback((input: string) => {
    addUserMessage(input);
    setIsTyping(true);
    
    // Detect information in the user input
    detectInformation(input);
    
    // Generate response based on conversation state
    setTimeout(() => {
      generateResponse(input);
      setIsTyping(false);
    }, 1000);
  }, [addUserMessage, conversationState]);

  // Detect information in user input
  const detectInformation = useCallback((input: string) => {
    const inputLower = input.toLowerCase();
    
    // Detect client type
    if (inputLower.includes('particulier')) {
      updateFormData({ clientType: 'individual' });
      updateConversationState('clientType', 'individual');
    } else if (inputLower.includes('professionnel') || inputLower.includes('pro')) {
      updateFormData({ clientType: 'professional' });
      updateConversationState('clientType', 'professional');
    }
    
    // Detect project type
    if (inputLower.includes('construction') || inputLower.includes('maison') || inputLower.includes('neuf')) {
      updateFormData({ projectType: 'construction' });
      updateConversationState('projectType', 'construction');
    } else if (inputLower.includes('rénovation') || inputLower.includes('renovation')) {
      updateFormData({ projectType: 'renovation' });
      updateConversationState('projectType', 'renovation');
    } else if (inputLower.includes('extension') || inputLower.includes('agrandissement')) {
      updateFormData({ projectType: 'extension' });
      updateConversationState('projectType', 'extension');
    }
    
    // Detect budget if mentioned
    const budgetMatch = input.match(/(\d+)[\s]*[kK€]/) || input.match(/(\d+)[\s]*000[\s]*€/);
    if (budgetMatch && budgetMatch[1]) {
      const budget = parseInt(budgetMatch[1]) * 1000;
      updateFormData({ budget });
      updateConversationState('budget', budget.toString());
    }
    
    // Detect surface if mentioned
    const surfaceMatch = input.match(/(\d+)[\s]*m²/) || input.match(/(\d+)[\s]*m2/);
    if (surfaceMatch && surfaceMatch[1]) {
      const surface = parseInt(surfaceMatch[1]);
      updateFormData({ surface });
      updateConversationState('surface', surface.toString());
    }
  }, [updateFormData]);

  // Generate response based on conversation state
  const generateResponse = useCallback((input: string) => {
    const currentStep = conversationState.currentStep;
    
    // Initial greeting or unknown step
    if (currentStep === 'initial' || !currentStep) {
      addAssistantMessage(
        'Pour vous aider avec votre estimation, j\'aurais besoin de savoir si vous êtes un particulier ou un professionnel ?',
        ['Particulier', 'Professionnel']
      );
      setConversationState(prev => ({
        ...prev,
        currentStep: 'client_type',
        askedQuestions: [...prev.askedQuestions, 'client_type']
      }));
    }
    // Ask about project type
    else if (currentStep === 'client_type') {
      if (conversationState.completedFields.includes('clientType')) {
        if (conversationState.completedFields.includes('clientType') && 
            conversationState.completedFields[conversationState.completedFields.indexOf('clientType') + 1] === 'individual') {
          addAssistantMessage(
            'Quel type de projet envisagez-vous ?',
            ['Construction neuve', 'Rénovation', 'Extension']
          );
        } else {
          addAssistantMessage(
            'Quel type de projet professionnel souhaitez-vous réaliser ?',
            ['Local commercial', 'Bureaux', 'Bâtiment industriel']
          );
        }
        setConversationState(prev => ({
          ...prev,
          currentStep: 'project_type',
          askedQuestions: [...prev.askedQuestions, 'project_type']
        }));
      }
    }
    // Ask about surface
    else if (currentStep === 'project_type') {
      addAssistantMessage('Quelle surface approximative souhaitez-vous pour ce projet (en m²) ?');
      setConversationState(prev => ({
        ...prev,
        currentStep: 'surface',
        askedQuestions: [...prev.askedQuestions, 'surface']
      }));
    }
    // Ask about budget
    else if (currentStep === 'surface') {
      addAssistantMessage('Avez-vous un budget estimatif pour ce projet ?');
      setConversationState(prev => ({
        ...prev,
        currentStep: 'budget',
        askedQuestions: [...prev.askedQuestions, 'budget']
      }));
    }
    // Final message
    else if (currentStep === 'budget') {
      addAssistantMessage(
        'Merci pour ces informations ! Je peux maintenant vous proposer une estimation détaillée. ' +
        'Souhaitez-vous voir les détails de cette estimation ou avoir plus d\'informations sur nos services ?',
        ['Voir l\'estimation détaillée', 'En savoir plus sur vos services']
      );
      setConversationState(prev => ({
        ...prev,
        currentStep: 'final',
        formProgress: 100
      }));
    }
    else {
      // Default response if we don't know what to ask next
      addAssistantMessage(
        'Merci pour cette information. Pouvez-vous me donner plus de détails sur votre projet ?'
      );
    }
  }, [addAssistantMessage, conversationState]);

  // Update conversation state when a field is completed
  const updateConversationState = useCallback((field: string, value: string) => {
    setConversationState(prev => ({
      ...prev,
      completedFields: [...prev.completedFields, field, value],
      formProgress: Math.min(100, prev.formProgress + 10)
    }));
  }, []);

  // Handle client type selection
  const handleClientTypeSelection = useCallback((clientType: string) => {
    updateFormData({ clientType });
    updateConversationState('clientType', clientType);
    
    // Generate next question
    addAssistantMessage(
      clientType === 'individual'
        ? 'Quel type de projet envisagez-vous ?'
        : 'Quel type de projet professionnel souhaitez-vous réaliser ?',
      clientType === 'individual'
        ? ['Construction neuve', 'Rénovation', 'Extension']
        : ['Local commercial', 'Bureaux', 'Bâtiment industriel']
    );
    
    setConversationState(prev => ({
      ...prev,
      currentStep: 'project_type',
      askedQuestions: [...prev.askedQuestions, 'project_type']
    }));
  }, [addAssistantMessage, updateFormData]);

  return {
    messages,
    isTyping,
    conversationState,
    processUserInput,
    addUserMessage,
    addAssistantMessage,
    handleClientTypeSelection
  };
};

export default useConversationalEstimator;
