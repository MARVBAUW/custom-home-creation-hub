
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { UserPlus } from 'lucide-react';
import AuthHeader from '@/components/auth/AuthHeader';
import LoginForm from '@/components/auth/LoginForm';

const SignIn = () => {
  const navigate = useNavigate();
  const { loading, user } = useAuth();
  const [isCreatingAccount, setIsCreatingAccount] = React.useState(false);

  useEffect(() => {
    // Si l'utilisateur est déjà connecté, redirigez-le vers l'espace client
    if (user) {
      console.log('User already signed in, redirecting to client area');
      navigate('/workspace/client-area');
    }
  }, [user, navigate]);

  return (
    <>
      <Helmet>
        <title>Connexion Espace Client | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Connectez-vous à votre espace client Progineer pour suivre l'avancement de vos projets et accéder à vos documents." />
      </Helmet>

      <AuthHeader 
        title={isCreatingAccount ? 'Créer un compte' : 'Connexion'} 
        subtitle={isCreatingAccount 
          ? 'Créez votre compte pour accéder à votre espace client personnel.' 
          : 'Accédez à votre espace client pour suivre vos projets et consulter vos documents.'
        }
      />

      <section className="py-16">
        <Container size="sm">
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
            {loading && !user ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600 mb-4"></div>
                <p className="text-gray-600">Vérification de l'authentification...</p>
              </div>
            ) : !user ? (
              <>
                <LoginForm />
                <div className="mt-6 text-center">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setIsCreatingAccount(!isCreatingAccount)}
                  >
                    {isCreatingAccount ? (
                      'J\'ai déjà un compte'
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Créer un nouveau compte
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Vous êtes connecté</h3>
                <p className="text-gray-600 mb-4">Redirection vers votre espace client...</p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default SignIn;
