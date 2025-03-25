
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import Container from '@/components/common/Container';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { toast } from '@/components/ui/use-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();

  // Add debugging logs
  useEffect(() => {
    console.log('SignUp Component: Authentication State', { isSignedIn, isLoaded });
  }, [isSignedIn, isLoaded]);

  // Redirect if already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log('User already signed in, redirecting to client area');
      toast({
        title: 'Vous êtes déjà connecté',
        description: 'Redirection vers votre espace client...',
        variant: 'default',
      });
      navigate('/workspace/client-area');
    }
  }, [isSignedIn, isLoaded, navigate]);

  return (
    <>
      <Helmet>
        <title>Inscription Espace Client | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Créez votre compte espace client Progineer pour suivre l'avancement de vos projets et accéder à vos documents." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 text-sm font-medium">
              Espace Client
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">
              Inscription
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Créez votre compte pour accéder à votre espace client et suivre l'avancement de vos projets.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="sm">
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
            <ClerkSignUp 
              path="/workspace/sign-up"
              routing="path"
              signInUrl="/workspace/sign-in"
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
        </Container>
      </section>
    </>
  );
};

export default SignUp;
