
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthHeader from '@/components/auth/AuthHeader';
import SignUpForm from '@/components/auth/SignUpForm';
import SignUpSuccess from '@/components/auth/SignUpSuccess';

const SignUp = () => {
  const navigate = useNavigate();
  const { loading, user } = useAuth();
  const [isCreatingAccount, setIsCreatingAccount] = React.useState(false);

  useEffect(() => {
    if (user) {
      navigate('/workspace/client-area');
    }
  }, [user, navigate]);

  return (
    <>
      <Helmet>
        <title>Créer un compte | Progineer - Architecte & Maître d'œuvre en PACA</title>
        <meta name="description" content="Créez votre compte Progineer pour accéder à votre espace client personnalisé." />
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
            {user ? (
              <SignUpSuccess isAdminSignup={false} />
            ) : (
              <SignUpForm />
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default SignUp;
