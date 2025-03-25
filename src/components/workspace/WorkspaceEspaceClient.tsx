
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
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
