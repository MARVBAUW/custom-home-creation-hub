import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Send, Loader2 } from 'lucide-react';
import { MessageDisplay } from './components/conversational';
import { ConversationalProps, Message } from './types/conversationalTypes';

const ConversationalEstimator: React.FC<ConversationalProps> = ({
  onUserInput,
  formData,
  updateFormData,
  onClientTypeSubmit,
  goToStep
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  useEffect(() => {
    addAssistantMessage("Bienvenue ! Je suis votre assistant virtuel pour estimer votre projet. Quel type de client êtes-vous ?");
    addAssistantOptions(['Particulier', 'Professionnel']);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    setLoading(true);

    // Simulate API call based on the option clicked
    setTimeout(() => {
      setLoading(false);
      if (messages.length === 1) {
        addAssistantMessage(`Parfait ! Vous êtes un ${option}. Quel type de projet souhaitez-vous estimer ?`);
        addAssistantOptions(['Construction', 'Rénovation']);
        onClientTypeSubmit({ clientType: option.toLowerCase() });
      } else if (messages.length === 3) {
        addAssistantMessage(`Très bien ! Un projet de ${option}. Quelle est la surface en m² ?`);
        updateFormData({ projectType: option.toLowerCase() });
        goToStep(2);
      } else {
        addAssistantMessage("Merci ! Veuillez entrer les détails de votre projet.");
      }
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    addUserMessage(message);
    setLoading(true);
    onUserInput(message);

    // Simulate API response
    setTimeout(() => {
      setLoading(false);
      if (messages.length === 2) {
        addAssistantMessage(`Super, ${message} m². Où se situe le projet ?`);
        updateFormData({ surface: message });
        goToStep(3);
      } else {
        addAssistantMessage("Merci ! Veuillez entrer les détails de votre projet.");
      }
      setMessage('');
    }, 1000);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessage('');
  };

  const addAssistantMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: content
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const addAssistantOptions = (options: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: "Choisissez une option:",
      options: options
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow p-4 overflow-y-auto">
        <MessageDisplay
          messages={messages}
          loading={loading}
          onOptionClick={handleOptionClick}
          messagesEndRef={messagesEndRef}
        />
      </div>

      <div className="bg-gray-100 p-4">
        <form onSubmit={handleSubmit} className="relative">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Entrez votre message..."
            className="pr-12"
            ref={inputRef}
          />
          <Button
            type="submit"
            className="absolute right-1.5 top-1.5 rounded-full"
            aria-label="Envoyer"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConversationalEstimator;
