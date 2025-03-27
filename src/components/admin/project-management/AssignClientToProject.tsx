
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Users, UserCheck, RefreshCcw, Check, X, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock client data for demonstration
const mockClients = [
  { id: '1', name: 'Jean Dupont', email: 'jean.dupont@example.com', registrationDate: '2023-05-15', hasProjects: true },
  { id: '2', name: 'Marie Martin', email: 'marie.martin@example.com', registrationDate: '2023-06-22', hasProjects: true },
  { id: '3', name: 'Sophie Lefebvre', email: 'sophie.lefebvre@example.com', registrationDate: '2023-07-10', hasProjects: true },
  { id: '4', name: 'Lucas Bernard', email: 'lucas.bernard@example.com', registrationDate: '2023-08-05', hasProjects: false },
  { id: '5', name: 'Emma Dubois', email: 'emma.dubois@example.com', registrationDate: '2023-09-18', hasProjects: false }
];

interface ClientItemProps {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  hasProjects: boolean;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const ClientItem = ({ id, name, email, registrationDate, hasProjects, onSelect, isSelected }: ClientItemProps) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const formattedDate = new Date(registrationDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div 
      className={`p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors
        ${isSelected ? 'border-khaki-400 bg-khaki-50' : 'border-gray-200'}`}
      onClick={() => onSelect(id)}
    >
      <div className="flex items-center space-x-4">
        <Avatar className="h-10 w-10 border border-gray-200">
          <AvatarFallback className="bg-khaki-100 text-khaki-700">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{email}</div>
          <div className="text-xs text-gray-400 mt-1">Inscrit le {formattedDate}</div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {hasProjects && (
          <div className="flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
            <Users className="h-3 w-3 mr-1" />
            Projets existants
          </div>
        )}
        {isSelected ? (
          <div className="flex items-center text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
            <Check className="h-3 w-3 mr-1" />
            Sélectionné
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 border-khaki-200 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(id);
            }}
          >
            <UserCheck className="h-3.5 w-3.5 mr-1.5" />
            Sélectionner
          </Button>
        )}
      </div>
    </div>
  );
};

const AssignClientToProject = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [projectData, setProjectData] = useState<any>(null);

  useEffect(() => {
    // Fetch project data from localStorage
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = projects.find((p: any) => p.id === projectId);
    if (project) {
      setProjectData(project);
    }
  }, [projectId]);

  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignClient = () => {
    if (!selectedClientId) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un client.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call and save to localStorage
    setTimeout(() => {
      // Get projects from localStorage
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      const projectIndex = projects.findIndex((p: any) => p.id === projectId);
      
      if (projectIndex !== -1) {
        // Update project with client
        projects[projectIndex].clientId = selectedClientId;
        
        // Find client details
        const client = mockClients.find(c => c.id === selectedClientId);
        projects[projectIndex].clientName = client?.name;
        projects[projectIndex].clientEmail = client?.email;
        
        // Save back to localStorage
        localStorage.setItem('projects', JSON.stringify(projects));
      }
      
      setIsLoading(false);
      
      toast({
        title: "Client assigné avec succès",
        description: "Le client a été assigné au projet.",
      });
      
      navigate(`/workspace/client-area/admin/projects/${projectId}`);
    }, 1000);
  };

  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b border-gray-100 bg-gray-50 px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl">Assigner un client au projet</CardTitle>
            {projectData && (
              <p className="text-sm text-gray-500 mt-1">
                Projet: {projectData.projectName} (Référence: {projectData.fileNumber || 'N/A'})
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-8"
              onClick={() => navigate(`/workspace/client-area/admin/projects/${projectId}`)}
            >
              <X className="h-3.5 w-3.5 mr-1.5" />
              Annuler
            </Button>
            <Button 
              size="sm" 
              className="text-xs h-8 bg-khaki-600 hover:bg-khaki-700 text-white"
              onClick={handleAssignClient}
              disabled={!selectedClientId || isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCcw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  Attribution en cours...
                </>
              ) : (
                <>
                  <UserCheck className="h-3.5 w-3.5 mr-1.5" />
                  Assigner le client
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher un client par nom ou email..."
              className="pl-10 bg-white border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Bouton pour créer un nouveau client */}
          <div className="flex justify-end">
            <Button 
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
              onClick={() => {
                toast({
                  title: "Fonctionnalité à venir",
                  description: "La création de nouveaux clients sera disponible prochainement."
                });
              }}
            >
              <UserPlus className="h-3.5 w-3.5 mr-1.5" />
              Créer un nouveau client
            </Button>
          </div>
          
          <div className="space-y-3">
            {filteredClients.length > 0 ? (
              filteredClients.map(client => (
                <ClientItem
                  key={client.id}
                  {...client}
                  onSelect={(id) => setSelectedClientId(id === selectedClientId ? null : id)}
                  isSelected={client.id === selectedClientId}
                />
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <Users className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun client trouvé</h3>
                <p className="text-gray-500 mb-4">Aucun client ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignClientToProject;
