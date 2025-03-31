
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { User, Bot, Send } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import { Message, ConversationalProps } from './types';

const ConversationalEstimator: React.FC<ConversationalProps> = ({
  onUserInput,
  formData,
  updateFormData,
  onClientTypeSubmit,
  goToStep
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      type: 'system',
      content: 'Bonjour ! Je suis votre assistant d\'estimation Progineer. Comment puis-je vous aider avec votre projet de construction ou rénovation ?',
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      type: 'user',
      content: userInput
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Process the message
    processMessage(userInput);
    
    // Clear input
    setUserInput('');
  };

  // Process the message and generate a response
  const processMessage = (input: string) => {
    onUserInput(input);
    
    // Add typing indicator
    setMessages(prev => [...prev, {
      id: uuidv4(),
      type: 'loading',
      content: ''
    }]);
    
    // Basic text-based analysis for demo purposes
    const lowerInput = input.toLowerCase();
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Remove loading message
      setMessages(prev => prev.filter(m => m.type !== 'loading'));
      
      let responseText = '';
      let responseOptions: string[] = [];
      let dataToUpdate: Partial<FormData> = {};
      
      // Very basic intent detection
      if (lowerInput.includes("particulier")) {
        dataToUpdate = { clientType: 'individual' };
        responseText = "Très bien ! Vous êtes un particulier. De quel type de projet s'agit-il ?";
        responseOptions = ["Construction neuve", "Rénovation", "Extension"];
        onClientTypeSubmit({ clientType: 'individual' });
      }
      else if (lowerInput.includes("professionnel") || lowerInput.includes("entreprise")) {
        dataToUpdate = { clientType: 'professional' };
        responseText = "Très bien ! Vous êtes un professionnel. De quel type de projet s'agit-il ?";
        responseOptions = ["Bureaux", "Commerce", "Industriel", "Résidentiel"];
        onClientTypeSubmit({ clientType: 'professional' });
      }
      else if (lowerInput.includes("construction") || lowerInput.includes("neuve") || lowerInput.includes("maison")) {
        dataToUpdate = { projectType: 'construction' };
        responseText = "Je comprends que vous souhaitez construire. Quelle surface approximative envisagez-vous ?";
      }
      else if (lowerInput.includes("rénovation") || lowerInput.includes("renovation")) {
        dataToUpdate = { projectType: 'renovation' };
        responseText = "Je comprends que vous souhaitez rénover. Quelle surface approximative est concernée ?";
      }
      else if (lowerInput.includes("extension") || lowerInput.includes("agrandissement")) {
        dataToUpdate = { projectType: 'extension' };
        responseText = "Je comprends que vous souhaitez faire une extension. Quelle surface supplémentaire envisagez-vous ?";
      }
      else if (lowerInput.match(/\d+\s*m²/) || lowerInput.match(/\d+\s*m2/)) {
        const matchedSurface = lowerInput.match(/(\d+)\s*m²/) || lowerInput.match(/(\d+)\s*m2/);
        if (matchedSurface && matchedSurface[1]) {
          const surface = parseInt(matchedSurface[1]);
          dataToUpdate = { surface };
          responseText = `Je note une surface de ${surface} m². Dans quelle ville se situe votre projet ?`;
        }
      }
      else if (lowerInput.match(/\d+\s*euro/) || lowerInput.match(/\d+\s*€/) || lowerInput.includes("budget")) {
        const matchedBudget = lowerInput.match(/(\d+)\s*euro/) || lowerInput.match(/(\d+)\s*€/) || lowerInput.match(/(\d+)\s*k/);
        if (matchedBudget && matchedBudget[1]) {
          let budget = parseInt(matchedBudget[1]);
          if (lowerInput.includes('k')) {
            budget *= 1000;
          }
          dataToUpdate = { budget };
          responseText = `Je note un budget d'environ ${budget.toLocaleString('fr-FR')} €. Pourriez-vous me laisser votre email pour vous envoyer une estimation plus détaillée ?`;
        }
      }
      else if (lowerInput.includes('@')) {
        const matchedEmail = lowerInput.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (matchedEmail) {
          dataToUpdate = { email: matchedEmail[0] };
          responseText = `Merci pour ces informations ! Je vais vous préparer une estimation pour votre projet. Vous pouvez également consulter notre formulaire détaillé pour une estimation encore plus précise.`;
          responseOptions = ["Consulter le formulaire détaillé", "Terminer l'estimation"];
        }
      }
      else {
        responseText = "Je ne suis pas sûr de comprendre. Pourriez-vous me préciser quel type de projet vous intéresse ? (construction, rénovation, extension...)";
      }
      
      // Add bot response
      const assistantMessage: Message = {
        id: uuidv4(),
        type: 'assistant',
        content: responseText,
        options: responseOptions.length > 0 ? responseOptions : undefined
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Update form data if needed
      if (Object.keys(dataToUpdate).length > 0) {
        updateFormData(dataToUpdate);
      }
    }, 1000);
  };

  // Handle option click
  const handleOptionClick = (option: string) => {
    setUserInput(option);
    handleSendMessage();
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type !== 'user' && message.type !== 'loading' && (
                <Avatar className="h-8 w-8 mr-2 bg-blue-500">
                  <Bot className="h-5 w-5 text-white" />
                </Avatar>
              )}
              
              <div
                className={`px-4 py-2 rounded-lg max-w-[80%] ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : message.type === 'loading'
                    ? 'bg-gray-200 animate-pulse'
                    : 'bg-gray-100'
                }`}
              >
                {message.type === 'loading' ? (
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                ) : (
                  <div>
                    {message.content.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < message.content.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
              
              {message.type === 'user' && (
                <Avatar className="h-8 w-8 ml-2 bg-gray-500">
                  <User className="h-5 w-5 text-white" />
                </Avatar>
              )}
            </div>
          ))}
          
          {/* Option buttons for guided interaction */}
          {messages[messages.length - 1]?.options && (
            <div className="flex flex-wrap gap-2 justify-start mt-2">
              {messages[messages.length - 1].options!.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-sm"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="mt-auto pt-4 border-t flex">
          <Input
            placeholder="Écrivez votre message ici..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="mr-2"
          />
          <Button onClick={handleSendMessage} disabled={!userInput.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationalEstimator;
