
import React, { useState, useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Building2, User2, MoreVertical, Plus, Search, Filter, Trash2, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { deleteProject, loadAllProjects } from '@/utils/projectStorage';
import { ProjectDetails } from '@/types/project';

interface ProjectsListProps {
  isLoading?: boolean;
  initialProjects?: ProjectDetails[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ isLoading = false, initialProjects = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'withClient', 'withoutClient'
  const [projects, setProjects] = useState<ProjectDetails[]>(initialProjects);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Use initialProjects when they change
  useEffect(() => {
    if (initialProjects.length > 0) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  // Function to refresh projects
  const refreshProjects = async () => {
    try {
      const loadedProjects = await loadAllProjects();
      setProjects(loadedProjects);
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les projets.',
        variant: 'destructive',
      });
    }
  };
  
  // Filter projects based on search and tabs
  const filteredProjects = projects.filter(project => {
    // Search filter
    if (searchTerm && !project.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !project.location?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !project.projectType?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Tab filter
    if (activeTab === 'withClient' && !project.clientId) return false;
    if (activeTab === 'withoutClient' && project.clientId) return false;
    
    return true;
  });

  // Handle project deletion
  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    
    try {
      const success = await deleteProject(projectToDelete);
      if (success) {
        toast({
          title: 'Succès',
          description: 'Le projet a été supprimé avec succès.',
        });
        // Refresh projects
        refreshProjects();
      } else {
        throw new Error('Échec de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le projet.',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  // Open the delete confirmation dialog
  const confirmDelete = (projectId: string) => {
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  };

  // Navigate to edit project page
  const navigateToEdit = (projectId: string) => {
    navigate(`/workspace/client-area/admin/projects/${projectId}/edit`);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-khaki-600"></div>
      </div>
    );
  }

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
            onEdit={navigateToEdit}
            onDelete={confirmDelete}
          />
        </TabsContent>
        
        <TabsContent value="withClient" className="mt-6">
          <ProjectsGrid 
            projects={filteredProjects} 
            formatDate={formatDate} 
            toast={toast}
            onEdit={navigateToEdit}
            onDelete={confirmDelete}
          />
        </TabsContent>
        
        <TabsContent value="withoutClient" className="mt-6">
          <ProjectsGrid 
            projects={filteredProjects} 
            formatDate={formatDate} 
            toast={toast}
            onEdit={navigateToEdit}
            onDelete={confirmDelete}
          />
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteProject}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ProjectsGrid component to display the list of projects
const ProjectsGrid = ({ projects, formatDate, toast, onEdit, onDelete }) => {
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
                project.status === 'En cours' || project.status === 'active' ? 'default' :
                project.status === 'En attente' ? 'secondary' :
                project.status === 'Planifié' ? 'outline' : 'success'
              }>
                {project.status === 'active' ? 'En cours' : project.status}
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
                  {!project.clientId && (
                    <DropdownMenuItem>
                      <Link to={`/workspace/client-area/admin/projects/${project.id}/assign-client`} className="w-full">
                        Assigner un client
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => onEdit(project.id)}>
                    <div className="flex items-center w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => onDelete(project.id)}
                  >
                    <div className="flex items-center w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardTitle className="text-lg mt-2">{project.projectName}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-sm text-gray-500 space-y-2">
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-2" />
                <span>{project.projectType} - {project.location || 'Non défini'}</span>
              </div>
              {project.clientId ? (
                <div className="flex items-center">
                  <User2 className="h-4 w-4 mr-2" />
                  <span>{project.clientName || 'Client assigné'}</span>
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
                  style={{ width: `${project.progress || 0}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 text-xs text-gray-500">
            Mis à jour le {project.updatedAt ? formatDate(project.updatedAt) : 
              project.createdAt ? formatDate(project.createdAt) : 'N/A'}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsList;
