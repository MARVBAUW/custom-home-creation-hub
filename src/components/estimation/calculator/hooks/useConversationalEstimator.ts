
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, FormData, ConversationState } from '../types';

export interface ConversationalEstimatorProps {
  onUserInput: (input: string) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onClientTypeSubmit: (data: {clientType: string}) => void;
  goToStep: (step: number) => void;
}

export const useConversationalEstimator = (props: ConversationalEstimatorProps) => {
  const { onUserInput, formData, updateFormData } = props;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      type: 'system',
      content: 'Bienvenue sur l\'assistant d\'estimation. Comment puis-je vous aider avec votre projet de construction ou rénovation?'
    },
    {
      id: uuidv4(),
      type: 'assistant',
      content: 'Bonjour ! Je suis là pour vous aider à estimer votre projet. Parlons-en ensemble. Êtes-vous un particulier ou un professionnel ?',
      options: ['Particulier', 'Professionnel']
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Conversation state to track progress
  const [conversationState, setConversationState] = useState<ConversationState>({
    currentStep: 'initial',
    askedQuestions: [],
    completedFields: [],
    formProgress: 0
  });

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    // Add user message to the chat
    const newUserMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: userInput
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Clear input and show loading
    setUserInput('');
    setLoading(true);
    
    // Add loading message
    const loadingMessageId = uuidv4();
    setMessages(prev => [...prev, {
      id: loadingMessageId,
      type: 'loading',
      content: 'Réflexion en cours...'
    }]);
    
    // Process input
    try {
      onUserInput(userInput);
      
      // Simulate AI response time
      setTimeout(() => {
        // Remove loading message
        setMessages(prev => prev.filter(msg => msg.id !== loadingMessageId));
        
        // Add AI response message
        const aiResponse: Message = {
          id: uuidv4(),
          type: 'assistant',
          content: 'J\'ai bien noté votre demande. Pourriez-vous me donner plus de détails sur votre projet ?',
          options: ['Construction neuve', 'Rénovation', 'Extension']
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setLoading(false);
        
        // Update progress
        updateConversationProgress('projectType');
      }, 1500);
      
    } catch (error) {
      console.error('Error processing message:', error);
      setLoading(false);
      
      // Remove loading message and add error message
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessageId));
      setMessages(prev => [...prev, {
        id: uuidv4(),
        type: 'system',
        content: 'Désolé, une erreur est survenue lors du traitement de votre message.'
      }]);
    }
  };

  // Handle option click (predefined answers)
  const handleOptionClick = (option: string) => {
    // Add user selection as a message
    const newUserMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: option
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Process the selected option
    if (option === 'Particulier' || option === 'Professionnel') {
      props.onClientTypeSubmit({ clientType: option.toLowerCase() });
      
      // Update messages with next step
      setTimeout(() => {
        let nextQuestion = option === 'Particulier' 
          ? 'Quel type de projet envisagez-vous ?' 
          : 'Quel secteur d\'activité représentez-vous ?';
          
        const aiResponse: Message = {
          id: uuidv4(),
          type: 'assistant',
          content: nextQuestion,
          options: option === 'Particulier' 
            ? ['Construction neuve', 'Rénovation', 'Extension'] 
            : ['Architecture', 'Construction', 'Immobilier', 'Autre']
        };
        
        setMessages(prev => [...prev, aiResponse]);
        
        // Update progress
        updateConversationProgress('clientType');
      }, 500);
    } else if (['Construction neuve', 'Rénovation', 'Extension'].includes(option)) {
      // Update formData with project type
      updateFormData({ projectType: option.toLowerCase() });
      
      // Add next question about surface
      setTimeout(() => {
        const aiResponse: Message = {
          id: uuidv4(),
          type: 'assistant',
          content: `Quelle est la surface en m² de votre projet de ${option.toLowerCase()} ?`,
        };
        
        setMessages(prev => [...prev, aiResponse]);
        
        // Update progress
        updateConversationProgress('projectType');
      }, 500);
    }
  };

  // Handle key press events
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Update conversation progress
  const updateConversationProgress = (field: string) => {
    setConversationState(prev => {
      // Update completed fields
      const completedFields = prev.completedFields.includes(field) 
        ? prev.completedFields 
        : [...prev.completedFields, field];
      
      // Calculate progress percentage based on key fields
      const keyFields = [
        'clientType', 'projectType', 'surface', 'city', 
        'terrainType', 'wallType', 'insulationType', 'heatingType'
      ];
      
      const completedKeyFields = keyFields.filter(field => completedFields.includes(field));
      const formProgress = Math.round((completedKeyFields.length / keyFields.length) * 100);
      
      return {
        ...prev,
        currentStep: field,
        completedFields,
        formProgress
      };
    });
  };

  return {
    messages,
    loading,
    userInput,
    setUserInput,
    messagesEndRef,
    handleSendMessage,
    handleOptionClick,
    handleKeyPress,
    conversationState
  };
};
