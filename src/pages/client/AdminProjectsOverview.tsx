
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import AdminSwitch from '@/components/client/AdminSwitch';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useClientAuth } from '@/hooks/useClientAuth';
import ProjectsGanttView from '@/components/admin/ProjectsGanttView';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Link } from 'react-router-dom';
import { Calendar, List, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminProjectsOverview = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(true);
  const { toast } = useToast();

  // Persister le mode admin dans localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('adminMode');
    if (savedMode === 'false') {
      setIsAdminMode(false);
    } else {
      // Par défaut, on active le mode admin sur cette page
      localStorage.setItem('adminMode', 'true');
    }
  }, []);

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

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Vue d'ensemble des projets | Progineer</title>
        <meta name="description" content="Visualisez tous les projets en cours dans une vue planning Gantt." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
                Administration
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                Vue d'ensemble des projets
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Visualisez et gérez tous les projets en cours dans une vue planning.
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
            <div className="lg:col-span-3">
              <Tabs defaultValue="gantt" className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-1">
                    <TabsTrigger value="gantt" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
                      <Calendar className="h-4 w-4 mr-2" />
                      Vue planning
                    </TabsTrigger>
                    <TabsTrigger value="list" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
                      <List className="h-4 w-4 mr-2" />
                      Liste des projets
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative w-60">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Rechercher un projet..."
                        className="pl-9 bg-white dark:bg-gray-800"
                      />
                    </div>
                    <Button 
                      className="bg-khaki-600 hover:bg-khaki-700 text-white"
                      onClick={() => window.location.href = '/workspace/client-area/admin/projects'}
                    >
                      Nouveau projet
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="gantt" className="space-y-6">
                  <ProjectsGanttView />
                </TabsContent>
                
                <TabsContent value="list" className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Liste des projets</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">Cette vue est en cours de développement.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-medium text-khaki-700 dark:text-khaki-300">Projet {i + 1}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Dossier #{10000 + i}</p>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">En cours</span>
                              <Link 
                                to={`/workspace/client-area/projects/${i + 1}`}
                                className="text-xs text-khaki-600 dark:text-khaki-400 hover:underline"
                              >
                                Voir les détails
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AdminProjectsOverview;
