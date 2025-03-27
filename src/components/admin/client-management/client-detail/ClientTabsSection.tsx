
import React from 'react';
import { CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileText, ClipboardList } from "lucide-react";
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
        </Tabs>
      </CardHeader>
      <CardContent className="p-6">
        {/* Content now rendered inside TabsContent components */}
      </CardContent>
    </>
  );
};

export default ClientTabsSection;
