
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import ClientAreaWelcome from '@/components/client/ClientAreaWelcome';
import ClientAreaProjectProgress from '@/components/client/ClientAreaProjectProgress';
import ClientAreaRecentDocuments from '@/components/client/ClientAreaRecentDocuments';
import ClientAreaNotifications from '@/components/client/ClientAreaNotifications';
import { useClientAuth } from '@/hooks/useClientAuth';
import AdminSwitch from '@/components/client/AdminSwitch';
import { toast } from '@/hooks/use-toast';

const ClientArea = () => {
  const { isLoaded, isSignedIn, user } = useClientAuth({ redirectIfUnauthenticated: true });
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

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
                {isAdminMode ? 'Administration' : 'Espace Client'}
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                {isAdminMode ? 'Tableau de bord administrateur' : 'Bienvenue dans votre espace client'}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                {isAdminMode 
                  ? 'Gérez les dossiers clients, les projets et les communications.' 
                  : 'Retrouvez ici toutes les informations concernant votre projet de construction.'}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                      <h3 className="font-medium text-red-800">Mode administrateur</h3>
                      <p className="text-sm text-red-700 mt-1">
                        Vous avez accès à toutes les fonctionnalités d'administration.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <h3 className="font-medium text-blue-800">Gestion des clients</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Accédez à la liste des clients et gérez leurs dossiers.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <ClientAreaWelcome user={user} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <ClientAreaProjectProgress />
                    <ClientAreaRecentDocuments />
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
