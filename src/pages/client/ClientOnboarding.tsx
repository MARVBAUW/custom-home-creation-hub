
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientOnboardingForm from '@/components/client/ClientOnboardingForm';
import { useClientAuth } from '@/hooks/useClientAuth';

const ClientOnboarding = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Complétez votre profil | Progineer</title>
        <meta name="description" content="Complétez votre profil et partagez les détails de votre projet pour un accompagnement personnalisé." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="lg">
          <div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Bienvenue chez Progineer
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">
              Complétez votre profil
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mb-8">
              Partagez des informations sur votre projet pour que nous puissions vous offrir un accompagnement personnalisé.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="md">
          <ClientOnboardingForm />
        </Container>
      </section>
    </>
  );
};

export default ClientOnboarding;
