
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import { useClientAuth } from '@/hooks/useClientAuth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, PlusCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const ClientMessages = () => {
  const { isLoaded, isSignedIn, user } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  
  // Mock data for conversations and messages
  const [conversations] = useState([
    {
      id: 1,
      name: 'Martin Dupont',
      role: 'Chef de projet',
      lastMessage: 'Bonjour, comment puis-je vous aider ?',
      time: '10:30',
      unread: 2,
      avatar: ''
    },
    {
      id: 2,
      name: 'Alice Bernard',
      role: 'Architecte',
      lastMessage: 'Les plans ont été mis à jour selon vos demandes.',
      time: 'Hier',
      unread: 0,
      avatar: ''
    },
    {
      id: 3,
      name: 'Support Progineer',
      role: 'Support',
      lastMessage: 'N\'hésitez pas si vous avez d\'autres questions.',
      time: 'Lun',
      unread: 0,
      avatar: ''
    }
  ]);
  
  const [messages] = useState([
    {
      id: 1,
      sender: 'Martin Dupont',
      content: 'Bonjour, comment puis-je vous aider concernant votre projet ?',
      time: '10:30',
      isMe: false
    },
    {
      id: 2,
      sender: 'Vous',
      content: 'Bonjour, j\'aimerais savoir où en est l\'avancement des travaux pour la semaine prochaine.',
      time: '10:32',
      isMe: true
    },
    {
      id: 3,
      sender: 'Martin Dupont',
      content: 'Nous avons terminé la phase de fondation et nous commencerons les murs la semaine prochaine. Tout se déroule selon le planning prévu.',
      time: '10:35',
      isMe: false
    },
    {
      id: 4,
      sender: 'Martin Dupont',
      content: 'Souhaitez-vous que je vous envoie le planning détaillé ?',
      time: '10:36',
      isMe: false
    }
  ]);
  
  // Check localStorage for admin mode
  React.useEffect(() => {
    const savedMode = localStorage.getItem('adminMode');
    if (savedMode === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here we would implement the send message logic
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
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
              <Card className="border-gray-200">
                <CardContent className="p-0">
                  <div className="flex h-[600px]">
                    {/* Conversations List */}
                    <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h2 className="font-semibold">Conversations</h2>
                        <Button variant="ghost" size="icon">
                          <PlusCircle className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="overflow-y-auto h-[calc(600px-64px)]">
                        {conversations.map((conversation) => (
                          <div 
                            key={conversation.id}
                            className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                          >
                            <div className="flex items-start space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={conversation.avatar} alt={conversation.name} />
                                <AvatarFallback className="bg-khaki-200 text-khaki-800">
                                  {conversation.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-medium truncate">{conversation.name}</h3>
                                  <span className="text-xs text-gray-500">{conversation.time}</span>
                                </div>
                                <p className="text-xs text-gray-500">{conversation.role}</p>
                                <p className="text-sm truncate">{conversation.lastMessage}</p>
                              </div>
                              {conversation.unread > 0 && (
                                <span className="inline-flex items-center justify-center w-5 h-5 bg-khaki-600 text-white text-xs rounded-full">
                                  {conversation.unread}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Messages */}
                    <div className="w-2/3 flex flex-col">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="" alt="Martin Dupont" />
                            <AvatarFallback className="bg-khaki-200 text-khaki-800">
                              MD
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">Martin Dupont</h3>
                            <p className="text-xs text-gray-500">Chef de projet</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                          <div 
                            key={message.id} 
                            className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[70%] rounded-lg p-3 ${
                                message.isMe 
                                  ? 'bg-khaki-600 text-white rounded-br-none' 
                                  : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'
                              }`}
                            >
                              <p>{message.content}</p>
                              <p className={`text-xs mt-1 ${message.isMe ? 'text-khaki-100' : 'text-gray-500'}`}>
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <form onSubmit={handleSendMessage} className="flex space-x-2">
                          <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Écrivez votre message..."
                            className="flex-1"
                          />
                          <Button 
                            type="submit" 
                            className="bg-khaki-600 hover:bg-khaki-700 text-white"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientMessages;
