import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import Container from '@/components/common/Container';
import { useClientAuth } from '@/hooks/useClientAuth';

const SignIn = () => {
  // Use the custom auth hook with redirection if authenticated
  useClientAuth({ redirectIfAuthenticated: true });

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
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Pour accéder au compte administrateur, utilisez :
                <br />
                <span className="font-medium">Email : progineer.moe@gmail.com</span>
                <br />
                <span className="font-medium">Mot de passe : Baullanowens1112</span>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default SignIn;
