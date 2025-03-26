
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import ClientAreaBudget from '@/components/client/ClientAreaBudget';
import { useClientAuth } from '@/hooks/useClientAuth';

const ClientBudget = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });

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
          <div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Budget
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">
              Suivi budgétaire
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mb-8">
              Retrouvez ici le détail budgétaire de votre projet et l'historique des transactions.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <ClientNavigation />
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
