
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import ClientAreaBudget from '@/components/client/ClientAreaBudget';
import { useClientAuth } from '@/hooks/useClientAuth';
import AdminSwitch from '@/components/client/AdminSwitch';
import { toast } from '@/hooks/use-toast';

const ClientBudget = () => {
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
        <title>Suivi budgétaire | Progineer</title>
        <meta name="description" content="Suivez le budget de votre projet de construction ou rénovation en temps réel." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
                {isAdminMode ? 'Administration' : 'Budget'}
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                {isAdminMode ? 'Gestion budgétaire' : 'Suivi budgétaire'}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mb-8">
                {isAdminMode
                  ? 'Gérez les budgets des projets clients et suivez les paiements.'
                  : 'Retrouvez ici le détail budgétaire de votre projet et l\'historique des transactions.'}
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
              <ClientAreaBudget />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ClientBudget;
