
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Button from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useClientAuth } from '@/hooks/useClientAuth';

const ClientLoginCard = () => {
  const navigate = useNavigate();
  
  // Use the custom auth hook with improved demo mode access
  const { 
    isSignedIn, 
    isLoaded, 
    loadingTimedOut,
    isDemoMode,
    accessClientAreaInDemoMode 
  } = useClientAuth({ 
    allowDemoMode: true,
    maxLoadingTime: 3000  // Reduced to 3 seconds for faster response
  });
  
  const [clerkTimeout, setClerkTimeout] = useState(false);
  
  // Set a timeout to handle Clerk not loading properly
  useEffect(() => {
    // Skip if already in demo mode
    if (isDemoMode) return;
    
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setClerkTimeout(true);
        console.log('Clerk loading timed out in ClientLoginCard');
      }
    }, 3000); // 3 seconds timeout for faster experience
    
    return () => clearTimeout(timer);
  }, [isLoaded, isDemoMode]);
  
  useEffect(() => {
    console.log('ClientLoginCard: Auth State', { 
      isSignedIn, 
      isLoaded, 
      clerkTimeout,
      loadingTimedOut,
      isDemoMode
    });
    
    // If authentication fails to load, automatically use the timeout state
    if (loadingTimedOut && !isLoaded) {
      setClerkTimeout(true);
    }
  }, [isSignedIn, isLoaded, clerkTimeout, loadingTimedOut, isDemoMode]);
  
  const handleLogin = () => {
    // If we're in demo mode and the user tries to log in,
    // use the demo area access instead
    if (isDemoMode) {
      console.log('Demo mode active, redirecting to demo client area');
      accessClientAreaInDemoMode();
      return;
    }
    
    console.log('Login button clicked, navigating to sign-in page');
    navigate('/workspace/sign-in');
  };
  
  const handleSignUp = () => {
    // If we're in demo mode and the user tries to sign up,
    // use the demo area access instead
    if (isDemoMode) {
      console.log('Demo mode active, redirecting to demo client area');
      accessClientAreaInDemoMode();
      return;
    }
    
    console.log('Sign up button clicked, navigating to sign-up page');
    navigate('/workspace/sign-up');
  };

  const handleClientArea = () => {
    console.log('Client area button clicked, using accessClientAreaInDemoMode');
    accessClientAreaInDemoMode();
  };
  
  const renderContent = () => {
    // If we're in demo mode, show the demo access buttons immediately
    if (isDemoMode) {
      return (
        <div className="space-y-4">
          <div className="border border-amber-200 bg-amber-50 text-amber-700 p-3 rounded-md">
            <p className="font-medium">Service d'authentification indisponible</p>
            <p className="mt-1 text-sm">Vous pouvez accéder à l'espace client en mode démonstration</p>
          </div>
          
          <Button 
            className="w-full bg-khaki-600 hover:bg-khaki-700"
            onClick={handleClientArea}
          >
            Accéder en mode démo
          </Button>
        </div>
      );
    }
    
    if (!isLoaded && !clerkTimeout) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-khaki-600 mb-4"></div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
          <button 
            onClick={handleClientArea}
            className="mt-4 text-sm text-khaki-600 hover:underline"
          >
            Accéder directement sans attendre
          </button>
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
            <p className="font-medium">Accès facilité</p>
            <p className="mt-1">Accédez à l'aperçu de l'espace client en mode démonstration</p>
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
          Connectez-vous ou accédez directement à votre espace personnel
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
