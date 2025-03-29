import { useState, useEffect, useCallback, useRef } from 'react';
import { FormData, Message } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { analyzeUserIntent } from '../utils/conversationalUtils';
import { toFormValue } from '../utils/typeConversions';

interface ConversationalEstimatorProps {
  initialFormData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onClientTypeSubmit: (data: { clientType: string }) => void;
  goToStep: (step: number) => void;
}

export const useConversationalEstimator = (
  initialFormData: FormData,
  updateFormData: (data: Partial<FormData>) => void,
  onClientTypeSubmit: (data: { clientType: string }) => void,
  goToStep: (step: number) => void
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Conversation state
  const [conversationState, setConversationState] = useState({
    currentStep: 'clientType',
    askedQuestions: [],
    completedFields: [],
    formProgress: 0,
  });
  
  // Scroll to bottom on new message
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  // Initial bot message
  useEffect(() => {
    addSystemMessage("Bonjour ! Bienvenue chez Progineer. Je suis votre assistant virtuel. Comment puis-je vous aider à démarrer votre projet ?");
  }, []);
  
  // Add a system message to the chat
  const addSystemMessage = (content: string, options?: string[]) => {
    const newMessage: Message = {
      id: uuidv4(),
      type: 'system',
      content: content,
      options: options,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };
  
  // Add an assistant message to the chat
  const addAssistantMessage = (content: string, options?: string[]) => {
    const newMessage: Message = {
      id: uuidv4(),
      type: 'assistant',
      content: content,
      options: options,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };
  
  // Add a user message to the chat
  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: content,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };
  
  // Add a loading message to the chat
  const addLoadingMessage = () => {
    const newMessage: Message = {
      id: uuidv4(),
      type: 'loading',
      content: 'Chargement...',
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };
  
  // Remove the loading message from the chat
  const removeLoadingMessage = () => {
    setMessages(prevMessages => prevMessages.filter(message => message.type !== 'loading'));
  };
  
  // Handle sending a message
  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;
    
    // Add user message
    addUserMessage(userInput);
    
    // Add loading message
    addLoadingMessage();
    
    // Process user input
    await processUserInput(userInput);
    
    // Clear user input
    setUserInput('');
  };
  
  // Process user input
  const processUserInput = async (input: string) => {
    setLoading(true);
    removeLoadingMessage();
    
    // Analyze user intent
    const analysis = analyzeUserIntent(input);
    console.log('Analyse:', analysis);
    
    // Extract and update form data
    extractAndUpdateFormData(analysis);
    
    // Determine next step
    determineNextStep(analysis);
    
    setLoading(false);
  };
  
  // Extract and update form data
  const extractAndUpdateFormData = (analysis: any) => {
    let newData: Partial<FormData> = {};
    let hasUpdates = false;
    
    // Extract project type
    if (analysis.entities.project_type) {
      if (analysis.entities.project_type.toLowerCase().includes('construction')) {
        newData.projectType = 'construction';
        hasUpdates = true;
      } else if (analysis.entities.project_type.toLowerCase().includes('rénov')) {
        newData.projectType = 'renovation';
        hasUpdates = true;
      } else if (analysis.entities.project_type.toLowerCase().includes('extension')) {
        newData.projectType = 'extension';
        hasUpdates = true;
      }
    }
    
    // Extract surface
    if (analysis.entities.surface) {
      newData.surface = analysis.entities.surface.toString();
      hasUpdates = true;
    }
    
    // Extract location
    if (analysis.entities.location) {
      const cityName = analysis.entities.location;
      updateFormData({ city: String(cityName) });
      hasUpdates = true;
    }
    
    // Extract rooms
    if (analysis.entities.rooms) {
      newData.roomCount = analysis.entities.rooms.toString();
      hasUpdates = true;
    }
    
    // Extract floors
    if (analysis.entities.floors) {
      if (analysis.entities.floors === 1) {
        newData.levels = '1 niveau (plain-pied)';
      } else if (analysis.entities.floors === 2) {
        newData.levels = '2 niveaux (R+1)';
      } else if (analysis.entities.floors === 3) {
        newData.levels = '3 niveaux (R+2)';
      } else {
        newData.levels = '4 niveaux ou plus';
      }
      hasUpdates = true;
    }
    
    // Extract quality
    if (analysis.entities.quality) {
      newData.finishLevel = analysis.entities.quality;
      hasUpdates = true;
    }
    
    // Extract has_terrain
    if (analysis.entities.has_terrain !== undefined) {
      newData.hasLand = analysis.entities.has_terrain;
      
      if (analysis.entities.terrain_price) {
        newData.landPrice = analysis.entities.terrain_price.toString();
      }
      
      hasUpdates = true;
    }
    
    // Extract budget
    if (analysis.entities.budget) {
      newData.budget = analysis.entities.budget.toString();
      hasUpdates = true;
    }
    
    // Extract email
    if (analysis.entities.email) {
      newData.email = analysis.entities.email;
      hasUpdates = true;
    }
    
    // Extract phone
    if (analysis.entities.phone) {
      newData.phone = analysis.entities.phone;
      hasUpdates = true;
    }
    
    if (hasUpdates) {
      console.log('Mise à jour des données du formulaire:', newData);
      updateFormData(newData);
    }
  };
  
  // Determine next step
  const determineNextStep = (analysis: any) => {
    // Client Type
    if (conversationState.currentStep === 'clientType') {
      if (analysis.entities.client_type) {
        const clientType = analysis.entities.client_type.toLowerCase();
        if (clientType.includes('particulier') || clientType.includes('individual')) {
          onClientTypeSubmit({ clientType: 'individual' });
          addAssistantMessage("Parfait ! Nous allons configurer votre projet en tant que particulier.");
          goToStep(2);
          setConversationState(prevState => ({
            ...prevState,
            currentStep: 'projectDetails',
            completedFields: [...prevState.completedFields, 'clientType'],
            formProgress: 10,
          }));
        } else if (clientType.includes('professionnel') || clientType.includes('professional')) {
          onClientTypeSubmit({ clientType: 'professional' });
          addAssistantMessage("Très bien ! Nous allons configurer votre projet en tant que professionnel.");
          goToStep(1);
          setConversationState(prevState => ({
            ...prevState,
            currentStep: 'projectDetails',
            completedFields: [...prevState.completedFields, 'clientType'],
            formProgress: 10,
          }));
        } else {
          addAssistantMessage("Je n'ai pas compris votre type de client. Veuillez préciser si vous êtes un particulier ou un professionnel.");
        }
      } else {
        addAssistantMessage("Êtes-vous un particulier ou un professionnel ?");
      }
    }
    
    // Project Details
    if (conversationState.currentStep === 'projectDetails') {
      if (analysis.entities.project_type) {
        const projectType = analysis.entities.project_type.toLowerCase();
        if (projectType.includes('construction')) {
          updateFormData({ projectType: 'construction' });
          addAssistantMessage("Excellent ! Nous allons configurer votre projet en tant que construction.");
          goToStep(4);
          setConversationState(prevState => ({
            ...prevState,
            currentStep: 'terrainDetails',
            completedFields: [...prevState.completedFields, 'projectType'],
            formProgress: 20,
          }));
        } else if (projectType.includes('rénovation') || projectType.includes('renovation')) {
          updateFormData({ projectType: 'renovation' });
          addAssistantMessage("Très bien ! Nous allons configurer votre projet en tant que rénovation.");
          goToStep(4);
          setConversationState(prevState => ({
            ...prevState,
            currentStep: 'terrainDetails',
            completedFields: [...prevState.completedFields, 'projectType'],
            formProgress: 20,
          }));
        } else if (projectType.includes('extension')) {
          updateFormData({ projectType: 'extension' });
          addAssistantMessage("Parfait ! Nous allons configurer votre projet en tant qu'extension.");
          goToStep(4);
          setConversationState(prevState => ({
            ...prevState,
            currentStep: 'terrainDetails',
            completedFields: [...prevState.completedFields, 'projectType'],
            formProgress: 20,
          }));
        } else {
          addAssistantMessage("Je n'ai pas compris votre type de projet. Veuillez préciser si vous souhaitez faire une construction, une rénovation ou une extension.");
        }
      } else {
        addAssistantMessage("Quel type de projet souhaitez-vous réaliser : construction, rénovation ou extension ?");
      }
    }
    
    // Terrain Details
    if (conversationState.currentStep === 'terrainDetails') {
      if (analysis.entities.has_terrain !== undefined) {
        updateFormData({ hasLand: analysis.entities.has_terrain });
        addAssistantMessage("Très bien ! Nous allons configurer votre projet avec un terrain.");
        goToStep(5);
        setConversationState(prevState => ({
          ...prevState,
          currentStep: 'surfaceDetails',
          completedFields: [...prevState.completedFields, 'hasTerrain'],
          formProgress: 30,
        }));
      } else {
        addAssistantMessage("Avez-vous déjà un terrain ?");
      }
    }
    
    // Surface Details
    if (conversationState.currentStep === 'surfaceDetails') {
      if (analysis.entities.surface) {
        updateFormData({ surface: analysis.entities.surface.toString() });
        addAssistantMessage("Parfait ! Nous allons configurer votre projet avec une surface de " + analysis.entities.surface + " m².");
        goToStep(6);
        setConversationState(prevState => ({
          ...prevState,
          currentStep: 'contactDetails',
          completedFields: [...prevState.completedFields, 'surface'],
          formProgress: 40,
        }));
      } else {
        addAssistantMessage("Quelle est la surface de votre projet en m² ?");
      }
    }
    
    // Contact Details
    if (conversationState.currentStep === 'contactDetails') {
      if (analysis.entities.email && analysis.entities.phone) {
        updateFormData({ email: analysis.entities.email, phone: analysis.entities.phone });
        addAssistantMessage("Parfait ! Nous avons bien enregistré vos informations de contact.");
        goToStep(19);
        setConversationState(prevState => ({
          ...prevState,
          currentStep: 'end',
          completedFields: [...prevState.completedFields, 'contactDetails'],
          formProgress: 100,
        }));
      } else {
        addAssistantMessage("Pourriez-vous nous donner votre email et votre numéro de téléphone pour que nous puissions vous recontacter ?");
      }
    }
  };
  
  return {
    messages,
    userInput,
    setUserInput,
    handleSendMessage,
    loading,
    messagesEndRef,
  };
};
