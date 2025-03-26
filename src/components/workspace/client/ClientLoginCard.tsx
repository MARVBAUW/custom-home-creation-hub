
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Button from '@/components/common/Button';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const ClientLoginCard = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();
  const [clerkTimeout, setClerkTimeout] = useState(false);
  
  // Set a timeout to handle Clerk not loading properly
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setClerkTimeout(true);
        console.log('Clerk loading timed out');
      }
    }, 5000); // 5 seconds timeout
    
    return () => clearTimeout(timer);
  }, [isLoaded]);
  
  useEffect(() => {
    console.log('ClientLoginCard: Auth State', { isSignedIn, isLoaded, clerkTimeout });
  }, [isSignedIn, isLoaded, clerkTimeout]);
  
  const handleLogin = () => {
    console.log('Login button clicked, navigating to sign-in page');
    navigate('/workspace/sign-in');
  };
  
  const handleSignUp = () => {
    console.log('Sign up button clicked, navigating to sign-up page');
    navigate('/workspace/sign-up');
  };

  const handleClientArea = () => {
    console.log('Client area button clicked');
    
    if (isLoaded && isSignedIn) {
      console.log('User is signed in, navigating to client area');
      navigate('/workspace/client-area');
    } else if (clerkTimeout) {
      console.log('Clerk timed out, navigating to demo mode');
      toast({
        title: 'Mode démonstration activé',
        description: 'Vous accédez à la version de démonstration de l\'espace client.',
        variant: 'default',
      });
      navigate('/workspace/client-area');
    } else {
      console.log('User is not signed in, navigating to sign-in page');
      navigate('/workspace/sign-in');
    }
  };
  
  const renderContent = () => {
    if (!isLoaded && !clerkTimeout) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-khaki-600 mb-4"></div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      );
    }
    
    if (clerkTimeout) {
      return (
        <div className="space-y-4">
          <div className="border border-amber-200 bg-amber-50 text-amber-700 p-3 rounded-md">
            <p className="font-medium">Service temporairement indisponible</p>
            <p className="mt-1 text-sm">Vous pouvez accéder à l'espace client en mode démonstration</p>
          </div>
          
          <Button 
            className="w-full bg-khaki-600 hover:bg-khaki-700"
            onClick={handleClientArea}
          >
            Accéder en mode démo
          </Button>
          
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">ou</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          
          <Button 
            className="w-full" 
            variant="outline"
            onClick={handleLogin}
          >
            Réessayer de se connecter
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
        
        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">ou</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        
        <div className="space-y-3">
          <Button 
            className="w-full" 
            variant="outline"
            onClick={handleClientArea}
          >
            Accès espace client
          </Button>
          
          <div className="border border-blue-200 bg-blue-50 text-blue-700 p-3 rounded-md text-sm">
            <p className="font-medium">Accès sécurisé</p>
            <p className="mt-1">L'authentification est requise pour accéder à votre espace client</p>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <Card className="border-khaki-200 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3 bg-khaki-50 rounded-t-xl">
        <CardTitle className="text-xl">Accès à votre espace</CardTitle>
        <CardDescription>
          Connectez-vous ou créez un compte pour accéder à votre espace personnel sécurisé
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
