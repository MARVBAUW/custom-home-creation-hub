
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import { toast } from '@/hooks/use-toast';
import { useClientAuth } from '@/hooks/useClientAuth';
import ClientNavigation from '@/components/client/ClientNavigation';
import ConversationsList from '@/components/client/messages/ConversationsList';
import MessageDisplay from '@/components/client/messages/MessageDisplay';
import { ConversationType, MessageType } from '@/types/messaging';
import AdminSwitch from '@/components/client/AdminSwitch';

// Sample messages data
const conversations: ConversationType[] = [
  {
    id: 1,
    contact: { 
      name: 'Marie Dupont', 
      role: 'Chef de projet', 
      avatar: '',
      status: 'online'
    },
    messages: [
      { id: 1, text: 'Bonjour, je suis votre chef de projet attitré pour la construction de votre maison. N\'hésitez pas à me poser vos questions !', sender: 'them', date: '10/06/2023 09:32' },
      { id: 2, text: 'Bonjour Marie, merci pour votre message. Pouvez-vous me dire quand est prévue la prochaine réunion de chantier ?', sender: 'me', date: '10/06/2023 10:15' },
      { id: 3, text: 'Bien sûr ! La prochaine réunion de chantier est prévue le 15 juillet à 10h directement sur le site.', sender: 'them', date: '10/06/2023 10:22' },
      { id: 4, text: 'Je vous ai également déposé le compte-rendu de la dernière réunion dans la section Documents.', sender: 'them', date: '10/06/2023 10:23' },
      { id: 5, text: 'Parfait, merci beaucoup. Je l\'ai bien reçu et j\'y serai présent.', sender: 'me', date: '10/06/2023 11:05' },
    ]
  },
  {
    id: 2,
    contact: { 
      name: 'Alexandre Martin', 
      role: 'Architecte', 
      avatar: '',
      status: 'offline'
    },
    messages: [
      { id: 1, text: 'Bonjour, j\'ai terminé les plans modifiés suite à notre dernière discussion.', sender: 'them', date: '05/06/2023 14:22' },
      { id: 2, text: 'Ils sont disponibles dans votre espace documents. Merci de me faire part de vos retours.', sender: 'them', date: '05/06/2023 14:23' },
    ]
  },
];

const ClientMessages = () => {
  const { isLoaded, isSignedIn, user } = useClientAuth({ redirectIfUnauthenticated: true });
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // Handle admin mode toggle
  const handleAdminModeToggle = (checked: boolean) => {
    setIsAdminMode(checked);
    toast({
      title: checked ? "Mode administrateur activé" : "Mode client activé",
      description: checked 
        ? "Vous pouvez maintenant gérer les dossiers et les clients." 
        : "Vous voyez maintenant l'interface client standard.",
    });
  };
  
  // Handle send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // In a real app, this would send a message to the server
    // For demo purposes, we'll just add it to the local state
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            {
              id: conv.messages.length + 1,
              text: newMessage,
              sender: 'me' as const, // Explicitly type as 'me'
              date: new Date().toLocaleString('fr-FR', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            }
          ]
        };
      }
      return conv;
    });
    
    // Set the active conversation to the updated one
    const updatedActiveConv = updatedConversations.find(c => c.id === activeConversation.id) as ConversationType;
    if (updatedActiveConv) {
      setActiveConversation(updatedActiveConv);
    }
    
    // Reset the new message input
    setNewMessage('');
    
    // Show success toast
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès.",
    });
    
    // Update the global conversations array (in a real app, this would be handled by a state management system)
    conversations.forEach((conv, idx) => {
      if (conv.id === activeConversation.id) {
        conversations[idx] = updatedActiveConv;
      }
    });
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
        <meta name="description" content="Communiquez avec votre équipe projet Progineer." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
                {isAdminMode ? 'Administration' : 'Espace Client'}
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                {isAdminMode ? 'Gestion des messages' : 'Messages'}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                {isAdminMode 
                  ? 'Gérez les conversations avec vos clients et collaborateurs.' 
                  : 'Échangez avec vos interlocuteurs projet.'}
              </p>
            </div>
            
            {/* Admin Switch */}
            <AdminSwitch isAdminMode={isAdminMode} onToggle={handleAdminModeToggle} />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <ClientNavigation isAdminMode={isAdminMode} />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {isAdminMode ? (
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Panneau d'administration</h2>
                  <p className="text-gray-600 mb-4">
                    Cette interface vous permet de gérer les dossiers clients, les planifications, et les communications.
                  </p>
                  <div className="p-6 bg-red-50 border border-red-100 rounded-lg">
                    <p className="text-sm text-red-700">
                      Le mode administrateur est activé. Vous voyez maintenant l'interface de gestion complète.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
                  {/* Conversations List */}
                  <ConversationsList 
                    conversations={conversations} 
                    activeConversationId={activeConversation.id}
                    onSelectConversation={setActiveConversation}
                  />
                  
                  {/* Messages */}
                  <MessageDisplay 
                    conversation={activeConversation}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    onSendMessage={handleSendMessage}
                    user={user}
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientMessages;
