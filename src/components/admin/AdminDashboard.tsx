
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, ChartGantt, FileText, RefreshCw, Building, Users, Calendar } from 'lucide-react';
import BacklinksManager from './BacklinksManager';
import ProjectsGanttView from './ProjectsGanttView';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeProjects, setActiveProjects] = useState(3);
  const [pendingClients, setPendingClients] = useState(2);

  const handleRefreshBacklinks = async () => {
    toast({
      title: "Rafraîchissement des backlinks",
      description: "Les backlinks sont en cours de génération...",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord Administration</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Bienvenue, {user?.user_metadata?.full_name || 'Administrateur'}. Voici un aperçu de votre activité.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Badge className="ml-2 bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100">
            Mode Administrateur
          </Badge>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-khaki-100 dark:border-khaki-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Projets actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold text-khaki-700 dark:text-khaki-300">{activeProjects}</div>
              <Badge className="ml-3 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">En cours</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-khaki-100 dark:border-khaki-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Clients en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold text-khaki-700 dark:text-khaki-300">{pendingClients}</div>
              <Badge className="ml-3 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">À traiter</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-khaki-100 dark:border-khaki-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Prochaine échéance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-lg font-bold text-khaki-700 dark:text-khaki-300">15/08/2023</div>
              <Badge className="ml-3 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">5j restants</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-khaki-100 dark:border-khaki-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold text-khaki-700 dark:text-khaki-300">7</div>
              <Badge className="ml-3 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">Non lues</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Planning Gantt - Composant principal et le plus important */}
      <Card className="border-khaki-200 dark:border-khaki-800 shadow-md">
        <CardHeader className="bg-khaki-50 dark:bg-khaki-900/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-khaki-800 dark:text-khaki-200">Planning des projets</CardTitle>
              <CardDescription>Vue d'ensemble de tous vos projets en cours</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white dark:bg-gray-800"
                onClick={() => window.location.href = '/workspace/client-area/admin/projects'}
              >
                <Calendar className="h-4 w-4 mr-2 text-khaki-600" /> 
                Nouveau projet
              </Button>
              <ChartGantt className="h-6 w-6 text-khaki-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ProjectsGanttView />
        </CardContent>
        <CardFooter className="bg-khaki-50/50 dark:bg-khaki-900/10 p-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-khaki-600" />
            <span>Affichage sur 1 an à partir d'aujourd'hui</span>
          </div>
          <div className="ml-auto flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs bg-white dark:bg-gray-800"
              onClick={() => window.location.href = '/workspace/client-area/admin/planning'}
            >
              Voir tous les projets
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <Tabs defaultValue="parametres" className="space-y-6">
        <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-1">
          <TabsTrigger value="parametres" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="articles" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
            <FileText className="h-4 w-4 mr-2" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="clients" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
            <Users className="h-4 w-4 mr-2" />
            Clients
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="parametres" className="space-y-6">
          <BacklinksManager />
          
          {/* Autres paramètres administrateur */}
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du site</CardTitle>
              <CardDescription>Configurez les options globales du site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mode sombre</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Activer ou désactiver le mode sombre sur l'ensemble du site</p>
                  </div>
                  <ThemeToggle />
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifications automatiques</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Envoi d'emails automatiques aux clients</p>
                  </div>
                  <Button variant="outline">Configurer</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Centre de notifications</CardTitle>
              <CardDescription>Gérez toutes les notifications système</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Liste des notifications */}
                <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 font-medium">Récentes</div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <div className="flex items-start">
                        <Badge className="mt-0.5 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">Contact</Badge>
                        <div className="ml-3">
                          <p className="font-medium">Nouveau message de contact</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Jean Dupont souhaite être contacté au sujet d'un projet.</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Il y a 2 heures</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <div className="flex items-start">
                        <Badge className="mt-0.5 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">Estimation</Badge>
                        <div className="ml-3">
                          <p className="font-medium">Nouvelle demande d'estimation</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Marie Martin a complété le formulaire d'estimation.</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Il y a 1 jour</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <div className="flex items-start">
                        <Badge className="mt-0.5 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">Système</Badge>
                        <div className="ml-3">
                          <p className="font-medium">Backlinks générés avec succès</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">15 nouveaux backlinks ont été créés entre vos articles.</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Il y a 3 jours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Voir toutes les notifications</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="articles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des articles</CardTitle>
              <CardDescription>Gérer les articles de la veille réglementaire</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    className="flex items-center text-sm" 
                    onClick={handleRefreshBacklinks}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Actualiser les backlinks
                  </Button>
                </div>
                <Separator className="my-4" />
                
                {/* Liste des articles */}
                <div className="space-y-3">
                  <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 flex justify-between items-center">
                      <span className="font-medium">Articles récents</span>
                      <Button variant="outline" size="sm" className="text-xs h-8">Nouvel article</Button>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Nouvelles normes RT2020</h3>
                          <Badge>5 backlinks</Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Les nouvelles réglementations thermiques pour 2020
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Publié le 15/07/2023</p>
                      </div>
                      <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Évolutions des normes sismiques</h3>
                          <Badge>3 backlinks</Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Mise à jour des normes parasismiques en PACA
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Publié le 02/07/2023</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des clients</CardTitle>
              <CardDescription>Liste et statut de tous vos clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button 
                    className="flex items-center text-sm"
                    onClick={() => window.location.href = '/workspace/client-area/admin/clients'}
                  >
                    <Users className="h-3.5 w-3.5 mr-1" />
                    Ajouter un client
                  </Button>
                </div>
                <Separator className="my-4" />
                
                {/* Liste des clients */}
                <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 font-medium">Clients récents</div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Jean Dupont</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">jean.dupont@example.com</p>
                        </div>
                        <Badge className="bg-khaki-100 text-khaki-800 dark:bg-khaki-900/20 dark:text-khaki-300">
                          2 projets
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Marie Martin</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">marie.martin@example.com</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          Nouveau
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="mr-2">
                    <Building className="h-4 w-4 mr-2" />
                    Corps de métiers
                  </Button>
                  <Button>
                    Voir tous les clients
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
