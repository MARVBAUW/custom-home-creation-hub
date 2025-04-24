
import { useState, useCallback } from 'react';
import { FormData, Message } from '../types/formTypes';

interface ConversationState {
  currentStep: string;
  askedQuestions: string[];
  completedFields: string[];
  formProgress: number;
  messages: Message[];
  isProcessing: boolean;
}

interface UseConversationalEstimatorProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onClientTypeSubmit?: (data: { clientType: string }) => void;
  goToStep?: (step: number) => void;
}

export const useConversationalEstimator = ({
  formData,
  updateFormData,
  onClientTypeSubmit,
  goToStep
}: UseConversationalEstimatorProps) => {
  // State for the user's current input
  const [userInput, setUserInput] = useState('');
  
  // Form data state for the estimator
  const [estimationFormData, setEstimationFormData] = useState<FormData>(formData);
  
  // Conversation state
  const [conversationState, setConversationState] = useState<ConversationState>({
    currentStep: 'greeting',
    askedQuestions: [],
    completedFields: [],
    formProgress: 0,
    messages: [],
    isProcessing: false
  });
  
  // Process user input
  const handleUserInput = useCallback((input: string) => {
    if (!input.trim()) return;
    
    setUserInput('');
    
    // Add user message to conversation
    setConversationState(prev => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: Date.now().toString(),
          type: 'user',
          content: input,
          timestamp: new Date().toISOString()
        }
      ]
    }));
    
    // Process the input based on current step
    processInput(input);
  }, []);
  
  // Mock function to process the input
  const processInput = useCallback((input: string) => {
    const inputLower = input.toLowerCase();
    
    // Simple logic to extract and update form data
    // Surface
    const surfaceMatch = inputLower.match(/(\d+)\s*m²/);
    if (surfaceMatch && surfaceMatch[1]) {
      const surface = parseInt(surfaceMatch[1]);
      updateFormData({ surface });
      setEstimationFormData(prev => ({ ...prev, surface }));
      
      // Add bot response
      setTimeout(() => {
        setConversationState(prev => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: Date.now().toString(),
              type: 'bot',
              content: `J'ai noté une surface de ${surface} m². Quel type de projet envisagez-vous ? (construction, rénovation, extension)`,
              timestamp: new Date().toISOString()
            }
          ]
        }));
      }, 1000);
      
      return;
    }
    
    // Project type
    if (inputLower.includes('construction') || inputLower.includes('neuf')) {
      updateFormData({ projectType: 'construction' });
      setEstimationFormData(prev => ({ ...prev, projectType: 'construction' }));
      
      // Add bot response
      setTimeout(() => {
        setConversationState(prev => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: Date.now().toString(),
              type: 'bot',
              content: 'Super, pour votre projet de construction neuve, pouvez-vous m\'indiquer la surface souhaitée en m² ?',
              timestamp: new Date().toISOString()
            }
          ]
        }));
      }, 1000);
      
      return;
    }
    
    if (inputLower.includes('rénovation') || inputLower.includes('renovation')) {
      updateFormData({ projectType: 'renovation' });
      setEstimationFormData(prev => ({ ...prev, projectType: 'renovation' }));
      
      // Add bot response
      setTimeout(() => {
        setConversationState(prev => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: Date.now().toString(),
              type: 'bot',
              content: 'Pour votre projet de rénovation, quelle est la surface concernée en m² ?',
              timestamp: new Date().toISOString()
            }
          ]
        }));
      }, 1000);
      
      return;
    }
    
    if (inputLower.includes('extension')) {
      updateFormData({ projectType: 'extension' });
      setEstimationFormData(prev => ({ ...prev, projectType: 'extension' }));
      
      // Add bot response
      setTimeout(() => {
        setConversationState(prev => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: Date.now().toString(),
              type: 'bot',
              content: 'Pour votre projet d\'extension, quelle surface additionnelle envisagez-vous en m² ?',
              timestamp: new Date().toISOString()
            }
          ]
        }));
      }, 1000);
      
      return;
    }
    
    // Client type
    if (inputLower.includes('particulier')) {
      updateFormData({ clientType: 'individual' });
      setEstimationFormData(prev => ({ ...prev, clientType: 'individual' }));
      
      if (onClientTypeSubmit) {
        onClientTypeSubmit({ clientType: 'individual' });
      }
      
      // Add bot response
      setTimeout(() => {
        setConversationState(prev => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: Date.now().toString(),
              type: 'bot',
              content: 'Parfait ! En tant que particulier, quel type de projet envisagez-vous ? (construction, rénovation, extension)',
              timestamp: new Date().toISOString()
            }
          ]
        }));
      }, 1000);
      
      return;
    }
    
    if (inputLower.includes('professionnel') || inputLower.includes('entreprise')) {
      updateFormData({ clientType: 'professional' });
      setEstimationFormData(prev => ({ ...prev, clientType: 'professional' }));
      
      if (onClientTypeSubmit) {
        onClientTypeSubmit({ clientType: 'professional' });
      }
      
      // Add bot response
      setTimeout(() => {
        setConversationState(prev => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: Date.now().toString(),
              type: 'bot',
              content: 'Bienvenue ! Pour votre projet professionnel, pouvez-vous préciser votre secteur d\'activité ?',
              timestamp: new Date().toISOString()
            }
          ]
        }));
      }, 1000);
      
      return;
    }
    
    // Default response
    setTimeout(() => {
      setConversationState(prev => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: Date.now().toString(),
            type: 'bot',
            content: 'Merci pour cette information. Pouvez-vous me préciser si vous êtes un particulier ou un professionnel ?',
            timestamp: new Date().toISOString()
          }
        ]
      }));
    }, 1000);
    
  }, [updateFormData, onClientTypeSubmit]);
  
  // Reset conversation
  const resetConversation = useCallback(() => {
    setEstimationFormData({} as FormData);
    setConversationState({
      currentStep: 'greeting',
      askedQuestions: [],
      completedFields: [],
      formProgress: 0,
      messages: [],
      isProcessing: false
    });
    
    // Add initial greeting
    setTimeout(() => {
      setConversationState(prev => ({
        ...prev,
        messages: [
          {
            id: Date.now().toString(),
            type: 'bot',
            content: 'Bonjour ! Je suis l\'assistant d\'estimation de Progineer. Comment puis-je vous aider avec votre projet ? Êtes-vous un particulier ou un professionnel ?',
            timestamp: new Date().toISOString()
          }
        ]
      }));
    }, 500);
  }, []);
  
  // Initialize conversation on first load
  const initializeConversation = useCallback(() => {
    resetConversation();
  }, [resetConversation]);
  
  return {
    userInput,
    setUserInput,
    handleUserInput,
    conversationState,
    resetConversation,
    initializeConversation
  };
};

export default useConversationalEstimator;
