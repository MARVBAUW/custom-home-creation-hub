
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import AdminSwitch from '@/components/client/AdminSwitch';
import { useToast } from '@/hooks/use-toast';
import { useClientAuth } from '@/hooks/useClientAuth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Bell, Mail, Check, AlertTriangle, Info, Calendar, Clock, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminNotifications = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(true);
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  // Handle admin mode toggle
  const handleAdminModeToggle = (checked: boolean) => {
    setIsAdminMode(checked);
    localStorage.setItem('adminMode', checked.toString());
    toast({
      title: checked ? "Mode administrateur activé" : "Mode client activé",
      description: checked 
        ? "Vous pouvez maintenant gérer les dossiers et les clients." 
        : "Vous voyez maintenant l'interface client standard.",
    });
  };

  // Mock data for notifications
  const notifications = [
    {
      id: '1',
      title: 'Nouveau client inscrit',
      message: 'Jean Dupont vient de s\'inscrire sur la plateforme.',
      date: '2023-10-15T10:30:00.000Z',
      type: 'client',
      status: 'unread'
    },
    {
      id: '2',
      title: 'Mise à jour de projet',
      message: 'Le projet "Villa Méditerranée" est passé à l\'étape de conception.',
      date: '2023-10-14T14:45:00.000Z',
      type: 'project',
      status: 'read'
    },
    {
      id: '3',
      title: 'Échéance de paiement',
      message: 'Une échéance de paiement arrive dans 7 jours pour le projet "Extension maison".',
      date: '2023-10-12T09:15:00.000Z',
      type: 'payment',
      status: 'unread'
    },
    {
      id: '4',
      title: 'Document ajouté',
      message: 'Un nouveau document a été ajouté au projet "Appartement Paris".',
      date: '2023-10-10T16:20:00.000Z',
      type: 'document',
      status: 'read'
    }
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'client':
        return <User className="h-5 w-5 text-blue-600" />;
      case 'project':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'payment':
        return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'document':
        return <FileText className="h-5 w-5 text-purple-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  // Mark all as read
  const markAllAsRead = () => {
    toast({
      title: "Toutes les notifications ont été marquées comme lues",
      description: "Votre centre de notifications a été mis à jour.",
    });
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Centre de notifications | Progineer</title>
        <meta name="description" content="Gérez toutes les notifications de l'application." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
                Administration
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                Centre de notifications
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Gérez et configurez les notifications du système.
              </p>
            </div>
            
            {/* Admin Switch */}
            <div className="md:mt-0 mt-4 flex items-center gap-3">
              <AdminSwitch isAdminMode={isAdminMode} onToggle={handleAdminModeToggle} />
              <ThemeToggle />
            </div>
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
            <div className="lg:col-span-3 space-y-6">
              <Tabs defaultValue="all">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="all">Toutes</TabsTrigger>
                    <TabsTrigger value="unread">Non lues</TabsTrigger>
                    <TabsTrigger value="settings">Paramètres</TabsTrigger>
                  </TabsList>
                  
                  <Button variant="outline" onClick={markAllAsRead}>
                    <Check className="h-4 w-4 mr-2" />
                    Tout marquer comme lu
                  </Button>
                </div>

                <TabsContent value="all" className="mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Toutes les notifications</CardTitle>
                      <CardDescription>Listez et gérez toutes vos notifications.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="divide-y">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`py-4 ${notification.status === 'unread' ? 'bg-khaki-50' : ''}`}
                          >
                            <div className="flex items-start">
                              <div className="mr-3 mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <h3 className={`font-medium ${notification.status === 'unread' ? 'text-khaki-900' : 'text-gray-700'}`}>
                                    {notification.title}
                                  </h3>
                                  {notification.status === 'unread' && (
                                    <Badge className="bg-khaki-100 text-khaki-800 border-khaki-200">
                                      Nouveau
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <div className="flex items-center text-xs text-gray-500 mt-2">
                                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                                  {formatDate(notification.date)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="unread" className="mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Notifications non lues</CardTitle>
                      <CardDescription>Consultez vos notifications non lues.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="divide-y">
                        {notifications.filter(n => n.status === 'unread').map((notification) => (
                          <div 
                            key={notification.id} 
                            className="py-4 bg-khaki-50"
                          >
                            <div className="flex items-start">
                              <div className="mr-3 mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-medium text-khaki-900">
                                    {notification.title}
                                  </h3>
                                  <Badge className="bg-khaki-100 text-khaki-800 border-khaki-200">
                                    Nouveau
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <div className="flex items-center text-xs text-gray-500 mt-2">
                                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                                  {formatDate(notification.date)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Paramètres de notification</CardTitle>
                      <CardDescription>Configurez vos préférences de notification.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-medium">Canaux de notification</h3>
                        
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-5 w-5 text-gray-500" />
                            <div>
                              <Label htmlFor="email-notifications" className="font-medium">Notifications par e-mail</Label>
                              <p className="text-sm text-gray-500">Recevoir des notifications par e-mail</p>
                            </div>
                          </div>
                          <Switch 
                            id="email-notifications" 
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center space-x-3">
                            <Bell className="h-5 w-5 text-gray-500" />
                            <div>
                              <Label htmlFor="push-notifications" className="font-medium">Notifications push</Label>
                              <p className="text-sm text-gray-500">Recevoir des notifications dans l'application</p>
                            </div>
                          </div>
                          <Switch 
                            id="push-notifications" 
                            checked={pushNotifications}
                            onCheckedChange={setPushNotifications}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Types de notification</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="border-gray-200">
                            <CardHeader className="pb-2">
                              <div className="flex items-center">
                                <User className="h-5 w-5 mr-2 text-blue-600" />
                                <CardTitle className="text-base">Clients</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0 pb-4 text-sm">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor="client-register">Nouvelles inscriptions</Label>
                                  <Switch id="client-register" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                  <Label htmlFor="client-project">Nouveaux projets</Label>
                                  <Switch id="client-project" defaultChecked />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-gray-200">
                            <CardHeader className="pb-2">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 mr-2 text-green-600" />
                                <CardTitle className="text-base">Projets</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0 pb-4 text-sm">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor="project-update">Mises à jour</Label>
                                  <Switch id="project-update" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                  <Label htmlFor="project-phase">Changements de phase</Label>
                                  <Switch id="project-phase" defaultChecked />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="default" className="bg-khaki-600 hover:bg-khaki-700">
                          Enregistrer les paramètres
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AdminNotifications;
