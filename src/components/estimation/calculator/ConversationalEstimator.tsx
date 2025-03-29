
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import MessageDisplay from './components/conversational/MessageDisplay';
import InputArea from './components/conversational/InputArea';
import MessageProcessor from './components/conversational/MessageProcessor';
import { Message, ConversationalProps } from './components/conversational/types';

const ConversationalEstimator: React.FC<ConversationalProps> = (props) => {
  const {
    onClientTypeSubmit,
    onProfessionalProjectSubmit,
    onIndividualProjectSubmit,
    onEstimationTypeSubmit,
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onComblesSubmit,
    onCouvertureSubmit,
    onIsolationSubmit,
    onFacadeSubmit,
    onMenuiseriesExtSubmit,
    onElectriciteSubmit,
    onPlomberieSubmit,
    onChauffageSubmit,
    onPlatrerieSubmit,
    onMenuiseriesIntSubmit,
    onCarrelageSubmit,
    onParquetSubmit,
    onPeintureSubmit,
    onEnergiesRenouvelablesSubmit,
    onSolutionsEnvironSubmit,
    onAmenagementPaysagerSubmit,
    onOptionsSubmit,
    onCuisineSubmit,
    onSalleDeBainSubmit,
    onDemolitionSubmit,
    onGrosOeuvreRenovSubmit,
    onCharpenteRenovSubmit,
    onCouvertureRenovSubmit,
    onFacadeRenovSubmit,
    onContactSubmit,
    formData,
    step,
    onStepChange
  } = props;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Bonjour ! Je suis votre assistant d'estimation de projet Progineer. Quel type de projet souhaitez-vous estimer ?',
      options: ['Construction neuve', 'Rénovation', 'Extension']
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Maintenir la position de défilement lors de l'ajout de nouveaux messages
  useEffect(() => {
    if (messagesEndRef.current) {
      const chatContainer = chatContainerRef.current;
      const shouldScroll = 
        chatContainer && 
        chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight < 100;
      
      if (shouldScroll) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  const addSystemMessage = (content: string, options: string[] = []) => {
    const newSystemMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content,
      options
    };
    
    setMessages(prev => [...prev, newSystemMessage]);
  };

  const messageProcessorProps = {
    ...props,
    addSystemMessage
  };

  const { processUserInput } = MessageProcessor(messageProcessorProps);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setLoading(true);
    
    // Simuler un délai de réponse du système
    setTimeout(() => {
      processUserInput(userInput);
      setLoading(false);
    }, 500);
  };

  const handleOptionClick = (option: string) => {
    // Ajouter l'option sélectionnée comme message de l'utilisateur
    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: option
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);
    
    // Simuler un délai de réponse du système
    setTimeout(() => {
      processUserInput(option);
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="rounded-lg overflow-hidden shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col h-[500px]">
          {/* Zone des messages */}
          <div 
            className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900" 
            ref={chatContainerRef}
          >
            <MessageDisplay 
              messages={messages} 
              loading={loading} 
              onOptionClick={handleOptionClick} 
              messagesEndRef={messagesEndRef} 
            />
          </div>
          
          {/* Zone de saisie */}
          <InputArea 
            userInput={userInput} 
            setUserInput={setUserInput} 
            handleSendMessage={handleSendMessage} 
            handleKeyPress={handleKeyPress} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationalEstimator;
