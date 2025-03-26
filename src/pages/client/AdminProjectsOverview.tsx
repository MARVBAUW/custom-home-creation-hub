
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import AdminSwitch from '@/components/client/AdminSwitch';
import { toast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useClientAuth } from '@/hooks/useClientAuth';
import ProjectsGanttView from '@/components/admin/ProjectsGanttView';

const AdminProjectsOverview = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(true);

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

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
                Administration
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                Vue d'ensemble des projets
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                Visualisez et gérez tous les projets en cours dans une vue planning.
              </p>
            </div>
            
            {/* Admin Switch */}
            <div className="md:mt-0 mt-4">
              <AdminSwitch isAdminMode={isAdminMode} onToggle={handleAdminModeToggle} />
            </div>
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
              <Tabs defaultValue="gantt" className="space-y-6">
                <TabsList className="bg-white border border-gray-200 p-1">
                  <TabsTrigger value="gantt">Vue planning</TabsTrigger>
                  <TabsTrigger value="list">Liste des projets</TabsTrigger>
                </TabsList>
                
                <TabsContent value="gantt" className="space-y-6">
                  <div className="flex justify-end mb-4">
                    <Button 
                      className="bg-khaki-600 hover:bg-khaki-700 text-white"
                      onClick={() => window.location.href = '/workspace/client-area/admin/projects'}
                    >
                      Créer un nouveau projet
                    </Button>
                  </div>
                  <ProjectsGanttView />
                </TabsContent>
                
                <TabsContent value="list" className="space-y-6">
                  <div className="flex justify-end mb-4">
                    <Button 
                      className="bg-khaki-600 hover:bg-khaki-700 text-white"
                      onClick={() => window.location.href = '/workspace/client-area/admin/projects'}
                    >
                      Créer un nouveau projet
                    </Button>
                  </div>
                  <p className="text-center p-8 text-gray-500">Vue liste à venir</p>
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
