
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Check, BookOpen, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ClientFeaturesOverview from './client/ClientFeaturesOverview';
import ClientServiceCards from './client/ClientServiceCards';
import ClientLoginCard from './client/ClientLoginCard';
import SecurityAlert from './client/SecurityAlert';
import { useUser } from '@clerk/clerk-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';

const WorkspaceEspaceClient = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();
  const [clerkTimeout, setClerkTimeout] = useState(false);
  
  // Set a timeout to handle Clerk not loading properly (reduced to 4 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setClerkTimeout(true);
        console.log('Clerk loading timed out in WorkspaceEspaceClient');
      }
    }, 4000); // 4 seconds timeout
    
    return () => clearTimeout(timer);
  }, [isLoaded]);
  
  // Add debugging for loading and authentication state
  useEffect(() => {
    console.log('WorkspaceEspaceClient: Auth State', { 
      isSignedIn, 
      isLoaded, 
      clerkTimeout 
    });
  }, [isSignedIn, isLoaded, clerkTimeout]);
  
  const handleDemoAccess = () => {
    toast({
      title: 'Mode démonstration activé',
      description: 'Vous accédez à l\'espace client en mode démonstration.',
      variant: 'default',
    });
    navigate('/workspace/client-area');
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 flex items-center">
          Espace client
          <Badge variant="outline" className="ml-3 bg-green-50 text-green-700 border-green-200">
            <Check className="h-3 w-3 mr-1" /> Disponible
          </Badge>
        </h2>
        <p className="text-gray-600">Accédez à votre espace personnel pour suivre votre projet et consulter vos documents.</p>
        
        {isLoaded && isSignedIn && (
          <div className="mt-4">
            <Link to="/workspace/client-area">
              <Button className="bg-khaki-600 hover:bg-khaki-700 text-white">
                Accéder à mon espace client
              </Button>
            </Link>
          </div>
        )}
        
        {/* Enhanced direct access section */}
        {(!isLoaded || clerkTimeout) && (
          <div className="mt-4">
            {clerkTimeout && (
              <Alert className="border-amber-200 bg-amber-50 mb-4">
                <AlertTriangle className="h-4 w-4 text-amber-800" />
                <AlertTitle className="text-amber-800">Service d'authentification indisponible</AlertTitle>
                <AlertDescription className="text-amber-700">
                  Vous pouvez accéder à l'espace client en mode démonstration sans authentification.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-x-4">
              <Button 
                className="bg-khaki-600 hover:bg-khaki-700 text-white"
                onClick={handleDemoAccess}
              >
                Accéder à l'espace client
              </Button>
              
              {clerkTimeout && (
                <Link to="/workspace/sign-in">
                  <Button variant="outline">
                    Essayer de se connecter
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ClientFeaturesOverview />
          <ClientServiceCards />
          
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-blue-800">
            <div className="flex items-start">
              <BookOpen className="h-6 w-6 mt-1 mr-4 flex-shrink-0 text-blue-600" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Documentation complète</h3>
                <p className="mb-4">
                  Découvrez toutes les fonctionnalités disponibles dans votre espace client et apprenez à les utiliser efficacement.
                </p>
                <Link to="/workspace/client-documentation">
                  <Button variant="outline" className="bg-white border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800">
                    Consulter la documentation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          {!isLoaded && !clerkTimeout ? (
            <div className="flex flex-col justify-center items-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-khaki-600 mb-3"></div>
              <p className="text-gray-600">Vérification de l'authentification...</p>
              <p className="text-xs text-gray-500 mt-2">Patientez un instant...</p>
              
              {/* Add an early access option */}
              <button 
                onClick={handleDemoAccess}
                className="mt-6 text-sm text-khaki-600 hover:underline"
              >
                Accéder directement sans attendre
              </button>
            </div>
          ) : clerkTimeout ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Accès en mode démonstration</h3>
                <p className="text-gray-600 mb-4">
                  Le service d'authentification n'est pas disponible actuellement.
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-khaki-600 hover:bg-khaki-700 text-white"
                    onClick={handleDemoAccess}
                  >
                    Accéder en mode démonstration
                  </Button>
                  <Link to="/workspace/sign-in">
                    <Button variant="outline" className="w-full">
                      Essayer de se connecter
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : isSignedIn ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-green-800">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Vous êtes connecté</h3>
                <p className="mb-4">
                  Vous pouvez accéder à votre espace client pour consulter vos projets et documents.
                </p>
                <Link to="/workspace/client-area">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Accéder à mon espace
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <ClientLoginCard />
          )}
          <SecurityAlert />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceEspaceClient;
