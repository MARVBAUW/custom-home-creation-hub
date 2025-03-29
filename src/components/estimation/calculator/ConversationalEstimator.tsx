
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MessageDisplay from './components/conversational/MessageDisplay';
import InputArea from './components/conversational/InputArea';
import { Message, ConversationalProps } from './components/conversational/types';

const ConversationalEstimator: React.FC<ConversationalProps> = (props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: uuidv4(),
        type: 'system',
        content: "Bonjour ! Je suis votre assistant virtuel pour vous aider à estimer votre projet de construction ou rénovation. Comment puis-je vous aider aujourd'hui ?",
        options: [
          "Je souhaite estimer un projet de construction neuve",
          "Je voudrais estimer une rénovation",
          "J'ai besoin d'estimer une extension"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    // Add user message
    const newUserMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: userInput
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setLoading(true);

    // Simulate response delay
    setTimeout(() => {
      processUserInput(userInput);
      setLoading(false);
    }, 1000);
  };

  // Process user input and determine next steps
  const processUserInput = (input: string) => {
    // Simple keyword matching for demo purposes
    if (input.toLowerCase().includes('construction') || 
        input.toLowerCase().includes('neuve')) {
      askForClientType();
    } else if (input.toLowerCase().includes('rénovation')) {
      askForRenovationType();
    } else if (input.toLowerCase().includes('extension')) {
      askForExtensionDetails();
    } else {
      provideGeneralHelp();
    }
  };

  // Handle pre-defined option selection
  const handleOptionClick = (option: string) => {
    const newUserMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: option
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);

    // Simulate response delay
    setTimeout(() => {
      if (option.includes('construction neuve')) {
        askForClientType();
      } else if (option.includes('rénovation')) {
        askForRenovationType();
      } else if (option.includes('extension')) {
        askForExtensionDetails();
      } else if (option.includes('particulier')) {
        askForProjectType("particulier");
        props.onClientTypeSubmit({ clientType: "particulier" });
      } else if (option.includes('professionnel')) {
        askForProjectType("professionnel");
        props.onClientTypeSubmit({ clientType: "professionnel" });
      } else {
        provideGeneralHelp();
      }
      setLoading(false);
    }, 1000);
  };

  // Message generation functions
  const askForClientType = () => {
    const message: Message = {
      id: uuidv4(),
      type: 'system',
      content: "Êtes-vous un particulier ou un professionnel ?",
      options: ["Je suis un particulier", "Je suis un professionnel"]
    };
    setMessages(prev => [...prev, message]);
  };

  const askForProjectType = (clientType: string) => {
    const message: Message = {
      id: uuidv4(),
      type: 'system',
      content: `En tant que ${clientType}, quel type de projet souhaitez-vous estimer ?`,
      options: ["Maison individuelle", "Immeuble collectif", "Local commercial", "Bâtiment industriel"]
    };
    setMessages(prev => [...prev, message]);
  };

  const askForRenovationType = () => {
    const message: Message = {
      id: uuidv4(),
      type: 'system',
      content: "Quel type de rénovation souhaitez-vous réaliser ?",
      options: ["Rénovation complète", "Rénovation énergétique", "Rénovation partielle"]
    };
    setMessages(prev => [...prev, message]);
  };

  const askForExtensionDetails = () => {
    const message: Message = {
      id: uuidv4(),
      type: 'system',
      content: "Quelle est la surface approximative de votre extension ?",
      options: ["Moins de 20m²", "Entre 20 et 40m²", "Plus de 40m²"]
    };
    setMessages(prev => [...prev, message]);
  };

  const provideGeneralHelp = () => {
    const message: Message = {
      id: uuidv4(),
      type: 'system',
      content: "Je peux vous aider à estimer différents types de projets. Veuillez choisir une option ci-dessous :",
      options: [
        "Je souhaite estimer un projet de construction neuve",
        "Je voudrais estimer une rénovation",
        "J'ai besoin d'estimer une extension"
      ]
    };
    setMessages(prev => [...prev, message]);
  };

  // Handle keyboard events
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden">
      <MessageDisplay 
        messages={messages} 
        loading={loading} 
        onOptionClick={handleOptionClick} 
        messagesEndRef={messagesEndRef} 
      />
      
      <InputArea 
        userInput={userInput} 
        setUserInput={setUserInput} 
        handleSendMessage={handleSendMessage} 
        handleKeyPress={handleKeyPress} 
      />
    </div>
  );
};

export default ConversationalEstimator;
