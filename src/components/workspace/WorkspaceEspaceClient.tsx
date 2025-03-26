
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Check, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ClientFeaturesOverview from './client/ClientFeaturesOverview';
import ClientServiceCards from './client/ClientServiceCards';
import ClientLoginCard from './client/ClientLoginCard';
import SecurityAlert from './client/SecurityAlert';
import { useUser } from '@clerk/clerk-react';

const WorkspaceEspaceClient = () => {
  const { isSignedIn, isLoaded } = useUser();
  
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
          {isLoaded ? (
            isSignedIn ? (
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
            )
          ) : (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
            </div>
          )}
          <SecurityAlert />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceEspaceClient;
