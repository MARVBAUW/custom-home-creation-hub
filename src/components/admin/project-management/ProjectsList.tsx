
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Building2, User2, MoreVertical, Plus, Search, Filter } from 'lucide-react';

// Mock data for projects
const mockProjects = [
  {
    id: '1',
    title: 'Villa Méditerranée',
    location: 'Marseille',
    type: 'Construction neuve',
    status: 'En cours',
    progress: 65,
    client: 'Jean Dupont',
    hasClient: true,
    updatedAt: '2023-09-15T10:30:00.000Z',
  },
  {
    id: '2',
    title: 'Rénovation appartement haussmannien',
    location: 'Paris',
    type: 'Rénovation complète',
    status: 'En attente',
    progress: 25,
    client: null,
    hasClient: false,
    updatedAt: '2023-09-12T14:45:00.000Z',
  },
  {
    id: '3',
    title: 'Extension maison de campagne',
    location: 'Aix-en-Provence',
    type: 'Extension',
    status: 'Planifié',
    progress: 10,
    client: 'Marie Lambert',
    hasClient: true,
    updatedAt: '2023-09-10T09:15:00.000Z',
  },
  {
    id: '4',
    title: 'Réaménagement bureaux',
    location: 'Lyon',
    type: 'Aménagement intérieur',
    status: 'Terminé',
    progress: 100,
    client: 'Société ABC',
    hasClient: true,
    updatedAt: '2023-08-28T16:20:00.000Z',
  }
];

const ProjectsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'withClient', 'withoutClient'
  const { toast } = useToast();
  
  // Filter projects based on search and tabs
  const filteredProjects = mockProjects.filter(project => {
    // Search filter
    if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !project.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !project.type.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Tab filter
    if (activeTab === 'withClient' && !project.hasClient) return false;
    if (activeTab === 'withoutClient' && project.hasClient) return false;
    
    return true;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Projets</h2>
        <Link to="/workspace/client-area/admin/projects/create">
          <Button variant="default" className="bg-khaki-600 hover:bg-khaki-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau projet
          </Button>
        </Link>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Rechercher un projet..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center md:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Tous les projets</TabsTrigger>
          <TabsTrigger value="withClient">Avec client</TabsTrigger>
          <TabsTrigger value="withoutClient">Sans client</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <ProjectsGrid 
            projects={filteredProjects} 
            formatDate={formatDate} 
            toast={toast} 
          />
        </TabsContent>
        
        <TabsContent value="withClient" className="mt-6">
          <ProjectsGrid 
            projects={filteredProjects} 
            formatDate={formatDate} 
            toast={toast} 
          />
        </TabsContent>
        
        <TabsContent value="withoutClient" className="mt-6">
          <ProjectsGrid 
            projects={filteredProjects} 
            formatDate={formatDate} 
            toast={toast} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// ProjectsGrid component to display the list of projects
const ProjectsGrid = ({ projects, formatDate, toast }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Aucun projet ne correspond aux critères de recherche.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="overflow-hidden">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <Badge variant={
                project.status === 'En cours' ? 'default' :
                project.status === 'En attente' ? 'secondary' :
                project.status === 'Planifié' ? 'outline' : 'success'
              }>
                {project.status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to={`/workspace/client-area/admin/projects/${project.id}`} className="w-full">
                      Voir les détails
                    </Link>
                  </DropdownMenuItem>
                  {!project.hasClient && (
                    <DropdownMenuItem>
                      <Link to={`/workspace/client-area/admin/projects/${project.id}/assign-client`} className="w-full">
                        Assigner un client
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => {
                    toast({
                      title: "Action en cours de développement",
                      description: "Cette fonctionnalité sera bientôt disponible.",
                    });
                  }}>
                    Modifier
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardTitle className="text-lg mt-2">{project.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-sm text-gray-500 space-y-2">
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-2" />
                <span>{project.type} - {project.location}</span>
              </div>
              {project.hasClient ? (
                <div className="flex items-center">
                  <User2 className="h-4 w-4 mr-2" />
                  <span>{project.client}</span>
                </div>
              ) : (
                <div className="flex items-center text-amber-600">
                  <User2 className="h-4 w-4 mr-2" />
                  <span>Aucun client assigné</span>
                </div>
              )}
              <div className="bg-gray-100 dark:bg-gray-800 h-2 rounded-full mt-3">
                <div 
                  className="bg-khaki-600 h-2 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 text-xs text-gray-500">
            Mis à jour le {formatDate(project.updatedAt)}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsList;
