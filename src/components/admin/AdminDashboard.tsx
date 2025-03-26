
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Bell, Settings, ChartGantt, FileText, RefreshCw } from 'lucide-react';
import BacklinksManager from './BacklinksManager';
import ProjectsGanttView from './ProjectsGanttView';
import { useAuth } from '@/hooks/useAuth';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord Administration</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Bienvenue, {user?.user_metadata?.full_name || 'Administrateur'}. Voici un aperçu de votre activité.
          </p>
        </div>
      </div>
      
      {/* Planning Gantt - Composant principal et le plus important */}
      <Card className="border-khaki-200 shadow-md">
        <CardHeader className="bg-khaki-50 dark:bg-khaki-900/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-khaki-800 dark:text-khaki-200">Planning des projets</CardTitle>
              <CardDescription>Vue d'ensemble de tous vos projets en cours</CardDescription>
            </div>
            <ChartGantt className="h-6 w-6 text-khaki-600" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ProjectsGanttView />
        </CardContent>
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
                {/* Ici, ajoutez d'autres paramètres */}
                <p className="text-sm text-gray-500">Les paramètres avancés sont disponibles dans cette section.</p>
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
                <p className="text-sm text-gray-500">
                  Les notifications des formulaires client et des événements système apparaîtront ici.
                </p>
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
                  <button className="flex items-center text-sm text-khaki-600 hover:text-khaki-800">
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Actualiser les backlinks
                  </button>
                </div>
                <Separator className="my-4" />
                <p className="text-sm text-gray-500">
                  La liste des articles apparaîtra ici. Les backlinks sont générés automatiquement en arrière-plan.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
