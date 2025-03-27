
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import AdminSwitch from '@/components/client/AdminSwitch';
import { useToast } from '@/hooks/use-toast';
import { useClientAuth } from '@/hooks/useClientAuth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import ClientsList from '@/components/admin/client-management/ClientsList';

const AdminClients = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(true);
  const { toast } = useToast();

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
        <title>Gestion des clients | Progineer</title>
        <meta name="description" content="Gérez tous les clients dans l'espace administration." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
                Administration
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                Gestion des clients
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Consultez et gérez tous les clients inscrits sur la plateforme.
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
              <ClientsList />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AdminClients;
