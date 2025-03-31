
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import { useClientAuth } from '@/hooks/useClientAuth';
import Navbar from '@/components/layout/Navbar';
import { ConversationType } from '@/types/messaging';
import ConversationsList from '@/components/client/messages/ConversationsList';
import MessageDisplay from '@/components/client/messages/MessageDisplay';
import { ScrollArea } from '@/components/ui/scroll-area';

const ClientMessages = () => {
  const { isLoaded, isSignedIn, user } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [activeConversationId, setActiveConversationId] = useState(1); // Default to first conversation
  
  // Mock conversations data with updated structure
  const [conversations, setConversations] = useState<ConversationType[]>([
    {
      id: 1,
      contact: {
        name: 'Martin Dupont',
        role: 'Chef de projet',
        status: 'online',
        avatar: ''
      },
      messages: [
        {
          id: 1,
          sender: 'them',
          text: 'Bonjour, comment puis-je vous aider concernant votre projet ?',
          date: '10:30'
        },
        {
          id: 2,
          sender: 'me',
          text: 'Bonjour, j\'aimerais savoir où en est l\'avancement des travaux pour la semaine prochaine.',
          date: '10:32'
        },
        {
          id: 3,
          sender: 'them',
          text: 'Nous avons terminé la phase de fondation et nous commencerons les murs la semaine prochaine. Tout se déroule selon le planning prévu.',
          date: '10:35'
        },
        {
          id: 4,
          sender: 'them',
          text: 'Souhaitez-vous que je vous envoie le planning détaillé ?',
          date: '10:36'
        }
      ]
    },
    {
      id: 2,
      contact: {
        name: 'Alice Bernard',
        role: 'Architecte',
        status: 'offline',
        avatar: ''
      },
      messages: [
        {
          id: 1,
          sender: 'them',
          text: 'Les plans ont été mis à jour selon vos demandes.',
          date: 'Hier'
        }
      ]
    },
    {
      id: 3,
      contact: {
        name: 'Support Progineer',
        role: 'Support',
        status: 'online',
        avatar: ''
      },
      messages: [
        {
          id: 1,
          sender: 'them',
          text: 'N\'hésitez pas si vous avez d\'autres questions.',
          date: 'Lun'
        }
      ]
    }
  ]);
  
  // Find active conversation
  const activeConversation = conversations.find(conv => conv.id === activeConversationId) || conversations[0];
  
  // Check localStorage for admin mode
  useEffect(() => {
    const savedMode = localStorage.getItem('adminMode');
    if (savedMode === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMessageObj = {
        id: activeConversation.messages.length + 1,
        sender: 'me' as const,
        text: newMessage,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      // Update conversations with the new message
      setConversations(prevConversations => {
        return prevConversations.map(conv => {
          if (conv.id === activeConversationId) {
            return {
              ...conv,
              messages: [...conv.messages, newMessageObj]
            };
          }
          return conv;
        });
      });
      
      setNewMessage('');
    }
  };
  
  const handleSelectConversation = (conversation: ConversationType) => {
    setActiveConversationId(conversation.id);
  };

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Messages | Espace Client Progineer</title>
        <meta name="description" content="Communiquez avec l'équipe de projet Progineer." />
      </Helmet>

      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
              Messages
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
              Messagerie
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
              Communiquez avec l'équipe en charge de votre projet.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <ClientNavigation isAdminMode={isAdminMode} />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ConversationsList 
                  conversations={conversations}
                  activeConversationId={activeConversationId}
                  onSelectConversation={handleSelectConversation}
                />
                
                <MessageDisplay 
                  conversation={activeConversation}
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  onSendMessage={handleSendMessage}
                  user={user}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientMessages;
