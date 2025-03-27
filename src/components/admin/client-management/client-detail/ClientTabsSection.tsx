
import React from 'react';
import { Link } from 'react-router-dom';
import { CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, FileText, ClipboardList } from "lucide-react";

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

// Profile Tab Content Component
const ProfileTabContent: React.FC<{ client: { projectDescription: string } }> = ({ client }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Description du projet</h3>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
          <p className="text-sm text-gray-700">{client.projectDescription}</p>
        </div>
      </div>
      
      <div className="pt-4">
        <h3 className="text-lg font-medium mb-3">Notes internes</h3>
        <textarea 
          className="w-full min-h-[120px] p-3 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-khaki-500 focus:border-transparent outline-none"
          placeholder="Ajoutez des notes internes sur ce client ici..."
        />
        <div className="mt-2 flex justify-end">
          <Button size="sm" className="bg-khaki-600 hover:bg-khaki-700">
            Enregistrer les notes
          </Button>
        </div>
      </div>
    </div>
  );
};

// Projects Tab Content Component
const ProjectsTabContent: React.FC<{ 
  client: { projects: any[], hasProjects: boolean },
  availableProjects: any[]
}> = ({ client, availableProjects }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Projets associés</h3>
        {client.projects && client.projects.length > 0 ? (
          <ProjectsList projects={client.projects} />
        ) : (
          <EmptyProjectsState />
        )}
      </div>
      
      {!client.hasProjects && (
        <AvailableProjectsList projects={availableProjects} />
      )}
    </div>
  );
};

// Documents Tab Content Component
const DocumentsTabContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Documents</h3>
        <div className="bg-gray-50 p-6 rounded-md border border-dashed border-gray-200 text-center">
          <h4 className="font-medium mb-2">Aucun document</h4>
          <p className="text-sm text-gray-500 mb-4">Ce client n'a pas encore de documents associés.</p>
          <Button className="bg-khaki-600 hover:bg-khaki-700">
            Ajouter un document
          </Button>
        </div>
      </div>
    </div>
  );
};

// Sub-components for the ProjectsTabContent
const ProjectsList: React.FC<{ projects: any[] }> = ({ projects }) => {
  return (
    <div className="space-y-4">
      {projects.map(project => (
        <div key={project.id} className="border border-gray-200 rounded-md p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{project.title}</h4>
              <p className="text-sm text-gray-500">{project.type} - {project.location}</p>
              <Badge className="mt-2" variant="outline">{project.status}</Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              asChild
            >
              <Link to={`/workspace/client-area/admin/projects/${project.id}`}>
                Voir le projet
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const EmptyProjectsState: React.FC = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-md border border-dashed border-gray-200 text-center">
      <h4 className="font-medium mb-2">Aucun projet associé</h4>
      <p className="text-sm text-gray-500 mb-4">Ce client n'a pas encore de projet associé.</p>
      <div className="space-y-4">
        <Button className="bg-khaki-600 hover:bg-khaki-700">
          Assigner un projet existant
        </Button>
        <div className="text-center">
          <span className="text-sm text-gray-500">ou</span>
        </div>
        <Button 
          variant="outline"
          asChild
        >
          <Link to="/workspace/client-area/admin/projects/create">
            Créer un nouveau projet
          </Link>
        </Button>
      </div>
    </div>
  );
};

const AvailableProjectsList: React.FC<{ projects: any[] }> = ({ projects }) => {
  return (
    <div className="pt-6">
      <h3 className="text-lg font-medium mb-3">Projets disponibles</h3>
      <div className="space-y-3">
        {projects.map(project => (
          <div 
            key={project.id}
            className="p-4 border border-gray-200 rounded-md flex justify-between items-center hover:bg-gray-50"
          >
            <div>
              <h4 className="font-medium">{project.title}</h4>
              <p className="text-sm text-gray-500">{project.type} - {project.location}</p>
              <Badge className="mt-1" variant="outline">{project.status}</Badge>
            </div>
            <Button size="sm" className="bg-khaki-600 hover:bg-khaki-700">
              Assigner
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientTabsSection;
