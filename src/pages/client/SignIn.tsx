
import React from 'react';
import { Helmet } from 'react-helmet';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import Container from '@/components/common/Container';

const SignIn = () => {
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
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-khaki-600 hover:bg-khaki-700 text-white',
                  card: 'shadow-none border-none',
                  headerTitle: 'text-2xl font-semibold text-gray-800',
                  headerSubtitle: 'text-gray-600',
                  socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
                  formFieldLabel: 'text-gray-700',
                  formFieldInput: 'border-gray-300 focus:ring-khaki-500 focus:border-khaki-500',
                  footerActionLink: 'text-khaki-600 hover:text-khaki-700'
                }
              }}
              routing="path"
              path="/workspace/sign-in"
            />
          </div>
        </Container>
      </section>
    </>
  );
};

export default SignIn;
