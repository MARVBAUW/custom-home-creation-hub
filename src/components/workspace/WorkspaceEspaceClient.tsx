
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Check, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ClientFeaturesOverview from './client/ClientFeaturesOverview';
import ClientServiceCards from './client/ClientServiceCards';
import ClientLoginCard from './client/ClientLoginCard';
import SecurityAlert from './client/SecurityAlert';
import { useClientAuth } from '@/hooks/useClientAuth';

const WorkspaceEspaceClient = () => {
  // Use the custom auth hook with redirection if authenticated
  useClientAuth({ redirectIfAuthenticated: true });
  
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
          <ClientLoginCard />
          <SecurityAlert />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceEspaceClient;
