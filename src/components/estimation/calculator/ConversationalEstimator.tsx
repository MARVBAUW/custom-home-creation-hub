
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from 'lucide-react';

// Types for messages
type MessageType = 'system' | 'user';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  options?: string[];
}

interface ConversationalEstimatorProps {
  onClientTypeSubmit: (data: { clientType: string }) => void;
  onProfessionalProjectSubmit: (data: any) => void;
  onIndividualProjectSubmit: (data: { projectType: string }) => void;
  onEstimationTypeSubmit: (data: any) => void;
  onConstructionDetailsSubmit: (data: any) => void;
  onTerrainSubmit: (data: { terrainType: string }) => void;
  onGrosOeuvreSubmit: (data: { wallType: string }) => void;
  onCharpenteSubmit: (data: { roofType: string }) => void;
  onComblesSubmit: (data: { atticType: string }) => void;
  onCouvertureSubmit: (data: { roofingType: string }) => void;
  onIsolationSubmit: (data: { insulationType: string }) => void;
  onFacadeSubmit: (data: any) => void;
  onMenuiseriesExtSubmit: (data: any) => void;
  onElectriciteSubmit: (data: { electricalType: string }) => void;
  onPlomberieSubmit: (data: { plumbingType: string }) => void;
  onChauffageSubmit: (data: any) => void;
  onPlatrerieSubmit: (data: { plasteringType: string }) => void;
  onMenuiseriesIntSubmit: (data: any) => void;
  onCarrelageSubmit: (data: any) => void;
  onParquetSubmit: (data: any) => void;
  onPeintureSubmit: (data: any) => void;
  onEnergiesRenouvelablesSubmit: (data: any) => void;
  onSolutionsEnvironSubmit: (data: any) => void;
  onAmenagementPaysagerSubmit: (data: any) => void;
  onOptionsSubmit: (data: any) => void;
  onCuisineSubmit: (data: any) => void;
  onSalleDeBainSubmit: (data: any) => void;
  onDemolitionSubmit: (data: any) => void;
  onGrosOeuvreRenovSubmit: (data: any) => void;
  onCharpenteRenovSubmit: (data: any) => void;
  onCouvertureRenovSubmit: (data: any) => void;
  onFacadeRenovSubmit: (data: any) => void;
  onContactSubmit: (data: any) => void;
  formData: any;
  step: number;
  onStepChange?: (step: number) => void;
}

const ConversationalEstimator: React.FC<ConversationalEstimatorProps> = ({
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
}) => {
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

  const processUserInput = (input: string) => {
    // Détecter le type de projet et soumettre les données appropriées
    if (input.toLowerCase().includes('construction') || 
        input.toLowerCase().includes('neuve') || 
        input.toLowerCase().includes('neuf')) {
      onIndividualProjectSubmit({ projectType: 'construction' });
      
      addSystemMessage(
        'Parfait ! Pour une construction neuve, quelle surface habitable envisagez-vous (en m²) ?',
        []
      );
      
      if (onStepChange) {
        onStepChange(3);
      }
    }
    else if (input.toLowerCase().includes('rénovation') || 
             input.toLowerCase().includes('renovation')) {
      onIndividualProjectSubmit({ projectType: 'renovation' });
      
      addSystemMessage(
        'Pour votre projet de rénovation, quelle est la superficie concernée (en m²) ?',
        []
      );
      
      if (onStepChange) {
        onStepChange(3);
      }
    }
    else if (input.toLowerCase().includes('extension')) {
      onIndividualProjectSubmit({ projectType: 'extension' });
      
      addSystemMessage(
        'Pour votre extension, quelle surface additionnelle souhaitez-vous construire (en m²) ?',
        []
      );
      
      if (onStepChange) {
        onStepChange(3);
      }
    }
    else if (!isNaN(Number(input))) {
      // Si l'entrée est un nombre, supposer que c'est une surface
      onConstructionDetailsSubmit({ surface: Number(input) });
      
      addSystemMessage(
        `Merci pour cette information. Pour une surface de ${input} m², quel type de terrain avez-vous ?`,
        ['Terrain plat', 'Terrain en pente', 'Pas encore de terrain']
      );
      
      if (onStepChange) {
        onStepChange(5);
      }
    }
    else if (input.toLowerCase().includes('plat') || 
             input.toLowerCase().includes('pente') || 
             input.toLowerCase().includes('pas encore')) {
      let terrainType = 'flat';
      if (input.toLowerCase().includes('pente')) {
        terrainType = 'sloped';
      } else if (input.toLowerCase().includes('pas encore')) {
        terrainType = 'unknown';
      }
      
      onTerrainSubmit({ terrainType });
      
      addSystemMessage(
        'Parlons maintenant du gros œuvre. Quel type de murs préférez-vous pour votre construction ?',
        ['Parpaings', 'Briques', 'Ossature bois', 'Béton cellulaire']
      );
      
      if (onStepChange) {
        onStepChange(6);
      }
    }
    else if (input.toLowerCase().includes('parpaing') || 
             input.toLowerCase().includes('brique') || 
             input.toLowerCase().includes('bois') || 
             input.toLowerCase().includes('béton') || 
             input.toLowerCase().includes('beton')) {
      let wallType = '';
      if (input.toLowerCase().includes('parpaing')) {
        wallType = 'concrete_blocks';
      } else if (input.toLowerCase().includes('brique')) {
        wallType = 'bricks';
      } else if (input.toLowerCase().includes('bois')) {
        wallType = 'wood_frame';
      } else if (input.toLowerCase().includes('béton') || input.toLowerCase().includes('beton')) {
        wallType = 'cellular_concrete';
      }
      
      onGrosOeuvreSubmit({ wallType });
      
      addSystemMessage(
        'Pour votre charpente, quelle option préférez-vous ?',
        ['Charpente traditionnelle en bois', 'Fermettes industrielles', 'Charpente métallique']
      );
      
      if (onStepChange) {
        onStepChange(7);
      }
    }
    // Ajouter d'autres conditions pour les étapes suivantes
    
    else {
      // Message générique si l'entrée ne correspond à aucune condition
      addSystemMessage(
        'Pourriez-vous préciser votre choix parmi les options proposées ?',
        ['Construction neuve', 'Rénovation', 'Extension']
      );
    }
  };

  const addSystemMessage = (content: string, options: string[] = []) => {
    const newSystemMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content,
      options
    };
    
    setMessages(prev => [...prev, newSystemMessage]);
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
            {messages.map(message => (
              <div key={message.id} className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                <div className={`
                  max-w-[80%] p-3 rounded-lg 
                  ${message.type === 'user' 
                    ? 'bg-progineer-gold/80 text-white ml-auto' 
                    : 'bg-white dark:bg-gray-800 shadow-sm'
                  }
                `}>
                  <p className="text-sm">{message.content}</p>
                  
                  {message.options && message.options.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.options.map(option => (
                        <Button
                          key={option}
                          variant="outline"
                          size="sm"
                          className="text-xs bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="mb-4">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm inline-block">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Zone de saisie */}
          <div className="p-3 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex space-x-2">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1 resize-none h-10 min-h-[40px] py-2"
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon"
                className="h-10 w-10 rounded-full bg-progineer-gold hover:bg-progineer-gold/90"
              >
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationalEstimator;
