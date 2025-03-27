
import React from 'react';
import { CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileText, ClipboardList, Clock, Wallet, MessageSquare } from "lucide-react";
import { ProfileTabContent, DocumentsTabContent, ProjectsTabContent } from './tabs';

interface ClientTabsSectionProps {
  client: {
    projectDescription: string;
    projects: any[];
    hasProjects: boolean;
  };
  availableProjects: {
    id: string;
    title: string;
    type: string;
    location: string;
    status: string;
  }[];
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const ClientTabsSection: React.FC<ClientTabsSectionProps> = ({ 
  client, 
  availableProjects, 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <>
      <CardHeader className="border-b border-gray-100 pb-0">
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-0 w-full md:w-auto justify-start">
            <TabsTrigger value="profile" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
              <User className="h-3.5 w-3.5 mr-1.5" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              Projets
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
              <ClipboardList className="h-3.5 w-3.5 mr-1.5" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="meetings" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              Réunions
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
              <Wallet className="h-3.5 w-3.5 mr-1.5" />
              Paiements
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
              Messages
            </TabsTrigger>
          </TabsList>
        
          <TabsContent value="profile" className="m-0 pt-6">
            <ProfileTabContent client={client} />
          </TabsContent>
          
          <TabsContent value="projects" className="m-0 pt-6">
            <ProjectsTabContent client={client} availableProjects={availableProjects} />
          </TabsContent>
          
          <TabsContent value="documents" className="m-0 pt-6">
            <DocumentsTabContent />
          </TabsContent>
          
          <TabsContent value="meetings" className="m-0 pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Réunions planifiées</h3>
              <p className="text-gray-500">Aucune réunion n'est actuellement planifiée avec ce client.</p>
              {/* Component placeholder for future development */}
            </div>
          </TabsContent>
          
          <TabsContent value="payments" className="m-0 pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">État des paiements</h3>
              <p className="text-gray-500">Aucun paiement n'a encore été enregistré pour ce client.</p>
              {/* Component placeholder for future development */}
            </div>
          </TabsContent>
          
          <TabsContent value="messages" className="m-0 pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Historique des messages</h3>
              <p className="text-gray-500">Aucun message n'a été échangé avec ce client.</p>
              {/* Component placeholder for future development */}
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent className="p-6">
        {/* Content now rendered inside TabsContent components */}
      </CardContent>
    </>
  );
};

export default ClientTabsSection;
