
import React from 'react';
import { Helmet } from 'react-helmet';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  MessageSquare, 
  User, 
  Send,
  Plus
} from 'lucide-react';
import Container from '@/components/common/Container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

// Sample messages data
const conversations = [
  {
    id: 1,
    contact: { name: 'Marie Dupont', role: 'Chef de projet', avatar: '' },
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
    contact: { name: 'Alexandre Martin', role: 'Architecte', avatar: '' },
    messages: [
      { id: 1, text: 'Bonjour, j\'ai terminé les plans modifiés suite à notre dernière discussion.', sender: 'them', date: '05/06/2023 14:22' },
      { id: 2, text: 'Ils sont disponibles dans votre espace documents. Merci de me faire part de vos retours.', sender: 'them', date: '05/06/2023 14:23' },
    ]
  },
];

const ClientMessages = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [activeConversation, setActiveConversation] = React.useState(conversations[0]);
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  React.useEffect(() => {
    scrollToBottom();
  }, [activeConversation]);
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/workspace/sign-in');
    }
  }, [isLoaded, isSignedIn, navigate]);

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
              sender: 'me',
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
    const updatedActiveConv = updatedConversations.find(c => c.id === activeConversation.id);
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
        conversations[idx] = updatedActiveConv!;
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
                Espace Client
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Messages
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                Échangez avec vos interlocuteurs projet.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="font-medium">Navigation</h2>
                </div>
                <div className="p-2">
                  <Link to="/workspace/client-area" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
                    <User className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Tableau de bord</span>
                  </Link>
                  <Link to="/workspace/client-area/documents" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
                    <FileText className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Documents</span>
                  </Link>
                  <Link to="/workspace/client-area/projects" className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-50">
                    <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Suivi de projet</span>
                  </Link>
                  <Link to="/workspace/client-area/messages" className="flex items-center p-3 rounded-md bg-khaki-50 text-khaki-800 font-medium">
                    <MessageSquare className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Messages</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
                {/* Conversations List */}
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
                          activeConversation.id === conv.id ? 'bg-khaki-50' : ''
                        }`}
                        onClick={() => setActiveConversation(conv)}
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
                
                {/* Messages */}
                <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activeConversation.contact.avatar} />
                        <AvatarFallback className="bg-khaki-200 text-khaki-700">
                          {activeConversation.contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <div className="font-medium">{activeConversation.contact.name}</div>
                        <div className="text-xs text-gray-500">{activeConversation.contact.role}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                    {activeConversation.messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`mb-4 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.sender !== 'me' && (
                          <Avatar className="h-8 w-8 mt-1 mr-2">
                            <AvatarImage src={activeConversation.contact.avatar} />
                            <AvatarFallback className="bg-khaki-200 text-khaki-700">
                              {activeConversation.contact.name.split(' ').map(n => n[0]).join('')}
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
                            <AvatarImage src={user?.imageUrl} />
                            <AvatarFallback className="bg-blue-200 text-blue-700">
                              {user?.firstName?.[0] || 'C'}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
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
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientMessages;
