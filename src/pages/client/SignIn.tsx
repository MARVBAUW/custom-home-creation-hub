
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import Container from '@/components/common/Container';
import { useClientAuth } from '@/hooks/useClientAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SignIn = () => {
  const navigate = useNavigate();
  
  // Use the custom auth hook with demo mode disabled
  const { 
    clerkLoaded, 
    isSignedIn, 
    authChecked, 
    isLoaded, 
    loadingTimedOut
  } = useClientAuth({ 
    redirectIfAuthenticated: true,
    maxLoadingTime: 3000,
    allowDemoMode: false
  });
  
  // Add improved debugging logs
  useEffect(() => {
    console.log('SignIn Component: Authentication State', { 
      isSignedIn, 
      clerkLoaded, 
      authChecked,
      isLoaded,
      loadingTimedOut
    });
  }, [isSignedIn, clerkLoaded, authChecked, isLoaded, loadingTimedOut]);

  return (
    <>
      <Helmet>
        <title>Connexion Espace Client | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Connectez-vous à votre espace client Progineer pour suivre l'avancement de vos projets et accéder à vos documents." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Espace Client
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Connexion
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Accédez à votre espace client pour suivre vos projets et consulter vos documents.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="sm">
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
            {(!clerkLoaded && !loadingTimedOut) ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600 mb-4"></div>
                <p className="text-gray-600">Chargement du formulaire de connexion...</p>
              </div>
            ) : loadingTimedOut && !clerkLoaded ? (
              <div className="space-y-6 py-4">
                <div className="border border-red-200 bg-red-50 text-red-700 p-4 rounded-md">
                  <h3 className="font-medium text-lg mb-2">Service d'authentification indisponible</h3>
                  <p className="mb-3">
                    Le service d'authentification n'a pas pu être chargé. Veuillez réessayer plus tard ou contacter notre support.
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mb-2"
                    onClick={() => window.location.reload()}
                  >
                    Réessayer
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-600 mb-3">Vous pouvez également:</p>
                  <div className="space-y-2">
                    <Link to="/workspace" className="block">
                      <Button variant="ghost" className="w-full">
                        Retour à l'accueil
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <ClerkSignIn 
                  path="/workspace/sign-in"
                  routing="path"
                  signUpUrl="/workspace/sign-up"
                  redirectUrl="/workspace/client-area"
                  appearance={{
                    elements: {
                      formButtonPrimary: 'bg-khaki-600 hover:bg-khaki-700 text-white',
                      card: 'shadow-none border-none',
                      headerTitle: 'text-2xl font-semibold text-gray-800',
                      headerSubtitle: 'text-gray-600',
                      socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
                      formFieldLabel: 'text-gray-700',
                      formFieldInput: 'border-gray-300 focus:ring-khaki-500 focus:border-khaki-500',
                      footerActionLink: 'text-khaki-600 hover:text-khaki-700',
                      rootBox: 'w-full',
                      main: 'w-full'
                    }
                  }}
                />
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default SignIn;
