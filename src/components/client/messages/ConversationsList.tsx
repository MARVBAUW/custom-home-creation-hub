
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConversationType } from '@/types/messaging';

interface ConversationsListProps {
  conversations: ConversationType[];
  activeConversationId: number;
  onSelectConversation: (conversation: ConversationType) => void;
}

const ConversationsList = ({ 
  conversations, 
  activeConversationId, 
  onSelectConversation 
}: ConversationsListProps) => {
  return (
    <div className="md:col-span-1 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 className="font-medium">Conversations</h2>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="overflow-y-auto h-[calc(600px-60px)]">
        {conversations.map((conv) => (
          <div 
            key={conv.id}
            className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
              activeConversationId === conv.id ? 'bg-khaki-50' : ''
            }`}
            onClick={() => onSelectConversation(conv)}
          >
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src={conv.contact.avatar} />
                <AvatarFallback className="bg-khaki-200 text-khaki-700">
                  {conv.contact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <div className="font-medium">{conv.contact.name}</div>
                <div className="text-xs text-gray-500">{conv.contact.role}</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600 truncate">
              {conv.messages[conv.messages.length - 1].text}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {conv.messages[conv.messages.length - 1].date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationsList;
