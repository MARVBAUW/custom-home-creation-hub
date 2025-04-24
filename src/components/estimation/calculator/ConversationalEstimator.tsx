
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { FormData } from './types/formTypes';
import { MessageDisplayProps, Message, ConversationalProps } from './components/conversational/types';
import { extractFormDataFromMessage } from './components/conversational/MessageProcessor';
import { useToast } from '@/hooks/use-toast';

// Message display component
const MessageDisplay: React.FC<MessageDisplayProps> = ({ messages, loading, onOptionClick, messagesEndRef }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 max-h-[400px] overflow-y-auto">
      {messages.map((message) => (
        <div 
          key={message.id}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`
              max-w-[80%] rounded-lg px-4 py-2 
              ${message.type === 'user' 
                ? 'bg-blue-500 text-white' 
                : message.type === 'system' 
                  ? 'bg-gray-200 text-gray-700' 
                  : 'bg-gray-100 border border-gray-200 text-gray-800'
              }
            `}
          >
            <div className="flex items-center gap-2 mb-1">
              {message.type === 'user' ? (
                <User className="h-4 w-4" />
              ) : message.type === 'assistant' || message.type === 'bot' ? (
                <Bot className="h-4 w-4" />
              ) : null}
              <span className="text-xs font-medium">
                {message.type === 'user' 
                  ? 'Vous' 
                  : message.type === 'system' 
                    ? 'Système' 
                    : 'Assistant'
                }
              </span>
            </div>
            <div>{message.content}</div>
            {message.options && message.options.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {message.options.map((option, index) => (
                  <Button 
                    key={index} 
                    size="sm" 
                    variant="secondary"
                    onClick={() => onOptionClick(option)}
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
        <div className="flex justify-start">
          <div className="bg-gray-100 border border-gray-200 text-gray-800 max-w-[80%] rounded-lg px-4 py-2">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="text-xs font-medium">Assistant</span>
            </div>
            <div className="flex space-x-1 mt-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

// Input area component
const InputArea: React.FC<{
  userInput: string;
  setUserInput: (input: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}> = ({ userInput, setUserInput, handleSendMessage, handleKeyPress }) => {
  return (
    <div className="flex space-x-2 p-4 border-t">
      <Input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Décrivez votre projet..."
        className="flex-1"
      />
      <Button 
        onClick={handleSendMessage}
        disabled={!userInput.trim()}
        size="icon"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Main conversational estimator component
const ConversationalEstimator: React.FC<ConversationalProps> = ({
  onUserInput,
  formData,
  updateFormData,
  onClientTypeSubmit,
  goToStep
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initial message when component mounts
  useEffect(() => {
    if (!conversationStarted) {
      const welcomeMessage: Message = {
        id: uuidv4(),
        type: 'assistant',
        content: "Bonjour ! Je suis l'assistant d'estimation Progineer. Je peux vous aider à estimer le coût de votre projet. Êtes-vous un particulier ou un professionnel ?",
        options: ["Particulier", "Professionnel"]
      };
      
      setMessages([welcomeMessage]);
      setConversationStarted(true);
    }
  }, [conversationStarted]);

  // Handle option click
  const handleOptionClick = (option: string) => {
    // Add user message
    addMessage('user', option);
    
    // Process option
    processOption(option);
  };

  // Process option selected by user
  const processOption = (option: string) => {
    setLoading(true);
    
    setTimeout(() => {
      switch (option.toLowerCase()) {
        case 'particulier':
          // Update form data
          updateFormData({ clientType: 'individual' });
          onClientTypeSubmit({ clientType: 'individual' });
          
          // Ask about project type
          addMessage('assistant', "Excellent ! Quel type de projet souhaitez-vous estimer ?", [
            "Construction neuve", 
            "Rénovation", 
            "Extension",
            "Design d'intérieur"
          ]);
          break;
          
        case 'professionnel':
          // Update form data
          updateFormData({ clientType: 'professional' });
          onClientTypeSubmit({ clientType: 'professional' });
          
          // Ask about company details
          addMessage('assistant', "Parfait ! Pour mieux vous accompagner, pourriez-vous m'indiquer votre secteur d'activité ?", [
            "Architecture", 
            "Construction", 
            "Immobilier",
            "Autre"
          ]);
          break;
          
        case 'construction neuve':
          updateFormData({ projectType: 'construction' });
          addMessage('assistant', "Une construction neuve ! Quelle surface approximative prévoyez-vous en m² ?");
          break;
          
        case 'rénovation':
          updateFormData({ projectType: 'renovation' });
          addMessage('assistant', "Un projet de rénovation ! Quelle surface approximative concerne votre projet en m² ?");
          break;
          
        case 'extension':
          updateFormData({ projectType: 'extension' });
          addMessage('assistant', "Une extension de bâtiment ! Quelle surface additionnelle en m² envisagez-vous ?");
          break;
          
        case 'design d\'intérieur':
          updateFormData({ projectType: 'design' });
          addMessage('assistant', "Un projet de design d'intérieur ! Quelle surface approximative souhaitez-vous réaménager en m² ?");
          break;
          
        case 'architecture':
        case 'construction':
        case 'immobilier':
        case 'autre':
          updateFormData({ professionalSector: option.toLowerCase() });
          addMessage('assistant', "Merci pour cette information. Pourriez-vous me décrire brièvement votre projet afin que je puisse vous orienter vers le formulaire le plus adapté ?");
          break;
          
        default:
          if (/^\d+\s*m²/.test(option) || /^\d+$/.test(option)) {
            // Extract surface value
            const surfaceMatch = option.match(/(\d+)/);
            if (surfaceMatch && surfaceMatch[1]) {
              const surface = parseInt(surfaceMatch[1]);
              updateFormData({ surface });
              
              // Ask about location
              addMessage('assistant', `Merci ! Votre projet concerne donc une surface de ${surface} m². Dans quelle ville ou région se situe votre projet ?`);
            }
          } else if (option.toLowerCase().includes('marseille') || 
                    option.toLowerCase().includes('nice') ||
                    option.toLowerCase().includes('toulon') ||
                    option.toLowerCase().includes('aix') ||
                    option.toLowerCase().includes('paca') ||
                    option.toLowerCase().includes('provence')) {
            
            // Update location
            updateFormData({ location: option, city: option });
            
            // Provide estimation options
            addMessage('assistant', `Parfait ! Nous connaissons bien la région ${option}. Souhaitez-vous une estimation rapide ou détaillée ?`, [
              "Estimation rapide (2 min)",
              "Estimation détaillée (5-10 min)"
            ]);
          } else if (option.toLowerCase().includes('rapide')) {
            updateFormData({ estimationType: 'quick' });
            
            // Suggest to go to the structured form
            addMessage('assistant', "Pour une estimation rapide, je vous propose d'utiliser notre formulaire structuré. Vous pouvez y accéder en cliquant sur l'onglet 'Formulaire détaillé' ci-dessus. Voulez-vous que je vous y dirige ?", [
              "Oui, utiliser le formulaire",
              "Non, continuer la conversation"
            ]);
          } else if (option.toLowerCase().includes('détaillée')) {
            updateFormData({ estimationType: 'detailed' });
            
            // Inform about structured form
            addMessage('assistant', "Pour une estimation détaillée, notre formulaire structuré sera idéal. Il vous permettra de préciser tous les aspects de votre projet. Souhaitez-vous y accéder maintenant ?", [
              "Oui, utiliser le formulaire",
              "Non, continuer la conversation"
            ]);
          } else if (option.toLowerCase().includes('oui, utiliser le formulaire')) {
            // Suggest switching to structured form tab
            addMessage('system', "Veuillez cliquer sur l'onglet 'Formulaire détaillé' ci-dessus pour accéder à l'estimation structurée.");
            
            // Show toast to guide user
            toast({
              title: "Formulaire structuré recommandé",
              description: "Pour obtenir une estimation plus précise, utilisez notre formulaire détaillé.",
              duration: 5000,
            });
          } else if (option.toLowerCase().includes('non, continuer')) {
            // Continue conversation
            addMessage('assistant', "D'accord, continuons notre conversation. Pourriez-vous me donner plus de détails sur votre projet ? Par exemple, s'agit-il d'une maison individuelle, d'un appartement, ou d'un local commercial ?");
          } else {
            // Process free text input
            processUserMessage(option);
          }
      }
      
      setLoading(false);
    }, 1000); // Simulate delay
  };

  // Process free text user message
  const processUserMessage = (message: string) => {
    // Extract form data from message
    const extractedData = extractFormDataFromMessage(message);
    
    // If data was extracted, update form data
    if (Object.keys(extractedData).length > 0) {
      updateFormData(extractedData);
      
      // Generate appropriate response based on extracted data
      if (extractedData.projectType) {
        addMessage('assistant', `J'ai compris que votre projet concerne une ${extractedData.projectType}. Pouvez-vous m'indiquer la surface approximative en m² ?`);
      } else if (extractedData.surface) {
        addMessage('assistant', `J'ai noté une surface de ${extractedData.surface} m². Dans quelle ville ou région se situe votre projet ?`);
      } else if (extractedData.budget) {
        addMessage('assistant', `Votre budget est donc d'environ ${extractedData.budget} €. Pour obtenir une estimation précise, je vous recommande de compléter le formulaire détaillé.`, [
          "Utiliser le formulaire détaillé",
          "Continuer la conversation"
        ]);
      } else {
        suggestStructuredForm();
      }
    } else {
      // If no data was extracted, suggest using structured form
      suggestStructuredForm();
    }
  };

  // Add message to the chat
  const addMessage = (type: 'user' | 'assistant' | 'system', content: string, options?: string[]) => {
    const newMessage: Message = {
      id: uuidv4(),
      type,
      content,
      options
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  // Suggest structured form
  const suggestStructuredForm = () => {
    addMessage('assistant', "Pour obtenir une estimation précise de votre projet, je vous recommande d'utiliser notre formulaire structuré. Cela vous permettra de fournir toutes les informations nécessaires à une estimation détaillée. Souhaitez-vous y accéder ?", [
      "Oui, utiliser le formulaire",
      "Non, continuer la conversation"
    ]);
  };

  // Handle send message
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    // Add user message
    addMessage('user', userInput);
    
    // Process message
    onUserInput(userInput);
    processOption(userInput);
    
    // Clear input
    setUserInput('');
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-0">
        <MessageDisplay 
          messages={messages}
          loading={loading}
          onOptionClick={handleOptionClick}
          messagesEndRef={messagesEndRef}
          message="" // To satisfy TypeScript - this prop isn't used
        />
        <InputArea 
          userInput={userInput}
          setUserInput={setUserInput}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
        />
      </CardContent>
    </Card>
  );
};

export default ConversationalEstimator;
