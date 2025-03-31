
import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, ConversationState } from '../types/conversationalTypes';
import { EstimationFormData as FormData } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const useConversationalEstimator = (initialFormData?: Partial<FormData>) => {
  const [formData, setFormData] = useState<FormData>(initialFormData || {});
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      type: 'system',
      content: 'Bonjour ! Je suis votre assistant d\'estimation Progineer. Comment puis-je vous aider avec votre projet de construction ou rénovation ?',
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [conversationState, setConversationState] = useState<ConversationState>({
    currentStep: 'initial',
    askedQuestions: [],
    completedFields: [],
    formProgress: 0
  });

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update form data
  const updateFormData = (data: Partial<FormData>) => {
    console.log('Updating form data:', data);
    setFormData(prev => ({
      ...prev,
      ...data
    }));
    
    // Update completed fields based on the data
    const newCompletedFields = [...conversationState.completedFields];
    Object.keys(data).forEach(key => {
      if (!newCompletedFields.includes(key)) {
        newCompletedFields.push(key);
      }
    });
    
    // Calculate progress as a percentage of completed fields
    const totalExpectedFields = 10; // Adjust this number based on your form
    const progress = Math.min(100, Math.round((newCompletedFields.length / totalExpectedFields) * 100));
    
    setConversationState(prev => ({
      ...prev,
      completedFields: newCompletedFields,
      formProgress: progress
    }));
  };

  // Handle sending a message from the user
  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content,
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Process user input (this would usually call an API)
    setTimeout(() => {
      processUserInput(content);
    }, 500);
  }, []);

  // Process user input and generate a response
  const processUserInput = (input: string) => {
    // Simplified processing logic (in a real app, this would likely use NLP or LLM)
    const lowerInput = input.toLowerCase();
    let response = '';
    let dataToUpdate: Partial<FormData> = {};
    
    // Check for client type
    if (lowerInput.includes('particulier')) {
      dataToUpdate.clientType = 'individual';
      response = 'Je note que vous êtes un particulier. Quel type de projet envisagez-vous ?';
      setConversationState(prev => ({ ...prev, currentStep: 'project_type' }));
    } 
    else if (lowerInput.includes('professionnel') || lowerInput.includes('entreprise')) {
      dataToUpdate.clientType = 'professional';
      response = 'Je note que vous êtes un professionnel. Quel type de projet souhaitez-vous réaliser ?';
      setConversationState(prev => ({ ...prev, currentStep: 'project_type' }));
    }
    // Check for project type
    else if (lowerInput.includes('construction') || lowerInput.includes('neuf') || lowerInput.includes('maison')) {
      dataToUpdate.projectType = 'construction';
      response = 'Pour votre projet de construction, quelle surface souhaitez-vous construire ? (en m²)';
      setConversationState(prev => ({ ...prev, currentStep: 'surface' }));
    }
    else if (lowerInput.includes('rénovation') || lowerInput.includes('renovation')) {
      dataToUpdate.projectType = 'renovation';
      response = 'Pour votre projet de rénovation, quelle est la surface concernée ? (en m²)';
      setConversationState(prev => ({ ...prev, currentStep: 'surface' }));
    }
    else if (lowerInput.includes('extension') || lowerInput.includes('agrandissement')) {
      dataToUpdate.projectType = 'extension';
      response = 'Pour votre projet d\'extension, quelle surface additionnelle envisagez-vous ? (en m²)';
      setConversationState(prev => ({ ...prev, currentStep: 'surface' }));
    }
    // Extract surface information if provided
    else if (conversationState.currentStep === 'surface' || lowerInput.includes('m²') || lowerInput.includes('m2')) {
      const surfaceMatch = lowerInput.match(/(\d+)\s*(?:m²|m2|mètres carrés|metres carres)/);
      if (surfaceMatch && surfaceMatch[1]) {
        const surface = parseInt(surfaceMatch[1]);
        dataToUpdate.surface = surface;
        response = `Je note une surface de ${surface} m². Avez-vous un budget estimé pour ce projet ?`;
        setConversationState(prev => ({ ...prev, currentStep: 'budget' }));
      }
    }
    // Extract budget information if provided
    else if (conversationState.currentStep === 'budget' || lowerInput.includes('budget') || lowerInput.includes('euros') || lowerInput.includes('€')) {
      const budgetMatch = lowerInput.match(/(\d+(?:\s*\d+)*)\s*(?:euros|€|k€|k euros)/);
      if (budgetMatch && budgetMatch[1]) {
        let budget = parseInt(budgetMatch[1].replace(/\s/g, ''));
        // Handle budget in thousands (k)
        if (lowerInput.includes('k€') || lowerInput.includes('k euros')) {
          budget *= 1000;
        }
        dataToUpdate.budget = budget;
        response = `Je note un budget de ${budget.toLocaleString('fr-FR')} €. Où se situe votre projet ?`;
        setConversationState(prev => ({ ...prev, currentStep: 'location' }));
      }
    }
    // Extract location information
    else if (conversationState.currentStep === 'location' || lowerInput.includes('ville') || lowerInput.includes('région')) {
      // Simple logic for location extraction - in a real app, you would use NER
      const words = lowerInput.split(' ');
      const potentialLocations = words.filter(word => 
        word.length > 3 && 
        !['dans', 'près', 'pres', 'vers', 'côté', 'cote', 'ville', 'région', 'region'].includes(word)
      );
      
      if (potentialLocations.length > 0) {
        const location = potentialLocations[0].charAt(0).toUpperCase() + potentialLocations[0].slice(1);
        dataToUpdate.city = location;
        response = `Je note que votre projet se situe à ${location}. Pouvez-vous me donner votre adresse email pour vous envoyer une estimation détaillée ?`;
        setConversationState(prev => ({ ...prev, currentStep: 'contact' }));
      }
    }
    // Extract email information
    else if (conversationState.currentStep === 'contact' || lowerInput.includes('@')) {
      const emailMatch = lowerInput.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (emailMatch) {
        dataToUpdate.email = emailMatch[0];
        response = `Merci ! Votre email ${emailMatch[0]} a été enregistré. Je vais maintenant calculer une estimation pour votre projet.`;
        setConversationState(prev => ({ ...prev, currentStep: 'complete' }));
      }
    }
    // Default response
    else {
      response = 'Pourriez-vous me donner plus de détails sur votre projet ? Par exemple, s\'agit-il d\'une construction, rénovation ou extension ? Quelle surface envisagez-vous ?';
    }
    
    // Update form data if we extracted information
    if (Object.keys(dataToUpdate).length > 0) {
      updateFormData(dataToUpdate);
    }
    
    // Add assistant response
    const assistantMessage: Message = {
      id: uuidv4(),
      type: 'assistant',
      content: response
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
    
    // Final step: generate estimation if conversation is complete
    if (conversationState.currentStep === 'complete') {
      generateEstimation();
    }
  };

  // Generate the estimation
  const generateEstimation = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const estimatedPrice = calculateEstimatedPrice();
      
      const estimationMessage: Message = {
        id: uuidv4(),
        type: 'assistant',
        content: `Voici une estimation pour votre projet:\n\nType: ${formData.projectType}\nSurface: ${formData.surface} m²\nBudget estimé: ${estimatedPrice.toLocaleString('fr-FR')} €\n\nSouhaitez-vous recevoir une estimation plus détaillée ?`,
        options: ['Oui, je veux une estimation détaillée', 'Non merci, cette estimation me suffit']
      };
      
      setMessages(prev => [...prev, estimationMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  // Simple estimation calculation logic
  const calculateEstimatedPrice = (): number => {
    let basePrice = 0;
    const surface = typeof formData.surface === 'string' ? 
      parseInt(formData.surface) : (formData.surface || 0);
    
    if (formData.projectType === 'construction') {
      basePrice = surface * 1500; // 1500€/m² for new construction
    } else if (formData.projectType === 'renovation') {
      basePrice = surface * 800; // 800€/m² for renovation
    } else if (formData.projectType === 'extension') {
      basePrice = surface * 1200; // 1200€/m² for extension
    }
    
    // Apply adjustments based on location
    if (formData.city) {
      const expensiveLocations = ['paris', 'lyon', 'nice', 'cannes', 'bordeaux'];
      const lcCity = formData.city.toLowerCase();
      
      if (expensiveLocations.some(loc => lcCity.includes(loc))) {
        basePrice *= 1.2; // 20% premium for expensive cities
      }
    }
    
    return Math.round(basePrice);
  };

  // Handle option selection
  const handleOptionClick = (option: string) => {
    sendMessage(option);
  };

  // Reset the conversation
  const resetConversation = () => {
    setFormData({});
    setMessages([
      {
        id: uuidv4(),
        type: 'system',
        content: 'Bonjour ! Je suis votre assistant d\'estimation Progineer. Comment puis-je vous aider avec votre projet de construction ou rénovation ?',
      }
    ]);
    setConversationState({
      currentStep: 'initial',
      askedQuestions: [],
      completedFields: [],
      formProgress: 0
    });
  };

  return {
    formData,
    messages,
    isLoading,
    userInput,
    setUserInput,
    messagesEndRef,
    conversationState,
    sendMessage,
    handleOptionClick,
    updateFormData,
    resetConversation
  };
};
