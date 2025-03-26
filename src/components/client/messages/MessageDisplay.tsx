
import React, { useRef, useEffect } from 'react';
import { Send, WifiOff, CircleDot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConversationType, MessageType } from '@/types/messaging';
import { User } from '@supabase/supabase-js';

interface MessageDisplayProps {
  conversation: ConversationType;
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  user: User | null;
}

const MessageDisplay = ({ 
  conversation, 
  newMessage, 
  setNewMessage, 
  onSendMessage,
  user 
}: MessageDisplayProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Récupérer l'email ou le nom d'utilisateur pour l'affichage de l'avatar
  const userInitial = user?.email ? user.email[0].toUpperCase() : 'C';
  // Récupérer l'URL de l'avatar s'il existe dans les métadonnées de l'utilisateur
  const avatarUrl = user?.user_metadata?.avatar_url || null;
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <div className="relative">
            <Avatar className="h-8 w-8">
              <AvatarImage src={conversation.contact.avatar} />
              <AvatarFallback className="bg-khaki-200 text-khaki-700">
                {conversation.contact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {/* Indicateur de statut */}
            <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
              conversation.contact.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
            }`}></div>
          </div>
          <div className="ml-3">
            <div className="font-medium">{conversation.contact.name}</div>
            <div className="text-xs text-gray-500 flex items-center">
              {conversation.contact.role}
              <span className="ml-2 flex items-center">
                {conversation.contact.status === 'online' ? (
                  <>
                    <CircleDot className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-600">En ligne</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="text-gray-500">Hors ligne</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {conversation.messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender !== 'me' && (
              <Avatar className="h-8 w-8 mt-1 mr-2">
                <AvatarImage src={conversation.contact.avatar} />
                <AvatarFallback className="bg-khaki-200 text-khaki-700">
                  {conversation.contact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
              message.sender === 'me' 
                ? 'bg-khaki-600 text-white' 
                : 'bg-white border border-gray-200'
            }`}>
              <div className="text-sm">{message.text}</div>
              <div className={`text-xs mt-1 ${
                message.sender === 'me' ? 'text-khaki-100' : 'text-gray-500'
              }`}>
                {message.date}
              </div>
            </div>
            {message.sender === 'me' && (
              <Avatar className="h-8 w-8 mt-1 ml-2">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="bg-blue-200 text-blue-700">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={onSendMessage} className="flex space-x-2">
          <Textarea 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="resize-none h-10 py-2"
          />
          <Button type="submit" className="h-10 px-3 bg-khaki-600 hover:bg-khaki-700">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MessageDisplay;
