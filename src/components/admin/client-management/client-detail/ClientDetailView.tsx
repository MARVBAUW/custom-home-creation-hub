
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FileText, ClipboardList } from "lucide-react";
import ClientHeader from './ClientHeader';
import ClientContactCard from './ClientContactCard';
import ClientProjectsCard from './ClientProjectsCard';
import ClientTabsSection from './ClientTabsSection';
import { mockClient, availableProjects } from './mockData';

interface ClientDetailViewProps {
  clientId: string;
}

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ clientId }) => {
  const [activeTab, setActiveTab] = useState("profile");
  
  // In a real app, fetch client details based on clientId
  const client = mockClient;

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
          <ClientHeader client={client} />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {!client.hasProjects && (
            <Button 
              size="sm" 
              className="h-9 bg-khaki-600 hover:bg-khaki-700 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Assigner un projet
            </Button>
          )}
          
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
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <ClientContactCard client={client} />
          <ClientProjectsCard client={client} />
        </div>
        
        <div className="lg:col-span-3">
          <Card className="border-gray-200">
            <ClientTabsSection 
              client={client} 
              availableProjects={availableProjects} 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailView;
