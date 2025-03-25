
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import ClientFeaturesOverview from './client/ClientFeaturesOverview';
import ClientServiceCards from './client/ClientServiceCards';
import ClientLoginCard from './client/ClientLoginCard';
import SecurityAlert from './client/SecurityAlert';

const WorkspaceEspaceClient = () => {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  
  // Add debugging logs
  useEffect(() => {
    console.log('WorkspaceEspaceClient: Authentication State', { isSignedIn, isLoaded });
  }, [isSignedIn, isLoaded]);
  
  // If user is already signed in, redirect to client area
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log('User already signed in, redirecting to client area');
      toast({
        title: 'Session détectée',
        description: 'Redirection vers votre espace client...',
        variant: 'default',
      });
      navigate('/workspace/client-area');
    }
  }, [isLoaded, isSignedIn, navigate]);
  
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
