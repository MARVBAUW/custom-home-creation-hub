
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ClientLoginCard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  const handleLogin = () => {
    console.log('Login button clicked, navigating to sign-in page');
    navigate('/workspace/sign-in');
  };
  
  const handleSignUp = () => {
    console.log('Sign up button clicked, navigating to sign-up page');
    navigate('/workspace/sign-up');
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-khaki-600 mb-4"></div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      );
    }
    
    if (user) {
      return (
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-medium text-green-700">Vous êtes connecté</p>
          <Button 
            className="w-full" 
            onClick={() => navigate('/workspace/client-area')}
          >
            Accéder à mon espace
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <div className="flex flex-col space-y-3">
          <Button 
            className="w-full bg-khaki-600 hover:bg-khaki-700"
            onClick={handleSignUp}
          >
            Créer un compte
          </Button>
          
          <Button 
            className="w-full" 
            variant="outline"
            onClick={handleLogin}
          >
            Se connecter
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <Card className="border-khaki-200 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3 bg-khaki-50 rounded-t-xl">
        <CardTitle className="text-xl">Accès à votre espace</CardTitle>
        <CardDescription>
          Connectez-vous pour accéder à votre espace personnel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {renderContent()}
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        <div className="text-sm text-gray-500 mt-4">
          <p>Vous êtes un professionnel ?</p>
          <p className="mt-1">Contactez-nous pour créer votre compte partenaire.</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClientLoginCard;
