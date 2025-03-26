
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import ClientAreaWelcome from '@/components/client/ClientAreaWelcome';
import ClientAreaProjectProgress from '@/components/client/ClientAreaProjectProgress';
import ClientAreaRecentDocuments from '@/components/client/ClientAreaRecentDocuments';
import ClientAreaNotifications from '@/components/client/ClientAreaNotifications';
import ClientAreaBudget from '@/components/client/ClientAreaBudget';
import { useClientAuth } from '@/hooks/useClientAuth';
import AdminSwitch from '@/components/client/AdminSwitch';
import { useToast } from '@/hooks/use-toast';
import AdminDashboard from '@/components/admin/AdminDashboard';

const ClientArea = () => {
  const { isLoaded, isSignedIn, user } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { toast } = useToast();
  
  // Persister le mode admin dans localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('adminMode');
    if (savedMode === 'true') {
      setIsAdminMode(true);
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

  console.log("ClientArea - User:", user);
  console.log("ClientArea - Admin Mode:", isAdminMode);

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Espace Client | Progineer</title>
        <meta name="description" content="Accédez à votre espace client Progineer pour suivre l'avancement de vos projets de construction et rénovation." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
                {isAdminMode ? 'Administration' : 'Espace Client'}
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                {isAdminMode ? 'Tableau de bord administrateur' : 'Bienvenue dans votre espace client'}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                {isAdminMode 
                  ? 'Gérez les dossiers clients, les projets et les communications.' 
                  : 'Retrouvez ici toutes les informations concernant votre projet de construction.'}
              </p>
            </div>
            
            {/* Admin Switch always shown for testing */}
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
              {isAdminMode ? (
                <AdminDashboard />
              ) : (
                <>
                  <ClientAreaWelcome />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <ClientAreaProjectProgress />
                    <ClientAreaRecentDocuments />
                  </div>
                  
                  <div className="mt-6">
                    <ClientAreaBudget />
                  </div>
                  
                  <div className="mt-6">
                    <ClientAreaNotifications />
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientArea;
