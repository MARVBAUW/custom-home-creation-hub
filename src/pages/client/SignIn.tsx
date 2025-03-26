
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import Container from '@/components/common/Container';
import { useClientAuth } from '@/hooks/useClientAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const SignIn = () => {
  const navigate = useNavigate();
  // Use the custom auth hook with redirection if authenticated
  const { clerkLoaded, isSignedIn, authChecked, isLoaded, loadingTimedOut } = useClientAuth({ 
    redirectIfAuthenticated: true,
    maxLoadingTime: 6000
  });
  
  const [localLoadingTimeout, setLocalLoadingTimeout] = useState(false);
  
  // Set a shorter timeout for local loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!clerkLoaded) {
        setLocalLoadingTimeout(true);
      }
    }, 3000); // 3 seconds local timeout for UI purposes
    
    return () => clearTimeout(timer);
  }, [clerkLoaded]);
  
  // Add improved debugging logs
  useEffect(() => {
    console.log('SignIn Component: Authentication State', { 
      isSignedIn, 
      clerkLoaded, 
      authChecked,
      isLoaded,
      loadingTimedOut,
      localLoadingTimeout
    });
  }, [isSignedIn, clerkLoaded, authChecked, isLoaded, loadingTimedOut, localLoadingTimeout]);

  const handleDemoAccess = () => {
    toast({
      title: 'Mode démonstration activé',
      description: 'Vous accédez à l\'espace client en mode démonstration.',
      variant: 'default',
    });
    navigate('/workspace/client-area');
  };

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
            {(!clerkLoaded && !localLoadingTimeout) ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600 mb-4"></div>
                <p className="text-gray-600">Chargement du formulaire de connexion...</p>
                <p className="text-sm text-gray-500 mt-4">
                  Si le chargement persiste, vous pouvez essayer de{" "}
                  <button
                    onClick={handleDemoAccess}
                    className="text-khaki-600 hover:underline"
                  >
                    continuer en mode démo
                  </button>
                </p>
              </div>
            ) : localLoadingTimeout && !clerkLoaded ? (
              <div className="space-y-6 py-4">
                <div className="border border-amber-200 bg-amber-50 text-amber-700 p-4 rounded-md">
                  <h3 className="font-medium text-lg mb-2">Service d'authentification indisponible</h3>
                  <p className="mb-3">
                    Le service d'authentification n'a pas pu être chargé. Vous pouvez accéder à l'espace client en mode démonstration.
                  </p>
                  <Button 
                    onClick={handleDemoAccess}
                    className="w-full bg-khaki-600 hover:bg-khaki-700 text-white mb-2"
                  >
                    Accéder en mode démonstration
                  </Button>
                  <p className="text-sm text-amber-600">
                    Note: En mode démonstration, vous verrez des données fictives et certaines fonctionnalités peuvent être limitées.
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-600 mb-3">Vous pouvez également:</p>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.reload()}
                    >
                      Recharger la page
                    </Button>
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
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-500">
                    Si vous rencontrez des problèmes avec le service d'authentification, vous pouvez{" "}
                    <button
                      onClick={handleDemoAccess}
                      className="text-khaki-600 hover:underline"
                    >
                      accéder en mode démonstration
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default SignIn;
