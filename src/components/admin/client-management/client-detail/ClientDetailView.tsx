
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FileText, ClipboardList } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ClientHeader from './ClientHeader';
import ClientContactCard from './ClientContactCard';
import ClientProjectsCard from './ClientProjectsCard';
import ClientTabsSection from './ClientTabsSection';
import ClientOnboardingModal from '@/components/client/ClientOnboardingModal';
import ClientProjectManager from '../ClientProjectManager';

interface ClientDetailViewProps {
  clientId: string;
}

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ clientId }) => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "profile");
  const [isLoading, setIsLoading] = useState(true);
  const [client, setClient] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchClientData = async () => {
      setIsLoading(true);
      try {
        // Fetch client profile from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', clientId)
          .single();
          
        if (error) throw error;
        
        if (data) {
          // Also fetch projects to determine if client has any
          const { data: projectsData, error: projectsError } = await supabase
            .from('client_projects')
            .select('id')
            .eq('user_id', clientId);
            
          if (projectsError) throw projectsError;
          
          setClient({
            ...data,
            projects: projectsData || [],
            hasProjects: (projectsData || []).length > 0,
          });
        } else {
          // If no profile found, show placeholder
          setClient({
            id: clientId,
            firstName: "Client",
            lastName: "En Attente",
            email: "client@example.com",
            phone: "À renseigner",
            address: "À renseigner",
            city: "À renseigner",
            postalCode: "À renseigner",
            country: "France",
            company: "À renseigner",
            projectDescription: "Aucun projet associé actuellement.",
            projects: [],
            hasProjects: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du client",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClientData();
  }, [clientId, toast]);
  
  // Format client data for ClientHeader component
  const getHeaderClientData = () => ({
    name: client?.full_name || `${client?.firstName || ''} ${client?.lastName || ''}`,
    email: client?.email
  });
  
  // Format client data for ClientContactCard component
  const getContactClientData = () => ({
    name: client?.full_name || `${client?.firstName || ''} ${client?.lastName || ''}`,
    email: client?.email,
    phone: client?.phone,
    company: client?.company,
    address: client?.address || `${client?.address || ''}, ${client?.city || ''}, ${client?.postalCode || ''}, ${client?.country || ''}`,
    registrationDate: client?.created_at || client?.createdAt,
    projectType: "residential", // Default value since it's required
    projectLocation: client?.city || "Non spécifié",
    projectBudget: "Non spécifié" // Default value since it's required
  });
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-khaki-600"></div>
        <span className="ml-2">Chargement des données client...</span>
      </div>
    );
  }
  
  if (!client) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-medium text-red-600 mb-2">Client introuvable</h3>
        <p className="text-gray-500 mb-4">Ce client n'existe pas ou a été supprimé</p>
        <Button asChild>
          <Link to="/workspace/client-area/admin/clients">Retour à la liste des clients</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" asChild className="h-9">
            <Link to="/workspace/client-area/admin/clients">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour à la liste
            </Link>
          </Button>
          <ClientHeader client={getHeaderClientData()} />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9"
            onClick={() => setIsEditModalOpen(true)}
          >
            <FileText className="h-4 w-4 mr-2" />
            Modifier les infos
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9"
          >
            <ClipboardList className="h-4 w-4 mr-2" />
            Voir les devis
          </Button>
        </div>
      </div>
      
      {activeTab === "projects" ? (
        <ClientProjectManager clientId={clientId} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <ClientContactCard client={getContactClientData()} />
            <ClientProjectsCard client={client} />
          </div>
          
          <div className="lg:col-span-3">
            <Card className="border-gray-200">
              <ClientTabsSection 
                client={client} 
                availableProjects={[]} 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </Card>
          </div>
        </div>
      )}
      
      {/* Client Edit Modal */}
      <ClientOnboardingModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        prefillData={{
          fullName: client.full_name,
          email: client.email,
          phone: client.phone || '',
          address: client.address || '',
        }}
      />
    </div>
  );
};

export default ClientDetailView;
