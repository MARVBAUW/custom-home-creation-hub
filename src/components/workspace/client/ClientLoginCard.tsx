
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useClientAuth } from '@/hooks/useClientAuth';

const ClientLoginCard = () => {
  const navigate = useNavigate();
  
  // Use the custom auth hook with demo mode disabled
  const { 
    isSignedIn, 
    isLoaded, 
    loadingTimedOut 
  } = useClientAuth({ 
    allowDemoMode: false,
    maxLoadingTime: 3000
  });
  
  const [clerkTimeout, setClerkTimeout] = useState(false);
  
  // Set a timeout to handle Clerk not loading properly
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setClerkTimeout(true);
        console.log('Clerk loading timed out in ClientLoginCard');
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isLoaded]);
  
  useEffect(() => {
    console.log('ClientLoginCard: Auth State', { 
      isSignedIn, 
      isLoaded, 
      clerkTimeout,
      loadingTimedOut
    });
    
    // If authentication fails to load, automatically use the timeout state
    if (loadingTimedOut && !isLoaded) {
      setClerkTimeout(true);
    }
  }, [isSignedIn, isLoaded, clerkTimeout, loadingTimedOut]);
  
  const handleLogin = () => {
    console.log('Login button clicked, navigating to sign-in page');
    navigate('/workspace/sign-in');
  };
  
  const handleSignUp = () => {
    console.log('Sign up button clicked, navigating to sign-up page');
    navigate('/workspace/sign-up');
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
          <div className="border border-red-200 bg-red-50 text-red-700 p-3 rounded-md">
            <p className="font-medium">Service temporairement indisponible</p>
            <p className="mt-1 text-sm">Le service d'authentification n'a pas pu être chargé. Veuillez réessayer plus tard.</p>
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
