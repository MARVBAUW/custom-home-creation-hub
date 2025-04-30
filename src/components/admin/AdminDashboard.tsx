
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Building2, Users, FileText, BarChart3, CalendarRange, FileCheck, AlertTriangle, CheckCheck, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ProjectsGanttView from './ProjectsGanttView';
import AdminStatistics from './AdminStatistics';
import AdminDocuments from './AdminDocuments';
import AdminClients from './AdminClients';
import AdminProjects from './AdminProjects';
import AdminTasks from './AdminTasks';
import ArticleGenerationManager from './ArticleGenerationManager';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [statistics, setStatistics] = useState({
    clients: 0,
    projects: 0,
    pendingTasks: 0,
    documents: 0,
    articles: 0
  });
  
  // Fetch statistics
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // In a real implementation, this would fetch data from Supabase
        // For now, we'll use simulated data with the addition of articles count
        const { data: articlesData, error: articlesError } = await supabase
          .from('articles')
          .select('count')
          .single();
          
        const articlesCount = articlesData?.count || 0;
        
        setStatistics({
          clients: 8,
          projects: 12,
          pendingTasks: 5,
          documents: 24,
          articles: articlesCount
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    
    fetchStatistics();
  }, []);
  
  const runBacklinksGeneration = async () => {
    try {
      toast({
        title: "Génération en cours",
        description: "Lancement de la génération de backlinks...",
      });
      
      const { data, error } = await supabase.functions.invoke('generate-backlinks');
      
      if (error) throw error;
      
      toast({
        title: "Génération terminée",
        description: data.message || "Backlinks générés avec succès",
      });
      
      console.log("Backlinks generation result:", data);
    } catch (error) {
      console.error("Error generating backlinks:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération des backlinks",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-khaki-100/70 to-khaki-50/70 p-6 rounded-xl border border-khaki-200/50 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <Badge variant="outline" className="bg-khaki-700 text-white border-none mb-2">
              Administration
            </Badge>
            <h1 className="text-2xl font-semibold mb-2">
              Tableau de bord administrateur
            </h1>
            <p className="text-gray-600 max-w-xl">
              Gérez vos projets, clients, documents et suivez les performances de votre entreprise.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button asChild variant="outline" className="border-khaki-200 hover:bg-khaki-50 text-gray-700">
              <Link to="/workspace/client-area/admin/create-project">
                <FileText className="mr-2 h-4 w-4" />
                Nouveau projet
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-khaki-200 hover:bg-khaki-50 text-gray-700">
              <Link to="/workspace/client-area/admin/clients/new">
                <Users className="mr-2 h-4 w-4" />
                Nouveau client
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Clients</p>
                <p className="text-2xl font-semibold mt-1">{statistics.clients}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-khaki-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-khaki-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Projets</p>
                <p className="text-2xl font-semibold mt-1">{statistics.projects}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Tâches en attente</p>
                <p className="text-2xl font-semibold mt-1">{statistics.pendingTasks}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Documents</p>
                <p className="text-2xl font-semibold mt-1">{statistics.documents}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <FileCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Articles</p>
                <p className="text-2xl font-semibold mt-1">{statistics.articles}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Newspaper className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Dashboard Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-7 gap-2">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Vue d'ensemble</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center">
            <Building2 className="mr-2 h-4 w-4" />
            <span>Projets</span>
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>Clients</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center">
            <CalendarRange className="mr-2 h-4 w-4" />
            <span>Planning</span>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center">
            <CheckCheck className="mr-2 h-4 w-4" />
            <span>Tâches</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>Documents</span>
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center">
            <Newspaper className="mr-2 h-4 w-4" />
            <span>Articles SEO</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Overview Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Projets récents</CardTitle>
                  <CardDescription>
                    Les 5 derniers projets créés ou mis à jour
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-khaki-50 border border-khaki-100 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Rénovation Appartement Paris</p>
                        <p className="text-sm text-gray-500">Mis à jour le 02/04/2023</p>
                      </div>
                      <Badge className="bg-khaki-500">En cours</Badge>
                    </div>
                    <div className="p-3 rounded-lg bg-khaki-50 border border-khaki-100 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Construction Maison Marseille</p>
                        <p className="text-sm text-gray-500">Mis à jour le 28/03/2023</p>
                      </div>
                      <Badge className="bg-blue-500">Planification</Badge>
                    </div>
                    <div className="p-3 rounded-lg bg-khaki-50 border border-khaki-100 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Extension Villa Nice</p>
                        <p className="text-sm text-gray-500">Mis à jour le 25/03/2023</p>
                      </div>
                      <Badge className="bg-green-500">Terminé</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button asChild variant="outline">
                    <Link to="/workspace/client-area/admin/projects">
                      Voir tous les projets
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                  <CardDescription>
                    Performance des projets et activités
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminStatistics />
                </CardContent>
              </Card>
            </div>
            
            {/* Overview Right Column */}
            <div className="space-y-6">
              {/* Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle>Tâches à venir</CardTitle>
                  <CardDescription>
                    Prochaines échéances et rendez-vous
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex items-start gap-3">
                      <div className="rounded-full bg-amber-100 p-1 mt-1">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">Visite chantier Marseille</p>
                        <p className="text-sm text-gray-500">Aujourd'hui à 14:00</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-khaki-50 border border-khaki-100 flex items-start gap-3">
                      <div className="rounded-full bg-khaki-100 p-1 mt-1">
                        <FileText className="h-4 w-4 text-khaki-600" />
                      </div>
                      <div>
                        <p className="font-medium">Remise rapport technique</p>
                        <p className="text-sm text-gray-500">Demain à 18:00</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 flex items-start gap-3">
                      <div className="rounded-full bg-blue-100 p-1 mt-1">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Réunion client M. Dupont</p>
                        <p className="text-sm text-gray-500">07/04/2023 à 10:30</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button asChild variant="outline">
                    <Link to="/workspace/client-area/admin/tasks">
                      Voir toutes les tâches
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                  <CardDescription>
                    Outils et fonctions fréquemment utilisés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Générer rapport mensuel
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={runBacklinksGeneration}
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Générer backlinks
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Importer contacts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="projects" className="mt-6">
          <AdminProjects />
        </TabsContent>
        
        <TabsContent value="clients" className="mt-6">
          <AdminClients />
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Planning Gantt des projets</CardTitle>
              <CardDescription>
                Visualisez l'ensemble de vos projets et leurs phases sur une vue chronologique
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectsGanttView />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-6">
          <AdminTasks />
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <AdminDocuments />
        </TabsContent>
        
        <TabsContent value="articles" className="mt-6">
          <ArticleGenerationManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
